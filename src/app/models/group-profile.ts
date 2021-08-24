import { UserProfile } from "./user-profile";
import * as _ from 'lodash'
import { nonEmpty } from "../utility/common-util";

export class GroupProfile {
    members: UserProfile[] = []
    constructor(public id: string, public name: string, members: UserProfile[]) {
        this.members = members || []
    }

    static fromAnyObj(obj: any): GroupProfile | null {
        if (!obj) return null
        const membersAsObj = _.get(obj, 'members')
        if(!_.isArray(membersAsObj)) return null
        const members:UserProfile[] = _.filter(_.map(membersAsObj, m => UserProfile.fromAnyObj(m)), nonEmpty)
        const id = _.get(obj, 'id') as string
        const name = _.get(obj, 'name') as string
        
        return members.length > 0 && id && name ? new GroupProfile(id, name, members) : null
    }
}
