import { createContext, ReactNode, useState } from "react";

interface StoryTextContextType{
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}

export const StoryTextContext = createContext<StoryTextContextType>({
    text: "",
    setText: ()=>{}
})

interface StoryTextProviderProps{
    children: ReactNode;
}

export const StoryTextProvider: React.FC<StoryTextProviderProps> = ({children})=>{
    const [text, setText] = useState("");

    return (
        <StoryTextContext.Provider value={{text, setText}}>
            {children}
        </StoryTextContext.Provider>
    )
}