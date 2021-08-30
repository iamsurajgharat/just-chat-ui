import { ChatMessage } from "./chat-message";

describe('ChatMessage', () => {
  it('generateNew', () => {
    const result = ChatMessage.generateNew('Good morning', 'ironman', 'Single', 'capt')
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.body).toBe('Good Morning')
  });
});
