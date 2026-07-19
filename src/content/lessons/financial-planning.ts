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
  es: {
    title: 'Planificación financiera',
    description:
      'Aprende a fijar metas financieras SMART para el futuro y a construir un plan sencillo para alcanzarlas.',
    sections: [
      {
        type: 'intro',
        heading: 'Adelanta la película 15 años',
        body:
          'Imagina que pudieras adelantar tu vida 15 años. ¿Qué es una cosa que esperas haber logrado financieramente, y qué se necesitaría para llegar ahí? Tal vez un carro, un lugar propio o un título universitario. Hoy se trata de convertir esos grandes sueños de "algún día" en un plan real con pasos que puedes empezar ahora.',
      },
      {
        type: 'content',
        heading: 'Metas SMART: un repaso rápido',
        body:
          'Recuerda nuestra segunda semana juntos. Cuando planeas tu futuro, cada meta financiera que fijes debe seguir el acrónimo SMART (por sus siglas en inglés). Metas como "quiero ser rico" son vagas. Metas como "ahorrar $500 para una laptop en 4 meses" te dan un objetivo claro y un plazo.',
        bullets: [
          'Specific (específica): haz tu meta precisa. Esto te mantiene en el camino correcto.',
          'Measurable (medible): debes poder entender tus resultados a lo largo del camino.',
          'Attainable (alcanzable): no pongas tus expectativas demasiado alto.',
          'Relevant (relevante): asegúrate de que tus metas se ajusten a tu situación.',
          'Timely (con plazo): dale a tu meta un periodo de tiempo.',
        ],
      },
      {
        type: 'example',
        heading: 'Reescribe esta meta',
        body:
          'Aquí hay una meta que necesita trabajo: "Quiero conseguir un carro". No es específica, no hay un número que medir y no tiene fecha límite. Una versión SMART podría ser: "Ahorrar $3,000 para un carro usado guardando $250 al mes durante los próximos 12 meses". El mismo sueño, pero ahora sabes exactamente qué hacer cada mes y cuándo lo lograrás.',
      },
      {
        type: 'content',
        heading: 'Cómo priorizar tus metas financieras',
        body:
          'No todas las metas son igual de urgentes o importantes. Las metas financieras vienen en tres tamaños según cuánto tiempo toman. Las necesidades frente a los deseos también juegan un papel: los ahorros de emergencia pueden tener prioridad sobre el entretenimiento. (¡Otro recuerdo de la semana 2!)',
        bullets: [
          'Corto plazo (menos de 1 año): tenis nuevos, un viaje',
          'Mediano plazo (de 1 a 5 años): comprar una laptop, ahorrar para un carro',
          'Largo plazo (5 años o más): la universidad, mudarte a tu propio lugar',
        ],
      },
      {
        type: 'content',
        heading: 'Cómo decidir qué va primero',
        body:
          'Cuando tienes más metas que dinero (lo cual es básicamente siempre), pregúntate: "¿Qué es lo más importante en este momento?". Luego evalúa cada meta con unos cuantos factores clave antes de decidir a dónde van tus dólares primero.',
        bullets: [
          'Plazo: ¿qué tan pronto lo necesitas?',
          'Urgencia: ¿qué pasa si esperas?',
          'Costo: ¿cuánto se necesitará para lograrlo?',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            '¿Cuál de las siguientes se consideraría una meta financiera de corto plazo?',
          options: [
            'Ahorrar $500 para comprar un teléfono en 3 meses',
            'Ahorrar $5,000 para un carro en 2 años',
            'Ahorrar $20,000 para la colegiatura universitaria en 5 años',
            'Construir un fondo de emergencia para gastos médicos inesperados en un futuro lejano',
          ],
          answerIndex: 0,
          explanation:
            '¡Bien hecho! Las metas de corto plazo ocurren en menos de 1 año, y 3 meses definitivamente califica. El carro es de mediano plazo (1 a 5 años), y la colegiatura universitaria y un fondo de emergencia lejano son metas de largo plazo.',
        },
      },
      {
        type: 'content',
        heading: 'Manejo de los hitos de la vida',
        body:
          'En el futuro enfrentarás algunos hitos importantes de la vida: la graduación, sacar tu licencia, ir a la universidad, mudarte. Cada uno tiene costos, algunos obvios y otros ocultos, y cada uno requiere preparación. Planear con anticipación alivia la presión y te permite tomar decisiones más SMART. (¿La captaste?)',
        bullets: [
          'Sacar tu licencia = costo de las clases de manejo, cuotas del DMV, seguro',
          'Mudarte = renta, muebles, comida',
          'La universidad = colegiatura, útiles, transporte, alojamiento y comidas',
        ],
      },
      {
        type: 'content',
        heading: 'Qué significa realmente "planear con anticipación"',
        body:
          'Planear con anticipación no es solo preocuparte vagamente por el futuro. Es un conjunto de estrategias concretas que puedes usar para cualquier hito que se te acerque.',
        bullets: [
          'Anticipa el costo: investiga los precios promedio y distingue qué costos son únicos (como un depósito) y cuáles son recurrentes (como la renta).',
          'Fija un plazo: ¿cuándo esperas que ocurra el hito? ¿Cuántos meses faltan?',
          'Crea una mini meta: por ejemplo, "quiero tener $1,200 ahorrados para los gastos del apartamento en 6 meses". Usa el formato SMART si es posible.',
          'Trabaja hacia atrás: $1,200 divididos entre 6 meses = $200 al mes. Inclúyelo en tu presupuesto y descubre qué gastos puedes reducir para hacerle espacio.',
          'Crea un colchón: siempre agrega un poco extra para los costos ocultos. Si crees que necesitas $800, apunta a $900 o más.',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Quieres tener $1,200 ahorrados para los gastos del apartamento en 6 meses. Usando la estrategia de "trabajar hacia atrás", ¿cuánto deberías ahorrar cada mes?',
          options: ['$100', '$150', '$200', '$600'],
          answerIndex: 2,
          explanation:
            '¡Exactamente! $1,200 divididos entre 6 meses son $200 al mes. Trabajar hacia atrás convierte un número grande y aterrador en una cantidad mensual que sí puedes incluir en tu presupuesto.',
        },
      },
      {
        type: 'content',
        heading: 'Los Baby Steps: Dave Ramsey',
        body:
          'Dave Ramsey es un reconocido emprendedor y coach financiero que ha construido una enorme audiencia con su programa de radio, sus podcasts y sus canales de YouTube. Sus "Baby Steps" (pasos de bebé) son una de las mejores maneras de encaminarte hacia la grandeza financiera desde joven. Son siete pasos, y cada uno se construye sobre el anterior.',
      },
      {
        type: 'content',
        heading: 'Baby Steps 1-3: construye tu base',
        body:
          'Los primeros tres pasos se tratan de seguridad. Según Dave Ramsey, el primer paso hacia tus metas financieras es construir tu base de emergencia, luego eliminar las deudas y después hacer esa base todavía más grande.',
        bullets: [
          'Paso 1 - Crea un fondo de emergencia inicial: ahorra $1,000 para mantenerte fuera de situaciones de deuda mala. Podrías usarlo para una llanta ponchada o una ventana rota.',
          'Paso 2 - Paga todas tus deudas (excepto tu hipoteca) con la bola de nieve de deudas (debt snowball): ordena tus deudas de la más pequeña a la más grande, haz los pagos mínimos en todas excepto la más pequeña, ataca esa primero y luego sigue subiendo por la lista.',
          'Paso 3 - Haz crecer un fondo de emergencia completo: una vez libre de deudas (aparte de la hipoteca), ahorra de 3 a 6 meses de gastos y cuentas. Esto te mantiene seguro y estable en la mayoría de las situaciones.',
        ],
      },
      {
        type: 'content',
        heading: 'Baby Steps 4-7: construye tu futuro',
        body:
          'Con una base sólida y sin deudas que te pesen, los pasos siguientes cambian de jugar a la defensiva a jugar a la ofensiva: hacer crecer tu riqueza, terminar de pagar la casa y devolver a los demás.',
        bullets: [
          'Paso 4 - Invierte en tu jubilación: apunta a invertir aproximadamente el 15% del ingreso de tu hogar. Estar libre de deudas te permite hacerlo sin estrés.',
          'Paso 5 - Ahorra para la universidad de tus hijos: este paso puede no aplicar a todos, y por eso la jubilación va primero. Recuerda la lección de Ahorro e inversión y considera una cuenta ESA o un plan 529.',
          'Paso 6 - Paga tu casa antes de tiempo: con todo lo demás resuelto, enfócate en la hipoteca y quedarás totalmente libre de deudas más rápido de lo que crees.',
          'Paso 7 - Construye riqueza y da con generosidad: con libertad total sobre tu dinero, inicia futuros financieros para tus descendientes y ayuda a otros. Dar con generosidad es el resultado máximo de los Baby Steps.',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'En el método de la bola de nieve de deudas, ¿qué deuda te enfocas en pagar primero?',
          options: [
            'La deuda con la tasa de interés más alta',
            'La deuda más pequeña',
            'La deuda más grande',
            'Tu hipoteca',
          ],
          answerIndex: 1,
          explanation:
            '¡Lo lograste! La bola de nieve de deudas ordena tus deudas de la más pequeña a la más grande. Haces los pagos mínimos en todas las demás y atacas la más pequeña primero. Cada deuda saldada es una victoria rápida que te mantiene con ánimo para seguir con la siguiente.',
        },
      },
      {
        type: 'content',
        heading: 'Para cerrar',
        body:
          'Anota un resumen rápido de la lección. ¿Qué conceptos te quedaron claros? ¿Cuáles quieres trabajar un poco más? En la próxima sesión veremos Protección al consumidor, jugaremos la actividad ¡Vamos de phishing! y terminaremos con un quiz al final de la lección. Por ahora, ¡pongamos a prueba tus habilidades!',
      },
    ],
    quiz: [
      {
        question:
          '¿Cuál de estas es el mejor ejemplo de una meta financiera SMART?',
        options: [
          'Quiero ser rico algún día',
          'Ahorrar $500 para una laptop en 4 meses',
          'Conseguir mucho dinero para un carro',
          'Dejar de gastar tanto en algún momento',
        ],
        answerIndex: 1,
        explanation:
          '¡Correcto! "Ahorrar $500 para una laptop en 4 meses" es específica, medible, alcanzable, relevante y con plazo. Las otras opciones son deseos vagos sin un objetivo ni un plazo claros.',
      },
      {
        question: '¿Qué significa la "T" de SMART?',
        options: [
          'Tough (difícil)',
          'Total (total)',
          'Timely (con plazo)',
          'Tested (probada)',
        ],
        answerIndex: 2,
        explanation:
          '¡Timely, es decir, con plazo! Toda meta SMART necesita un periodo de tiempo. Una fecha límite convierte el "algún día" en un plan real contra el que puedes medir tu progreso.',
      },
      {
        question:
          'Ahorrar para un carro que planeas comprar en 3 años es ¿qué tipo de meta financiera?',
        options: [
          'De corto plazo',
          'De mediano plazo',
          'De largo plazo',
          'De emergencia',
        ],
        answerIndex: 1,
        explanation:
          '¡Así es! Las metas de mediano plazo toman de 1 a 5 años, así que un carro en 3 años encaja perfecto. Las metas de corto plazo ocurren en menos de un año, y las de largo plazo toman 5 años o más.',
      },
      {
        question:
          'Calculas que mudarte costará $800. Usando la estrategia de "crear un colchón", ¿cuánto deberías proponerte ahorrar en realidad?',
        options: [
          '$400, ya que puedes pedir prestado el resto',
          'Exactamente $800',
          '$900 o más',
          '$100',
        ],
        answerIndex: 2,
        explanation:
          '¡Sí! Siempre agrega un poco extra para los costos ocultos. Si crees que necesitas $800, apunta a $900 o más. Los hitos casi siempre traen gastos sorpresa, y el colchón evita que arruinen tu plan.',
      },
      {
        question: '¿Cuál es el Baby Step 1 en el plan de Dave Ramsey?',
        options: [
          'Invertir el 15% de tu ingreso en la jubilación',
          'Pagar tu hipoteca antes de tiempo',
          'Ahorrar de 3 a 6 meses de gastos',
          'Ahorrar $1,000 para un fondo de emergencia inicial',
        ],
        answerIndex: 3,
        explanation:
          '¡Correcto! El primer paso es un fondo de emergencia inicial de $1,000. Su propósito es mantenerte fuera de situaciones de deuda mala cuando la vida te lanza una llanta ponchada o una ventana rota.',
      },
      {
        question:
          'Después de quedar libre de deudas (excepto la hipoteca), ¿cuánto debe cubrir tu fondo de emergencia completo?',
        options: [
          'De 3 a 6 meses de gastos y cuentas',
          'Exactamente $1,000',
          'Un año de tu salario',
          'El 15% del ingreso de tu hogar',
        ],
        answerIndex: 0,
        explanation:
          '¡Eso es! El Baby Step 3 convierte tu fondo inicial en 3 a 6 meses de gastos y cuentas, manteniéndote seguro y financieramente estable en la mayoría de las situaciones.',
      },
      {
        question:
          'Según los Baby Steps, ¿aproximadamente qué porcentaje del ingreso de tu hogar deberías invertir para la jubilación?',
        options: ['5%', '50%', '15%', '30%'],
        answerIndex: 2,
        explanation:
          '¡Correcto! El Baby Step 4 dice invertir aproximadamente el 15% del ingreso de tu hogar en fondos de jubilación. Estar primero libre de deudas es la clave que te permite hacerlo sin estrés.',
      },
      {
        question:
          '¿Cuál es el resultado máximo de completar los siete Baby Steps?',
        options: [
          'Tener tantos carros como sea posible',
          'Construir riqueza y dar con generosidad',
          'No tener que hacer un presupuesto nunca más',
          'Conseguir el límite de crédito más alto posible',
        ],
        answerIndex: 1,
        explanation:
          '¡Exacto! El Baby Step 7 es construir riqueza y dar con generosidad. Una vez totalmente libre de deudas, tienes la libertad de ayudar a otros, iniciar futuros financieros para tus descendientes y hacer del mundo un lugar mejor con tu esfuerzo.',
      },
    ],
  },
}

export default lesson
