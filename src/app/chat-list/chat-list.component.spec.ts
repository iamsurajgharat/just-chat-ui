import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { ChatDetailComponent } from '../chat-detail/chat-detail.component';
import { GroupChat, SingleChat } from '../models/chat';
import { ChatMessage } from '../models/chat-message';
import { GroupProfile } from '../models/group-profile';
import { UserProfile } from '../models/user-profile';
import { BaseMessage, ChatMessageIn, ConnectedIn, ConnectRequest, PinnedChatsIn } from '../models/ws-messages';
import { BackendService } from '../services/backend.service';
import { WebSocketSubjectService } from '../services/web-socket.service';

import { ChatListComponent } from './chat-list.component';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;
  let backendServiceSpy: jasmine.SpyObj<BackendService>
  let routerSpy: jasmine.SpyObj<Router>
  let outerMainElement: HTMLElement
  let webSocketSubjectServiceSpy: jasmine.SpyObj<WebSocketSubjectService<BaseMessage>>
  let currentUser = new UserProfile('id1', 'Iron Man')

  beforeEach(async () => {

    webSocketSubjectServiceSpy = jasmine.createSpyObj('WebSocketSubjectService', ['subscribe', 'next'])

    backendServiceSpy = jasmine.createSpyObj('BackendService', [],
      { isConnected: false, currentUser: currentUser, webSocketSubject: webSocketSubjectServiceSpy }
    )
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      declarations: [ChatListComponent, ChatDetailComponent],
      providers: [
        { provide: BackendService, useValue: backendServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    outerMainElement = fixture.debugElement.nativeElement
  });

  it('should create the component properly', () => {
    expect(component).toBeDefined()
  });

  describe('ngOnInit', () => {
    it('should navigate to sign-in page if not connected to backend-service', () => {
      // act
      component.ngOnInit()

      // assure
      expect(routerSpy.navigate).toHaveBeenCalledWith(['signin'])
      expect(component.connectionStatus).toBe('Not Started')

    });

    it('should not load main outer div if not connected to backend-service', () => {
      // act
      component.ngOnInit()
      fixture.detectChanges()

      // assure
      expect(outerMainElement.querySelector('#main-outer-container-div')).toBeFalsy()

    });

    it('should load main outer div if connected to backend-service', () => {

      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      // act
      component.ngOnInit()
      fixture.detectChanges()

      // assure
      expect(component.connectionStatus).not.toBe('Not Started')
      expect(outerMainElement.querySelector('#main-outer-container-div')).toBeTruthy()

    });

    it('should subscribe to websocket if connected to backend-service', () => {

      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      // act
      component.ngOnInit()
      fixture.detectChanges()

      // assure
      expect(webSocketSubjectServiceSpy.subscribe).toHaveBeenCalledWith(jasmine.any(Object))
      expect(webSocketSubjectServiceSpy.subscribe.calls.mostRecent().args[0].next).toEqual(jasmine.any(Function))
    });

    it('should set status to "Connecting" at first if connected to backend-service', () => {

      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      // act
      component.ngOnInit()
      fixture.detectChanges()

      // assure
      expect(component.connectionStatus).toBe('Connecting')
    });

    it('should send connect request if connected to backend-service', () => {

      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      // act
      component.ngOnInit()
      fixture.detectChanges()

      // assure
      expect(webSocketSubjectServiceSpy.next).toHaveBeenCalled()
      expect(webSocketSubjectServiceSpy.next.calls.mostRecent().args[0]).toBeInstanceOf(ConnectRequest)
      expect((webSocketSubjectServiceSpy.next.calls.mostRecent().args[0] as ConnectRequest).name).toBe('Iron Man')
    });

    it('should display current username if connected to backend-service', () => {

      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      // act
      component.ngOnInit()
      fixture.detectChanges()

      // assure
      expect(outerMainElement.querySelector('#username-span')).toBeTruthy()
      expect(outerMainElement.querySelector('#username-span')?.textContent?.trim()).toBe('Iron Man')
    });
  });

  describe('processMessageFromServer', () => {
    let observer: PartialObserver<BaseMessage>
    beforeEach(() => {

      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      component.ngOnInit()
      fixture.detectChanges()

      observer = webSocketSubjectServiceSpy.subscribe.calls.mostRecent().args[0]

      expect(observer).toBeTruthy()
      expect(observer.next).toBeTruthy()
    });

    describe('ConnectedIn', () => {

      it('should set and display status to "Connected"', () => {

        observer.next!(new ConnectedIn('Yes, we are connected!'))
        fixture.detectChanges()

        expect(component.connectionStatus).toBe('Connected')
        expect(outerMainElement.querySelector('#connect-status-span')).toBeTruthy()
        expect(outerMainElement.querySelector('#connect-status-span')?.textContent).toBe('(Connected)')
      });
    });

    describe('PinnedChatsIn', () => {
      beforeEach(() => {
        observer.next!(new ConnectedIn('Yes, we are connected!'))
        fixture.detectChanges()
      });

      it('should display one pinned chats', () => {
        const chats = [new SingleChat(new UserProfile('user2', 'James Rhodes'))]
        const pinnedChats = new PinnedChatsIn(chats)

        observer.next!(pinnedChats)
        fixture.detectChanges()

        expect(component.chatList).toHaveSize(1)
        expect(outerMainElement.querySelectorAll('.chat-item')).toHaveSize(1)

      });

      it('should display lis of pinned chats', () => {
        const warMachine = new UserProfile('u2', 'James Rhodes')
        const captainAmerica = new UserProfile('u3', 'Steve Rogers')
        const singleChat = new SingleChat(warMachine)

        const groupChat = new GroupChat(new GroupProfile('group1', 'Avengers', [captainAmerica, warMachine]))
        const chats = [singleChat, groupChat]
        const pinnedChats = new PinnedChatsIn(chats)

        observer.next!(pinnedChats)
        fixture.detectChanges()

        expect(component.chatList).toHaveSize(2)
        expect(outerMainElement.querySelectorAll('.chat-item')).toHaveSize(2)

      });
    });

    describe('ChatMessageIn', () => {
      const warMachine = new UserProfile('u2', 'James Rhodes')
      const captainAmerica = new UserProfile('u3', 'Steve Rogers')
      beforeEach(() => {
        observer.next!(new ConnectedIn('Yes, we are connected!'))
        fixture.detectChanges()
        const singleChat = new SingleChat(captainAmerica)

        const groupChat = new GroupChat(new GroupProfile('group1', 'Avengers', [captainAmerica, warMachine]))
        const chats = [singleChat, groupChat]
        const pinnedChats = new PinnedChatsIn(chats)

        observer.next!(pinnedChats)
        fixture.detectChanges()
      });

      it('should add a message to pinned single chat', () => {
        const message1 = ChatMessage.generateNew('Hey buddy', captainAmerica.id, 'Single', currentUser.id)
        const message1In = new ChatMessageIn(message1)
        message1.markItSent()

        observer.next!(message1In)
        fixture.detectChanges()

        expect(component.chats.get(captainAmerica.id)?.messages).toHaveSize(1)
        expect(outerMainElement.querySelector('.chat-last-message-span')?.textContent).toBe('Hey buddy')

      });

      it('should add multiple messages to pinned single chat', () => {
        const message1 = ChatMessage.generateNew('Hey buddy', captainAmerica.id, 'Single', currentUser.id)
        const message2 = ChatMessage.generateNew('How you doing ?', captainAmerica.id, 'Single', currentUser.id)
        const message1In = new ChatMessageIn(message1)
        const message2In = new ChatMessageIn(message2)
        message1.markItSent()
        message2.markItSent()

        observer.next!(message1In)
        observer.next!(message2In)
        fixture.detectChanges()

        expect(component.chats.get(captainAmerica.id)?.messages).toHaveSize(2)
        expect(outerMainElement.querySelector('.chat-last-message-span')?.textContent).toBe('How you doing ?')

      });

      it('should create new chat for unpinned single chat message', () => {
        const message1 = ChatMessage.generateNew('Good morning', warMachine.id, 'Single', currentUser.id)
        const message1In = new ChatMessageIn(message1)
        message1.markItSent()

        observer.next!(message1In)
        fixture.detectChanges()

        expect(component.chats.get(warMachine.id)?.messages).toHaveSize(1)
        expect(component.chats.get(warMachine.id)?.pinned).toBeFalse()
        expect(outerMainElement.querySelectorAll('.chat-last-message-span').item(2)?.textContent).toBe('Good morning')
        expect(outerMainElement.querySelectorAll('.chat-name-span').item(2)?.textContent).toBe(warMachine.id)

      });
    });

  });

  fdescribe('chat-detail', () => {
    let observer: PartialObserver<BaseMessage>
    const warMachine = new UserProfile('u2', 'James Rhodes')
    const captainAmerica = new UserProfile('u3', 'Steve Rogers')
    const singleChat = new SingleChat(captainAmerica)
    const groupChat = new GroupChat(new GroupProfile('group1', 'Avengers', [captainAmerica, warMachine]))

    beforeEach(() => {
      // make isConnected to return true
      (Object.getOwnPropertyDescriptor(backendServiceSpy, 'isConnected')?.get as jasmine.Spy<() => boolean>).
        and.returnValue(true)

      component.ngOnInit()

      observer = webSocketSubjectServiceSpy.subscribe.calls.mostRecent().args[0]

      expect(observer).toBeTruthy()
      expect(observer.next).toBeTruthy()

      observer.next!(new ConnectedIn('Yes, we are connected!'))

      const chats = [singleChat, groupChat]
      const pinnedChats = new PinnedChatsIn(chats)

      observer.next!(pinnedChats)

      const message1 = ChatMessage.generateNew('Hey buddy', captainAmerica.id, 'Single', currentUser.id)
      const message1In = new ChatMessageIn(message1)
      message1.markItSent()

      observer.next!(message1In)
      fixture.detectChanges()
    });

    it('should select and display the chat in detail', () => {
      component.selectChat(singleChat)
      fixture.detectChanges()

      expect(outerMainElement.querySelector('.message-body-span')?.textContent).toBe('Hey buddy')
    });

    it('selected chat should get the new message', () => {
      component.selectChat(singleChat)
      fixture.detectChanges()

      const message1 = ChatMessage.generateNew('How are you ?', captainAmerica.id, 'Single', currentUser.id)
      const message1In = new ChatMessageIn(message1)
      message1.markItSent()
      observer.next!(message1In)
      fixture.detectChanges()

      expect(outerMainElement.querySelectorAll('.message-body-span').item(1)?.textContent).toBe('How are you ?')
    });
  });


});




