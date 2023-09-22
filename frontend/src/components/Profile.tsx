import { useRecoilValue } from 'recoil'
import s from '../style/components/Profile.module.css'
import { authenticated } from '../store'
export default function Profile(){
    const auth = useRecoilValue(authenticated)
    return (
        <>
        <div>
        <img className={s.image} src={auth.user.image} alt="" />
        </div>
        </>
    )
}