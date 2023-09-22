import { PostProps } from "../../model/Post";
import s from './PostProfile.module.css'

import EditPost from "./EditPost";
import { useRecoilValue } from "recoil";
import { authenticated } from "../../store";
import ProfileWithName from "../ProfileWithName";

export default function PostProfile({ post }: PostProps) {

    // console.log(post.group)
    const auth = useRecoilValue(authenticated)
    return (
        <>
            <div className={s.container}>
                <div className={s.top}>
                    <ProfileWithName user={post.user}/>
                </div>
                {
                    post.user.id === auth.user.id? (
                        <EditPost post={post}/>
                    ):null
                }
            </div>
        </>
    )
}