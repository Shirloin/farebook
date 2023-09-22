import { Group, GroupConstructor } from "./Group"
import { User, UserConstructor } from "./User"

export interface Post{
    id: string
    content: string
    file: [File] | null
    user: User
    createdAt: string
    comment: [Comment] | null
    privacy: string
    group: Group | null
}

export interface PostProps{
    post: Post
}
export const PostConstructor = ()=>{
    const post:Post = {
        id: "",
        content: "",
        file: null,
        user: UserConstructor(),
        createdAt: "",
        comment: null,
        privacy: "Public",
        group: GroupConstructor()
    }
    return post
}