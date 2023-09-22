import { createContext, ReactNode, useState } from "react";

interface GroupPrivacyContextType{
    privacy: string,
    setPrivacy: React.Dispatch<React.SetStateAction<string>>
}

export const GroupPrivacyContext = createContext<GroupPrivacyContextType>({
    privacy: "",
    setPrivacy: ()=>{}
})

interface GroupPrivacyProviderProps{
    children: ReactNode;
}

export const GroupPrivacyProvider: React.FC<GroupPrivacyProviderProps> = ({children})=>{
    const [privacy, setPrivacy] = useState("Public");

    return (
        <GroupPrivacyContext.Provider value={{privacy, setPrivacy}}>
            {children}
        </GroupPrivacyContext.Provider>
    )
}