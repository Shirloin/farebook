
import s from './FriendContent.module.css'
import FriendRequest from './FriendRequest'
import FriendYouMayKnow from './FriendYouMayKnow'
export default function FriendContent(){
    


    return (
        <>
        <div className={s.container}>
            <FriendRequest/>
            <FriendYouMayKnow/>
        </div>
        </>
    )
}