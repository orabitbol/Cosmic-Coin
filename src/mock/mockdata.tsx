export interface Game {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

export const games: Game[] = [
  {
    id: "1",
    name: "🎰 Slot Machine",
    thumbnail: "/images/slot-machine.jpg",
    url: "/game/slot-machine",
  },
  {
    id: "2",
    name: "🃏 Blackjack",
    thumbnail: "/images/blackjack.jpg",
    url: "/game/blackjack",
  },
  {
    id: "3",
    name: "🎲 Roulette",
    thumbnail: "/images/roulette.jpg",
    url: "/game/roulette",
  },
  {
    id: "4",
    name: "🎮 Poker",
    thumbnail: "/images/poker.jpg",
    url: "/game/poker",
  },
  {
    id: "5",
    name: "💎 Baccarat",
    thumbnail: "/images/baccarat.jpg",
    url: "/game/baccarat",
  },
];

export const fetchGames = async (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(games), 1000); 
  });
};
