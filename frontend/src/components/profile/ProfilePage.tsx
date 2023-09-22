import {  useParams } from 'react-router-dom'
import s from './ProfilePage.module.css'
import ProfileTab from './ProfileTab'
import UserInformation from './UserInformation'
// import ContainerCard from '../cards/ContainerCard'
import ProfilePost from './ProfilePost'
import ProfileFriend from './ProfileFriend'
import { toast } from 'react-hot-toast';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../query/UserQuery';
import { User, UserConstructor } from '../../model/User'
import {useState} from 'react'
export default function ProfilePage() {
    
    const {id} = useParams()
    const [curr, setCurr] = useState(0)
    const {data, error} = useQuery(GET_USER, {
        variables:{
            id: id
        }
    })
    let user:User = UserConstructor()
    if(error){
        toast.error(error.message)
    }
    if(data){
        user = data.getUser as User
    }
    
    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    <UserInformation user={user} />
                    <hr />
                    <ProfileTab curr={curr} setCurr={setCurr}/>
                    <div className={s.body}>
                    {curr === 0 && <ProfilePost />}
                    {curr === 1 && <ProfileFriend />}
                    {curr === 2 && <ProfilePost />}
                    </div>
                </div>
            </div>
        </>
    )
}