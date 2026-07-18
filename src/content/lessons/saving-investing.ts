import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'saving-investing',
  week: 2,
  day: 1,
  title: 'Saving & Investing',
  emoji: '📈',
  description:
    'How to build wealth over time, put your money in the right places, and understand the power of time in compound growth.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Building Wealth Over Time',
      body:
        "Quick warm-up: what's something big you'd like to afford one day, and how long do you think it would take to save for it? A car? College? A trip? Keep that goal in mind, because today is all about how to actually get there. We'll cover saving vs. investing, the magic of compounding, and where to put your money.",
    },
    {
      type: 'content',
      heading: 'Saving vs. Investing: Not the Same Thing!',
      body:
        "Contrary to popular belief, saving and investing are not the same. Saving means putting money aside in a safe place for short-term or emergency needs, like stashing cash in a savings account for a new phone. There's no chance of losing that money. Investing means putting money into assets with the goal of long-term growth, like buying stocks or mutual funds for retirement.",
      bullets: [
        'Saving: low risk, low return, great for emergencies and short-term goals',
        'Investing: medium-to-high risk, higher return, great for long-term goals',
        'There are even subsets of investing, like day-trading, which follows daily stock market patterns',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Sean is a 1st grader. His parents consistently set aside money to pay for his education years from now. Is this saving or investing?',
        options: [
          'Saving, because they are being careful',
          'Investing, because it is money put toward long-term growth for a far-off goal',
          'Neither, because Sean is too young',
          'Both are exactly the same thing',
        ],
        answerIndex: 1,
        explanation:
          "Nice thinking! Because Sean's education is many years away, money set aside for it is aimed at long-term growth, which makes it investing. Saving is for short-term or emergency needs. And remember, saving and investing are definitely not the same thing!",
      },
    },
    {
      type: 'terms',
      heading: 'Interest, APR, and Compounding',
      terms: [
        {
          term: 'Interest',
          definition:
            'The rate paid for money on deposit. For example, 3% interest on a $1,000 deposit earns you $30.',
        },
        {
          term: 'APR (Annual Percentage Rate)',
          definition: 'Interest expressed as a yearly rate.',
        },
        {
          term: 'Compound Interest',
          definition:
            'Interest earned on top of interest. Your money grows by more and more each year, making it one of the easiest ways to build wealth.',
        },
        {
          term: 'Time Value of Money',
          definition:
            'The idea that a dollar is worth more now than in the future, because of inflation and the ability to earn interest starting today.',
        },
      ],
    },
    {
      type: 'example',
      heading: 'Compounding in Action: Meet Joe',
      body:
        "Joe earns 5% APR on his $10,000 deposit. Year 1: $10,000 x 1.05 = $10,500, a gain of $500. Year 2: $10,500 x 1.05 = $11,025, a gain of $525. Year 3: $11,025 x 1.05 = $11,576.25, a gain of $551.25. Notice how each year's gain is bigger than the last? That's compounding: interest earning interest. Joe didn't lift a finger.",
    },
    {
      type: 'content',
      heading: 'The Key to Compounding Is Time',
      body:
        "The more time you have, the more money you can make. That's why starting young is basically a superpower. Here are two strategies that make compounding work for you automatically.",
      bullets: [
        'Pay Yourself First: take a small portion of every paycheck and invest it before you spend anything (remember the 50/30/20 rule!)',
        'Dollar Cost Averaging (DCA): purchase a set dollar amount of a stock consistently, like buying $50 of AMZN every month, no matter the price',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Joe deposits $10,000 at 5% APR with compound interest. Why does he earn MORE than $500 in year 2?',
        options: [
          'The bank feels generous in year 2',
          'His APR automatically doubles every year',
          'He earns interest on his original deposit plus the interest from year 1',
          'He does not earn more; compound interest pays the same amount every year',
        ],
        answerIndex: 2,
        explanation:
          "Exactly! After year 1, Joe's balance is $10,500, so year 2's 5% applies to that bigger number, earning him $525 instead of $500. Interest earning interest is the whole magic trick of compounding, and it snowballs the longer you leave it alone.",
      },
    },
    {
      type: 'video',
      heading: 'Watch: Compound Interest in Action',
      body:
        'Want to see the math behind the magic? Watch Khan Academy walk through exactly how compounding snowballs. The video will pause and quiz you — no skipping ahead!',
      videoId: 'Rm6UdfRs3gw',
      source: 'Khan Academy',
      questions: [
        {
          at: 95,
          question:
            'You deposit $100 at 10% interest, compounded yearly. After year 1 you have $110. About how much after year 2?',
          options: ['$120', '$121', '$130', '$110 — it stays the same'],
          answerIndex: 1,
          explanation:
            "Year 2's 10% applies to the whole $110 — not just your original $100 — so you earn $11 and land on $121. That extra dollar is interest earning interest, and it grows every single year.",
        },
        {
          at: 240,
          question: 'What makes compound interest different from simple interest?',
          options: [
            'Compound interest only works at big banks',
            'With compounding, you earn interest on your interest — not just on what you deposited',
            'Simple interest grows faster over time',
            'There is no difference, just different names',
          ],
          answerIndex: 1,
          explanation:
            'Simple interest pays on your original deposit only, forever. Compounding pays on your deposit PLUS everything it has already earned — which is why it starts slow and then explodes over the years.',
        },
      ],
    },
    {
      type: 'content',
      heading: 'Where Should You Put Your Money?',
      body:
        "There are several different types of accounts and investments, and which ones you use depends on your goals and your financial situation. (Remember the SMART goal strategy? It will help you decide.) The main options include stocks, mutual funds and ETFs, bonds, savings accounts, retirement accounts like 401(k)s, and education plans. Let's tour each one.",
    },
    {
      type: 'content',
      heading: 'Stocks',
      body:
        "Stocks are shares of publicly-traded companies. When you buy a company's stock, you become a partial owner of that company. Pretty cool, right? Stocks can be high or low risk depending on the company.",
      bullets: [
        'A stock index is a hypothetical segment of the stock market, like the NASDAQ or Dow Jones',
        'The S&P 500, a stock index, averages about 10% returns year over year',
        'Capital gains are profits from selling an investment for more than you paid',
        'Dividends are portions of profits paid to shareholders directly from the company',
      ],
    },
    {
      type: 'content',
      heading: 'Mutual Funds, ETFs, and Bonds',
      body:
        'Mutual funds and ETFs are "baskets" of different stocks. An energy fund, for example, can include a wide range of energy companies. Baskets are generally lower risk than individual stocks because they give you diversification: spreading your investments across the market. Bonds are a lending investment where you loan money to a company or government and earn interest payments in return.',
      bullets: [
        'Mutual funds are managed by a professional fund manager, but charge an annual fee',
        "ETFs don't charge an annual fee, but they are not professionally managed",
        'Bonds come in types like corporate, treasury, and municipal',
        'Bonds have credit ratings; risky bonds can default, meaning the borrower does not pay its debt back',
      ],
    },
    {
      type: 'content',
      heading: 'Savings Accounts, Retirement Accounts, and 529s',
      body:
        "Savings accounts are bank accounts for money you don't plan to spend right away. They usually limit monthly withdrawals but pay you compounding interest in return. For retirement, 401(k)s (employer-sponsored) and IRAs (not employer-sponsored) invest monthly contributions from your paycheck into the market. And 529 plans are college savings accounts that grow over time with consistent investment.",
      bullets: [
        'High-Yield Savings Accounts (HYSAs) average 4-5% APR, while traditional savings accounts average just 0.1-0.3% APR',
        'Traditional 401(k)s and IRAs are tax-deferred: you contribute pre-tax dollars, then pay taxes on withdrawal',
        'Roth 401(k)s and IRAs flip it: you pay with after-tax dollars, but withdrawals are not taxed',
        'You can start a 529 plan at any time, but money not used for education gets hit with a 10% tax, which is huge',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You want to invest but individual stocks feel too risky. Which option spreads your money across many companies at once?',
        options: [
          'A payday loan',
          'A single share of one company',
          'A traditional savings account',
          'A mutual fund or ETF',
        ],
        answerIndex: 3,
        explanation:
          'You got it! Mutual funds and ETFs are "baskets" of many stocks, giving you diversification, which spreads your investments across the market and lowers your risk compared to betting on a single company. Fund managers run mutual funds for a fee; ETFs skip the fee and the manager.',
      },
    },
    {
      type: 'example',
      heading: 'Wolf of Wall Street! (Class Game)',
      body:
        "In class, this lesson comes with a game. You get a $1,000 budget to \"invest\" in 3 stocks of your choice, deciding how many shares of each to buy based on their past performance. At the end of the presentation, everyone checks how their picks did and tallies up their winnings (or losses). It's a fun, zero-risk way to feel what real investing decisions are like: analyzing performance, diversifying, and living with the results.",
    },
    {
      type: 'content',
      heading: 'Wrapping Up',
      body:
        "Big ideas from today: saving is safe and short-term, investing is riskier but grows your money long-term, and compound interest plus time is the easiest wealth-building combo there is. Pay yourself first, diversify, and match the account to the goal. Jot down a quick summary of what clicked and what you want to review. Next session: Credit and Debt!",
    },
  ],
  quiz: [
    {
      question: 'What is the main difference between saving and investing?',
      options: [
        'Saving is putting money in a safe place for short-term needs; investing is putting money into assets for long-term growth',
        'Saving earns higher returns than investing',
        'Investing has no risk, while saving is risky',
        'They are the same thing with different names',
      ],
      answerIndex: 0,
      explanation:
        'Saving is low risk and low return, perfect for emergencies and short-term goals. Investing carries medium-to-high risk but offers higher returns, making it the tool for long-term goals like retirement.',
    },
    {
      question:
        'Joe deposits $10,000 at 5% APR with compound interest. About how much does he have after 2 years?',
      options: ['$10,500', '$11,000', '$11,025', '$12,000'],
      answerIndex: 2,
      explanation:
        'Year 1: $10,000 x 1.05 = $10,500. Year 2: $10,500 x 1.05 = $11,025. Compound interest means year 2 earns interest on the interest from year 1, which is why the gain grows from $500 to $525.',
    },
    {
      question: 'What does "Pay Yourself First" mean?',
      options: [
        'Buy yourself a treat before paying any bills',
        'Take a small portion of every paycheck and invest it before spending on anything else',
        'Pay off all your debts before ever saving',
        'Ask your employer to pay you before your coworkers',
      ],
      answerIndex: 1,
      explanation:
        'Pay Yourself First means setting aside part of every paycheck for saving and investing before you spend a dime, so your future always gets funded. It pairs perfectly with the 50/30/20 rule.',
    },
    {
      question: 'What is a dividend?',
      options: [
        'The fee a mutual fund manager charges each year',
        'The profit you make from selling a stock at a higher price',
        'A loan you make to a government',
        'A portion of company profits paid directly to shareholders',
      ],
      answerIndex: 3,
      explanation:
        'Dividends are portions of profits a company pays to its shareholders. Capital gains, by contrast, are profits you earn from selling an investment for more than you paid.',
    },
    {
      question: 'How is an ETF different from a mutual fund?',
      options: [
        'An ETF holds only one stock, while a mutual fund holds many',
        "An ETF doesn't charge an annual fee but isn't professionally managed; a mutual fund is professionally managed but charges a fee",
        'An ETF is a type of bond, while a mutual fund is a type of stock',
        'ETFs are only for retirement accounts',
      ],
      answerIndex: 1,
      explanation:
        'Both are "baskets" of stocks that offer diversification. The trade-off: mutual funds come with a professional fund manager and an annual fee, while ETFs skip both the manager and the fee.',
    },
    {
      question:
        'Which account typically earns 4-5% APR, compared to 0.1-0.3% for a traditional savings account?',
      options: [
        'A checking account',
        'A 529 plan used for groceries',
        'A High-Yield Savings Account (HYSA)',
        'A payday loan account',
      ],
      answerIndex: 2,
      explanation:
        'High-Yield Savings Accounts average 4-5% APR while traditional savings accounts average just 0.1-0.3% APR. Same safety, way better compounding, so where you park your savings really matters.',
    },
    {
      question: 'What is the key difference between a traditional and a Roth 401(k) or IRA?',
      options: [
        'Traditional accounts are only for teachers',
        'Roth accounts can only hold bonds',
        'Traditional accounts have no taxes at all',
        'Traditional accounts use pre-tax dollars and are taxed on withdrawal; Roth accounts use after-tax dollars and are not taxed on withdrawal',
      ],
      answerIndex: 3,
      explanation:
        'Traditional 401(k)s and IRAs are tax-deferred: contribute pre-tax now, pay taxes when you withdraw. Roth versions flip it: pay taxes on the money now, withdraw tax-free later.',
    },
    {
      question: 'Why is time so important for compounding?',
      options: [
        'Banks only pay interest to older customers',
        'The more time your money compounds, the more interest earns interest, so gains grow larger every year',
        'Stocks are only sold during certain years',
        'Inflation makes your money worth more over time',
      ],
      answerIndex: 1,
      explanation:
        'Each year, compounding pays interest on a bigger balance, so growth accelerates the longer you stay invested. That is the time value of money in action, and it is why starting young is such an advantage.',
    },
  ],
}

export default lesson
