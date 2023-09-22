import { useParams } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import { useQuery } from "@apollo/client";
import { GET_GROUP_POST } from "../../query/PostQuery";
import PostComponent from "../post/PostComponent";
import { Post } from "../../model/Post";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { authenticated } from "../../store";
import { IS_MEMBER } from "../../query/MemberQuery";

export default function GroupPost() {
    const { id } = useParams()

    const { data, error } = useQuery(GET_GROUP_POST, {
        variables: {
            id: id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            <GroupCreatePost/>
            {
                data && data.getGroupPost.map((post: Post, index: number) => (
                    <PostComponent key={index} post={post as Post} />
                ))
            }
        </>
    )
}

function GroupCreatePost() {
    const {id} = useParams()
    const auth = useRecoilValue(authenticated)

    const {data, error} = useQuery(IS_MEMBER, {
        variables:{
            userId: auth.user.id,
            groupId: id
        }
    })
    if(error){
        toast.error(error.message)
    }

    return (
        <>
        {
            data && data.isMember ? (
                <CreatePost />
            ):null
        }
        </>
    )
}