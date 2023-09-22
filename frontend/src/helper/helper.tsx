/* eslint-disable @typescript-eslint/no-explicit-any */
export const HandleFormClick = (e:any)=>{
    e.stopPropagation()
}

export function DateConverter(date: string){
    const dob = date.split('T')
    return dob[0]
}