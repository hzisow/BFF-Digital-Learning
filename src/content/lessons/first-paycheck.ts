import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'first-paycheck',
  week: 5,
  day: 1,
  title: 'Your First Paycheck',
  emoji: '🧾',
  description:
    'Crack the code on your very first paystub — where every dollar goes, why the number is smaller than you expected, and how to catch mistakes like a pro.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'Payday! 🎉 ...Wait, Where Did My Money Go?',
      body:
        "It finally happened — your first paycheck! You worked hard, did the math in your head, and then... the number is smaller than you expected. Don't panic, and don't assume anyone robbed you. Today you'll learn to read a paystub line by line, understand every deduction, and know exactly where each dollar went. By the end, that confusing slip of paper will read like a comic book.",
    },
    {
      type: 'content',
      heading: 'The Big Two: Gross Pay vs. Net Pay',
      body:
        "Every paystub tells a story with two main characters. Gross pay is everything you earned before anything is taken out — hours worked times your hourly rate, plus any overtime or tips your employer runs through payroll. Net pay is what actually lands in your pocket after deductions. The gap between them isn't a mistake; it's taxes and other withholdings doing their thing.",
      bullets: [
        'Gross pay = your hours x your rate (plus overtime, bonuses, or payroll tips)',
        'Net pay = gross pay minus all deductions — your real take-home money',
        'Budget with your NET pay, never your gross — gross is a number you never actually touch',
      ],
    },
    {
      type: 'content',
      heading: 'Income Tax Withholding: Pay As You Go',
      body:
        "The biggest chunk usually missing from your check is income tax withholding. Instead of handing the government one giant payment every April, your employer withholds a little from each paycheck and sends it in for you — federal income tax for the U.S. government, and state income tax if your state has one (a few, like Texas and Florida, don't!). Think of it as paying your tax bill in tiny installments all year long. If too much gets withheld, you get it back later as a refund. 💸",
    },
    {
      type: 'terms',
      heading: 'Paycheck Vocabulary',
      terms: [
        {
          term: 'Gross pay',
          definition:
            'The total amount you earned in a pay period before any deductions — the biggest number on your paystub.',
        },
        {
          term: 'Net pay',
          definition:
            'Your take-home pay after all taxes and deductions are subtracted. This is the money that actually reaches your bank account.',
        },
        {
          term: 'Withholding',
          definition:
            'Money your employer takes out of each paycheck and sends to the government on your behalf to cover your income taxes.',
        },
        {
          term: 'FICA',
          definition:
            'The Federal Insurance Contributions Act tax — 6.2% of your pay for Social Security plus 1.45% for Medicare (7.65% total). Your employer pays a matching 7.65% too.',
        },
        {
          term: 'W-4',
          definition:
            'The form you fill out when you start a job. It tells your employer how much federal income tax to withhold from each paycheck.',
        },
        {
          term: 'Direct deposit',
          definition:
            'An electronic payment that sends your net pay straight into your bank account on payday — no paper check, no waiting in line.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "Tasha's paystub shows gross pay of $500 and net pay of $432. Which number should she use when planning her spending?",
        options: [
          '$500 — that is what she earned, so that is what she can spend',
          '$432 — net pay is the money she actually takes home',
          'The average of the two, $466',
          'Neither — paystub numbers are just estimates',
        ],
        answerIndex: 1,
        explanation:
          "Nailed it! Net pay is the only number that actually hits her bank account, so it's the only number she can spend. The $68 difference went to taxes and other deductions — budgeting with gross pay is how people accidentally overspend.",
      },
    },
    {
      type: 'content',
      heading: 'FICA: Your Ticket to Social Security and Medicare',
      body:
        "Two lines on your stub — Social Security and Medicare — together make up FICA. Social Security takes 6.2% of your gross pay and funds monthly checks for retirees and people with disabilities. Medicare takes 1.45% and funds health insurance for people 65 and older. That's 7.65% total, and here's the cool part: your employer matches it, kicking in another 7.65% that never touches your paycheck. You're not losing this money into a void — you're earning credits toward benefits you can use decades from now.",
      bullets: [
        'Social Security: 6.2% of gross pay',
        'Medicare: 1.45% of gross pay',
        'Combined FICA: 7.65% from you + a matching 7.65% from your employer',
        'Unlike income tax, FICA is a flat rate — everyone pays the same percentage on their wages',
      ],
    },
    {
      type: 'example',
      heading: "Example: Jayden's First Stub",
      body:
        "Jayden bags groceries for $14 an hour and worked 25 hours over two weeks, so his gross pay is $350. His paystub shows: Social Security -$21.70 (6.2% of $350), Medicare -$5.08 (1.45%), federal income tax withholding -$11.00, and state income tax -$7.00. Total deductions: $44.78. Net pay: $305.22. At first Jayden thought he was 'missing' almost $45 — but line by line, every dollar is accounted for. He also spots his YTD (year-to-date) column, which will keep a running total all year. 🧾",
    },
    {
      type: 'content',
      heading: 'The W-4: The Form That Controls Your Withholding',
      body:
        "On day one of any job, HR hands you a Form W-4. It's not a test — it's how you tell your employer how much federal income tax to hold back. List your filing status and answer a few questions, and payroll does the math. If you're a student with one part-time job, the standard settings usually work fine. Claim too little withholding and you might owe money in April; withhold extra and you'll get it back as a refund. You can update your W-4 anytime your situation changes — new job, second job, big life change.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Marcus earns $200 gross this week. About how much will FICA (Social Security + Medicare) take out of his check?',
        options: [
          'About $15.30 — 7.65% of $200',
          'About $40 — FICA is always 20%',
          '$0 — teens are exempt from FICA',
          'About $62 — Social Security alone is 31%',
        ],
        answerIndex: 0,
        explanation:
          'You got it! FICA is 6.2% for Social Security ($12.40) plus 1.45% for Medicare ($2.90), which totals 7.65% — about $15.30 on a $200 check. And no, being a teen does not make you exempt: if you earn wages, you pay FICA.',
      },
    },
    {
      type: 'content',
      heading: 'Direct Deposit: Skip the Paper',
      body:
        "Most employers offer direct deposit — your net pay zaps electronically into your bank account on payday. No paper check to lose, no trip to the bank, no waiting for a check to clear. To set it up you'll give your employer your bank's routing number and your account number (both are on your bank's app or a check). Pro tip: some employers even let you split your deposit, sending part to checking and part straight to savings — automatic saving before you ever see the money. 🏦",
    },
    {
      type: 'content',
      heading: 'Be Your Own Auditor: Check Every Stub',
      body:
        "Payroll systems are run by humans, and humans make mistakes. Every payday, take 60 seconds to audit your own stub. If something looks off, don't be shy — politely ask your manager or the payroll contact listed on the stub. Errors are usually honest mistakes, and they get fixed fastest when you catch them early.",
      bullets: [
        'Check your hours: does the stub match the hours you actually worked?',
        'Check your rate: were you paid the hourly rate you were promised?',
        'Check overtime: hours past 40 in a week usually pay 1.5x your rate',
        'Check the math: rate x hours should equal your gross pay',
        'Keep your stubs (or screenshots) — they are your proof if a dispute ever comes up',
      ],
    },
    {
      type: 'content',
      heading: 'The W-2: Your Year-End Report Card',
      body:
        "Every January, your employer sends you a Form W-2 — a summary of your entire year: total wages earned and total taxes withheld for federal, state, and FICA. Don't confuse it with the W-4! The W-4 is what YOU fill out at hiring to set your withholding; the W-2 is what your EMPLOYER fills out after the year ends. You use the W-2 to file your tax return, and if too much was withheld during the year, that return is how you get your refund. File it away somewhere safe — tax season will thank you. 📬",
    },
  ],
  quiz: [
    {
      question: 'Your gross pay is $600 but your bank account only shows $521. What happened?',
      options: [
        'The bank charged you an $79 transfer fee',
        'Taxes and other deductions were withheld before your net pay was deposited',
        'Your employer made an illegal error',
        'Direct deposit always loses a percentage',
      ],
      answerIndex: 1,
      explanation:
        'The $79 gap is your deductions: federal (and maybe state) income tax withholding plus FICA taxes came out of your gross pay before the net pay was deposited. That is completely normal — but you should still verify the math on your stub!',
    },
    {
      question: 'What are the two parts of FICA, and what rates do YOU pay?',
      options: [
        'Federal tax at 10% and state tax at 5%',
        'Social Security at 6.2% and Medicare at 1.45%',
        'Social Security at 12.4% and Medicare at 2.9%',
        'Retirement at 3% and insurance at 4%',
      ],
      answerIndex: 1,
      explanation:
        'FICA is Social Security (6.2%) plus Medicare (1.45%), totaling 7.65% of your gross wages. The 12.4% and 2.9% figures are the combined totals only after your employer adds its matching share.',
    },
    {
      question: 'What is the purpose of the W-4 form you fill out when starting a job?',
      options: [
        'It tells your employer how much federal income tax to withhold from your paychecks',
        'It summarizes your total yearly earnings for tax filing',
        'It signs you up for direct deposit',
        'It proves you are legally allowed to drive to work',
      ],
      answerIndex: 0,
      explanation:
        'The W-4 sets your federal income tax withholding. Fill it out when you are hired, and update it whenever your situation changes. The form that summarizes your yearly earnings is the W-2, which arrives every January.',
    },
    {
      question: 'In January, your employer sends you a W-2. What is it for?',
      options: [
        'It is a bill for taxes you still owe',
        'It is a coupon for tax preparation software',
        'It summarizes your year of wages and withheld taxes so you can file your tax return',
        'It resets your withholding for the new year',
      ],
      answerIndex: 2,
      explanation:
        'The W-2 reports your total wages and everything withheld — federal, state, and FICA — for the whole year. You use those numbers to file your tax return, which is also how you claim a refund if too much was withheld.',
    },
    {
      question: 'Which of these is a benefit of direct deposit?',
      options: [
        'Your gross pay is deposited instead of your net pay',
        'You skip paying FICA taxes',
        'Your employer pays you a bonus for using it',
        'Your pay arrives electronically on payday — no paper check to lose or cash',
      ],
      answerIndex: 3,
      explanation:
        'Direct deposit sends your net pay straight to your bank account electronically, so there is no check to lose, deposit, or wait on. It does not change what you are paid or what taxes you owe — just how the money travels.',
    },
    {
      question:
        'Nia worked 22 hours at $15/hour, but her stub shows gross pay of $255 instead of $330. What should she do?',
      options: [
        'Nothing — the missing $75 is probably just taxes',
        'Quit immediately',
        'Compare the stub to her own record of hours, then politely ask her manager or payroll to fix the error',
        'Post the paystub online to warn others',
      ],
      answerIndex: 2,
      explanation:
        'Taxes come out AFTER gross pay is calculated, so a wrong gross number means the hours or rate were entered incorrectly. Checking rate x hours (22 x $15 = $330) and calmly flagging it with payroll is exactly how pros handle it — and why you always review your stub.',
    },
  ],
}

export default lesson
