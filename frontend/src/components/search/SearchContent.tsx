import { Route, Routes } from 'react-router-dom'
import s from './SearchContent.module.css'
import SearchAll from './SearchAll'
import SearchPost from './SearchPost'
import SearchGroup from './SearchGroup'
import SearchUser from './SearchUser'
export default function SearchContent() {
    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    <Routes>
                        <Route path={'/'} element={<SearchAll />}></Route>
                        <Route path={'/posts'} element={<SearchPost />}></Route>
                        <Route path={'/groups'} element={<SearchGroup />}></Route>
                        <Route path={'/users'} element={<SearchUser />}></Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}