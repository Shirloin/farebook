import { BiSolidHome } from 'react-icons/bi'
import s from '../style/components/NavbarTab.module.css'
import { BsPeopleFill, BsShop } from 'react-icons/bs'
import { IoPeopleCircle } from 'react-icons/io5'
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function NavbarTab() {
    const [activeButton, setActiveButton] = useState(0)
    const Move = (i:number) => {
        setActiveButton(i)
    }

    return (
        <>
            <div className={s.container}>
                <Link to={'/'} className={`${s.tab} ${activeButton===0 ? s.activeTab : ''}`} onClick={()=>Move(0)}>
                    <BiSolidHome />
                </Link>
                <Link to={'/friend'} className={`${s.tab} ${activeButton===1 ? s.activeTab : ''}`} onClick={()=>Move(1)}>
                    <BsPeopleFill />
                </Link>
                <Link to={'/'} className={`${s.tab} ${activeButton===2 ? s.activeTab : ''}`} onClick={()=>Move(2)}>
                    <BsShop />
                </Link>
                <Link to={'/group'} className={`${s.tab} ${activeButton===3 ? s.activeTab : ''}`} onClick={()=>Move(3)}>
                    <IoPeopleCircle />
                </Link>
            </div>
        </>
    )
}