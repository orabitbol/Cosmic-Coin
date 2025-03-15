export interface Game {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  category: string;
  description: string;
}

export const games: Game[] = [
  {
    id: "1",
    name: "🎰 Slot Machine",
    thumbnail: "/images/slot-machine.jpg",
    url: "/game/slot-machine",
    category: "מזל",
    description: "סובב את המכונה וזכה בפרסים ענקיים!",
  },
  {
    id: "2",
    name: "🃏 Blackjack",
    thumbnail: "/images/blackjack.jpg",
    url: "/game/blackjack",
    category: "קלפים",
    description: "ניסיון להביס את הדילר ולהשיג 21 נקודות.",
  },
  {
    id: "3",
    name: "🎲 Roulette",
    thumbnail: "/images/roulette.jpg",
    url: "/game/roulette",
    category: "מזל",
    description: "שים את הז'טונים שלך והמתן לסיבוב המזל!",
  },
  {
    id: "4",
    name: "🎮 Poker",
    thumbnail: "/images/poker.jpg",
    url: "/game/poker",
    category: "קלפים",
    description: "שחק נגד שחקנים אחרים וצבור את הקופה.",
  },
  {
    id: "5",
    name: "💎 Baccarat",
    thumbnail: "/images/baccarat.jpg",
    url: "/game/baccarat",
    category: "קלאסי",
    description: "משחק היוקרה האולטימטיבי – האם תנצח?",
  },
];

export const fetchGames = async (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(games), 1000); 
  });
};
