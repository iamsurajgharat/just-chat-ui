import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Chat } from '../models/chat';
import { UserProfile } from '../models/user-profile';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css'],
  inputs: ['chat', 'currentUser']
})
export class ChatDetailComponent implements OnInit {

  @Input() chat?: Chat
  @Input() currentUser!: UserProfile
  @Output() close: EventEmitter<Chat> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  doClose() {
    this.close.emit(this.chat)
  }

}
