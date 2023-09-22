/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiImageAdd } from 'react-icons/bi'
import s from './MessageContent.module.css'
import { MdKeyboardVoice } from 'react-icons/md'
import {useState} from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_MESSAGE } from '../../query/MessageQuery'
import { toast } from 'react-hot-toast'
export default function MessageSend({ roomId, userId }: { roomId: string; userId: string }) {

    const [message, setMessage] = useState('')

    const [create_message] = useMutation(CREATE_MESSAGE, {
        variables:{
           inputMessage:{
                roomID: roomId,
                userId: userId,
                message: message
           }
        }
    })

    const HandleSubmit = async (e:any)=>{
        e.preventDefault()
        try {
            setMessage('')
            await create_message()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <form className={s.form} onSubmit={HandleSubmit}>
                <label>
                    <BiImageAdd />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </label>
                <label>
                    <MdKeyboardVoice />
                    <input
                        type="file"
                        accept="audio/*"
                        style={{ display: 'none' }}
                    />
                </label>
                <input type="text" className={s.input} value={message} onChange={(e:any)=>{setMessage(e.target.value)}}/>
            </form>
        </>
    )
}