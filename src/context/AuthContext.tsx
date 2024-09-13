import React from "react";

import {Navigate, useLocation, useNavigate} from "react-router-dom";
import { useCookies, Cookies } from 'react-cookie';
import {useRegisterUserMutation, useLoginInUserMutation} from "../redux/chatty.ts";

import {IconLogout, IconUserCircle} from "@tabler/icons-react";
import {IUser} from "../types";


interface AuthContextType {
    user: string|null;
    userId: string|null;
    login: (user: Partial<IUser>) => Promise<any>;
    register: (user: Partial<IUser>) => Promise<any>;
    logout: (callback: VoidFunction) => void;
}

export const cookieManager =  (function CookieManager (){
    return new Cookies()
})();

const AuthContext = React.createContext<AuthContextType>(null!);

const COOKIE_AGE: number = 86400 //24 HOURS

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [cookies, setCookies, removeCookies] = useCookies();
    const [registerUser] = useRegisterUserMutation();
    //const [logoutUser] = useLogoutUserMutation();
    const [loginInUser] = useLoginInUserMutation();
    const [loggedInUser, setLoggedInUser] = React.useState<string|null>(cookies['chatty_user']);
    const [loggedInUserId, setLoggedInUserId] = React.useState<string|null>(cookies['chatty_user_id']);

    const login = async(user: Partial<IUser>) => {
        const loginResponse = await loginInUser({userName: user.userName as string, password: user.password as string});
        if (loginResponse.data){
            const {userName, id, token} = loginResponse.data;
            setLoggedInUser(()=> userName);
            setLoggedInUserId(()=> id);
            setCookies('chatty_user', userName, {maxAge: COOKIE_AGE});
            setCookies('chatty_user_id', id, {maxAge: COOKIE_AGE});
            setCookies('chatty_user_token', token, {maxAge: COOKIE_AGE});
            return {...loginResponse.data};
        }else{
            return loginResponse.error;
        }
    }


    const register = async (user: Partial<IUser>) => {
        const registerResponse = await registerUser(user);
        if (registerResponse.data){
            const {userName, id,token} = registerResponse.data;
            setLoggedInUser(()=>userName);
            setLoggedInUserId(()=> id);
            setCookies('chatty_user', userName, {maxAge: COOKIE_AGE});
            setCookies('chatty_user_id', id, {maxAge: COOKIE_AGE});
            setCookies('chatty_user_token', token, {maxAge: COOKIE_AGE});
            return registerResponse.data;
        }else{
           return registerResponse.error;
        }
    }
    const logout = async ( callback: VoidFunction) => {
        //const logoutResponse = await logoutUser({});
        setLoggedInUser(null);
        removeCookies('chatty_user', {path: '/'});
        removeCookies('chatty_user_id', {path: '/'});
        removeCookies('chatty_user_token', {path: '/'});
        return callback();
    }
    const providerValue = {user: loggedInUser , login, register, logout, userId: loggedInUserId}
    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>{
    const context = React.useContext(AuthContext);
    if (!context) throw new Error("AuthContext must be placed within AuthProvider");
    return context;
}

export const AuthStatus = ()=>{
    const auth = useAuth();
    const navigate = useNavigate();

    if(!auth.user){
        return null;
    }

    return (
        <div className={`flex gap-2`}>
            <IconUserCircle
                size={18}
                className={`text-[color:var(--color-dark)]`}/>
            <IconLogout
                size={18}
                onClick={()=>auth.logout(()=>navigate('/'))}
                className={`cursor-pointer text-[color:var(--color-dark)]`}/>
        </div>
    )
}


export const RequireAuth:React.FC<{children: JSX.Element}> =({children})=>{
    const auth = useAuth();
    const location = useLocation();
    if(!auth.user){
        return <Navigate to={'/auth/login'} state={{from: location}}/>
    }
    return children;
}


