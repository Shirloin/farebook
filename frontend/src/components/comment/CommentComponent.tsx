import { Comment, CommentProps } from '../../model/Comment'
import s from './Comment.module.css'
import CommentAction from './CommentAction'
import { useState } from 'react'
import CommentReply from './CommentReply'
import { HTMLRenderer } from '../post/PostText'
export default function CommentComponent({ id, comment }: CommentProps & { id: string }) {
    const [open, setOpen] = useState(false)
    const [view, setView] = useState(false)
    const HandleClick = () => {
        setOpen(!open)
    }

    const HandleView = () => {
        setView(!view)
    }

    return (
        <>
            <div className={s.container}>
                <img src={comment.user.image} alt="" className={s.img}/>
                <div className={s.right}>
                    <div className={s.bubble}>
                        <div className={s.body}>
                            <h4>{comment.user.firstname} {comment.user.lastname}</h4>{
                                <HTMLRenderer htmlString={comment.text} />
                            }
                        </div>
                    </div>
                    <CommentAction click={HandleClick} />
                    {
                        comment.replies && comment.replies?.length > 1 && !view ? (
                            <p className={s.show} onClick={HandleView}>View {comment.replies?.length} Replies</p>
                        ) : null
                    }
                    {
                        open ? (
                            <CommentReply key={comment.id} comment={comment} id={id} />
                        ) : null
                    }
                    {
                        (view && comment.replies) || (!view && comment.replies?.length === 1) ? comment.replies.map((reply: Comment) => (
                            <CommentComponent key={reply.id} comment={reply} id={id} />
                        )) : null
                    }
                    {
                        view ? (
                            <p className={s.show} onClick={HandleView}>Hide Replies</p>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}