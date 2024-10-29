import React, { useEffect, useState} from "react";
import {IMessage, IUser} from "../types";
import useSocket from "./useSocket.tsx";
import { XSmallBodyText} from "../components/Typography.tsx";

interface INotificationBadgeProps {
    notification: string | number;
}


export const NotificationBadge: React.FC<INotificationBadgeProps> = ({notification})=>{
    if (notification === 0 || notification === '0' || !notification)return null;
    return(<div className={`w-fit p-1 bg-red-300 rounded`}>
        <XSmallBodyText className={`!text-[color:var(--color-white)] !font-semibold`}>{notification}</XSmallBodyText>
    </div>)
}

const useMessageNotification = (contact:Partial<IUser>)=>{
    const {socket, wsEvents} = useSocket();
    const [notifications, setNotifications] = useState<IMessage[]>([]);

    const handleNotification = (message: IMessage)=>{
        const {from} = message;
        setNotifications((prevState)=> {
            if(contact.id === from) return  [...prevState, message]
            else return prevState;
        });
    }

    useEffect(()=>{
        socket.on(wsEvents.SERVER.SEND_MESSAGE, handleNotification);
        return () => {
            socket.off(wsEvents.SERVER.SEND_MESSAGE, handleNotification);
        };
    }, [wsEvents.SERVER.SEND_MESSAGE])

    return {notifications, setNotifications}
}

export default useMessageNotification;