/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import s from './UserInformation.module.css'
import EditProfileModal from './EditProfileModal';
import { DateConverter } from '../../helper/helper';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { User, UserProps } from '../../model/User';
import { useRecoilValue } from 'recoil';
import { authenticated } from '../../store';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FRIEND, GET_FRIEND, GET_MUTUALS, IS_FRIEND } from '../../query/FriendQuery';
import { toast } from 'react-hot-toast';
import { GET_ROOM } from '../../query/MessageQuery';

export default function UserInformation({ user }: UserProps) {
    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(GET_FRIEND, {
        variables: {
            id: user.id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    const isFriend = data?.getFriend.map((u: User) => {
        if (u.id === auth.user.id) {
            return true;
        }
        return false;
    })
    console.log(data?.getFriend)

    return (
        <>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.img}>
                        {
                            user.image === "" ? (
                                <img className={s.img} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABgcDBAUC/8QAMhAAAgIBAgIIAwgDAAAAAAAAAAECAwQFEQYxEiFRYXGRocETYtEiIzNBQlNjsTJykv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AtIAGmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMOZlV4WLbk3PauqPSff3AYdS1LF02n4mVZtv/jCPXKXgiL5XGWVKTWLjVVx/k3k35bI4OoZt2oZU8jIf2pcorlFdiNYsKk+LxllRkllY1Vkf494tee5KNN1LF1Kn4mLZvt/lCXVKHiisDZ0/Nu0/KhkY72lHmnykuxgWkDDh5NeZi1ZNL3rtj0kZiAAAAAAAAAAABGeOsiUMHHoi9vi2Nvwivq0SYinHsfusKf5KU16L6AQ8AGkAATVxNeBciU8HIok9/h2Jrwa+qZJiKcBR+6zZ/k5QX9/UlZAAAAAAAAAAAA5HFOFLN0ixVrpWVNWRS5vbn6bnXAFSJ78gS/XOFpTsnk6Z0ftPeVDe3X8r9iNX6dnUSauw747fI9vMtI1RvtzNqnTs6+SVWHfJv5Ht58iS6HwtKFkMnU+j9l7xoT36/mfsB1eFsKWFpFasXRstfxJJ81vyXlsdcAgAAAAAAAAAAADHfdXj0yuvnGFcFvKUuSIfq3Fl1snXpsfhV/uyW8peHZ/YEwvvpx49O+2uqPbOSivU58+IdKrbTzYP/RN+qRXd1tl83O6ydk3+qcnJ+p4KVZFfEOlWNbZsE/nTX9o36L6ciPTotrtj2wkpL0KoPdNtlE1Omydc1+qEnF+gSrYBC9J4surlGvUo/Fr/AHYraUfHtJhRdXkUwuonGdc1vGUeTIrIAAAAAAAAeLbIU1yttkoVwW8pPkkeyJcb6i10NOqe26U7e/sXv5AcXXtZs1bI6t440H93X7vvOWAU0ABUAAAOpoOs2aTkde8sab+8r913nLBFWxVZC6uNtUlOua3jJcmj2RLgjUW+np1r32TnV7r38yWkAAAAAA8eRVupZMszPyMhv8Sxtdy36l5bFk6lN1adl2J7OFM2v+WVauRQABUAAAAAAAAbOm5Lw8/HyE/w7E33r815blorrXUVK+RaWm2O3TsWxvdzpg349FEVsgAg/9k=" alt="" />
                            ) : (
                                <img className={s.img} src={user.image} alt="" />
                            )
                        }
                    </div>
                    <div className={s['user-right']}>
                        <h1>{user.firstname} {user.lastname}</h1>
                        <h2>{user.email}</h2>
                        <h2>{
                            DateConverter(user.dob)
                        }</h2>
                        <h2>{user.gender}</h2>
                        {
                            data && data.getFriend ? (
                                <h3>{data.getFriend.length} Friends</h3>
                            ) : null
                        }
                        {
                            auth.user.id !== user.id ? (
                                <MutualFriend user1={auth.user.id} user2={user.id} />
                            ) : null
                        }
                    </div>
                </div>
                <div className={s.right}>
                    {
                        auth.user.id === user.id ? (
                            <div className={s['right-content']}>
                                <button className={s['button-blue']}>
                                    <Link className={s['link-white']} to={'/story/create'}>+ Add to Story</Link>
                                </button>
                                <EditProfileModal />
                            </div>
                        ) : (
                            <div className={s['right-content']}>
                                <IsFriend user1={auth.user.id} user2={user.id} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

function IsFriend({ user1, user2 }: { user1: string } & { user2: string }) {
    const { data, error } = useQuery(IS_FRIEND, {
        variables: {
            inputFriend: {
                user_one: user1,
                user_two: user2,
            }
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            {
                data && data.isFriend ? (
                    <Message user1={user1} user2={user2} />
                ) : (
                    <AddFriend user1={user1} user2={user2} />
                )
            }
        </>
    )
}

function MutualFriend({ user1, user2 }: { user1: string } & { user2: string }) {
    const { data, error } = useQuery(GET_MUTUALS, {
        variables: {
            inputFriend: {
                user_one: user1,
                user_two: user2
            }
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return (
        <>
            {
                data && data.getMutuals ? (
                    <h3>{data.getMutuals.length} Mutuals</h3>
                ) : null
            }
        </>
    )
}

function Message({ user1, user2 }: any) {
    const { data, error } = useQuery(GET_ROOM, {
        variables: {
            inputRoom: {
                user_one_id: user1,
                user_two_id: user2
            }
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return (
        <button className={s['button-blue']}>
            <Link className={s['link-white']} to={`/messages/${data?.getRoom.id}`}>
                <AiFillMessage />
                Message</Link>
        </button>
    )
}

function AddFriend({ user1, user2 }: any) {
    const [add_friend] = useMutation(ADD_FRIEND, {
        variables: {
            inputFriend: {
                user_one: user1,
                user_two: user2
            }
        }
    })
    const HandleClick = async () => {
        try {
            await add_friend()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <button className={s['button-grey']} onClick={HandleClick}>
            <div className={s['link-black']}>
                <BsFillPersonPlusFill />
                Add Friend
            </div>
        </button>
    )
}


