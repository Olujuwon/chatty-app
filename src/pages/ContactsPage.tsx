import AddButton from "../components/AddButton.tsx";
import {IconUserSearch} from "@tabler/icons-react";
import useContacts from "../hooks/useContacts.tsx";
import ContactItem from "../components/ContactItem.tsx";
import {MainHeaderText, MediumHeaderText} from "../components/Typography.tsx";
import LoadingComponent from "../components/Loading.tsx";

const ContactsPage: React.FC = () => {
    const {contacts, userIsContact, isLoading} = useContacts();

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (contacts.length === 0){
        return (
            <div className={`text-[color:var(--color-text)] w-full mx-auto px-4 pt-6`}>
                <MediumHeaderText className={`font-bold py-4`}>You have no contacts yet</MediumHeaderText>
            </div>
        )
    }

    return (
        <div className={`w-full mx-auto px-4`}>
            <MainHeaderText className={`py-4`}>Contacts</MainHeaderText>
            <ul className={`text-lg text-[color:var(--color-dark)] w-full bg-[color:var(--color-bg)]`}>
                {contacts && contacts.length === 0 ? <p>no contacts</p> : contacts.map((contactItem) => {
                    const {id, contact, user} = contactItem;
                    const isContact = userIsContact(contact);
                    return <ContactItem contact={isContact ? user : contact} key={id}/>
                })}
            </ul>
            <AddButton to={`/contacts/new`} Icon={IconUserSearch} size={30}/>
        </div>
    )
}

export default ContactsPage;