import { Chat, GroupChat, SingleChat } from "./chat"
import * as _ from 'lodash'
import { nonEmpty } from "../utility/common-util"
import { ChatMessage } from "./chat-message"

export const PropertyName_Type = '_type'
export const TypeName_ResponseConnected = 'actors.UserSessionActor2.Connected'
export const TypeName_ResponsePinnedChats = 'actors.UserSessionActor2.PinnedChats'
export const TypeName_ResponseSingleChat = 'models.SingleChat'
export const TypeName_ResponseGroupChat = 'models.GroupChat'
export const TypeName_ResponseUserProfile = 'models.UserProfile'
export const TypeName_ResponseGroupProfile = 'models.GroupProfile'

export interface BaseMessage {
}

export interface BaseMessageIn extends BaseMessage {
}

export class ConnectedIn implements BaseMessageIn {
    constructor(public ackMsg: string) { }
    static fromAnyObj(obj: any): ConnectedIn | null {
        if (!obj) return null
        const ackMsg = _.get(obj, 'ackMsg') as string
        return new ConnectedIn(ackMsg)
    }
}

export class PinnedChatsIn implements BaseMessageIn {
    constructor(public chats: Chat[]) { }
    static fromAnyObj(obj: any): PinnedChatsIn | null {
        if (!obj) return null
        const chats = _.get(obj, 'chats')
        if (!chats || !_.isArray(chats)) return null
        const result = _.chain(chats).
            filter(chat => {
                const chatType = _.get(chat, PropertyName_Type)
                return chatType === TypeName_ResponseSingleChat || chatType === TypeName_ResponseGroupChat
            }).
            map(chat => {
                const chatType = _.get(chat, PropertyName_Type)
                return chatType === TypeName_ResponseSingleChat ? SingleChat.fromAnyObj(chat) : GroupChat.fromAnyObj(chat)
            }).
            value()
        return new PinnedChatsIn(_.filter(result, nonEmpty))
    }
}

export class ChatMessageIn implements BaseMessageIn {
    constructor(public chatMessage: ChatMessage) { }
}

export class ChatMessageDeliveredIn implements BaseMessageIn {
    constructor(public id: string, public chatId: string, public userId: string, public time: Date) { }
}

export class ChatMessageReadIn implements BaseMessageIn {
    constructor(public id: string, public chatId: string, public userId: string, public time: Date) { }
}

export class InvalidMessage implements BaseMessage {
    data?: any
    private constructor(data?: any) {
        this.data = data
    }
    static getInstance(data?: any): InvalidMessage {
        return new InvalidMessage(data)
    }
}


export interface BaseOutgoingMessage extends BaseMessage {
    _type: string
}

export class ConnectRequest implements BaseOutgoingMessage {
    _type = 'actors.UserSessionActor2.Connect'
    constructor(public userId: string, public name: string) { }
}

export type allBaseMessages = ConnectedIn | PinnedChatsIn
