import AddButton from "../components/AddButton.tsx";
import {IconUserSearch} from "@tabler/icons-react";
import useContacts from "../hooks/useContacts.tsx";
import ContactItem from "../components/ContactItem.tsx";


const ContactsPage: React.FC = () => {
    const {contacts, userIsContact} = useContacts();

    return (
        <div className={`w-full mx-auto px-4`}>
            <h2 className={`text-2xl font-bold py-4 text-[color:var(--color-text)]`}>Contacts</h2>
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