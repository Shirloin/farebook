import { User, UserConstructor } from "./User"

export interface Notification{
    id: string
    sender: User
    receiver: User
    message: string
    content: string
    type: string
    createdAt: string
    status: boolean
}

export interface NotifProps{
    notification: Notification
}

export const NotificationConstructor = ()=>{
    const notification:Notification = {
        id: "",
        sender: UserConstructor(),
        receiver: UserConstructor(),
        content: "",
        message: "",
        type: "",
        createdAt: "",
        status: false
    }
    return notification
}