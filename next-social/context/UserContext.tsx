
import { createContext, useState, useEffect } from "react";
import { UserData } from "../types/types.ts"

type UserContextType = {
    data:UserData | null
    setUser: React.Dispatch<React.SetStateAction<UserData | null >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null) //is done to avoid null checks, but its not working ({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [data, setUser] = useState<UserData | null>(()=>{
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    });

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }, []);
    
    return (
    <UserContext.Provider value={{ data, setUser}}>
        {children}
    </UserContext.Provider>
    )
}
