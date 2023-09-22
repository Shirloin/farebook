import { useQuery } from '@apollo/client'
import s from './FriendContent.module.css'
import { GET_PEOPLE_YOU_MIGHT_KNOW } from '../query/FriendQuery'
import { toast } from 'react-hot-toast'
import { User } from '../model/User'
import FriendCard from './FriendCard'
import { authenticated } from '../store'
import { useRecoilValue } from 'recoil'
import {useState } from 'react'
export default function FriendYouMayKnow() {
    const auth = useRecoilValue(authenticated)

    const [deactivatedUsers, setDeactivatedUsers] = useState<string[]>([])

    const { data, error } = useQuery(GET_PEOPLE_YOU_MIGHT_KNOW, {
        variables:{
            id: auth.user.id
        }
    })
    if(error){
        toast.error(error.message)
    }
    if(data){
        // console.log(data)
    }

    return (
        <>
        {
            data && data.getPeopleYouMayKnow.length !==  deactivatedUsers.length  ? (
                <h2>People You May Know</h2>
                ):null
            }
            <div className={s.content}>
        {
            data ? data.getPeopleYouMayKnow
            .filter((u: User) => !deactivatedUsers.includes(u.id)).slice(0, 5)
            .map((u: User) => (
                <FriendCard setDeactivatedUsers={setDeactivatedUsers} user={u} isRequest={false} />
            ))
        : null
        }

            </div>
        </>
    )
}