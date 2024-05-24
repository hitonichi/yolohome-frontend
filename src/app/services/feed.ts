'use server';

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
