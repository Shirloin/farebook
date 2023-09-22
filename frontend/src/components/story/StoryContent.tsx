
import s from './StoryContent.module.css'
import { useQuery } from '@apollo/client'
import { GET_STORY } from '../../query/StoryQuery'
import { toast } from 'react-hot-toast'
import { Story } from '../../model/Story'
import { useParams } from 'react-router-dom'
import Carousel from '../carousel/Carousel'
export default function StoryContent() {
    const { id } = useParams()
    const { data, error } = useQuery(GET_STORY, {
        variables: {
            id: id
        }
    })
    if (error) {
        toast.error(error.message)
    }
    if (data) {
        console.log(data)
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    <Carousel>
                        {
                            data ? data.getMyStory.map((story: Story) => (
                                <div className={s.body} key={story.id} style={{ backgroundImage: `url(${story.content})` }}>
                                    <div className={s.top}>
                                        <>
                                            {/* <div className={s['top-top']}>
                                            <StoryProgressBar />
                                        </div> */}
                                            {/* <div className={s['top-bot']}>
                                            <Profile />
                                            <h3>Krystal</h3>
                                        </div> */}
                                        </>
                                    </div>
                                </div>
                            )) : null
                        }
                    </Carousel>
                </div>
            </div>
        </>
    )
}