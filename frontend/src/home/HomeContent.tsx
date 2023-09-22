/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Card from "../components/cards/ContainerCard"
import { useQuery } from "@apollo/client"
import CreatePost from "../components/post/CreatePost"
import PostTab from "../components/tab/PostTab"
import s from "./Content.module.css"
import { toast } from "react-hot-toast"
import { Post } from "../model/Post"
import PostComponent from "../components/post/PostComponent"
import { useEffect, useRef } from "react"
import { GET_LIMIT_POSTS } from "../query/PostQuery"
import Loading from "../components/Loading"
// import { useRecoilValue } from "recoil"
// import { authenticated } from "../store"

export default function HomeContent() {

    const hasNextPage = useRef(false)
    const observerTarget = useRef(null);
    // const [loading, setLoading] = useState(false)
    const { data, loading, error, fetchMore, refetch } = useQuery(GET_LIMIT_POSTS, {
        variables: {
            limit: 5
        }
    })
    if(data){
        // console.log(data.getLimitPosts.edges)
    }

    const loadMore = () => {
        if (data && data.getLimitPosts && data.getLimitPosts.edges) {
            fetchMore({
                variables: {
                    limit: 5,
                    after: hasNextPage.current ? data.getLimitPosts.pageInfo.endCursor : undefined,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if(prev && prev.getLimitPosts){
                        if (!prev.getLimitPosts.edges || !fetchMoreResult.getLimitPosts.edges) {
                            return prev;
                        }
                    }
                    return {
                        getLimitPosts: {
                            ...fetchMoreResult.getLimitPosts,
                            edges: [
                                ...prev.getLimitPosts.edges,
                                ...fetchMoreResult.getLimitPosts.edges,
                            ],
                        },
                    };
                },
            })
        }
    }
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loading]);
    useEffect(() => {
        if(data && data.getLimitPosts && data.getLimitPosts.edges){
            hasNextPage.current = data.getLimitPosts.pageInfo.hasNextPage;
            // console.log(hasNextPage)
        }
    }, [data]);
    useEffect(()=>{
        refetch()
    }, [])

    if (error) {
        toast.error(error.message)
    }
    if (data) {
        // console.log(data)
        // setHasNextPage(data.getPosts.pageInfo.hasNextPage)
    }


    return (
        <>
            <div className={s.container}>
                <PostTab />
                <CreatePost />
                {
                    data && data.getLimitPosts && data.getLimitPosts.edges?  data.getLimitPosts.edges.map((post: any, index: number) => (
                        <PostComponent key={index} post={post.node as Post} />
                    )) : null
                }
                <div ref={observerTarget}></div>
                {loading ? (
                    <Loading/>
                ):null}
            </div>
        </>
    )
}

