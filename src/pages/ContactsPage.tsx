import AddButton from "../components/AddButton.tsx";
import {IconUserSearch} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";


const ContactsPage: React.FC = () => {
    const {contacts, followStatus, userIsContact} = useContacts();

    return (
        <div className={`w-full mx-auto px-4`}>
            <h2 className={`text-2xl font-bold py-4 text-[color:var(--color-text)]`}>Contacts</h2>
            <ul className={`text-lg text-[color:var(--color-dark)] w-full bg-[color:var(--color-bg)]`}>
                {contacts && contacts.length === 0 ? <p>no contacts</p> : contacts.map((contactItem) => {
                    const {id, contact, user} = contactItem;
                    const isContact = userIsContact(contact);
                    return (
                        <Link to={`/contacts/${contactItem.id}`} key={id} state={{contact: isContact ? user : contact}}>
                            <li
                                key={id}
                                className={`w-full h-14 border-[color:var(--color-text)] border-b-[1px] p-2 
                                cursor-pointer flex justify-between`}
                            >
                                <span>{isContact ? user.userName : contact.userName}</span>
                                <p className={`text-[color:var(--color-dark)] text-xs font-normal`}>{followStatus(isContact ? user.id as string : contact.id as string)}</p>
                            </li>
                        </Link>
                    )
                })}
            </ul>
            <AddButton to={`/contacts/new`} Icon={IconUserSearch} size={30}/>
        </div>
    )
}

export default ContactsPage;