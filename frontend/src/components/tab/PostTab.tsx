/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { FaBookOpen } from 'react-icons/fa'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'
import s from '../../style/components/PostTab.module.css'
import ContainerCard from '../cards/ContainerCard'
import StoryTabContent from './StoryTabContent'
import ReelsTabContent from './ReelsTabContent'
export default function PostTab() {

    const [isLeft, setIsLeft] = useState(true)
    const Move = (e: any) => {
        e.preventDefault()

        setIsLeft(!isLeft)
    }

    return (
        <>
            <ContainerCard>
                <div className={s.box}>
                    <button className={`${s.tab} ${isLeft ? s.activeTab : ''}`} onClick={Move}>
                        <FaBookOpen />
                        <h5>Stories</h5>
                    </button>
                    <button className={`${s.tab} ${!isLeft ? s.activeTab : ''}`} onClick={Move}>
                        <MdOutlineSlowMotionVideo />
                        <h5>Reels</h5>
                    </button>
                </div>
                {
                    isLeft ? (
                        <StoryTabContent/>
                    ) : (
                        <ReelsTabContent/>
                    )
                }
            </ContainerCard>
        </>
    )
}