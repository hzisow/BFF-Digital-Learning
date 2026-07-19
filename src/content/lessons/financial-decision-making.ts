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
  es: {
    title: 'Toma de decisiones financieras',
    description:
      'Aprende a evaluar tus opciones financieras usando el costo de oportunidad, la comparación de precios y otras herramientas para tomar decisiones.',
    sections: [
      {
        type: 'intro',
        heading: 'Cada elección tiene un precio',
        body:
          'Tomas docenas de decisiones cada día: qué comer, qué comprar, qué dejar pasar. Hoy aprenderás las herramientas que convierten un "bueno, supongo que lo compro" en una decisión inteligente y segura. Al final, estarás evaluando opciones como todo un profesional, y tu billetera del futuro te lo agradecerá.',
      },
      {
        type: 'content',
        heading: 'Calentamiento: el dilema de los $50',
        body:
          'Imagina esto: te ofrecen $50 por cuidar niños esta noche, pero tus amigos van a un concierto que no te quieres perder. ¿Qué harías y por qué? Aquí no hay respuesta incorrecta, pero fíjate en algo: elijas la opción que elijas, renuncias a la otra. Ese intercambio tiene un nombre, y es nuestra primera gran idea.',
      },
      {
        type: 'content',
        heading: 'El costo de oportunidad',
        body:
          'Cada elección viene con un intercambio, sobre todo cuando se trata de dinero. El costo de oportunidad es el valor de aquello a lo que renuncias cuando eliges una cosa en lugar de otra. Toda decisión tiene un costo. Por ejemplo, el costo de oportunidad de comprar un carro nuevo es el dinero extra que habrías ahorrado comprando uno usado. No puedes tenerlo todo, así que las decisiones inteligentes significan sopesar todas tus opciones y analizar los costos y beneficios de cada una.',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Gastas $60 en boletos para un concierto en lugar de ahorrarlos para una patineta nueva. ¿Cuál es el costo de oportunidad de tu elección?',
          options: [
            'Los $60 que gastaste en los boletos',
            'La diversión que tuviste en el concierto',
            'La patineta a la que renunciaste',
            'No hay costo porque disfrutaste el concierto',
          ],
          answerIndex: 2,
          explanation:
            '¡Eso es! El costo de oportunidad es el valor de aquello a lo que renuncias, en este caso la patineta. Hasta las compras divertidas tienen un costo de oportunidad.',
        },
      },
      {
        type: 'terms',
        heading: 'Caja de herramientas para decidir',
        terms: [
          {
            term: 'Costo de oportunidad (opportunity cost)',
            definition:
              'El valor de aquello a lo que renuncias cuando eliges una cosa en lugar de otra.',
          },
          {
            term: 'Comparación de precios (comparison shopping)',
            definition:
              'Comparar el precio y las características de productos o servicios de diferentes vendedores antes de comprar.',
          },
          {
            term: 'Análisis de costo-beneficio (cost-benefit analysis)',
            definition:
              'Comparar los beneficios de comprar un bien o servicio con sus costos.',
          },
          {
            term: 'Gratificación aplazada (delayed gratification)',
            definition:
              'Esperar antes de comprar. Cuanto más esperas, más valor puedes obtener, o menos te arrepientes.',
          },
        ],
      },
      {
        type: 'content',
        heading: 'Estrategias para gastar con inteligencia',
        body:
          'Cuando una compra te esté llamando por tu nombre, baja la velocidad y pásala por estas tres estrategias. Funcionan para tenis, suscripciones y, algún día, para carros y apartamentos.',
        bullets: [
          'Comparación de precios: revisa primero los precios y características de diferentes vendedores. Los tenis de básquetbol Kyrie del año pasado pueden costar mucho menos que los de este año.',
          'Análisis de costo-beneficio: haz una lista de lo que ganas con la compra y compárala con lo que te cuesta.',
          'Gratificación aplazada: espera antes de comprar. Los precios bajan, la emoción se desvanece y descubres si de verdad lo querías.',
        ],
      },
      {
        type: 'content',
        heading: 'El consejo final',
        body:
          'Antes de cualquier compra, hazte dos preguntas rápidas: ¿es necesaria esta compra? ¿Y puedo esperar una oferta o elegir una opción más barata? Esos diez segundos de reflexión les han ahorrado a los compradores más dinero que cualquier cupón jamás impreso. Además, piensa en una compra reciente de la que estés orgulloso. ¿Qué la hizo inteligente?',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Deja quiere los tenis de básquetbol más nuevos de este año, pero revisa tres tiendas y descubre que el modelo del año pasado tiene características casi idénticas por la mitad del precio. ¿Qué estrategia está usando?',
          options: [
            'Comparación de precios',
            'Compra por impulso',
            'Protección contra sobregiros',
            'Transferencia de riesgo',
          ],
          answerIndex: 0,
          explanation:
            '¡Lo clavaste! Comparar precios y características entre diferentes vendedores antes de comprar es la comparación de precios, y acaba de ahorrarle a Deja la mitad del precio.',
        },
      },
      {
        type: 'content',
        heading: 'Cómo evaluar servicios financieros',
        body:
          'Estas mismas habilidades funcionan al elegir bancos, cuentas y otros servicios financieros. Comparar te ayuda a tomar decisiones más inteligentes. Y ojo: muchos servicios intentan atraparte con suscripciones y pequeños cargos que se acumulan con el tiempo, ¡así que lleva un registro de tus pagos!',
        bullets: [
          'Precio: ¿cuánto cuesta de entrada?',
          'Valor: ¿qué recibes realmente por tu dinero?',
          'Calidad: ¿va a durar y funcionar bien?',
          'Características: ¿qué extras te importan de verdad?',
          'Cargos ocultos: ¿qué cobros escondidos están enterrados en las letras pequeñas?',
        ],
      },
      {
        type: 'example',
        heading: 'Batalla de bancos: EasyBank vs. SecurePlus',
        body:
          'Compara dos cuentas de cheques. EasyBank Basic no tiene cuota mensual, ofrece acceso gratuito en más de 15,000 cajeros automáticos, una app básica con transferencias y alertas, y un cargo de $35 por cada sobregiro. SecurePlus Checking cuesta $5 al mes (que se elimina con un saldo de $500), ofrece acceso gratuito en cualquier cajero del país, incluye herramientas de presupuesto y acceso anticipado a tu sueldo, y no tiene cargos por sobregiro porque rechaza automáticamente las compras. ¿Cuál es mejor para alguien con un saldo mensual bajo? ¿Quién aprovecha más las herramientas de presupuesto? ¿Qué tipo de comprador evita por completo los cargos por sobregiro? Personas diferentes, respuestas diferentes.',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Sam normalmente mantiene menos de $100 en su cuenta. Según la comparación, ¿qué cuenta probablemente le conviene más y por qué?',
          options: [
            'SecurePlus, porque toda cuenta con cuota es de mayor calidad',
            'EasyBank Basic, porque evita la cuota mensual de $5 que SecurePlus le cobraría por su saldo bajo',
            'SecurePlus, porque mantiene más de $500 en su cuenta',
            'Ninguna, porque las cuentas de cheques son solo para adultos',
          ],
          answerIndex: 1,
          explanation:
            '¡Gran análisis! Con menos de $500 en su cuenta, Sam pagaría la cuota mensual de $5 de SecurePlus, así que la cuota de $0 de EasyBank probablemente le sirve más. Solo tiene que cuidarse de ese cargo de $35 por sobregiro.',
        },
      },
      {
        type: 'example',
        heading: '¿Qué preferirías?',
        body:
          'Ganas $70,000 al año. ¿Preferirías comprar un carro nuevo y usar todo tu dinero, o comprar un carro usado y ahorrar el resto? Financieramente, el carro usado suele ganar, aunque se vea un poco peor. Siguiente: ¿un iPhone nuevo de $1,000 o $1,000 en acciones de Apple? Invertir suele ser la jugada más inteligente, pero imagina que llegan los aranceles y los inversionistas de Apple pierden la mitad de su dinero. Invertir también conlleva un riesgo real. Última: ¿un trabajo con un salario mucho más alto pero menos beneficios, o un trabajo con menor paga y comisiones pero con beneficios mucho mejores, como vacaciones pagadas? Toda opción tiene intercambios. De eso se trata todo.',
      },
      {
        type: 'content',
        heading: 'Para cerrar',
        body:
          'Ahora tienes una caja de herramientas completa para decidir: detecta el costo de oportunidad, compara precios, haz un análisis de costo-beneficio y deja que la gratificación aplazada haga su magia. Anota qué te quedó claro hoy y qué quieres practicar más. Próxima sesión: Planificación financiera, con un video de Dave Ramsey y un quiz al final de la lección. ¡Nos vemos allá!',
      },
    ],
    quiz: [
      {
        question: '¿Qué es el costo de oportunidad?',
        options: [
          'La etiqueta de precio de un artículo caro',
          'El valor de aquello a lo que renuncias cuando eliges una cosa en lugar de otra',
          'El cargo que cobra una tienda por las devoluciones',
          'El interés que un banco paga por los ahorros',
        ],
        answerIndex: 1,
        explanation:
          'El costo de oportunidad es el valor de aquello a lo que renuncias al elegir una opción en lugar de otra. Toda decisión tiene un costo.',
      },
      {
        question:
          'El costo de oportunidad de comprar un carro completamente nuevo en lugar de uno usado es...',
        options: [
          'El dinero extra que habrías ahorrado comprando el carro usado',
          'La gasolina que usa el carro nuevo',
          'La prima mensual del seguro',
          'Nada, porque los carros nuevos nunca pierden valor',
        ],
        answerIndex: 0,
        explanation:
          'Al elegir el carro nuevo, renuncias a los ahorros extra que el carro usado habría dejado en tu bolsillo. Esos ahorros perdidos son el costo de oportunidad.',
      },
      {
        question:
          'Revisar los precios y características de varios vendedores diferentes antes de comprar se llama...',
        options: [
          'Gratificación aplazada',
          'Compra por impulso',
          'Transferencia de costos',
          'Comparación de precios',
        ],
        answerIndex: 3,
        explanation:
          'La comparación de precios significa comparar el precio y las características entre vendedores antes de comprar, como conseguir los tenis Kyrie del año pasado por menos que los de este año.',
      },
      {
        question:
          'Sopesar los beneficios de una compra frente a lo que te cuesta es un...',
        options: [
          'Repaso del deducible',
          'Congelamiento del presupuesto',
          'Análisis de costo-beneficio',
          'Chequeo de crédito',
        ],
        answerIndex: 2,
        explanation:
          'Un análisis de costo-beneficio compara los beneficios de comprar un bien o servicio con sus costos, y te ayuda a decidir si vale la pena.',
      },
      {
        question:
          'Esperar unas semanas antes de comprar un artículo nuevo muy publicitado, y a menudo conseguir un mejor precio o evitar el arrepentimiento, es un ejemplo de...',
        options: [
          'Gratificación aplazada',
          'Costo de oportunidad',
          'Protección contra sobregiros',
          'Cobertura de responsabilidad civil',
        ],
        answerIndex: 0,
        explanation:
          'Eso es la gratificación aplazada. Cuanto más esperas, más valor puedes obtener, o menos arrepentimiento puedes sentir.',
      },
      {
        question:
          'Al evaluar un servicio financiero, ¿con cuál de estos debes tener cuidado porque los cargos pequeños se acumulan con el tiempo?',
        options: [
          'Acceso gratuito a cajeros automáticos',
          'Cargos ocultos y suscripciones',
          'Alertas de la app móvil',
          'Una cuota mensual eliminada',
        ],
        answerIndex: 1,
        explanation:
          'Muchos servicios esconden suscripciones y pequeños cargos ocultos que se acumulan en silencio. ¡Lleva un registro de tus pagos!',
      },
      {
        question:
          'En la comparación de bancos, ¿por qué SecurePlus Checking podría atraer a alguien que se sobregira con frecuencia?',
        options: [
          'Les paga $35 a los clientes por cada sobregiro',
          'Tiene los cargos de cajero más baratos de la ciudad',
          'Ofrece sobregiros gratis hasta $500',
          'No tiene cargos por sobregiro porque rechaza automáticamente las transacciones que sobregirarían la cuenta',
        ],
        answerIndex: 3,
        explanation:
          'SecurePlus rechaza automáticamente las compras que sobregirarían la cuenta, así que no hay cargos por sobregiro, a diferencia del cargo de $35 por sobregiro de EasyBank.',
      },
      {
        question:
          'La actividad de "¿Qué preferirías?" mostró que invertir $1,000 en acciones de Apple en lugar de comprar un iPhone...',
        options: [
          'Garantiza que duplicarás tu dinero',
          'Siempre es peor que comprar el teléfono',
          'Puede hacer crecer tu dinero, pero aun así conlleva un riesgo real de perder valor',
          'Es ilegal para cualquier menor de 30 años',
        ],
        answerIndex: 2,
        explanation:
          'Invertir suele ser la jugada financiera más inteligente, pero como mostró el giro de los aranceles, siempre existe el riesgo de perder dinero. Quienes deciden con inteligencia sopesan tanto el riesgo como la recompensa.',
      },
    ],
  },
}

export default lesson
