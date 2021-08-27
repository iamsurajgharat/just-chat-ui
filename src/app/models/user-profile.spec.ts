import { UserProfile } from './user-profile';

describe('UserProfile', () => {
  it('should create an instance', () => {
    const result = new UserProfile('u1', 'Sheldon Cooper')
    expect(result).toBeTruthy()
  });
});
