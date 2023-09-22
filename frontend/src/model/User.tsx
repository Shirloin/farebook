import {  Story } from "./Story"

export interface User{
    id: string
    firstname: string
    lastname: string
    email: string
    dob: string
    gender: string
    image: string
    isVerified: boolean
    stories: Story[]
}

export interface UserProps{
    user: User
}

export interface UsersProps{
    users: [User]
}

export const UserConstructor = ()=>{
    const user:User = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        gender: "",
        image: "",
        isVerified: false,
        stories: []
    }
    return user
}

export const InputUser = ()=>{
    const user = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        image: ""
    }
    return user
}