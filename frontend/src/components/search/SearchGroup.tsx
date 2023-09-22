import { useQuery } from "@apollo/client"
import { GET_ALL_GROUP } from "../../query/GroupQuery"
import { toast } from "react-hot-toast"
import { Group } from "../../model/Group"
import GroupCard from "../group/GroupCard"
import s from './SearchContent.module.css'

export default function SearchGroup() {

    const { data, error } = useQuery(GET_ALL_GROUP)
    if (error) {
        toast.error(error.message)
    }

    return (
        <>
            <div className={s.container}>
                {
                    data && data.getAllGroup.map((group: Group) => (
                        <GroupCard group={group} key={group.id}/>
                    ))
                }
            </div>
        </>
    )
}