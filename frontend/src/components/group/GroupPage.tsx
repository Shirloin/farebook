import { GroupNameProvider } from '../../context/GroupNameContext'
import GroupContent from './GroupContent'
import s from './GroupPage.module.css'
import GroupSidebar from './GroupSidebar'
import { Route, Routes } from 'react-router-dom'
export default function GroupPage() {
    return (
        <>
            <GroupNameProvider>
                <div className={s.container}>
                    <GroupSidebar />
                    <Routes>
                        <Route path='/:id' element={<GroupContent />}></Route>
                        <Route path='/create' element={<></>}></Route>
                    </Routes>
                </div>
            </GroupNameProvider>
        </>
    )
}