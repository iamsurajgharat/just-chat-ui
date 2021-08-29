import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ChatListComponent } from './chat-list/chat-list.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChatDetailComponent } from './chat-detail/chat-detail.component'
import { WebSocketService } from './services/web-socket.service';
import { BaseMessage } from './models/ws-messages';
import { APP_SETTINGS, APP_SETTINGS_TOKEN } from './services/app-setting.service';
import { BaseMessageWebSocketServiceToken } from './services/backend.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ChatListComponent,
    ChatDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: BaseMessageWebSocketServiceToken, useFactory: () => new WebSocketService<BaseMessage>() },
    { provide: APP_SETTINGS_TOKEN, useValue: APP_SETTINGS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
