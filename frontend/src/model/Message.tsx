import { GroupRoom } from "./GroupRoom"
import { Room, RoomConstructor } from "./Room"
import { User, UserConstructor } from "./User"

export interface Message{
    id: string
    message: string
    type: string
    room: Room | GroupRoom
    user: User
    createdAt: string
}

export interface MessageProps{
    message: Message
}

export const MessageConstructor = ()=>{
    const message:Message = {
        id: "",
        message:"",
        type: "",
        room: RoomConstructor(),
        user: UserConstructor(),
        createdAt: ""
    }
    return message
}