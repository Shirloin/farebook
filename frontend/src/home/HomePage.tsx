import HomeSidebar from './HomeSidebar'
import HomeContent from './HomeContent'
import s from '../style/page/Home.module.css'

export default function HomePage() {
    return (
        <>
            <div className={s.container}>
                <HomeSidebar />
                <HomeContent />
            </div>
        </>
    )
}