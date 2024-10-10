import {Link} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";
import MessagePreview from "../components/MessagePreview.tsx";



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
                    const userContactIsAi = userContact.id === import.meta.env.VITE_CHATTY_AI_ID;
                    if (!contact.accepted)return null
                    else {
                        return (<Link to={`/messages/${userContactIsAi ? 'aichat': userContact.id}`} state={{contact: userContact}} key={userContact.id}>
                            <MessagePreview contact={userContact} key={idx}/>
                        </Link>)
                    }
                })
            }
        </div>
    )
}

export default MessagesPage;