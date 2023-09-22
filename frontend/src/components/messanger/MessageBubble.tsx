import { Message } from '../../model/Message'
import s from './MessageBubble.module.css'

interface MessageProps{
    m: Message,
    isMe: boolean
}

export default function MessageBubble({m, isMe}: MessageProps) {

    return isMe ? (
        <>
            <div className={s.me}>
                <div className={s.info}>
                    <h4>{m.user.firstname}</h4>
                    <p>{m.message}</p>
                </div>
            </div>
        </>
    ) : (
        <>
            <div className={s.you}>
                <div className={s.info}>
                    <h4>{m.user.firstname}</h4>
                    <p>{m.message}</p>
                    {/* <audio controls>
                        <source src='https://storage.cloud.google.com/tpa-web-f46c8.appspot.com/Bangkok_cjjImvMqYlo.mp3' />
                    </audio> */}
                </div>
            </div>
        </>
    )
}