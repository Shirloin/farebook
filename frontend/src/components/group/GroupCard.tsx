import { Link } from 'react-router-dom'
import s from './GroupCard.module.css'
import { GroupProps } from '../../model/Group'
export default function GroupCard({group}: GroupProps){
    return (
        <>
        <Link className={s.container} to={`/group/${group.id}`}>
            <div className={s.left}>
            <img className={s.img} src={group.image} alt="" />
            </div>
            <div className={s.right}>
                <h2>{group.name}</h2>
            </div>
        </Link>
        </>
    )
}