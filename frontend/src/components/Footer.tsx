import { Link } from "react-router-dom"
import style from "../style/components/Footer.module.css"
export default function Footer() {
    return (
        <>
            <div className={style.footer}>
                <div className={style.footerbody}>
                    <div className={style.footerinside}>
                        <Link to={'/privacy/policy'}>Privacy</Link>
                        <Link to={'/terms'}>Terms</Link>
                        <Link to={'/ads'}>Advertising</Link>
                        <Link to={'/about-us'}>About Us</Link>
                        <Link to={'/ads'}>Ad Choices</Link>
                    </div>
                </div>
            </div>
        </>
    )
}