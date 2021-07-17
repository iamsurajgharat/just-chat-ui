import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { BaseMessage } from '../models/ws-messages';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  // actions we need to support
  // connect
  connect(user: UserProfile): ConnectResponse {
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