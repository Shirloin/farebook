
import { Props } from '../../model/ReactNode'
import s from '../../style/components/card/ShortCard.module.css'
export default function ShortCard({children}: Props){
    return (
        <>
        <div  className={s.container}>
            {children}
        </div>
        </>
    )
}