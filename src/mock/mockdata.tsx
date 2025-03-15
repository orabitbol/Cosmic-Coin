export interface Game {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

export const games: Game[] = [
  {
    id: "1",
    name: "Slot Machine",
    thumbnail: "https://via.placeholder.com/150?text=Slot+Machine",
    url: "https://example.com/game/slot-machine",
  },
  {
    id: "2",
    name: "Blackjack",
    thumbnail: "https://via.placeholder.com/150?text=Blackjack",
    url: "https://example.com/game/blackjack",
  },
  {
    id: "3",
    name: "Roulette",
    thumbnail: "https://via.placeholder.com/150?text=Roulette",
    url: "https://example.com/game/roulette",
  },
];

export const fetchGames = async (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(games), 1000); // מדמה קריאה ל-API עם השהייה
  });
};
