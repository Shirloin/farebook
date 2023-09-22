
import s from './PostAction.module.css'
import { AiOutlineLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { TbShare3 } from 'react-icons/tb'
import PostActionInformation from './PostActionInformation'
import { PostProps } from '../../model/Post'

export default function PostAction({post, click}: PostProps & {click: ()=>void}) {
    return (
        <>
            <div className={s.container}>
                <div className={s.top}>
                   <PostActionInformation post={post}/>
                </div>
                <hr></hr>
                <div className={s.bottom}>
                    <div className={s.item}>
                        <AiOutlineLike />
                        <h6>Like</h6>
                    </div>
                    <div className={s.item} onClick={click}>
                        <BiComment />
                        <h6>Comment</h6>
                    </div>
                    <div className={s.item}>
                        <TbShare3 />
                        <h6>Share</h6>
                    </div>
                </div>
                <hr>
                </hr>
            </div>
        </>
    )
}