import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {IUser} from "../types";
import {IconArrowLeft, IconUserCircle} from "@tabler/icons-react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import {InstantSearch, SearchBox, Hits, useInstantSearch} from "react-instantsearch";
import {useCookies} from "react-cookie";
import {useAddContactMutation, useUpdateContactMutation} from "../redux/chatty.ts";
import useContacts from "../hooks/useContacts.tsx";


const  EmptyQueryBoundary = ({ children, fallback }: {children: React.ReactNode; fallback: null}) => {
    const { indexUiState } = useInstantSearch();

    if (!indexUiState.query) {
        return (
            <>
                {fallback}
                <div hidden>{children}</div>
            </>
        );
    }

    return children;
}

export const Contact: React.FC = () => {
    const [cookies] = useCookies();
    const {state} = useLocation();
    const navigate = useNavigate();
    const [contact, setContact] = useState<Partial<IUser> | null>(null);
    const loggedInUser = useMemo(()=>cookies['chatty_user_id'], [cookies['chatty_user_id']]);
    const [addContact]=useAddContactMutation({});
    const [updateContact] = useUpdateContactMutation({});
    const {followStatus} = useContacts();
    const {id} = useParams();

    useEffect(() => {
        if (!contact)setContact(()=>state.contact);
    },[contact]);

    const contactFollowStatus = useCallback(()=>followStatus(contact?.id as string),[contact])

    if (!contact)return (<p>...Loading</p>);

    const handleAddNewContact = async (contact: Partial<IUser>) => {
        const statusText = followStatus(contact.id as string);
        if (statusText === 'Add'){
            const addContactQueryResponse = await addContact({userId: loggedInUser, contactId: contact.id});
            if (addContactQueryResponse.data){
                alert('A request have been sent!')
            }
        }else if(statusText === 'Accept'){
            const updateContactObject = await updateContact({contactUpdate: {accepted: true}, contactId: id as string});
            if (updateContactObject.data){
                alert('you are following ' + contact.userName )
            }
        }

    }

    return (
        <div className={`text-[color:var(--color-dark)] p-4`}>
            <h3 className={`flex items-center text-2xl cursor-pointer mt-2.5`}>
                <IconArrowLeft onClick={()=>navigate(-1)} className={`w-5 mr-2 text-[color:var(--color-dark)]`}/>
            </h3>
            <div className={`text-[color:var(--color-dark)] pt-8`}>
                <span>
                    <IconUserCircle stroke={2} size={100} className={`mx-auto text-[color:var(--color-main)]`}/>
                </span>
                <div className={`mt-10 text-center`}>
                    <h2 className={`text-2xl font-semibold text-[color:var(--color-text)] mb-2`}>{`@${contact.userName}`}</h2>
                    <p className={`text-base font-normal text-[color:var(--color-text)] mb-4 mx-auto]`}>{`${contact.bio}`}</p>
                    {contact.id === loggedInUser ? <></> : <button
                        className={`py-2 px-10 bg-[color:var(--color-main)] text-[color:var(--color-text)]`}
                        disabled={followStatus(contact.id as string) === 'Pending'
                            || followStatus(contact.id as string) === 'Following'}
                        onClick={()=>handleAddNewContact(contact)}>{contactFollowStatus()}</button>}
                </div>
            </div>
        </div>
    )
}


export const NewContact: React.FC = () => {
    const firstLoadRef = useRef<boolean>(false)
    const searchClient = algoliasearch("2ZS0AMSP1W", "56dd726b8ca61aa694ca13323c5323b9");
    const navigate = useNavigate();
    const {followStatus, loggedInUser} = useContacts();

    useEffect(() => {
        if (!firstLoadRef.current) firstLoadRef.current = true;
    }, []);

    return (
        <div className={`text-[color:var(--color-dark)] w-full mx-auto px-4`}>
            <h3 className={`flex items-center text-2xl cursor-pointer mt-2.5`}>
                <IconArrowLeft onClick={() => navigate(-1)} className={`w-5 text-[color:var(--color-dark)]`}/>
            </h3>
            <h2 className={`text-2xl font-bold py-4 text-[color:var(--color-text)]`}>Add new contact</h2>
            <div className={`text-[color:var(--color-dark)] pt-8 text-center`}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName='IDX_USER'
                    stalledSearchDelay={500}
                >
                    <div className="">
                        <SearchBox
                            className={`outline-0 w-full mx-auto h-11 !rounded`}
                            placeholder='Search for users e.g @ayoalabi'
                            searchAsYouType={true}
                            autoFocus={true}
                        />
                    </div>
                    <EmptyQueryBoundary fallback={null}>
                        <Hits
                            hitComponent={({hit})=>{
                                if (hit.id === loggedInUser) return
                                else {
                                    return(<Link
                                        to={`/contacts/${hit.id}`}
                                        state={{contact: hit}}
                                        className={`outline-0 w-full mx-auto rounded text-[color:var(--color-text)] text-left flex justify-between`}>
                                    <span>
                                       <h2>{hit.userName}</h2>
                                        <p>{hit.bio}</p>
                                    </span>
                                        <p>{followStatus(hit.id)}</p>
                                    </Link>)
                                }
                            }}
                            className={`outline-0 w-full mx-auto !rounded text-[color:var(--color-text)]`}
                        />
                    </EmptyQueryBoundary>
                </InstantSearch>
            </div>
        </div>
    )
}
