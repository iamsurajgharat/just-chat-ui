import { TestBed } from '@angular/core/testing';
import { UserProfile } from '../models/user-profile';
import { BaseMessage } from '../models/ws-messages';

import { BackendService, BaseMessageWebSocketServiceToken } from './backend.service';
import { WebSocketService, WebSocketSubjectService } from './web-socket.service';
import * as WsMessages from '../models/ws-messages'
import { AppSettings, APP_SETTINGS_TOKEN } from './app-setting.service';

describe('BackendService', () => {
  let service: BackendService;
  let webSocketServiceSpy: jasmine.SpyObj<WebSocketService<BaseMessage>>
  let webSocketSubjectServiceSpy: jasmine.SpyObj<WebSocketSubjectService<BaseMessage>>
  let appSetting: AppSettings

  beforeEach(() => {
    const spy1 = jasmine.createSpyObj('WebSocketService', ['webSocket'])
    appSetting = {
      serverUrl: 'my-test-server1234'
    }
    TestBed.configureTestingModule({
      providers: [BackendService,
        { provide: BaseMessageWebSocketServiceToken, useValue: spy1 },
        { provide: APP_SETTINGS_TOKEN, useValue: appSetting }
      ]
    });
    service = TestBed.inject(BackendService)
    webSocketServiceSpy = spy1 as jasmine.SpyObj<WebSocketService<BaseMessage>>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('connect', () => {
    it('should not succeed for blank user details', () => {
      const result = service.connect(new UserProfile('', ''))
      expect(result.isSuccess).toBeFalse()
    });

    it('should succeed for non-blank user details', () => {
      webSocketServiceSpy.webSocket.and.returnValue(webSocketSubjectServiceSpy)
      const result = service.connect(new UserProfile('user1', 'Batman'))
      expect(result.isSuccess).toBeTrue()
      expect(webSocketServiceSpy.webSocket).toHaveBeenCalledWith(jasmine.objectContaining({
        url: jasmine.any(String),
        deserializer: jasmine.any(Function)
      }))
    });
  });

  describe('deserializer', () => {
    function setup() {
      const result = service.connect(new UserProfile('user1', 'Batman'))
      return webSocketServiceSpy.webSocket.calls.mostRecent().args[0]
    }

    it('should be true and function', () => {
      let { deserializer } = setup()

      expect(deserializer).toBeTruthy()
      expect(deserializer).toEqual(jasmine.any(Function))
    });

    it('should convert "Connected" response conrrectly', () => {
      let { deserializer } = setup()
      const connected = {
        _type: WsMessages.TypeName_ResponseConnected,
        ackMsg: 'Yass, we are connected!'
      }
      var myMessage = new MessageEvent('websocket', {
        data: JSON.stringify(connected)
      });

      // act
      const result = deserializer!(myMessage as MessageEvent)

      expect(result).toBeTruthy()
      expect(result).toBeInstanceOf(WsMessages.ConnectedResponse)
    });

    it('should convert "PinnedChats" response conrrectly', () => {
      let { deserializer } = setup()
      const pinnedChats = {
        _type: WsMessages.TypeName_ResponsePinnedChats,
        chats: []
      }
      var myMessage = new MessageEvent('websocket', {
        data: JSON.stringify(pinnedChats)
      });

      // act
      const result = deserializer!(myMessage as MessageEvent)

      expect(result).toBeTruthy()
      expect(result).toBeInstanceOf(WsMessages.PinnedChats)
    });
  });
});
