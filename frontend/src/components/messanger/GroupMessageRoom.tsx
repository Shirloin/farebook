import { Link } from 'react-router-dom'
import s from './MessageRoom.module.css'
import { useQuery } from '@apollo/client'
import { GroupRoom } from '../../model/GroupRoom'
import { GET_GROUP_ROOM } from '../../query/GroupRoomQuery'
export default function GroupMessageRoom({ g }: {g:GroupRoom }) {
    const { data, error } = useQuery(GET_GROUP_ROOM, {
        variables: {
            id: g.group.id
        }
    })
    if (error) {
        console.log(error.message)
    }


    return (
        <>
            {
                data ? (
                    <Link to={`/messages/group/${g.id}`}>
                        <div className={s.container}>
                            <img className={s.img} src={g.group.image} alt="" />
                            <h3>{g.group.name}</h3>
                        </div>
                    </Link>
                ) : null
            }
        </>
    )
}