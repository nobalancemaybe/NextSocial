import { createContext ,  Dispatch, SetStateAction} from "react";

export interface UserData {
  username: string;
  posts: number;
  // Add other properties as needed
}

interface AppContextType {
  user: string | null;
  userData: UserData | null;
  setContext: Dispatch<SetStateAction<{
    user: string | null;
    userData: UserData | null;
  }>>;
}
const initialContextValue: AppContextType = {
  user: null,
  userData: null,
  setContext: () => {},
};

export const AppContext = createContext<AppContextType>(initialContextValue)