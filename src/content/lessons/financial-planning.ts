import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'financial-planning',
  week: 4,
  day: 1,
  title: 'Financial Planning',
  emoji: '🗺️',
  description:
    'Learn how to set SMART financial goals for the future and build a simple plan to reach them.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Fast-Forward 15 Years',
      body:
        'Imagine you could fast-forward 15 years. What is one thing you hope to have accomplished financially, and what would it take to get there? Maybe a car, a place of your own, or a degree. Today is all about turning those big someday dreams into an actual plan with steps you can start now.',
    },
    {
      type: 'content',
      heading: 'SMART Goals: A Quick Reminder',
      body:
        'Think back to our second week together. When you plan for your future, every financial goal you set should follow the SMART acronym. Goals like "I want to be rich" are vague. Goals like "Save $500 for a laptop in 4 months" give you a clear target and a timeline.',
      bullets: [
        'Specific - Make your goal precise. This keeps you on the right track.',
        'Measurable - You should be able to make sense of your results along the way.',
        'Attainable - Do not set your expectations too high.',
        'Relevant - Make sure your goals fit your situation.',
        'Timely - Give your goal a time period.',
      ],
    },
    {
      type: 'example',
      heading: 'Rewrite This Goal',
      body:
        'Here is a goal that needs work: "I want to get a car." It is not specific, there is no number to measure, and there is no deadline. A SMART version might be: "Save $3,000 for a used car by saving $250 a month for the next 12 months." Same dream, but now you know exactly what to do every month and when you will get there.',
    },
    {
      type: 'content',
      heading: 'Prioritizing Financial Goals',
      body:
        'Not all goals are equally urgent or important. Financial goals come in three sizes based on how long they take. Needs versus wants play a role too: emergency savings may take priority over entertainment. (Throwback to week 2 again!)',
      bullets: [
        'Short-term (within 1 year): new shoes, a trip',
        'Medium-term (1 to 5 years): buying a laptop, saving for a car',
        'Long-term (5+ years): college, moving out',
      ],
    },
    {
      type: 'content',
      heading: 'How to Prioritize',
      body:
        'When you have more goals than money (which is basically always), ask yourself: "What is most important right now?" Then weigh each goal against a few key factors before deciding where your dollars go first.',
      bullets: [
        'Time frame - How soon do you need it?',
        'Urgency - What happens if you wait?',
        'Cost - How much will it take to get there?',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question: 'Which of the following would be considered a short-term financial goal?',
        options: [
          'Save $500 to buy a phone in 3 months',
          'Save $5,000 for a car in 2 years',
          'Save $20,000 for college tuition in 5 years',
          'Build an emergency fund for unexpected medical costs far in the future',
        ],
        answerIndex: 0,
        explanation:
          'Nice work! Short-term goals happen within 1 year, and 3 months definitely qualifies. The car is medium-term (1 to 5 years), and college tuition and a far-off emergency fund are long-term goals.',
      },
    },
    {
      type: 'content',
      heading: 'Life Milestone Management',
      body:
        'You will face some major life milestones in the future: graduation, getting a license, going to college, moving out. Each one has costs, some obvious and some hidden, and each requires preparation. Planning ahead relieves the pressure and lets you make SMARTer decisions. (Get it?)',
      bullets: [
        'Getting your license = cost of driver’s ed, DMV fees, insurance',
        'Moving out = rent, furniture, groceries',
        'College = tuition, supplies, transportation, room and board',
      ],
    },
    {
      type: 'content',
      heading: 'What "Planning Ahead" Actually Means',
      body:
        'Planning ahead is not just vaguely worrying about the future. It is a set of concrete strategies you can use for any milestone coming your way.',
      bullets: [
        'Anticipate the cost: research average prices, and know which costs are one-time (like a deposit) vs. recurring (like rent).',
        'Set a timeline: when do you expect the milestone to happen? How many months until then?',
        'Create a mini goal: for example, "I want $1,200 saved for apartment expenses in 6 months." Use the SMART format if possible.',
        'Work backwards: $1,200 divided by 6 months = $200 per month. Build that into your budget and figure out which expenses you can reduce to make room.',
        'Build a buffer: always add a little extra for hidden costs. If you think you need $800, aim for $900 or more.',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You want $1,200 saved for apartment expenses in 6 months. Using the "work backwards" strategy, how much should you save each month?',
        options: ['$100', '$150', '$200', '$600'],
        answerIndex: 2,
        explanation:
          'Exactly right! $1,200 divided by 6 months is $200 per month. Working backwards turns a big scary number into a monthly amount you can actually build into your budget.',
      },
    },
    {
      type: 'content',
      heading: 'The Baby Steps: Dave Ramsey',
      body:
        'Dave Ramsey is an esteemed entrepreneur and financial coach who has built a huge following on his radio show, podcasts, and YouTube channels. His "Baby Steps" are one of the best ways to get yourself on track for financial greatness as a young individual. There are seven steps, and each one builds on the last.',
    },
    {
      type: 'content',
      heading: 'Baby Steps 1-3: Build Your Foundation',
      body:
        'The first three steps are all about safety. According to Dave Ramsey, the first step toward your financial goals is building your emergency foundation, then knocking out debt, then growing that foundation even bigger.',
      bullets: [
        'Step 1 - Build a starter emergency fund: save $1,000 to keep you out of bad-debt situations. You might use it for a flat tire or a shattered window.',
        'Step 2 - Pay off all debt (except your mortgage) using the debt snowball: line up debts from smallest to largest, make minimum payments on everything except the smallest, attack that one, then move up the line.',
        'Step 3 - Grow a fully-funded emergency fund: once you are debt free (besides the mortgage), save 3 to 6 months of expenses and bills. This keeps you safe and stable in most situations.',
      ],
    },
    {
      type: 'content',
      heading: 'Baby Steps 4-7: Build Your Future',
      body:
        'With a solid foundation and no debt weighing you down, the later steps shift from playing defense to playing offense: growing wealth, finishing the house, and giving back.',
      bullets: [
        'Step 4 - Invest in your retirement: aim to invest roughly 15% of your household income. Being debt free lets you do this with no stress.',
        'Step 5 - Save for your children’s college: this step may not apply to everyone, which is why retirement comes first. Think back to Saving and Investing and consider an ESA or a 529.',
        'Step 6 - Pay off your home early: with everything else handled, focus on the mortgage and become fully debt free faster than you would think.',
        'Step 7 - Build and give generously: with total freedom over your money, start financial futures for your descendants and help others. Giving generously is the ultimate outcome of the Baby Steps.',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question: 'In the debt snowball method, which debt do you focus on paying off first?',
        options: [
          'The debt with the highest interest rate',
          'The smallest debt',
          'The largest debt',
          'Your mortgage',
        ],
        answerIndex: 1,
        explanation:
          'You got it! The debt snowball lines up your debts from smallest to largest. You make minimum payments on everything else and attack the smallest first. Each payoff is a quick win that keeps you motivated to roll on to the next one.',
      },
    },
    {
      type: 'content',
      heading: 'Wrapping Up',
      body:
        'Jot down a quick summary of the lesson. Which concepts clicked for you? Which ones do you want to work on a little more? Next session we cover Consumer Protection, play the Let’s Go Phishing! activity, and finish with an end-of-lesson quiz. For now, let’s test your skills!',
    },
  ],
  quiz: [
    {
      question: 'Which of these is the best example of a SMART financial goal?',
      options: [
        'I want to be rich someday',
        'Save $500 for a laptop in 4 months',
        'Get a lot of money for a car',
        'Stop spending so much eventually',
      ],
      answerIndex: 1,
      explanation:
        'Correct! "Save $500 for a laptop in 4 months" is Specific, Measurable, Attainable, Relevant, and Timely. The other options are vague wishes with no clear target or timeline.',
    },
    {
      question: 'What does the "T" in SMART stand for?',
      options: ['Tough', 'Total', 'Timely', 'Tested'],
      answerIndex: 2,
      explanation:
        'Timely! Every SMART goal needs a time period. A deadline turns "someday" into a real plan you can measure your progress against.',
    },
    {
      question: 'Saving for a car you plan to buy in 3 years is what kind of financial goal?',
      options: ['Short-term', 'Medium-term', 'Long-term', 'Emergency'],
      answerIndex: 1,
      explanation:
        'Right! Medium-term goals take 1 to 5 years, so a car in 3 years fits perfectly. Short-term goals happen within a year, and long-term goals take 5 or more years.',
    },
    {
      question:
        'You estimate moving out will cost $800. Using the "build a buffer" strategy, how much should you actually aim to save?',
      options: ['$400, since you can borrow the rest', 'Exactly $800', '$900 or more', '$100'],
      answerIndex: 2,
      explanation:
        'Yes! Always add a little extra for hidden costs. If you think you need $800, aim for $900 or more. Milestones almost always come with surprise expenses, and the buffer keeps them from wrecking your plan.',
    },
    {
      question: 'What is Baby Step 1 in Dave Ramsey’s plan?',
      options: [
        'Invest 15% of your income into retirement',
        'Pay off your mortgage early',
        'Save 3 to 6 months of expenses',
        'Save $1,000 for a starter emergency fund',
      ],
      answerIndex: 3,
      explanation:
        'Correct! The very first step is a $1,000 starter emergency fund. It is meant to keep you out of bad-debt situations when life throws you a flat tire or a shattered window.',
    },
    {
      question:
        'After becoming debt free (except the mortgage), how much should your fully-funded emergency fund cover?',
      options: [
        '3 to 6 months of expenses and bills',
        'Exactly $1,000',
        'One year of your salary',
        '15% of your household income',
      ],
      answerIndex: 0,
      explanation:
        'That is it! Baby Step 3 grows your starter fund into 3 to 6 months of expenses and bills, keeping you safe and financially stable in most situations.',
    },
    {
      question:
        'According to the Baby Steps, roughly what percent of your household income should you invest for retirement?',
      options: ['5%', '50%', '15%', '30%'],
      answerIndex: 2,
      explanation:
        'Correct! Baby Step 4 says to invest roughly 15% of your household income into retirement funds. Being debt free first is the key that lets you do this with no stress.',
    },
    {
      question: 'What is the ultimate outcome of completing all seven Baby Steps?',
      options: [
        'Owning as many cars as possible',
        'Building wealth and giving generously',
        'Never having to budget again',
        'Getting the highest possible credit limit',
      ],
      answerIndex: 1,
      explanation:
        'Exactly! Baby Step 7 is to build and give generously. Once you are fully debt free, you have the freedom to help others, start financial futures for your descendants, and make the world better through your hard work.',
    },
  ],
}

export default lesson
