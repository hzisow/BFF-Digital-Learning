import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'paying-for-college',
  week: 5,
  day: 3,
  title: 'Paying for College',
  emoji: '🎓',
  description:
    'Learn to shrink scary sticker prices, stack free money before loans, and shop for college like the smartest purchase of your life — because it just might be.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'The Biggest Purchase of Your Teenage Life',
      body:
        "College can be one of the best investments you'll ever make — and one of the most expensive. But here's the secret almost nobody tells you: the giant price on the website is like the first price at a flea market. Almost nobody pays it. Today you'll learn how financial aid actually works, how to compare offers like a pro shopper, and how to make sure a degree pays you back. 🎓",
    },
    {
      type: 'content',
      heading: 'Sticker Price vs. Net Price',
      body:
        "The sticker price (officially the 'cost of attendance') is the full published cost: tuition, fees, housing, food, and books. The net price is what YOU actually pay after grants and scholarships are subtracted. These can be wildly different — a private college with a $60,000 sticker can end up cheaper than a state school with a $28,000 sticker once aid is applied. Never cross a school off your list from the sticker price alone.",
      bullets: [
        'Sticker price = the full published cost of attendance',
        'Net price = sticker price minus free money (grants + scholarships)',
        "Most colleges have a 'net price calculator' on their website — try it before you apply",
        'Compare colleges by net price, never by sticker price',
      ],
    },
    {
      type: 'content',
      heading: 'FAFSA: The Form That Unlocks the Vault',
      body:
        "The FAFSA — Free Application for Federal Student Aid — is THE key that unlocks most financial aid in America. You (and a parent or guardian) fill it out online for free each fall of your senior year and every year of college. It uses your family's financial info to figure out what aid you qualify for. Skipping it is like leaving a scholarship check on the sidewalk: billions in aid goes unclaimed every year because students never applied.",
      bullets: [
        'FAFSA is 100% FREE to file at studentaid.gov — never pay a site to submit it',
        'It unlocks federal grants, work-study, and federal student loans',
        'Many states and colleges also use it to award their own aid',
        'File it every year, even if you think your family earns too much — you might be surprised',
      ],
    },
    {
      type: 'terms',
      heading: 'The Financial Aid Menu',
      terms: [
        {
          term: 'FAFSA',
          definition:
            'The Free Application for Federal Student Aid — the free government form that determines your eligibility for grants, work-study, and federal loans.',
        },
        {
          term: 'Grant',
          definition:
            'Free money for college, usually based on financial need (like the federal Pell Grant). You never pay it back.',
        },
        {
          term: 'Scholarship',
          definition:
            'Free money usually awarded for merit — grades, sports, art, essays, community service. Also never paid back, and you can stack many small ones.',
        },
        {
          term: 'Work-study',
          definition:
            'A federal program that gives you a part-time campus job so you can earn money for expenses while enrolled.',
        },
        {
          term: 'Subsidized loan',
          definition:
            'A need-based federal loan where the government pays the interest while you are in school — the friendliest loan you can get.',
        },
        {
          term: 'Unsubsidized loan',
          definition:
            'A federal loan available regardless of need, but interest starts growing from day one, even while you are still in class.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Which of these do you NOT have to pay back after college?',
        options: [
          'A subsidized federal loan',
          'An unsubsidized federal loan',
          'A private bank loan',
          'A Pell Grant',
        ],
        answerIndex: 3,
        explanation:
          'Grants and scholarships are free money — they never get paid back. Every kind of loan, no matter how friendly the terms, must be repaid with interest. That is why the golden order is: free money first, loans last.',
      },
    },
    {
      type: 'content',
      heading: 'The Golden Order: Free Money First',
      body:
        "Not all aid is created equal, so smart students take it in a strict order. First, grab every grant and scholarship you can — that money is free. Next, take work-study if offered; you earn it, but you never owe it. Only THEN consider loans, and even those have a ranking: subsidized federal loans first (the government covers your interest while in school), unsubsidized federal loans second (interest ticks from day one), and private loans dead last — they usually have higher rates and far fewer protections.",
      bullets: [
        '1. Grants and scholarships — free, never repaid',
        '2. Work-study — earned money, never owed',
        '3. Subsidized federal loans — no interest while in school',
        '4. Unsubsidized federal loans — interest grows from day one',
        '5. Private loans — a last resort only',
      ],
    },
    {
      type: 'example',
      heading: 'Example: The Award Letter Showdown',
      body:
        "Amara gets into two schools. College A has a $32,000 sticker price and offers her an $18,000 grant-and-scholarship package — net price: $14,000. College B has a $22,000 sticker price but offers only $5,000 in free money — net price: $17,000. Plot twist: the 'expensive' school is actually $3,000 per year cheaper — $12,000 cheaper over four years! But watch out: College B's letter also lists a $7,500 loan in big friendly letters as part of the 'award.' Loans are not a discount — they are just a bill with a delay. 🔍",
    },
    {
      type: 'content',
      heading: 'Reading Award Letters Like a Pro',
      body:
        "After you're accepted, each college sends a financial aid award letter — and some are sneakily designed to make the school look cheaper than it is. Some letters mix loans right in with grants so the 'total aid' looks huge. Your job: separate the free money from the borrowed money, and calculate the real net price yourself.",
      bullets: [
        'Subtract ONLY grants and scholarships from the sticker price to get net price',
        'Loans and work-study are not discounts — never subtract them',
        "Check if scholarships are renewable for all four years, and what GPA keeps them",
        'Ask each school for the same numbers so you can compare apples to apples',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "A college's sticker price is $30,000. Your award letter lists a $12,000 scholarship, $2,000 work-study, and a $5,500 loan. What is your real net price?",
        options: [
          '$10,500 — subtract everything on the letter',
          '$18,000 — subtract only the $12,000 scholarship',
          '$12,500 — subtract the scholarship and loan',
          '$30,000 — aid never changes the price',
        ],
        answerIndex: 1,
        explanation:
          'Perfect! Only free money lowers your price: $30,000 - $12,000 = $18,000 net price. The work-study is money you would have to earn, and the loan is money you would have to pay back — neither one is a discount.',
      },
    },
    {
      type: 'content',
      heading: 'The Community College Power Move',
      body:
        "Here's a route that saves students tens of thousands of dollars: two years at a community college (often around $4,000 per year in tuition), then transferring to a four-year university to finish your bachelor's degree. Your diploma looks exactly the same as everyone else's — it only lists the school you graduated from. Many states even have guaranteed transfer agreements with their public universities. Two years at $4,000 instead of $25,000 can mean graduating with little or no debt. That is a power move, not a plan B. 💪",
    },
    {
      type: 'content',
      heading: 'ROI: Think Like an Investor',
      body:
        "A degree is an investment, so think about its return. Research the starting salaries for careers you're considering — an engineering grad might start around $75,000 while some fields start closer to $40,000. Neither is 'wrong,' but your borrowing should match your future income. The classic rule of thumb: try to borrow LESS in total than your expected first-year salary. If you expect to earn $50,000 in year one, keep total loans under $50,000 — that usually keeps payments manageable. Debt way beyond that number can shadow you for decades.",
      bullets: [
        'Rule of thumb: total student debt below your expected first-year salary',
        'Look up real starting salaries for majors and careers before you borrow',
        'A lower-cost path to the same career is a higher return on investment',
        'Trades, certificates, and apprenticeships are strong ROI paths too — college is one route, not the only one',
      ],
    },
    {
      type: 'example',
      heading: "Example: Maya's ROI Game Plan",
      body:
        'Maya wants to be a teacher and finds that starting salaries near her are around $46,000 — so her borrowing ceiling is $46,000, and her stretch goal is way less. Her plan: two years at community college ($4,200 per year), then transfer to her state university ($11,000 per year after a $4,000 renewable transfer scholarship). Total four-year tuition: about $30,400. With a part-time job, a Pell Grant, and summer work, she borrows just $15,000 total — one third of her borrowing ceiling. Same classroom, same diploma, and a monthly loan payment her teacher salary can handle easily. 🍎',
    },
  ],
  quiz: [
    {
      question: 'What is the difference between sticker price and net price?',
      options: [
        'Sticker price includes housing; net price is tuition only',
        'Net price is the published cost; sticker price is what you pay',
        'Sticker price is the full published cost; net price is what you actually pay after grants and scholarships',
        'They are always the same number',
      ],
      answerIndex: 2,
      explanation:
        'The sticker price is the full published cost of attendance, while net price subtracts your free money (grants and scholarships). Since most students get some aid, net price is the number that matters when comparing schools.',
    },
    {
      question: 'What does filing the FAFSA cost, and what does it unlock?',
      options: [
        'It costs $99 and unlocks scholarships only',
        'It is free and unlocks federal grants, work-study, and federal student loans',
        'It is free but only wealthy families qualify',
        'It costs $50 and guarantees admission to state schools',
      ],
      answerIndex: 1,
      explanation:
        'The FAFSA is completely free at studentaid.gov and is the gateway to federal grants, work-study, and federal loans — plus much state and college aid. Any site charging you to file it is a scam.',
    },
    {
      question: 'What is the key difference between subsidized and unsubsidized federal loans?',
      options: [
        'Subsidized loans never have to be repaid',
        'Unsubsidized loans are only for graduate students',
        'Subsidized loans have no dollar limit',
        'The government pays the interest on subsidized loans while you are in school; unsubsidized loans grow interest from day one',
      ],
      answerIndex: 3,
      explanation:
        'Both are federal loans you must repay, but subsidized loans (based on financial need) charge no interest while you are enrolled because the government covers it. Unsubsidized loans start accruing interest immediately.',
    },
    {
      question: 'What is work-study?',
      options: [
        'A federal program giving you a part-time job to earn money for college expenses',
        'A grant for students who promise to study more',
        'A loan you repay by working after graduation',
        'A homework-help subscription service',
      ],
      answerIndex: 0,
      explanation:
        'Work-study is a federal program (unlocked by the FAFSA) that provides part-time jobs, often on campus, so students can earn money while enrolled. You earn it as wages — it is never owed back, but it is not a discount either.',
    },
    {
      question:
        'College X: $40,000 sticker with $24,000 in grants. College Y: $25,000 sticker with $6,000 in grants. Which is cheaper to attend?',
      options: [
        'College Y — its sticker price is lower',
        'College X — its net price is $16,000 versus $19,000 for College Y',
        'They cost the same',
        'Impossible to tell without loan amounts',
      ],
      answerIndex: 1,
      explanation:
        'Net price is what counts: College X costs $40,000 - $24,000 = $16,000, while College Y costs $25,000 - $6,000 = $19,000. The school with the scarier sticker is actually $3,000 cheaper per year — which is exactly why you never judge by sticker price.',
    },
    {
      question:
        'Jordan expects a $48,000 starting salary in his chosen career. By the rule of thumb, what is the most total student debt he should take on?',
      options: [
        'Whatever the college offers him',
        'About $96,000 — double his salary is fine',
        'Under $48,000 — total borrowing below his expected first-year salary',
        '$0 — all student loans are always a mistake',
      ],
      answerIndex: 2,
      explanation:
        'The rule of thumb says keep total borrowing under your expected first-year salary — for Jordan, under $48,000 — so payments stay manageable. Borrowing less is even better, but modest loans for a degree with solid earning power can be a reasonable investment.',
    },
  ],
}

export default lesson
