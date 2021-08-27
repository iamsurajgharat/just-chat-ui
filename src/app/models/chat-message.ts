import { UserProfile } from "./user-profile"

export class ChatMessage {
    status: ChatMessageStatus = 'New'
    sentTime?: Date
    groupId?: string
    constructor(public id: string, public body: string) {

    }

    markItAsSent() {
        this.sentTime = new Date()
        this.status = 'Sent'
    }
}

export class InboundChatMessage extends ChatMessage {
    receiveTime: Date
    readTime?: Date
    constructor(public id: string, public body: string, public sender: UserProfile) {
        super(id, body)
        this.sentTime = new Date()
        this.receiveTime = new Date()
    }

    markItAsRead() {
        this.readTime = new Date()
        this.status = 'Read'
    }
}

export class OutboundChatMessage extends ChatMessage {
    deliveryDetails = new Map<string, DeliveryDetail>()
    constructor(public id: string, public body: string, public recipients: UserProfile[]) {
        super(id, body)
        this.sentTime = new Date()
        for (let recipient of recipients) {
            this.deliveryDetails.set(recipient.id, { userId: recipient.id, status: 'New' })
        }
    }
}

type ChatMessageStatus = 'New' | 'Sent' | 'Delivered' | 'Partially Delivered' | 'Partially Read' | 'Read'

type DeliveryDetail = {
    userId: string,
    status: 'New' | 'Sent' | 'Delivered' | 'Read'
    deliveryDate?: Date,
    readDate?: Date
}

/*
id
message-content
senderId
targetId (recepientid | groupid)
type (single|group)
sent-time
delivered-time (multiples, in case of group)
red-time (multiples, in case of group)



*/