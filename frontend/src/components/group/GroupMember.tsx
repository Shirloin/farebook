/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { DELETE_MEMBER, GET_ADMIN, GET_MEMBER, PROMOTE_MEMBER } from "../../query/MemberQuery"
import { toast } from "react-hot-toast"
import { Member } from "../../model/Member"
import ContainerCard from "../cards/ContainerCard"
import s from './GroupMember.module.css'
import { BsThreeDots } from "react-icons/bs"

export default function GroupMember() {
    const { id } = useParams()
    const { data, error } = useQuery(GET_MEMBER, {
        variables: {
            id: id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    const [delete_member] = useMutation(DELETE_MEMBER, {
        refetchQueries: [
            {
                query: GET_MEMBER, variables: {
                    id: id
                }
            }
        ]
    })

    const [promote_member] = useMutation(PROMOTE_MEMBER, {
        refetchQueries: [
            {
                query: GET_MEMBER, variables: {
                    id: id
                }
            }
        ]
    })

    const HandleKick = async (id: string) => {
        try {
            await delete_member({
                variables: {
                    id: id
                }
            })
            toast.success("Kick Member Success")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const HandlePromote = async (id: string) => {
        try {
            await promote_member({
                variables: {
                    id: id
                }
            })
            toast.success("Promote Member Success")
        } catch (error: any) {
            toast.error(error.message)
        }
    }


    return (
        <>
            <ContainerCard>
                <AdminList/>
                {
                    data && data.getMember && data.getMember.map((m: Member) => (
                        <div className={s.container}>
                            <div className={s.right}>
                                <img src={m.user.image} alt="" className={s.img} />
                                <h4>{m.user.firstname} {m.user.lastname}</h4>
                                <p>{m.role}</p>
                            </div>
                            <div className={s.left}>
                                <button className={s.btn}><BsThreeDots /></button>
                                <ul className={s.popup}>
                                    <li onClick={() => HandleKick(m.id)}>Kick</li>
                                    {
                                        m.role === "Member" ? (
                                            <li onClick={() => HandlePromote(m.id)}>Promote</li>
                                        ) : null
                                    }
                                </ul>
                            </div>
                        </div>
                    ))
                }
            </ContainerCard>
        </>
    )
}

function AdminList() {
    const { id } = useParams()
    const { data, error } = useQuery(GET_ADMIN, {
        variables: {
            id: id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            {
                data && data.getAdmin && data.getAdmin.map((m: Member) => (
                    <div className={s.container}>
                        <div className={s.right}>
                            <img src={m.user.image} alt="" className={s.img} />
                            <h4>{m.user.firstname} {m.user.lastname}</h4>
                            <p>{m.role}</p>
                        </div>
                        <div className={s.left}>
                            {/* <button className={s.btn}><BsThreeDots /></button>
                            <ul className={s.popup}>
                                <li onClick={() => HandleKick(m.id)}>Kick</li>
                                {
                                    m.role === "Member" ? (
                                        <li onClick={() => HandlePromote(m.id)}>Promote</li>
                                    ) : null
                                }
                            </ul> */}
                        </div>
                    </div>
                ))
            }
        </>
    )
}