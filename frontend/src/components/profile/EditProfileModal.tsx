/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react'
import { MdOutlineModeEditOutline, } from 'react-icons/md'
import s from './EditProfileModal.module.css'
import Modal from '../modal/Modal'
import { DateConverter, HandleFormClick } from '../../helper/helper'
import { authenticated } from '../../store'
import { useRecoilState } from 'recoil'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../query/UserQuery'
import { toast } from 'react-hot-toast'

export default function EditProfileModal() {

    const [auth, setAuth] = useRecoilState(authenticated)
    const [firstname, setFirstname] = useState(auth.user.firstname)
    const [lastname, setLastname] = useState(auth.user.lastname)
    const [dob, setDob] = useState(DateConverter(auth.user.dob))
    const [previewImage, setPreviewImage] = useState(auth.user.image)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [update_user, {loading}] = useMutation(UPDATE_USER, {
        variables:{
            id: auth.user.id,
            inputUser: {
                firstname: firstname,
                lastname: lastname, 
                email: auth.user.email,
                password: "",
                dob: dob+"T00:00:00.000Z",
                gender: auth.user.gender,
                image: selectedFile
            }
        }
    })
    useEffect(()=>{
        if(loading){
            toast.loading("Please Wait")
        }
        else{
            toast.dismiss()
        }
    }, [loading])
    const HandleClick = () => {
        console.log(dob)
        setIsOpen(!isOpen)
    }
    const handlePhotoChangeClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }
    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const HandleUpdate = async(e:any)=>{
        e.preventDefault()
        try {
            const {data} = await update_user()
            setAuth({ ...auth, check: true, user: data.updateUser });
            HandleClick()
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    
    return (
        <>
            <button className={s['button-grey']} onClick={HandleClick}>
                <div className={s['link-black']} >
                    <MdOutlineModeEditOutline />
                    Edit Profile
                </div>
            </button>
            {
                isOpen ? (
                    <Modal HandleClick={HandleClick}>
                        <div onClick={HandleFormClick} className={s.box}>
                            <div className={s.content}>
                                <div className={s.image}>
                                    {
                                        auth.user.image === "" ? (
                                            <img className={s.img} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABgcDBAUC/8QAMhAAAgIBAgIIAwgDAAAAAAAAAAECAwQFEQYxEiFRYXGRocETYtEiIzNBQlNjsTJykv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AtIAGmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMOZlV4WLbk3PauqPSff3AYdS1LF02n4mVZtv/jCPXKXgiL5XGWVKTWLjVVx/k3k35bI4OoZt2oZU8jIf2pcorlFdiNYsKk+LxllRkllY1Vkf494tee5KNN1LF1Kn4mLZvt/lCXVKHiisDZ0/Nu0/KhkY72lHmnykuxgWkDDh5NeZi1ZNL3rtj0kZiAAAAAAAAAAABGeOsiUMHHoi9vi2Nvwivq0SYinHsfusKf5KU16L6AQ8AGkAATVxNeBciU8HIok9/h2Jrwa+qZJiKcBR+6zZ/k5QX9/UlZAAAAAAAAAAAA5HFOFLN0ixVrpWVNWRS5vbn6bnXAFSJ78gS/XOFpTsnk6Z0ftPeVDe3X8r9iNX6dnUSauw747fI9vMtI1RvtzNqnTs6+SVWHfJv5Ht58iS6HwtKFkMnU+j9l7xoT36/mfsB1eFsKWFpFasXRstfxJJ81vyXlsdcAgAAAAAAAAAAADHfdXj0yuvnGFcFvKUuSIfq3Fl1snXpsfhV/uyW8peHZ/YEwvvpx49O+2uqPbOSivU58+IdKrbTzYP/RN+qRXd1tl83O6ydk3+qcnJ+p4KVZFfEOlWNbZsE/nTX9o36L6ciPTotrtj2wkpL0KoPdNtlE1Omydc1+qEnF+gSrYBC9J4surlGvUo/Fr/AHYraUfHtJhRdXkUwuonGdc1vGUeTIrIAAAAAAAAeLbIU1yttkoVwW8pPkkeyJcb6i10NOqe26U7e/sXv5AcXXtZs1bI6t440H93X7vvOWAU0ABUAAAOpoOs2aTkde8sab+8r913nLBFWxVZC6uNtUlOua3jJcmj2RLgjUW+np1r32TnV7r38yWkAAAAAA8eRVupZMszPyMhv8Sxtdy36l5bFk6lN1adl2J7OFM2v+WVauRQABUAAAAAAAAbOm5Lw8/HyE/w7E33r815blorrXUVK+RaWm2O3TsWxvdzpg349FEVsgAg/9k=" alt="" />
                                        ) : (
                                            <img className={s.img} src={previewImage} alt="" />
                                        )
                                    }
                                    <button onClick={handlePhotoChangeClick}>
                                        <input
                                            type="file"
                                            ref={inputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        Change Photo
                                    </button>
                                </div>
                            </div>
                            <div className={s.content}>
                                <div className={s.forminput}>
                                    <div className={s.inputName}>
                                        <input onChange={(e:any)=>{setFirstname(e.target.value)}} value={firstname} type="text" className={s.input} name="firstname" placeholder="Firstname" />
                                        <input onChange={(e:any)=>{setLastname(e.target.value)}} value={lastname} type="text" className={s.input} name="lastname" placeholder="Lastname" />
                                    </div>
                                    <label>Date of Birth</label>
                                    <input onChange={(e:any)=>{setDob(e.target.value)}} value={dob} type="date" className={s.input} name="dob" />
                                    
                                </div>
                            </div>
                            <div className={s.content}>
                                <button onClick={HandleUpdate}>Save</button>
                            </div>
                        </div>
                    </Modal>
                ) : null
            }
        </>
    )
}
