// Market Movers — game data, digitized from the original BFF of America
// classroom game. Starting prices, market hints, final prices, and performance
// summaries all come from the paper version; the two mid-game news rounds were
// added for the digital version and interpolate toward the official results.

export interface Company {
  name: string
  ticker: string
  industry: string
  /** Spanish sector label. */
  industryEs: string
  /** Simplified Chinese sector label. */
  industryZh: string
  product: string
  /** Lucide icon name for this company (rendered via GAME_ICONS). */
  icon: string
  /** Spanish product description. */
  productEs: string
  /** Simplified Chinese product description. */
  productZh: string
  /** Prices per stage: [opening, after news 1, after news 2, final]. */
  prices: [number, number, number, number]
  /** Official performance summary, revealed at the end. */
  summary: string
  /** Spanish performance summary. */
  summaryEs: string
  /** Simplified Chinese performance summary. */
  summaryZh: string
}

export const COMPANIES: Company[] = [
  {
    name: 'Zoomoo', ticker: 'ZMO', industry: 'Tech',
    industryEs: 'Tecnología',
    industryZh: '科技',
    product: 'Virtual zoo tours & live animal cams',
    icon: 'PawPrint',
    productEs: 'Tours virtuales de zoológico y cámaras de animales en vivo',
    productZh: '虚拟动物园游览和动物直播镜头',
    prices: [100, 103, 99, 110],
    summary: 'Adopted by schools; got animal rights support. Strong growth.',
    summaryEs: 'Adoptada por escuelas; recibió apoyo por los derechos de los animales. Fuerte crecimiento.',
    summaryZh: '被学校采用；获得了动物权益方面的支持。增长强劲。',
  },
  {
    name: 'FlexFuel', ticker: 'FLX', industry: 'Energy',
    industryEs: 'Energía',
    industryZh: '能源',
    product: 'Clean fuel for electric aircraft',
    icon: 'Plane',
    productEs: 'Combustible limpio para aviones eléctricos',
    productZh: '电动飞机用的清洁燃料',
    prices: [102, 110, 114, 118],
    summary: 'Government subsidies + big contract win. Big increase.',
    summaryEs: 'Subsidios del gobierno + un gran contrato ganado. Gran aumento.',
    summaryZh: '政府补贴＋赢得大合同。大幅上涨。',
  },
  {
    name: 'Snacksy', ticker: 'SNX', industry: 'Consumer Goods',
    industryEs: 'Bienes de consumo',
    industryZh: '消费品',
    product: 'Viral healthy snacks from TikTok',
    icon: 'Cookie',
    productEs: 'Snacks saludables virales de TikTok',
    productZh: '在 TikTok 上爆红的健康零食',
    prices: [97, 101, 94, 92],
    summary: 'Trend faded; taste reviews hurt the brand.',
    summaryEs: 'La moda pasó; las reseñas sobre el sabor dañaron la marca.',
    summaryZh: '热度消退；口味评价拖累了品牌。',
  },
  {
    name: 'SynthWear', ticker: 'SYN', industry: 'Fashion Tech',
    industryEs: 'Tecnología de moda',
    industryZh: '时尚科技',
    product: 'Color-changing temperature-sensitive clothing',
    icon: 'Shirt',
    productEs: 'Ropa que cambia de color según la temperatura',
    productZh: '随温度变色的服装',
    prices: [98, 102, 96, 95],
    summary: 'Product issues; returns spiked.',
    summaryEs: 'Problemas con el producto; las devoluciones se dispararon.',
    summaryZh: '产品出了问题；退货激增。',
  },
  {
    name: 'Nerth', ticker: 'NTH', industry: 'Biotech',
    industryEs: 'Biotecnología',
    industryZh: '生物科技',
    product: 'Allergy-blocking daily vitamins',
    icon: 'Pill',
    productEs: 'Vitaminas diarias que bloquean las alergias',
    productZh: '抗过敏的每日维生素',
    prices: [101, 99, 104, 107],
    summary: 'Health-conscious shoppers boosted back-to-school sales.',
    summaryEs: 'Los compradores preocupados por la salud impulsaron las ventas de regreso a clases.',
    summaryZh: '注重健康的消费者带动了返校季的销量。',
  },
  {
    name: 'GameNebula', ticker: 'GNB', industry: 'Entertainment',
    industryEs: 'Entretenimiento',
    industryZh: '娱乐',
    product: 'Cloud-based indie gaming platform',
    icon: 'Gamepad2',
    productEs: 'Plataforma de videojuegos indie en la nube',
    productZh: '基于云端的独立游戏平台',
    prices: [99, 101, 108, 112],
    summary: 'Hit partnership with major indie game.',
    summaryEs: 'Gran alianza con un videojuego indie exitoso.',
    summaryZh: '与一款热门独立游戏达成了合作。',
  },
  {
    name: 'StreamIQ', ticker: 'SIQ', industry: 'Media / Tech',
    industryEs: 'Medios / Tecnología',
    industryZh: '媒体／科技',
    product: 'AI-curated streaming bundles',
    icon: 'MonitorPlay',
    productEs: 'Paquetes de streaming seleccionados por IA',
    productZh: '由 AI 精选的流媒体套餐',
    prices: [103, 100, 104, 106],
    summary: 'Competitive market, but solid bundling kept it afloat.',
    summaryEs: 'Mercado competitivo, pero sus buenos paquetes la mantuvieron a flote.',
    summaryZh: '市场竞争激烈，但扎实的套餐组合让它稳住了脚跟。',
  },
  {
    name: 'PlantX', ticker: 'PLX', industry: 'Agriculture',
    industryEs: 'Agricultura',
    industryZh: '农业',
    product: 'AI-run indoor farms for schools',
    icon: 'Sprout',
    productEs: 'Granjas de interior manejadas por IA para escuelas',
    productZh: '由 AI 运营、供学校使用的室内农场',
    prices: [96, 102, 108, 114],
    summary: 'School contracts and sustainability boost.',
    summaryEs: 'Contratos escolares e impulso por la sostenibilidad.',
    summaryZh: '学校合同和可持续发展带来的助力。',
  },
  {
    name: 'ByteBites', ticker: 'BYT', industry: 'Tech / Food',
    industryEs: 'Tecnología / Comida',
    industryZh: '科技／食品',
    product: 'Smart vending machines recommending snacks based on mood',
    icon: 'CupSoda',
    productEs: 'Máquinas expendedoras inteligentes que recomiendan snacks según tu estado de ánimo',
    productZh: '根据你的心情推荐零食的智能自动售货机',
    prices: [98, 103, 93, 90],
    summary: 'Cool concept, but buggy software caused setbacks.',
    summaryEs: 'Concepto genial, pero el software con fallas causó tropiezos.',
    summaryZh: '概念很酷，但软件故障造成了挫折。',
  },
  {
    name: 'PetPal+', ticker: 'PTP', industry: 'Health / Consumer',
    industryEs: 'Salud / Consumo',
    industryZh: '健康／消费',
    product: 'Pet wellness subscription boxes + vet telehealth',
    icon: 'Dog',
    productEs: 'Cajas de suscripción de bienestar para mascotas + telemedicina veterinaria',
    productZh: '宠物保健订阅盒＋兽医远程问诊',
    prices: [100, 104, 109, 112],
    summary: 'Pet owners loved the convenience + influencer boost.',
    summaryEs: 'A los dueños de mascotas les encantó la comodidad + el impulso de los influencers.',
    summaryZh: '宠物主人喜欢它的便利＋网红带货的助力。',
  },
  {
    name: 'NovaCharge', ticker: 'NVC', industry: 'Renewable Energy',
    industryEs: 'Energía renovable',
    industryZh: '可再生能源',
    product: 'Solar-powered chargers made from recycled plastic',
    icon: 'BatteryCharging',
    productEs: 'Cargadores solares hechos de plástico reciclado',
    productZh: '用回收塑料制成的太阳能充电器',
    prices: [99, 103, 106, 108],
    summary: 'Eco-friendly + viral review = strong demand.',
    summaryEs: 'Ecológico + reseña viral = fuerte demanda.',
    summaryZh: '环保＋爆红评价＝强劲需求。',
  },
  {
    name: 'RideRoll', ticker: 'RRL', industry: 'Transportation',
    industryEs: 'Transporte',
    industryZh: '交通出行',
    product: 'App for renting e-skateboards & scooters',
    icon: 'Bike',
    productEs: 'App para alquilar patinetas eléctricas y scooters',
    productZh: '租借电动滑板和滑板车的应用',
    prices: [101, 104, 96, 93],
    summary: 'City permit issues + high theft costs.',
    summaryEs: 'Problemas con los permisos de la ciudad + altos costos por robos.',
    summaryZh: '城市牌照问题＋高昂的失窃成本。',
  },
]

/** Phase 2 of the paper game — shown while students pick their stocks. */
export const MARKET_HINTS = [
  'Clean energy and sustainability are in demand.',
  'Health, wellness, and pet care spending is strong.',
  'Gaming and budget streaming are growing fast.',
  'Social media trends can skyrocket or sink brands.',
  'Risky tech and overregulation can hurt new companies.',
  'Consumers want convenience, value, and reliability.',
]

/** Spanish market hints (same order as MARKET_HINTS). */
export const MARKET_HINTS_ES = [
  'La energía limpia y la sostenibilidad están en demanda.',
  'El gasto en salud, bienestar y cuidado de mascotas es fuerte.',
  'Los videojuegos y el streaming económico crecen rápido.',
  'Las tendencias de las redes sociales pueden disparar o hundir marcas.',
  'La tecnología arriesgada y el exceso de regulación pueden perjudicar a las empresas nuevas.',
  'Los consumidores quieren comodidad, buen precio y confiabilidad.',
]

/** Simplified Chinese market hints (same order as MARKET_HINTS). */
export const MARKET_HINTS_ZH = [
  '清洁能源和可持续发展很受追捧。',
  '健康、养生和宠物护理方面的消费很旺。',
  '游戏和平价流媒体增长迅速。',
  '社交媒体的潮流能让品牌一飞冲天，也能让它一落千丈。',
  '高风险的科技和过度监管会伤害新公司。',
  '消费者想要的是便利、实惠和可靠。',
]

/** Lucide icon name per market hint (same order as MARKET_HINTS). */
export const MARKET_HINT_ICONS: string[] = [
  'Leaf',
  'HeartPulse',
  'Gamepad2',
  'Smartphone',
  'TriangleAlert',
  'Brain',
]

export interface NewsItem {
  headline: string
  /** Spanish headline. */
  headlineEs: string
  /** Simplified Chinese headline. */
  headlineZh: string
  tickers: string[]
  direction: 'up' | 'down'
}

/** Breaking news between trading rounds (digital-version addition). */
export const NEWS_ROUNDS: NewsItem[][] = [
  [
    { headline: 'Government announces clean-energy subsidies, FlexFuel lands a major contract talk.', headlineEs: 'El gobierno anuncia subsidios de energía limpia, FlexFuel entra en negociaciones por un gran contrato.', headlineZh: '政府宣布清洁能源补贴，FlexFuel 进入了一项大合同的谈判。', tickers: ['FLX', 'NVC', 'PLX'], direction: 'up' },
    { headline: 'Snacksy hits peak virality on TikTok. Everyone is talking about it… for now.', headlineEs: 'Snacksy alcanza su punto máximo de viralidad en TikTok. Todos hablan de ella… por ahora.', headlineZh: 'Snacksy 在 TikTok 上的热度冲到顶点。大家都在讨论它……至少现在是这样。', tickers: ['SNX'], direction: 'up' },
    { headline: 'ByteBites hype builds as mood-snack machines appear in two malls.', headlineEs: 'Crece la expectativa por ByteBites cuando sus máquinas de snacks por estado de ánimo aparecen en dos centros comerciales.', headlineZh: '随着心情零食机出现在两家商场，ByteBites 的热度不断升温。', tickers: ['BYT'], direction: 'up' },
    { headline: 'Slow summer for vitamin sales drags on Nerth.', headlineEs: 'Un verano lento en la venta de vitaminas frena a Nerth.', headlineZh: '维生素销售遇上清淡的夏天，拖累了 Nerth。', tickers: ['NTH'], direction: 'down' },
    { headline: 'Streaming price war heats up, StreamIQ under pressure.', headlineEs: 'La guerra de precios del streaming se intensifica, StreamIQ bajo presión.', headlineZh: '流媒体价格战升温，StreamIQ 承压。', tickers: ['SIQ'], direction: 'down' },
    { headline: 'Sunny season: RideRoll scooter rentals climb.', headlineEs: 'Temporada soleada: suben los alquileres de scooters de RideRoll.', headlineZh: '阳光明媚的季节：RideRoll 的滑板车租借量攀升。', tickers: ['RRL'], direction: 'up' },
  ],
  [
    { headline: 'GameNebula announces partnership with a major indie hit!', headlineEs: '¡GameNebula anuncia una alianza con un gran éxito indie!', headlineZh: 'GameNebula 宣布与一款热门独立游戏达成合作！', tickers: ['GNB'], direction: 'up' },
    { headline: 'ByteBites machines glitch, recommending pickles for sadness. Refunds spike.', headlineEs: 'Las máquinas de ByteBites fallan y recomiendan pepinillos para la tristeza. Los reembolsos se disparan.', headlineZh: 'ByteBites 的机器出故障，在你伤心时给你推荐腌黄瓜。退款激增。', tickers: ['BYT'], direction: 'down' },
    { headline: 'Cities crack down on scooter permits, RideRoll fined in three cities.', headlineEs: 'Las ciudades endurecen los permisos de scooters. RideRoll es multada en tres ciudades.', headlineZh: '各城市严打滑板车牌照，RideRoll 在三个城市被罚款。', tickers: ['RRL'], direction: 'down' },
    { headline: 'PetPal+ goes viral after a famous influencer’s iguana unboxing.', headlineEs: 'PetPal+ se vuelve viral tras el unboxing de la iguana de un influencer famoso.', headlineZh: '一位知名网红的鬣蜥开箱视频让 PetPal+ 爆红。', tickers: ['PTP'], direction: 'up' },
    { headline: 'SynthWear shirts change color at the wrong times. Returns pile up.', headlineEs: 'Las camisetas de SynthWear cambian de color en el momento equivocado. Las devoluciones se acumulan.', headlineZh: 'SynthWear 的衬衫总在不该变色的时候变色。退货堆积如山。', tickers: ['SYN', 'SNX'], direction: 'down' },
    { headline: 'Back-to-school season: schools adopt Zoomoo tours and Nerth vitamins sell out.', headlineEs: 'Temporada de regreso a clases: las escuelas adoptan los tours de Zoomoo y las vitaminas de Nerth se agotan.', headlineZh: '返校季：学校采用了 Zoomoo 的游览，Nerth 的维生素也卖光了。', tickers: ['ZMO', 'NTH', 'PLX'], direction: 'up' },
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
