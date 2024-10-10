import React, {useEffect, useRef} from "react";
import {liteClient as algoliasearch} from "algoliasearch/lite";
import {useNavigate} from "react-router-dom";
import useContacts from "../hooks/useContacts.tsx";
import {IconArrowLeft} from "@tabler/icons-react";
import {Hits, InstantSearch, SearchBox, useInstantSearch} from "react-instantsearch";
import "instantsearch.css/themes/satellite.css";
import ContactItem from "../components/ContactItem.tsx";
import {IUser} from "../types";
import {MainHeaderText} from "../components/Typography.tsx";

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

const NewContact :React.FC = () => {
    const firstLoadRef = useRef<boolean>(false)
    const searchClient = algoliasearch("2ZS0AMSP1W", "56dd726b8ca61aa694ca13323c5323b9");
    const navigate = useNavigate();
    const {loggedInUser} = useContacts();

    useEffect(() => {
        if (!firstLoadRef.current) firstLoadRef.current = true;
    }, []);

    return (
        <div className={`w-full mx-auto px-4`}>
            <MainHeaderText className={`flex items-center cursor-pointer mt-2.5`}>
                <IconArrowLeft onClick={() => navigate(-1)} className={`w-5 text-[color:var(--color-dark)]`}/>
            </MainHeaderText>
            <MainHeaderText className={`py-4`}>Search to add new contacts</MainHeaderText>
            <div className={`text-[color:var(--color-dark)] pt-2 text-center`}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName='IDX_USER'
                    stalledSearchDelay={500}
                >

                    <div className="">
                        <SearchBox
                            className={`outline-0 w-full mx-auto h-11 
                            [&_.ais-SearchBox-input]:text-[color:var(--color-text)] 
                            [&_.ais-SearchBox-input]:rounded [&_.ais-SearchBox-input]:bg-[color:var(--color-lighter)]`}
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
                                    return <ContactItem contact={hit as Partial<IUser>} key={hit.id}/>
                                }
                            }}
                            className={`outline-0 w-full mx-auto !rounded text-[color:var(--color-text)] 
                            [&_.ais-Hits-item]:p-0 [&_.ais-Hits-item]:!rounded [&_.ais-Hits-item]:bg-transparent 
                            [&_.ais-Hits-item]:mb-1`}
                        />
                    </EmptyQueryBoundary>
                </InstantSearch>
            </div>
        </div>
    )
}

export default NewContact;
