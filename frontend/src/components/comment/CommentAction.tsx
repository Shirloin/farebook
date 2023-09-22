import s from './CommentAction.module.css'
export default function CommentAction({click}: {click: ()=>void}){

    

    return (
        <>
         <div className={s.container}>
            <h4 className={s.btn}>Like</h4>
            <h4 className={s.btn} onClick={click}>Reply</h4>
            <h4 className={s.btn}>Share</h4>
         </div>
        </>
    )
}