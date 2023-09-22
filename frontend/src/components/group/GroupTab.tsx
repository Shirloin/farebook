import s from './GroupTab.module.css'

interface GrouptabProps{
    activeButton: number,
    Move: (e:number)=>void
}

export default function GroupTab({activeButton, Move}: GrouptabProps) {

    
    return (
        <>
            <div className={s.container}>
                <div className={`${s.tab} ${activeButton === 0 ? s.activeTab : ''}`} onClick={() => Move(0)}>
                    <h3>Posts</h3>
                </div>
                <div className={`${s.tab} ${activeButton === 1 ? s.activeTab : ''}`} onClick={() => Move(1)}>
                    <h3>Room</h3>
                </div>
                <div className={`${s.tab} ${activeButton === 2 ? s.activeTab : ''}`} onClick={() => Move(2)}>
                    <h3>Files</h3>
                </div>
                <div className={`${s.tab} ${activeButton === 3 ? s.activeTab : ''}`} onClick={() => Move(3)}>
                    <h3>People</h3>
                </div>
            </div>
        </>
    )
}