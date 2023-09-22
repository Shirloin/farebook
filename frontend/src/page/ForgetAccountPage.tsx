import style from "../style/page/ForgetAccount.module.css"
export default function ForgetAccountPage() {
    return (
        <>
            <div className={style.container}>
                <div className={style.modal}>
                    <div className={style.content}>
                        <div className={style.top}>
                            <h2>Find Your Account</h2>
                        </div>
                        <div className={style.middle}>
                            <h3>Please enter your email address to search for your account</h3>
                            <input type="text" className={style.input} />
                        </div>
                        <div className={style.bottom}>
                            <button className={style['cancel-btn']}>Cancel</button>
                            <button className={style['search-btn']}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}