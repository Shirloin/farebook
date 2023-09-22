import { User, UserConstructor } from "./User"

export interface Room{
    id: string
    user_one: User
    user_two: User
}

export const RoomConstructor = ()=>{
    const room:Room = {
        id: "",
        user_one: UserConstructor(),
        user_two: UserConstructor()
    }
    return room
}

export const NewRoomConstructor = ()=>{
    const room = {
        user_one: UserConstructor(),
        user_two: UserConstructor()
    }
    return room
}