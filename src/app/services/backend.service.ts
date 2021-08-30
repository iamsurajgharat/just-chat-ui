import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { BaseMessage, ConnectedIn, InvalidMessage, PinnedChatsIn, TypeName_ResponseConnected, TypeName_ResponsePinnedChats, TypeName_ResponseSingleChat, TypeName_ResponseUserProfile } from '../models/ws-messages';
import { WebSocketSubjectConfig } from 'rxjs/webSocket'
import * as _ from 'lodash'
import { WebSocketService, WebSocketSubjectService } from './web-socket.service';
import { APP_SETTINGS_TOKEN, AppSettings } from './app-setting.service'

export const BaseMessageWebSocketServiceToken = new InjectionToken<WebSocketService<BaseMessage>>('')

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  currentUser: UserProfile | undefined
  isConnected: boolean = false
  webSocketSubject: WebSocketSubjectService<BaseMessage> | undefined

  constructor(@Inject(BaseMessageWebSocketServiceToken) private webSocketService: WebSocketService<BaseMessage>,
    @Inject(APP_SETTINGS_TOKEN) private appSettings: AppSettings) { }

  // actions we need to support
  // connect
  connect(user: UserProfile): ConnectResponse {

    // validate input
    if (!user.id || !user.name) {
      return { isSuccess: false, errorDetails: 'Required user id and name' }
    }
    // set and hold current user info
    this.currentUser = user

    // prepare for web-socket connenction request
    const endpoint = `ws://${this.appSettings.serverUrl}/socket3?userId=${encodeURIComponent(user.id)}&name=${encodeURIComponent(user.name)}`;
    const webSocketSubjectConfig: WebSocketSubjectConfig<BaseMessage> = {
      url: endpoint,
      deserializer: this.webSocketResponseDeserializer.bind(this)
    }

    //const webSocketSubject = webSocket("ws://localhost:8081/socket3")
    this.webSocketSubject = this.webSocketService.webSocket(webSocketSubjectConfig)
    // webSocketSubject.subscribe({
    //   next(x) { console.log('got value ' + x + 'of type ' + (x as ConnectedResponse).ackMsg); },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('we socket done'); }
    // });
    // webSocketSubject.next(new ConnectRequest(user.id, user.name))


    //webSocketSubject.next({message: {userId: 'some message', name:'Suraj Gharat'}});


    //webSocketSubject.complete(); // Closes the connection.

    //webSocketSubject.error({code: 4000, reason: 'I think our app just broke!'});

    this.isConnected = true

    // try to establish ws connection
    return {
      isSuccess: true,
      stream: this.webSocketSubject
    }
  }

  private webSocketResponseDeserializer(event: MessageEvent<any>): BaseMessage {
    const responseObj = JSON.parse(event.data)
    return this.convertObjToBaseMessage(responseObj) as BaseMessage
  }

  private convertObjToBaseMessage(responseObj: any): BaseMessage {
    if (_.has(responseObj, '_type')) {
      const type = _.get(responseObj, '_type')
      switch (type) {
        case TypeName_ResponseConnected:
          return ConnectedIn.fromAnyObj(responseObj) || InvalidMessage.getInstance(responseObj)
        case TypeName_ResponsePinnedChats:
          return PinnedChatsIn.fromAnyObj(responseObj) || InvalidMessage.getInstance(responseObj)
      }
    }
    return new ConnectedIn('')
  }

  // disconnect
  // search by userid
  // pin a chat
  // send a message
  // send delivered ack
  // send read ack
  // create group
  // add member to group
  // remove member to group
  // 
}


export type ConnectResponse = {
  isSuccess: boolean,
  errorDetails?: string,
  stream?: WebSocketSubjectService<BaseMessage>
}