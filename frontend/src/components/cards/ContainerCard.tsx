import { Props } from "../../model/ReactNode";
import s from "../../style/components/card/ContainerCard.module.css"

export default function ContainerCard({children}: Props){
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