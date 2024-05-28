'use server';

import { QueryFunctionContext } from '@tanstack/react-query';
import { buildHeaders } from '.';

export const getFeeds = async () => {
  // const headers = await buildHeaders();
  const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/`, {
    // headers,
    method: 'GET',
    mode: 'no-cors',
  });
  return response.json();
};

export const getFeedDetail = async (queryKey: string[]) => {
  // const headers = await buildHeaders();
  const [_, feedKey] = queryKey;
  const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}`, {
    // headers,
    method: 'GET',
    mode: 'no-cors',
  });
  return response.json();
};

export const getFeedHistory = async (queryKey: string[], startTime?: string) => {
  // const headers = await buildHeaders();
  const [_, feedKey] = queryKey;
  const response = await fetch(
    `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data${startTime ? '?start_time=' + startTime : ''}`,
    {
      // headers,
      method: 'GET',
      mode: 'no-cors',
    },
  );
  return response.json();
};

export const updateFeed = async (feedKey: string, value: number) => {
  const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AIO-Key': process.env.AIO_KEY || '',
    },
    body: JSON.stringify({ value: value }),
  });
  return response.json();
};
