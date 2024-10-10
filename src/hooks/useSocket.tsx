import {useEffect, useMemo, useRef, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {IMessage} from "../types";
import {useAuth} from "../context/AuthContext.tsx";

interface IUseSocketProps{
    socket : Socket;
    socketIsConnected: boolean;
    connect: () => void;
    joinRoom: (id: string) => void;
    disconnect: () => void;
    sendMessage: (message: IMessage) => void;
    sendMessageToAi: (message: IMessage) => void;
    wsEvents: any
}

const WS_EVENTS = {
    connect: 'connection',
    SERVER: {
        JOIN_ROOM_SELF: 'JOIN_ROOM',
        STATUS: 'ONLINE',
        SEND_MESSAGE : 'SEND_MESSAGE',
        SEND_MESSAGE_TO_AI: 'SEND_MESSAGE_TO_AI',
    }
}

const useSocket = ():IUseSocketProps=>{
    const pageLoadOnceAlready = useRef(false);
    const socketUrl: string = 'ws://localhost:50001';
    const [socketIsConnected, setSocketIsConnected] = useState<boolean>(false);
    const {userId} = useAuth();
    const socket: Socket = useMemo(()=>{
        return io(socketUrl, {autoConnect: false})
    }, [socketUrl])

    useEffect(()=>{
        if (!pageLoadOnceAlready.current){
            connect()
            joinRoom(userId as string);
            socket.on("disconnect", (err) => {
                console.log(`disconnect due to ${err}`);
            });
            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
        }else {
           return
        }
        return ()=>disconnect();
    }, [socket])


    const connect = ()=>{
        socket.connect();
        setSocketIsConnected(true);
    }

    const disconnect = ()=>{
        socket.disconnect();
        setSocketIsConnected(false);
    }

    const joinRoom = (id: string) => {
        socket.emit(WS_EVENTS.SERVER.JOIN_ROOM_SELF, id);
    }

    const sendMessage = (message: IMessage) => {
        socket.emit(WS_EVENTS.SERVER.SEND_MESSAGE, message);
    }

    const sendMessageToAi = (message: IMessage) => {
        socket.emit(WS_EVENTS.SERVER.SEND_MESSAGE_TO_AI, message);
    }

    return {
        socket,
        socketIsConnected,
        connect,
        joinRoom,
        disconnect,
        sendMessage,
        sendMessageToAi,
        wsEvents: WS_EVENTS
    };
}

export default useSocket;

