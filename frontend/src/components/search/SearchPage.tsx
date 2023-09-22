import SearchContent from './SearchContent';
import s from './SearchPage.module.css';
import SearchSidebar from './SearchSidebar';
export default function SearchPage(){
    return (
        <>
        <div className={s.container}>
            <SearchSidebar/>
            <SearchContent/>
        </div>
        </>
    )
}