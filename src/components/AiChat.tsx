import React, {useEffect, useRef, useState} from "react";
import {IMessage, IUser} from "../types";
import useSocket from "../hooks/useSocket.tsx";
import {IconArrowLeft, IconSend} from "@tabler/icons-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

import MessageComponent from "./Message.tsx";
import useMessages from "../hooks/useMessages.tsx";
import {AlwaysScrollToBottom} from "./Chat.tsx";



const AiChat: React.FC = ()=>{
    const navigate = useNavigate();
    const {state} = useLocation();
    const [messageBody, setMessageBody] = useState<string>('');
    const [contact, setContact] = useState<Partial<IUser>>();
    const {socket, wsEvents, sendMessageToAi} = useSocket();
    const {userId} = useAuth();
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const {messages, setMessages, receiveNewMessage} = useMessages({userId: userId as string, contactId: contact?.id as string});

    const handleSendMessage = () => {
        if (messageBody.length <= 0){
            alert('Message can not be empty');
            return;
        }
        const messageToSend = {body: messageBody, from: userId as string, to: contact?.id as string, isRead: false, createdAt: new Date(), updatedAt: new Date()};
        sendMessageToAi(messageToSend);
        setMessages(()=>[...messages, messageToSend]);
        setMessageBody('')
    }

    useEffect(()=>{
        inputRef.current?.focus()
        setContact(()=>state.contact);
    }, [])

    useEffect(()=>{
        socket.on(wsEvents.SERVER.SEND_MESSAGE_TO_AI, receiveNewMessage);
        return () => {
            socket.off(wsEvents.SERVER.SEND_MESSAGE_TO_AI, receiveNewMessage);
        };
    }, [wsEvents.SERVER.SEND_MESSAGE_TO_AI])


    return (
        <div className={`w-full mx-auto px-2 max-h-[calc(100vh-74px)]`}>
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
                <AlwaysScrollToBottom/>
            </div>
            <div className={`w-full flex bg-[color:var(--color-white)] p-2 rounded`}>
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

export default AiChat;
