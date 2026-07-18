// Wolf of Wall Street — game data, digitized from the original BFF of America
// classroom game. Starting prices, market hints, final prices, and performance
// summaries all come from the paper version; the two mid-game news rounds were
// added for the digital version and interpolate toward the official results.

export interface Company {
  name: string
  ticker: string
  industry: string
  product: string
  /** Prices per stage: [opening, after news 1, after news 2, final]. */
  prices: [number, number, number, number]
  /** Official performance summary, revealed at the end. */
  summary: string
}

export const COMPANIES: Company[] = [
  {
    name: 'Zoomoo', ticker: 'ZMO', industry: 'Tech',
    product: 'Virtual zoo tours & live animal cams',
    prices: [100, 103, 99, 110],
    summary: 'Adopted by schools; got animal rights support. Strong growth.',
  },
  {
    name: 'FlexFuel', ticker: 'FLX', industry: 'Energy',
    product: 'Clean fuel for electric aircraft',
    prices: [102, 110, 114, 118],
    summary: 'Government subsidies + big contract win. Big increase.',
  },
  {
    name: 'Snacksy', ticker: 'SNX', industry: 'Consumer Goods',
    product: 'Viral healthy snacks from TikTok',
    prices: [97, 101, 94, 92],
    summary: 'Trend faded; taste reviews hurt the brand.',
  },
  {
    name: 'SynthWear', ticker: 'SYN', industry: 'Fashion Tech',
    product: 'Color-changing temperature-sensitive clothing',
    prices: [98, 102, 96, 95],
    summary: 'Product issues; returns spiked.',
  },
  {
    name: 'Nerth', ticker: 'NTH', industry: 'Biotech',
    product: 'Allergy-blocking daily vitamins',
    prices: [101, 99, 104, 107],
    summary: 'Health-conscious shoppers boosted back-to-school sales.',
  },
  {
    name: 'GameNebula', ticker: 'GNB', industry: 'Entertainment',
    product: 'Cloud-based indie gaming platform',
    prices: [99, 101, 108, 112],
    summary: 'Hit partnership with major indie game.',
  },
  {
    name: 'StreamIQ', ticker: 'SIQ', industry: 'Media / Tech',
    product: 'AI-curated streaming bundles',
    prices: [103, 100, 104, 106],
    summary: 'Competitive market, but solid bundling kept it afloat.',
  },
  {
    name: 'PlantX', ticker: 'PLX', industry: 'Agriculture',
    product: 'AI-run indoor farms for schools',
    prices: [96, 102, 108, 114],
    summary: 'School contracts and sustainability boost.',
  },
  {
    name: 'ByteBites', ticker: 'BYT', industry: 'Tech / Food',
    product: 'Smart vending machines recommending snacks based on mood',
    prices: [98, 103, 93, 90],
    summary: 'Cool concept, but buggy software caused setbacks.',
  },
  {
    name: 'PetPal+', ticker: 'PTP', industry: 'Health / Consumer',
    product: 'Pet wellness subscription boxes + vet telehealth',
    prices: [100, 104, 109, 112],
    summary: 'Pet owners loved the convenience + influencer boost.',
  },
  {
    name: 'NovaCharge', ticker: 'NVC', industry: 'Renewable Energy',
    product: 'Solar-powered chargers made from recycled plastic',
    prices: [99, 103, 106, 108],
    summary: 'Eco-friendly + viral review = strong demand.',
  },
  {
    name: 'RideRoll', ticker: 'RRL', industry: 'Transportation',
    product: 'App for renting e-skateboards & scooters',
    prices: [101, 104, 96, 93],
    summary: 'City permit issues + high theft costs.',
  },
]

/** Phase 2 of the paper game — shown while students pick their stocks. */
export const MARKET_HINTS = [
  '🚀 Clean energy and sustainability are in demand.',
  '🐾 Health, wellness, and pet care spending is strong.',
  '🎮 Gaming and budget streaming are growing fast.',
  '📱 Social media trends can skyrocket or sink brands.',
  '⚠️ Risky tech and overregulation can hurt new companies.',
  '🧠 Consumers want convenience, value, and reliability.',
]

export interface NewsItem {
  headline: string
  tickers: string[]
  direction: 'up' | 'down'
}

/** Breaking news between trading rounds (digital-version addition). */
export const NEWS_ROUNDS: NewsItem[][] = [
  [
    { headline: 'Government announces clean-energy subsidies — FlexFuel lands a major contract talk.', tickers: ['FLX', 'NVC', 'PLX'], direction: 'up' },
    { headline: 'Snacksy hits peak virality on TikTok. Everyone is talking about it… for now.', tickers: ['SNX'], direction: 'up' },
    { headline: 'ByteBites hype builds as mood-snack machines appear in two malls.', tickers: ['BYT'], direction: 'up' },
    { headline: 'Slow summer for vitamin sales drags on Nerth.', tickers: ['NTH'], direction: 'down' },
    { headline: 'Streaming price war heats up — StreamIQ under pressure.', tickers: ['SIQ'], direction: 'down' },
    { headline: 'Sunny season: RideRoll scooter rentals climb.', tickers: ['RRL'], direction: 'up' },
  ],
  [
    { headline: 'GameNebula announces partnership with a major indie hit!', tickers: ['GNB'], direction: 'up' },
    { headline: 'ByteBites machines glitch, recommending pickles for sadness. Refunds spike.', tickers: ['BYT'], direction: 'down' },
    { headline: 'Cities crack down on scooter permits — RideRoll fined in three cities.', tickers: ['RRL'], direction: 'down' },
    { headline: 'PetPal+ goes viral after a famous influencer’s iguana unboxing.', tickers: ['PTP'], direction: 'up' },
    { headline: 'SynthWear shirts change color at the wrong times. Returns pile up.', tickers: ['SYN', 'SNX'], direction: 'down' },
    { headline: 'Back-to-school season: schools adopt Zoomoo tours and Nerth vitamins sell out.', tickers: ['ZMO', 'NTH', 'PLX'], direction: 'up' },
  ],
]

export const STARTING_CASH = 1000

/**
 * Game stages (used by both solo and live modes):
 * 0 lobby (live only) · 1 opening bell (trade at opening prices)
 * 2 news round 1 (trade) · 3 news round 2 (trade)
 * 4 closing bell reveal (locked, company-by-company)
 * 5 final leaderboard / results
 */
export const STAGE_PRICE_INDEX: Record<number, 0 | 1 | 2 | 3> = {
  0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 3,
}

export function priceAt(company: Company, stage: number): number {
  return company.prices[STAGE_PRICE_INDEX[stage] ?? 3]
}

export type Holdings = Record<string, number>

export function portfolioValue(cash: number, holdings: Holdings, stage: number): number {
  let total = cash
  for (const c of COMPANIES) {
    const shares = holdings[c.ticker] ?? 0
    total += shares * priceAt(c, stage)
  }
  return total
}
