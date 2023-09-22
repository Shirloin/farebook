/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import s from './GroupSidebar.module.css'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../../store'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { User } from '../../model/User'
import { GroupProps } from '../../model/Group'
import { GET_NON_MEMBER_FRIEND, INVITE_MEMBER } from '../../query/MemberQuery'
export default function GroupInvite({ group }: GroupProps) {

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