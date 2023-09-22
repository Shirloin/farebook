import { useRecoilValue } from "recoil"
import {  authenticated } from "../store"
import { Props } from "../model/ReactNode"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Guest({children}: Props){
    const auth = useRecoilValue(authenticated)
    const navigate = useNavigate()
    useEffect(()=>{
        if(auth.check){
            navigate('/')
        }
    }, [])
    return children
}