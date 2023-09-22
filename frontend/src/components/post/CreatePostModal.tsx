/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import s from './CreatePostModal.module.css'
import Modal from '../modal/Modal'
import { HandleFormClick } from '../../helper/helper'
// import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdOutlinePhotoLibrary } from 'react-icons/md'
import Profile from '../Profile'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_POST, GET_GROUP_POST, GET_LIMIT_POSTS } from '../../query/PostQuery'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { toast } from 'react-hot-toast'
import { GET_ALL_USER } from '../../query/UserQuery'
import { User } from '../../model/User'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { IoMdCloseCircleOutline } from 'react-icons/io'
import Loading from '../Loading'
import { GET_NOTIFICATION } from '../../query/NotificationQuery'
import { useParams } from 'react-router-dom'

export default function CreatePostModal() {
    const {id} = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const [privacy, setPrivacy] = useState('Public')
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    type Preview = {
        url: string;
        type: 'image' | 'video';
    };

    const [imagePreviews, setImagePreviews] = useState<Preview[]>([]);

    const auth = useRecoilValue(authenticated)
    const fileUploads = selectedFiles.map((file) => new File([file], file.name));
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [create_post] = useMutation(CREATE_POST, {
        variables: {
            inputPost: {
                userId: auth.user.id,
                content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                file: fileUploads,
                privacy: privacy,
                groupId: id
            },
        },
        refetchQueries: [
            {
                query: GET_LIMIT_POSTS, variables: {
                    limit: 5
                }
            },
            {
                query: GET_NOTIFICATION,
                variables: {
                    id: auth.user.id
                }
            },
            {
                query: GET_GROUP_POST, variables: {
                    id: id
                }
            }
        ],
    })

    const { data, error } = useQuery(GET_ALL_USER)
    if (error) {
        toast.error(error.message)
    }
    const userSuggestions = data?.getAllUser.map((user: User) => ({
        text: user.firstname + user.lastname,
        value: user.firstname + user.lastname,
        url: `/profile/${user.id}`,
    }));


    const HandleClick = () => {
        setIsOpen(!isOpen)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setSelectedFiles(files)

        const previews = files.map(file => {
            const type: "image" | "video" = file.type.startsWith('image') ? 'image' : 'video';
            return { url: URL.createObjectURL(file), type };
        });

        setImagePreviews(previews)
    }
    const HandleRemove = (indexToRemove: number) => {
        const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        const newPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);

        setSelectedFiles(newFiles);
        setImagePreviews(newPreviews);
    }

    const HandleSubmit = async () => {
        console.log(id)
        console.log("test")
        const contentState = editorState.getCurrentContent();
        const text = draftToHtml(convertToRaw(contentState))
        if (text.length === 0) {
            toast.error("Comment must not be empty")
            return
        }
        setLoading(true);
        try {
            await create_post()
            toast.success("Post Success")
            HandleClick()
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button className={s.btn} onClick={HandleClick}><h2>Post Here</h2></button>

            {
                isOpen === true ? (

                    <Modal HandleClick={HandleClick}>
                        <div onClick={HandleFormClick} className={s.box}>
                            <div className={s.top}>
                                <h1 className={s.title}>Create Post</h1>
                                {/* <button className={s.close}>
                                    <AiOutlineCloseCircle />
                                </button> */}
                            </div>
                            <div className={s.middle}>
                                <div className={s['mid-top']}>
                                    <Profile />
                                    <div className={s['mid-top-right']}>
                                        <h4>{auth.user.firstname} {auth.user.lastname}</h4>
                                        <div>
                                            <select name="" id="" onChange={(e: any) => { setPrivacy(e.target.value) }} value={privacy}>
                                                <option value="Public">Public</option>
                                                <option value="Private">Private</option>
                                                <option value="Close Friend">Close Friend</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    toolbarHidden={true}
                                    placeholder='Comment....'
                                    mention={{
                                        separator: ' ',
                                        trigger: '@',
                                        suggestions:
                                            userSuggestions
                                    }}
                                    hashtag={{}}
                                    editorStyle={editorContainerStyle}
                                />
                            </div>
                            <div className={s['mid-bot']}>
                                {imagePreviews.map((preview, index) => (
                                    <div className={s.media} key={index}>
                                        {preview.type === 'image' ? (
                                            <img className={s.img} src={preview.url} alt={`Preview ${index}`} />
                                        ) : (
                                            <video className={s.video} src={preview.url} autoPlay={false} controls />
                                        )}
                                        <div onClick={() => HandleRemove(index)} className={s.removeButton}>
                                            <IoMdCloseCircleOutline />
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className={s.bottom}>
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        <label className={s['bottom-top']}>
                                            <h4 className={s.text}>Add to your post</h4>
                                            <input onChange={handleFileChange} type="file" multiple style={{ display: 'none' }} ref={fileInputRef} />
                                            <MdOutlinePhotoLibrary className={s.select} />
                                        </label>
                                        <button onClick={HandleSubmit} className={s['bottom-btn']}>Post</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Modal>
                ) : null
            }
        </>
    )
}

const editorContainerStyle = {
    height: '150px',
    overflow: 'auto',
    border: '1px solid black',
    padding: '8px',
    borderRadius: '20px',
};