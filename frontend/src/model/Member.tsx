import { Group, GroupConstructor } from "./Group"
import { User, UserConstructor } from "./User"

export interface Member{
    id: string
    user: User
    role: string
    joinedAt: string
    group: Group
}

export interface MemberProps{
    member: Member
}

export const MemberConstructor = ()=>{
    const member:Member = {
        id: "",
        user: UserConstructor(),
        role: "",
        joinedAt: "",
        group: GroupConstructor()
    }
    return member
}