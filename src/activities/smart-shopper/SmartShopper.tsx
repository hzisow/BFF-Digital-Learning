import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, CupSoda, Boxes, Container, Salad, Headphones, Pill, Shirt, Disc3,
  Repeat, Swords, ShoppingCart, Tag, Megaphone, Scale, Calculator,
  PartyPopper, TrendingDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

const SLUG = 'smart-shopper'

/** Local icon lookup: data below stores a lucide icon NAME, never a glyph. */
const ITEM_ICONS: Record<string, LucideIcon> = {
  CupSoda, Boxes, Container, Salad, Headphones, Pill, Shirt, Disc3, Repeat,
  Swords, ShoppingCart, Tag, Megaphone,
}

// ---------- Rounds ----------

interface MathLine {
  label: string
  labelEs: string
  labelZh: string
  value: string
  valueEs: string
  valueZh: string
}

interface Offer {
  /** Key into ITEM_ICONS. */
  icon: string
  name: string
  nameEs: string
  nameZh: string
  shelfTag: string // the flashy marketing line on the shelf
  shelfTagEs: string
  shelfTagZh: string
  price: string
  priceEs: string
  priceZh: string
  mathLines: MathLine[]
  bottomLine: string
  bottomLineEs: string
  bottomLineZh: string
}

interface Round {
  id: string
  title: string
  titleEs: string
  titleZh: string
  scenario: string
  scenarioEs: string
  scenarioZh: string
  offers: [Offer, Offer]
  betterIndex: 0 | 1
  explanation: string
  explanationEs: string
  explanationZh: string
}

const ROUNDS: Round[] = [
  {
    id: 'unit-price',
    title: 'The soda aisle showdown',
    titleEs: 'El duelo del pasillo de refrescos',
    titleZh: '汽水货架大对决',
    scenario: 'You want soda for movie night. Which is actually cheaper per ounce?',
    scenarioEs: 'Quieres refresco para la noche de película. ¿Cuál es en realidad más barato por onza?',
    scenarioZh: '你想买汽水看电影。哪个按每盎司算才真的更便宜？',
    offers: [
      {
        icon: 'CupSoda',
        name: '2-liter bottle',
        nameEs: 'Botella de 2 litros',
        nameZh: '2 升瓶装',
        shelfTag: 'Everyday price',
        shelfTagEs: 'Precio de siempre',
        shelfTagZh: '日常价',
        price: '$2.49',
        priceEs: '$2.49',
        priceZh: '$2.49',
        mathLines: [
          { label: 'Total soda', labelEs: 'Refresco total', labelZh: '汽水总量', value: '2 L = 67.6 oz', valueEs: '2 L = 67.6 oz', valueZh: '2 L = 67.6 oz' },
          { label: '$2.49 ÷ 67.6 oz', labelEs: '$2.49 ÷ 67.6 oz', labelZh: '$2.49 ÷ 67.6 oz', value: '3.7¢ per oz', valueEs: '3.7¢ por oz', valueZh: '每 oz 3.7¢' },
        ],
        bottomLine: '3.7¢ per oz',
        bottomLineEs: '3.7¢ por oz',
        bottomLineZh: '每 oz 3.7¢',
      },
      {
        icon: 'Boxes',
        name: 'Six 12-oz cans',
        nameEs: 'Seis latas de 12 oz',
        nameZh: '六罐 12 oz 装',
        shelfTag: 'MEGA VALUE 6-PACK!',
        shelfTagEs: '¡PAQUETE DE 6 MEGA OFERTA!',
        shelfTagZh: '超值 6 连包！',
        price: '$3.99',
        priceEs: '$3.99',
        priceZh: '$3.99',
        mathLines: [
          { label: 'Total soda', labelEs: 'Refresco total', labelZh: '汽水总量', value: '6 × 12 oz = 72 oz', valueEs: '6 × 12 oz = 72 oz', valueZh: '6 × 12 oz = 72 oz' },
          { label: '$3.99 ÷ 72 oz', labelEs: '$3.99 ÷ 72 oz', labelZh: '$3.99 ÷ 72 oz', value: '5.5¢ per oz', valueEs: '5.5¢ por oz', valueZh: '每 oz 5.5¢' },
        ],
        bottomLine: '5.5¢ per oz',
        bottomLineEs: '5.5¢ por oz',
        bottomLineZh: '每 oz 5.5¢',
      },
    ],
    betterIndex: 0,
    explanation:
      'The "MEGA VALUE" 6-pack costs about 50% more per ounce (5.5¢ vs 3.7¢). The shelf tag shouts, but the unit price whispers the truth, always divide price by amount.',
    explanationEs:
      'El paquete de 6 de "MEGA OFERTA" cuesta como 50% más por onza (5.5¢ vs 3.7¢). La etiqueta grita, pero el precio por unidad susurra la verdad, siempre divide el precio entre la cantidad.',
    explanationZh:
      '"超值" 6 连包每盎司贵了大约 50%（5.5¢ 对 3.7¢）。货架标签喊得响，但单价才悄悄说出真相，永远要用价格除以数量。',
  },
  {
    id: 'bulk',
    title: 'The bulk trap',
    titleEs: 'La trampa de comprar al por mayor',
    titleZh: '大包装陷阱',
    scenario:
      'You eat about 1 lb of salad a week, and spring mix goes bad in about a week. Which do you buy?',
    scenarioEs:
      'Comes como 1 libra de ensalada a la semana, y la mezcla de hojas se echa a perder en más o menos una semana. ¿Cuál compras?',
    scenarioZh:
      '你一周大约吃 1 磅沙拉，而混合嫩叶菜大约一周就坏。你买哪个？',
    offers: [
      {
        icon: 'Container',
        name: '5-lb warehouse tub of spring mix',
        nameEs: 'Recipiente de mayoreo de 5 lb de mezcla de hojas',
        nameZh: '5 磅仓储装混合嫩叶菜',
        shelfTag: 'WAREHOUSE DEAL, only $1.80/lb!',
        shelfTagEs: 'OFERTA DE MAYOREO, ¡solo $1.80/lb!',
        shelfTagZh: '仓储特惠，每磅只要 $1.80！',
        price: '$8.99',
        priceEs: '$8.99',
        priceZh: '$8.99',
        mathLines: [
          { label: 'Price per lb on the tag', labelEs: 'Precio por lb en la etiqueta', labelZh: '标签上的每磅价格', value: '$1.80', valueEs: '$1.80', valueZh: '$1.80' },
          { label: 'You eat before it spoils', labelEs: 'Lo que comes antes de que se eche a perder', labelZh: '坏之前你能吃掉的', value: '~1 lb', valueEs: '~1 lb', valueZh: '约 1 lb' },
          { label: 'Wasted', labelEs: 'Desperdiciado', labelZh: '浪费掉的', value: '~4 lbs in the trash', valueEs: '~4 lbs a la basura', valueZh: '约 4 lb 进垃圾桶' },
          { label: 'Real cost of the 1 lb you ate', labelEs: 'Costo real de la 1 lb que comiste', labelZh: '你吃掉那 1 磅的真实成本', value: '$8.99', valueEs: '$8.99', valueZh: '$8.99' },
        ],
        bottomLine: '$8.99 for what you actually used',
        bottomLineEs: '$8.99 por lo que realmente usaste',
        bottomLineZh: '你真正用到的部分花了 $8.99',
      },
      {
        icon: 'Salad',
        name: '1-lb box of spring mix',
        nameEs: 'Caja de 1 lb de mezcla de hojas',
        nameZh: '1 磅盒装混合嫩叶菜',
        shelfTag: 'Regular size',
        shelfTagEs: 'Tamaño normal',
        shelfTagZh: '普通装',
        price: '$3.49',
        priceEs: '$3.49',
        priceZh: '$3.49',
        mathLines: [
          { label: 'Price per lb', labelEs: 'Precio por lb', labelZh: '每磅价格', value: '$3.49', valueEs: '$3.49', valueZh: '$3.49' },
          { label: 'You eat before it spoils', labelEs: 'Lo que comes antes de que se eche a perder', labelZh: '坏之前你能吃掉的', value: 'all of it', valueEs: 'toda', valueZh: '全部' },
          { label: 'Wasted', labelEs: 'Desperdiciado', labelZh: '浪费掉的', value: '$0', valueEs: '$0', valueZh: '$0' },
        ],
        bottomLine: '$3.49 for what you actually used',
        bottomLineEs: '$3.49 por lo que realmente usaste',
        bottomLineZh: '你真正用到的部分花了 $3.49',
      },
    ],
    betterIndex: 1,
    explanation:
      'Bulk only wins if you USE it all. Salad you throw away is money you threw away: the "cheap" tub really cost $8.99 for one usable pound, more than double the small box. Bulk is great for rice; terrible for lettuce.',
    explanationEs:
      'Comprar al por mayor solo conviene si lo USAS todo. La ensalada que tiras es dinero que tiraste: el recipiente "barato" en realidad costó $8.99 por una libra aprovechable, más del doble que la caja pequeña. El mayoreo es genial para el arroz; terrible para la lechuga.',
    explanationZh:
      '只有全部用完，大包装才划算。倒掉的沙拉就是倒掉的钱："便宜"的大桶其实是花 $8.99 换来一磅能用的量，比小盒贵了一倍多。大包装买米很好；买生菜很糟。',
  },
  {
    id: 'fake-sale',
    title: 'The "sale" that isn\'t',
    titleEs: 'La "oferta" que no lo es',
    titleZh: '名不副实的"优惠"',
    scenario: 'Same exact headphones at two stores. Which price is actually lower?',
    scenarioEs: 'Los mismos audífonos idénticos en dos tiendas. ¿Cuál precio es en realidad más bajo?',
    scenarioZh: '同一款一模一样的耳机，在两家店。哪个价格才真的更低？',
    offers: [
      {
        icon: 'Headphones',
        name: 'Store A headphones',
        nameEs: 'Audífonos de la Tienda A',
        nameZh: 'A 店的耳机',
        shelfTag: 'Was $80, NOW $60! SAVE $20!',
        shelfTagEs: '¡Antes $80, AHORA $60! ¡AHORRA $20!',
        shelfTagZh: '原价 $80，现价 $60！立省 $20！',
        price: '$60.00',
        priceEs: '$60.00',
        priceZh: '$60.00',
        mathLines: [
          { label: '"Was" price', labelEs: 'Precio "antes"', labelZh: '"原价"', value: 'just an anchor number', valueEs: 'solo un número de referencia', valueZh: '只是个锚定数字' },
          { label: 'What leaves your wallet', labelEs: 'Lo que sale de tu cartera', labelZh: '从你钱包里掏出去的', value: '$60.00', valueEs: '$60.00', valueZh: '$60.00' },
        ],
        bottomLine: 'You pay $60',
        bottomLineEs: 'Pagas $60',
        bottomLineZh: '你付 $60',
      },
      {
        icon: 'Headphones',
        name: 'Store B headphones',
        nameEs: 'Audífonos de la Tienda B',
        nameZh: 'B 店的耳机',
        shelfTag: 'Everyday price',
        shelfTagEs: 'Precio de siempre',
        shelfTagZh: '日常价',
        price: '$55.00',
        priceEs: '$55.00',
        priceZh: '$55.00',
        mathLines: [
          { label: 'No sale, no drama', labelEs: 'Sin oferta, sin drama', labelZh: '没有促销，没有花招', value: ', ', valueEs: ', ', valueZh: ', ' },
          { label: 'What leaves your wallet', labelEs: 'Lo que sale de tu cartera', labelZh: '从你钱包里掏出去的', value: '$55.00', valueEs: '$55.00', valueZh: '$55.00' },
        ],
        bottomLine: 'You pay $55',
        bottomLineEs: 'Pagas $55',
        bottomLineZh: '你付 $55',
      },
    ],
    betterIndex: 1,
    explanation:
      'A "was" price is an anchor designed to make $60 feel like a win. Your wallet only feels the FINAL price: $55 beats $60, no matter how big the SAVE sticker is.',
    explanationEs:
      'Un precio "antes" es una referencia diseñada para hacer que $60 se sienta como un triunfo. Tu cartera solo siente el precio FINAL: $55 le gana a $60, sin importar qué tan grande sea la etiqueta de AHORRA.',
    explanationZh:
      '"原价"是个锚，专门用来让 $60 感觉像捡了便宜。你的钱包只在乎最终价格：不管"立省"的贴纸有多大，$55 就是比 $60 划算。',
  },
  {
    id: 'store-brand',
    title: 'Name brand vs. store brand',
    titleEs: 'Marca reconocida vs. marca de la tienda',
    titleZh: '大牌 vs. 店铺自有品牌',
    scenario:
      'Ibuprofen, 200 mg, 100 tablets. Check the "active ingredient" line. It is identical on both boxes.',
    scenarioEs:
      'Ibuprofeno, 200 mg, 100 tabletas. Revisa la línea de "ingrediente activo". Es idéntica en ambas cajas.',
    scenarioZh:
      '布洛芬，200 毫克，100 片。看看"活性成分"那一行，两个盒子上是一模一样的。',
    offers: [
      {
        icon: 'Pill',
        name: 'BrandName ibuprofen',
        nameEs: 'Ibuprofeno de MarcaFamosa',
        nameZh: 'BrandName 布洛芬',
        shelfTag: 'The brand you trust™',
        shelfTagEs: 'La marca en la que confías™',
        shelfTagZh: '你信赖的品牌™',
        price: '$9.49',
        priceEs: '$9.49',
        priceZh: '$9.49',
        mathLines: [
          { label: 'Active ingredient', labelEs: 'Ingrediente activo', labelZh: '活性成分', value: 'ibuprofen 200 mg', valueEs: 'ibuprofeno 200 mg', valueZh: '布洛芬 200 mg' },
          { label: 'Per tablet', labelEs: 'Por tableta', labelZh: '每片', value: '9.5¢', valueEs: '9.5¢', valueZh: '9.5¢' },
          { label: 'What the extra $5 buys', labelEs: 'Lo que compran los $5 de más', labelZh: '多花的 $5 买到了什么', value: 'ad budget + fancy box', valueEs: 'presupuesto de anuncios + caja elegante', valueZh: '广告预算 + 精美盒子' },
        ],
        bottomLine: '9.5¢ per tablet',
        bottomLineEs: '9.5¢ por tableta',
        bottomLineZh: '每片 9.5¢',
      },
      {
        icon: 'Pill',
        name: 'Store-brand ibuprofen',
        nameEs: 'Ibuprofeno de marca de la tienda',
        nameZh: '店铺自有品牌布洛芬',
        shelfTag: 'Compare to BrandName',
        shelfTagEs: 'Compara con MarcaFamosa',
        shelfTagZh: '对比 BrandName',
        price: '$4.29',
        priceEs: '$4.29',
        priceZh: '$4.29',
        mathLines: [
          { label: 'Active ingredient', labelEs: 'Ingrediente activo', labelZh: '活性成分', value: 'ibuprofen 200 mg', valueEs: 'ibuprofeno 200 mg', valueZh: '布洛芬 200 mg' },
          { label: 'Per tablet', labelEs: 'Por tableta', labelZh: '每片', value: '4.3¢', valueEs: '4.3¢', valueZh: '4.3¢' },
          { label: 'Same FDA rules apply', labelEs: 'Aplican las mismas reglas de la FDA', labelZh: '适用同样的 FDA 规定', value: 'same dose, same effect', valueEs: 'misma dosis, mismo efecto', valueZh: '同样剂量，同样效果' },
        ],
        bottomLine: '4.3¢ per tablet',
        bottomLineEs: '4.3¢ por tableta',
        bottomLineZh: '每片 4.3¢',
      },
    ],
    betterIndex: 1,
    explanation:
      'Same active ingredient, same dose, same federal standards, less than half the price. For medicine and pantry staples, the store brand is usually the same product wearing a cheaper outfit.',
    explanationEs:
      'Mismo ingrediente activo, misma dosis, mismos estándares federales, menos de la mitad del precio. Para las medicinas y los productos básicos de la despensa, la marca de la tienda suele ser el mismo producto con un empaque más barato.',
    explanationZh:
      '同样的活性成分，同样的剂量，同样的联邦标准，价格却不到一半。对于药品和厨房常备品，店铺自有品牌通常就是同一款产品换了个更便宜的外包装。',
  },
  {
    id: 'bogo',
    title: 'BOGO brain teaser',
    titleEs: 'Acertijo del 2x1',
    titleZh: 'BOGO 脑筋急转弯',
    scenario: 'You want two $20 T-shirts. Two stores, two "deals", which discount is bigger?',
    scenarioEs: 'Quieres dos camisetas de $20. Dos tiendas, dos "ofertas". ¿cuál descuento es mayor?',
    scenarioZh: '你想买两件 $20 的 T 恤。两家店，两种"优惠"，哪个折扣更大？',
    offers: [
      {
        icon: 'Shirt',
        name: 'Store A: BOGO 50% off',
        nameEs: 'Tienda A: la segunda al 50%',
        nameZh: 'A 店：第二件半价',
        shelfTag: 'BUY ONE GET ONE 50% OFF!!!',
        shelfTagEs: '¡¡¡COMPRA UNA Y LLEVA LA SEGUNDA AL 50%!!!',
        shelfTagZh: '买一件，第二件立减 50%！！！',
        price: '2 shirts',
        priceEs: '2 camisetas',
        priceZh: '2 件 T 恤',
        mathLines: [
          { label: 'Shirt 1', labelEs: 'Camiseta 1', labelZh: '第 1 件', value: '$20.00', valueEs: '$20.00', valueZh: '$20.00' },
          { label: 'Shirt 2 (50% off)', labelEs: 'Camiseta 2 (50% de descuento)', labelZh: '第 2 件（打 5 折）', value: '$10.00', valueEs: '$10.00', valueZh: '$10.00' },
          { label: 'Total', labelEs: 'Total', labelZh: '合计', value: '$30.00', valueEs: '$30.00', valueZh: '$30.00' },
          { label: 'Real discount on the pair', labelEs: 'Descuento real sobre el par', labelZh: '两件合起来的真实折扣', value: '25% off', valueEs: '25% de descuento', valueZh: '省 25%' },
        ],
        bottomLine: '$30 total = only 25% off',
        bottomLineEs: '$30 en total = solo 25% de descuento',
        bottomLineZh: '合计 $30 = 只省了 25%',
      },
      {
        icon: 'Shirt',
        name: 'Store B: 30% off everything',
        nameEs: 'Tienda B: 30% de descuento en todo',
        nameZh: 'B 店：全场 7 折',
        shelfTag: '30% off storewide',
        shelfTagEs: '30% de descuento en toda la tienda',
        shelfTagZh: '全店 7 折',
        price: '2 shirts',
        priceEs: '2 camisetas',
        priceZh: '2 件 T 恤',
        mathLines: [
          { label: 'Shirt 1 (30% off)', labelEs: 'Camiseta 1 (30% de descuento)', labelZh: '第 1 件（打 7 折）', value: '$14.00', valueEs: '$14.00', valueZh: '$14.00' },
          { label: 'Shirt 2 (30% off)', labelEs: 'Camiseta 2 (30% de descuento)', labelZh: '第 2 件（打 7 折）', value: '$14.00', valueEs: '$14.00', valueZh: '$14.00' },
          { label: 'Total', labelEs: 'Total', labelZh: '合计', value: '$28.00', valueEs: '$28.00', valueZh: '$28.00' },
          { label: 'Real discount on the pair', labelEs: 'Descuento real sobre el par', labelZh: '两件合起来的真实折扣', value: '30% off', valueEs: '30% de descuento', valueZh: '省 30%' },
        ],
        bottomLine: '$28 total = a true 30% off',
        bottomLineEs: '$28 en total = un verdadero 30% de descuento',
        bottomLineZh: '合计 $28 = 实实在在省 30%',
      },
    ],
    betterIndex: 1,
    explanation:
      '"BOGO 50%" sounds like half off, but the discount only touches the second shirt, so the pair is just 25% off. A plain 30% beats it AND doesn\'t force you to buy two. Convert every deal to the total you\'ll pay.',
    explanationEs:
      '"La segunda al 50%" suena como mitad de precio, pero el descuento solo toca la segunda camiseta. Así que el par tiene solo 25% de descuento. Un simple 30% le gana Y no te obliga a comprar dos. Convierte cada oferta al total que vas a pagar.',
    explanationZh:
      '"第二件半价"听起来像打对折，但折扣只作用在第二件上，所以两件合起来只省了 25%。一个简简单单的 7 折就赢过它，而且还不逼你买两件。把每一种优惠都换算成你要付的总价。',
  },
  {
    id: 'subscription',
    title: 'Subscribe or buy?',
    titleEs: '¿Suscribirte o comprar?',
    titleZh: '订阅还是买断？',
    scenario:
      'You need photo-editing software for a 3-month class project. After that, you\'re done with it.',
    scenarioEs:
      'Necesitas un programa para editar fotos para un proyecto de clase de 3 meses. Después de eso, ya no lo usarás.',
    scenarioZh:
      '你为了一个 3 个月的课堂项目需要一款修图软件。之后就用不上了。',
    offers: [
      {
        icon: 'Disc3',
        name: 'Lifetime license',
        nameEs: 'Licencia de por vida',
        nameZh: '终身授权',
        shelfTag: 'BEST VALUE, pay once, own it FOREVER!',
        shelfTagEs: 'LA MEJOR OFERTA. ¡paga una vez y es tuyo PARA SIEMPRE!',
        shelfTagZh: '最超值，付一次，永久拥有！',
        price: '$60 one-time',
        priceEs: '$60 pago único',
        priceZh: '$60 一次性',
        mathLines: [
          { label: 'Cost for your 3-month project', labelEs: 'Costo para tu proyecto de 3 meses', labelZh: '你 3 个月项目的成本', value: '$60.00', valueEs: '$60.00', valueZh: '$60.00' },
          { label: 'Months 4+', labelEs: 'Del mes 4 en adelante', labelZh: '第 4 个月及以后', value: 'you own software you no longer use', valueEs: 'tienes un programa que ya no usas', valueZh: '你拥有一款再也不用的软件' },
        ],
        bottomLine: '$60 for 3 months of actual use',
        bottomLineEs: '$60 por 3 meses de uso real',
        bottomLineZh: '$60 换来 3 个月的实际使用',
      },
      {
        icon: 'Repeat',
        name: 'Monthly subscription',
        nameEs: 'Suscripción mensual',
        nameZh: '按月订阅',
        shelfTag: 'Just $9.99/month, cancel anytime',
        shelfTagEs: 'Solo $9.99/mes, cancela cuando quieras',
        shelfTagZh: '每月只要 $9.99，随时取消',
        price: '$9.99/mo',
        priceEs: '$9.99/mes',
        priceZh: '$9.99/月',
        mathLines: [
          { label: '3 months × $9.99', labelEs: '3 meses × $9.99', labelZh: '3 个月 × $9.99', value: '$29.97', valueEs: '$29.97', valueZh: '$29.97' },
          { label: 'Then CANCEL (set a reminder!)', labelEs: 'Luego CANCELA (¡pon un recordatorio!)', labelZh: '然后取消（设个提醒！）', value: '$0 after', valueEs: '$0 después', valueZh: '之后 $0' },
          { label: 'If you forget for a year', labelEs: 'Si se te olvida por un año', labelZh: '如果忘了一整年', value: '$119.88, worse than lifetime', valueEs: '$119.88, peor que la de por vida', valueZh: '$119.88，比终身版还亏' },
        ],
        bottomLine: '$29.97, if you actually cancel',
        bottomLineEs: '$29.97, si de verdad cancelas',
        bottomLineZh: '$29.97，前提是你真的会取消',
      },
    ],
    betterIndex: 1,
    explanation:
      '"Forever" is only valuable if you\'ll use it forever. For 3 months of real use, $29.97 beats $60, but subscriptions bank on you forgetting: by month 7 the sub passes $60 and never stops. Match the deal to YOUR timeline, and set the cancel reminder the day you subscribe.',
    explanationEs:
      '"Para siempre" solo vale la pena si lo vas a usar para siempre. Para 3 meses de uso real, $29.97 le gana a $60, pero las suscripciones apuestan a que se te olvide: para el mes 7 la suscripción supera los $60 y nunca para. Ajusta la oferta a TU plazo, y pon el recordatorio para cancelar el mismo día que te suscribas.',
    explanationZh:
      '"永久"只有在你真的会永久使用时才值钱。对于 3 个月的实际使用，$29.97 胜过 $60，但订阅赌的就是你会忘：到第 7 个月，订阅费就超过 $60，而且永远停不下来。把优惠对准你自己的时间线，并在订阅当天就设好取消提醒。',
  },
]

// ---------- Scoring ----------

function tierFor(score: number, es: boolean, zh: boolean): { title: string; icon: string } {
  if (score >= 100) return { title: zh ? '单价忍者' : es ? 'Ninja del Precio por Unidad' : 'Unit-Price Ninja', icon: 'Swords' }
  if (score >= 67) return { title: zh ? '精明买手' : es ? 'Comprador Astuto' : 'Savvy Shopper', icon: 'ShoppingCart' }
  if (score >= 50) return { title: zh ? '标签阅读者' : es ? 'Lector de Etiquetas' : 'Label Reader', icon: 'Tag' }
  return { title: zh ? '营销的最佳损友' : es ? 'El Mejor Amigo del Marketing' : "Marketing's Best Friend", icon: 'Megaphone' }
}

// ---------- Component ----------

export default function SmartShopper({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [roundIndex, setRoundIndex] = useState(0)
  const [picked, setPicked] = useState<0 | 1 | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const studentRef = useRef(student)
  studentRef.current = student
  useEffect(() => {
    void saveProgress(studentRef.current, SLUG, { status: 'started' })
  }, [])

  const round = ROUNDS[roundIndex]
  const score = Math.round((correctCount / ROUNDS.length) * 100)
  const tier = tierFor(score, es, zh)
  const TierIcon = ITEM_ICONS[tier.icon]

  function pick(i: 0 | 1) {
    if (picked !== null) return
    setPicked(i)
    if (i === round.betterIndex) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (roundIndex + 1 < ROUNDS.length) {
      setRoundIndex((r) => r + 1)
      setPicked(null)
      window.scrollTo({ top: 0 })
    } else {
      const finalCorrect = correctCount
      setFinished(true)
      window.scrollTo({ top: 0 })
      void saveProgress(studentRef.current, SLUG, {
        status: 'completed',
        score: Math.round((finalCorrect / ROUNDS.length) * 100),
        data: { correct: finalCorrect, total: ROUNDS.length },
      })
      onComplete?.(Math.round((finalCorrect / ROUNDS.length) * 100))
    }
  }

  function reset() {
    setRoundIndex(0)
    setPicked(null)
    setCorrectCount(0)
    setFinished(false)
    window.scrollTo({ top: 0 })
  }

  // ---------- Results view ----------
  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-2">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '结账完成。来算算你的捡漏雷达有多准。' : es ? 'Compra terminada. Sumemos tu radar de ofertas.' : "Checkout complete. Let's total up your deal radar."}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            <ShoppingCart className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
            {zh ? (
              <>聪明<em>购物者</em></>
            ) : es ? (
              <>Comprador <em>Inteligente</em></>
            ) : (
              <>Smart <em>Shopper</em></>
            )}{' '}
            <Scale className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
          </h1>
        </header>

        <div className="card animate-pop-in mt-4 space-y-2 text-center" role="status">
          <TierIcon className="mx-auto h-14 w-14 text-bff-600" aria-hidden="true" />
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            {zh
              ? `你在 ${ROUNDS.length} 轮中的 ${correctCount} 轮找出了更划算的选择。`
              : es
              ? `Detectaste la mejor oferta en ${correctCount} de ${ROUNDS.length} rondas.`
              : `You spotted the better deal in ${correctCount} of ${ROUNDS.length} rounds.`}
          </p>
        </div>

        <div className="card animate-slide-up mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p className="font-display font-bold text-slate-900">
            <Calculator className="mr-1 inline-block h-5 w-5 align-[-0.2em] text-bff-600" aria-hidden="true" />{zh ? '要点' : es ? 'La lección' : 'The takeaway'}
          </p>
          <p className="mt-1">
            {zh
              ? '做单价的计算，货架标签在做营销，不是做数学。用价格除以数量，比较最终总价（而不是"原价"），只买你真的会用完的大包装，并让订阅时长和你真正需要的时间对上。'
              : es
              ? 'Haz la matemática por unidad. La etiqueta hace marketing, no matemáticas. Divide el precio entre la cantidad, compara los totales finales (no los precios "antes"), compra al por mayor solo lo que de verdad usarás, y ajusta las suscripciones al tiempo que realmente las necesitarás.'
              : 'Do the per-unit math. The shelf tag is doing marketing, not math. Divide price by amount, compare final totals (not "was" prices), only buy bulk you\'ll actually use, and match subscriptions to how long you\'ll really need them.'}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {zh ? '再逛一次' : es ? 'Comprar de nuevo' : 'Shop again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Round view ----------
  const revealed = picked !== null
  const pickedRight = picked === round.betterIndex

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-2">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh
            ? `第 ${roundIndex + 1} 轮，共 ${ROUNDS.length} 轮 · 目前得分：答对 ${correctCount} 题`
            : es
            ? `Ronda ${roundIndex + 1} de ${ROUNDS.length} · Puntaje hasta ahora: ${correctCount} correcta${correctCount === 1 ? '' : 's'}`
            : `Round ${roundIndex + 1} of ${ROUNDS.length} · Score so far: ${correctCount} right`}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          <ShoppingCart className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
          {zh ? (
            <>聪明<em>购物者</em></>
          ) : es ? (
            <>Comprador <em>Inteligente</em></>
          ) : (
            <>Smart <em>Shopper</em></>
          )}{' '}
          <Scale className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
        </h1>
      </header>

      {roundIndex === 0 && !revealed && (
        <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p>
            {zh
              ? '两款产品，一个更划算的选择，而货架标签正想糊弄你。选出更聪明的那笔买卖，然后我们一起来算真实的账。'
              : es
              ? 'Dos productos, una mejor oferta, y las etiquetas están tratando de engañarte. Elige la compra más inteligente, y luego haremos la matemática real juntos.'
              : "Two products, one better deal, and the shelf tags are trying to fool you. Pick the smarter buy, then we'll do the real math together."}
          </p>
        </div>
      )}

      <section className="mt-4">
        <h2 className="font-display text-lg font-bold text-slate-900">{zh ? round.titleZh : es ? round.titleEs : round.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{zh ? round.scenarioZh : es ? round.scenarioEs : round.scenario}</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {round.offers.map((offer, i) => {
            const isPicked = picked === i
            const isBetter = i === round.betterIndex
            const OfferIcon = ITEM_ICONS[offer.icon]
            return (
              <button
                key={offer.name}
                type="button"
                aria-pressed={isPicked}
                disabled={revealed}
                onClick={() => pick(i as 0 | 1)}
                className={`rounded-xl border-2 p-4 text-left transition active:scale-[0.98] disabled:cursor-default disabled:active:scale-100 ${
                  revealed
                    ? isBetter
                      ? 'border-green-600 bg-green-50'
                      : isPicked
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white opacity-80'
                    : isPicked
                      ? 'border-bff-500 bg-bff-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-bff-300'
                }`}
              >
                <OfferIcon className="h-8 w-8 text-bff-600" aria-hidden="true" />
                <p className="mt-1 text-sm font-semibold text-slate-800">{zh ? offer.nameZh : es ? offer.nameEs : offer.name}</p>
                <p className="mt-1 inline-block rounded bg-gold-400/30 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-800">
                  {zh ? offer.shelfTagZh : es ? offer.shelfTagEs : offer.shelfTag}
                </p>
                <p className="mt-2 font-display text-xl font-bold text-bff-700">{zh ? offer.priceZh : es ? offer.priceEs : offer.price}</p>
                {revealed && (
                  <div className="animate-pop-in mt-3 rounded-lg bg-white/70 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {zh ? '真实的账' : es ? 'La matemática real' : 'The real math'}
                    </p>
                    <dl className="mt-1 space-y-1 text-xs text-slate-700">
                      {offer.mathLines.map((line) => (
                        <div key={line.label} className="flex justify-between gap-2">
                          <dt>{zh ? line.labelZh : es ? line.labelEs : line.label}</dt>
                          <dd className="text-right font-semibold">{zh ? line.valueZh : es ? line.valueEs : line.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p
                      className={`mt-2 border-t border-slate-200 pt-2 text-sm font-bold ${
                        isBetter ? 'text-green-700' : 'text-red-600'
                      }`}
                    >
                      {isBetter ? (
                        <>
                          <Check className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" /> {zh ? offer.bottomLineZh : es ? offer.bottomLineEs : offer.bottomLine}
                        </>
                      ) : (
                        zh ? offer.bottomLineZh : es ? offer.bottomLineEs : offer.bottomLine
                      )}
                    </p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <div role="status" aria-live="polite">
        {revealed && (
          <div className="card animate-slide-up mt-4 p-4">
            <p
              className={`font-display text-lg font-bold ${pickedRight ? 'text-green-700' : 'text-red-600'}`}
            >
              {pickedRight ? (
                <>
                  <PartyPopper className="mr-1 inline-block h-5 w-5 align-[-0.2em]" aria-hidden="true" />{zh ? '答对了！' : es ? '¡Lo lograste!' : 'Nailed it!'}
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 inline-block h-5 w-5 align-[-0.2em]" aria-hidden="true" />{zh ? '这次被标签给套路了。' : es ? 'La etiqueta te ganó esta vez.' : 'The tag got you this time.'}
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-slate-700">{zh ? round.explanationZh : es ? round.explanationEs : round.explanation}</p>
            <div className="mt-4 text-center">
              <button className="btn-primary w-full sm:w-auto" onClick={next}>
                {roundIndex + 1 < ROUNDS.length ? (zh ? '下一轮' : es ? 'Siguiente ronda' : 'Next round') : (zh ? '查看我的结果' : es ? 'Ver mis resultados' : 'See my results')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
