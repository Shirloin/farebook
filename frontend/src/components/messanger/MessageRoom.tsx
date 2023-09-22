import { Link } from 'react-router-dom'
import s from './MessageRoom.module.css'
import { User } from '../../model/User'
import { authenticated } from '../../store'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@apollo/client'
import { GET_ROOM } from '../../query/MessageQuery'
export default function MessageRoom({ u }: { u: User }) {
    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(GET_ROOM, {
        variables: {
            inputRoom: {
                user_one_id: auth.user.id,
                user_two_id: u.id
            }
        }
    })
    if (error) {
        console.log(error.message)
    }


    return (
        <>
            {
                data ? (
                    <Link to={`/messages/${data.getRoom.id}`}>
                        <div className={s.container}>
                            <img className={s.img} src={u.image} alt="" />
                            <h3>{u.firstname} {u.lastname}</h3>
                        </div>
                    </Link>
                ) : null
            }
        </>
    )
}