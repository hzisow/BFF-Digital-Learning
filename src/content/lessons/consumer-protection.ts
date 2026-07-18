import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'consumer-protection',
  week: 4,
  day: 2,
  title: 'Consumer Protection',
  emoji: '🛡️',
  description:
    'Learn how to recognize scams, protect your identity, and understand your rights as a consumer.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Something Phishy Is Going On',
      body:
        'What is the sketchiest text, email, or ad you have ever seen? How did you know it was fake — or did it trick you? Scammers are everywhere, and they love targeting people your age. Today you will learn how to spot their tricks, protect your identity, and know your rights as a consumer.',
    },
    {
      type: 'content',
      heading: 'Consumer Protection Basics',
      body:
        'Children and teens are common targets for digital scams and identity theft because of their online habits and lack of experience. This is not a small problem: 38% of people who reported a fraud said they lost money (FTC, 2024). The good news? There is a whole system built to defend you.',
    },
    {
      type: 'terms',
      heading: 'Who Has Your Back',
      terms: [
        {
          term: 'Consumer Protection',
          definition:
            'The laws, agencies, and tools that defend people against scams, fraud, and shady business practices.',
        },
        {
          term: 'Federal Trade Commission (FTC)',
          definition:
            'Federal agency that enforces antitrust laws and protects consumers.',
        },
        {
          term: 'Consumer Financial Protection Bureau (CFPB)',
          definition:
            'Agency charged with overseeing consumer-related financial products and services.',
        },
        {
          term: 'Better Business Bureau (BBB)',
          definition:
            'An organization to which consumers can report unethical business practices.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Which organization is a federal agency that enforces antitrust laws and protects consumers?',
        options: [
          'Better Business Bureau (BBB)',
          'Federal Trade Commission (FTC)',
          'Internal Revenue Service (IRS)',
          'Department of Motor Vehicles (DMV)',
        ],
        answerIndex: 1,
        explanation:
          'Correct! The FTC is the federal agency that enforces antitrust laws and protects consumers. The BBB is helpful too, but it is an organization for reporting unethical businesses, not a federal agency.',
      },
    },
    {
      type: 'content',
      heading: 'Common Scams: Online',
      body:
        'Unfortunately, scams can be found almost everywhere you go, whether you are offline or online. Online, a few classics show up again and again — and they are getting more convincing every year.',
      bullets: [
        'Phishing - emails, texts, or DMs that pretend to be from banks, teachers, delivery services, and more.',
        'Fake online stores or social media giveaways ("Free AirPods if you fill this out!")',
        'Subscription traps - free trials that auto-renew without permission or that are extremely hard to cancel.',
      ],
    },
    {
      type: 'content',
      heading: 'Common Scams: Offline',
      body:
        'Online scams are not the only danger. Some of the oldest tricks in the book happen face to face, and they work because they abuse your trust.',
      bullets: [
        'Affinity fraud - when someone fraudulently claims to be a member of the same ethnic, religious, career, or community group in order to gain a potential investor’s trust.',
        'Ticket resale scams - scalpers sell fake or copied tickets for concerts or sports games. You pay cash and find out at the door that they are invalid.',
      ],
    },
    {
      type: 'content',
      heading: 'Scam Red Flags',
      body:
        'Most scams give themselves away if you know what to look for. Keep this red flag list in your back pocket — if a message hits even one of these, slow down before you tap anything.',
      bullets: [
        '"Too good to be true" offers',
        'Asking for gift card payments or personal info',
        'Urgency ("Act now or your account will be locked!")',
        'Bad grammar or suspicious links',
        'Emails with weird endings, like random numbers and letters',
        'Websites with weird domain extensions like .xyz, .vip, or .site',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You get a text: "URGENT: Your package is held! Pay a $1 fee in the next 30 minutes at usps-delivery.xyz or it will be returned!" How many red flags can you spot?',
        options: [
          'None, this looks legitimate',
          'One: the small fee',
          'Several: urgency, a suspicious link, and a weird domain extension',
          'It is only a scam if the fee is over $100',
        ],
        answerIndex: 2,
        explanation:
          'Sharp eyes! That message stacks multiple red flags: fake urgency with a countdown, a suspicious link, and a weird .xyz domain. Real companies do not pressure you like this. When in doubt, delete it and go to the official website yourself.',
      },
    },
    {
      type: 'content',
      heading: 'Identity Theft',
      body:
        'Identity theft is when someone steals your personal info — your name, Social Security number, or bank info — to commit fraud. It usually starts with small mistakes that are easy to avoid once you know them.',
      bullets: [
        'Not shredding sensitive information (like bank statements)',
        'Clicking fake links',
        'Sharing personal info on social media',
        'Weak or reused passwords',
        'Lost or stolen devices',
      ],
    },
    {
      type: 'content',
      heading: 'Protect Yourself: S.H.I.E.L.D.',
      body:
        'To protect yourself from identity theft, remember the acronym S.H.I.E.L.D. Six habits, one shield between you and the scammers.',
      bullets: [
        'S - Secure your passwords: use strong, unique passwords for each account with upper- and lowercase letters, numbers, and symbols. Avoid obvious picks like your name or "123456." Consider a password manager — and do not just put them all in your Notes app!',
        'H - Hide your personal info: do not post private details like your birthday, address, school name, or phone number on public social media. Scammers can use them to answer security questions or pretend to be you.',
        'I - Ignore suspicious messages: if a strange text, email, or DM asks for money or personal info or says "Click here fast!", just delete it. Do not respond and do not click. Real companies do not ask for sensitive info this way.',
        'E - Enable 2FA: two-factor authentication requires two forms of identification to access your accounts, like a code sent to your phone. Even if someone has your password, they are locked out.',
        'L - Lock your devices: always use a passcode, fingerprint, or face ID on your phone, tablet, and laptop. If a device is lost or stolen, your info stays safe from strangers.',
        'D - Do not shop on public Wi-Fi: coffee shop and airport Wi-Fi is not secure. Never enter card info or passwords on it. Wait for a trusted private network like your home network, or use your phone’s hotspot.',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question: 'What does two-factor authentication (2FA) do?',
        options: [
          'It doubles the strength of your password automatically',
          'It requires two forms of identification to access an account, like a password plus a code sent to your phone',
          'It lets two people share one account safely',
          'It blocks all suspicious emails before they reach you',
        ],
        answerIndex: 1,
        explanation:
          'Exactly! 2FA adds an extra step, like a code texted to your phone, on top of your password. Even if a scammer steals your password, they still cannot get in. It is one of the easiest security upgrades you can make today.',
      },
    },
    {
      type: 'example',
      heading: 'Let’s Go Phishing! Activity',
      body:
        'Time to think like a scammer (so you can beat them). In small groups, create your best fake phishing message: an email, a text, or a social media DM. Choose a fake identity like Amazon, USPS, Netflix, or the IRS. Pick a bait: a suspicious login alert, a missed delivery, or a free prize. Be creative but keep it appropriate — then present it and see if the class can spot the red flags.',
    },
    {
      type: 'content',
      heading: 'Thank You from BFF Academy',
      body:
        'This concludes BFF Academy! Thank you for taking time out of your busy weeks to learn with BFF of America. You now know how to earn, budget, save, invest, manage credit, handle risk, plan your future, and protect yourself from scams. We look forward to seeing what you are capable of. One last quiz — let’s test your skills!',
    },
  ],
  quiz: [
    {
      question: 'What is consumer protection?',
      options: [
        'A type of insurance you buy for your purchases',
        'The laws, agencies, and tools that defend people against scams, fraud, and shady business practices',
        'A warranty that comes with electronics',
        'A government program that refunds all scam victims automatically',
      ],
      answerIndex: 1,
      explanation:
        'Correct! Consumer protection is the whole system of laws, agencies, and tools — like the FTC, CFPB, and BBB — that defends people against scams, fraud, and shady business practices.',
    },
    {
      question:
        'Which agency is charged with overseeing consumer-related financial products and services?',
      options: [
        'Better Business Bureau (BBB)',
        'Federal Trade Commission (FTC)',
        'Consumer Financial Protection Bureau (CFPB)',
        'Social Security Administration (SSA)',
      ],
      answerIndex: 2,
      explanation:
        'That is the CFPB! It focuses specifically on consumer-related financial products and services, while the FTC handles broader consumer protection and antitrust enforcement.',
    },
    {
      question:
        'An email claims to be from your bank and asks you to click a link and confirm your password. This is most likely an example of what?',
      options: ['Phishing', 'A subscription trap', 'Affinity fraud', 'A ticket resale scam'],
      answerIndex: 0,
      explanation:
        'You nailed it! Phishing is when emails, texts, or DMs pretend to be from banks, teachers, delivery services, and more to trick you into giving up info. Real companies do not ask for sensitive info this way.',
    },
    {
      question:
        'A "free trial" that quietly starts charging your card every month and is nearly impossible to cancel is called what?',
      options: ['A giveaway', 'A phishing text', 'Affinity fraud', 'A subscription trap'],
      answerIndex: 3,
      explanation:
        'Right! Subscription traps are free trials that auto-renew without clear permission or are extremely hard to cancel. Always check the fine print before entering your card info for a "free" trial.',
    },
    {
      question:
        'Someone pretends to belong to your religious community to win your trust and get you to invest in their scheme. What is this called?',
      options: ['Phishing', 'Affinity fraud', 'A subscription trap', 'Identity theft'],
      answerIndex: 1,
      explanation:
        'Correct! Affinity fraud is when someone fraudulently claims to be a member of the same ethnic, religious, career, or community group to gain a potential investor’s trust. Trust the math, not just the membership.',
    },
    {
      question: 'Which of these is a red flag that a message might be a scam?',
      options: [
        'It comes from a domain you recognize and use often',
        'It asks you to pay with gift cards',
        'It has no links or attachments',
        'It arrives during business hours',
      ],
      answerIndex: 1,
      explanation:
        'Yes! Gift card payment requests are a classic scam red flag, along with urgency, "too good to be true" offers, bad grammar, suspicious links, and weird domain extensions like .xyz or .vip. No real company demands gift cards.',
    },
    {
      question: 'In the S.H.I.E.L.D. acronym, what does the "L" stand for?',
      options: [
        'Log out of every website',
        'Limit your screen time',
        'Lock your devices',
        'Leave social media',
      ],
      answerIndex: 2,
      explanation:
        'Correct! L is for Lock your devices: always use a passcode, fingerprint, or face ID on your phone, tablet, and laptop so your info stays safe if a device is lost or stolen.',
    },
    {
      question: 'Why should you avoid entering card info or passwords on public Wi-Fi?',
      options: [
        'Public Wi-Fi is too slow for secure payments',
        'Public Wi-Fi is not secure, so strangers could capture your sensitive info',
        'Stores charge extra fees for public Wi-Fi purchases',
        'Public Wi-Fi automatically shares your history with the network owner',
      ],
      answerIndex: 1,
      explanation:
        'Exactly! Public Wi-Fi at places like coffee shops and airports is not secure. Wait until you are on a trusted private network like your home Wi-Fi, or use your phone’s hotspot before entering anything sensitive.',
    },
  ],
}

export default lesson
