import got from 'got';

const api = 'http://api.giphy.com/v1';
const API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

export async function searchGifs({ q, limit, offset }) {
  try {
    const response = await got(`${api}/gifs/search`, {
      searchParams: {
        api_key: API_KEY,
        q,
        limit,
        offset,
      },
      responseType: 'json',
    });

    return response.body;
  } catch (error) {
    console.error(error);
    return {};
  }
}
