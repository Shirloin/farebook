import { Route, Routes } from 'react-router-dom'
import s from './MessagePage.module.css'
import MessagesSidebar from './MessageSidebar'
import MessageContent from './MessageContent'
import GroupMessageContent from './GroupMessageContent'
export default function MessagePage() {
    return (
        <>
            <div className={s.container}>
                <MessagesSidebar />
                <Routes>
                    <Route path='/:id' element={<MessageContent />} />
                    <Route path="/group/:id" element={<GroupMessageContent/>}/>
                </Routes>
            </div>
        </>
    )
}