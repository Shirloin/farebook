import { useRef, useEffect } from 'react'
import s from './MessageContent.module.css'
import MessageBubble from './MessageBubble'
import { useSubscription } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Message } from '../../model/Message'
import { authenticated } from '../../store'
import { useRecoilValue } from 'recoil'
import { GROUP_CHAT_CREATED } from '../../query/GroupChatQuery'
import GroupMessageSend from './GroupMessageSend'
export default function GroupMessageContent() {
    const topRef = useRef<HTMLDivElement | null>(null);
    const auth = useRecoilValue(authenticated)
    const{id} = useParams()

    
    const { data, error } = useSubscription(GROUP_CHAT_CREATED, {
        variables: {
            userId: auth.user.id,
            groupRoomId: id
        }
    })
    if(error){
        // console.log(auth.user.id)
    }
    console.log(data)
    
    
    
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
                            data && data.groupChatCreated && Array.isArray(data.groupChatCreated) && data.groupChatCreated.map((m: Message)=>
                                <>
                                {
                                    // console.log({m})
                                }
                                <MessageBubble isMe={m.user.id === auth.user.id} m={m} key={m.id}/>
                                </>
                            )
                        }
                    </div>
                    <div className={s.bot}>
                        <GroupMessageSend roomId={id} userId={auth.user.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}