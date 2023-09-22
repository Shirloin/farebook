/* eslint-disable @typescript-eslint/no-explicit-any */

import MessageRoom from './MessageRoom'
import Sidebar from '../Sidebar'
import s from './MessageSidebar.module.css'
import { useQuery } from '@apollo/client'
import { GET_FRIEND } from '../../query/FriendQuery'
import { toast } from 'react-hot-toast'
import { User } from '../../model/User'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import a from '../../style/components/Searchbar.module.css'
import { useState } from 'react'
import { GET_MY_GROUP_ROOM } from '../../query/GroupRoomQuery'
import { GroupRoom } from '../../model/GroupRoom'
import GroupMessageRoom from './GroupMessageRoom'
export default function MessageSidebar() {

    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(GET_FRIEND, {
        variables: {
            id: auth.user.id
        }
    })
    const [searchTerm, setSearchTerm] = useState('')

    if (error) {
        toast.error(error.message)
    }
    console.log(data)
    return (
        <>
            <Sidebar>
                <div className={s.container}>
                    <div className={s.top}>
                        <h1>Chats</h1>
                        <input type="text" className={a.input} value={searchTerm} onChange={(e: any) => { setSearchTerm(e.target.value) }} />
                    </div>
                    <h1>Group Chat</h1>
                    <div className={s.bot}>
                        <MyGroupChat searchTerm={searchTerm} />
                    </div>
                    <h1>Private Chat</h1>
                    <div className={s.bot}>
                        {
                            data ? data.getFriend
                                .filter((u: User) => {
                                    const firstName = u.firstname || '';
                                    const lastName = u.lastname || '';
                                    const fullName = `${firstName} ${lastName}`.toLowerCase();
                                    return fullName.includes(searchTerm.toLowerCase());
                                })
                                .map((u: User) => (
                                    <MessageRoom key={u.id} u={u} />
                                )) : null
                        }
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

function MyGroupChat({ searchTerm }: { searchTerm: string }) {
    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(GET_MY_GROUP_ROOM, {
        variables: {
            id: auth.user.id
        }
    })

    if (error) {
        toast.error(error.message)
    }
    console.log(data)

    return (
        <>
            {
                data ? data.getMyGroupRoom
                    .filter((g: GroupRoom) => {
                        const name = g.group.name;
                        const fullName = `${name}`.toLowerCase();
                        return fullName.includes(searchTerm.toLowerCase());
                    })
                    .map((g: GroupRoom) => (
                        <GroupMessageRoom key={g.id} g={g} />
                    )) : null
            }
        </>
    )
}