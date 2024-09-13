import {useEffect, useMemo, useState} from "react";
import {useCookies} from "react-cookie";
import {useGetUserContactsQuery} from "../redux/chatty.ts";
import { IUser} from "../types";

export interface IContactsQueryData {
    createdAt: Date;
    updatedAt: Date;
    accepted: boolean;
    id: string;
    user: Partial<IUser>;
    contact: Partial<IUser>;
}

const useContacts = () => {
    const [cookies] = useCookies();
    const [contacts, setContacts] = useState<IContactsQueryData[]>([]);
    const loggedInUser = useMemo(()=>cookies['chatty_user_id'], [cookies['chatty_user_id']]);
    const {data, isLoading, isSuccess} = useGetUserContactsQuery(loggedInUser);

    useEffect(() => {
        if (data && isSuccess)setContacts(data);
    }, [data])

    const followStatus = (contactId: string) => {
        const findContactDetail = contacts.find((contactItem : IContactsQueryData) => contactItem.contact.id === contactId || contactItem.user.id === contactId);
        if (!findContactDetail)return 'Add'
        else {
            if (!findContactDetail.accepted && !userIsContact(findContactDetail.contact))return 'Pending'
            else if(!findContactDetail.accepted && userIsContact(findContactDetail.contact))return 'Accept'
            else return 'Following';
        }
    }

    const userIsContact = (contact: Partial<IUser>) => {
        return contact.id === loggedInUser;
    }

    return {contacts, isLoading, isSuccess, followStatus, userIsContact, loggedInUser}
}

export default useContacts;