import React from "react";
import { createContext, useState } from "react";

export type AuthUser = {
    data: UserData
}

export type UserData = {
    name: string
    email: string
}
type UserContextType = {
    data:AuthUser | null
    setData: React.Dispatch<React.SetStateAction<AuthUser | null >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [data, setData] = useState<AuthUser | null>(null)
    return (
    <UserContext.Provider value={{ data, setData}}>
        {children}
    </UserContext.Provider>
    )
}
