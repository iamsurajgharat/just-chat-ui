import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component'
import { ChatListComponent } from './chat-list/chat-list.component'

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'chats', component: ChatListComponent },
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
