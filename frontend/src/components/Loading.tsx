import s from '../style/components/Loading.module.css'

import { BeatLoader } from 'react-spinners'
export default function Loading() {
    return (
        <>
            <div className={s.spinnerContainer}>
                <BeatLoader color={"#123abc"} />
            </div>
        </>
    )
}