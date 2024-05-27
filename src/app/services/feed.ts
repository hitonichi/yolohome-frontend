'use server';

import { QueryFunctionContext } from '@tanstack/react-query';
import { buildHeaders } from '.';

export const getFeeds = async () => {
  // const headers = await buildHeaders();
  // console.log('[GET FEEDS] check headers', headers);
  const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/`, {
    // headers,
    method: 'GET',
    mode: 'no-cors',
  });
  return response.json();
};

export const getFeedDetail = async (queryKey: string[]) => {
  // const headers = await buildHeaders();
  console.log('[GET FEED DETAIL]', queryKey);
  const [_, feedKey] = queryKey;
  const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}`, {
    // headers,
    method: 'GET',
    mode: 'no-cors',
  });
  return response.json();
};

export const getFeedHistory = async (queryKey: string[]) => {
  // const headers = await buildHeaders();
  console.log('[GET FEED HISTORY]', queryKey);
  const [_, feedKey] = queryKey;
  const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data`, {
    // headers,
    method: 'GET',
    mode: 'no-cors',
  });
  return response.json();
};
