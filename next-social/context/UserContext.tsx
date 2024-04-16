import React from "react";
import { createContext, useState } from "react";

// export type AuthUser = {
//     data: UserData
// }

export type UserData = {
    username: string
    email: string
    firstName: string
    lastName: string
    gender?: "male" | "female" | undefined
    createdOn: string
}

type UserContextType = {
    data:UserData | null
    setData: React.Dispatch<React.SetStateAction<UserData | null >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [data, setData] = useState<UserData | null>(null)
    return (
    <UserContext.Provider value={{ data, setData}}>
        {children}
    </UserContext.Provider>
    )
}
