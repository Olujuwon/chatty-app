import React from "react";
import useContacts from "../hooks/useContacts.tsx";

interface IContactFollowStatusComponentProps {
    followStatus: 'Pending' | 'Following' | 'Add' | 'Accept';
    userId: string;
    contactId: string;
}

const ContactFollowStatusComponent: React.FC<IContactFollowStatusComponentProps> = ({followStatus, userId, contactId})=>{
    const {AcceptNewContact, AddNewContact, UnfollowContact, findContact} = useContacts();

    if (contactId === import.meta.env.VITE_CHATTY_AI_ID) return null;

    const handleClickButton = async () =>{
        if (followStatus === 'Accept'){
            const contactObject = findContact(contactId);
            if (contactObject){
                const acceptContact = await AcceptNewContact(contactObject.id);
                if (acceptContact)alert('Friendship accepted')
                else alert('Unexpected error occured, friendship not accepted successfully!');
            }else{
                alert('Contact not found');
            }
        }else if(followStatus === 'Add'){
            const addContact = await AddNewContact(userId, contactId);
            if (addContact)alert('Friendship request sent to user')
            else alert('Unexpected error occured, friendship request not sent successfully!');
        }
        else if (followStatus === 'Following'){
            const contactObject = findContact(contactId);
            if (contactObject){
                const unfollowContact = await UnfollowContact(contactObject.id);
                if (unfollowContact)alert('User unfollowed')
                else alert('Unexpected error occured, user not unfollowed successfully!');
            }else{
                alert('Contact not found');
            }
        }
    }

    return(
        <button
            className={`${followStatus === 'Pending'?'bg-[color:var(--color-disabled)]':'bg-[color:var(--color-main)]'} 
            py-2 px-4 text-[color:var(--color-text)]`}
            onClick={handleClickButton}
            disabled={followStatus === 'Pending'}
        >
            {followStatus}
        </button>
    )
}

export default ContactFollowStatusComponent;