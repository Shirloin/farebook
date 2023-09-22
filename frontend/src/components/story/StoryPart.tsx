
import { Link } from 'react-router-dom'
import { UserProps } from '../../model/User'
import s from './StoryPart.module.css'
export default function StoryPart({user}:UserProps){
    return (
        <>
            <Link className={s.container} to={'/story/'+user.id}>
                <div className={s.content}>
                    <img src={user.image} alt="" className={s.image} />
                    <h3>{user.firstname} {user.lastname}</h3>
                </div>
            </Link>
        </>
    )
}