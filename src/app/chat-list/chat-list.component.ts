import { Component, OnInit } from '@angular/core';
import { Chat, SingleChat } from '../models/chat';
import { InboundChatMessage, OutboundChatMessage } from '../models/chat-message';
import { UserProfile } from '../models/user-profile';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userProfile!: UserProfile
  chats: Chat[] = []
  constructor() { }

  ngOnInit(): void {
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

    this.chats.push(chat1)
    this.chats.push(chat2)
  }

}
