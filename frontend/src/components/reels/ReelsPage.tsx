import { Routes } from 'react-router-dom'
import s from './ReelsPage.module.css'
import ReelsSidebar from './ReelsSidebar'
export default function ReelsPage() {
    return (
        <>
            <div className={s.container}>
                <ReelsSidebar />
                <Routes>
                    {/* <Route path="/" element={<StoryCreate />} />
                    <Route path='/:id' element={<StoryContent />} />
                    <Route path='/create' element={<StoryCreate />} /> */}
                </Routes>
            </div>
        </>
    )
}