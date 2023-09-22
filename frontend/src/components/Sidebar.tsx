import { Props } from '../model/ReactNode'
import s from '../style/components/Sidebar.module.css'


export default function Sidebar({ children }: Props) {
    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </>
    )
}
