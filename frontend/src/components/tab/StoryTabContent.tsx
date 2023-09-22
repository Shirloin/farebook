/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import ShortCard from '../cards/ShortCard'
import s from './TabContent.module.css'
import { GrAddCircle } from 'react-icons/gr'
import Carousel from '../carousel/Carousel';
import { useQuery } from '@apollo/client';
import { GET_STORY_BY_FRIEND, GET_STORY_BY_USER } from '../../query/StoryQuery';
import { toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { authenticated } from '../../store';
import { User, UserConstructor } from '../../model/User';
export default function StoryTabContent() {
    // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];





    return (
        <>
            <div className={s.container}>

                <Carousel>
                    <Link to={'/story/create'} className={s.gotocreate}>
                        <ShortCard>
                            <GrAddCircle className={s.icon} />
                        </ShortCard>
                    </Link>
                    <MyStory />
                    <FriendStory />
                </Carousel>
            </div>
        </>
    )
}

function MyStory() {
    const auth = useRecoilValue(authenticated)
    let user: User = UserConstructor()
    const { data, error } = useQuery(GET_STORY_BY_USER, {
        variables: {
            id: auth.user.id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    if (data) {
        user = data.getStoryByUser
        // console.log(user.stories)
    }
    return (
        <>
            {
                data && user && user.stories.length > 0 ? (
                    <Link to={'/story/' + user.id} key={user.id}>
                        <ShortCard>
                            <img className={s.img} src={user.stories[0].content} draggable={false} alt="" />
                        </ShortCard>
                    </Link>
                ) : null
            }
        </>
    )
}

function FriendStory() {
    const auth = useRecoilValue(authenticated)
    const { data, error } = useQuery(GET_STORY_BY_FRIEND, {
        variables: {
            id: auth.user.id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    if (data) {
        // console.log(data.getStoryByFriend)
    }
    return (
        <>
            {
                data && data.getStoryByFriend.map((user: User) => (
                    user.stories && user.stories.length > 0 ? (
                        <Link to={'/story/' + user.id} key={user.id}>
                            <ShortCard>
                                <img className={s.img} src={user.stories[0].content} draggable={false} alt="" />
                            </ShortCard>
                        </Link>
                    ) : null
                ))
            }
        </>
    )
}