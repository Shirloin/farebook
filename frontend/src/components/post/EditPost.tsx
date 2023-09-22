/* eslint-disable @typescript-eslint/no-explicit-any */
import s from './PostProfile.module.css'
import { useState, useEffect, useRef } from 'react'
import { PostProps } from '../../model/Post';
import { useMutation } from '@apollo/client';
import { DELETE_POST, GET_LIMIT_POSTS, UPDATE_POST_PRIVACY } from '../../query/PostQuery';
import { toast } from 'react-hot-toast';
export default function EditPost({ post }: PostProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [update_post_privacy] = useMutation(UPDATE_POST_PRIVACY);
    const [privacy, setPrivacy] = useState(post.privacy)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        };

        if (isPopupOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPopupOpen]);


    const UpdatePrivacy = async (privacy: string, e: any) => {
        e.preventDefault()
        try {
            await update_post_privacy({
                variables: {
                    id: post.id,
                    privacy: privacy
                },
                // refetchQueries: [
                //     {
                //         query: GET_LIMIT_POSTS,
                //         variables: { limit: 5 }
                //     }
                // ]
            })
            setIsPopupOpen(false);
            toast.success("Post privacy updated to " + privacy)
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const [delete_post] = useMutation(DELETE_POST, {
        variables: {
            id: post.id
        },
        refetchQueries: [
            {
                query: GET_LIMIT_POSTS, variables: {
                    limit: 5
                }
            }
        ],
    })

    const HandleDelete = async () => {
        console.log("asdf")
        try {
            await delete_post()
        } catch (error: any) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    const HandleSelectChange = (e: any) => {
        setPrivacy(e.target.value);
        
        if (e.target.value === "Delete") {
            HandleDelete();
        } else {
            UpdatePrivacy(e.target.value, e);
        }
    };

    return (
        <>
            <div className={s.bot}>
                <select name="" id="" onChange={HandleSelectChange} value={privacy}>
                    <option value="Public" onClick={(e: any) => UpdatePrivacy('Public', e)}>Public</option>
                    <option value="Private" onClick={(e: any) => UpdatePrivacy('Private', e)}>Private</option>
                    <option value="Close Friend" onClick={(e: any) => UpdatePrivacy('Close Friend', e)}>Close Friend</option>
                    <option value="Delete">Delete</option>
                </select>
            </div>
        </>
    )
}