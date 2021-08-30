import { ChatMessage } from "./chat-message";
import { GroupProfile } from "./group-profile";
import { UserProfile } from "./user-profile";
import * as _ from 'lodash'

export class Chat {
    pinned: boolean = false
    messages: ChatMessage[] = []
    constructor(public name: string) {
    }

    addMessage(message: ChatMessage) {
        this.messages.push(message)
    }

    get lastMessage(): ChatMessage | undefined {
        return _.last(this.messages)
    }

    getChatId(): string {
        return ''
    }
}

export class SingleChat extends Chat {
    constructor(public peer: UserProfile) {
        super(peer.name)
    }

    getChatId(): string {
        return this.peer.id
    }

    static fromAnyObj(obj: any): SingleChat | null {
        if (!obj) return null
        const userProfile = UserProfile.fromAnyObj(_.get(obj, 'member'))
        return userProfile ? new SingleChat(userProfile) : null
    }
}


export class GroupChat extends Chat {
    constructor(public peers: GroupProfile) {
        super(peers.name)
    }

    getChatId(): string {
        return this.peers.id
    }

    static fromAnyObj(obj: any): GroupChat | null {
        if (!obj) return null
        const groupProfile = GroupProfile.fromAnyObj(_.get(obj, 'profile'))
        return groupProfile ? new GroupChat(groupProfile) : null
    }
}
