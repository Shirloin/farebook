/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery } from '@apollo/client'
import { UserProps } from '../model/User'
import s from './FriendCard.module.css'
import { ADD_FRIEND, CONFIRM_FRIEND_REQUEST, IS_FRIEND, REMOVE_FRIEND_REQUEST } from '../query/FriendQuery'
import { authenticated } from '../store'
import { useRecoilValue } from 'recoil'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
export default function FriendCard({ user, isRequest, setDeactivatedUsers }: UserProps & { isRequest: boolean | null, setDeactivatedUsers: React.Dispatch<React.SetStateAction<string[]>> }) {
    const auth = useRecoilValue(authenticated)

    const { data, error, refetch } = useQuery(IS_FRIEND, {
        variables: {
            inputFriend: {
                user_one: auth.user.id,
                user_two: user.id
            }
        }
    })
    useEffect(() => {
        refetch()
    }, )
    if (error) {
        toast.error(error.message)
    }


    return (
        <>
            <div className={s.container} >
                <Link className={s.top} to={`/profile/${user.id}`}>
                    <img src={user.image} alt="" />
                </Link>
                <div className={s.bot}>
                    <h3>{user.firstname} {user.lastname}</h3>
                    <div className={s['bot-btn']}>
                        {isRequest !== null && isRequest === true ? (
                            <>
                                <ConfirmRequest setDeactivatedUsers={setDeactivatedUsers} user1={user.id} user2={auth.user.id} />
                                <DeleteRequest setDeactivatedUsers={setDeactivatedUsers} user1={user.id} user2={auth.user.id} />
                            </>
                        ) : (
                            data && data.isFriend === false ? (
                                <>
                                    <AddFriend setDeactivatedUsers={setDeactivatedUsers} user1={auth.user.id} user2={user.id} />
                                    <RemoveSuggestion setDeactivatedUsers={setDeactivatedUsers} id={user.id} />
                                </>
                            ) : null
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

function ConfirmRequest({ setDeactivatedUsers, user1, user2 }: { setDeactivatedUsers: React.Dispatch<React.SetStateAction<string[]>>; user1: string, user2: string }) {
    const [confirm_request] = useMutation(CONFIRM_FRIEND_REQUEST, {
        variables: {
            inputFriend: {
                user_one: user1,
                user_two: user2
            }
        }
    })
    const HandleClick = async () => {
        try {
            setDeactivatedUsers(prev => [...prev, user1]);
            await confirm_request()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <button className={s.btn2} onClick={HandleClick}>Confirm</button>
    )
}

function DeleteRequest({ setDeactivatedUsers, user1, user2 }: { setDeactivatedUsers: React.Dispatch<React.SetStateAction<string[]>>; user1: string, user2: string }) {
    const [delete_request] = useMutation(REMOVE_FRIEND_REQUEST, {
        variables: {
            inputFriend: {
                user_one: user1,
                user_two: user2
            }
        }
    })
    const HandleClick = async () => {
        try {
            setDeactivatedUsers(prev => [...prev, user1]);
            await delete_request()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <button onClick={HandleClick}>Delete</button>
    )
}

function AddFriend({ setDeactivatedUsers, user1, user2 }: { setDeactivatedUsers: React.Dispatch<React.SetStateAction<string[]>>; user1: string, user2: string }) {
    const [add_friend] = useMutation(ADD_FRIEND, {
        variables: {
            inputFriend: {
                user_one: user1,
                user_two: user2
            }
        }
    })
    const HandleClick = async () => {
        try {
            setDeactivatedUsers(prev => [...prev, user2]);
            await add_friend()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <button className={s.btn1} onClick={HandleClick}>Add friend</button>
    )
}

function RemoveSuggestion({ setDeactivatedUsers, id }: { setDeactivatedUsers: React.Dispatch<React.SetStateAction<string[]>>; id: string }) {
    const HandleClick = () => {
        setDeactivatedUsers(prev => [...prev, id]);
    }
    return (
        <button onClick={HandleClick}>Remove</button>
    )
}