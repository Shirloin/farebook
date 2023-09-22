import { createContext, ReactNode, useState } from "react";

interface BackgroundContextType{
    background: string,
    setBackground: React.Dispatch<React.SetStateAction<string>>
}

export const BackgroundContext = createContext<BackgroundContextType>({
    background: "",
    setBackground: ()=>{}
})

interface BackgroundProviderProps{
    children: ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({children})=>{
    const [background, setBackground] = useState("white");

    return (
        <BackgroundContext.Provider value={{background, setBackground}}>
            {children}
        </BackgroundContext.Provider>
    )
}