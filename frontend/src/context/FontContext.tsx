import { createContext, ReactNode, useState } from "react";

interface FontContextType{
    font: string,
    setFont: React.Dispatch<React.SetStateAction<string>>
}

export const FontContext = createContext<FontContextType>({
    font: "",
    setFont: ()=>{}
})

interface FontProviderProps{
    children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({children})=>{
    const [font, setFont] = useState("");

    return (
        <FontContext.Provider value={{font, setFont}}>
            {children}
        </FontContext.Provider>
    )
}