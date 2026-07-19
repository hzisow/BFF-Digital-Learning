import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'entrepreneurship',
  week: 5,
  day: 4,
  title: 'Entrepreneurship & Side Hustles',
  emoji: '🚀',
  description:
    'Turn a lawn mower, a laptop, or a skill into your first real business — learn to spot problems worth solving, price like a pro, and keep the profit machine growing.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'You Do Not Need Permission to Start',
      body:
        "Here's something wild: you don't need a degree, an office, or anyone's permission to start a business. Mowing lawns, tutoring math, designing logos, reselling sneakers — teens run real businesses every single day. Entrepreneurship is just solving a problem for someone and getting paid for it. Today you'll learn how to find that problem, price your work, keep more of what you earn, and grow it — starting this weekend if you want. 🚀",
    },
    {
      type: 'content',
      heading: 'Spot a Problem Worth Solving',
      body:
        "Every business starts with someone's annoyance. Busy neighbors with shaggy lawns. Sixth graders drowning in pre-algebra. A local bakery with a logo from 1997. Great entrepreneurs are problem detectives: they notice what people complain about, what takes too much time, or what nobody wants to do. The test of a problem worth solving is simple — is the pain annoying enough that someone will happily PAY to make it go away?",
      bullets: [
        'Listen for complaints: every gripe is a business idea in disguise',
        "Look at what you're already good at — skills people ask you for help with",
        'Best starter ideas are things adults are too busy to do: yard work, tech help, pet care, tutoring',
        'If nobody would pay to fix it, it is a hobby, not a business — and hobbies are fine too!',
      ],
    },
    {
      type: 'content',
      heading: 'The Only Formula You Cannot Skip',
      body:
        "Every business on Earth — from a lemonade stand to Apple — runs on one equation: revenue - costs = profit. Revenue is all the money customers pay you. Costs are what you spend to deliver: gas, supplies, software, ad flyers. Profit is what's truly yours at the end. Beginners brag about revenue; real entrepreneurs obsess over profit. Earning $500 means nothing if it cost you $480 to do it.",
      bullets: [
        'Revenue: total money coming in from customers',
        'Costs: everything you spend to run the business (supplies, gas, fees, equipment)',
        'Profit = revenue - costs — the only number that actually goes in your pocket',
        'Track every cost, even small ones — they quietly eat profit',
      ],
    },
    {
      type: 'terms',
      heading: 'Founder Vocabulary',
      terms: [
        {
          term: 'Revenue',
          definition:
            'The total money your business brings in from customers before any expenses are subtracted.',
        },
        {
          term: 'Costs',
          definition:
            'The money you spend to run the business — supplies, gas, equipment, fees, and materials. Also called expenses.',
        },
        {
          term: 'Profit',
          definition:
            'Revenue minus costs — the money you actually keep. The true scoreboard of any business.',
        },
        {
          term: 'Market research',
          definition:
            'Finding out what customers want and what competitors charge BEFORE you launch — by asking, observing, and comparing.',
        },
        {
          term: 'MVP (minimum viable product)',
          definition:
            'The simplest version of your idea that you can offer to real customers, so you learn fast without betting big.',
        },
        {
          term: 'Form 1099',
          definition:
            'A tax form a client may send showing how much they paid you as an independent worker — a signal that self-employment income gets reported to the IRS.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Sam sells custom phone grips. This month he collected $300 from customers and spent $110 on materials and shipping. What is his profit?',
        options: [
          '$300 — everything customers paid him',
          '$110 — the amount he invested',
          '$190 — revenue minus costs',
          '$410 — revenue plus costs',
        ],
        answerIndex: 2,
        explanation:
          'That is the formula in action: $300 revenue - $110 costs = $190 profit. The $300 looks impressive, but only the $190 is actually his. Entrepreneurs who confuse revenue with profit run out of money fast.',
      },
    },
    {
      type: 'example',
      heading: "Example: Darius's Lawn Empire, Week One",
      body:
        'Darius mows lawns in his neighborhood for $40 each. In his first week he books 6 lawns: revenue = $240. His costs: $15 of gas, $10 for trimmer line and oil, and $6 for flyers = $31 total. Profit: $240 - $31 = $209 for roughly 9 hours of work — about $23 per hour, more than double what his friends make at the mall. Even better: the flyers were a one-time cost, so next week his profit margin grows without working a single extra hour. 🌱',
    },
    {
      type: 'content',
      heading: 'Pricing: The Goldilocks Zone',
      body:
        "Pricing feels scary, but it's just math plus confidence. Price too low and you work hard for crumbs — $10 lawns can actually LOSE money after gas. Price too high and customers pass. Find the Goldilocks zone: check what others charge locally, count your costs per job, and make sure your time earns a rate you respect. And remember — being a reliable, friendly teen who shows up on time IS a premium feature. People happily pay more for someone they trust.",
      bullets: [
        'Start with what competitors charge in YOUR area — that is your price range',
        'Add up your cost per job first; your price must clear it with room to spare',
        'Aim for a fair hourly rate after costs: if a $40 lawn takes 90 minutes plus $5 of gas, you earn about $23/hour',
        'Raise prices as your skills and reviews grow — do not stay at rookie rates forever',
      ],
    },
    {
      type: 'content',
      heading: 'Market Research Without a Lab Coat',
      body:
        "Big companies spend millions on market research; you can do a scrappy version for free in a weekend. The goal is simple: prove people actually want your thing BEFORE you spend real money. Ask 10 potential customers what they currently do about the problem and what they pay. Check local Facebook groups, Nextdoor, or flyers to see who else offers it and at what price. Then run the smallest possible test — one lawn, one tutoring session, one logo — and listen hard to the feedback.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Priya wants to launch a cookie business. What is the SMARTEST first step?',
        options: [
          'Spend $600 on a professional mixer and 50 pounds of flour',
          'Bake two test batches, sell them at a bake sale, and ask buyers what they would pay regularly',
          'Wait until she has a perfect logo and website',
          'Price the cookies at $1 each because cheapest always wins',
        ],
        answerIndex: 1,
        explanation:
          'That is MVP thinking! A small test with real customers teaches her what people want and will pay — before big money is at risk. The fancy mixer, the perfect website, and the race-to-the-bottom pricing can all wait until real demand is proven.',
      },
    },
    {
      type: 'content',
      heading: 'Reinvestment: Feed the Machine',
      body:
        "Here's the habit that separates hustlers from empire-builders: reinvestment. Instead of spending every dollar of profit, set aside a slice — say 25-30% — to make the business better. Darius banks $60 of his $209 weekly profit; in a month he has $240, enough for a used leaf blower that lets him charge $15 more per yard for cleanup add-ons. Profit buys tools, tools raise revenue, revenue grows profit. That loop is how small hustles snowball. ☃️",
      bullets: [
        'Set a fixed reinvestment percentage of every profit dollar (25-30% is a great start)',
        'Spend it on things that increase revenue: better tools, supplies in bulk, small ads',
        'Keep reinvestment money in a separate place so it does not get spent on snacks',
        'The rest of profit can be yours to save and spend — you earned it',
      ],
    },
    {
      type: 'content',
      heading: 'Taxes for the Self-Employed (Yes, Even You)',
      body:
        "When you work for yourself, no employer withholds taxes — YOU are the payroll department. If your net self-employment profit hits $400 or more in a year, the IRS generally expects you to file and pay self-employment tax, which is about 15.3% covering both halves of Social Security and Medicare (as an employee, your boss paid half — now you're both boss and employee). Clients who pay you enough may send you a Form 1099 reporting it, but the income counts even without a form. The lifesaver habit: keep records of every payment and every expense, because costs reduce the profit you're taxed on.",
      bullets: [
        'Net self-employment profit of $400+ in a year usually means you must file',
        'Self-employment tax is about 15.3% — both halves of Social Security and Medicare',
        'Save receipts: legitimate business costs lower your taxable profit',
        'A simple habit: set aside 20-25% of profit in a separate account for taxes, then relax',
      ],
    },
    {
      type: 'content',
      heading: 'MVP Thinking: Start Embarrassingly Small',
      body:
        "The number one killer of teen businesses isn't failure — it's never launching, because the plan got too big. MVP thinking flips that: launch the minimum viable product, the smallest real version of your idea, this week. One customer teaches you more than one month of planning. Amazon started by selling only books; Nike began with shoes sold from a car trunk. Your tutoring business can start with one student at your kitchen table. Start small, learn fast, improve every round — that is not a shortcut, it is literally how the giants did it. 🌟",
    },
  ],
  quiz: [
    {
      question: 'What is the core formula every business runs on?',
      options: [
        'Revenue + costs = profit',
        'Revenue - costs = profit',
        'Price x customers = profit',
        'Profit - taxes = revenue',
      ],
      answerIndex: 1,
      explanation:
        'Revenue (money in) minus costs (money spent to deliver) equals profit (money you keep). Revenue is the flashy number, but profit is the real scoreboard.',
    },
    {
      question:
        'Mia charges $25 per tutoring session and did 8 sessions this month, spending $40 on workbooks and bus fare. What is her profit?',
      options: ['$200', '$160', '$240', '$40'],
      answerIndex: 1,
      explanation:
        'Revenue is 8 x $25 = $200, and costs are $40, so profit = $200 - $40 = $160. Tracking those small costs matters — ignoring them would overstate her earnings by 25%.',
    },
    {
      question: 'What makes a problem "worth solving" as a business idea?',
      options: [
        'It sounds impressive on social media',
        'It requires expensive equipment to start',
        'People are annoyed enough by it that they will pay to make it go away',
        'No one has ever complained about it',
      ],
      answerIndex: 2,
      explanation:
        'A business exists when someone will pay for a solution. Complaints, chores nobody wants, and time-sucks are gold mines; if nobody would pay to fix it, it is a hobby rather than a business.',
    },
    {
      question:
        'Why should a self-employed teen keep records of every payment and expense?',
      options: [
        'Records are only needed by big corporations',
        'To make the business look bigger to friends',
        'So they can charge customers twice',
        'Because self-employment income of $400+ profit is generally taxable, and documented expenses reduce taxable profit',
      ],
      answerIndex: 3,
      explanation:
        'With no employer withholding taxes for you, you are your own payroll department. Once net profit hits $400 in a year, self-employment tax (about 15.3% for Social Security and Medicare) generally applies — and good expense records legally shrink the profit you are taxed on.',
    },
    {
      question: 'What does it mean to reinvest in your business?',
      options: [
        'Using part of your profit to buy things that help the business grow, like better tools',
        'Spending all profit on personal rewards',
        'Asking customers to invest in you',
        'Putting all revenue into a checking account and forgetting it',
      ],
      answerIndex: 0,
      explanation:
        'Reinvestment means routing a slice of profit — say 25-30% — back into the business: equipment, supplies, small ads. Better tools raise revenue, which raises profit, which funds more growth. That loop is how side hustles snowball.',
    },
    {
      question: 'Which launch plan best shows MVP thinking?',
      options: [
        'Spend six months building a website before serving anyone',
        'Borrow $2,000 for professional equipment on day one',
        'Offer the simplest real version of the service to a few customers this week and improve based on feedback',
        'Wait until the idea is perfect and competition disappears',
      ],
      answerIndex: 2,
      explanation:
        'The minimum viable product is the smallest real version customers can actually buy. Launching small and early gets you real feedback with low risk — one paying customer teaches more than months of planning.',
    },
  ],
}

export default lesson
