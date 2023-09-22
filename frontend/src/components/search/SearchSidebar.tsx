
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import s from './SearchSidebar.module.css'
export default function SearchSidebar() {
    return (
        <>
            <Sidebar>
                <div className={s.container}>
                    <Link to={'/search'} className={s.item}>
                       <h2>All</h2>
                    </Link>
                    <Link to={'/search/posts'} className={s.item}>
                        <h2>Posts</h2>
                    </Link>
                    <Link to={'/search/groups'} className={s.item}>
                        <h2>Groups</h2>
                    </Link>
                    <Link to={'/search/users'} className={s.item}>
                        <h2>Users</h2>
                    </Link>
                </div>
            </Sidebar>
        </>
    )
}