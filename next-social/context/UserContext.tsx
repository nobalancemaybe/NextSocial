
import { createContext, useState, useEffect } from "react";
import { User } from "../types/types.ts"

type UserContextType = {
    user:User | null
    setUser: React.Dispatch<React.SetStateAction<User | null >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null) //is done to avoid null checks, but its not working ({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(()=>{
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
    <UserContext.Provider value={{ user, setUser}}>
        {children}
    </UserContext.Provider>
    )
}
