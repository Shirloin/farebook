import { FileProps } from '../../model/File'
import s from './PostImage.module.css'
export default function PostImage({file}: FileProps){
    return (
        <>
        <div className={s.container}>
            <img draggable={false} src={file.name} alt="" />
        </div>
        </>
    )
}