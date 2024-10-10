import {useEffect, useMemo, useState} from "react";
import {useCookies} from "react-cookie";
import {useAddContactMutation, useGetUserContactsQuery, useUpdateContactMutation, useDeleteContactMutation} from "../redux/chatty.ts";
import {IContactsQueryData, IUser} from "../types";

const useContacts = () => {
    const [cookies] = useCookies();
    const [contacts, setContacts] = useState<IContactsQueryData[]>([]);
    const loggedInUser = useMemo(()=>cookies['chatty_user_id'], [cookies['chatty_user_id']]);
    const {data, isLoading, isSuccess} = useGetUserContactsQuery(loggedInUser);
    const [updateContact] = useUpdateContactMutation({});
    const [addContact]=useAddContactMutation({});
    const [deleteContact]=useDeleteContactMutation({});

    useEffect(() => {
        if (data && isSuccess)setContacts(data);
    }, [data])

    const AddNewContact = async (userId : string, contactId: string)=>{
        const addContactQueryResponse = await addContact({userId: userId, contactId: contactId});
        return !!addContactQueryResponse.data;
    }

    const AcceptNewContact = async (contactObjectId: string)=>{
        const updateContactObject = await updateContact({contactUpdate: {accepted: true}, contactId: contactObjectId as string});
        return !!updateContactObject.data;
    }

    const UnfollowContact = async (contactObjectId: string)=>{
        const deleteContactObject = await deleteContact(contactObjectId);
        return !!deleteContactObject.data;
    }

    const followStatus = (contactId: string) => {
        const findContactDetail = contacts.find((contactItem : IContactsQueryData) => contactItem.contact.id === contactId || contactItem.user.id === contactId);
        if (!findContactDetail)return 'Add'
        else {
            if (!findContactDetail.accepted && !userIsContact(findContactDetail.contact))return 'Pending'
            else if(!findContactDetail.accepted && userIsContact(findContactDetail.contact))return 'Accept'
            else return 'Following';
        }
    }

    const findContact = (contactId: string) => {
        return contacts.find((contactItem : IContactsQueryData) => contactItem.contact.id === contactId || contactItem.user.id === contactId);
    }

    const userIsContact = (contact: Partial<IUser>) => {
        return contact.id === loggedInUser;
    }

    return {contacts, isLoading, isSuccess, followStatus, userIsContact, loggedInUser, findContact, UnfollowContact, AcceptNewContact, AddNewContact}
}

export default useContacts;