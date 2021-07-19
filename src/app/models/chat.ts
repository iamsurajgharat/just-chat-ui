import { ChatMessage } from "./chat-message";
import { GroupProfile } from "./group-profile";
import { UserProfile } from "./user-profile";

export class Chat {
    messages: ChatMessage[] = []
    constructor(public name: string) {
    }

    addMessage(message: ChatMessage) {
        this.messages.push(message)
    }
}

export class SingleChat extends Chat {
    constructor(public peer: UserProfile) {
        super(peer.name)
    }


}


export class GroupChat extends Chat {
    constructor(public peers: GroupProfile) {
        super(peers.name)
    }
}
