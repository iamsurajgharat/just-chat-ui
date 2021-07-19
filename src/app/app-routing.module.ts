import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component'
import { ChatListComponent } from './chat-list/chat-list.component'

const routes: Routes = [
  { path: 'chats', component: ChatListComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
