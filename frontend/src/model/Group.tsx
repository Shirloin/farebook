import { Member } from "./Member"

export interface Group{
    id: string
    name: string
    privacy: string
    image: string
    createdAt: string
    members: Member[]
}

export interface GroupProps{
    group: Group
}

export const GroupConstructor = ()=>{
    const group:Group = {
        id: "",
        name: "",
        privacy: "Public",
        image: "",
        createdAt: "",
        members: []
    }
    return group
}