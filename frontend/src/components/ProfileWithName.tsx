import { UserProps } from "../model/User";
import s from '../style/components/ProfileWithName.module.css'

export default function ProfileWithName({user}: UserProps){
    return (
        <>
            <div className={s.container}>
                <img className={s.image} src={user.image} alt="" />
                <h4 className={s.name}>{user.firstname} {user.lastname}</h4>
            </div>
        </>
    )
}