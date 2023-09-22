import { useQuery } from "@apollo/client"
import { GET_SEARCH_POST } from "../../query/PostQuery"
import { toast } from "react-hot-toast"
import { useContext, useEffect } from "react"
import { SearchContext } from "../../context/SearchContext"
import PostComponent from "../post/PostComponent"
import { Post } from "../../model/Post"


export default function SearchPost() {
    const { searchTerm } = useContext(SearchContext)
    const { data, error, refetch } = useQuery(GET_SEARCH_POST, {
        variables: {
            str: searchTerm
        }
    })
    useEffect(()=>{
        refetch()
    }, [])
    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            {
                data ? data.getSearchPost.map((post: Post) => (
                    <PostComponent key={post.id} post={post} />
                )) : null
            }
        </>
    )
}