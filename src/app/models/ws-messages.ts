const TypeNameForResponseConnected = 'actors.UserSessionActor2.Connected'

export interface BaseMessage{
}

export interface BaseIncomingMessage extends BaseMessage{
}

export class ConnectedResponse implements BaseIncomingMessage{
    constructor(public ackMsg:string){}
}


export interface BaseOutgoingMessage extends BaseMessage{
    _type:string
}

export class ConnectRequest implements BaseOutgoingMessage{
    _type = 'actors.UserSessionActor2.Connect'
    constructor(public userId:string, public name:string){}
}

export {TypeNameForResponseConnected}