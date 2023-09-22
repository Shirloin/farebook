import { useEffect } from "react";
import {useRecoilValue} from 'recoil'
import { Props } from "../model/ReactNode";
import { useNavigate} from 'react-router-dom'
import {  authenticated } from "../store";

export default function Authenticated({children}: Props){
    const auth = useRecoilValue(authenticated)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!auth.check){
            navigate('/login')
        }
    }, [])
    return children
}