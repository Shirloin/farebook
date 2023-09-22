/* eslint-disable @typescript-eslint/no-explicit-any */
import StoryContent from './StoryContent'
import { Route, Routes, useNavigate } from 'react-router-dom'
import StoryCreate from './StoryCreate'
import s from './StoryPage.module.css'
import StorySidebar from './StorySidebar'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { FontProvider } from '../../context/FontContext'
import { StoryTextProvider } from '../../context/StoryTextContext'
import { BackgroundProvider } from '../../context/BackgroundContext'
import html2canvas from 'html2canvas'
import { FontColorProvider } from '../../context/FontColorContext'
import { useMutation } from '@apollo/client'
import { CREATE_STORY, GET_FRIEND_STORY, GET_MY_STORY } from '../../query/StoryQuery'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { toast } from 'react-hot-toast'
import { GET_NOTIFICATION } from '../../query/NotificationQuery'

export interface StoryProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    isImage: boolean;
    setIsImage: Dispatch<SetStateAction<boolean>>;
}

export default function StoryPage() {

    const [create_story] = useMutation(CREATE_STORY)
    const auth = useRecoilValue(authenticated)
    const navigate = useNavigate()

    const [show, setShow] = useState(true)
    const [isImage, setIsImage] = useState(false)
    const storyRef = useRef<HTMLDivElement>(null);

    const HandleSubmit = async () => {
        if (storyRef.current) {
            const canvas = await html2canvas(storyRef.current);
            // document.body.appendChild(canvas)
            try {
                await create_story({
                    variables: {
                        inputStory: {
                            userId: auth.user.id,
                            file: canvas.toDataURL('image/png'),
                            privacy: "Public"
                        }
                    },
                    refetchQueries: [
                        { query: GET_MY_STORY, variables:{
                            id: auth.user.id
                        } },
                        { query: GET_FRIEND_STORY, variables:{
                            id: auth.user.id
                        } },
                        {
                            query: GET_NOTIFICATION, variables: {
                                variables: {
                                    id: auth.user.id
                                }
                            }
                        }
                    ],
                })
                navigate('/')
            } catch (error:any) {
                toast.error(error.message)
                console.log(error.message)
            }
        }
    };

    return (
        <>
            <FontColorProvider>
                <BackgroundProvider>
                    <FontProvider>
                        <StoryTextProvider>
                            <div className={s.container}>
                                <StorySidebar show={show} setShow={setShow} handleSubmit={HandleSubmit} isImage={isImage} setIsImage={setIsImage} />
                                <Routes>
                                    <Route path="/" element={<StoryCreate show={show} setShow={setShow} storyRef={storyRef} isImage={isImage} setIsImage={setIsImage} />} />
                                    <Route path='/:id' element={<StoryContent />} />
                                    <Route path='/create' element={<StoryCreate show={show} setShow={setShow} storyRef={storyRef} isImage={isImage} setIsImage={setIsImage} />} />
                                </Routes>
                            </div>
                        </StoryTextProvider>
                    </FontProvider>
                </BackgroundProvider>
            </FontColorProvider>
        </>
    )
}