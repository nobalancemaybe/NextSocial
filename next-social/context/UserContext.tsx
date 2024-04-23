import React from "react";
import { createContext, useState } from "react";
import { UserData } from "../types/types.ts"
// export type AuthUser = {
//     data: UserData
// }

// export type UserData = {
//     handle: string
//     email: string
//     firstName: string
//     lastName: string
//     gender?: "male" | "female" | undefined
//     createdOn: string
// }

type UserContextType = {
    data:UserData | null
    setUser: React.Dispatch<React.SetStateAction<UserData | null >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null) //is done to avoid null checks, but its not working ({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [data, setUser] = useState<UserData | null>(null)
    return (
    <UserContext.Provider value={{ data, setUser}}>
        {children}
    </UserContext.Provider>
    )
}
