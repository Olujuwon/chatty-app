import React, {RefObject, useEffect, useRef, useState} from "react";
import {IMessage, IUser} from "../types";
import useSocket from "../hooks/useSocket.tsx";
import {IconArrowLeft, IconSend, IconChecks} from "@tabler/icons-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import { formatDistanceToNow } from "date-fns";
import {useGetUserContactMessagesQuery, useUpdateMessageMutation} from "../redux/chatty.ts";



const MessageComponent: React.FC<{message: IMessage; loggedInUser: string; containerRef: RefObject<HTMLDivElement>; isLastMessage: boolean}> = ({message, loggedInUser, containerRef, isLastMessage})=>{
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

const Chat: React.FC = ()=>{
    const navigate = useNavigate();
    const {state} = useLocation();
    const [messageBody, setMessageBody] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [contact, setContact] = useState<Partial<IUser>>();
    const {socket, sendMessage, wsEvents} = useSocket();
    const {userId} = useAuth();
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const {data : oldMessages, isSuccess} = useGetUserContactMessagesQuery({userId: userId as string, contactId: contact?.id as string})


    const handleSendMessage = () => {
        const messageToSend = {body: messageBody, from: userId as string, to: contact?.id as string, isRead: false, createdAt: new Date(), updatedAt: new Date()};
        sendMessage(messageToSend);
        setMessages(()=>[...messages, messageToSend]);
        setMessageBody('')
    }

    useEffect(()=>{
        inputRef.current?.focus()
        setContact(()=>state.contact);
    }, [])

    useEffect(()=>{
        if (userId && contact?.id){
            if (oldMessages && isSuccess)setMessages(()=>[...oldMessages])
        }
    }, [oldMessages])

    useEffect(()=>{
        socket.on(wsEvents.SERVER.SEND_MESSAGE, (message : IMessage)=> {
            setMessages((prevState)=>[...prevState, message]);
        });
    }, [])


    return (
        <div className={`w-full mx-auto px-4 max-h-[calc(100vh-74px)]`}>
            <h3 className={`flex items-center text-2xl cursor-pointer my-2.5`}>
                <IconArrowLeft onClick={() => navigate(-1)} className={`w-5 mr-2 text-[color:var(--color-dark)]`}/>
                {contact ?
                    <p className={`text-[color:var(--color-dark)] text-base font-light`}>{contact.userName}</p> : ''}
            </h3>
            <div
                className={`w-full max-h-[calc(100vh-74px-96px-24px)] h-[calc(100vh-75px-96px-24px)] overflow-scroll flex flex-col`}
                ref={messagesContainerRef}>
                {messages.map((message: IMessage, idx) => {
                    return (<MessageComponent
                        message={message}
                        key={idx}
                        loggedInUser={userId as string}
                        containerRef={messagesContainerRef}
                        isLastMessage={idx === messages.length - 1}
                    />)
                })}
            </div>
            <div className={`w-full flex bg-[color:var(--color-white)] p-2`}>
                    <textarea
                        ref={inputRef}
                        value={messageBody}
                        onChange={(event) => setMessageBody(() => event.target.value)}
                        rows={1}
                        placeholder='Write a message...'
                        className={`border-0 outline-0 py-2 px-2 w-full resize-none active:outline-0 active:border-0 
                        text-[color:var(--color-text)] rounded bg-[color:var(--color-bg)] text-pretty`}
                    />
                <button
                    className={`text-[color:var(--color-text)] m-2`}
                    onClick={handleSendMessage}
                >
                    <IconSend
                        stroke={2}
                        size={40}
                        className={`text-[color:var(--color-main)]`}/>

                </button>
            </div>
        </div>
    )
}

export default Chat;
