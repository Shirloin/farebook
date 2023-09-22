/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import s from './Carousel.module.css'
import { useRef, useEffect } from 'react'
import { Props } from '../../model/ReactNode';
import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri'


export default function Carousel({ children }: Props) {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const carousel = useRef<HTMLDivElement | null>(null)
    const firstImg = useRef<HTMLImageElement | null>(null);
    const leftIcon = useRef<HTMLElement>(null)
    const rightIcon = useRef<HTMLElement>(null)
    let scrollWidth = 0

    const leftClick = () => {
        if (firstImg.current) {
            const firstImgWidth = firstImg.current.clientWidth +20;
            carousel.current!.scrollLeft -= (firstImgWidth );
        }
    }
    const rightClick = () => {
        if (firstImg.current) {
            const firstImgWidth = firstImg.current.clientWidth +20;
            carousel.current!.scrollLeft += (firstImgWidth );
        }
    }

    useEffect(() => {
        if (carousel.current) {
            scrollWidth = carousel.current.scrollWidth - carousel.current.clientWidth - 6
            firstImg.current = carousel.current.children[0] as HTMLImageElement
        }
    }, [carousel.current])

    return (
        <>
            <div className={s.container}>
                <div className={s.content}>
                    <i className={s.icon} onClick={leftClick} ref={leftIcon}><RiArrowLeftSLine/></i>
                    <div className={s.carousel} ref={carousel}>
                        {children}
                    </div>
                    <i className={s.icon} onClick={rightClick} ref={rightIcon}><RiArrowRightSLine /></i>
                </div>
            </div>
        </>
    )
}