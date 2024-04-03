import Header from "./components/Header"
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import {UserContextProvider} from "../context/UserContext"
import { RegistrationPage } from "./pages/RegistrationPage";

// import { UserData } from "../context/AppContext";
// import { auth } from "../firebase-config"
// import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

  // const [user] = useAuthState(auth);

  // if (appState.user !== user) {
  //   setAppState({ user });
  // }

  // const [userData, setUserData] = useState<UserData | null>(null); // Use UserData interface

  // useEffect(() => {
  //   if (user === null || user === undefined) return;

  //   getUserData(user.uid).then((snapshot) => {
  //     if (!snapshot.exists()) {
  //       throw new Error('User data not found!');
  //     }
  //     setAppState({
  //       user,
  //       userData: snapshot.val()[Object.keys(snapshot.val())[0]],
  //     });
  //   });
  // }, [user]);

  // const updateUserData = (newUserData) => {
  //   setAppState((prevState) => ({
  //     ...prevState,
  //     userData: newUserData,
  //   }));
  // };

  // role check for admin
  // const isAdmin = () => {
  //   return appState.userData?.role === 'admin';
  // };


  return (
    <>
      <UserContextProvider>

        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="registration-page" element={<RegistrationPage />}/>
        </Routes>
 
      </UserContextProvider>
    </>
  )
}

export default App
