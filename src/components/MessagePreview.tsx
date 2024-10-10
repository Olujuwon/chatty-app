import React from "react";
import {IconUserCircle} from "@tabler/icons-react";

import {useGetContactLastMessageQuery} from "../redux/chatty.ts";
import {IMessage, IUser} from "../types";
import {useAuth} from "../context/AuthContext.tsx";
import {SmallBodyText, SmallHeaderText} from "./Typography.tsx";

interface IMessagePreviewComponentProps {
    contact: Partial<IUser>
}

const getMessageTime = (lastMessage: IMessage)=>{
    return new Date(lastMessage.updatedAt as Date).toLocaleDateString('fi')
}

const messageContainerStyle = `self-center text-[color:var(--color-text)] text-xs font-light`;

const MessageComponent: React.FC<{message: string; isAiContact: boolean}> = ({message, isAiContact})=> {

    if (isAiContact && !message) {
        return <SmallBodyText className={`${messageContainerStyle}`}>Ask chattyai for help</SmallBodyText>
    }
    if (!isAiContact && !message) {
        return <SmallBodyText className={`${messageContainerStyle}`}>Start chatting</SmallBodyText>
    }
    return <SmallBodyText className={`${messageContainerStyle}`}>{message}</SmallBodyText>
}

const MessagePreview: React.FC<IMessagePreviewComponentProps> = ({contact}) => {
    const {user: loggedInUser} = useAuth();
        const {data: lastMessage, isSuccess} = useGetContactLastMessageQuery({userId : loggedInUser?.id as string, contactId: contact.id as string});
        return(
        <div className={`w-full p-4 flex flex-row justify-start cursor-pointer`} key={contact.id}>
        <IconUserCircle stroke={2} size={50} className={`text-[color:var(--color-text)]`}/>
        <div className={`px-4 flex flex-row w-full justify-between`}>
                <span>
                    <SmallHeaderText className={`self-center font-semibold`}>{contact.userName}</SmallHeaderText>
                    {isSuccess && lastMessage && lastMessage.length > 0 ? <>
                        <MessageComponent message={lastMessage[0].body.substring(0, 42)} isAiContact={false}/>
                    </> : <MessageComponent message={lastMessage} isAiContact={contact.id === import.meta.env.VITE_CHATTY_AI_ID}/> }
                </span>
            {isSuccess && lastMessage && lastMessage.length > 0 ? <>
                <SmallBodyText className={`${messageContainerStyle}`}>{getMessageTime(lastMessage[0])}</SmallBodyText>
            </> : <></>}
        </div>
    </div>
        )
}

export default MessagePreview;