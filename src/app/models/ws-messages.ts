import { Chat } from "./chat"
import * as _ from 'lodash'

export const TypeNameForResponseConnected = 'actors.UserSessionActor2.Connected'
export const TypeNameForResponsePinnedChats = 'actors.UserSessionActor2.PinnedChats'
export const TypeNameForResponseSingleChat = 'models.SingleChat'
export const TypeNameForResponseGroupChat = 'models.GroupChat'
export const TypeNameForResponseUserProfile = 'models.UserProfile'
export const TypeNameForResponseGroupProfile = 'models.GroupProfile'

export interface BaseMessage{
}

export interface BaseIncomingMessage extends BaseMessage{
}

export class ConnectedResponse implements BaseIncomingMessage{
    constructor(public ackMsg:string){}
}

export class PinnedChats implements BaseIncomingMessage{
    constructor(public chats:Chat[]){}
    static fromAnyObj(obj:any):PinnedChats | null{
        return null
    }
}


export interface BaseOutgoingMessage extends BaseMessage{
    _type:string
}

export class ConnectRequest implements BaseOutgoingMessage{
    _type = 'actors.UserSessionActor2.Connect'
    constructor(public userId:string, public name:string){}
}

export type allBaseMessages = ConnectedResponse | PinnedChats
