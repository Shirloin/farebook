/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";
import { HandleFormClick } from "../../helper/helper";
import { GroupProps } from "../../model/Group";
import Modal from "../modal/Modal";
import s from './EditGroupModal.module.css'
import { useState, useRef, useEffect } from 'react'
import { useMutation } from "@apollo/client";
import { UPDATE_GROUP } from "../../query/GroupQuery";

export default function EditGroupModal({ group }: GroupProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState(group.image)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [name, setName] = useState(group.name)
    const [privacy, setPrivacy] = useState(group.privacy)

    const [update_group, { loading }] = useMutation(UPDATE_GROUP, {
        variables: {
            id: group.id,
            inputGroup: {
                name: name,
                privacy: privacy,
                image: selectedFile
            }
        }
    })
    useEffect(() => {
        if (loading) {
            toast.loading("Please Wait")
        }
        else {
            toast.dismiss()
        }
    }, [loading])

    const HandleClick = () => {
        setIsOpen(!isOpen)
    }
    const handlePhotoChangeClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const HandleUpdate = async () => {
        try {
            await update_group()
            toast.success("Update Group Success")
            HandleClick()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <button className={s.edit} onClick={HandleClick}>Edit</button>
            {
                isOpen ? (
                    <Modal HandleClick={HandleClick}  >
                        <div onClick={HandleFormClick} className={s.box}>
                            <div className={s.content}>
                                <div className={s.image}>
                                    {
                                        group.image === "" ? (
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
                                        Change Banner
                                    </button>
                                </div>
                            </div>
                            <div className={s.content}>
                                <div className={s.forminput}>
                                    <div className={s.inputName}>
                                        <input onChange={(e: any) => { setName(e.target.value) }} value={name} type="text" className={s.input} name="name" placeholder="Group Name" />
                                    </div>
                                    <div className={s.privacy}>
                                        <label className={s.lbl}>
                                            <input type="radio" name="privacy" value={"Public"} checked={privacy === "Public"} onChange={() => (setPrivacy("Public"))} />
                                            <span>Public</span>
                                        </label>
                                        <label className={s.lbl}>
                                            <input type="radio" name="privacy" value={"Private"} checked={privacy === "Private"} onChange={() => (setPrivacy("Private"))} />
                                            <span>Private</span>
                                        </label>
                                    </div>
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