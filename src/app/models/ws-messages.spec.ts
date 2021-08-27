import { GroupChat, SingleChat } from './chat';
import { UserProfile } from './user-profile';
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

  function createSampleGroupProfile(id: string, name: string, ...users:UserProfile[]): any {
    return {
      _type: WsMessages.TypeName_ResponseGroupProfile,
      id : id,
      name : name,
      members: [...users]
    }
  }

  function createSampleGroupChat(id: string, name: string, ...users:UserProfile[]): any {
    return {
      _type: WsMessages.TypeName_ResponseGroupChat,
      profile: createSampleGroupProfile(id, name, ...users)
    }
  }

  it('should create an instance from given any for group-chat', () => {
    // arrange
    const obj = {
      _type: WsMessages.TypeName_ResponsePinnedChats,
      chats: [createSampleGroupChat('group1', 'Free folks', createSampleUserProfile('u1', 'Tony Stark'), createSampleUserProfile('u2', 'Steve Rogers'))]
    }

    // act
    const result = WsMessages.PinnedChats.fromAnyObj(obj)

    // assure
    expect(result).toBeTruthy();
    expect(result?.chats).toHaveSize(1)
    expect(result?.chats[0]).toBeTruthy()
    expect(result?.chats[0] instanceof GroupChat).toBeTrue()
    const groupChat = result?.chats[0] as GroupChat
    expect(groupChat.getChatId()).toBe('group1')
    expect(groupChat.name).toBe('Free folks')
    expect(groupChat.peers.members).toHaveSize(2)
  });

  it('should create an instance from given any for single-chat', () => {
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
});
