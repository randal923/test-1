import axios from 'axios';

import { config } from './config';

interface SearchGifsParams {
  searchTerm: string;
  offSet?: number;
  limit?: number;
}

export const searchGifs = async (params: SearchGifsParams) => {
  const { searchTerm, offSet, limit = 10 } = params;

  const response = await axios.get(config.api.giphy.baseUrl, {
    params: {
      api_key: config.api.giphy.apiKey,
      q: searchTerm,
      limit: limit,
      offset: offSet,
      rating: "g",
      lang: "en",
    },
  });

  return response.data;
};
