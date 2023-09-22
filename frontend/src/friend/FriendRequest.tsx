import { useRecoilValue } from "recoil"
import { authenticated } from "../store"
import { useQuery } from "@apollo/client"
import { GET_FRIEND_REQUEST } from "../query/FriendQuery"
import { toast } from "react-hot-toast"
import { User } from "../model/User"
import s from './FriendContent.module.css'
import FriendCard from "./FriendCard"
import {useState} from 'react'

export default function FriendRequest(){
    const auth = useRecoilValue(authenticated)
    const [deactivatedUsers, setDeactivatedUsers] = useState<string[]>([])
    const { data, error } = useQuery(GET_FRIEND_REQUEST, {
        variables:{
            id: auth.user.id
        }
    })
    if(error){
        toast.error(error.message)
    }
    return (
        <>
        {
            data && data.getFriendRequest.length !== deactivatedUsers.length ? (
                <h2>Friend Request</h2>
            ):null
        }
        <div className={s.content}>

        {
            data ? data.getFriendRequest.map((u:User)=>(
                !deactivatedUsers.includes(u.id) && (
                    <FriendCard setDeactivatedUsers={setDeactivatedUsers} key={u.id} user={u} isRequest={true}/>
                )
                )):null
            }
            </div>
        </>
    )
}