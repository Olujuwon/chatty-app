import {useEffect, useState} from "react";
import {IMessage} from "../types";
import {useGetUserContactMessagesQuery} from "../redux/chatty.ts";

const useMessages = ({userId, contactId}:{userId: string; contactId: string}) => {
    const {data : oldMessages, isLoading,isSuccess, isError, error} = useGetUserContactMessagesQuery({userId: userId as string, contactId: contactId as string})
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if (oldMessages && isSuccess)setMessages(()=>oldMessages as IMessage[]);
    }, [oldMessages, isSuccess])

    const receiveNewMessage = (message:IMessage) => {
        setMessages((prevState)=>[...prevState, message]);
    }

    return{messages, setMessages, isError, error, receiveNewMessage, isLoading}
}

export default useMessages;