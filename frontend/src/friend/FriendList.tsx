import { useRecoilValue } from 'recoil'
import { authenticated } from '../store'
import s from './FriendContent.module.css'
import {useState} from 'react'
import { useQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'
import FriendCard from './FriendCard'
import { User } from '../model/User'
import { GET_ALL_USER } from '../query/UserQuery'

export default function FriendList(){
    const auth = useRecoilValue(authenticated)

    const [deactivatedUsers, setDeactivatedUsers] = useState<string[]>([])
    const {data, error} = useQuery(GET_ALL_USER, {
        variables:{
            id: auth.user.id
        }
    })
    if(error){
        toast.error(error.message)
    }
    return (
        <>
        <div className={s.content}>
        {data ? data.getAllUser.map((u:User)=>(
                !deactivatedUsers.includes(u.id) && (
                    <FriendCard key={u.id} setDeactivatedUsers={setDeactivatedUsers}  user={u} isRequest={false}/>
                )
            )):null}
        </div>
        </>
    )
}