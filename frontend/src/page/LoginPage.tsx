/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom"
import style from "../style/page/Login.module.css"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../query/UserQuery"
import { useEffect, useState } from 'react'
import { Toaster, toast } from "react-hot-toast"
import { useRecoilState } from 'recoil'
import { authenticated, tokenPersisted } from "../store"


export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const auth = useRecoilValue(authenticated)
    const [auth, setAuth] = useRecoilState(authenticated);
    const [token, setToken] = useRecoilState(tokenPersisted)
    const navigate = useNavigate()
    const [login, {loading}] = useMutation(LOGIN, {
        variables: {
            inputUser: {
                email: email,
                password: password
            }
        },
    })
    const HandleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const { data, errors } = await login();
            if (data) {
                localStorage.setItem('token', data.login.token)
                setToken({...token, check:true, token: data.login.token})
            }
            if(loading){
                toast.loading("Please Wait")
            }
            else{
                toast.dismiss()
            }
            if (errors) {
                console.log(errors)
            }
            setAuth({ ...auth, check: true, user: data.login.user });
            setEmail('');
            setPassword('');
            navigate('/')
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <>
        <Toaster/>
            <div className={style.body}>
                <div className={style.container}>
                    <h1 className={style.title}>faCebooX</h1>
                    <form action="" className={style.form}>
                        <h2>Log in to faCebooX</h2>
                        <div className={style.forminput}>
                            <input type="text" className={style.input} value={email} onChange={(e: any) => {
                                setEmail(e.target.value)
                            }} />
                            <input type="password" className={style.input} value={password} onChange={(e: any) => {
                                setPassword(e.target.value)
                            }} />
                            <button className={style['login-btn']} onClick={HandleSubmit}>Log In</button>
                        </div>
                        <Link to={"/forgetaccount"} className={style.a}>Forgotten account?</Link>
                        <p>or</p>
                        <Link to={'/register'} className={style.link}>
                            <button className={style['register-btn']}>Create new account</button>
                        </Link>
                    </form>
                </div>
            </div>

        </>
    )
}