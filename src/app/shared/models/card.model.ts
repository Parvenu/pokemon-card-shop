export class Card {
    id!: string
    name!: string
    supertype!: string
    subtypes!: string[]
    hp!: string
    types!: string[]
    evolvesFrom!: string
    attacks!: Attack[]
    weaknesses!: Weakness[]
    resistances!: Resistance[]
    retreatCost!: string[]
    convertedRetreatCost!: number
    set!: Set
    number!: string
    artist!: string
    rarity!: string
    flavorText!: string
    nationalPokedexNumbers!: number[]
    legalities!: Legalities2
    images!: Images2
    tcgplayer!: Tcgplayer
  }
  
  export class Attack {
    name!: string
    cost!: string[]
    convertedEnergyCost!: number
    damage!: string
    text!: string
  }
  
  export class Weakness {
    type!: string
    value!: string
  }
  
  export class Resistance {
    type!: string
    value!: string
  }
  
  export class Set {
    id!: string
    name!: string
    series!: string
    printedTotal!: number
    total!: number
    legalities!: Legalities
    ptcgoCode!: string
    releaseDate!: string
    updatedAt!: string
    images!: Images
  }
  
  export class Legalities {
    unlimited!: string
  }
  
  export class Images {
    symbol!: string
    logo!: string
  }
  
  export class Legalities2 {
    unlimited!: string
  }
  
  export class Images2 {
    small!: string
    large!: string
  }
  
  export class Tcgplayer {
    url!: string
    updatedAt!: string
    prices!: Foil
  }
  
  export class Foil {
    holofoil?: PriceValues
    reverseHolofoil?: PriceValues
    normal?: PriceValues
    unlimitedHolofoil?: PriceValues
    '1stEditionNormal'?: PriceValues
    '1stEditionHolofoil'?: PriceValues
  }
  export enum FOIL {
    'holofoil' = 'holofoil',
    'reverseHolofoil' = 'reverseHolofoil',
    'normal' = 'normal',
    'unlimitedHolofoil' = 'unlimitedHolofoil',
    '1stEditionNormal' = '1stEditionNormal',
    '1stEditionHolofoil' = '1stEditionHolofoil',
  }
  export enum RARITY {
    "Amazing Rare" = "Amazing Rare",
    "Classic Collection" = "Classic Collection",
    "Common" = "Common",
    "Double Rare" = "Double Rare",
    "Hyper Rare" = "Hyper Rare",
    "Illustration Rare" = "Illustration Rare",
    "LEGEND" = "LEGEND",
    "Promo" = "Promo",
    "Radiant Rare" = "Radiant Rare",
    "Rare" = "Rare",
    "Rare ACE" = "Rare ACE",
    "Rare BREAK" = "Rare BREAK",
    "Rare Holo" = "Rare Holo",
    "Rare Holo EX" = "Rare Holo EX",
    "Rare Holo GX" = "Rare Holo GX",
    "Rare Holo LV.X" = "Rare Holo LV.X",
    "Rare Holo Star" = "Rare Holo Star",
    "Rare Holo V" = "Rare Holo V",
    "Rare Holo VMAX" = "Rare Holo VMAX",
    "Rare Holo VSTAR" = "Rare Holo VSTAR",
    "Rare Prime" = "Rare Prime",
    "Rare Prism Star" = "Rare Prism Star",
    "Rare Rainbow" = "Rare Rainbow",
    "Rare Secret" = "Rare Secret",
    "Rare Shining" = "Rare Shining",
    "Rare Shiny" = "Rare Shiny",
    "Rare Shiny GX" = "Rare Shiny GX",
    "Rare Ultra" = "Rare Ultra",
    "Special Illustration Rare" = "Special Illustration Rare",
    "Trainer Gallery Rare Holo" = "Trainer Gallery Rare Holo",
    "Ultra Rare" = "Ultra Rare",
    "Uncommon" = "Uncommon",
  }

  export enum TYPES {
    "Colorless" = "Colorless",
    "Darkness" = "Darkness",
    "Dragon" = "Dragon",
    "Fairy" = "Fairy",
    "Fighting" = "Fighting",
    "Fire" = "Fire",
    "Grass" = "Grass",
    "Lightning" = "Lightning",
    "Metal" = "Metal",
    "Psychic" = "Psychic",
    "Water" = "Water",
  }

  export enum SUBTYPES {
    "ACE SPEC" = "ACE SPEC",
    "BREAK" = "BREAK",
    "Baby" = "Baby",
    "Basic" = "Basic",
    "EX" = "EX",
    "Eternamax" = "Eternamax",
    "Fusion Strike" = "Fusion Strike",
    "GX" = "GX",
    "Goldenrod Game Corner" = "Goldenrod Game Corner",
    "Item" = "Item",
    "LEGEND" = "LEGEND",
    "Level-Up" = "Level-Up",
    "MEGA" = "MEGA",
    "Pokémon Tool" = "Pokémon Tool",
    "Pokémon Tool F" = "Pokémon Tool F",
    "Prime" = "Prime",
    "Prism Star" = "Prism Star",
    "Radiant" = "Radiant",
    "Rapid Strike" = "Rapid Strike",
    "Restored" = "Restored",
    "Rocket's Secret Machine" = "Rocket's Secret Machine",
    "SP" = "SP",
    "Single Strike" = "Single Strike",
    "Special" = "Special",
    "Stadium" = "Stadium",
    "Stage 1" = "Stage 1",
    "Stage 2" = "Stage 2",
    "Star" = "Star",
    "Supporter" = "Supporter",
    "TAG TEAM" = "TAG TEAM",
    "Team Plasma" = "Team Plasma",
    "Technical Machine" = "Technical Machine",
    "Tera" = "Tera",
    "Ultra Beast" = "Ultra Beast",
    "V" = "V",
    "V-UNION" = "V-UNION",
    "VMAX" = "VMAX",
    "VSTAR" = "VSTAR",
    "ex" = "ex",
  }
  export class PriceValues { 
    low!: number
    mid!: number
    high!: number
    market!: number
    directLow!: number
  }

  