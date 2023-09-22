import navbar from '../style/components/ForgetAccountNavbar.module.css'

export default function ForgetAccountNavbar() {
    return (
        <>
            <div className={navbar.container}>
                <div className={navbar.nav}>
                    <div className={navbar.navinside}>
                        <div className={navbar.navbody}>
                            <div className={navbar.left}>
                                <h3 className={navbar.logo}>faCebooX</h3>
                            </div>
                            <div className={navbar.right}>
                                <input type="text" className={navbar.input}/>
                                <input type="text" className={navbar.input}/>
                                <button className={navbar['login-btn']}>Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}