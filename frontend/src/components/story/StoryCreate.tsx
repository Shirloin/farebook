/* eslint-disable @typescript-eslint/no-explicit-any */
import s from './StoryCreate.module.css'
import { IoMdPhotos } from 'react-icons/io'
import { PiTextAaBold } from 'react-icons/pi'
import { StoryProps } from './StoryPage'
import ContainerCard from '../cards/ContainerCard'
import { RefObject, useContext, useState } from 'react'
import { StoryTextContext } from '../../context/StoryTextContext'
import { FontContext } from '../../context/FontContext'
import { BackgroundContext } from '../../context/BackgroundContext'
import { FontColorContext } from '../../context/FontColorContext'

export default function StoryCreate({ show, setShow, isImage, setIsImage, storyRef }: StoryProps & { storyRef: RefObject<HTMLDivElement> }) {

    const { text } = useContext(StoryTextContext)
    const { font } = useContext(FontContext)
    const { background } = useContext(BackgroundContext)
    const { fontColor } = useContext(FontColorContext)
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null)
    const [imagePreviews, setImagePreviews] = useState<string>()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(e.target.files[0])
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setImagePreviews(imageUrl)
            HandleImage()
        }
    }

    const HandleImage = () => {
        setIsImage(true)
        HandleClick()

    }

    const HandleClick = () => {
        setShow(!show)
    }

    return (
        <>
            <div className={s.container}>
                {
                    show ? (
                        <>
                            <label htmlFor="fileInput" className={s.photo} >
                                <IoMdPhotos className={s.icon} />
                                <h3>Create a photo story</h3>
                            </label>
                            <input
                                onChange={handleFileChange}
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                            />
                            <div className={s.text} onClick={HandleClick}>
                                <PiTextAaBold className={s.icon} />
                                <h3>Create a text story</h3>
                            </div>
                        </>
                    ) : (
                        <ContainerCard>
                            <h2>Preview</h2>
                            <div className={s['preview-container']} >
                                <div className={s['preview-content']} ref={storyRef} style={{
                                    backgroundImage: isImage ? `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${imagePreviews})` : undefined,
                                    background: !isImage ? background : imagePreviews,
                                }} >
                                    {
                                        isImage ? (
                                            <img className={s.image} src={imagePreviews} alt="" />
                                        ) : (
                                            <h3 className={s.font} style={{ fontFamily: font, color: fontColor }}>
                                                {text}
                                            </h3>
                                        )
                                    }
                                </div>
                            </div>
                        </ContainerCard>
                    )
                }
            </div>
        </>
    )
}