'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export type MqttMessage = {
  topic: string;
  message: string;
};

export const useMQTT = () => {
  // Socket.io
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      const socket = io('http://localhost:80');
      setSocket(socket);
      return;
    }

    socket.on('message', (msg: string) => {
      const mqttMessage = JSON.parse(msg) as MqttMessage;
      console.log('[MQTT] got msg', mqttMessage);
      if (false) {
        // TODO: handle alert feeds
      } else {
        queryClient.invalidateQueries({ queryKey: ['feeds'] });
        queryClient.invalidateQueries({ queryKey: ['feedDetail'] });
        queryClient.invalidateQueries({ queryKey: ['feedHistory'] });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
};
