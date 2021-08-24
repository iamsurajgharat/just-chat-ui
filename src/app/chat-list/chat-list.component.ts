import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat, GroupChat, SingleChat } from '../models/chat';
import { InboundChatMessage, OutboundChatMessage } from '../models/chat-message';
import { UserProfile } from '../models/user-profile';
import { BaseMessage, ConnectedResponse, PinnedChats } from '../models/ws-messages';
import { BackendService } from '../services/backend.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userProfile!: UserProfile
  connectionStatus : 'Not Started'|'Connecting' | 'Connected' | 'Closed' | 'Error' = 'Not Started'
  chats: Map<string,Chat> = new Map<string,Chat>()
  selectedChat?: Chat
  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(!this.backendService.isConnected) this.router.navigate(["signin"])

    this.subscribe()

    // get user details along with ws connection as input
    // fow now it hard coded
    this.userProfile = new UserProfile('iamsurajgharat', 'Suraj Gharat')

    const user1 = new UserProfile("user1", "Chandler Bing")
    const user2 = new UserProfile("user2", "Rachel Green")

    const chat1 = new SingleChat(user1)
    const message11 = new InboundChatMessage("msg11", "Hey, Suraj", user1)
    const message12 = new OutboundChatMessage("msg12", "Mr. Bing, how are you doing ?", [user1])
    chat1.addMessage(message11)
    chat1.addMessage(message12)

    const chat2 = new SingleChat(user2)
    const message21 = new OutboundChatMessage("msg21", "Hey beautiful", [user2])
    const message22 = new InboundChatMessage("msg22", "Hi handsome!", user2)
    chat2.addMessage(message21)
    chat2.addMessage(message22)

    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat1.getChatId(), chat1)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
    this.chats.set(chat2.getChatId(), chat2)
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat
  }

  unselectChat(chat: Chat) {
    this.selectedChat = undefined
  }

  private isSingleChat(chat: Chat): chat is SingleChat {
    return chat instanceof SingleChat
  }

  private isGroupChat(chat: Chat): chat is GroupChat {
    return chat instanceof GroupChat
  }

  private processMessageFromServer(message:BaseMessage){

    if(message instanceof ConnectedResponse){
      this.connectionStatus = 'Connected'
    }
    else if(message instanceof PinnedChats){
      this.merge(message.chats)
    }
  }

  private processErrorSignalFromServer(error:any){
    this.connectionStatus = 'Error'
    this.subscribe()
  }

  private processCompleteSignalFromServer(){
    this.connectionStatus = 'Closed'
  }

  private subscribe(){
    this.backendService.webSocketSubject?.subscribe({
      next : this.processMessageFromServer,
      error : this.processErrorSignalFromServer,
      complete : this.processCompleteSignalFromServer
    })
    this.connectionStatus = 'Connecting'
  }

  private merge(newChats:Chat[]){
    // do not accept new chat if the chat with same id alredy present
    _.forEach(newChats, (chat, _) => {
      if(this.chats.has(chat.getChatId())) return
    })
  }

}
