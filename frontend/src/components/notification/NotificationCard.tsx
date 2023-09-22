/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from '@apollo/client'
import { NotifProps } from '../../model/Notification'
import s from './NotificationCard.module.css'
import { GoDotFill } from 'react-icons/go'
import { GET_NOTIFICATION, UPDATE_NOTIFICATION_STATUS } from '../../query/NotificationQuery'
import { GrCheckmark } from 'react-icons/gr'
import { toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { CONFIRM_MEMBER, DELETE_MEMBER, IS_MEMBER_BY_ID } from '../../query/MemberQuery'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { GroupProps } from '../../model/Group'
import { GET_GROUP } from '../../query/GroupQuery'
export default function NotificationCard({ notification }: NotifProps) {

    const auth = useRecoilValue(authenticated)
    const [update_status] = useMutation(UPDATE_NOTIFICATION_STATUS, {
        variables: {
            id: notification.id
        },
        refetchQueries: [
            { query: GET_NOTIFICATION, variables: { id: notification.receiver.id } }
        ]
    })
    const [confirm_member] = useMutation(CONFIRM_MEMBER, {
        variables: {
            id: notification.content
        },
        refetchQueries:[
            {
                query:GET_NOTIFICATION, variables:{id: auth.user.id},
            },
            {
                query: IS_MEMBER_BY_ID, variables:{id: notification.content}
            },
        ]
    })
    const [delete_member] = useMutation(DELETE_MEMBER, {
        variables: {
            id: notification.content
        },
        refetchQueries:[
            {
                query:GET_NOTIFICATION, variables:{id: auth.user.id},
            },
            {
                query: IS_MEMBER_BY_ID, variables:{id: notification.content}
            }
        ]
    })

    const {data, error} = useQuery(IS_MEMBER_BY_ID, {
        variables:{
            id: notification.content
        }
    })
    if(error){
        toast.error(error.message)
    }
    console.log(data)

    const HandleConfirm = async(e:any)=>{
        try {
            await confirm_member()
            HandleClick(e)
            toast.success("Confirm Group Success")
        } catch (error:any) {
            toast.error(error.message)
        }
    }

    const HandleReject = async(e:any)=>{
        try {
            await delete_member()
            HandleClick(e)
            toast.success("Confirm Group Rejected")
        } catch (error:any) {
            toast.error(error.message)
        }
    }

    const HandleClick = async (e: any) => {
        e.preventDefault
        try {
            await update_status()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className={s.container} >
                <div className={s.left}onClick={HandleClick}>
                    <img src={notification.sender.image} alt="" />
                    <div className={s['left-right']}>
                        <h3>{notification.sender.firstname} {notification.sender.lastname}</h3>
                        <h5>{notification.message}</h5>
                    </div>
                </div>
                <div className={s.right}>
                    {
                        (notification.type === 'Group Invite' || notification.type === "Join Group") && data && data.isMemberById === "False"? (
                            <>
                                <div className={s.conf} onClick={HandleConfirm}>
                                    <GrCheckmark />
                                </div>
                                <div className={s.conf} onClick={HandleReject}>
                                    <AiOutlineClose />
                                </div>
                            </>
                        ) : null
                    }
                    {
                        notification.status === false ? (
                            <>
                                <GoDotFill />
                            </>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}