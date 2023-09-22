/* eslint-disable @typescript-eslint/no-explicit-any */

import Sidebar from "../Sidebar";
import s from './StorySidebar.module.css'
import { AiFillSetting } from 'react-icons/ai'
import StoryPart from "./StoryPart";
import { Link } from "react-router-dom";
import { StoryProps } from "./StoryPage";
import { useContext } from "react";
import { FontContext } from "../../context/FontContext";
import { StoryTextContext } from "../../context/StoryTextContext";
import { BackgroundContext } from "../../context/BackgroundContext";
import { FontColorContext } from "../../context/FontColorContext";
import { useQuery } from "@apollo/client";
import { GET_STORY_BY_FRIEND, GET_STORY_BY_USER } from "../../query/StoryQuery";
import { toast } from "react-hot-toast";
import { User } from "../../model/User";
import { useRecoilValue } from "recoil";
import { authenticated } from "../../store";
export default function StorySidebar({ show, setShow, setIsImage, handleSubmit }: StoryProps & { handleSubmit: () => void }) {


    const auth = useRecoilValue(authenticated)
    const { setFont } = useContext(FontContext)
    const { text, setText } = useContext(StoryTextContext)
    const { setBackground } = useContext(BackgroundContext)
    const { setFontColor } = useContext(FontColorContext)


    const HandleDiscard = () => {
        setIsImage(false)
        setBackground('white')
        setFont('')
        setText('')
        setFontColor('black')
        setShow(!show)
    }

    return (
        <>
            <Sidebar>
                <div className={s.container}>
                    <div className={s.body}>
                        <Link to={'/'}>
                            <img className={s.image} src="https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico" alt="" />
                        </Link>
                    </div>
                    <div className={s.body}>
                        <div className={s['mid-top']}>
                            <h1>Your Story</h1>
                            <AiFillSetting className={s.btn} />
                        </div>
                        <div className={s['mid-bot']}>
                            <MyStory id={auth.user.id}/>
                        </div>
                    </div>
                    {
                        show ? (
                            <div className={s.body}>
                                <h1>All Stories</h1>
                                <FriendStory id={auth.user.id}/>
                            </div>
                        ) : null
                    }
                    {
                        !show ? (
                            <div className={s.body}>
                                <textarea onChange={(e: any) => { setText(e.target.value) }} value={text} name="textarea" id="textarea" cols={5} rows={5} className={s.textarea} placeholder="Start Typing..."></textarea>
                                <div>
                                    <select id="input-font" className="input" onChange={(e: any) => { setFont(e.target.value) }}>
                                        <option value="serif">Serif</option>
                                        <option value="sans-serif">Sans-serif</option>
                                        <option value="monospace">monospace</option>
                                        <option value="cursive">Cursive</option>
                                        <option value="fantasy">Fantasy</option>
                                    </select>
                                </div>
                                <div>
                                    <select name="" id="" onChange={(e: any) => { setBackground(e.target.value) }}>
                                        <option value="linear-gradient(291deg, rgba(58,34,195,1) 0%, rgba(45,253,167,1) 100%)">Color 1</option>
                                        <option value="linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)">Color 2</option>
                                        <option value="linear-gradient(291deg, rgba(244,30,30,1) 0%, rgba(247,45,253,1) 100%)">Color 3</option>
                                    </select>
                                </div>
                                {/* <div>
                                    <select name="" id="" onChange={(e: any) => { setFontColor(e.target.value); console.log(e.target.value) }}>
                                        <option value="black">Black</option>
                                        <option value="white">White</option>
                                        <option value="red">Red</option>
                                    </select>
                                </div> */}
                                <button onClick={handleSubmit}>Share To Story</button>
                                <button onClick={HandleDiscard}>Discard</button>
                            </div>
                        ) : null
                    }
                </div>
            </Sidebar>
        </>
    )
}

function FriendStory({id}: {id: string}){
    const {data, error} = useQuery(GET_STORY_BY_FRIEND, {
        variables: {
            id: id
        }
    })
    if(error){
        toast.error(error.message)
    }

    return (
        <>
            {
                data && data.getStoryByFriend.map((user: User)=>(
                    user.stories.length > 0 ? (
                        <StoryPart user={user}/>
                    ):null
                )) 
            }
        </>
    )
}

function MyStory({id}: {id: string}){

    const {data, error} = useQuery(GET_STORY_BY_USER, {
        variables: {
            id: id
        }
    })
    if(error){
        toast.error(error.message)
    }

    return (
        <>
            {
                data && data.getStoryByUser && data.getStoryByUser.length > 0 ? (
                    <StoryPart user={data.getStoryByUser as User}/>
                ):null
            }
        </>
    )
}