import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'entrepreneurship',
  week: 5,
  day: 4,
  title: 'Entrepreneurship & Side Hustles',
  emoji: '🚀',
  description:
    'Turn a lawn mower, a laptop, or a skill into your first real business — learn to spot problems worth solving, price like a pro, and keep the profit machine growing.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'You Do Not Need Permission to Start',
      body:
        "Here's something wild: you don't need a degree, an office, or anyone's permission to start a business. Mowing lawns, tutoring math, designing logos, reselling sneakers — teens run real businesses every single day. Entrepreneurship is just solving a problem for someone and getting paid for it. Today you'll learn how to find that problem, price your work, keep more of what you earn, and grow it — starting this weekend if you want. 🚀",
    },
    {
      type: 'content',
      heading: 'Spot a Problem Worth Solving',
      body:
        "Every business starts with someone's annoyance. Busy neighbors with shaggy lawns. Sixth graders drowning in pre-algebra. A local bakery with a logo from 1997. Great entrepreneurs are problem detectives: they notice what people complain about, what takes too much time, or what nobody wants to do. The test of a problem worth solving is simple — is the pain annoying enough that someone will happily PAY to make it go away?",
      bullets: [
        'Listen for complaints: every gripe is a business idea in disguise',
        "Look at what you're already good at — skills people ask you for help with",
        'Best starter ideas are things adults are too busy to do: yard work, tech help, pet care, tutoring',
        'If nobody would pay to fix it, it is a hobby, not a business — and hobbies are fine too!',
      ],
    },
    {
      type: 'content',
      heading: 'The Only Formula You Cannot Skip',
      body:
        "Every business on Earth — from a lemonade stand to Apple — runs on one equation: revenue - costs = profit. Revenue is all the money customers pay you. Costs are what you spend to deliver: gas, supplies, software, ad flyers. Profit is what's truly yours at the end. Beginners brag about revenue; real entrepreneurs obsess over profit. Earning $500 means nothing if it cost you $480 to do it.",
      bullets: [
        'Revenue: total money coming in from customers',
        'Costs: everything you spend to run the business (supplies, gas, fees, equipment)',
        'Profit = revenue - costs — the only number that actually goes in your pocket',
        'Track every cost, even small ones — they quietly eat profit',
      ],
    },
    {
      type: 'terms',
      heading: 'Founder Vocabulary',
      terms: [
        {
          term: 'Revenue',
          definition:
            'The total money your business brings in from customers before any expenses are subtracted.',
        },
        {
          term: 'Costs',
          definition:
            'The money you spend to run the business — supplies, gas, equipment, fees, and materials. Also called expenses.',
        },
        {
          term: 'Profit',
          definition:
            'Revenue minus costs — the money you actually keep. The true scoreboard of any business.',
        },
        {
          term: 'Market research',
          definition:
            'Finding out what customers want and what competitors charge BEFORE you launch — by asking, observing, and comparing.',
        },
        {
          term: 'MVP (minimum viable product)',
          definition:
            'The simplest version of your idea that you can offer to real customers, so you learn fast without betting big.',
        },
        {
          term: 'Form 1099',
          definition:
            'A tax form a client may send showing how much they paid you as an independent worker — a signal that self-employment income gets reported to the IRS.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Sam sells custom phone grips. This month he collected $300 from customers and spent $110 on materials and shipping. What is his profit?',
        options: [
          '$300 — everything customers paid him',
          '$110 — the amount he invested',
          '$190 — revenue minus costs',
          '$410 — revenue plus costs',
        ],
        answerIndex: 2,
        explanation:
          'That is the formula in action: $300 revenue - $110 costs = $190 profit. The $300 looks impressive, but only the $190 is actually his. Entrepreneurs who confuse revenue with profit run out of money fast.',
      },
    },
    {
      type: 'example',
      heading: "Example: Darius's Lawn Empire, Week One",
      body:
        'Darius mows lawns in his neighborhood for $40 each. In his first week he books 6 lawns: revenue = $240. His costs: $15 of gas, $10 for trimmer line and oil, and $6 for flyers = $31 total. Profit: $240 - $31 = $209 for roughly 9 hours of work — about $23 per hour, more than double what his friends make at the mall. Even better: the flyers were a one-time cost, so next week his profit margin grows without working a single extra hour. 🌱',
    },
    {
      type: 'content',
      heading: 'Pricing: The Goldilocks Zone',
      body:
        "Pricing feels scary, but it's just math plus confidence. Price too low and you work hard for crumbs — $10 lawns can actually LOSE money after gas. Price too high and customers pass. Find the Goldilocks zone: check what others charge locally, count your costs per job, and make sure your time earns a rate you respect. And remember — being a reliable, friendly teen who shows up on time IS a premium feature. People happily pay more for someone they trust.",
      bullets: [
        'Start with what competitors charge in YOUR area — that is your price range',
        'Add up your cost per job first; your price must clear it with room to spare',
        'Aim for a fair hourly rate after costs: if a $40 lawn takes 90 minutes plus $5 of gas, you earn about $23/hour',
        'Raise prices as your skills and reviews grow — do not stay at rookie rates forever',
      ],
    },
    {
      type: 'content',
      heading: 'Market Research Without a Lab Coat',
      body:
        "Big companies spend millions on market research; you can do a scrappy version for free in a weekend. The goal is simple: prove people actually want your thing BEFORE you spend real money. Ask 10 potential customers what they currently do about the problem and what they pay. Check local Facebook groups, Nextdoor, or flyers to see who else offers it and at what price. Then run the smallest possible test — one lawn, one tutoring session, one logo — and listen hard to the feedback.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Priya wants to launch a cookie business. What is the SMARTEST first step?',
        options: [
          'Spend $600 on a professional mixer and 50 pounds of flour',
          'Bake two test batches, sell them at a bake sale, and ask buyers what they would pay regularly',
          'Wait until she has a perfect logo and website',
          'Price the cookies at $1 each because cheapest always wins',
        ],
        answerIndex: 1,
        explanation:
          'That is MVP thinking! A small test with real customers teaches her what people want and will pay — before big money is at risk. The fancy mixer, the perfect website, and the race-to-the-bottom pricing can all wait until real demand is proven.',
      },
    },
    {
      type: 'content',
      heading: 'Reinvestment: Feed the Machine',
      body:
        "Here's the habit that separates hustlers from empire-builders: reinvestment. Instead of spending every dollar of profit, set aside a slice — say 25-30% — to make the business better. Darius banks $60 of his $209 weekly profit; in a month he has $240, enough for a used leaf blower that lets him charge $15 more per yard for cleanup add-ons. Profit buys tools, tools raise revenue, revenue grows profit. That loop is how small hustles snowball. ☃️",
      bullets: [
        'Set a fixed reinvestment percentage of every profit dollar (25-30% is a great start)',
        'Spend it on things that increase revenue: better tools, supplies in bulk, small ads',
        'Keep reinvestment money in a separate place so it does not get spent on snacks',
        'The rest of profit can be yours to save and spend — you earned it',
      ],
    },
    {
      type: 'content',
      heading: 'Taxes for the Self-Employed (Yes, Even You)',
      body:
        "When you work for yourself, no employer withholds taxes — YOU are the payroll department. If your net self-employment profit hits $400 or more in a year, the IRS generally expects you to file and pay self-employment tax, which is about 15.3% covering both halves of Social Security and Medicare (as an employee, your boss paid half — now you're both boss and employee). Clients who pay you enough may send you a Form 1099 reporting it, but the income counts even without a form. The lifesaver habit: keep records of every payment and every expense, because costs reduce the profit you're taxed on.",
      bullets: [
        'Net self-employment profit of $400+ in a year usually means you must file',
        'Self-employment tax is about 15.3% — both halves of Social Security and Medicare',
        'Save receipts: legitimate business costs lower your taxable profit',
        'A simple habit: set aside 20-25% of profit in a separate account for taxes, then relax',
      ],
    },
    {
      type: 'content',
      heading: 'MVP Thinking: Start Embarrassingly Small',
      body:
        "The number one killer of teen businesses isn't failure — it's never launching, because the plan got too big. MVP thinking flips that: launch the minimum viable product, the smallest real version of your idea, this week. One customer teaches you more than one month of planning. Amazon started by selling only books; Nike began with shoes sold from a car trunk. Your tutoring business can start with one student at your kitchen table. Start small, learn fast, improve every round — that is not a shortcut, it is literally how the giants did it. 🌟",
    },
  ],
  quiz: [
    {
      question: 'What is the core formula every business runs on?',
      options: [
        'Revenue + costs = profit',
        'Revenue - costs = profit',
        'Price x customers = profit',
        'Profit - taxes = revenue',
      ],
      answerIndex: 1,
      explanation:
        'Revenue (money in) minus costs (money spent to deliver) equals profit (money you keep). Revenue is the flashy number, but profit is the real scoreboard.',
    },
    {
      question:
        'Mia charges $25 per tutoring session and did 8 sessions this month, spending $40 on workbooks and bus fare. What is her profit?',
      options: ['$200', '$160', '$240', '$40'],
      answerIndex: 1,
      explanation:
        'Revenue is 8 x $25 = $200, and costs are $40, so profit = $200 - $40 = $160. Tracking those small costs matters — ignoring them would overstate her earnings by 25%.',
    },
    {
      question: 'What makes a problem "worth solving" as a business idea?',
      options: [
        'It sounds impressive on social media',
        'It requires expensive equipment to start',
        'People are annoyed enough by it that they will pay to make it go away',
        'No one has ever complained about it',
      ],
      answerIndex: 2,
      explanation:
        'A business exists when someone will pay for a solution. Complaints, chores nobody wants, and time-sucks are gold mines; if nobody would pay to fix it, it is a hobby rather than a business.',
    },
    {
      question:
        'Why should a self-employed teen keep records of every payment and expense?',
      options: [
        'Records are only needed by big corporations',
        'To make the business look bigger to friends',
        'So they can charge customers twice',
        'Because self-employment income of $400+ profit is generally taxable, and documented expenses reduce taxable profit',
      ],
      answerIndex: 3,
      explanation:
        'With no employer withholding taxes for you, you are your own payroll department. Once net profit hits $400 in a year, self-employment tax (about 15.3% for Social Security and Medicare) generally applies — and good expense records legally shrink the profit you are taxed on.',
    },
    {
      question: 'What does it mean to reinvest in your business?',
      options: [
        'Using part of your profit to buy things that help the business grow, like better tools',
        'Spending all profit on personal rewards',
        'Asking customers to invest in you',
        'Putting all revenue into a checking account and forgetting it',
      ],
      answerIndex: 0,
      explanation:
        'Reinvestment means routing a slice of profit — say 25-30% — back into the business: equipment, supplies, small ads. Better tools raise revenue, which raises profit, which funds more growth. That loop is how side hustles snowball.',
    },
    {
      question: 'Which launch plan best shows MVP thinking?',
      options: [
        'Spend six months building a website before serving anyone',
        'Borrow $2,000 for professional equipment on day one',
        'Offer the simplest real version of the service to a few customers this week and improve based on feedback',
        'Wait until the idea is perfect and competition disappears',
      ],
      answerIndex: 2,
      explanation:
        'The minimum viable product is the smallest real version customers can actually buy. Launching small and early gets you real feedback with low risk — one paying customer teaches more than months of planning.',
    },
  ],
  es: {
    title: 'Emprendimiento y Negocios Paralelos',
    description:
      'Convierte una podadora, una laptop o una habilidad en tu primer negocio de verdad: aprende a detectar problemas que vale la pena resolver, a poner precios como un profesional y a mantener la máquina de ganancias creciendo.',
    sections: [
      {
        type: 'intro',
        heading: 'No Necesitas Permiso para Empezar',
        body:
          'Aquí va algo increíble: no necesitas un título, una oficina ni el permiso de nadie para empezar un negocio. Cortar el césped, dar clases de matemáticas, diseñar logos, revender tenis: los adolescentes manejan negocios reales todos los días. Emprender es simplemente resolverle un problema a alguien y cobrar por ello. Hoy vas a aprender cómo encontrar ese problema, ponerle precio a tu trabajo, quedarte con más de lo que ganas y hacerlo crecer, empezando este fin de semana si quieres. 🚀',
      },
      {
        type: 'content',
        heading: 'Detecta un Problema que Valga la Pena Resolver',
        body:
          'Todo negocio empieza con la molestia de alguien. Vecinos ocupados con el césped descuidado. Estudiantes de sexto ahogándose en pre-álgebra. Una panadería local con un logo de 1997. Los grandes emprendedores son detectives de problemas: se fijan en lo que la gente se queja, en lo que toma demasiado tiempo o en lo que nadie quiere hacer. La prueba de un problema que vale la pena resolver es simple: ¿la molestia es lo bastante fastidiosa como para que alguien PAGUE con gusto para que desaparezca?',
        bullets: [
          'Escucha las quejas: cada queja es una idea de negocio disfrazada',
          'Fíjate en lo que ya haces bien: las habilidades por las que la gente te pide ayuda',
          'Las mejores ideas para empezar son cosas que los adultos están demasiado ocupados para hacer: jardinería, ayuda con tecnología, cuidado de mascotas, tutorías',
          'Si nadie pagaría por resolverlo, es un pasatiempo, no un negocio, ¡y los pasatiempos también están bien!',
        ],
      },
      {
        type: 'content',
        heading: 'La Única Fórmula que No Puedes Saltarte',
        body:
          'Todo negocio del planeta, desde un puesto de limonada hasta Apple, funciona con una sola ecuación: ingresos - costos = ganancia. Los ingresos son todo el dinero que los clientes te pagan. Los costos son lo que gastas para entregar: gasolina, materiales, software, volantes de publicidad. La ganancia es lo que de verdad es tuyo al final. Los principiantes presumen de sus ingresos; los verdaderos emprendedores se obsesionan con la ganancia. Ganar $500 no significa nada si te costó $480 lograrlo.',
        bullets: [
          'Ingresos: todo el dinero que entra de los clientes',
          'Costos: todo lo que gastas para hacer funcionar el negocio (materiales, gasolina, comisiones, equipo)',
          'Ganancia = ingresos - costos: el único número que de verdad llega a tu bolsillo',
          'Registra cada costo, incluso los pequeños: se comen la ganancia sin que te des cuenta',
        ],
      },
      {
        type: 'terms',
        heading: 'Vocabulario de Fundador',
        terms: [
          {
            term: 'Ingresos (revenue)',
            definition:
              'Todo el dinero que tu negocio recibe de los clientes antes de restar cualquier gasto.',
          },
          {
            term: 'Costos (costs)',
            definition:
              'El dinero que gastas para hacer funcionar el negocio: materiales, gasolina, equipo, comisiones y suministros. También se llaman gastos.',
          },
          {
            term: 'Ganancia (profit)',
            definition:
              'Los ingresos menos los costos: el dinero que de verdad te quedas. El verdadero marcador de cualquier negocio.',
          },
          {
            term: 'Investigación de mercado (market research)',
            definition:
              'Averiguar qué quieren los clientes y cuánto cobran los competidores ANTES de lanzarte, preguntando, observando y comparando.',
          },
          {
            term: 'MVP (producto mínimo viable)',
            definition:
              'La versión más simple de tu idea que puedes ofrecer a clientes reales, para aprender rápido sin apostar en grande.',
          },
          {
            term: 'Formulario 1099',
            definition:
              'Un formulario de impuestos que un cliente puede enviarte mostrando cuánto te pagó como trabajador independiente: una señal de que los ingresos por cuenta propia se reportan al IRS.',
          },
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Sam vende agarraderas personalizadas para el celular. Este mes recaudó $300 de sus clientes y gastó $110 en materiales y envío. ¿Cuál es su ganancia?',
          options: [
            '$300: todo lo que le pagaron los clientes',
            '$110: la cantidad que invirtió',
            '$190: ingresos menos costos',
            '$410: ingresos más costos',
          ],
          answerIndex: 2,
          explanation:
            'Esa es la fórmula en acción: $300 de ingresos - $110 de costos = $190 de ganancia. Los $300 se ven impresionantes, pero solo los $190 son de verdad suyos. Los emprendedores que confunden ingresos con ganancia se quedan sin dinero rápido.',
        },
      },
      {
        type: 'example',
        heading: 'Ejemplo: El Imperio de Céspedes de Darius, Semana Uno',
        body:
          'Darius corta el césped en su vecindario por $40 cada uno. En su primera semana consigue 6 céspedes: ingresos = $240. Sus costos: $15 de gasolina, $10 de hilo para la bordeadora y aceite, y $6 de volantes = $31 en total. Ganancia: $240 - $31 = $209 por unas 9 horas de trabajo, cerca de $23 por hora, más del doble de lo que ganan sus amigos en el centro comercial. Y mejor aún: los volantes fueron un costo de una sola vez, así que la próxima semana su margen de ganancia crece sin trabajar ni una hora extra. 🌱',
      },
      {
        type: 'content',
        heading: 'Poner Precios: La Zona Perfecta',
        body:
          'Poner precios da miedo, pero es solo matemática más confianza. Si cobras muy poco, trabajas duro por migajas: un césped a $10 en realidad puede PERDER dinero después de la gasolina. Si cobras demasiado, los clientes se van. Encuentra la zona perfecta: fíjate cuánto cobran otros en tu zona, cuenta tus costos por trabajo y asegúrate de que tu tiempo gane una tarifa que respetes. Y recuerda: ser un adolescente confiable, amable y puntual ES una característica premium. La gente paga con gusto más por alguien en quien confía.',
        bullets: [
          'Empieza con lo que cobran los competidores en TU zona: ese es tu rango de precios',
          'Suma primero tu costo por trabajo; tu precio debe cubrirlo con margen de sobra',
          'Apunta a una tarifa por hora justa después de costos: si un césped de $40 toma 90 minutos más $5 de gasolina, ganas cerca de $23 por hora',
          'Sube los precios a medida que crecen tus habilidades y reseñas: no te quedes con tarifas de principiante para siempre',
        ],
      },
      {
        type: 'content',
        heading: 'Investigación de Mercado Sin Bata de Laboratorio',
        body:
          'Las grandes empresas gastan millones en investigación de mercado; tú puedes hacer una versión modesta gratis en un fin de semana. La meta es simple: comprobar que la gente de verdad quiere tu producto ANTES de gastar dinero real. Pregúntales a 10 clientes potenciales qué hacen actualmente con el problema y cuánto pagan. Revisa grupos locales de Facebook, Nextdoor o volantes para ver quién más lo ofrece y a qué precio. Luego haz la prueba más pequeña posible: un césped, una sesión de tutoría, un logo, y escucha con atención los comentarios.',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Priya quiere lanzar un negocio de galletas. ¿Cuál es el primer paso MÁS INTELIGENTE?',
          options: [
            'Gastar $600 en una batidora profesional y 50 libras de harina',
            'Hornear dos lotes de prueba, venderlos en una venta de repostería y preguntarles a los compradores cuánto pagarían de manera habitual',
            'Esperar hasta tener un logo y un sitio web perfectos',
            'Poner las galletas a $1 cada una porque lo más barato siempre gana',
          ],
          answerIndex: 1,
          explanation:
            '¡Eso es pensar como un MVP! Una prueba pequeña con clientes reales le enseña qué quiere la gente y cuánto pagará, antes de arriesgar mucho dinero. La batidora elegante, el sitio web perfecto y los precios de carrera hacia el fondo pueden esperar hasta que se compruebe una demanda real.',
        },
      },
      {
        type: 'content',
        heading: 'Reinversión: Alimenta la Máquina',
        body:
          'Aquí va el hábito que separa a los que hacen negocitos de los que construyen imperios: la reinversión. En lugar de gastar cada dólar de ganancia, aparta una parte, digamos 25-30%, para mejorar el negocio. Darius guarda $60 de sus $209 de ganancia semanal; en un mes tiene $240, suficiente para un soplador de hojas usado que le permite cobrar $15 más por césped en servicios extra de limpieza. La ganancia compra herramientas, las herramientas suben los ingresos, los ingresos hacen crecer la ganancia. Ese ciclo es cómo los pequeños negocios se vuelven una bola de nieve. ☃️',
        bullets: [
          'Fija un porcentaje de reinversión fijo de cada dólar de ganancia (25-30% es un gran comienzo)',
          'Gástalo en cosas que aumenten los ingresos: mejores herramientas, materiales al por mayor, pequeños anuncios',
          'Guarda el dinero de reinversión en un lugar aparte para que no se gaste en botanas',
          'El resto de la ganancia puede ser tuyo para ahorrar y gastar: te lo ganaste',
        ],
      },
      {
        type: 'content',
        heading: 'Impuestos para los que Trabajan por Cuenta Propia (Sí, Hasta Tú)',
        body:
          'Cuando trabajas para ti mismo, ningún empleador retiene impuestos: TÚ eres el departamento de nómina. Si tu ganancia neta por cuenta propia llega a $400 o más en un año, el IRS por lo general espera que declares y pagues el impuesto sobre el trabajo por cuenta propia, que es cerca del 15.3% y cubre las dos mitades del Seguro Social y Medicare (como empleado, tu jefe pagaba la mitad; ahora eres jefe y empleado a la vez). Los clientes que te pagan lo suficiente pueden enviarte un Formulario 1099 que lo reporta, pero el ingreso cuenta incluso sin formulario. El hábito salvavidas: lleva un registro de cada pago y cada gasto, porque los costos reducen la ganancia sobre la que te cobran impuestos.',
        bullets: [
          'Una ganancia neta por cuenta propia de $400 o más en un año por lo general significa que debes declarar',
          'El impuesto sobre el trabajo por cuenta propia es cerca del 15.3%: las dos mitades del Seguro Social y Medicare',
          'Guarda los recibos: los costos legítimos del negocio reducen tu ganancia gravable',
          'Un hábito simple: aparta 20-25% de la ganancia en una cuenta separada para los impuestos, y luego relájate',
        ],
      },
      {
        type: 'content',
        heading: 'Pensar como MVP: Empieza Vergonzosamente Pequeño',
        body:
          'El asesino número uno de los negocios de adolescentes no es el fracaso: es nunca lanzarlos, porque el plan se hizo demasiado grande. Pensar como MVP le da la vuelta a eso: lanza el producto mínimo viable, la versión real más pequeña de tu idea, esta semana. Un cliente te enseña más que un mes de planeación. Amazon empezó vendiendo solo libros; Nike comenzó con zapatos vendidos desde la cajuela de un auto. Tu negocio de tutorías puede empezar con un solo estudiante en la mesa de tu cocina. Empieza pequeño, aprende rápido, mejora en cada ronda: eso no es un atajo, es literalmente cómo lo hicieron los gigantes. 🌟',
      },
    ],
    quiz: [
      {
        question: '¿Cuál es la fórmula central con la que funciona todo negocio?',
        options: [
          'Ingresos + costos = ganancia',
          'Ingresos - costos = ganancia',
          'Precio x clientes = ganancia',
          'Ganancia - impuestos = ingresos',
        ],
        answerIndex: 1,
        explanation:
          'Los ingresos (dinero que entra) menos los costos (dinero gastado para entregar) son iguales a la ganancia (dinero que te quedas). Los ingresos son el número llamativo, pero la ganancia es el verdadero marcador.',
      },
      {
        question:
          'Mia cobra $25 por sesión de tutoría e hizo 8 sesiones este mes, gastando $40 en cuadernos de trabajo y pasajes de autobús. ¿Cuál es su ganancia?',
        options: ['$200', '$160', '$240', '$40'],
        answerIndex: 1,
        explanation:
          'Los ingresos son 8 x $25 = $200, y los costos son $40, así que la ganancia = $200 - $40 = $160. Registrar esos costos pequeños importa: ignorarlos exageraría sus ganancias en un 25%.',
      },
      {
        question: '¿Qué hace que un problema "valga la pena resolver" como idea de negocio?',
        options: [
          'Suena impresionante en las redes sociales',
          'Requiere equipo costoso para empezar',
          'La gente está lo bastante molesta por él como para pagar para que desaparezca',
          'Nadie se ha quejado nunca de él',
        ],
        answerIndex: 2,
        explanation:
          'Un negocio existe cuando alguien pagará por una solución. Las quejas, las tareas que nadie quiere y las cosas que roban tiempo son minas de oro; si nadie pagaría por resolverlo, es un pasatiempo y no un negocio.',
      },
      {
        question:
          '¿Por qué un adolescente que trabaja por cuenta propia debería llevar un registro de cada pago y gasto?',
        options: [
          'Los registros solo los necesitan las grandes corporaciones',
          'Para que el negocio se vea más grande ante los amigos',
          'Para poder cobrarles dos veces a los clientes',
          'Porque los ingresos por cuenta propia con una ganancia de $400 o más suelen ser gravables, y los gastos documentados reducen la ganancia gravable',
        ],
        answerIndex: 3,
        explanation:
          'Como ningún empleador te retiene impuestos, tú eres tu propio departamento de nómina. Una vez que la ganancia neta llega a $400 en un año, el impuesto sobre el trabajo por cuenta propia (cerca del 15.3% para el Seguro Social y Medicare) por lo general aplica, y llevar buenos registros de gastos reduce legalmente la ganancia sobre la que te cobran impuestos.',
      },
      {
        question: '¿Qué significa reinvertir en tu negocio?',
        options: [
          'Usar parte de tu ganancia para comprar cosas que ayudan a crecer el negocio, como mejores herramientas',
          'Gastar toda la ganancia en recompensas personales',
          'Pedirles a los clientes que inviertan en ti',
          'Poner todos los ingresos en una cuenta corriente y olvidarte de ellos',
        ],
        answerIndex: 0,
        explanation:
          'Reinvertir significa dirigir una parte de la ganancia, digamos 25-30%, de vuelta al negocio: equipo, materiales, pequeños anuncios. Mejores herramientas suben los ingresos, lo que sube la ganancia, lo que financia más crecimiento. Ese ciclo es cómo los negocios paralelos se vuelven una bola de nieve.',
      },
      {
        question: '¿Qué plan de lanzamiento muestra mejor el pensamiento MVP?',
        options: [
          'Pasar seis meses construyendo un sitio web antes de atender a nadie',
          'Pedir prestados $2,000 para equipo profesional el primer día',
          'Ofrecer la versión real más simple del servicio a unos cuantos clientes esta semana y mejorar según los comentarios',
          'Esperar hasta que la idea sea perfecta y la competencia desaparezca',
        ],
        answerIndex: 2,
        explanation:
          'El producto mínimo viable es la versión real más pequeña que los clientes pueden comprar de verdad. Lanzarte pequeño y temprano te da comentarios reales con poco riesgo: un cliente que paga enseña más que meses de planeación.',
      },
    ],
  },
}

export default lesson
