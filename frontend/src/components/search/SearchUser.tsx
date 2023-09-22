import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useQuery } from "@apollo/client"
import { GET_SEARCH_USER } from "../../query/UserQuery"
import { toast } from "react-hot-toast"
import { User } from "../../model/User"
import FriendCard from "../../friend/FriendCard"
import s from './SearchContent.module.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRecoilValue } from "recoil"
import { authenticated } from "../../store"

export default function SearchUser() {

    const auth = useRecoilValue(authenticated)
    const { searchTerm } = useContext(SearchContext)
    const [deactivatedUsers, setDeactivatedUsers] = useState<string[]>([])
    const { data, loading,  error } = useQuery(GET_SEARCH_USER, {
        variables: {
            str: searchTerm
        }
    })
    if(loading){
        return <Skeleton/>
    }
    if (error) {
        toast.error(error.message)
    }

    return (
        <>
            <div className={s.friend}>

                {
                    data ? data.getSearchUser.map((u: User) => (
                        !deactivatedUsers.includes(u.id) && u.id!==auth.user.id  && (
                            <FriendCard setDeactivatedUsers={setDeactivatedUsers} key={u.id} user={u} isRequest={null} />
                        )
                    )) : null
                }
            </div>
        </>
    )
}