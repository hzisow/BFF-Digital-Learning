// Wolf of Wall Street — game data, digitized from the original BFF of America
// classroom game. Starting prices, market hints, final prices, and performance
// summaries all come from the paper version; the two mid-game news rounds were
// added for the digital version and interpolate toward the official results.

export interface Company {
  name: string
  ticker: string
  industry: string
  /** Spanish sector label. */
  industryEs: string
  product: string
  /** Spanish product description. */
  productEs: string
  /** Prices per stage: [opening, after news 1, after news 2, final]. */
  prices: [number, number, number, number]
  /** Official performance summary, revealed at the end. */
  summary: string
  /** Spanish performance summary. */
  summaryEs: string
}

export const COMPANIES: Company[] = [
  {
    name: 'Zoomoo', ticker: 'ZMO', industry: 'Tech',
    industryEs: 'Tecnología',
    product: 'Virtual zoo tours & live animal cams',
    productEs: 'Tours virtuales de zoológico y cámaras de animales en vivo',
    prices: [100, 103, 99, 110],
    summary: 'Adopted by schools; got animal rights support. Strong growth.',
    summaryEs: 'Adoptada por escuelas; recibió apoyo por los derechos de los animales. Fuerte crecimiento.',
  },
  {
    name: 'FlexFuel', ticker: 'FLX', industry: 'Energy',
    industryEs: 'Energía',
    product: 'Clean fuel for electric aircraft',
    productEs: 'Combustible limpio para aviones eléctricos',
    prices: [102, 110, 114, 118],
    summary: 'Government subsidies + big contract win. Big increase.',
    summaryEs: 'Subsidios del gobierno + un gran contrato ganado. Gran aumento.',
  },
  {
    name: 'Snacksy', ticker: 'SNX', industry: 'Consumer Goods',
    industryEs: 'Bienes de consumo',
    product: 'Viral healthy snacks from TikTok',
    productEs: 'Snacks saludables virales de TikTok',
    prices: [97, 101, 94, 92],
    summary: 'Trend faded; taste reviews hurt the brand.',
    summaryEs: 'La moda pasó; las reseñas sobre el sabor dañaron la marca.',
  },
  {
    name: 'SynthWear', ticker: 'SYN', industry: 'Fashion Tech',
    industryEs: 'Tecnología de moda',
    product: 'Color-changing temperature-sensitive clothing',
    productEs: 'Ropa que cambia de color según la temperatura',
    prices: [98, 102, 96, 95],
    summary: 'Product issues; returns spiked.',
    summaryEs: 'Problemas con el producto; las devoluciones se dispararon.',
  },
  {
    name: 'Nerth', ticker: 'NTH', industry: 'Biotech',
    industryEs: 'Biotecnología',
    product: 'Allergy-blocking daily vitamins',
    productEs: 'Vitaminas diarias que bloquean las alergias',
    prices: [101, 99, 104, 107],
    summary: 'Health-conscious shoppers boosted back-to-school sales.',
    summaryEs: 'Los compradores preocupados por la salud impulsaron las ventas de regreso a clases.',
  },
  {
    name: 'GameNebula', ticker: 'GNB', industry: 'Entertainment',
    industryEs: 'Entretenimiento',
    product: 'Cloud-based indie gaming platform',
    productEs: 'Plataforma de videojuegos indie en la nube',
    prices: [99, 101, 108, 112],
    summary: 'Hit partnership with major indie game.',
    summaryEs: 'Gran alianza con un videojuego indie exitoso.',
  },
  {
    name: 'StreamIQ', ticker: 'SIQ', industry: 'Media / Tech',
    industryEs: 'Medios / Tecnología',
    product: 'AI-curated streaming bundles',
    productEs: 'Paquetes de streaming seleccionados por IA',
    prices: [103, 100, 104, 106],
    summary: 'Competitive market, but solid bundling kept it afloat.',
    summaryEs: 'Mercado competitivo, pero sus buenos paquetes la mantuvieron a flote.',
  },
  {
    name: 'PlantX', ticker: 'PLX', industry: 'Agriculture',
    industryEs: 'Agricultura',
    product: 'AI-run indoor farms for schools',
    productEs: 'Granjas de interior manejadas por IA para escuelas',
    prices: [96, 102, 108, 114],
    summary: 'School contracts and sustainability boost.',
    summaryEs: 'Contratos escolares e impulso por la sostenibilidad.',
  },
  {
    name: 'ByteBites', ticker: 'BYT', industry: 'Tech / Food',
    industryEs: 'Tecnología / Comida',
    product: 'Smart vending machines recommending snacks based on mood',
    productEs: 'Máquinas expendedoras inteligentes que recomiendan snacks según tu estado de ánimo',
    prices: [98, 103, 93, 90],
    summary: 'Cool concept, but buggy software caused setbacks.',
    summaryEs: 'Concepto genial, pero el software con fallas causó tropiezos.',
  },
  {
    name: 'PetPal+', ticker: 'PTP', industry: 'Health / Consumer',
    industryEs: 'Salud / Consumo',
    product: 'Pet wellness subscription boxes + vet telehealth',
    productEs: 'Cajas de suscripción de bienestar para mascotas + telemedicina veterinaria',
    prices: [100, 104, 109, 112],
    summary: 'Pet owners loved the convenience + influencer boost.',
    summaryEs: 'A los dueños de mascotas les encantó la comodidad + el impulso de los influencers.',
  },
  {
    name: 'NovaCharge', ticker: 'NVC', industry: 'Renewable Energy',
    industryEs: 'Energía renovable',
    product: 'Solar-powered chargers made from recycled plastic',
    productEs: 'Cargadores solares hechos de plástico reciclado',
    prices: [99, 103, 106, 108],
    summary: 'Eco-friendly + viral review = strong demand.',
    summaryEs: 'Ecológico + reseña viral = fuerte demanda.',
  },
  {
    name: 'RideRoll', ticker: 'RRL', industry: 'Transportation',
    industryEs: 'Transporte',
    product: 'App for renting e-skateboards & scooters',
    productEs: 'App para alquilar patinetas eléctricas y scooters',
    prices: [101, 104, 96, 93],
    summary: 'City permit issues + high theft costs.',
    summaryEs: 'Problemas con los permisos de la ciudad + altos costos por robos.',
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

/** Spanish market hints (same order as MARKET_HINTS). */
export const MARKET_HINTS_ES = [
  '🚀 La energía limpia y la sostenibilidad están en demanda.',
  '🐾 El gasto en salud, bienestar y cuidado de mascotas es fuerte.',
  '🎮 Los videojuegos y el streaming económico crecen rápido.',
  '📱 Las tendencias de las redes sociales pueden disparar o hundir marcas.',
  '⚠️ La tecnología arriesgada y el exceso de regulación pueden perjudicar a las empresas nuevas.',
  '🧠 Los consumidores quieren comodidad, buen precio y confiabilidad.',
]

export interface NewsItem {
  headline: string
  /** Spanish headline. */
  headlineEs: string
  tickers: string[]
  direction: 'up' | 'down'
}

/** Breaking news between trading rounds (digital-version addition). */
export const NEWS_ROUNDS: NewsItem[][] = [
  [
    { headline: 'Government announces clean-energy subsidies — FlexFuel lands a major contract talk.', headlineEs: 'El gobierno anuncia subsidios de energía limpia — FlexFuel entra en negociaciones por un gran contrato.', tickers: ['FLX', 'NVC', 'PLX'], direction: 'up' },
    { headline: 'Snacksy hits peak virality on TikTok. Everyone is talking about it… for now.', headlineEs: 'Snacksy alcanza su punto máximo de viralidad en TikTok. Todos hablan de ella… por ahora.', tickers: ['SNX'], direction: 'up' },
    { headline: 'ByteBites hype builds as mood-snack machines appear in two malls.', headlineEs: 'Crece la expectativa por ByteBites cuando sus máquinas de snacks por estado de ánimo aparecen en dos centros comerciales.', tickers: ['BYT'], direction: 'up' },
    { headline: 'Slow summer for vitamin sales drags on Nerth.', headlineEs: 'Un verano lento en la venta de vitaminas frena a Nerth.', tickers: ['NTH'], direction: 'down' },
    { headline: 'Streaming price war heats up — StreamIQ under pressure.', headlineEs: 'La guerra de precios del streaming se intensifica — StreamIQ bajo presión.', tickers: ['SIQ'], direction: 'down' },
    { headline: 'Sunny season: RideRoll scooter rentals climb.', headlineEs: 'Temporada soleada: suben los alquileres de scooters de RideRoll.', tickers: ['RRL'], direction: 'up' },
  ],
  [
    { headline: 'GameNebula announces partnership with a major indie hit!', headlineEs: '¡GameNebula anuncia una alianza con un gran éxito indie!', tickers: ['GNB'], direction: 'up' },
    { headline: 'ByteBites machines glitch, recommending pickles for sadness. Refunds spike.', headlineEs: 'Las máquinas de ByteBites fallan y recomiendan pepinillos para la tristeza. Los reembolsos se disparan.', tickers: ['BYT'], direction: 'down' },
    { headline: 'Cities crack down on scooter permits — RideRoll fined in three cities.', headlineEs: 'Las ciudades endurecen los permisos de scooters — RideRoll es multada en tres ciudades.', tickers: ['RRL'], direction: 'down' },
    { headline: 'PetPal+ goes viral after a famous influencer’s iguana unboxing.', headlineEs: 'PetPal+ se vuelve viral tras el unboxing de la iguana de un influencer famoso.', tickers: ['PTP'], direction: 'up' },
    { headline: 'SynthWear shirts change color at the wrong times. Returns pile up.', headlineEs: 'Las camisetas de SynthWear cambian de color en el momento equivocado. Las devoluciones se acumulan.', tickers: ['SYN', 'SNX'], direction: 'down' },
    { headline: 'Back-to-school season: schools adopt Zoomoo tours and Nerth vitamins sell out.', headlineEs: 'Temporada de regreso a clases: las escuelas adoptan los tours de Zoomoo y las vitaminas de Nerth se agotan.', tickers: ['ZMO', 'NTH', 'PLX'], direction: 'up' },
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
