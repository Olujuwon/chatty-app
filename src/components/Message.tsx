import React, {RefObject, useEffect} from "react";
import {IMessage} from "../types";
import {formatDistanceToNow} from "date-fns";
import {useUpdateMessageMutation} from "../redux/chatty.ts";
import {IconChecks} from "@tabler/icons-react";


interface IMessageComponentProps {
    message: IMessage;
    loggedInUser: string;
    containerRef: RefObject<HTMLDivElement>;
    isLastMessage: boolean
}


const MessageComponent: React.FC<IMessageComponentProps> = ({message, loggedInUser, containerRef, isLastMessage})=>{
    const {body, createdAt, isRead, from} = message;
    const isLeft = from === loggedInUser;
    const created_time = formatDistanceToNow(new Date(createdAt as Date), {addSuffix: true});
    const [updateMessage] = useUpdateMessageMutation({});

    useEffect(() => {
        if (message.id && !message.isRead)handleMessageIsReadUpdate(message);
    }, [message]);

    const handleMessageIsReadUpdate = async (message: IMessage)=>{
        const updatedMessage = {...message, isRead: true};
        await updateMessage(updatedMessage);
    }

    if (isLastMessage)containerRef.current?.lastElementChild?.scrollIntoView();

    return(
        <div className={`mb-2 max-w-[80%] ${isLeft ? 'self-start' : 'self-end'}`} key={created_time}>
            <div className={`${ isLeft ? 'bg-[color:var(--color-main)]' : 'bg-[color:var(--color-gray)]'} p-2 rounded-t-xl ${ isLeft ? 'rounded-br-xl' : 'rounded-bl-xl'}`}>
                <p className={`text-base font-normal text-[color:var(--color-white)]`}>{body}</p>
            </div>
            <div className={`flex gap-x-2`}>
                <IconChecks size={18} className={`${isRead ? 'text-[color:var(--color-main)]' : 'text-[color:var(--color-text)]'}`}/>
                <p className={`text-[10px] font-normal text-[color:var(--color-text)]`}>{created_time}</p>
            </div>
        </div>
    )
}

export default MessageComponent;