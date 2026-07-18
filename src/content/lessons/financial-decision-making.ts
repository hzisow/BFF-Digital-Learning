import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'financial-decision-making',
  week: 3,
  day: 2,
  title: 'Financial Decision-Making',
  emoji: '🤔',
  description:
    'Learn how to evaluate financial choices using opportunity cost, comparison shopping, and other decision-making tools.',
  durationMin: 18,
  sections: [
    {
      type: 'intro',
      heading: 'Every Choice Has a Price',
      body:
        "You make dozens of decisions every day: what to eat, what to buy, what to skip. Today you'll learn the tools that turn 'I guess I'll buy it' into a smart, confident choice. By the end, you'll be weighing options like a pro, and your future wallet will thank you.",
    },
    {
      type: 'content',
      heading: 'Warm-Up: The $50 Dilemma',
      body:
        "Imagine this: you're offered $50 to babysit tonight, but your friends are going to a concert you don't want to miss. What would you do, and why? There's no wrong answer here, but notice something: whichever option you pick, you give up the other one. That trade-off has a name, and it's our first big idea.",
    },
    {
      type: 'content',
      heading: 'Opportunity Cost',
      body:
        "Every choice comes with a trade-off, especially when it comes to money. Opportunity cost is the value of what you give up when you choose one thing over another. Every decision has a cost. For example, the opportunity cost of buying a new car is the extra money you would have saved by buying a used one. You can't have everything, so smart decisions mean weighing all your options and analyzing the costs and benefits of each.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You spend $60 on concert tickets instead of saving it for a new skateboard. What is the opportunity cost of your choice?',
        options: [
          'The $60 you spent on the tickets',
          'The fun you had at the concert',
          'The skateboard you gave up',
          'There is no cost because you enjoyed the concert',
        ],
        answerIndex: 2,
        explanation:
          "That's it! Opportunity cost is the value of what you give up, in this case the skateboard. Even fun purchases have an opportunity cost.",
      },
    },
    {
      type: 'terms',
      heading: 'Decision-Making Toolbox',
      terms: [
        {
          term: 'Opportunity Cost',
          definition:
            'The value of what you give up when you choose one thing over another.',
        },
        {
          term: 'Comparison Shopping',
          definition:
            'Comparing the price and features of products or services from different vendors before buying.',
        },
        {
          term: 'Cost-Benefit Analysis',
          definition:
            'Comparing the benefits of purchasing a good or service with the costs.',
        },
        {
          term: 'Delayed Gratification',
          definition:
            'Waiting before you buy. The longer you wait, the more value you may get, or the less regret.',
        },
      ],
    },
    {
      type: 'content',
      heading: 'Smart Spending Strategies',
      body:
        'When a purchase is calling your name, slow down and run it through these three strategies. They work for sneakers, subscriptions, and someday, cars and apartments.',
      bullets: [
        "Comparison shopping: check prices and features from different sellers first. Last year's Kyrie basketball shoes may cost way less than this year's.",
        'Cost-benefit analysis: list what you gain from the purchase and weigh it against what it costs you.',
        'Delayed gratification: wait before buying. Prices drop, hype fades, and you find out if you really wanted it.',
      ],
    },
    {
      type: 'content',
      heading: 'The Final Tip',
      body:
        "Before any purchase, ask yourself two quick questions: Is this purchase necessary? And can I wait for a sale or choose a cheaper option? Those ten seconds of thinking have saved shoppers more money than any coupon ever printed. Also, think about a recent purchase you're proud of. What made it smart?",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "Deja wants this year's newest basketball shoes, but she checks three stores and discovers last year's model has almost identical features for half the price. Which strategy is she using?",
        options: [
          'Comparison shopping',
          'Impulse buying',
          'Overdraft protection',
          'Risk transference',
        ],
        answerIndex: 0,
        explanation:
          'Nailed it! Comparing prices and features across different vendors before buying is comparison shopping, and it just saved Deja half the price.',
      },
    },
    {
      type: 'content',
      heading: 'Evaluating Financial Services',
      body:
        'These same skills work when choosing banks, accounts, and other financial services. Comparing helps you make smarter choices. And watch out: many services try to hit you with subscriptions and small charges that add up over time, so keep track of your payments!',
      bullets: [
        'Price: what does it cost up front?',
        'Value: what do you actually get for your money?',
        'Quality: will it hold up and work well?',
        'Features: which extras genuinely matter to you?',
        'Hidden fees: what sneaky charges are buried in the fine print?',
      ],
    },
    {
      type: 'example',
      heading: 'Bank Battle: EasyBank vs. SecurePlus',
      body:
        "Compare two checking accounts. EasyBank Basic has no monthly fee, free access at 15,000+ ATMs, a basic app with transfers and alerts, and a $35 fee per overdraft. SecurePlus Checking costs $5 a month (waived with a $500 balance), offers free access at any ATM nationwide, includes budgeting tools plus early paycheck access, and has no overdraft fees because it auto-declines. Which is better for someone with a low monthly balance? Who benefits most from the budgeting tools? What kind of spender avoids overdraft fees entirely? Different people, different best answers.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Sam usually keeps less than $100 in his account. Based on the comparison, which account probably fits him better, and why?',
        options: [
          'SecurePlus, because every account with a fee is higher quality',
          'EasyBank Basic, because he avoids the $5 monthly fee that SecurePlus would charge at his low balance',
          'SecurePlus, because he keeps more than $500 in his account',
          'Neither, because checking accounts are only for adults',
        ],
        answerIndex: 1,
        explanation:
          "Great analysis! With less than $500 in his account, Sam would pay SecurePlus's $5 monthly fee, so EasyBank's $0 fee likely serves him better. He just has to be careful about that $35 overdraft charge.",
      },
    },
    {
      type: 'example',
      heading: 'Would You Rather?',
      body:
        "You earn $70,000 a year. Would you rather buy a new car and use all your money, or buy a used car and save the rest? Financially, the used car usually wins, even if it looks a little worse. Next: a new $1,000 iPhone, or $1,000 of Apple stock? Investing is often the smarter move, but imagine tariffs hit and Apple investors lose half their money. Investing carries real risk too. Last one: a job with a much higher salary but fewer benefits, or a lower-paying, commission-based job with far better benefits like paid time off? Every option has trade-offs. That's the whole point.",
    },
    {
      type: 'content',
      heading: 'Wrapping Up',
      body:
        "You now have a full decision-making toolkit: spot the opportunity cost, comparison shop, run a cost-benefit analysis, and let delayed gratification work its magic. Jot down what clicked today and what you want to practice more. Next session: Financial Planning, complete with a Dave Ramsey video and an end-of-lesson quiz. See you there!",
    },
  ],
  quiz: [
    {
      question: 'What is opportunity cost?',
      options: [
        'The price tag on an expensive item',
        'The value of what you give up when you choose one thing over another',
        'The fee a store charges for returns',
        'The interest a bank pays on savings',
      ],
      answerIndex: 1,
      explanation:
        'Opportunity cost is the value of what you give up when choosing one option over another. Every decision has a cost.',
    },
    {
      question:
        'The opportunity cost of buying a brand-new car instead of a used one is...',
      options: [
        'The extra money you would have saved by buying the used car',
        'The gas the new car uses',
        'The monthly insurance premium',
        'Nothing, because new cars never lose value',
      ],
      answerIndex: 0,
      explanation:
        'By choosing the new car, you give up the extra savings the used car would have left in your pocket. That forgone savings is the opportunity cost.',
    },
    {
      question:
        'Checking prices and features from several different sellers before buying is called...',
      options: [
        'Delayed gratification',
        'Impulse buying',
        'Cost transference',
        'Comparison shopping',
      ],
      answerIndex: 3,
      explanation:
        "Comparison shopping means comparing price and features across vendors before you buy, like grabbing last year's Kyrie shoes for less than this year's.",
    },
    {
      question:
        'Weighing the benefits of a purchase against what it costs you is a...',
      options: [
        'Deductible review',
        'Budget freeze',
        'Cost-benefit analysis',
        'Credit check',
      ],
      answerIndex: 2,
      explanation:
        'A cost-benefit analysis compares the benefits of buying a good or service with the costs, helping you decide whether it is worth it.',
    },
    {
      question:
        'Waiting a few weeks before buying a hyped-up new item, and often getting a better price or avoiding regret, is an example of...',
      options: [
        'Delayed gratification',
        'Opportunity cost',
        'Overdraft protection',
        'Liability coverage',
      ],
      answerIndex: 0,
      explanation:
        'That is delayed gratification. The longer you wait, the more value you may get, or the less regret you may feel.',
    },
    {
      question:
        'When evaluating a financial service, which of these should you watch out for because small charges can add up over time?',
      options: [
        'Free ATM access',
        'Hidden fees and subscriptions',
        'Mobile app alerts',
        'A waived monthly fee',
      ],
      answerIndex: 1,
      explanation:
        'Many services sneak in subscriptions and small hidden charges that quietly add up. Keep track of your payments!',
    },
    {
      question:
        'In the bank comparison, why might SecurePlus Checking appeal to someone who overdrafts often?',
      options: [
        'It pays customers $35 for each overdraft',
        'It has the cheapest ATM fees in town',
        'It offers free overdrafts up to $500',
        'It has no overdraft fees because it automatically declines transactions that would overdraw the account',
      ],
      answerIndex: 3,
      explanation:
        "SecurePlus auto-declines purchases that would overdraw the account, so there are no overdraft fees, unlike EasyBank's $35 fee per overdraft.",
    },
    {
      question:
        'The Would You Rather activity showed that investing $1,000 in Apple stock instead of buying an iPhone...',
      options: [
        'Guarantees you will double your money',
        'Is always worse than buying the phone',
        'Can grow your money but still carries a real risk of losing value',
        'Is illegal for anyone under 30',
      ],
      answerIndex: 2,
      explanation:
        'Investing is often the smarter financial move, but as the tariff twist showed, there is always a risk of losing money. Smart deciders weigh both risk and reward.',
    },
  ],
}

export default lesson
