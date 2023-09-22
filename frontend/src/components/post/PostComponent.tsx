/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ContainerCard from '../cards/ContainerCard'
// import GroupProfile from './GroupProfile'
import PostImage from './PostImage'
import PostAction from './PostAction'
import PostText from './PostText'
import PostComment from '../comment/PostComment'
import Carousel from '../carousel/Carousel'
import { PostProps } from '../../model/Post'
import PostProfile from './PostProfile'
import CommentComponent from '../comment/CommentComponent'
import s from './PostText.module.css'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMMENT } from '../../query/CommentQuery'
import { toast } from 'react-hot-toast'
import { Comment } from '../../model/Comment'
import PostVideo from './PostVideo'
export default function PostComponent({ post }: PostProps) {
    const [isCommentSectionOpen, setCommentSectionOpen] = useState(false);

    const { data, error } = useQuery(GET_COMMENT, {
        variables: {
            id: post.id
        }
    })
    const toggleCommentSection = () => {
        setCommentSectionOpen(prevState => !prevState);
    };

    if (error) {
        toast.error(error.message)
    }

    if (data) {
        // console.log(post)
    }
    return (
        <>
            <ContainerCard>
                <PostProfile post={post} />
                <PostText text={post.content} />
                {
                    post.file && post.file.length > 0 ? (
                        <Carousel>
                            {post.file.map((f: any) => (
                                f.type === "image" ? (
                                    <PostImage key={f.id} file={f} />
                                ) :
                                    f.type === "video" ? (
                                        <PostVideo key={f.id} file={f} />
                                    ) : null
                            ))}
                        </Carousel>
                    ) : null
                }
                <PostAction click={toggleCommentSection} post={post} />
                {
                    isCommentSectionOpen ? (
                        <>
                            <div className={s.container}>
                                <div className={s.content}>
                                    {
                                        data ? data.getComment.map((comment: Comment) => (
                                            <CommentComponent comment={comment} key={comment.id} id={post.id} />
                                        )) : null
                                    }
                                </div>
                            </div>
                            <PostComment post={post} />
                        </>
                    ) : null
                }
            </ContainerCard>
        </>
    )
}