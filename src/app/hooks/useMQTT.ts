'use client';

import { useEffect, useState } from "react";
import {Socket, io} from "socket.io-client"

export type MqttMessage = {
    topic: string;
    message: string;
}

export const useMQTT = () => {
    // Socket.io
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!socket) {
            const socket = io("http://localhost:80");
            setSocket(socket);
            return;
        }
        
        socket.on("message", (msg: string) => {
            const mqttMessage = JSON.parse(msg) as MqttMessage;
        });

        return () => {
            socket.disconnect();
        }
        
    }, [socket]);
}