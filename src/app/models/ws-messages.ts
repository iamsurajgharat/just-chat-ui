import { UserProfile } from "./user-profile";

export class WsMessages {
}

export interface BaseMessage {
    id: string
}

export interface Connect extends BaseMessage {
    user: UserProfile
}
