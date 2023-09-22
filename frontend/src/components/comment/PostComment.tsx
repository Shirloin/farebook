/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client'
import s from './PostComment.module.css'
import { ImImages } from 'react-icons/im'
import { CREATE_COMMENT, GET_COMMENT } from '../../query/CommentQuery'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { PostProps } from '../../model/Post'
import { EditorState, convertToRaw } from 'draft-js'
import { GET_ALL_USER } from '../../query/UserQuery'
import { User } from '../../model/User'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function PostComment({ post }: PostProps) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const auth = useRecoilValue(authenticated)
    const fileInputRef = useRef(null)
    const btn = useRef<HTMLButtonElement>(null);
    const { data, error } = useQuery(GET_ALL_USER)
    if (error) {
        toast.error(error.message)
    }
    const userSuggestions = data?.getAllUser.map((user: User) => ({
        text: user.firstname + user.lastname,
        value: user.firstname + user.lastname,
        url: `/profile/${user.id}`,
    }));

    const [create_comment] = useMutation(CREATE_COMMENT, {
        variables: {
            inputComment: {
                userId: auth.user.id,
                postId: post.id,
                text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            }
        },
        refetchQueries: [
            { query: GET_COMMENT, variables: { id: post.id } }
        ],
    })

    const HandleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await create_comment()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className={s.container}>
                <form className={s.form} onSubmit={HandleSubmit}>
                    <div className={s.editor}>
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
                            handleKeyCommand={(command:any)=>{
                                if(command==='split-block'){
                                    btn.current?.click()
                                    return 'handled'
                                }
                                return 'not-handled'
                            }}
                        />
                    </div>
                    <label htmlFor="fileInput" >
                        <ImImages className={s.item} size={24} />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                     <button type="submit" style={{ display: "none" }} ref={btn}>Submit</button>
                </form>
            </div>
        </>
    )
}
const editorContainerStyle = {
    height: 60,
    maxWidth: 500,
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 8,
};