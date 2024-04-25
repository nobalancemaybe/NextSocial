import Header from "./components/Header"
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import {UserContextProvider} from "../context/UserContext"
import { NotFound } from "./components/NotFound";

function App() {

  return (
    <>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat/:id" element={<NotFound/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
