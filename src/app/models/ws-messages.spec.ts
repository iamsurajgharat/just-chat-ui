import { SingleChat } from './chat';
import * as WsMessages from './ws-messages';

describe('ConnectedResponse', () => {
  it('should create an instance from given any', () => {
    // arrange
    const obj = {
      _type: WsMessages.TypeName_ResponseConnected,
      ackMsg: 'Yes, you are connected now!'
    }

    // act
    const result = WsMessages.ConnectedResponse.fromAnyObj(obj)

    // assure
    expect(result).toBeTruthy();
    expect(result?.ackMsg).toBe('Yes, you are connected now!');
  });

  it('should not create an instance from undefined any', () => {
    // arrange
    const obj = undefined

    // act
    const result = WsMessages.ConnectedResponse.fromAnyObj(obj)

    // assure
    expect(result).toBeNull();
  });
});

describe('PinnedChats', () => {
  function createSampleUserProfile(id: string, name: string): any {
    return {
      _type: WsMessages.TypeName_ResponseUserProfile,
      id: id,
      name: name
    }
  }
  function createSampleSingleChat(id: string, name: string): any {
    return {
      _type: WsMessages.TypeName_ResponseSingleChat,
      member: createSampleUserProfile(id, name)
    }
  }

  it('should create an instance from given any with single-chat', () => {
    // arrange
    const obj = {
      _type: WsMessages.TypeName_ResponsePinnedChats,
      chats: [createSampleSingleChat('id1', 'Bruce Wayne')]
    }

    // act
    const result = WsMessages.PinnedChats.fromAnyObj(obj)

    // assure
    expect(result).toBeTruthy();
    expect(result?.chats).toHaveSize(1)
    expect(result?.chats[0]).toBeTruthy()
    expect(result?.chats[0] instanceof SingleChat).toBeTrue()
    const singleChat = result?.chats[0] as SingleChat
    expect(singleChat.getChatId()).toBe('id1')
    expect(singleChat.name).toBe('Bruce Wayne')
  });

  it('should not create an instance from undefined any', () => {
    // arrange
    const obj = undefined

    // act
    const result = WsMessages.ConnectedResponse.fromAnyObj(obj)

    // assure
    expect(result).toBeNull();
  });
});
