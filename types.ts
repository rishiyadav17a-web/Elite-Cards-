
export interface PriceData {
  usd: number;
  inr: number;
  currency: string;
  lastUpdated: string;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface CardRarity {
  label: string;
  color: string;
}

export interface Card {
  id: string;
  name: string;
  set: string;
  year: number;
  language: string;
  edition: string;
  psa_grade: number | null;
  bgs_grade: number | null;
  rarity: string[];
  images: {
    small: string;
    large: string;
  };
  retail_price: PriceData;
  market_price: PriceData;
  price_history: PricePoint[];
  provenance: string;
  scarcity_score: number; // 1-100
  notes: string;
  isElite: boolean;
  era: 'Classic' | 'Neo' | 'E-Series' | 'EX' | 'DP' | 'BW' | 'XY' | 'SM' | 'SWSH' | 'SV';
}

export type ViewMode = 'grid' | 'timeline' | 'compare';
