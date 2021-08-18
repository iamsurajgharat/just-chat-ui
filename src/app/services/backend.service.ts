import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { BaseMessage } from '../models/ws-messages';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  // actions we need to support
  // connect
  connect(user: UserProfile): ConnectResponse {

    const webSocketSubject = webSocket("ws://localhost:8081/socket3")
    webSocketSubject.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('we socket done'); }
    });
    webSocketSubject.next({userId: 'some message', name:'Suraj Gharat'})
    webSocketSubject.next({message: {userId: 'some message', name:'Suraj Gharat'}});


    //webSocketSubject.complete(); // Closes the connection.
 
    //webSocketSubject.error({code: 4000, reason: 'I think our app just broke!'});

    // try to establish ws connection
    return {
      isSuccess: true,
      stream: of()
    }
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
  stream: Observable<BaseMessage>
}