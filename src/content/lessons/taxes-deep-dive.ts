import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'taxes-deep-dive',
  week: 5,
  day: 2,
  title: 'Taxes Deep-Dive',
  emoji: '🏛️',
  description:
    'Bust the biggest tax myths, decode how brackets really work, and find out exactly what all that withheld money builds — spoiler: raises are always worth taking.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'Taxes: The Subscription Fee for Society',
      body:
        "Nobody throws a party when taxes come up, but here's a reframe: taxes are like a group subscription that 330 million people split to run a country. The road to school, the firefighters down the street, the GPS satellites your phone uses — all tax-funded. Today we'll dig into why taxes exist, the different kinds you'll pay, and how tax brackets ACTUALLY work — including busting the most stubborn money myth in America. 🕵️",
    },
    {
      type: 'content',
      heading: 'What Do Taxes Actually Buy?',
      body:
        'Governments do not have their own money — they have OUR money, pooled together. Federal, state, and local governments each collect taxes and spend them on different things. When you see a deduction on your paystub, this is where it goes.',
      bullets: [
        'Federal: Social Security and Medicare, national defense, highways, scientific research, national parks',
        'State: public universities, state roads, police, health programs',
        'Local: public schools, libraries, parks, firefighters, trash pickup',
        'Fun one: public school spending often works out to more than $15,000 per student per year — your education is one of the biggest things taxes buy',
      ],
    },
    {
      type: 'content',
      heading: 'The Tax Family: Four Kinds You Will Meet',
      body:
        "Income tax is the famous one, but it has siblings you'll bump into constantly. Sales tax gets added at the register when you buy stuff — a $60 hoodie with 7% sales tax actually costs $64.20. Property tax is paid yearly by people who own homes and land, and it mostly funds local schools. Payroll taxes are the FICA deductions from your paycheck that fund Social Security and Medicare. And income tax is charged on the money you earn, at both the federal level and in most states.",
      bullets: [
        'Sales tax: paid when you buy things (rates vary by state and city)',
        'Property tax: paid by property owners, funds local schools and services',
        'Payroll tax (FICA): flat percentage from every paycheck for Social Security and Medicare',
        'Income tax: charged on earnings, and the federal version is progressive — higher incomes pay higher rates',
      ],
    },
    {
      type: 'terms',
      heading: 'Tax Talk: Key Terms',
      terms: [
        {
          term: 'Progressive tax',
          definition:
            'A tax where the rate increases as income increases — higher earners pay a larger percentage. The U.S. federal income tax is progressive.',
        },
        {
          term: 'Tax bracket',
          definition:
            'A range of income taxed at a specific rate. Your income fills up brackets in order, like water filling a stack of buckets.',
        },
        {
          term: 'Marginal tax rate',
          definition:
            'The rate you pay on your NEXT dollar of income — only the dollars inside a bracket get taxed at that bracket’s rate, not your whole income.',
        },
        {
          term: 'Standard deduction',
          definition:
            'An amount of income (around $15,000 for a single filer) that the federal government does not tax at all. Most people subtract it automatically when filing.',
        },
        {
          term: 'Tax return',
          definition:
            'The form (usually a 1040) you file each spring reporting what you earned and calculating the tax you truly owe for the year.',
        },
        {
          term: 'Refund',
          definition:
            'Money the government sends back to you when your paycheck withholding added up to more than you actually owed. It was your money all along!',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You buy $80 of sneakers and the register charges you $85.60. Which type of tax just happened?',
        options: [
          'Payroll tax',
          'Property tax',
          'Sales tax',
          'Federal income tax',
        ],
        answerIndex: 2,
        explanation:
          'Exactly — sales tax is added at the register when you buy things. Here it was 7%: $80 x 0.07 = $5.60 extra. Payroll tax comes out of paychecks, property tax is for real estate, and income tax is charged on money you earn.',
      },
    },
    {
      type: 'content',
      heading: 'How Tax Brackets REALLY Work',
      body:
        "Federal income tax is progressive, and brackets work like a stack of buckets. Picture pouring your income in from the top: the first bucket fills at a low rate, and only the overflow spills into the next bucket at a higher rate. Each rate applies ONLY to the dollars inside that bucket — never to your whole income. That per-bucket rate is called your marginal rate, and this one idea protects you from the most common tax myth out there.",
    },
    {
      type: 'example',
      heading: "Example: Zoe's Buckets",
      body:
        "Imagine a simple system with two brackets: 10% on your first $10,000 of income, and 20% on everything above that. Zoe earns $12,000 from her part-time job this year. Myth-thinking says she's 'in the 20% bracket' so she owes 20% of $12,000 = $2,400. Wrong! Here's the real math: her first $10,000 is taxed at 10% ($1,000), and only the $2,000 above the line is taxed at 20% ($400). Total: $1,400 — an overall rate of less than 12%, even though her top marginal rate is 20%. The buckets always work in her favor. 🪣",
    },
    {
      type: 'content',
      heading: 'Myth-Buster: "A Raise Can Lower Your Take-Home!"',
      body:
        "You will hear an adult say it someday: 'I can't take that raise, it'll bump me into a higher bracket and I'll take home LESS.' This is mathematically impossible under the bracket system. Moving into a higher bracket only changes the rate on the NEW dollars above the line — every dollar you already earned keeps its old, lower rate. If Zoe gets a raise from $12,000 to $13,000, only that new $1,000 is taxed at 20%; she keeps $800 of it. Earning more money ALWAYS means taking home more money. Say it loud. 📣",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "Devin's raise pushes his income from the 12% bracket into the 22% bracket. What happens to his take-home pay?",
        options: [
          'It goes down — his whole income is now taxed at 22%',
          'It goes up — only the dollars above the bracket line are taxed at 22%',
          'It stays exactly the same',
          'He must refuse the raise to avoid a penalty',
        ],
        answerIndex: 1,
        explanation:
          'You crushed the myth! Only the new dollars above the bracket threshold get taxed at 22% — everything below keeps its lower rates. His take-home pay definitely rises. A raise can never shrink your after-tax income under the bracket system.',
      },
    },
    {
      type: 'content',
      heading: 'Filing a Return (and Scoring a Refund)',
      body:
        "Each spring — the deadline is usually April 15 — people file a tax return, a form that adds up what you truly owed for last year and compares it to what your paychecks already withheld. Withheld too much? The government sends the difference back as a refund. Withheld too little? You pay the gap. For teens with part-time jobs, filing is often quick, free, and genuinely worth it: if you earned under the standard deduction, you likely owe $0 in federal income tax — and filing is the only way to get your withheld money back. That's real cash people leave on the table every year!",
    },
    {
      type: 'content',
      heading: 'The Standard Deduction: Your Free Pass',
      body:
        'Before any brackets kick in, the standard deduction shields a chunk of your income from federal income tax entirely — around $15,000 for a single filer. Earn $6,000 at a summer job? That is fully under the shield, so your federal income tax is $0, and any federal income tax that was withheld comes back to you when you file. (Heads up: FICA is different — Social Security and Medicare taxes apply from your very first dollar of wages and do not get refunded.)',
      bullets: [
        'Around $15,000 of income is federally income-tax-free for a single filer',
        'Most teen part-time earnings fall entirely under the standard deduction',
        'Filing a return is how you reclaim over-withheld income tax',
        'FICA (7.65%) still applies to all wages — the standard deduction does not block it',
      ],
    },
  ],
  quiz: [
    {
      question: 'Which of these is something your tax dollars pay for?',
      options: [
        'Public schools, roads, and firefighters',
        'Private company stock dividends',
        'Celebrity endorsement deals',
        'Your personal savings account interest',
      ],
      answerIndex: 0,
      explanation:
        'Taxes fund shared public goods and services: schools, roads, parks, defense, firefighters, Social Security, Medicare, and much more. They are the pooled money that runs federal, state, and local government.',
    },
    {
      question:
        'In a system with 10% on the first $10,000 and 20% above that, how much tax does someone earning $15,000 owe?',
      options: [
        '$3,000 — 20% of the whole $15,000',
        '$1,500 — a flat 10% of everything',
        '$2,000 — 10% plus 20% split evenly',
        '$2,000 — $1,000 on the first bucket plus $1,000 on the $5,000 above the line',
      ],
      answerIndex: 3,
      explanation:
        'Brackets work like buckets: the first $10,000 is taxed at 10% ($1,000), and only the $5,000 above the line is taxed at 20% ($1,000), for $2,000 total. The 20% rate never touches the income in the lower bucket.',
    },
    {
      question: 'Which tax is paid by homeowners and mostly funds local public schools?',
      options: ['Sales tax', 'Property tax', 'Payroll tax', 'Federal income tax'],
      answerIndex: 1,
      explanation:
        'Property tax is charged yearly on homes and land, and it is the backbone of local budgets — especially public schools, along with libraries, parks, and fire departments.',
    },
    {
      question: 'What are payroll taxes?',
      options: [
        'Taxes stores pay to print receipts',
        'A fee for using direct deposit',
        'The FICA deductions from paychecks that fund Social Security and Medicare',
        'Taxes only self-employed people pay',
      ],
      answerIndex: 2,
      explanation:
        'Payroll taxes are the FICA deductions — 6.2% for Social Security and 1.45% for Medicare — taken from wages to fund those programs. Employers pay a matching share on top.',
    },
    {
      question: 'You get a $350 tax refund in the spring. What does that actually mean?',
      options: [
        'The government paid you a bonus for filing early',
        'Your withholding during the year added up to $350 more than you actually owed',
        'You won a tax lottery',
        'You underpaid and now owe interest',
      ],
      answerIndex: 1,
      explanation:
        'A refund is your own money coming back: your paychecks withheld more than your true tax bill, and filing a return is how the government settles up and returns the extra $350.',
    },
    {
      question:
        'Leo earned $5,500 at his summer job, and $200 of federal income tax was withheld. With a standard deduction around $15,000, what should he expect if he files a return?',
      options: [
        'He owes more tax because he is a student',
        'Nothing changes whether he files or not',
        'He gets the $200 back, since his income is fully under the standard deduction',
        'He gets his FICA taxes refunded too',
      ],
      answerIndex: 2,
      explanation:
        'His $5,500 sits entirely under the standard deduction, so his federal income tax bill is $0 — filing returns the $200 that was withheld. FICA is the exception: Social Security and Medicare taxes apply to all wages and are not refunded.',
    },
  ],
}

export default lesson
