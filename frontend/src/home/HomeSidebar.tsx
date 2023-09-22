import Sidebar from "../components/Sidebar";
import { BsFillChatDotsFill } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import s from './HomeSidebar.module.css'
import Profile from "../components/Profile";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

export default function HomeSidebar() {
    const auth = useRecoilValue(authenticated)
    return (
        <>
            <Sidebar>
                <div className={s.container}>
                    <Link className={s.item} to={`/profile/${auth.user.id}`}>
                        <Profile/>
                        <h4>{auth.user.email}</h4>
                    </Link>
                    <Link className={s.item} to={'/group'}> 
                        <HiUserGroup />
                        <h4>Group</h4>
                    </Link>
                    <Link className={s.item} to={'/messages'}>
                        <BsFillChatDotsFill />
                        <h4>Messenger</h4>
                    </Link>
                </div>
            </Sidebar>
        </>
    )
}