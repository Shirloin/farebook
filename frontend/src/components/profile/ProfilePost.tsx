import { useQuery } from "@apollo/client"
import { GET_USER_POST } from "../../query/PostQuery"
import { useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import s from './ProfilePost.module.css'
import { Post } from "../../model/Post"
import PostComponent from "../post/PostComponent"
import CreatePost from "../post/CreatePost"

export default function ProfilePost(){

    const {id} = useParams()
    const {data, error} = useQuery(GET_USER_POST, {
        variables: {
            id: id
        }
    })
    if(error){
        toast.error(error.message)
    }
    if(data){
        // console.log(data)
    }

    return (
        <>
        <div className={s.container}>
            {/* <CreatePost/> */}
            {
                data ? data.getUserPost.map((post:Post)=>(
                    <PostComponent post={post} key={post.id}/>
                )):null
            }
        </div>
        </>
    )
}