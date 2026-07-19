import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'crypto-and-scams',
  week: 5,
  day: 5,
  title: 'Crypto & Modern Money Traps',
  emoji: '🪙',
  description:
    'Get the no-hype truth about crypto, spot the tricks behind viral money schemes, and build the scam radar that protects your wallet for life.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'Welcome to the Wild West of Money',
      body:
        "Your feed is full of it: coins going 'to the moon,' influencers flashing rented Lamborghinis, betting apps promising easy parlays, and checkout buttons whispering 'only 4 easy payments!' Some of this is real technology, some is gambling in a costume, and some is straight-up scam. Today we're building your radar — so you can tell innovation from trap, and keep your money out of other people's pockets. 🛰️",
    },
    {
      type: 'content',
      heading: 'What Cryptocurrency Actually Is',
      body:
        "Strip away the hype and cryptocurrency is digital money that isn't issued by any government or bank. Instead of a bank keeping the records, transactions are tracked on a blockchain — a shared public ledger copied across thousands of computers, which makes the record very hard to fake. Bitcoin was the first; thousands of others followed. The tech is genuinely clever. But here's the catch: most crypto has no cash flow behind it — no rent, no profits, no interest. Its price is purely what the next person will pay, and that can change violently in a day.",
      bullets: [
        'Digital money tracked on a blockchain — a shared public record, not a bank ledger',
        'No government backing and, in the U.S., no FDIC insurance if an exchange fails or you get hacked',
        "Most coins' prices rest entirely on what the next buyer will pay",
        'Real technology AND real risk can be true at the same time',
      ],
    },
    {
      type: 'content',
      heading: 'Volatility vs. Saving: Not the Same Sport',
      body:
        "Volatility means how wildly a price swings. A savings account moves like a calm escalator: slow, boring, insured, always upward. Crypto moves like an untested rollercoaster — Bitcoin has dropped more than 50% in a few months multiple times, and smaller coins have gone to zero. That's why money you NEED — emergency fund, car savings, college money — never belongs in something that can lose half its value before homecoming. Saving and speculating are different sports with different rules.",
      bullets: [
        'Savings account: insured up to $250,000, grows slowly, never drops',
        'Crypto: can rise or crash 20% in a single day — and some coins never recover',
        'Money you need soon belongs in savings, full stop',
        'If someone calls crypto "just like a savings account," they are wrong or lying',
      ],
    },
    {
      type: 'terms',
      heading: 'Trap-Spotting Vocabulary',
      terms: [
        {
          term: 'Cryptocurrency',
          definition:
            'Digital money recorded on a blockchain instead of at a bank, not issued or backed by any government. Known for big price swings.',
        },
        {
          term: 'Volatility',
          definition:
            'How much and how fast a price swings up and down. High volatility means big possible gains AND big possible losses.',
        },
        {
          term: 'Pump-and-dump',
          definition:
            'A scheme where insiders hype an asset to pump up its price, then dump their own holdings on the fans who bought in — crashing the price.',
        },
        {
          term: 'House edge',
          definition:
            'The built-in mathematical advantage that guarantees casinos, betting apps, and loot boxes profit over time — meaning players, as a group, must lose.',
        },
        {
          term: 'FOMO',
          definition:
            'Fear of missing out — the anxious urge to jump in because everyone else seems to be winning. The #1 emotion scammers weaponize.',
        },
        {
          term: 'Buy now, pay later (BNPL)',
          definition:
            'Checkout plans that split a purchase into installments. They feel free, but stacked plans and late fees quietly turn into real debt.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Kayla has $800 saved for a car she needs to buy in 6 months. A friend says to put it all in a hot new coin. What is the biggest problem with that plan?',
        options: [
          'Crypto apps are too hard to download',
          'The coin could easily drop 50% before she needs the money — savings for near-term needs should not be gambled',
          'She would owe extra FICA taxes on it',
          'Nothing — coins always bounce back eventually',
        ],
        answerIndex: 1,
        explanation:
          "Exactly. Volatility is the dealbreaker: money she NEEDS on a deadline cannot ride something that can crash 20-50% in weeks — and no, coins do not always come back. Savings and speculation are different sports, and her car fund belongs in savings.",
      },
    },
    {
      type: 'content',
      heading: '"Get Rich Quick" Is Always a Red Flag',
      body:
        "Burn this into your brain: real wealth compounds slowly, so anyone promising fast, easy, guaranteed money is selling something — and it's usually you. 'Guaranteed 10x!' '. . . before it's too late!' 'Everyone is getting in!' These phrases are engineered pressure. And influencer shills are the modern version: that creator hyping a coin was often paid to promote it, or bought early hoping YOUR purchase pumps their price. When they sell — and they do — the fans hold the crash. If a stranger truly had a guaranteed money machine, they would not be sharing it on TikTok.",
      bullets: [
        "Words that should trigger your alarm: 'guaranteed,' 'can't lose,' 'act now,' 'secret method'",
        'Urgency is a weapon: real opportunities do not expire in 24 hours',
        'Ask who profits if you buy — with paid shills, the answer is them, not you',
        'If it sounds too good to be true, it is. Every time. No exceptions',
      ],
    },
    {
      type: 'example',
      heading: 'Example: The $200 Rocket That Crashed',
      body:
        "Devon, 16, sees a gaming influencer hyping 'MoonRocketCoin — 100x incoming, NOT financial advice 😉.' Comments are full of people posting gains. Devon puts in $200 of lawn-mowing money at $0.40 per coin. It jumps to $0.55 in two days — he's up 37% and feels like a genius! What Devon can't see: the influencer and insiders bought millions of coins at $0.02 and are selling into the hype. A week later the coin sits at $0.03, the influencer has deleted the video, and Devon's $200 is worth $15. That's a pump-and-dump — and versions of it have been run since long before crypto existed. 📉",
    },
    {
      type: 'content',
      heading: 'The House Always Wins: Betting & Loot Boxes',
      body:
        "Sports betting apps and video game loot boxes run on the same engine: the house edge. Every game is mathematically tilted so that, across all players, the company MUST come out ahead — that's how they afford those ads. Individual wins absolutely happen (that's the hook!), but the math grinds everyone down over time. Betting apps even celebrate your wins with confetti to keep you playing. Loot boxes are the same psychology in miniature: pay $5 for a chance at a rare skin, and the odds quietly guarantee the game company profits. An occasional win is the bait — the edge is the trap.",
      bullets: [
        'House edge means the odds are set so the company always profits over time',
        'A 5% edge sounds tiny, but bet $50 weekly and it averages out to losing about $130 per year — and streaks can be far worse',
        'Wins are engineered to feel amazing so you keep playing — confetti is not your friend',
        'Loot boxes are gambling mechanics aimed at players your age; many countries regulate them like casinos',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "An influencer posts: 'This coin is GUARANTEED to 50x by Friday — my followers are all in! Link in bio, don't miss out!!' What are the red flags?",
        options: [
          'None — followers posting gains is proof it works',
          'Only the emoji use',
          "The word 'coin' — everything else is normal marketing",
          "'Guaranteed' returns, extreme urgency, and hype from someone who profits if you buy — the full pump-and-dump starter pack",
        ],
        answerIndex: 3,
        explanation:
          "You spotted all three! Nothing in investing is guaranteed, urgency exists to stop you from thinking, and a promoter who benefits from your purchase is not advice — it is an ad. That post is the anatomy of a pump-and-dump.",
      },
    },
    {
      type: 'content',
      heading: 'FOMO: The Hack for Your Brain',
      body:
        "Why do smart people fall for obvious traps? FOMO — fear of missing out. Your brain is wired to copy the crowd and to fear losing a chance more than it fears losing money. Scammers know this, so they manufacture crowds (fake comments, bots posting gains) and deadlines ('window closes tonight!'). The defense is beautifully simple: slow down. Real opportunities survive a 48-hour think-it-over. Anything that punishes you for pausing to think was never an opportunity — it was an ambush. 🧠",
    },
    {
      type: 'example',
      heading: 'Example: The $60 Hoodie That Cost $95',
      body:
        "Lena, 17, wants a $60 hoodie. Checkout offers '4 easy payments of $15!' — feels basically free. Two weeks later she splits $80 of sneakers, then $48 of concert merch. Now three plans overlap: $47 is auto-drafting from her account every two weeks, more than half her part-time paycheck. When a payment bounces during a slow work week, she gets a $10 late fee, a $32 overdraft fee from her bank, and a warning on her account. Her 'easy payments' hoodie effectively cost $95 (that's 58% extra!) — and BNPL companies count on exactly this stacking. If you cannot afford it today, four slices of it are still unaffordable. 🧾",
    },
    {
      type: 'content',
      heading: 'The Golden Rule (Tattoo This on Your Brain)',
      body:
        "Here it is — the rule that would have saved every victim of every scheme in this lesson: never invest money you can't afford to lose, and never invest in anything you don't understand. Two parts, both mandatory. If losing the money would wreck your plans, it doesn't belong in anything risky. And if you can't explain how the thing makes money in two plain sentences, you're not investing — you're donating to someone who can. Curious about crypto someday? Fine: tiny amounts, fully-funded savings first, full understanding, zero borrowed money. Boring? Maybe. But boring is how people actually get rich.",
      bullets: [
        "Part 1: only risk money whose loss you could shrug off completely",
        "Part 2: if you can't explain how it makes money, you don't buy it",
        'Emergency fund and goal savings come first — always in insured accounts',
        'Slow, diversified, boring investing beats hype in the long run — every reliable study agrees',
      ],
    },
  ],
  quiz: [
    {
      question: 'What is a cryptocurrency, in plain language?',
      options: [
        'Digital money recorded on a blockchain, not issued or insured by any government or bank',
        'A savings account run by the government',
        'A type of stock that pays guaranteed dividends',
        'Arcade tokens that work online',
      ],
      answerIndex: 0,
      explanation:
        'Crypto is digital money tracked on a blockchain — a shared public ledger — instead of by a bank, with no government backing. The technology is real, but most coins have no cash flow behind them, so prices swing on pure supply and demand.',
    },
    {
      question: 'Why is crypto a bad place for your emergency fund or car savings?',
      options: [
        'Crypto accounts charge monthly maintenance fees',
        'It is too hard to sell crypto quickly',
        'Its high volatility means the value could drop 20-50% right before you need the money',
        'Emergency funds are not allowed to grow',
      ],
      answerIndex: 2,
      explanation:
        'Money you need on a deadline cannot survive big swings. Crypto has repeatedly lost half its value in months, while an insured savings account never drops. Saving and speculating are different jobs for different dollars.',
    },
    {
      question: 'In a pump-and-dump scheme, who ends up losing money?',
      options: [
        'The insiders who bought early',
        'The fans who bought during the hype, right before insiders sold',
        'The blockchain itself',
        'Nobody — prices always recover',
      ],
      answerIndex: 1,
      explanation:
        'Insiders buy cheap, manufacture hype to pump the price, then dump their coins on the fans buying in at the top. When the selling crashes the price, the late buyers hold the losses — that is the entire design of the scheme.',
    },
    {
      question: 'What does the "house edge" mean for sports betting apps and loot boxes?',
      options: [
        'Experienced players can flip the edge in their favor',
        'The company matches whatever you win',
        'The odds are fair because wins and losses balance out for everyone',
        'The odds are mathematically set so the company always profits over time, meaning players as a group must lose',
      ],
      answerIndex: 3,
      explanation:
        'The house edge is a built-in mathematical tilt: across all players and all bets, the company is guaranteed to come out ahead. Individual wins happen — they are the hook — but the longer you play, the more the math grinds you down.',
    },
    {
      question: 'How can buy-now-pay-later plans become a money trap?',
      options: [
        'They require a college degree to use',
        'Stacking several "small" payment plans adds up to real debt, and missed payments trigger late fees and overdrafts',
        'They only work on purchases over $500',
        'They cannot — splitting payments is always free money',
      ],
      answerIndex: 1,
      explanation:
        'Each plan feels tiny, but three or four overlapping ones can quietly claim most of a paycheck — and one bounced payment can snowball into late fees and overdraft charges. If you cannot afford it today, four slices of it are still unaffordable.',
    },
    {
      question: 'What is the golden rule for risky investments like crypto?',
      options: [
        'Invest early and often in whatever is trending',
        'Borrow money so your gains are bigger',
        'Never invest money you cannot afford to lose, and never in things you do not understand',
        'Only invest when an influencer you trust recommends it',
      ],
      answerIndex: 2,
      explanation:
        'Both halves are mandatory: risk only money whose loss would not wreck your plans, and only put it in things you can explain in plain words. Everything else in this lesson — FOMO, shills, house edges — is defeated by this one rule.',
    },
  ],
}

export default lesson
