import axios from 'axios';

export interface Game {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

const API_URL = 'https://urgentgames.com/api/games'; 

export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};
