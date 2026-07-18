import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'spending-budgeting',
  week: 1,
  day: 2,
  title: 'Spending & Budgeting',
  emoji: '🛒',
  description:
    'How to spend wisely, avoid impulse traps, and build a simple budget that works around your wants and needs.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Warm-Up: The $100 Question',
      body:
        "Welcome back to BFF Classroom — Week 1, Day 2! Quick warm-up before we start: if you were given $100 right now, what would you spend it on, and why? Seriously, picture it. Hold onto that answer, because by the end of this lesson you'll know whether that purchase was a need, a want, or a full-on spending trap. Today is all about spending wisely and building a budget that actually works.",
    },
    {
      type: 'content',
      heading: 'Needs vs. Wants',
      body:
        "Every dollar you spend goes toward either a need or a want. Needs are things you must have to survive and function; wants are things that make life nicer but aren't essential. Neither is bad — but confusing the two is how budgets fall apart.",
      bullets: [
        'Need: basic food and water — everyone needs them to survive, and budget-friendly groceries help fulfill this',
        'Need: clean air — access to unpolluted air is essential to staying healthy',
        'Need: shelter and clothing — they protect us from the elements and help us participate in daily life',
        'Want: eating out or ordering takeout often — convenient, but usually unnecessary and more expensive',
        'Want: the latest technology — tech can boost productivity, but it is not needed for daily life, even in our modern world',
        'Want: designer fashion — stylish clothes may boost confidence and social status, but they are not essential to meet basic needs',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Your winter coat rips beyond repair, so you buy a replacement. Your friend buys a third designer hoodie to match his sneakers. Which statement is true?',
        options: [
          'Both purchases are wants',
          'Both purchases are needs',
          'Your coat is a need; the third designer hoodie is a want',
          'Clothing is never a need',
        ],
        answerIndex: 2,
        explanation:
          "Nailed it. Clothing that protects you from the elements is a need. But designer fashion — especially a third hoodie — is a want: it might boost confidence and style, but it isn't essential. Same category, very different purchases.",
      },
    },
    {
      type: 'content',
      heading: 'Creating a Budget: B.U.I.L.D.',
      body:
        "Creating a budget is one of the most important skills in managing your finances. To remember the process, use the acronym B.U.I.L.D.: Begin with a goal, Understand your income, Identify your expenses, Limit your spending, and Develop a habit. We'll walk through each letter, one step at a time.",
    },
    {
      type: 'content',
      heading: 'B — Begin With a Goal',
      body:
        "Every budget begins with your goals. Decide exactly what you're budgeting for — saving up for a new phone, building your investment portfolio, or buying a car. And every goal you set should be SMART:",
      bullets: [
        'Specific — make your goal precise; this keeps you on the right track',
        'Measurable — you should be able to make sense of your results along the way',
        'Attainable — do not set your expectations too high',
        'Relevant — make sure your goals fit your actual situation',
        'Timely — give it a time period',
      ],
    },
    {
      type: 'example',
      heading: 'SMART or Not? You Decide',
      body:
        "Let's grade some goals. 'I will save $150 over the next 3 months to buy new running shoes' — SMART: specific, measurable, and on a timeline. 'I will set aside $10 per week for 6 months to build a $240 emergency fund' — SMART. 'I will pay back my $60 debt to my friend within 4 weeks by saving $15 per week' — SMART. But 'I want to save money someday to buy a car'? No amount, no deadline — not SMART. And 'I will spend less money on food and stuff this month'? 'Less' and 'stuff' are not measurable. Vague goals are where budgets go to nap.",
    },
    {
      type: 'content',
      heading: 'U — Understand Your Income',
      body:
        "After setting your goals, start taking account of your cash inflows and outflows — this step is what most people picture when they hear the word 'budgeting.' Figure out how much money you bring in regularly: from jobs, weekly allowance, gifts, and so on. For example, Joe earns $80 a week babysitting for his neighbors. That $80 is the raw material his whole budget is built from.",
    },
    {
      type: 'content',
      heading: 'I — Identify Your Expenses',
      body:
        "This step goes hand-in-hand with the last one. List all your spending over a set period of time — needs like food and bills, and wants like shopping, snacks, and subscriptions. For example: 'I spend $450 a month on needs and $200 a month on wants.' You can get more specific by grouping expenses into categories, like this sample adult budget totaling $3,840 a month:",
      bullets: [
        'Housing: rent $1,700 — total $1,700',
        'Transportation: auto loan $380, insurance $100, gas $200 — total $680',
        'Living: groceries $800, utilities about $300 — total $1,100',
        'Miscellaneous: credit cards $75, cell phone $185, entertainment $100 — total $360',
      ],
    },
    {
      type: 'content',
      heading: 'L — Limit Your Spending',
      body:
        "Now that you've identified both your income and expenses, it's time to actually divide your money according to your budget. Use the 50/30/20 rule as an outline: 50% of your money goes toward needs, 30% toward wants, and 20% toward savings. It's a starting point, not a law — tweak it according to your situation.",
    },
    {
      type: 'content',
      heading: 'D — Develop a Habit',
      body:
        "The last step in creating a budget is the hardest and most important: actually following the plan you've created. The easiest way is to track your purchases. Use a notebook, spreadsheet, or app to record what you spend, and adjust your plan when needed. A budget you ignore is just a nicely formatted wish list.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Using the 50/30/20 rule, if you bring in $200 a month, how much should go to savings?',
        options: ['$100', '$60', '$40', '$20'],
        answerIndex: 2,
        explanation:
          'Yes! The 50/30/20 rule sends 20% to savings — and 20% of $200 is $40. The other splits: $100 (50%) toward needs and $60 (30%) toward wants. And remember, you can tweak the percentages to fit your situation.',
      },
    },
    {
      type: 'content',
      heading: 'Tracking Your Spending',
      body:
        "Keeping track of your budget and spending is one of the best ways to reach your financial goals. It makes sure you never find yourself in a tight spot and are always ready for what comes next. Tracking helps you avoid overspending — because if you don't know where your money goes, you'll never know where it disappears. Luckily, there are loads of ways to track:",
      bullets: [
        'Notebook or journal — a little old-fashioned, but physical copies help you keep things straight',
        'Spending apps — Mint, Goodbudget, or even your Notes app can track day-to-day spending',
        'Bank and credit card statements — you will never get a more accurate record than your actual purchase history',
      ],
    },
    {
      type: 'content',
      heading: 'Tips on Tracking',
      body:
        'Three habits that make tracking stick. First, check your spending every few days instead of waiting until the end of the month, so you always know where you stand. Second, set weekly or monthly limits on categories like fast food, personal items, games, and subscriptions — remember the 50/30/20 rule. Third, celebrate small wins! Be genuinely happy for yourself when you stay under budget. A slideshow can only go so far — it takes a strong person to go the extra mile and not overspend.',
    },
    {
      type: 'content',
      heading: 'Common Spending Traps',
      body:
        'A spending trap is a habit, purchase, or decision that causes you to spend more money than you realize or intend to — often without thinking. Here are the big three, plus how to escape each one. Final tip: before any purchase, ask yourself — will I care about this a week from now? If not, skip it.',
      bullets: [
        "Impulse buying — you see something, want it now, and buy it without thinking. Solution: the 24-hour rule — wait a day before buying a want",
        'Subscription spending — piling up streaming services, apps, and gamepasses that auto-renew. Solution: do a subscription audit every few months',
        'Peer pressure and FOMO — spending to keep up with friends on new clothes, events, and more. Solution: suggest cheaper alternatives',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "You're about to buy a $30 phone game skin the moment you see it. Which strategy best fights this spending trap?",
        options: [
          'Buy it fast before you talk yourself out of it',
          'Use the 24-hour rule and wait a day before deciding',
          'Add three more items so the shipping feels worth it',
          'Subscribe so the skins auto-renew monthly',
        ],
        answerIndex: 1,
        explanation:
          "Exactly — that see-it-want-it-buy-it feeling is impulse buying, and the 24-hour rule is the antidote: wait a day before buying a want. Bonus move: ask yourself if you'll care about it a week from now. If not, skip it.",
      },
    },
  ],
  quiz: [
    {
      question: 'Which of the following is a NEED rather than a want?',
      options: [
        'Ordering takeout most nights',
        'The newest smartphone on release day',
        'Designer fashion',
        'Budget-friendly groceries',
      ],
      answerIndex: 3,
      explanation:
        'Basic food and water are needs, and budget-friendly groceries fulfill them. Frequent takeout, the latest tech, and designer fashion are wants — nice to have, but not essential to survive and function.',
    },
    {
      question: 'What does the acronym B.U.I.L.D. stand for in budgeting?',
      options: [
        'Begin with a goal, Understand your income, Identify your expenses, Limit your spending, Develop a habit',
        'Buy less, Use coupons, Invest early, Limit debt, Diversify',
        'Budget monthly, Understand taxes, Insure everything, Lend wisely, Donate often',
        'Begin saving, Use cash, Ignore wants, List needs, Defer purchases',
      ],
      answerIndex: 0,
      explanation:
        'B.U.I.L.D. is the five-step budgeting process: Begin with a goal, Understand your income, Identify your expenses, Limit your spending, and Develop a habit.',
    },
    {
      question: "Which of these goals is SMART?",
      options: [
        'I want to save money someday to buy a car',
        'I will spend less money on food and stuff this month',
        'I will save $150 over the next 3 months to buy new running shoes',
        'I hope to be rich eventually',
      ],
      answerIndex: 2,
      explanation:
        'Saving $150 over 3 months for running shoes is Specific, Measurable, Attainable, Relevant, and Timely. The others are vague — no clear amount, no deadline, no way to measure progress.',
    },
    {
      question: 'Under the 50/30/20 rule, what should the 30% go toward?',
      options: ['Savings', 'Wants', 'Needs', 'Taxes'],
      answerIndex: 1,
      explanation:
        'The 50/30/20 rule sends 50% toward needs, 30% toward wants, and 20% toward savings. It is an outline you can tweak to fit your own situation.',
    },
    {
      question: 'Why does tracking your spending matter?',
      options: [
        'It automatically increases your income',
        'It lets you skip making a budget entirely',
        'Banks require customers to track spending',
        "It helps you avoid overspending — if you don't know where your money goes, you'll never know where it disappears",
      ],
      answerIndex: 3,
      explanation:
        'Tracking keeps you out of tight spots and ready for what comes next. Whether you use a notebook, an app, or your bank statements, knowing where your money goes is how you keep it from disappearing.',
    },
    {
      question:
        'You notice you are paying for five streaming services and three game subscriptions that auto-renew. What is the recommended solution?',
      options: [
        'Do a subscription audit every few months',
        'Apply the 24-hour rule to each renewal',
        'Ask friends to split every subscription',
        'Switch them all to annual billing',
      ],
      answerIndex: 0,
      explanation:
        'That pile of auto-renewing services is subscription spending, one of the most common spending traps. The fix is a subscription audit every few months — reviewing what you pay for and canceling what you no longer use.',
    },
    {
      question:
        'Your friends are all going to an expensive event and you feel pressure to spend money you had budgeted for savings. Which spending trap is this, and what is one solution?',
      options: [
        'Impulse buying; solve it with a spending app',
        'Subscription spending; solve it by canceling the event',
        'Peer pressure and FOMO; solve it by suggesting cheaper alternatives',
        'The 50/30/20 rule; solve it by spending the savings',
      ],
      answerIndex: 2,
      explanation:
        'Spending to keep up with friends is the peer pressure and FOMO trap. Suggesting cheaper alternatives lets you keep the friendship and the budget. Your savings category will thank you.',
    },
    {
      question: 'Before buying something you want, what final question does this lesson suggest asking yourself?',
      options: [
        'Can I put it on a credit card?',
        'Will I care about this purchase a week from now?',
        'Is it on sale right now?',
        'Do my friends already own it?',
      ],
      answerIndex: 1,
      explanation:
        "The final tip: ask yourself whether you'll care about the purchase a week from now. If the answer is no, skip it — that one question filters out most impulse buys before they happen.",
    },
  ],
}

export default lesson
