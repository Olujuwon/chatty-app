import {Link} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";
import MessagePreview from "../components/MessagePreview.tsx";
import {MainHeaderText, MediumBodyText, MediumHeaderText} from "../components/Typography.tsx";
import LoadingComponent from "../components/Loading.tsx";



const MessagesPage = () => {
    const {contacts, userIsContact, isLoading} = useContacts();

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (contacts.length === 0){
        return (
            <div className={`text-[color:var(--color-text)] w-full mx-auto px-4 pt-6`}>
                <MediumHeaderText className={`font-bold py-4`}>You have no contacts yet</MediumHeaderText>
                <MediumBodyText>Search and add new friends <Link
                    to='/contacts'
                    className={`text-base italic text-[color:var(--color-main)]`}>here</Link></MediumBodyText>
            </div>
        )
    }

    return (
        <div className={`text-[color:var(--color-text)] w-full mx-auto px-4 pt-6`}>
            <MainHeaderText>Messages</MainHeaderText>
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