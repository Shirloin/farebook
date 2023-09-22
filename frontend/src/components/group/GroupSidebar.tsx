/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import GroupCard from "./GroupCard";
import s from './GroupSidebar.module.css'
import a from '../../style/components/Searchbar.module.css'
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GROUP, GET_GROUP, GET_MY_GROUP } from "../../query/GroupQuery";
import { useRecoilValue } from "recoil";
import { authenticated } from "../../store";
import { toast } from "react-hot-toast";
import { IS_MEMBER, JOIN_GROUP, LEAVE_GROUP } from "../../query/MemberQuery";
import Loading from "../Loading";
import { Group } from "../../model/Group";
import { useEffect } from 'react'
import { CREATE_GROUP_ROOM } from "../../query/GroupRoomQuery";

export default function GroupSidebar() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path={'/'} element={<DefaultGroup />}></Route>
                    <Route path={'/:id'} element={<SpecificGroup />}></Route>
                    <Route path={'/create'} element={<CreateGroup />}></Route>
                </Routes>
            </Sidebar>
        </>
    )
}

function SpecificGroup() {
    const { id } = useParams()
    const auth = useRecoilValue(authenticated)

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
                        <div className={s.top}>
                            <div className={s['top-top']}>
                                <div className={s['top-top-left']}>
                                    <img src={group.image} className={s.img} alt="" />
                                </div>
                                <div className={s['top-top-right']}>
                                    <h3>{group.name}</h3>
                                    <h5>{group.privacy} group</h5><span>{group.members.length} Member</span>
                                </div>
                            </div>
                            <div className={s['top-bot']}>
                                <LeaveGroup />
                            </div>
                        </div>
                        <div className={s.bot}>

                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

function CreateGroup() {

    const auth = useRecoilValue(authenticated)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [privacy, setPrivacy] = useState('Public')
    const [create_group, { loading: createGroupLoading }] = useMutation(CREATE_GROUP, {
        variables: {
            inputGroup: {
                name: name,
                privacy: privacy,
            }
        },
        refetchQueries: [
            { query: GET_MY_GROUP, variables: { id: auth.user.id } }
        ]
    })
    const [create_group_room] = useMutation(CREATE_GROUP_ROOM)

    const [join_group, { loading: joinGroupLoading }] = useMutation(JOIN_GROUP)

    const HandleSubmit = async (e: any) => {
        e.preventDefault()
        if (name == '') {
            toast.error('Group name must be filled')
            return
        }
        try {
            const res = await create_group()
            if (res.data && res.data.createGroup) {
                if (createGroupLoading || joinGroupLoading) {
                    toast.loading("Creating Group")
                }
                await join_group({
                    variables: {
                        inputMember: {
                            userId: auth.user.id,
                            groupId: res.data.createGroup.id,
                            role: "Admin",
                            confirmed: true
                        }
                    }
                })
                // await create_group_room({
                //     variables:{
                //         id: res.data.createGroup.id
                //     }
                // })
            }
            navigate('/group/' + res.data.createGroup.id)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            toast.dismiss()
        }

    }



    return (
        <>
            <form className={s.container} onSubmit={HandleSubmit}>
                <div className={s.top}>
                    <h1>Create Group</h1>
                    <input type="text" className={s['input-name']} onChange={(e: any) => { setName(e.target.value) }} value={name} />
                    <div className={s.privacy}>
                        <label className={s.lbl}>
                            <input type="radio" name="privacy" value={"Public"} onChange={() => (setPrivacy("Public"))} />
                            <span>Public</span>
                        </label>
                        <label className={s.lbl}>
                            <input type="radio" name="privacy" value={"Private"} onChange={() => (setPrivacy("Private"))} />
                            <span>Private</span>
                        </label>
                    </div>
                </div>
                <div className={s.bot}>
                    <button className={s.create}>Create</button>
                </div>
            </form>
        </>
    )
}

function DefaultGroup() {

    const auth = useRecoilValue(authenticated)
    const { data, loading, error, refetch } = useQuery(GET_MY_GROUP, {
        variables: {
            id: auth.user.id
        }
    })

    useEffect(() => {
        refetch()
    }, [])
    if (loading) {
        return <Loading />
    }
    if (error) {
        toast.error(error.message)
    }
    if (data) {
        // console.log(data)
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.top}>
                    <h1>Groups</h1>
                    <input type="text" className={a.input} />
                    <Link to={'/group/create'}>
                        <button className={s.btn}>+ Create New Group</button>
                    </Link>
                </div>
                {/* <hr /> */}
                <div className={s.bot}>
                    {
                        data && data.getMyGroup.map((group: Group) => (
                            <GroupCard key={group.id} group={group} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

function LeaveGroup() {
    const { id } = useParams()
    const navigate = useNavigate()
    const auth = useRecoilValue(authenticated)
    const [leave_group] = useMutation(LEAVE_GROUP, {
        variables: {
            userId: auth.user.id,
            groupId: id
        },
        refetchQueries: [
            {
                query: GET_GROUP, variables: { id: id },
            },
        ]
    })

    const HandleLeave = async () => {
        try {
            await leave_group()
            toast.success("Leave Group Success")
            navigate('/')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const { data, error } = useQuery(IS_MEMBER, {
        variables: {
            groupId: id,
            userId: auth.user.id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            {
                data && data.isMember === "True" ? (
                    <button className={s.btn} onClick={HandleLeave}>Leave</button>
                ) : null
            }
        </>
    )
}