import {UserContext} from '../context/UserContext.jsx'
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";


export default function AuthGuard({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate replace to="/register" state={{ from: location }} />
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};



// TypeScript
// import { UserContext } from "../context/UserContext"; // Assuming UserContext is a TypeScript file
// import { useContext, ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";


// interface UserContextValue {
//   user: User | null; // Define the type of user object
// }

// export default function AuthGuard({ children }: { children: ReactNode }) {
//   const { user }: UserContextValue = useContext(UserContext);
//   const location = useLocation();

//   if (!user) {
//     return <Navigate replace to="/register" state={{ from: location }} />;
//   }

//   return children;
// }

