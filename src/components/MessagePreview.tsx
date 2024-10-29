import React, {useEffect, useState} from "react";
import {IconUserCircle} from "@tabler/icons-react";

import {useGetContactLastMessageQuery} from "../redux/chatty.ts";
import {IMessage, IUser} from "../types";
import {useAuth} from "../context/AuthContext.tsx";
import {SmallBodyText, SmallHeaderText} from "./Typography.tsx";
import useMessageNotification, {NotificationBadge} from "../hooks/useMessageNotifications.tsx";

interface IMessagePreviewComponentProps {
    contact: Partial<IUser>;
}

const getMessageTime = (lastMessage: IMessage)=>{
    return new Date(lastMessage.updatedAt as Date).toLocaleDateString('fi')
}

const messageContainerStyle = `self-center text-[color:var(--color-text)] text-xs font-light`;

const MessageComponent: React.FC<{message: string; isAiContact: boolean}> = ({message, isAiContact})=> {

    if (isAiContact && message.length <= 0) {
        return <SmallBodyText className={`${messageContainerStyle}`}>Ask chattyai for help</SmallBodyText>
    }
    if (!isAiContact && message.length <= 0) {
        return <SmallBodyText className={`${messageContainerStyle}`}>Start chatting</SmallBodyText>
    }
    return <SmallBodyText className={`${messageContainerStyle}`}>{message}</SmallBodyText>
}

const MessagePreview: React.FC<IMessagePreviewComponentProps> = ({contact}) => {
    const {notifications} = useMessageNotification(contact);
    const {user: loggedInUser} = useAuth();
    const [lastMessage, setLastMessage] = useState<IMessage[]>([]);
        const {data, isSuccess, refetch} = useGetContactLastMessageQuery({userId : loggedInUser?.id as string, contactId: contact.id as string});

        useEffect(() => {
            refetch();
            if (data) {
                setLastMessage(() => [...data]);
            };
        }, [data, notifications])

        return(
        <div className={`w-full p-4 flex flex-row justify-start cursor-pointer`} key={contact.id} data-testid={`message-preview-${contact.userName}`}>
        <IconUserCircle stroke={2} size={30} className={`text-[color:var(--color-text)]`}/>
            <div className={`px-4 flex flex-row w-full justify-between`}>
                <span className={`flex flex-col`}>
                    <SmallHeaderText className={`font-semibold`}>{contact.userName}</SmallHeaderText>
                    {isSuccess && lastMessage && lastMessage.length > 0 ? <>
                        <MessageComponent message={lastMessage[0].body.substring(0, 42)} isAiContact={false}/>
                    </> : <MessageComponent message={''}
                                            isAiContact={contact.id === import.meta.env.VITE_CHATTY_AI_ID}/>}
                </span>
                <span className={`self-center`}>
                    <NotificationBadge notification={notifications.length} />
                </span>
                {isSuccess && lastMessage && lastMessage.length > 0 ? <>
                    <SmallBodyText
                        className={`${messageContainerStyle}`}>{getMessageTime(lastMessage[0])}</SmallBodyText>
                </> : <></>}
            </div>
        </div>
        )
}

export default MessagePreview;