import React, { useEffect, useMemo, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {IContactsQueryData, IUser} from "../types";
import {IconArrowLeft, IconUserCircle, IconSend} from "@tabler/icons-react";
import {useCookies} from "react-cookie";
import useContacts from "../hooks/useContacts.tsx";
import ContactFollowStatusComponent from "../components/FriendStatus.tsx";
import {MainHeaderText, MediumBodyText} from "../components/Typography.tsx";



export const ContactDetailPage: React.FC = () => {
    const [cookies] = useCookies();
    const {state} = useLocation();
    const navigate = useNavigate();
    const [contact, setContact] = useState<Partial<IUser> | null>(null);
    const [contactData, setContactData] = useState<IContactsQueryData | null>(null);
    const loggedInUser = useMemo(()=>cookies['chatty_user'], [cookies['chatty_user']]);
    const {followStatus} = useContacts();

    useEffect(() => {
        if (!contact)setContact(()=>state.contact);
        if (!contactData)setContactData(()=>state.contactObject);
    },[contact]);

    const ContactFollowStatus = useMemo(() => {
        return followStatus(contact?.id as string);
    }, [contact]);

    if (!contact)return (<p>...Loading</p>);

    return (
        <div className={`text-[color:var(--color-dark)] p-4`}>
            <MainHeaderText className={`flex items-center text-2xl cursor-pointer mt-2.5`}>
                <IconArrowLeft onClick={()=>navigate(-1)} className={`w-5 mr-2 text-[color:var(--color-dark)]`}/>
            </MainHeaderText>
            <div className={`text-[color:var(--color-dark)] pt-8`}>
                <span>
                    <IconUserCircle stroke={2} size={100} className={`mx-auto text-[color:var(--color-main)]`}/>
                </span>
                <div className={`mt-10 text-center`}>
                    <MainHeaderText className={`font-semibold mb-2`}>{`${contact?.userName}`}</MainHeaderText>
                    <MediumBodyText className={`mb-4 mx-auto]`}>{`${contact?.bio}`}</MediumBodyText>
                    <div className={`flex justify-center gap-x-6`}>
                        <ContactFollowStatusComponent
                            followStatus={ContactFollowStatus}
                            contactId={contact.id as string}
                            userId={loggedInUser.id}/>
                        <Link to={`/messages/${contact.id}`} state={{contact: contact}}>
                            <IconSend
                                size={35}
                                className={`cursor-pointer text-[color:var(--color-main)]`}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactDetailPage;

