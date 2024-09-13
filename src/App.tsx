import React from "react";

import {Link,Outlet, Route, Routes} from 'react-router-dom';

import Chat from "./components/chat.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import Login from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {AuthProvider, RequireAuth} from "./context/AuthContext.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import Header from "./components/Header.tsx";
import {Contact, NewContact} from "./components/Contact.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import useCurrentTheme from "./hooks/useCurrentTheme.tsx";


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
    return <div className={`w-1/2 mx-auto pt-4`}>
        <p className={`text-[color:var(--color-dark)]`}>Page not found</p>
        <Link to={'/'} className={`text-[color:var(--color-main)] underline italic`}>Back to home</Link>
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
                          <Route path='/contacts' element={<RequireAuth><ContactsPage/></RequireAuth>}/>
                          <Route path='/contacts/new' element={<RequireAuth><NewContact/></RequireAuth>}/>
                          <Route path='/contacts/:id' element={<RequireAuth><Contact/></RequireAuth>}/>
                          <Route path='/messages' element={<RequireAuth><MessagesPage/></RequireAuth>}/>
                          <Route path='messages/:id' element={<RequireAuth><Chat/></RequireAuth>}/>
                          <Route path="*" element={<NotFound />} />
                      </Route>
                  </Routes>
              </AuthProvider>
  )
}

export default App