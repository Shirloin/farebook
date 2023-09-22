import { createContext, ReactNode, useState } from "react";

interface GroupNameContextType{
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}

export const GroupNameContext = createContext<GroupNameContextType>({
    text: "",
    setText: ()=>{}
})

interface GroupNameProviderProps{
    children: ReactNode;
}

export const GroupNameProvider: React.FC<GroupNameProviderProps> = ({children})=>{
    const [text, setText] = useState("");

    return (
        <GroupNameContext.Provider value={{text, setText}}>
            {children}
        </GroupNameContext.Provider>
    )
}