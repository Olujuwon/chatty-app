import React from "react";

import {Link,Outlet, Route, Routes} from 'react-router-dom';

import LandingPage from "./pages/LandingPage.tsx";
import Login from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {AuthProvider, RequireAuth} from "./context/AuthContext.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import Header from "./components/Header.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import useCurrentTheme from "./hooks/useCurrentTheme.tsx";
import NewContactPage from "./pages/NewContactPage.tsx";
import ContactDetailPage from "./pages/ContactDetailPage.tsx";
import UserProfile from "./components/UserProfile.tsx";
import Chat from './components/Chat.tsx';
import AiChat from "./components/AiChat.tsx";


const Layout = () => {
    const {currentTheme, setCurrentTheme} = useCurrentTheme();
    const handleSwitchChange = (value: boolean)=>{
        setCurrentTheme(()=>value ? 'dark' : 'light');
    }

    return <div className={`${currentTheme} w-full max-w-[480px] mx-auto h-lvh relative bg-[color:var(--color-bg)] font-poppins`}>
        <Header checked={currentTheme} handleSwitch={handleSwitchChange}/>
        <Outlet/>
    </div>
}


const NotFound = ()=>{
    return <div className={`w-1/2 mx-auto text-center py-[50%]`}>
        <p className={`text-[color:var(--color-dark)]`}>Page not found</p>
        <Link to={'/messages'} className={`text-[color:var(--color-main)] underline italic`}>Back to home</Link>
    </div>
}

const PageUnderConstruction = ()=>{
    return <div className={`w-1/2 mx-auto text-center py-[50%]`}>
        <p className={`text-[color:var(--color-dark)]`}>Page under construction</p>
        <Link to={'/messages'} className={`text-[color:var(--color-main)] underline italic`}>Back to home</Link>
    </div>
}


const App: React.FC = () => {

  return (
              <AuthProvider>
                  <Routes>
                      <Route element={<Layout/>}>
                          <Route path='/' element={<LandingPage/>}/>
                          <Route path='/auth/login' element={<Login/>}/>
                          <Route path='/auth/register' element={<RegisterPage/>}/>
                          <Route path='/user/profile' element={<RequireAuth><UserProfile/></RequireAuth>}/>
                          <Route path='/contacts' element={<RequireAuth><ContactsPage/></RequireAuth>}/>
                          <Route path='/contacts/new' element={<RequireAuth><NewContactPage/></RequireAuth>}/>
                          <Route path='/contacts/:id' element={<RequireAuth><ContactDetailPage/></RequireAuth>}/>
                          <Route path='/messages' element={<RequireAuth><MessagesPage/></RequireAuth>}/>
                          <Route path='messages/:id' element={<RequireAuth><Chat/></RequireAuth>}/>
                          <Route path='messages/aichat' element={<RequireAuth><AiChat/></RequireAuth>}/>
                          <Route path='groups' element={<RequireAuth><PageUnderConstruction/></RequireAuth>}/>
                          <Route path="*" element={<NotFound />} />
                      </Route>
                  </Routes>
              </AuthProvider>
  )
}

export default App