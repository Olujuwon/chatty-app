import React from "react";
import Switch from "react-switch";
import {
    IconAddressBook,
    IconBrightnessDown,
    IconBrightnessDownFilled,
    IconMessages,
    IconUsersGroup
} from "@tabler/icons-react";
import {AuthStatus, useAuth} from "../context/AuthContext.tsx";
import {NavLink} from "react-router-dom";

interface HeaderProps {
    checked: string;
    handleSwitch: (checked: boolean) => void;
}

const APP_ROUTES = [{label: 'Messages', value: 'messages', icon: IconMessages},
    {label: 'Contacts', value: 'contacts', icon: IconAddressBook},
    {label: 'Groups', value: 'groups', icon: IconUsersGroup}];

const Header: React.FC<HeaderProps> = ({checked, handleSwitch})=>{
    const auth = useAuth();
    return(
        <>
            <div className={`flex items-center p-2 justify-between bg-[color:var(--color-lighter)] align-middle`}>
                <Switch height={16} width={40} onChange={handleSwitch}
                        checked={checked === 'dark'}
                        checkedIcon={<IconBrightnessDown size={14}
                                                         className={`text-[color:var(--color-dark)] mr-1.5`}/>}
                        uncheckedIcon={<IconBrightnessDownFilled size={14}
                                                                 className={`text-[color:var(--color-dark)] ml-1.5`}/>}
                        onColor={'#1f2124'}
                        offColor={'#e0e3e6'}/>
                <AuthStatus/>
            </div>
            {auth.user ? <nav className={`flex gap-x-4 justify-center p-2 w-full`}>
                {APP_ROUTES.map((route, index) => {
                    return (
                        <NavLink
                            to={route.value}
                            key={index}
                            className={({isActive}) => `${isActive ? 'text-[color:var(--color-main)] border-b-2 border-b-[color:var(--color-main)] pb-1' : 'text-[color:var(--color-text)]'}`}
                        >
                            {<route.icon
                                size={18}/>}</NavLink>
                    )
                })}
            </nav>: <></>}
        </>
    )
}

export default Header;