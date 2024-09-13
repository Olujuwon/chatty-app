import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {IMessage} from "../types";
import {useAuth} from "../context/AuthContext.tsx";

interface IUseSocketProps{
    socket : Socket;
    socketIsConnected: boolean;
    connect: () => void;
    joinRoom: (id: string) => void;
    disconnect: () => void;
    listenJoinRoomMessages: (messageBody: IMessage, setFunction: Dispatch<SetStateAction<IMessage[]>>) => void;
    sendMessage: (message: IMessage) => void;
    wsEvents: any
}

const WS_EVENTS = {
    connect: 'connection',
    SERVER: {
        JOIN_ROOM_SELF: 'JOIN_ROOM',
        STATUS: 'ONLINE',
        SEND_MESSAGE : 'SEND_MESSAGE'
    }
}

const useSocket = ():IUseSocketProps=>{
    const socketUrl: string = 'ws://localhost:50001';
    const [socketIsConnected, setSocketIsConnected] = useState<boolean>(false);
    const {userId} = useAuth();
    const socket: Socket = useMemo(()=>{
        return io(socketUrl, {autoConnect: false})
    }, [socketUrl])

    useEffect(()=>{
        connect()
        joinRoom(userId as string);
        socket.on("disconnect", (err) => {
            console.log(`disconnect due to ${err}`);
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        //pageLoadOnceAlready.current = true;
        return ()=>disconnect();
    }, [])


    const connect = ()=>{
        socket.connect();
        setSocketIsConnected(true);
    }

    const disconnect = ()=>{
        socket.disconnect();
        setSocketIsConnected(false);
    }

    const listenJoinRoomMessages = (value: IMessage, setFunction: Dispatch<SetStateAction<IMessage[]>>)=>{
        //take setFunction as param
        console.log('Listener', value)
        setFunction((prevState: IMessage[]) => [...prevState,value]);
    }

    const joinRoom = (id: string) => {
        socket.emit(WS_EVENTS.SERVER.JOIN_ROOM_SELF, id);
    }

    const sendMessage = (message: IMessage) => {
        socket.emit(WS_EVENTS.SERVER.SEND_MESSAGE, message);
    }

    return {
        socket,
        socketIsConnected,
        connect,
        joinRoom,
        disconnect,
        listenJoinRoomMessages,
        sendMessage,
        wsEvents: WS_EVENTS
    };
}

export default useSocket;

