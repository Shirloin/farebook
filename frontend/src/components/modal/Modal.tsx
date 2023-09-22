/* eslint-disable @typescript-eslint/no-unused-vars */
import { Props } from "../../model/ReactNode";
import s from './Modal.module.css'

export default function Modal({ children, HandleClick}: Props & { HandleClick: () => void } ) {
    return (
        <>
            <div className={s.container} onClick={HandleClick}>
                <div className={s.body}>
                    <div className={s.box}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}