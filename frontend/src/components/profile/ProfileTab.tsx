/* eslint-disable @typescript-eslint/no-explicit-any */

import s from './ProfileTab.module.css'

export default function ProfileTab({curr, setCurr}:any) {


    return (
        <>
            <div className={s.container}>
                <button onClick={() => setCurr(0)} className={`${s.tab} ${curr === 0 ? s.activeTab : ''}`}>Posts</button>
                <button onClick={() => setCurr(1)} className={`${s.tab} ${curr === 1 ? s.activeTab : ''}`}>Friends</button>
                <button onClick={() => setCurr(2)} className={`${s.tab} ${curr === 2 ? s.activeTab : ''}`}>Reels</button>
            </div>
        </>
    )
}