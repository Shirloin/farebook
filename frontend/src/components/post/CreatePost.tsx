import ContainerCard from "../cards/ContainerCard";
import s from './CreatePost.module.css'
import { IoVideocam } from 'react-icons/io5'
import { AiFillPicture } from 'react-icons/ai'
import { BsEmojiSmile } from 'react-icons/bs'
import CreatePostModal from "./CreatePostModal";
import Profile from "../Profile";

export default function CreatePost() {
    return (
        <>
            <ContainerCard>
                <div className={s.container}>
                    <div className={s.top}>
                        <Profile/>
                       <CreatePostModal/>
                    </div>
                    <div className={s.bottom}>
                        <div className={s.item}>
                            <IoVideocam />
                            Video
                        </div>
                        <div className={s.item}>
                            <AiFillPicture />
                            Photo
                        </div>
                        <div className={s.item}>
                            <BsEmojiSmile />
                            Reaction
                        </div>
                    </div>

                </div>
            </ContainerCard>
        </>
    )
}