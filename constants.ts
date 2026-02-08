
import { Card } from './types';

export const USD_TO_INR = 83.5;

const generatePriceHistory = (base: number) => {
  const history = [];
  let current = base * 0.7;
  for (let i = 0; i < 12; i++) {
    current += (Math.random() - 0.4) * (base * 0.1);
    history.push({
      date: `2023-${String(i + 1).padStart(2, '0')}-01`,
      price: Math.round(current)
    });
  }
  return history;
};

const createCard = (overrides: Partial<Card>): Card => {
  const basePrice = overrides.market_price?.usd || 1000;
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: "Elite Pokémon Card",
    set: "Base Set",
    year: 1999,
    language: "English",
    edition: "1st Edition",
    psa_grade: 10,
    bgs_grade: null,
    rarity: ["Rare Holo", "Vintage"],
    images: {
      small: `https://picsum.photos/seed/${overrides.name}/400/560`,
      large: `https://picsum.photos/seed/${overrides.name}/800/1120`,
    },
    retail_price: {
      usd: Math.round(basePrice * 0.9),
      inr: Math.round(basePrice * 0.9 * USD_TO_INR),
      currency: 'USD',
      lastUpdated: new Date().toISOString()
    },
    market_price: {
      usd: basePrice,
      inr: Math.round(basePrice * USD_TO_INR),
      currency: 'USD',
      lastUpdated: new Date().toISOString()
    },
    price_history: generatePriceHistory(basePrice),
    provenance: "Heritage Auctions Oct 2023",
    scarcity_score: 95,
    notes: "A grail among grails. Stunning condition.",
    isElite: true,
    era: 'Classic',
    ...overrides
  };
};

export const SEED_CARDS: Card[] = [
  createCard({ name: "Charizard 1st Edition Shadowless", set: "Base Set", year: 1999, market_price: { usd: 350000, inr: 350000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'Classic', rarity: ['Holo', '1st Edition'] }),
  createCard({ name: "Illustrator Pikachu", set: "CoroCoro Promo", year: 1998, market_price: { usd: 5275000, inr: 5275000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'Classic', rarity: ['Unique', 'Promo'] }),
  createCard({ name: "Lugia 1st Edition", set: "Neo Genesis", year: 2000, market_price: { usd: 129000, inr: 129000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'Neo' }),
  createCard({ name: "Umbreon VMAX Alt Art", set: "Evolving Skies", year: 2021, market_price: { usd: 1200, inr: 1200 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'SWSH', rarity: ['Secret Rare'] }),
  createCard({ name: "Gold Star Rayquaza", set: "EX Deoxys", year: 2005, market_price: { usd: 45000, inr: 45000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'EX', rarity: ['Gold Star'] }),
  createCard({ name: "Tropical Mega Battle Trainer", set: "Tropical Mega Battle", year: 1999, market_price: { usd: 65000, inr: 65000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'Classic', rarity: ['Trophy'] }),
  createCard({ name: "Shining Charizard", set: "Neo Destiny", year: 2002, market_price: { usd: 15000, inr: 15000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'Neo', rarity: ['Shining'] }),
  createCard({ name: "Crystal Charizard", set: "Skyridge", year: 2003, market_price: { usd: 28000, inr: 28000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'E-Series', rarity: ['Crystal'] }),
  createCard({ name: "Mario Pikachu Special Box", set: "XY Promo", year: 2016, market_price: { usd: 5000, inr: 5000 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'XY', rarity: ['Full Art', 'Promo'] }),
  createCard({ name: "Poncho-wearing Pikachu Rayquaza", set: "XY Promo", year: 2015, market_price: { usd: 4200, inr: 4200 * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' }, era: 'XY' }),
  // ... more cards to reach 50
  ...Array.from({ length: 40 }).map((_, i) => createCard({ 
    name: `Elite Chase Card #${i + 11}`, 
    year: 2000 + i, 
    market_price: { usd: 500 + (i * 200), inr: (500 + (i * 200)) * USD_TO_INR, currency: 'USD', lastUpdated: '2024-01-01' },
    era: i % 2 === 0 ? 'BW' : 'SM'
  }))
];

export const ERAS = [
  { id: 'Classic', label: 'Classic Era (1996-2000)', start: 1996, end: 2000 },
  { id: 'Neo', label: 'Neo Era (2000-2002)', start: 2000, end: 2002 },
  { id: 'E-Series', label: 'E-Card Era (2002-2003)', start: 2002, end: 2003 },
  { id: 'EX', label: 'EX Era (2003-2007)', start: 2003, end: 2007 },
  { id: 'DP', label: 'Diamond & Pearl (2007-2010)', start: 2007, end: 2010 },
  { id: 'BW', label: 'Black & White (2011-2013)', start: 2011, end: 2013 },
  { id: 'XY', label: 'XY Era (2014-2016)', start: 2014, end: 2016 },
  { id: 'SM', label: 'Sun & Moon (2017-2019)', start: 2017, end: 2019 },
  { id: 'SWSH', label: 'Sword & Shield (2020-2022)', start: 2020, end: 2022 },
  { id: 'SV', label: 'Scarlet & Violet (2023-Present)', start: 2023, end: 2025 }
];
