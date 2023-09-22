export interface Friend{
    user_one: string
    user_two: string
    status: boolean
}

export interface FriendProps{
    friend: Friend
}

export const FriendConstructor = ()=>{
    const friend = {
        user_one: "",
        user_two: "",
        status: ""
    }
    return friend
}

export const InputFriend = ()=>{
    const friend = {
        user_one: "",
        user_two: ""
    }
    return friend
}