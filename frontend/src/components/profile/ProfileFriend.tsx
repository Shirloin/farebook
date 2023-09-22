import { useQuery } from "@apollo/client";
import ContainerCard from "../cards/ContainerCard";
import { GET_FRIEND } from "../../query/FriendQuery";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User } from "../../model/User";
import FriendCard from "../../friend/FriendCard";
import { useState } from 'react'
import s from './ProfileFriend.module.css'
import { useRecoilValue } from "recoil";
import { authenticated } from "../../store";

export default function ProfileFriend() {

    const auth = useRecoilValue(authenticated)

    const { id } = useParams()
    const [deactivatedUsers, setDeactivatedUsers] = useState<string[]>([])
    const { data, error } = useQuery(GET_FRIEND, {
        variables: {
            id: id
        }
    })
    if (error) {
        toast.error(error.message)
    }

    return (
        <>
            <ContainerCard>
                <div className={s.container}>
                    <div className={s.content}>
                        {
                            data ? data.getFriend.map((u: User) => (
                                !deactivatedUsers.includes(u.id) && u.id !== auth.user.id  && (
                                    <FriendCard key={u.id} setDeactivatedUsers={setDeactivatedUsers} user={u} isRequest={false} />
                                )
                            )) : null
                        }
                    </div>
                </div>
            </ContainerCard>
        </>
    )
}