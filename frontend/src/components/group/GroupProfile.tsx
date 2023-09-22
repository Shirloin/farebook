/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import { GroupProps } from '../../model/Group'
import s from './GroupProfile.module.css'
import GroupTab from './GroupTab'
import GroupPost from './GroupPost'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { useMutation, useQuery } from '@apollo/client'
import { GET_NON_MEMBER_FRIEND, INVITE_MEMBER, IS_ADMIN, IS_MEMBER, JOIN_GROUP } from '../../query/MemberQuery'
import { toast } from 'react-hot-toast'
import { User } from '../../model/User'
import { GET_GROUP_ROOM } from '../../query/GroupRoomQuery'
import GroupMember from './GroupMember'
import EditGroupModal from './EditGroupModal'
export default function GroupProfile({ group }: GroupProps) {

    const { data, error } = useQuery(GET_GROUP_ROOM, {
        variables: {
            id: group.id
        }
    })
    if (error) {
        console.log(error.message)
    }

    const [activeButton, setActiveButton] = useState(0)
    const Move = (i: number) => {
        setActiveButton(i)
    }
    return (
        <>
            <div className={s.container}>
                <div className={s.top}>
                    <img src={group.image} className={s.image} alt="" />
                    <IsAdmin group={group} />
                </div>
                <div className={s.bot}>
                    <h1>{group.name}</h1>
                    <IsMember group={group} />
                </div>
                <hr />
                <GroupTab activeButton={activeButton} Move={Move} />
            </div>
            <div className={s.content}>
                {
                    activeButton === 0 ? (
                        <>
                            <GroupPost />
                        </>
                    ) : null
                }
                {
                    activeButton === 1 ? (
                        <>
                            <Link to={'/messages/group/' + data.getGroupRoom.id} >
                                <button className={s.chat}>Chat Here</button>
                            </Link>
                        </>
                    ) : null
                }
                {
                    activeButton === 2 ? (
                        <></>
                    ) : null
                }
                {
                    activeButton === 3 ? (
                        <GroupMember />
                    ) : null
                }
            </div>
        </>
    )
}

function IsAdmin({ group }: GroupProps) {
    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(IS_ADMIN, {
        variables: {
            groupId: group.id,
            userId: auth.user.id
        }
    })

    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            {
                data && data.isAdmin === "True" ? (
                    <EditGroupModal group={group}/>
                ) : null
            }
        </>
    )
}

function IsMember({ group }: GroupProps) {
    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(IS_MEMBER, {
        variables: {
            groupId: group.id,
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
                    <GroupInvite group={group} />
                ) : (
                    <JoinGroup group={group} />
                )
            }
        </>
    )
}

function GroupInvite({ group }: GroupProps) {

    const auth = useRecoilValue(authenticated);
    const [isOpen, setIsOpen] = useState(false);
    const { data, error } = useQuery(GET_NON_MEMBER_FRIEND, {
        variables: {
            id: auth.user.id,
            groupId: group.id
        },
    });
    const [invite_member] = useMutation(INVITE_MEMBER)
    const dropdownRef = useRef(null);
    if (error) {
        toast.error(error.message);
    }

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const HandleInvite = async (id: string) => {
        try {
            await invite_member({
                variables: {
                    userId: id,
                    groupId: group.id,
                    memberId: auth.user.id
                }
            })
            toast.success("Invite Success")
        } catch (error: any) {
            toast.error(error.message)
        }
        handleDropdownToggle()
    }

    return (
        <>
            <div className={s.invite} >
                <div className={s['invite-content']}>
                    <button className={s.btn} onClick={handleDropdownToggle}>+ Invite</button>
                    {isOpen && data && data.getNonMemberFriend && (
                        data && data.getNonMemberFriend ? (
                            <div className={s.dropdown} ref={dropdownRef}>
                                {data.getNonMemberFriend.map((friend: User, index: number) => (
                                    <div key={index} className={s.dropdownItem} onClick={() => HandleInvite(friend.id)}>
                                        {friend.firstname} {friend.lastname}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={s.dropdown}>
                                <h3>No Friends</h3>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

function JoinGroup({ group }: GroupProps) {
    const auth = useRecoilValue(authenticated)
    const [join_group] = useMutation(JOIN_GROUP, {
        variables: {
            inputMember: {
                userId: auth.user.id,
                groupId: group.id,
                role: "Member",
                confirmed: false
            }
        }
    })
    const HandleClick = async () => {
        try {
            await join_group()
            toast.success("Request Submitted")
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <div className={s.invite}>
                <div className={s['invite-content']}>

                </div>
                <button className={s.btn} onClick={HandleClick}>Join Group</button>
            </div>
        </>
    )
}

