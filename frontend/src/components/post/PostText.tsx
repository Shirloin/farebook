
import s from './PostText.module.css'
export default function PostText({ text }: { text: string }) {
    
      
    return (
        <>
            <hr></hr>
            <div className={s.container}>
                <div className={s.content}>
                    {
                        <HTMLRenderer htmlString={text}/>
                    }
                </div>
            </div>
            <hr></hr>
        </>
    )
}

export const HTMLRenderer = ({htmlString}:{htmlString :string}) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };