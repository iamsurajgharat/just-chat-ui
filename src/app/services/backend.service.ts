import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators'
import { UserProfile } from '../models/user-profile';
import { allBaseMessages, BaseMessage, ConnectedResponse, ConnectRequest, InvalidMessage, PinnedChats, TypeName_ResponseConnected, TypeName_ResponsePinnedChats, TypeName_ResponseSingleChat, TypeName_ResponseUserProfile } from '../models/ws-messages';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket'
import * as _ from 'lodash'
import { SingleChat } from '../models/chat';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  isConnected :boolean = false
  webSocketSubject:WebSocketSubject<BaseMessage>|undefined

  constructor() { }

  // actions we need to support
  // connect
  connect(user: UserProfile): ConnectResponse {


    const webSocketSubjectConfig: WebSocketSubjectConfig<BaseMessage> = {
      url: `ws://localhost:8081/socket3?userId=${encodeURIComponent(user.id)}&name=${encodeURIComponent(user.name)}`,
      deserializer: this.webSocketResponseDeserializer.bind(this)
    }

    //const webSocketSubject = webSocket("ws://localhost:8081/socket3")
    this.webSocketSubject = webSocket(webSocketSubjectConfig)
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

  webSocketResponseDeserializer(event: MessageEvent<any>): BaseMessage {
    const responseObj = JSON.parse(event.data)
    return this.convertObjToBaseMessage(responseObj) as BaseMessage
  }

  convertObjToBaseMessage(responseObj:any) : BaseMessage{
    if (_.has(responseObj, '_type')) {
      const type = _.get(responseObj, '_type')
      switch (type) {
        case TypeName_ResponseConnected:
          return ConnectedResponse.fromAnyObj(responseObj) || InvalidMessage.getInstance(responseObj)
        case TypeName_ResponsePinnedChats:
          return PinnedChats.fromAnyObj(responseObj) || InvalidMessage.getInstance(responseObj)
      }
    }
    return new ConnectedResponse('')
  }

  convertArrayToBaseMessages(responseObj:any): BaseMessage[]{
    if(!_.isArray(responseObj)) return []
    return _.toArray(responseObj).map(x => this.convertObjToBaseMessage(x))
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
  stream: WebSocketSubject<BaseMessage>
}