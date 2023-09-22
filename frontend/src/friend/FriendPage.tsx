import HomeSidebar from "../home/HomeSidebar"
import FriendContent from "./FriendContent"
import s from "./FriendPage.module.css"
export default function FriendPage(){
    
    return (
        <>
            <div className={s.container}>
                <HomeSidebar />
                <FriendContent/>
            </div>
        </>
    )

}