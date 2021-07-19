import { UserProfile } from "./user-profile";

export class GroupProfile {
    members: UserProfile[] = []
    constructor(public id: string, public name: string, members: UserProfile[]) {
        this.members = members || []
    }
}
