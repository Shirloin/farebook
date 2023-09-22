export interface File{
    id: string
    name: string
    type: string
}

export interface FileProps{
    file: File
}

export interface Files{
    file: [File]
}

export const FileConstructor = ()=>{
    const file:File = {
        id: "",
        name: "",
        type: ""
    }
    return file
}