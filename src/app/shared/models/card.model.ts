export class Card {
  id!: string;
  name!: string;
  supertype!: string;
  subtypes!: string[];
  types!: string[];
  rarity?: string;
  images!: Images;
  tcgplayer!: Tcgplayer;
  set!: Set;
  number!: string;
  // Other unused props are returned, more info at https://docs.pokemontcg.io/api-reference/cards/card-object
}

export class Images {
  small!: string;
  large!: string;
}

export class Tcgplayer {
  url!: string;
  updatedAt!: string;
  prices!: Foil;
}

export class Set {
  id!: string;
  images!: SetImage;
  legalities!: Legality;
  name!: string;
  printedTotal!: number;
  ptcgoCode!: string;
  releaseDate!: string;
  series!: string;
  total!: number;
  updatedAt!: string;
}

export class SetImage {
  symbol!: string;
  logo!: string;
}

export enum LEGALITY {
  LEGAL = 'Legal',
  BANNED = 'Banned',
}

export class Legality {
  expanded: Legality | undefined;
  standard: Legality | undefined;
  unlimited: Legality | undefined;
}

export class Foil {
  holofoil?: PriceValues;
  reverseHolofoil?: PriceValues;
  normal?: PriceValues;
  unlimitedHolofoil?: PriceValues;
  '1stEditionNormal'?: PriceValues;
  '1stEditionHolofoil'?: PriceValues;
}
export enum FOIL {
  'holofoil' = 'holofoil',
  'reverseHolofoil' = 'reverseHolofoil',
  'normal' = 'normal',
  'unlimitedHolofoil' = 'unlimitedHolofoil',
  '1stEditionNormal' = '1stEditionNormal',
  '1stEditionHolofoil' = '1stEditionHolofoil',
}
export class PriceValues {
  low!: number;
  mid!: number;
  high!: number;
  market!: number;
  directLow!: number;
}
