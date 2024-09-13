import React from "react";
import {IconUserCircle} from "@tabler/icons-react";
import {useGetContactLastMessageQuery} from "../redux/chatty.ts";
import {IMessage, IUser} from "../types";
import {Link} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";


const getMessageTime = (lastMessage: IMessage)=>{
    return new Date(lastMessage.updatedAt as Date).toLocaleDateString()
}

const MessagePreview: React.FC<{contact: Partial<IUser>}> = ({contact})=>{
    const {loggedInUser} = useContacts();
    const {data: lastMessage, isSuccess} = useGetContactLastMessageQuery({userId : loggedInUser, contactId: contact.id as string});
    return(
        <div className={`w-full p-4 flex flex-row justify-start cursor-pointer`} key={contact.id}>
            <IconUserCircle stroke={2} size={50} className={`text-[color:var(--color-text)]`}/>
            <div className={`px-4 flex flex-row w-full justify-between`}>
                <span>
                    <h2 className={`self-center text-[color:var(--color-text)] text-sm font-semibold`}>{contact.userName}</h2>
                    {isSuccess && lastMessage && lastMessage.length > 0 ? <>
                        <p className={`self-center text-[color:var(--color-text)] text-xs font-light`}>{lastMessage[0].body}</p>
                    </> : <><p className={`self-center text-[color:var(--color-text)] text-xs font-light`}>Start chatting</p></>}
                </span>
                {isSuccess && lastMessage && lastMessage.length > 0 ? <>
                    <p className={`self-center text-[color:var(--color-text)] text-xs font-light`}>{getMessageTime(lastMessage[0])}</p>
                </> : <></>}
            </div>
        </div>
    )
}


const MessagesPage = () => {
    const {contacts, userIsContact} = useContacts();

    if (contacts && contacts.length === 0){
        return (
            <div className={`text-[color:var(--color-text)] w-full mx-auto px-4 pt-4`}>
                <h2 className={`text-2xl font-bold py-4 text-[color:var(--color-text)]`}>You have no contacts yet</h2>
                <p>Search and add new friends <Link
                    to='/contacts'
                    className={`text-base italic text-[color:var(--color-main)]`}>here</Link></p>
            </div>
        )
    }

    return (
        <div className={`text-[color:var(--color-text)] w-full mx-auto px-4 `}>
            {
                contacts.map((contact, idx)=>{
                    const isContact = userIsContact(contact.contact);
                    const userContact = isContact ? contact.user : contact.contact;
                    return (<Link to={`/messages/${userContact.id}`} state={{contact: userContact}} key={userContact.id}>
                        <MessagePreview contact={userContact} key={idx}/>
                    </Link>)
                })
            }
        </div>
    )
}

export default MessagesPage;