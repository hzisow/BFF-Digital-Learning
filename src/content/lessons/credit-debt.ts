import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'credit-debt',
  week: 2,
  day: 2,
  title: 'Credit & Debt',
  emoji: '💳',
  description:
    'Understand how credit works, what affects your credit score, and how to borrow money responsibly.',
  durationMin: 18,
  sections: [
    {
      type: 'intro',
      heading: 'Borrow Now, Pay Later?',
      body:
        "Warm-up question: imagine you want something you can't afford right now. Would you wait and save up, or borrow money to get it today? Why? There's no single right answer, and that tension is exactly what today's lesson is about. By the end, you'll know how credit works, what a credit score really measures, and how to borrow without getting burned.",
    },
    {
      type: 'terms',
      heading: 'How Credit Works',
      terms: [
        {
          term: 'Credit',
          definition:
            'The ability to borrow money now and pay it back later, usually with interest. Lenders give credit based on trust that you will repay them.',
        },
        {
          term: 'Revolving credit',
          definition:
            'Credit with a set limit where you pay the amount due each month or make minimum monthly payments. Credit cards are the classic example.',
        },
        {
          term: 'Installment credit',
          definition:
            'A lump sum of money the borrower must repay in fixed installments by a certain date. Mortgages and car loans are examples.',
        },
      ],
    },
    {
      type: 'content',
      heading: 'What Is Credit Actually For?',
      body:
        "Credit is often used for large, expensive purchases, like a mortgage for a house, because most people can't pay for those in full. But credit also shows up in day-to-day life: many people use credit cards with cashback or other benefits for everyday purchases. Just don't confuse them with debit cards, which pull money directly from your checking account.",
      bullets: [
        'Big purchases: mortgages, car loans, and other things people rarely pay for all at once',
        'Everyday purchases: credit cards with cashback or perks',
        'Debit cards are different: they charge your checking account directly, no borrowing involved',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question: 'Which of these is an example of installment credit?',
        options: [
          'A credit card you pay off each month',
          'A debit card connected to your checking account',
          'A car loan repaid in fixed monthly payments by a set date',
          'Cashback rewards on groceries',
        ],
        answerIndex: 2,
        explanation:
          'Right! Installment credit gives you a lump sum that you repay in fixed installments by a certain date, like car loans and mortgages. Credit cards are revolving credit, and debit cards are not credit at all since they pull straight from your checking account.',
      },
    },
    {
      type: 'content',
      heading: 'Credit Scores: Your Financial Report Card',
      body:
        "A credit score is a 3-digit number that tells lenders how risky it is to lend to you. Credit scores use the system provided by FICO and range from 300 to 850. Higher is better. Your score affects whether you'll be approved for loans and what interest rate you'll get on them, so this little number can save (or cost) you a lot of money.",
    },
    {
      type: 'content',
      heading: 'The Five Factors of Your Credit Score',
      body:
        'Five things determine your credit score, and they are not weighted equally. The biggest one is simply paying your bills on time. Here they are, from heaviest to lightest.',
      bullets: [
        'Payment history (35%): paying bills on time',
        'Credit utilization (30%): how much of your available credit you use',
        "Length of credit history (15%): how long you've had credit accounts",
        'Credit mix (10%): your mix of credit types, revolving and installment',
        'New credit (10%): recent applications for new credit',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question: 'Which pair of activities would HELP your credit score?',
        options: [
          'Maxing out your credit card and opening five new cards in one week',
          'Always paying your credit card bill on time and only using 20% of your credit limit',
          'Ignoring your bills and closing your oldest account',
          'Only using cash for everything, forever',
        ],
        answerIndex: 1,
        explanation:
          'Yes! On-time payments are the biggest factor (35%) and keeping utilization low, like using only 20% of your limit, helps the second biggest factor (30%). Maxing out cards and opening five new cards in a week both hurt your score. Nice work!',
      },
    },
    {
      type: 'content',
      heading: 'Good Debt vs. Bad Debt',
      body:
        "Not all debt is created equal. Good debt is borrowing for things that help you make money or grow in value. Bad debt is borrowing for things that are unnecessary and won't help you in the long term. The trick is asking: will this debt leave me better off later, or just cooler-looking today?",
      bullets: [
        'Good: student loans can increase your potential income, as long as you manage money correctly',
        'Good: mortgages, as long as you stay on track with payments',
        'Good: business loans, which increase your potential income',
        'Bad: loans for wants like designer fashion, technology, or car leases',
      ],
    },
    {
      type: 'example',
      heading: 'The Payday Loan Trap',
      body:
        'Payday loans are short-term, high-interest loans that will only hurt you financially. They are marketed as help for people living "paycheck-to-paycheck," but in reality they almost always leave you in more debt than you started with. The high interest piles up fast, so you borrow again to cover it, and the cycle repeats. Steer clear.',
    },
    {
      type: 'content',
      heading: 'Understanding Credit Cards',
      body:
        "Credit cards can be an extremely powerful tool if used correctly. A credit card lets you borrow money up to a limit and pay it back later. If you pay it off in full each month, it's essentially a free loan. But if you don't pay the full amount by the due date, interest is charged on the balance, and paying only the minimum payment costs you more over time.",
      bullets: [
        'Pay in full every month and you pay zero interest',
        'Carry a balance and interest piles onto whatever you owe',
        'Minimum payments keep you in debt longer and cost more overall',
        'Some cards offer perks like cashback or travel points, but watch for traps!',
        'Already in debt? The snowball and avalanche methods are two strategies for paying it down',
      ],
    },
    {
      type: 'example',
      heading: 'Reading a Real Credit Card Offer',
      body:
        "Here's an example credit card: APR of 22.99%, credit limit of $1,000, annual fee of $0, minimum payment of $35 per month. Translation: you can borrow up to $1,000, and there's no yearly fee. But if you carry a balance, it grows at a steep 22.99% per year. Pay only the $35 minimum on a maxed-out card, and interest will eat most of that payment. Paying in full is the winning move.",
    },
    {
      type: 'content',
      heading: 'How Credit Card Companies Make Money',
      body:
        "Ever wonder why companies hand out cards with free rewards? Credit card companies make profit through interest when balances are left unpaid, and through fees: late payment fees, annual fees, and over-limit fees. Their business model counts on people slipping up. Your job is to not be that person.",
      bullets: [
        'Always pay off your balance in full every month',
        'Use your credit card for consistent monthly expenses you already budget for',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You have the example card with 22.99% APR. What happens if you only pay the $35 minimum payment on a big balance each month?',
        options: [
          'Interest keeps getting charged on the remaining balance, so it costs you more over time',
          'The balance disappears after three payments',
          'The company waives all interest as a reward',
          'Your credit limit automatically doubles',
        ],
        answerIndex: 0,
        explanation:
          'Exactly. Minimum payments barely dent the balance, so that 22.99% APR keeps charging interest on everything left over. Paying in full every month is what turns a credit card into an essentially free loan instead of an expensive one.',
      },
    },
    {
      type: 'content',
      heading: 'Wrapping Up',
      body:
        "Today you learned that credit is borrowed trust, your credit score is built mostly by paying on time and keeping utilization low, good debt helps your future while bad debt drains it, and credit cards are only free if you pay in full. Jot down what clicked and what needs review. Next session: Risk Management and Insurance, plus the Cover Your Bases activity!",
    },
  ],
  quiz: [
    {
      question: 'What is credit?',
      options: [
        'Money the government gives you for free',
        'The ability to borrow money now and pay it back later, usually with interest',
        'A type of savings account',
        'The money in your checking account',
      ],
      answerIndex: 1,
      explanation:
        'Credit means borrowing now and repaying later, usually with interest. Lenders extend credit based on trust that you will pay them back, which is exactly what your credit score measures.',
    },
    {
      question: 'A credit card is an example of which type of credit?',
      options: ['Installment credit', 'A debit account', 'Revolving credit', 'A payday loan'],
      answerIndex: 2,
      explanation:
        'Credit cards are revolving credit: you have a credit limit and pay the amount due each month (or make minimum payments). Installment credit, like mortgages and car loans, is a lump sum repaid in fixed payments by a set date.',
    },
    {
      question: 'What range do FICO credit scores fall in?',
      options: ['0 to 100', '100 to 1,000', '1 to 10', '300 to 850'],
      answerIndex: 3,
      explanation:
        'Credit scores use the FICO system and range from 300 to 850. The higher your score, the less risky you look to lenders, which means easier loan approvals and better interest rates.',
    },
    {
      question: 'Which factor has the BIGGEST impact on your credit score?',
      options: [
        'Payment history: paying your bills on time (35%)',
        'Credit mix (10%)',
        'New credit applications (10%)',
        'Length of credit history (15%)',
      ],
      answerIndex: 0,
      explanation:
        'Payment history is the heavyweight at 35%, followed by credit utilization at 30%. Simply paying every bill on time is the single most powerful thing you can do for your score.',
    },
    {
      question: 'Which of these is generally considered GOOD debt?',
      options: [
        'A payday loan to cover the weekend',
        'A loan for designer fashion',
        'A student loan that increases your potential income',
        'Financing a gaming setup you cannot afford',
      ],
      answerIndex: 2,
      explanation:
        'Good debt helps you make money or grow in value, like student loans, mortgages, and business loans (managed responsibly). Loans for wants like fashion and tech, and especially payday loans, are bad debt.',
    },
    {
      question: 'Why are payday loans considered dangerous?',
      options: [
        'They require excellent credit to get',
        'They are short-term, high-interest loans that almost always leave you in more debt than you started with',
        'They can only be used to buy houses',
        'They take too long to be approved',
      ],
      answerIndex: 1,
      explanation:
        'Payday loans are marketed as quick help between paychecks, but their extremely high interest traps borrowers in a cycle of re-borrowing. They almost always leave you worse off than before.',
    },
    {
      question: 'How do you use a credit card so that it works like a free loan?',
      options: [
        'Pay only the minimum payment each month',
        'Max out the card to earn maximum rewards',
        'Never activate the card',
        'Pay off your balance in full every month',
      ],
      answerIndex: 3,
      explanation:
        'If you pay your balance in full by the due date, no interest is ever charged, making the card essentially a free loan (sometimes with cashback on top). Carrying a balance or paying only the minimum is where the costs pile up.',
    },
    {
      question: 'How do credit card companies make most of their money?',
      options: [
        'Selling the physical plastic cards',
        'Interest on unpaid balances plus fees like late, annual, and over-limit fees',
        'Government grants',
        'Charging stores nothing and users nothing',
      ],
      answerIndex: 1,
      explanation:
        'Credit card companies profit from interest when balances go unpaid, plus late payment fees, annual fees, and over-limit fees. Pay in full and on time, and you flip the deal in your favor.',
    },
  ],
}

export default lesson
