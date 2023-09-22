import { useRecoilValue } from 'recoil'
import ContainerCard from '../cards/ContainerCard'
import NotificationCard from './NotificationCard'
import s from './NotificationPage.module.css'
import { authenticated } from '../../store'
import { useQuery } from '@apollo/client'
import { GET_NOTIFICATION } from '../../query/NotificationQuery'
import { toast } from 'react-hot-toast'
import { Notification } from '../../model/Notification'
import {useEffect} from 'react'
export default function NotificationPage() {


    const auth = useRecoilValue(authenticated)
    const { data, error, refetch } = useQuery(GET_NOTIFICATION, {
        variables: {
            id: auth.user.id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    if(data){
        // console.log(data)
    }

    useEffect(()=>{
        refetch()
    }, [])

    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    {
                        data && data.getNotification.length > 0? (
                            <ContainerCard>
                                <h1>Notifications</h1>
                                {
                                    data.getNotification.map((notif: Notification)=>(
                                        <NotificationCard key={notif.id} notification={notif}/>
                                    ))
                                }
                            </ContainerCard>
                        ) : (
                            <h1>Notification Empty</h1>
                        )
                    }
                </div>
            </div>
        </>
    )
}