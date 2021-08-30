import { v4 as uuidv4 } from 'uuid';

export type Status = 'New' | 'Sent' | 'Delivered' | 'Partially Delivered' | 'Partially Delivered-Read' | 'Partially Read' | 'Read'

export type DeliveryDetail = {
    userId: string,
    status: 'New' | 'Sent' | 'Delivered' | 'Read'
    deliveryDate?: Date,
    readDate?: Date
}

export type Type = 'Single' | 'Group'

export class ChatMessage {
    public status: Status = 'New'
    public sentTime?: Date
    public deliveryData: DeliveryDetail[] = []
    constructor(public id: string, public body: string, public senderId: string,
        public type: Type, public targetId: string) { }
    static generateNew(body: string, senderId: string,
        type: Type, targetId: string): ChatMessage {
        return new ChatMessage(uuidv4(), body, senderId, type, targetId)
    }

    markItSent() {
        this.sentTime = new Date()
        this.status = 'Sent'
    }
}

/*
id (would be gererated at sender)
message-content
senderId
type (single|group)
targetId (recepientid | groupid)
sent-time
delivered-time-list (multiples, in case of group)
red-time-list-list (multiples, in case of group)



*/