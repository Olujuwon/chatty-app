import React from "react";
import { IUser} from "../types";
import {Link} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";

interface IContactItemProps {
    contact: Partial<IUser>;
}


export const ContactItem: React.FC<IContactItemProps> = ({contact}) => {
    const {followStatus, findContact} = useContacts();
    const contactData = findContact(contact.id as string);
    return (
        <div className={`text-[color:var(--color-dark)] bg-[color:var(--color-lighter)] rounded p-4 w-full mb-2`}>
            <Link
                to={`/contacts/${contactData?contactData.id:contact.id}`}
                state={{contactObject: contactData, contact: contact}}
                className={`outline-0 w-full mx-auto rounded text-[color:var(--color-text)] text-left flex justify-between`}>
                                    <span>
                                       <h2 className={`text-[color:var(--color-dark)] text-base font-normal`}>{contact.userName}</h2>
                                        <p className={`text-[color:var(--color-dark)] text-xs font-normal`}>{contact.bio}</p>
                                    </span>
                <p className={`text-[color:var(--color-dark)] text-xs font-normal`}>{followStatus(contact.id as string)}</p>
            </Link>
        </div>
    )
}

export default ContactItem;

