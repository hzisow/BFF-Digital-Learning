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
      type: 'video',
      heading: 'Watch: Budgeting Basics',
      body:
        "Before we talk tracking, watch this quick video from Two Cents. Heads up — it pauses to quiz you along the way, so pay attention! (Fun fact: it starts with George Washington. Yes, really.)",
      videoId: 'sVKQn2I4HDM',
      source: 'Two Cents · PBS Digital Studios',
      questions: [
        {
          at: 95,
          question:
            'The hosts compare budgeting to George Washington leading the Continental Army. What is the point of the comparison?',
          options: [
            'Washington invented the first budget spreadsheet',
            'Like Washington, you have to make a smart plan with limited resources',
            'Budgets only matter during wars',
            'You should spend money as fast as an army spends supplies',
          ],
          answerIndex: 1,
          explanation:
            "Washington almost never had enough soldiers or supplies — so he had to strategize with what he had. A budget is exactly that: a battle plan for limited money.",
        },
        {
          at: 250,
          question: 'According to the video, what is the FIRST step of building a budget?',
          options: [
            'Open a credit card',
            'Guess your expenses in your head',
            'Write it down — on paper, a spreadsheet, or an app',
            'Wait until you earn more money',
          ],
          answerIndex: 2,
          explanation:
            'Step one is writing your plan down — pencil and paper, spreadsheet, or app all work. Then you update it every month, because a budget is a living plan, not a one-time wish.',
        },
      ],
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
  es: {
    title: 'Gastos y presupuesto',
    description:
      'Cómo gastar con inteligencia, evitar las trampas de las compras impulsivas y armar un presupuesto sencillo que funcione con tus necesidades y tus deseos.',
    sections: [
      {
        type: 'intro',
        heading: 'Calentamiento: la pregunta de los $100',
        body:
          '¡Bienvenido de vuelta a BFF Classroom — Semana 1, Día 2! Un calentamiento rápido antes de empezar: si te dieran $100 ahora mismo, ¿en qué los gastarías y por qué? En serio, imagínalo. Guarda esa respuesta, porque al final de esta lección sabrás si esa compra era una necesidad, un deseo o una trampa de gasto en toda regla. Hoy se trata de gastar con inteligencia y armar un presupuesto que de verdad funcione.',
      },
      {
        type: 'content',
        heading: 'Necesidades vs. deseos',
        body:
          'Cada dólar que gastas va hacia una necesidad o hacia un deseo. Las necesidades son cosas que debes tener para sobrevivir y funcionar; los deseos son cosas que hacen la vida más agradable pero no son esenciales. Ninguno de los dos es malo, pero confundirlos es la razón por la que los presupuestos se desmoronan.',
        bullets: [
          'Necesidad: comida y agua básicas — todos las necesitamos para sobrevivir, y las compras de supermercado económicas ayudan a cubrirlas',
          'Necesidad: aire limpio — tener acceso a aire sin contaminación es esencial para mantenerse sano',
          'Necesidad: vivienda y ropa — nos protegen del clima y nos ayudan a participar en la vida diaria',
          'Deseo: comer fuera o pedir comida a domicilio seguido — es cómodo, pero normalmente innecesario y más caro',
          'Deseo: la tecnología más nueva — la tecnología puede aumentar tu productividad, pero no es necesaria para la vida diaria, ni siquiera en nuestro mundo moderno',
          'Deseo: la moda de diseñador — la ropa con estilo puede subir tu confianza y tu estatus social, pero no es esencial para cubrir necesidades básicas',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Tu abrigo de invierno se rompe sin remedio, así que compras uno de reemplazo. Tu amigo compra su tercera sudadera de diseñador para combinar con sus tenis. ¿Cuál afirmación es cierta?',
          options: [
            'Ambas compras son deseos',
            'Ambas compras son necesidades',
            'Tu abrigo es una necesidad; la tercera sudadera de diseñador es un deseo',
            'La ropa nunca es una necesidad',
          ],
          answerIndex: 2,
          explanation:
            'En el clavo. La ropa que te protege del clima es una necesidad. Pero la moda de diseñador — especialmente una tercera sudadera — es un deseo: puede subir tu confianza y tu estilo, pero no es esencial. Misma categoría, compras muy distintas.',
        },
      },
      {
        type: 'content',
        heading: 'Crear un presupuesto: B.U.I.L.D.',
        body:
          'Crear un presupuesto (budget) es una de las habilidades más importantes para manejar tus finanzas. Para recordar el proceso, usa el acrónimo en inglés B.U.I.L.D.: Begin with a goal (comienza con una meta), Understand your income (entiende tu ingreso), Identify your expenses (identifica tus gastos), Limit your spending (limita tu gasto) y Develop a habit (desarrolla un hábito). Vamos a recorrer cada letra, un paso a la vez.',
      },
      {
        type: 'content',
        heading: 'B — Comienza con una meta',
        body:
          'Todo presupuesto comienza con tus metas. Decide exactamente para qué estás presupuestando: ahorrar para un teléfono nuevo, construir tu portafolio de inversiones o comprar un auto. Y cada meta que te pongas debe ser SMART (inteligente, por sus siglas en inglés):',
        bullets: [
          'Specific (específica) — haz tu meta precisa; esto te mantiene en el camino correcto',
          'Measurable (medible) — debes poder entender tus resultados a lo largo del camino',
          'Attainable (alcanzable) — no pongas tus expectativas demasiado alto',
          'Relevant (relevante) — asegúrate de que tus metas encajen con tu situación real',
          'Timely (con tiempo definido) — ponle un plazo',
        ],
      },
      {
        type: 'example',
        heading: '¿SMART o no? Tú decides',
        body:
          "Vamos a calificar algunas metas. 'Voy a ahorrar $150 durante los próximos 3 meses para comprar tenis nuevos para correr' — SMART: específica, medible y con plazo. 'Voy a apartar $10 por semana durante 6 meses para armar un fondo de emergencia de $240' — SMART. 'Voy a pagarle a mi amigo la deuda de $60 en 4 semanas ahorrando $15 por semana' — SMART. Pero, ¿'quiero ahorrar dinero algún día para comprar un auto'? Sin monto, sin fecha límite — no es SMART. ¿Y 'voy a gastar menos dinero en comida y cosas este mes'? 'Menos' y 'cosas' no se pueden medir. Las metas vagas son el lugar donde los presupuestos se van a dormir la siesta.",
      },
      {
        type: 'content',
        heading: 'U — Entiende tu ingreso',
        body:
          "Después de fijar tus metas, empieza a llevar la cuenta de tus entradas y salidas de dinero — este paso es lo que la mayoría de la gente se imagina cuando escucha la palabra 'presupuestar'. Calcula cuánto dinero recibes regularmente: de trabajos, tu mesada semanal, regalos, etcétera. Por ejemplo, Joe gana $80 a la semana cuidando a los niños de sus vecinos. Esos $80 son la materia prima de todo su presupuesto.",
      },
      {
        type: 'content',
        heading: 'I — Identifica tus gastos',
        body:
          "Este paso va de la mano con el anterior. Haz una lista de todo tu gasto durante un período determinado: necesidades como comida y cuentas por pagar, y deseos como compras, botanas y suscripciones. Por ejemplo: 'Gasto $450 al mes en necesidades y $200 al mes en deseos'. Puedes ser más específico agrupando los gastos en categorías, como este presupuesto de ejemplo de un adulto que suma $3,840 al mes:",
        bullets: [
          'Vivienda: renta $1,700 — total $1,700',
          'Transporte: préstamo del auto $380, seguro $100, gasolina $200 — total $680',
          'Vida diaria: supermercado $800, servicios (agua, luz, etc.) unos $300 — total $1,100',
          'Misceláneos: tarjetas de crédito $75, teléfono celular $185, entretenimiento $100 — total $360',
        ],
      },
      {
        type: 'content',
        heading: 'L — Limita tu gasto',
        body:
          'Ahora que ya identificaste tu ingreso y tus gastos, es hora de repartir tu dinero de verdad según tu presupuesto. Usa la regla 50/30/20 como guía: el 50% de tu dinero va a las necesidades, el 30% a los deseos y el 20% al ahorro. Es un punto de partida, no una ley — ajústala según tu situación.',
      },
      {
        type: 'content',
        heading: 'D — Desarrolla un hábito',
        body:
          'El último paso para crear un presupuesto es el más difícil y el más importante: seguir de verdad el plan que creaste. La forma más fácil es registrar tus compras. Usa un cuaderno, una hoja de cálculo o una app para anotar lo que gastas, y ajusta tu plan cuando haga falta. Un presupuesto que ignoras es solo una lista de deseos con buen formato.',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Usando la regla 50/30/20, si recibes $200 al mes, ¿cuánto debería ir al ahorro?',
          options: ['$100', '$60', '$40', '$20'],
          answerIndex: 2,
          explanation:
            '¡Sí! La regla 50/30/20 manda el 20% al ahorro — y el 20% de $200 es $40. Las otras partes: $100 (50%) para necesidades y $60 (30%) para deseos. Y recuerda: puedes ajustar los porcentajes para que encajen con tu situación.',
        },
      },
      {
        type: 'video',
        heading: 'Mira el video: Fundamentos del presupuesto',
        body:
          'Antes de hablar de llevar el registro, mira este video rápido de Two Cents. El video está en inglés, y ojo — se pausa para hacerte preguntas en el camino, ¡así que pon atención! (Dato curioso: empieza con George Washington. Sí, en serio.)',
        videoId: 'sVKQn2I4HDM',
        source: 'Two Cents · PBS Digital Studios',
        questions: [
          {
            at: 95,
            question:
              'Los presentadores comparan hacer un presupuesto con George Washington dirigiendo el Ejército Continental. ¿Cuál es el punto de la comparación?',
            options: [
              'Washington inventó la primera hoja de cálculo para presupuestos',
              'Igual que Washington, tienes que hacer un plan inteligente con recursos limitados',
              'Los presupuestos solo importan durante las guerras',
              'Debes gastar el dinero tan rápido como un ejército gasta sus provisiones',
            ],
            answerIndex: 1,
            explanation:
              'Washington casi nunca tuvo suficientes soldados ni provisiones, así que tenía que hacer estrategia con lo que tenía. Un presupuesto es exactamente eso: un plan de batalla para un dinero limitado.',
          },
          {
            at: 250,
            question: 'Según el video, ¿cuál es el PRIMER paso para armar un presupuesto?',
            options: [
              'Abrir una tarjeta de crédito',
              'Adivinar tus gastos de memoria',
              'Escribirlo — en papel, en una hoja de cálculo o en una app',
              'Esperar hasta ganar más dinero',
            ],
            answerIndex: 2,
            explanation:
              'El paso uno es escribir tu plan: lápiz y papel, hoja de cálculo o app, todo funciona. Después lo actualizas cada mes, porque un presupuesto es un plan vivo, no un deseo de una sola vez.',
          },
        ],
      },
      {
        type: 'content',
        heading: 'Lleva el registro de tus gastos',
        body:
          'Llevar el registro de tu presupuesto y tus gastos es una de las mejores formas de alcanzar tus metas financieras. Te asegura no encontrarte nunca en un aprieto y estar siempre listo para lo que viene. Registrar te ayuda a no gastar de más — porque si no sabes a dónde va tu dinero, nunca sabrás por dónde desaparece. Por suerte, hay montones de formas de llevar el registro:',
        bullets: [
          'Cuaderno o diario — un poco a la antigua, pero las copias físicas te ayudan a mantener todo en orden',
          'Apps de gastos — Mint, Goodbudget o incluso tu app de Notas pueden registrar el gasto del día a día',
          'Estados de cuenta del banco y de la tarjeta de crédito — nunca tendrás un registro más exacto que tu propio historial de compras',
        ],
      },
      {
        type: 'content',
        heading: 'Consejos para llevar el registro',
        body:
          'Tres hábitos que hacen que el registro funcione. Primero, revisa tus gastos cada pocos días en lugar de esperar al final del mes, para que siempre sepas cómo vas. Segundo, ponte límites semanales o mensuales en categorías como comida rápida, artículos personales, juegos y suscripciones — recuerda la regla 50/30/20. Tercero, ¡celebra las pequeñas victorias! Alégrate de verdad por ti cuando te mantengas dentro del presupuesto. Una presentación solo puede llegar hasta cierto punto — se necesita una persona fuerte para dar ese paso extra y no gastar de más.',
      },
      {
        type: 'content',
        heading: 'Trampas de gasto comunes',
        body:
          'Una trampa de gasto es un hábito, una compra o una decisión que te hace gastar más dinero del que te das cuenta o del que pretendías — muchas veces sin pensarlo. Aquí están las tres grandes, más cómo escapar de cada una. Consejo final: antes de cualquier compra, pregúntate — ¿me va a importar esto dentro de una semana? Si no, déjalo pasar.',
        bullets: [
          'Compras impulsivas — ves algo, lo quieres ya y lo compras sin pensar. Solución: la regla de las 24 horas — espera un día antes de comprar un deseo',
          'Gasto en suscripciones — acumular servicios de streaming, apps y pases de juego que se renuevan solos. Solución: haz una auditoría de suscripciones cada pocos meses',
          'Presión social y FOMO (miedo a perderse algo) — gastar para seguirles el ritmo a tus amigos en ropa nueva, eventos y más. Solución: propón alternativas más baratas',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Estás a punto de comprar una skin de $30 para un juego del teléfono en el momento en que la ves. ¿Qué estrategia combate mejor esta trampa de gasto?',
          options: [
            'Comprarla rápido antes de que te convenzas de no hacerlo',
            'Usar la regla de las 24 horas y esperar un día antes de decidir',
            'Agregar tres artículos más para que el envío valga la pena',
            'Suscribirte para que las skins se renueven solas cada mes',
          ],
          answerIndex: 1,
          explanation:
            'Exacto — esa sensación de lo-veo-lo-quiero-lo-compro es una compra impulsiva, y la regla de las 24 horas es el antídoto: espera un día antes de comprar un deseo. Jugada extra: pregúntate si te va a importar dentro de una semana. Si no, déjalo pasar.',
        },
      },
    ],
    quiz: [
      {
        question: '¿Cuál de las siguientes es una NECESIDAD y no un deseo?',
        options: [
          'Pedir comida a domicilio casi todas las noches',
          'El smartphone más nuevo el día de su lanzamiento',
          'Moda de diseñador',
          'Compras de supermercado económicas',
        ],
        answerIndex: 3,
        explanation:
          'La comida y el agua básicas son necesidades, y las compras de supermercado económicas las cubren. La comida a domicilio frecuente, la tecnología más nueva y la moda de diseñador son deseos — agradables de tener, pero no esenciales para sobrevivir y funcionar.',
      },
      {
        question: '¿Qué significa el acrónimo B.U.I.L.D. en el mundo del presupuesto?',
        options: [
          'Begin with a goal (comienza con una meta), Understand your income (entiende tu ingreso), Identify your expenses (identifica tus gastos), Limit your spending (limita tu gasto), Develop a habit (desarrolla un hábito)',
          'Compra menos, Usa cupones, Invierte temprano, Limita las deudas, Diversifica',
          'Presupuesta cada mes, Entiende los impuestos, Asegura todo, Presta con cuidado, Dona seguido',
          'Comienza a ahorrar, Usa efectivo, Ignora los deseos, Lista las necesidades, Pospón las compras',
        ],
        answerIndex: 0,
        explanation:
          'B.U.I.L.D. es el proceso de presupuesto en cinco pasos: Begin with a goal (comienza con una meta), Understand your income (entiende tu ingreso), Identify your expenses (identifica tus gastos), Limit your spending (limita tu gasto) y Develop a habit (desarrolla un hábito).',
      },
      {
        question: '¿Cuál de estas metas es SMART?',
        options: [
          'Quiero ahorrar dinero algún día para comprar un auto',
          'Voy a gastar menos dinero en comida y cosas este mes',
          'Voy a ahorrar $150 durante los próximos 3 meses para comprar tenis nuevos para correr',
          'Espero ser rico en algún momento',
        ],
        answerIndex: 2,
        explanation:
          'Ahorrar $150 en 3 meses para unos tenis de correr es Específica, Medible, Alcanzable, Relevante y con Tiempo definido. Las otras son vagas — sin monto claro, sin fecha límite y sin forma de medir el progreso.',
      },
      {
        question: 'Según la regla 50/30/20, ¿a qué debe ir el 30%?',
        options: ['Al ahorro', 'A los deseos', 'A las necesidades', 'A los impuestos'],
        answerIndex: 1,
        explanation:
          'La regla 50/30/20 manda el 50% a las necesidades, el 30% a los deseos y el 20% al ahorro. Es una guía que puedes ajustar para que encaje con tu propia situación.',
      },
      {
        question: '¿Por qué importa llevar el registro de tus gastos?',
        options: [
          'Aumenta tu ingreso automáticamente',
          'Te permite saltarte por completo el hacer un presupuesto',
          'Los bancos exigen a sus clientes registrar sus gastos',
          'Te ayuda a no gastar de más — si no sabes a dónde va tu dinero, nunca sabrás por dónde desaparece',
        ],
        answerIndex: 3,
        explanation:
          'Llevar el registro te mantiene fuera de aprietos y listo para lo que viene. Ya sea con un cuaderno, una app o tus estados de cuenta del banco, saber a dónde va tu dinero es la manera de evitar que desaparezca.',
      },
      {
        question:
          'Te das cuenta de que estás pagando cinco servicios de streaming y tres suscripciones de juegos que se renuevan solas. ¿Cuál es la solución recomendada?',
        options: [
          'Hacer una auditoría de suscripciones cada pocos meses',
          'Aplicar la regla de las 24 horas a cada renovación',
          'Pedirles a tus amigos que dividan cada suscripción',
          'Cambiarlas todas a facturación anual',
        ],
        answerIndex: 0,
        explanation:
          'Ese montón de servicios que se renuevan solos es el gasto en suscripciones, una de las trampas de gasto más comunes. La solución es una auditoría de suscripciones cada pocos meses — revisar lo que pagas y cancelar lo que ya no usas.',
      },
      {
        question:
          'Todos tus amigos van a un evento caro y sientes presión de gastar dinero que habías presupuestado para el ahorro. ¿Qué trampa de gasto es esta, y cuál es una solución?',
        options: [
          'Compras impulsivas; se resuelve con una app de gastos',
          'Gasto en suscripciones; se resuelve cancelando el evento',
          'Presión social y FOMO; se resuelve proponiendo alternativas más baratas',
          'La regla 50/30/20; se resuelve gastándote el ahorro',
        ],
        answerIndex: 2,
        explanation:
          'Gastar para seguirles el ritmo a tus amigos es la trampa de la presión social y el FOMO. Proponer alternativas más baratas te deja conservar la amistad y el presupuesto. Tu categoría de ahorro te lo agradecerá.',
      },
      {
        question:
          'Antes de comprar algo que deseas, ¿qué pregunta final sugiere esta lección que te hagas?',
        options: [
          '¿Puedo ponerlo en una tarjeta de crédito?',
          '¿Me va a importar esta compra dentro de una semana?',
          '¿Está en oferta ahora mismo?',
          '¿Mis amigos ya lo tienen?',
        ],
        answerIndex: 1,
        explanation:
          'El consejo final: pregúntate si la compra te va a importar dentro de una semana. Si la respuesta es no, déjala pasar — esa sola pregunta filtra la mayoría de las compras impulsivas antes de que ocurran.',
      },
    ],
  },
}

export default lesson
