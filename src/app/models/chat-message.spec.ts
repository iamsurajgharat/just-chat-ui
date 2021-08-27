import { ChatMessage, InboundChatMessage } from './chat-message';
import { UserProfile } from './user-profile';

describe('InboundChatMessage', () => {
  it('should create an instance', () => {
    const result = new InboundChatMessage('msg1', 'Good morning', new UserProfile('id1', 'Shaktimaan'))
    expect(result).toBeTruthy()
  });
});
