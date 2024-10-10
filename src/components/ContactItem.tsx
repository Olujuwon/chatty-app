import React from "react";
import { IUser} from "../types";
import {Link} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";
import {SmallBodyText, SmallHeaderText} from "./Typography.tsx";

interface IContactItemProps {
    contact: Partial<IUser>;
}


export const ContactItem: React.FC<IContactItemProps> = ({contact}) => {
    const {followStatus, findContact} = useContacts();
    const contactData = findContact(contact.id as string);
    return (
        <div className={`bg-[color:var(--color-lighter)] rounded p-4 w-full mb-2`}>
            <Link
                to={`/contacts/${contactData?contactData.id:contact.id}`}
                state={{contactObject: contactData, contact: contact}}
                className={`outline-0 w-full mx-auto rounded text-[color:var(--color-text)] text-left flex justify-between`}>
                                    <span>
                                       <SmallHeaderText className={`font-semibold`}>{contact.userName}</SmallHeaderText>
                                        <SmallBodyText className={``}>{contact.bio}</SmallBodyText>
                                    </span>
                <SmallBodyText className={``}>{followStatus(contact.id as string)}</SmallBodyText>
            </Link>
        </div>
    )
}

export default ContactItem;

