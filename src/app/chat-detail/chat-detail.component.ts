import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Chat } from '../models/chat';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {

  @Input() chat?:Chat
  @Output() close : EventEmitter<Chat> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  doClose(){
    this.close.emit(this.chat)
  }

}
