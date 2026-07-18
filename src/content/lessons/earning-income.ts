import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'earning-income',
  week: 1,
  day: 1,
  title: 'Earning Income',
  emoji: '💵',
  description:
    'How to begin building an income and interpreting the myriad of numbers that come with it — from types of income to reading your first paystub.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Welcome to BFF Classroom!',
      body:
        "Welcome to Week 1, Day 1! Before we talk about money, let's talk about why we're here. Financial literacy is the knowledge and understanding of the financial concepts, tools, and practices you need to navigate the financial world and make informed choices. Understanding personal finance helps you build a positive relationship with money — so you can spend and save responsibly. Today: how income actually works.",
    },
    {
      type: 'content',
      heading: 'Earned vs. Unearned Income',
      body:
        "Not all money arrives the same way. Earned income is money you receive as payment for work — taxable employee pay. Unearned income is money you earn passively, without clocking in. It's generally taxable too, with some exceptions. Knowing which is which matters, because they're treated differently at tax time.",
      bullets: [
        'Earned income includes: wages (time-based), salaries (not time-based), bonuses, commissions, tips, and self-employed earnings',
        'Unearned income includes: interest on savings, stock dividends, lottery or casino winnings, rental income from properties, inheritances, and gifts',
        'Quick test: did you trade your work for it? Earned. Did it come to you passively? Unearned.',
      ],
    },
    {
      type: 'terms',
      heading: 'Three Flavors of Earned Income',
      terms: [
        {
          term: 'Wages',
          definition:
            'Pay based on hourly work — the most common setup for teenagers. Hourly pay ranges from the federal minimum of $7.25 all the way to hundreds per hour for jobs like lawyers. Many wage-based jobs come from small businesses, internships, and similar gigs.',
        },
        {
          term: 'Salary',
          definition:
            'Pay fixed as a total amount, usually divided into set monthly, biweekly, or weekly payments. Salaried employees receive the same amount regardless of hours worked — unlike wage jobs, which pay by the hour.',
        },
        {
          term: 'Commission',
          definition:
            'Pay that varies based on sales performance, common for agents, salespeople, and advisors. A real estate agent might take a percentage of each sale; a car salesman might take home a set amount per car sold.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Your cousin gets paid $15 for every hour she works at a smoothie shop. What kind of income is that?',
        options: [
          'A salary — the payments are regular',
          'Wages — earned income based on hourly work',
          'Unearned income — smoothies count as passive',
          'A commission — she earns per smoothie sold',
        ],
        answerIndex: 1,
        explanation:
          "Exactly right — pay that's based on hours worked is a wage, which is a classic form of earned income. A salary would be a fixed total amount regardless of hours, and commission would depend on how much she sells, not how long she works.",
      },
    },
    {
      type: 'content',
      heading: 'Factor 1: Education',
      body:
        "What decides how much you earn? Factor one: education. Generally, the more you learn, the more you earn — higher levels of education tend to result in greater incomes, and they open up more opportunities in today's world. Important caveat, straight from us: this does NOT mean you have to go to college! Trades, certifications, and skills all count, as you'll see later in this lesson.",
    },
    {
      type: 'content',
      heading: 'Factor 2: Seniority',
      body:
        'Seniority means extended continuous service with a company or organization — think working at the same company for 20 years versus working at 5 different companies for 4 years each. The people who have worked somewhere the longest have the highest seniority, and it usually pays off. But there is a trade-off.',
      bullets: [
        'Higher seniority generally brings: higher salary, increased priority for promotions, and more paid time off (PTO)',
        'The catch: building seniority reduces your flexibility',
        'You might earn more at another company, or another company might offer a better benefits package',
      ],
    },
    {
      type: 'content',
      heading: 'Factor 3: Skills and Experience',
      body:
        'Skilled workers earn, on average, higher wages than unskilled workers. Everyone has an aptitude — a natural ability to do something — and taking an aptitude test can help you identify areas of work where you might shine. Experience matters just as much: studies find that work experience may contribute as much to income as education does. The more experience you have, the more you get paid.',
    },
    {
      type: 'content',
      heading: 'Factor 4: Macroeconomic Factors',
      body:
        'Some things that affect your income have nothing to do with you. Macroeconomic factors are influential fiscal, natural, or geopolitical events that broadly affect a national economy — like inflation, unemployment, and GDP. The economy moves in cycles, and your paycheck rides along.',
      bullets: [
        'Recessions are times of high unemployment; expansions are times of low unemployment',
        'During recessions, companies have to reduce costs',
        'That often means lower salaries and increased layoffs — even for great employees',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Maria has worked at the same company for 15 years. Which perk is she LEAST likely to get from that seniority?',
        options: [
          'Higher salary',
          'More paid time off',
          'Increased priority for promotions',
          'More flexibility to switch jobs',
        ],
        answerIndex: 3,
        explanation:
          "You got it! Seniority typically brings higher pay, more PTO, and better shots at promotions — but it actually reduces flexibility. Maria might earn more or find better benefits elsewhere, and leaving means starting her seniority clock over.",
      },
    },
    {
      type: 'terms',
      heading: 'Paystubs and Deductions',
      terms: [
        {
          term: 'Paystub',
          definition:
            'A paper or digital record given to an employee with each paycheck. It shows the amount of money the employee earned and the amount removed for taxes, insurance costs, and other deductions.',
        },
        {
          term: 'Gross income',
          definition: 'Your income before deductions — the big number, before anything is taken out.',
        },
        {
          term: 'Net income',
          definition: 'Your income after deductions — the amount you actually take home.',
        },
        {
          term: 'Mandatory deductions',
          definition:
            'Deductions required by law: federal and state income tax, plus FICA taxes, which fund Social Security and Medicare.',
        },
        {
          term: 'Voluntary deductions',
          definition:
            'Deductions you choose, like health insurance premiums, life insurance premiums, and retirement account contributions.',
        },
      ],
    },
    {
      type: 'content',
      heading: 'Anatomy of a Paystub',
      body:
        "A real paystub looks intimidating, but it's just a few zones. First comes pay period info — when the stub was issued and which working days it covers — plus employee info like your work location, employee ID, and payroll contact. There's a section for paid leave (sick, business, necessary, and vacation leave), and your tax status codes (for example, 'M4' means a married individual).",
      bullets: [
        "Gross pay: everything earned over the period, including normal pay, bonuses, and extra pay for credentials like a master's or doctorate",
        'Deductions: employee deductions are withheld from your gross pay; employer deductions are paid by the employer, not taken from you',
        'Net pay: what you actually take home after deductions — always smaller than gross, so don’t be shocked',
        'Current vs. YTD (year-to-date) totals: a running summary, including pre-tax deductions like pension and retirement funds',
      ],
    },
    {
      type: 'example',
      heading: 'Real-World Example: MrBeast',
      body:
        'MrBeast (Jimmy Donaldson) is perhaps one of the most famous entrepreneurs in the world right now, and he makes his money several ways at once. Self-employment: he primarily earns from his own YouTube videos and brand deals built on his own intellectual and digital property — earned income. Business income: owning Feastables and MrBeast Burger are huge assets beyond YouTube. Royalties: much of his money comes from ad revenue and royalties on his videos.',
    },
    {
      type: 'example',
      heading: 'Real-World Example: Mario',
      body:
        "Maybe the most famous plumber in the world, Mario and his brother earn their living with no college degree — representing millions of skilled workers in the trades. Wages and commissions: as a plumber, Mario earns an hourly rate combined with commission-based pay per job. Education: like electricians and other trade workers, he usually needs certification but no bachelor's degree — and can make as much as or more than many who have one. And it's all earned income: he gets paid for his labor (saving princesses, fixing pipes), not passive investments.",
    },
    {
      type: 'example',
      heading: 'Real-World Example: LeBron James',
      body:
        'Over his 20+ year NBA tenure, King James has built a career far beyond the court. Endorsements: LeBron is endorsed by Nike, one of the biggest brands in the world, generating huge income through shoe deals and other companies. Business income: he co-owns businesses like Blaze Pizza and SpringHill Entertainment. Earned income: years of hard work earned him one of the heftiest NBA salaries ever — currently sitting at almost $49 million!',
    },
  ],
  quiz: [
    {
      question: 'Which of the following is an example of UNEARNED income?',
      options: [
        'Tips from waiting tables',
        'A bonus from your employer',
        'Interest on your savings account',
        'Self-employed earnings from mowing lawns',
      ],
      answerIndex: 2,
      explanation:
        'Interest on savings arrives passively — you did not work for those specific dollars, so it is unearned income. Tips, bonuses, and self-employed earnings are all payment for work, which makes them earned income.',
    },
    {
      question:
        'A real estate agent takes home a percentage of every house she sells. What type of pay is this?',
      options: ['Commission', 'Salary', 'Wages', 'Dividends'],
      answerIndex: 0,
      explanation:
        'Pay that varies based on sales performance is commission — common for agents, salespeople, and advisors. Wages are hourly, salaries are a fixed total, and dividends are unearned income from stocks.',
    },
    {
      question: 'What is the main difference between a wage and a salary?',
      options: [
        'Wages are always higher than salaries',
        'Wages are based on hours worked; a salary is a fixed total regardless of hours',
        'Salaries are unearned income; wages are earned income',
        'Only salaries are taxable',
      ],
      answerIndex: 1,
      explanation:
        'Wages pay you per hour of work, while a salary is a fixed total amount split into regular payments no matter how many hours you work. Both are earned income, and both are taxable.',
    },
    {
      question: 'During a recession, which of these is most likely to happen?',
      options: [
        'Unemployment falls and salaries rise',
        'Companies expand hiring rapidly',
        'The federal minimum wage automatically increases',
        'Companies cut costs, leading to lower salaries and more layoffs',
      ],
      answerIndex: 3,
      explanation:
        'Recessions are times of high unemployment. Companies have to reduce costs, which often means lower salaries and increased layoffs. Expansions, by contrast, are times of low unemployment.',
    },
    {
      question: 'Your gross income is $2,000 and your net income is $1,550. What explains the difference?',
      options: [
        'A math error by the payroll department',
        'Employer deductions were added to your pay',
        'Deductions like taxes and insurance were subtracted from your gross pay',
        'Your unearned income was removed',
      ],
      answerIndex: 2,
      explanation:
        'Gross income is your pay before deductions; net income is what remains after deductions like federal and state income tax, FICA taxes, and insurance premiums are taken out. The $450 gap is your deductions.',
    },
    {
      question: 'Which of these is a MANDATORY deduction on a paystub?',
      options: [
        'Retirement account contributions',
        'FICA taxes for Social Security and Medicare',
        'Life insurance premiums',
        'Health insurance premiums',
      ],
      answerIndex: 1,
      explanation:
        'FICA taxes — which fund Social Security and Medicare — are required by law, along with federal and state income taxes. Health insurance, life insurance, and retirement contributions are voluntary deductions you choose.',
    },
    {
      question:
        'Mario earns a great living as a plumber without a college degree. What does his story show about factors affecting income?',
      options: [
        'Education never affects how much you earn',
        'Only unearned income can make you wealthy',
        'Seniority is the only factor that matters',
        'Skilled trade workers with certifications can earn as much as or more than many degree holders',
      ],
      answerIndex: 3,
      explanation:
        "Education generally boosts income, but it doesn't have to mean college. Skilled trades like plumbing and electrical work usually require certification, not a bachelor's degree — and skills and experience can contribute as much to income as education.",
    },
  ],
}

export default lesson
