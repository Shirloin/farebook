/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImImages } from 'react-icons/im'
import s from './CommentReply.module.css'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_COMMENT, GET_COMMENT } from '../../query/CommentQuery'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { CommentProps } from '../../model/Comment'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { Editor } from 'react-draft-wysiwyg'
import {  ContentState, EditorState, Modifier, SelectionState, convertToRaw } from 'draft-js'
import { GET_ALL_USER } from '../../query/UserQuery'
import { User } from '../../model/User'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function CommentReply({ id, comment }: CommentProps & { id: string }) {

    const initialMention = {
        text: `@${comment.user.firstname}${comment.user.lastname}`,
        link: `/profile/${comment.user.id}`
    }
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
    const btn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setEditorState(createInitialMention(initialMention.text, initialMention.link))
        // console.log(comment)
    }, [])
    const parentValue = comment.parent?.id ? comment.parent?.id : comment.id
    const auth = useRecoilValue(authenticated)
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
                postId: comment.post.id,
                parent: parentValue,
                text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            }
        }, refetchQueries: [
            { query: GET_COMMENT, variables: { id: id } }
        ],
    })

    const HandleSubmit = async (e: any) => {
        e.preventDefault()
        // console.log(comment.parent?.id)
        // console.log(comment.id)

        try {
            await create_comment()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <div>
                <div className={s.container}>
                    <form className={s.form} onSubmit={HandleSubmit} >
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
                        />
                        <button type="submit" style={{ display: "none" }} ref={btn}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

const editorContainerStyle = {
    height: 50,
    maxWidth: 400,
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 8,
};


const createInitialMention = (text: string, link: string): EditorState => {
    const contentState = ContentState.createFromText(text);
    const contentStateWithEntity = contentState.createEntity(
        'MENTION', 
        'IMMUTABLE', 
        { link: link, text: text }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const contentStateWithMention = Modifier.applyEntity(
        contentStateWithEntity, 
        new SelectionState({
            anchorKey: contentState.getFirstBlock().getKey(),
            anchorOffset: 0,
            focusKey: contentState.getFirstBlock().getKey(),
            focusOffset: text.length,
        }),
        entityKey
    );

    return EditorState.createWithContent(contentStateWithMention);
}