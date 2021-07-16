import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ChatListComponent } from './chat-list/chat-list.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatDetailComponent } from './chat-detail/chat-detail.component'

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
