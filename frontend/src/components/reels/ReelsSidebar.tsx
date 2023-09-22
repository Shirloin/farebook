import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import s from './ReelsSidebar.module.css'
export default function ReelsSidebar() {
    return (
        <>
            <Sidebar>
                <div className={s.container}>
                <div className={s.top}>
                        <Link to={'/'}>
                        <img className={s.image} src="https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico" alt="" />
                        </Link>
                    </div>
                    <div className={s.bot}>
                        <div className={s['bot-top']}>
                            <h1>Post Video</h1>
                        </div>
                        <div className={s['bot-bot']}>
                            <button>Post</button>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}