import { createContext, ReactNode, useState } from "react";

interface FontColorContextType{
    fontColor: string,
    setFontColor: React.Dispatch<React.SetStateAction<string>>
}

export const FontColorContext = createContext<FontColorContextType>({
    fontColor: "",
    setFontColor: ()=>{}
})

interface FontColorProviderProps{
    children: ReactNode;
}

export const FontColorProvider: React.FC<FontColorProviderProps> = ({children})=>{
    const [fontColor, setFontColor] = useState("");

    return (
        <FontColorContext.Provider value={{fontColor, setFontColor}}>
            {children}
        </FontColorContext.Provider>
    )
}