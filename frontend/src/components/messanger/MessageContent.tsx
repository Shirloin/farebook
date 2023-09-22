import { useRef, useEffect } from 'react'
import s from './MessageContent.module.css'
import MessageBubble from './MessageBubble'
import { MESSAGE_CREATED } from '../../query/MessageQuery'
import { useSubscription } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Message } from '../../model/Message'
import { authenticated } from '../../store'
import { useRecoilValue } from 'recoil'
import MessageSend from './MessageSend'
export default function MessageContent() {
    const topRef = useRef<HTMLDivElement | null>(null);
    const auth = useRecoilValue(authenticated)
    const{id} = useParams()

    
    const { data, error } = useSubscription(MESSAGE_CREATED, {
        variables: {
            userId: auth.user.id,
            roomId: id
        }
    })
    if(error){
        // console.log(auth.user.id)
        // console.log(error)
    }
    
    
    
    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollTop = topRef.current.scrollHeight;
        }
    }, [data]);
    if (id === undefined) {
        return <div>Loading...</div>; 
      }

    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.top} ref={topRef}>
                        {
                            data && data.messageCreated && Array.isArray(data.messageCreated) && data.messageCreated.map((m: Message)=>
                                <MessageBubble isMe={m.user.id === auth.user.id} m={m} key={m.id}/>
                            )
                        }
                    </div>
                    <div className={s.bot}>
                        <MessageSend roomId={id} userId={auth.user.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}