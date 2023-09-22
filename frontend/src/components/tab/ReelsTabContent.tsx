import { Link } from 'react-router-dom';
import Carousel from '../carousel/Carousel';
import s from './TabContent.module.css'
import ShortCard from '../cards/ShortCard';
import { GrAddCircle } from 'react-icons/gr';
export default function ReelsTabContent(){
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <>
            <>
            <div className={s.container}>
                
                <Carousel>
                    <Link to={'/reels/create'} className={s.gotocreate}>
                        <ShortCard>
                            <GrAddCircle className={s.icon} />
                        </ShortCard>
                    </Link>
                    {
                        data.map((d: number) => (
                            <Link to={'/reels/' + d} key={d}>
                                <ShortCard>
                                </ShortCard>
                            </Link>
                        ))
                    }
                </Carousel>
            </div>
        </>
        </>
    )
}