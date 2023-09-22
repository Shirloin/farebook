/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom"
import style from "../style/page/Register.module.css"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../query/UserQuery"
import { useState } from "react"
import { InputUser } from "../model/User"
import { Toaster, toast } from "react-hot-toast"

export default function RegisterPage() {

    const [user, setUser] = useState(InputUser)
    const navigate = useNavigate()
    const [create_user, { loading }] = useMutation(CREATE_USER, {
        variables: {
            inputUser: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                dob: user.dob+"T00:00:00.000Z",
                gender: user.gender
            }
        }
    })

    const HandleOnChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const HandleRegister = async (e: any) => {
        e.preventDefault()
        if (user.firstname === "" || user.email === "" || user.password === "" || user.dob === "" || user.gender === "") {
            toast.error("All fields must be filled")
            return
        }
        else if (user.email === "@gmail.com" || !user.email.endsWith("@gmail.com")) {
            toast.error("Email must ends with @gmail.com")
            return
        }
        else if (user.password.length <= 3) {
            toast.error("Password must be more than 3 character")
            return
        }
        console.log(user.dob)
        try {
            await create_user();
            if (loading) {
                toast.loading("Please Wait")
            } else {
                toast.dismiss();
            }
            navigate('/login')
        } catch (error: any) {
            toast.error(error.message);
        }


    }



    return (
        <>
            <Toaster />
            <div className={style.body}>
                <div className={style.container}>
                    <h1 className={style.title}>faCebooX</h1>
                    <form action="" className={style.form}>
                        <h2>Create a new account</h2>
                        <div className={style.forminput}>
                            <div className={style.inputName}>
                                <input onChange={HandleOnChange} value={user.firstname} type="text" className={style.input} name="firstname" placeholder="Firstname" />
                                <input onChange={HandleOnChange} value={user.lastname} type="text" className={style.input} name="lastname" placeholder="Lastname" />
                            </div>
                            <input onChange={HandleOnChange} value={user.email} type="text" className={style.input} name="email" placeholder="Email" />
                            <input onChange={HandleOnChange} value={user.password} type="password" className={style.input} name="password" placeholder="Password" />
                            <label htmlFor="">Date of Birth</label>
                            <input onChange={HandleOnChange} value={user.dob} type="date" className={style.input} name="dob" />
                            <label htmlFor="">Gender</label>
                            <div className={style.gender}>
                                <label htmlFor="" className={style.genderLabel}>
                                    <input onChange={HandleOnChange} value={"Male"} type="radio" name="gender" />
                                    <span>Male</span>
                                </label>
                                <label htmlFor="" className={style.genderLabel}>
                                    <input onChange={HandleOnChange} value={"Female"} type="radio" name="gender" />
                                    <span>Female</span>
                                </label>
                            </div>
                        </div>
                        <button className={style['register-btn']} onClick={HandleRegister}>Create new account</button>
                        <Link className={style.a} to={"/login"}>Already have an account?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}