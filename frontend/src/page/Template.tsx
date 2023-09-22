import { Route, Routes, useLocation, } from "react-router-dom";
import Footer from "../components/Footer";
import style from "../style/Template.module.css"
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "../home/HomePage";
import Navbar from "../components/Navbar";
import ForgetAccountPage from "./ForgetAccountPage";
import ForgetAccountNavbar from "../components/ForgetAccountNavbar";
import StoryPage from "../components/story/StoryPage";
import FriendPage from "../friend/FriendPage";
import ReelsPage from "../components/reels/ReelsPage";
import MessagePage from "../components/messanger/MessagePage";
import ProfilePage from "../components/profile/ProfilePage";
import GroupPage from "../components/group/GroupPage";
import NotificationPage from "../components/notification/NotificationPage";
import VerificationPage from "./VerificationPage";
import Authenticated from "../middleware/Authentication";
import Guest from "../middleware/Guest";
import SearchPage from "../components/search/SearchPage";

export default function Template() {
    const { pathname } = useLocation()

    return (
        <>
            <div className={style.container}>
                {
                    pathname === '/' || pathname === '/friend' || pathname.includes('/messages') || pathname.includes('/profile') || pathname.includes("/group") || pathname === "/notification" || pathname.includes("/search") ? (
                        <Navbar />
                    ) : null
                }
                {
                    pathname === '/forgetaccount' ? (
                        <ForgetAccountNavbar />

                    ) : null
                }
                <Routes>
                    <Route path="/" element={<Authenticated><HomePage /></Authenticated>}>
                    </Route>
                    <Route path="/friend" element={
                        <Authenticated>
                            <FriendPage />
                        </Authenticated>
                    }></Route>
                    <Route path="/notification/*" element={
                        <Authenticated>
                            <NotificationPage />
                        </Authenticated>
                    }></Route>
                    <Route path="/login" element={<Guest><LoginPage /></Guest>}></Route>
                    <Route path="/register" element={<Guest><RegisterPage /></Guest>}></Route>
                    <Route path="/verification/:email" element={<VerificationPage />}></Route>
                    <Route path="/forgetaccount" element={<Guest><ForgetAccountPage /></Guest>}></Route>
                    <Route path="/profile/:id" element={
                        <Authenticated>
                            <ProfilePage />
                        </Authenticated>
                    }></Route>
                    <Route path="/story/*" element={
                        <Authenticated>
                            <StoryPage />
                        </Authenticated>
                    }></Route>
                    <Route path="/reels/*" element={
                        <Authenticated>
                            <ReelsPage />
                        </Authenticated>
                    }></Route>
                    <Route path="/messages/*" element={
                        <Authenticated>
                            <MessagePage />
                        </Authenticated>
                    }></Route>
                    <Route path="/group/*" element={
                        <Authenticated>
                            <GroupPage />
                        </Authenticated>
                    }></Route>
                    <Route path="/search/*" element={
                        <Authenticated>
                            <SearchPage />
                        </Authenticated>
                    }></Route>
                </Routes>
                {
                    pathname === '/login' || pathname === '/register' || pathname === '/forgetaccount' ? (
                        <Footer />
                    ) : null
                }
            </div>
        </>
    )
}