import * as _ from 'lodash'

export class UserProfile {
    constructor(public id: string, public name: string) { }
    
    static fromAnyObj(obj: any): UserProfile | null {
        if (!obj) return null
        const id = _.get(obj, 'id')
        const name = _.get(obj, 'name')
        if (id && name) return new UserProfile(id, name)
        return null
    }
}
