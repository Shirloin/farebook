import { AiFillLike } from "react-icons/ai";
import { PostProps } from "../../model/Post";
import s from './PostAction.module.css'
import { useQuery } from "@apollo/client";
import { GET_COMMENT_COUNT } from "../../query/CommentQuery";
import { toast } from "react-hot-toast";
export default function PostActionInformation({ post }: PostProps) {

    return (
        <>
            <div className={s.left}>
                <AiFillLike className={s.like} />
                <h5>10 Likes</h5>
            </div>
            <Comment id={post.id} />

        </>
    )
}

function Comment({ id }: { id: string }) {

    const { data, error } = useQuery(GET_COMMENT_COUNT, {
        variables: {
            id: id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    const total = data?.getCommentCount as number
    return (
        <h5 className={s.comment}>{total} comments</h5>
    )
}