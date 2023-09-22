/* eslint-disable @typescript-eslint/no-explicit-any */
import navbar from '../style/components/navbar.module.css'
import { BsFacebook, BsFillChatDotsFill } from "react-icons/bs"
import { IoMdNotifications } from "react-icons/io"
import SearchBar from './SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import NavbarTab from './NavbarTab'
import { useRecoilState } from 'recoil'
import { authenticated } from '../store'
import { GoSignOut } from 'react-icons/go'
import { UserConstructor } from '../model/User'
import Profile from './Profile'
import { useQuery } from '@apollo/client'
import { GET_NOTIFICATION } from '../query/NotificationQuery'
import { toast } from 'react-hot-toast'

export default function Navbar() {
    const [auth, setAuth] = useRecoilState(authenticated);
    const navigate = useNavigate()
    const HandleLogout = () => {
        localStorage.removeItem("token")
        setAuth({
            ...auth, check: false,
            user: UserConstructor
        });
    }

    const HandleSubmit = (e:any)=>{
        e.preventDefault()
        navigate('/search')
    }

    const {data, error} = useQuery(GET_NOTIFICATION, {
        variables: {
            id: auth.user.id
        }
    })

    if(error){
        toast.error(error.message)
    }
    const filteredNotifications = data?.getNotification.filter((notif: { status: boolean }) => !notif.status) || [];


    return (
        <>
            <div className={navbar.container}>
                <div className={navbar.nav}>
                    <div className={navbar.navinside}>
                        <div className={navbar.navbody}>
                            <div className={navbar.left}>
                                <Link to={'/'}>
                                    {<BsFacebook />}
                                </Link>
                                <form action="" onSubmit={HandleSubmit}>
                                    {<SearchBar />}
                                </form>
                            </div>
                            <NavbarTab />
                            <div className={navbar.right}>
                                <Link to={'/messages'}>
                                    <BsFillChatDotsFill />
                                </Link>
                                <Link to={'/notification'} className={navbar.notification}>
                                    <IoMdNotifications />
                                    {
                                        filteredNotifications.length > 0 ? (
                                            <span className={navbar.badge}>
                                                {filteredNotifications.length}
                                            </span>
                                        ) : null
                                    }
                                </Link>
                                <Link to={`/profile/${auth.user.id}`}>
                                    <Profile />
                                </Link>

                                {
                                    auth.check ? (
                                        <Link to={'/login'} onClick={HandleLogout}>
                                            <GoSignOut />
                                        </Link>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}