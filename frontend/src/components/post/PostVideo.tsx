import { FileProps } from "../../model/File";
import s from './PostImage.module.css'

export default function PostVideo({file}: FileProps){
    return (
        <>
        <div className={s.container}>
            <video src={file.name} autoPlay={false} controls className={s.video}></video>
        </div>
        </>
    )
}