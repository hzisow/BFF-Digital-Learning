import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import type { LiveGameProps } from '../live/types'

const SLUG = 'smart-shopper'

// ---------- Rounds ----------

interface Offer {
  emoji: string
  name: string
  shelfTag: string // the flashy marketing line on the shelf
  price: string
  mathLines: { label: string; value: string }[]
  bottomLine: string
}

interface Round {
  id: string
  title: string
  scenario: string
  offers: [Offer, Offer]
  betterIndex: 0 | 1
  explanation: string
}

const ROUNDS: Round[] = [
  {
    id: 'unit-price',
    title: 'The soda aisle showdown',
    scenario: 'You want soda for movie night. Which is actually cheaper per ounce?',
    offers: [
      {
        emoji: '🥤',
        name: '2-liter bottle',
        shelfTag: 'Everyday price',
        price: '$2.49',
        mathLines: [
          { label: 'Total soda', value: '2 L = 67.6 oz' },
          { label: '$2.49 ÷ 67.6 oz', value: '3.7¢ per oz' },
        ],
        bottomLine: '3.7¢ per oz',
      },
      {
        emoji: '🥫',
        name: 'Six 12-oz cans',
        shelfTag: 'MEGA VALUE 6-PACK!',
        price: '$3.99',
        mathLines: [
          { label: 'Total soda', value: '6 × 12 oz = 72 oz' },
          { label: '$3.99 ÷ 72 oz', value: '5.5¢ per oz' },
        ],
        bottomLine: '5.5¢ per oz',
      },
    ],
    betterIndex: 0,
    explanation:
      'The "MEGA VALUE" 6-pack costs about 50% more per ounce (5.5¢ vs 3.7¢). The shelf tag shouts, but the unit price whispers the truth — always divide price by amount.',
  },
  {
    id: 'bulk',
    title: 'The bulk trap',
    scenario:
      'You eat about 1 lb of salad a week, and spring mix goes bad in about a week. Which do you buy?',
    offers: [
      {
        emoji: '🛢️',
        name: '5-lb warehouse tub of spring mix',
        shelfTag: 'WAREHOUSE DEAL — only $1.80/lb!',
        price: '$8.99',
        mathLines: [
          { label: 'Price per lb on the tag', value: '$1.80' },
          { label: 'You eat before it spoils', value: '~1 lb' },
          { label: 'Wasted', value: '~4 lbs in the trash' },
          { label: 'Real cost of the 1 lb you ate', value: '$8.99' },
        ],
        bottomLine: '$8.99 for what you actually used',
      },
      {
        emoji: '🥗',
        name: '1-lb box of spring mix',
        shelfTag: 'Regular size',
        price: '$3.49',
        mathLines: [
          { label: 'Price per lb', value: '$3.49' },
          { label: 'You eat before it spoils', value: 'all of it' },
          { label: 'Wasted', value: '$0' },
        ],
        bottomLine: '$3.49 for what you actually used',
      },
    ],
    betterIndex: 1,
    explanation:
      'Bulk only wins if you USE it all. Salad you throw away is money you threw away: the "cheap" tub really cost $8.99 for one usable pound — more than double the small box. Bulk is great for rice; terrible for lettuce.',
  },
  {
    id: 'fake-sale',
    title: 'The "sale" that isn\'t',
    scenario: 'Same exact headphones at two stores. Which price is actually lower?',
    offers: [
      {
        emoji: '🎧',
        name: 'Store A headphones',
        shelfTag: 'Was $80 — NOW $60! SAVE $20!',
        price: '$60.00',
        mathLines: [
          { label: '"Was" price', value: 'just an anchor number' },
          { label: 'What leaves your wallet', value: '$60.00' },
        ],
        bottomLine: 'You pay $60',
      },
      {
        emoji: '🎧',
        name: 'Store B headphones',
        shelfTag: 'Everyday price',
        price: '$55.00',
        mathLines: [
          { label: 'No sale, no drama', value: '—' },
          { label: 'What leaves your wallet', value: '$55.00' },
        ],
        bottomLine: 'You pay $55',
      },
    ],
    betterIndex: 1,
    explanation:
      'A "was" price is an anchor designed to make $60 feel like a win. Your wallet only feels the FINAL price: $55 beats $60, no matter how big the SAVE sticker is.',
  },
  {
    id: 'store-brand',
    title: 'Name brand vs. store brand',
    scenario:
      'Ibuprofen, 200 mg, 100 tablets. Check the "active ingredient" line — it is identical on both boxes.',
    offers: [
      {
        emoji: '💊',
        name: 'BrandName ibuprofen',
        shelfTag: 'The brand you trust™',
        price: '$9.49',
        mathLines: [
          { label: 'Active ingredient', value: 'ibuprofen 200 mg' },
          { label: 'Per tablet', value: '9.5¢' },
          { label: 'What the extra $5 buys', value: 'ad budget + fancy box' },
        ],
        bottomLine: '9.5¢ per tablet',
      },
      {
        emoji: '💊',
        name: 'Store-brand ibuprofen',
        shelfTag: 'Compare to BrandName',
        price: '$4.29',
        mathLines: [
          { label: 'Active ingredient', value: 'ibuprofen 200 mg' },
          { label: 'Per tablet', value: '4.3¢' },
          { label: 'Same FDA rules apply', value: 'same dose, same effect' },
        ],
        bottomLine: '4.3¢ per tablet',
      },
    ],
    betterIndex: 1,
    explanation:
      'Same active ingredient, same dose, same federal standards — less than half the price. For medicine and pantry staples, the store brand is usually the same product wearing a cheaper outfit.',
  },
  {
    id: 'bogo',
    title: 'BOGO brain teaser',
    scenario: 'You want two $20 T-shirts. Two stores, two "deals" — which discount is bigger?',
    offers: [
      {
        emoji: '👕',
        name: 'Store A: BOGO 50% off',
        shelfTag: 'BUY ONE GET ONE 50% OFF!!!',
        price: '2 shirts',
        mathLines: [
          { label: 'Shirt 1', value: '$20.00' },
          { label: 'Shirt 2 (50% off)', value: '$10.00' },
          { label: 'Total', value: '$30.00' },
          { label: 'Real discount on the pair', value: '25% off' },
        ],
        bottomLine: '$30 total = only 25% off',
      },
      {
        emoji: '👕',
        name: 'Store B: 30% off everything',
        shelfTag: '30% off storewide',
        price: '2 shirts',
        mathLines: [
          { label: 'Shirt 1 (30% off)', value: '$14.00' },
          { label: 'Shirt 2 (30% off)', value: '$14.00' },
          { label: 'Total', value: '$28.00' },
          { label: 'Real discount on the pair', value: '30% off' },
        ],
        bottomLine: '$28 total = a true 30% off',
      },
    ],
    betterIndex: 1,
    explanation:
      '"BOGO 50%" sounds like half off, but the discount only touches the second shirt — so the pair is just 25% off. A plain 30% beats it AND doesn\'t force you to buy two. Convert every deal to the total you\'ll pay.',
  },
  {
    id: 'subscription',
    title: 'Subscribe or buy?',
    scenario:
      'You need photo-editing software for a 3-month class project. After that, you\'re done with it.',
    offers: [
      {
        emoji: '💿',
        name: 'Lifetime license',
        shelfTag: 'BEST VALUE — pay once, own it FOREVER!',
        price: '$60 one-time',
        mathLines: [
          { label: 'Cost for your 3-month project', value: '$60.00' },
          { label: 'Months 4+', value: 'you own software you no longer use' },
        ],
        bottomLine: '$60 for 3 months of actual use',
      },
      {
        emoji: '🔁',
        name: 'Monthly subscription',
        shelfTag: 'Just $9.99/month — cancel anytime',
        price: '$9.99/mo',
        mathLines: [
          { label: '3 months × $9.99', value: '$29.97' },
          { label: 'Then CANCEL (set a reminder!)', value: '$0 after' },
          { label: 'If you forget for a year', value: '$119.88 — worse than lifetime' },
        ],
        bottomLine: '$29.97 — if you actually cancel',
      },
    ],
    betterIndex: 1,
    explanation:
      '"Forever" is only valuable if you\'ll use it forever. For 3 months of real use, $29.97 beats $60 — but subscriptions bank on you forgetting: by month 7 the sub passes $60 and never stops. Match the deal to YOUR timeline, and set the cancel reminder the day you subscribe.',
  },
]

// ---------- Scoring ----------

function tierFor(score: number): { title: string; emoji: string } {
  if (score >= 100) return { title: 'Unit-Price Ninja', emoji: '🥷' }
  if (score >= 67) return { title: 'Savvy Shopper', emoji: '🛒' }
  if (score >= 50) return { title: 'Label Reader', emoji: '🏷️' }
  return { title: "Marketing's Best Friend", emoji: '🎈' }
}

// ---------- Component ----------

export default function SmartShopper({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
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
  const tier = tierFor(score)

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
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🛒</span> Smart Shopper{' '}
          <span aria-hidden="true">⚖️</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Checkout complete. Let's total up your deal radar.</p>

        <div className="card animate-pop-in mt-4 space-y-2 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{tier.emoji}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            You spotted the better deal in {correctCount} of {ROUNDS.length} rounds.
          </p>
        </div>

        <div className="card animate-slide-up mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">🧮</span> The takeaway
          </p>
          <p className="mt-1">
            Do the per-unit math — the shelf tag is doing marketing, not math. Divide price by
            amount, compare final totals (not "was" prices), only buy bulk you'll actually use, and
            match subscriptions to how long you'll really need them.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            Shop again
          </button>
          <Link to="/activities" className="btn-primary">
            More activities
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
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">🛒</span> Smart Shopper{' '}
        <span aria-hidden="true">⚖️</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Round {roundIndex + 1} of {ROUNDS.length} · Score so far: {correctCount} right
      </p>

      {roundIndex === 0 && !revealed && (
        <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p>
            Two products, one better deal — and the shelf tags are trying to fool you. Pick the
            smarter buy, then we'll do the real math together.
          </p>
        </div>
      )}

      <section className="mt-4">
        <h2 className="font-display text-lg font-bold text-slate-900">{round.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{round.scenario}</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {round.offers.map((offer, i) => {
            const isPicked = picked === i
            const isBetter = i === round.betterIndex
            return (
              <button
                key={offer.name}
                type="button"
                aria-pressed={isPicked}
                disabled={revealed}
                onClick={() => pick(i as 0 | 1)}
                className={`rounded-xl border-2 p-4 text-left transition disabled:cursor-default ${
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
                <p className="text-3xl" aria-hidden="true">{offer.emoji}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{offer.name}</p>
                <p className="mt-1 inline-block rounded bg-gold-400/30 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-800">
                  {offer.shelfTag}
                </p>
                <p className="mt-2 font-display text-xl font-bold text-bff-700">{offer.price}</p>
                {revealed && (
                  <div className="animate-pop-in mt-3 rounded-lg bg-white/70 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      The real math
                    </p>
                    <dl className="mt-1 space-y-1 text-xs text-slate-700">
                      {offer.mathLines.map((line) => (
                        <div key={line.label} className="flex justify-between gap-2">
                          <dt>{line.label}</dt>
                          <dd className="text-right font-semibold">{line.value}</dd>
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
                          <span aria-hidden="true">✓</span> {offer.bottomLine}
                        </>
                      ) : (
                        offer.bottomLine
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
                  <span aria-hidden="true">🎉</span> Nailed it!
                </>
              ) : (
                <>
                  <span aria-hidden="true">💸</span> The tag got you this time.
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-slate-700">{round.explanation}</p>
            <div className="mt-4 text-center">
              <button className="btn-primary w-full sm:w-auto" onClick={next}>
                {roundIndex + 1 < ROUNDS.length ? 'Next round' : 'See my results'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
