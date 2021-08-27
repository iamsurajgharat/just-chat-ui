import { GroupProfile } from "./group-profile";
import { UserProfile } from "./user-profile";

describe('GroupProfile', () => {
  it('should create an instance', () => {
    const result = new GroupProfile('g1', 'Starks', [new UserProfile('s1', 'Ned Stark'), new UserProfile('s2', 'Catalyn Stark')])
    expect(result).toBeTruthy()
  });
});
