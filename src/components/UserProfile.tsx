import React from "react";
import {IconArrowLeft, IconUserCircle, IconEdit, IconSettings, IconHours24, IconLogout} from "@tabler/icons-react";
import { useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {MainHeaderText, SmallBodyText} from "./Typography.tsx";


const UserProfile: React.FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={`p-4`}>
            <MainHeaderText className={`flex items-center cursor-pointer mt-2.5`}>
                <IconArrowLeft onClick={() => navigate(-1)} className={`w-5 mr-2 text-[color:var(--color-dark)]`}/>
            </MainHeaderText>
            <div className={`pt-8`}>
                <span>
                    <IconUserCircle stroke={2} size={100} className={`mx-auto text-[color:var(--color-main)]`}/>
                </span>
                <div className={`mt-10 text-center`}>
                    <MainHeaderText className={`font-semibold mb-2`}>{`${user?.userName}`}</MainHeaderText>
                    <SmallBodyText className={`text-base font-normal text-[color:var(--color-text)] mb-4 mx-auto]`}>{`${user?.bio}`}</SmallBodyText>
                </div>
                <div className={`mt-10 text-center flex flex-col gap-y-2`}>
                    <span className={`flex justify-start w-full`}>
                       <IconEdit onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <SmallBodyText>Edit profile</SmallBodyText>
                    </span>
                    <span className={`flex justify-start w-full`}>
                       <IconSettings onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <SmallBodyText>Settings</SmallBodyText>
                    </span>
                    <span className={`flex justify-start w-full`}>
                       <IconHours24 onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <SmallBodyText>Support</SmallBodyText>
                    </span>
                    <span className={`flex justify-start w-full`}>
                       <IconLogout onClick={() => null} className={`mr-2 text-[color:var(--color-main)]`}/>
                        <SmallBodyText>Logout</SmallBodyText>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;