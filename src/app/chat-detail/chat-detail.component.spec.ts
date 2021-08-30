import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleChat } from '../models/chat';
import { ChatMessage } from '../models/chat-message';
import { UserProfile } from '../models/user-profile';

import { ChatDetailComponent } from './chat-detail.component';

describe('ChatDetailComponent', () => {
  let component: ChatDetailComponent;
  let fixture: ComponentFixture<ChatDetailComponent>;
  const ironman = new UserProfile('a3', 'Iron Man')
  const cap = new UserProfile('a1', 'Steve Rogers')
  const chat = new SingleChat(cap)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function selectChatSetup() {
    component.currentUser = ironman
    component.chat = chat
    fixture.detectChanges()
  }

  it('should create the component properly', () => {
    expect(component).toBeTruthy();
  });

  it('should display selected chat', () => {
    selectChatSetup()
    expect(fixture.nativeElement.querySelector('#main-outer-chat-detail-div')).toBeTruthy()
  });

  it('should display messages of selected chat', () => {
    selectChatSetup()

    // add messages
    chat.addMessage(ChatMessage.generateNew('How are you ?', cap.id, 'Single', ironman.id))
    chat.addMessage(ChatMessage.generateNew('I am very good', ironman.id, 'Single', cap.id))
    fixture.detectChanges()

    // 
    expect(fixture.nativeElement.querySelectorAll('.message-body-span').item(0).textContent).toBe('How are you ?')
    expect(fixture.nativeElement.querySelectorAll('.message-body-span').item(1).textContent).toBe('I am very good')
  });
});
