

import {  useParams } from 'react-router-dom'
import s from './GroupContent.module.css'
import GroupProfile from './GroupProfile'
import { useQuery } from '@apollo/client'
import { GET_GROUP } from '../../query/GroupQuery'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Group } from '../../model/Group'
export default function GroupContent() {

    const { id } = useParams()
    const { data, error, refetch } = useQuery(GET_GROUP, {
        variables: {
            id: id
        }
    })
    useEffect(() => {
        refetch()
    }, [])
    if (error) {
        toast.error(error.message)
    }
    const group: Group = data && data.getGroup

    return (
        <>
            {
                data ? (
                    <div className={s.container}>
                        <GroupProfile group={group} />
                    </div>
                ) : null
            }
        </>
    )
}