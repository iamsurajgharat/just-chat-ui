import { Chat, GroupChat, SingleChat } from "./chat"
import * as _ from 'lodash'
import { nonEmpty } from "../utility/common-util"

export const PropertyName_Type = '_type'
export const TypeName_ResponseConnected = 'actors.UserSessionActor2.Connected'
export const TypeName_ResponsePinnedChats = 'actors.UserSessionActor2.PinnedChats'
export const TypeName_ResponseSingleChat = 'models.SingleChat'
export const TypeName_ResponseGroupChat = 'models.GroupChat'
export const TypeName_ResponseUserProfile = 'models.UserProfile'
export const TypeName_ResponseGroupProfile = 'models.GroupProfile'

export interface BaseMessage {
}

export interface BaseIncomingMessage extends BaseMessage {
}

export class ConnectedResponse implements BaseIncomingMessage {
    constructor(public ackMsg: string) { }
    static fromAnyObj(obj: any): ConnectedResponse | null {
        if (!obj) return null
        const ackMsg = _.get(obj, 'ackMsg') as string
        return new ConnectedResponse(ackMsg)
    }
}

export class PinnedChats implements BaseIncomingMessage {
    constructor(public chats: Chat[]) { }
    static fromAnyObj(obj: any): PinnedChats | null {
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
        return new PinnedChats(_.filter(result, nonEmpty))
    }
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

export type allBaseMessages = ConnectedResponse | PinnedChats
