import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'risk-insurance',
  week: 3,
  day: 1,
  title: 'Risk Management & Insurance',
  emoji: '🛡️',
  description:
    'Understand how to manage risks, budget insurance policies, and prepare yourself for the unexpected.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Welcome to Week 3!',
      body:
        "Life is full of surprises, and not all of them are the fun kind. A fender bender, a cracked phone screen, a sudden illness. Today you'll learn how insurance helps you prepare for the unexpected so one bad day doesn't wreck your finances. Let's cover our bases!",
    },
    {
      type: 'content',
      heading: 'Warm-Up: Protect It or Risk It?',
      body:
        "Think about an expensive item you use every day, like your phone. Would you rather pay $10 a month to protect it, or risk paying $1,000 later if something goes wrong? There's no single right answer, but this exact trade-off is what insurance is all about. Keep your answer in mind as we go.",
    },
    {
      type: 'content',
      heading: 'What Is Risk?',
      body:
        "Risk is the chance that something bad or unexpected will happen. Financial risk is the chance of losing money because of an accident, illness, theft, or disaster. Here's the key idea: everyone faces risk. You can't eliminate it, but you can absolutely prepare for it.",
      bullets: [
        'Getting into a car accident',
        'Not being able to work because of a sickness',
        'Having something valuable stolen',
        'A disaster damaging your home or belongings',
      ],
    },
    {
      type: 'content',
      heading: 'How Insurance Works',
      body:
        "Insurance is protection for the things you care about. You pay a little each month, called a premium, to avoid paying a huge amount if something bad happens. If disaster strikes, you file a claim, which is your request to the insurance company for help covering the loss. But there's a catch: almost every policy also has a deductible, the amount you must pay out of pocket before insurance covers the rest.",
    },
    {
      type: 'terms',
      heading: 'Insurance Vocabulary',
      terms: [
        {
          term: 'Risk',
          definition: 'The chance that something bad or unexpected will happen.',
        },
        {
          term: 'Financial Risk',
          definition:
            'The chance of losing money because of an accident, illness, theft, or disaster.',
        },
        {
          term: 'Premium',
          definition:
            'The small amount you pay each month to keep your insurance active.',
        },
        {
          term: 'Claim',
          definition:
            'The request you make to your insurance company for help covering a loss.',
        },
        {
          term: 'Deductible',
          definition:
            'The amount you must pay out of pocket before insurance covers the rest.',
        },
        {
          term: 'Coverage',
          definition:
            'What your policy protects, such as medical bills, car damage, or theft.',
        },
      ],
    },
    {
      type: 'example',
      heading: 'A Deductible in Action',
      body:
        "Say you have car insurance with a $500 deductible. You get into an accident and the repairs cost $2,000. You pay the first $500, and your insurance pays the remaining $1,500. Without insurance, that whole $2,000 bill would have been yours. Ouch.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You have insurance with a $300 deductible. A covered accident causes $1,200 in damage. How much do you pay out of pocket?',
        options: ['$1,200', '$300', '$900', '$0'],
        answerIndex: 1,
        explanation:
          'Nice work! The deductible is what you pay before insurance kicks in. You pay $300, and insurance covers the remaining $900.',
      },
    },
    {
      type: 'content',
      heading: 'The Big Idea: Transferring Risk',
      body:
        "The main idea behind insurance is the transference of risk. Bad things can still happen to you, but with insurance, you get financial assistance when they do. The risk is transferred from you (the insured) to the insurance company (the insurer). There are many types of insurance with different kinds of coverage, and even subtypes inside each one. For example, a high-deductible health plan is a subset of health insurance.",
    },
    {
      type: 'content',
      heading: 'Premiums and Deductibles: The Seesaw',
      body:
        "Premiums and deductibles are inversely related. When one goes up, the other goes down, like a seesaw. Choosing between them depends on how likely you are to file claims.",
      bullets: [
        'High premiums mean a low deductible. This is better if you have higher risk and expect to file more claims.',
        'A high deductible means low premiums. This is better if you have lower risk and rarely file claims.',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Maya rarely gets sick and almost never visits the doctor. Based on the premium-deductible seesaw, which plan probably makes more sense for her?',
        options: [
          'High premium, low deductible',
          'High premium, high deductible',
          'Low premium, high deductible',
          'No insurance at all, since she is healthy',
        ],
        answerIndex: 2,
        explanation:
          "Exactly! Since Maya rarely files claims, she can save money with lower monthly premiums and accept a higher deductible. And skipping insurance entirely is risky, because no one can predict the unexpected.",
      },
    },
    {
      type: 'content',
      heading: 'Types of Insurance: Health and Auto',
      body:
        "Health insurance is an agreement where an insurance company pays some or all of your medical expenses, like doctor visits, hospital stays, and medicines, in exchange for a monthly premium. Many health plans include a copayment, a set amount you pay when you see a doctor or dentist while the insurance company pays the rest. Auto insurance covers damage to your car and to others if you get into an accident.",
      bullets: [
        'Liability insurance is required by law in most states and covers damages to other people and their vehicles.',
        'Collision coverage pays for damage to your own vehicle in a crash.',
        'Comprehensive coverage handles damage not caused by collisions, like hail or theft.',
      ],
    },
    {
      type: 'video',
      heading: "Watch: I'm Young & Healthy — Can I Skip Health Insurance?",
      body:
        "Lots of young people figure they don't need health insurance. Two Cents runs the numbers on that gamble. The video pauses to quiz you, so stay sharp!",
      videoId: 'WTtjmdyTCRM',
      source: 'Two Cents · PBS Digital Studios',
      questions: [
        {
          at: 100,
          question: 'Why do even young, healthy people need health insurance?',
          options: [
            'It is a fashion statement',
            'Accidents and sudden illnesses can hit anyone — and the bills can be enormous',
            'Doctors refuse to see uninsured people',
            'They do not — young people never get sick',
          ],
          answerIndex: 1,
          explanation:
            'A single broken leg or emergency surgery can cost tens of thousands of dollars. You cannot schedule your accidents — that is exactly the kind of huge, unpredictable risk insurance exists to cover.',
        },
        {
          at: 240,
          question: 'At its core, what does insurance protect you from?',
          options: [
            'Ever having to pay a premium',
            'A giant surprise bill wiping out your finances',
            'Small everyday costs, like snacks',
            'Paying taxes',
          ],
          answerIndex: 1,
          explanation:
            "Insurance transfers the BIG risks — the catastrophic, budget-destroying bills — to the insurance company in exchange for a predictable premium. You handle the small stuff; it catches the disasters.",
        },
      ],
    },
    {
      type: 'content',
      heading: 'Types of Insurance: Home, Renters, and Life',
      body:
        "Homeowners insurance covers losses and damages to your residence, your furnishings, and other assets, plus liability coverage for accidents on the property. If a thief steals your flat-screen TV, you may be compensated for its cash value. Renters insurance is similar but protects tenants in a rented place like an apartment. If an apartment fire damages your clothes and laptop, renters insurance replaces them. Life insurance provides money to your beneficiaries, usually family, if you pass away. It matters most when someone depends on your income, like young children who cannot work. Common types include term and whole-life insurance.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Jordan rents an apartment. A kitchen fire destroys his laptop and clothes. Which insurance would replace his belongings?',
        options: [
          'Homeowners insurance',
          'Liability auto insurance',
          'Life insurance',
          'Renters insurance',
        ],
        answerIndex: 3,
        explanation:
          'You got it! Renters insurance protects tenants in a rented dwelling, covering personal property, liability claims, and extra living expenses when a unit is damaged.',
      },
    },
    {
      type: 'example',
      heading: 'Cover Your Bases: Planning for Ben',
      body:
        "In class, we play Cover Your Bases. You already made Ben's budget, and now you plan his insurance premiums with a $500 budget. The goal is to pick the coverage that fits his life best, using your whole budget without going over. At the end, we reveal what actually happened to Ben this month and see which premiums paid off. It's a great reminder that smart insurance choices are about matching coverage to real risks, not buying everything or nothing.",
    },
  ],
  quiz: [
    {
      question: 'What is financial risk?',
      options: [
        'The guarantee that you will lose money every year',
        'The chance of losing money because of an accident, illness, theft, or disaster',
        'The fee a bank charges for a checking account',
        'The interest you earn on a savings account',
      ],
      answerIndex: 1,
      explanation:
        'Financial risk is the chance of losing money due to accidents, illness, theft, or disaster. You cannot eliminate risk, but you can prepare for it.',
    },
    {
      question: 'What is a premium?',
      options: [
        'The amount you pay each month to keep your insurance active',
        'The amount you pay out of pocket before insurance covers a loss',
        'A request to your insurance company for help covering a loss',
        'A reward the insurance company pays you for safe driving',
      ],
      answerIndex: 0,
      explanation:
        'The premium is the small, regular payment you make, usually monthly, so that insurance protects you from paying a huge amount later.',
    },
    {
      question:
        'You have a $500 deductible on your car insurance and your accident repairs cost $2,000. How much does the insurance company pay?',
      options: ['$2,000', '$500', '$1,500', '$0'],
      answerIndex: 2,
      explanation:
        'You pay your $500 deductible first, and insurance pays the remaining $1,500 of the $2,000 repair bill.',
    },
    {
      question: 'The main idea behind insurance is best described as...',
      options: [
        'Eliminating all risk from your life',
        'Earning investment profits on monthly payments',
        'Avoiding taxes on large purchases',
        'Transferring risk from the insured to the insurer',
      ],
      answerIndex: 3,
      explanation:
        'Insurance transfers risk from you to the insurance company. Bad things can still happen, but you get financial assistance when they do.',
    },
    {
      question: 'How are premiums and deductibles related?',
      options: [
        'They are always exactly equal',
        'They are inversely related: when one is high, the other is low',
        'They both rise and fall together',
        'They have no relationship at all',
      ],
      answerIndex: 1,
      explanation:
        'Premiums and deductibles work like a seesaw. High premiums come with low deductibles, and high deductibles come with low premiums.',
    },
    {
      question:
        'Which type of auto insurance is required by law in most states?',
      options: [
        'Comprehensive coverage',
        'Collision coverage',
        'Liability insurance',
        'Rental reimbursement coverage',
      ],
      answerIndex: 2,
      explanation:
        'Liability insurance, which covers damages to other people and their vehicles, is required by law in most states.',
    },
    {
      question:
        'A set amount you pay when you visit the doctor while your health insurance pays the rest is called a...',
      options: ['Copayment', 'Beneficiary', 'Claim', 'Premium'],
      answerIndex: 0,
      explanation:
        'That set fee is a copayment. Many health insurance policies include copayments for doctor, dentist, and other health care visits.',
    },
    {
      question: 'Life insurance is usually most important for people who...',
      options: [
        'Want to protect their car from theft',
        'Rent an apartment instead of owning a home',
        'Never plan to visit a doctor',
        'Have someone who depends on their income, like young children',
      ],
      answerIndex: 3,
      explanation:
        'Life insurance provides money to your beneficiaries if you pass away, so it matters most when someone, like young children, relies on your income.',
    },
  ],
}

export default lesson
