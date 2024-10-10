import React from "react";
import {IconArrowLeft, IconUserCircle, IconEdit, IconSettings, IconHours24, IconLogout} from "@tabler/icons-react";
import { useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";


const UserProfile: React.FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={`text-[color:var(--color-dark)] p-4`}>
            <h3 className={`flex items-center text-2xl cursor-pointer mt-2.5`}>
                <IconArrowLeft onClick={() => navigate(-1)} className={`w-5 mr-2 text-[color:var(--color-dark)]`}/>
            </h3>
            <div className={`text-[color:var(--color-dark)] pt-8`}>
                <span>
                    <IconUserCircle stroke={2} size={100} className={`mx-auto text-[color:var(--color-main)]`}/>
                </span>
                <div className={`mt-10 text-center`}>
                    <h2 className={`text-2xl font-semibold text-[color:var(--color-text)] mb-2`}>{`${user?.userName}`}</h2>
                    <p className={`text-base font-normal text-[color:var(--color-text)] mb-4 mx-auto]`}>{`${user?.bio}`}</p>
                </div>
                <div className={`mt-10 text-center flex flex-col gap-y-2`}>
                    <span className={`flex justify-start w-full`}>
                       <IconEdit onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <p>Edit profile</p>
                    </span>
                    <span className={`flex justify-start w-full`}>
                       <IconSettings onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <p>Settings</p>
                    </span>
                    <span className={`flex justify-start w-full`}>
                       <IconHours24 onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <p>Support</p>
                    </span>
                    <span className={`flex justify-start w-full`}>
                       <IconLogout onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <p>Logout</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;