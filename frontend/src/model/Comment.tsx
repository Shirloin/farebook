import { Post, PostConstructor } from "./Post"
import { User, UserConstructor } from "./User"

export interface Comment{
    id: string
    text: string
    user: User
    post: Post
    parent: Comment | null
    replies: [Comment] | null
}

export interface CommentProps{
    comment: Comment
}

export interface Comments{
    comments: [Comment]
}

export interface CommentsProps{
    comments: Comments
}

export const CommentConstructor = ()=>{
    const comment:Comment = {
        id: "",
        text: "",
        user: UserConstructor(),
        post: PostConstructor(),
        parent: null,
        replies: null
    }
    return comment
}