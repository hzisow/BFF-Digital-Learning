import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'entrepreneurship',
 week: 5,
 day: 4,
 title: 'Entrepreneurship & Side Hustles',
 icon: 'rocket',
 description:
 'Turn a lawn mower, a laptop, or a skill into your first real business, learn to spot problems worth solving, price like a pro, and keep the profit machine growing.',
 durationMin: 15,
 sections: [
 {
 type: 'intro',
 heading: 'You Do Not Need Permission to Start',
 body:
 "Here's something wild: you don't need a degree, an office, or anyone's permission to start a business. Mowing lawns, tutoring math, designing logos, reselling sneakers, teens run real businesses every single day. Entrepreneurship is just solving a problem for someone and getting paid for it. Today you'll learn how to find that problem, price your work, keep more of what you earn, and grow it, starting this weekend if you want.",
 },
 {
 type: 'content',
 heading: 'Spot a Problem Worth Solving',
 body:
 "Every business starts with someone's annoyance. Busy neighbors with shaggy lawns. Sixth graders drowning in pre-algebra. A local bakery with a logo from 1997. Great entrepreneurs are problem detectives: they notice what people complain about, what takes too much time, or what nobody wants to do. The test of a problem worth solving is simple. Is the pain annoying enough that someone will happily PAY to make it go away?",
 bullets: [
 'Listen for complaints: every gripe is a business idea in disguise',
 "Look at what you're already good at, skills people ask you for help with",
 'Best starter ideas are things adults are too busy to do: yard work, tech help, pet care, tutoring',
 'If nobody would pay to fix it, it is a hobby, not a business, and hobbies are fine too!',
 ],
 },
 {
 type: 'content',
 heading: 'The Only Formula You Cannot Skip',
 body:
 "Every business on Earth, from a lemonade stand to Apple, runs on one equation: revenue - costs = profit. Revenue is all the money customers pay you. Costs are what you spend to deliver: gas, supplies, software, ad flyers. Profit is what's truly yours at the end. Beginners brag about revenue; real entrepreneurs obsess over profit. Earning $500 means nothing if it cost you $480 to do it.",
 bullets: [
 'Revenue: total money coming in from customers',
 'Costs: everything you spend to run the business (supplies, gas, fees, equipment)',
 'Profit = revenue - costs, the only number that actually goes in your pocket',
 'Track every cost, even small ones, they quietly eat profit',
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
 'The money you spend to run the business, supplies, gas, equipment, fees, and materials. Also called expenses.',
 },
 {
 term: 'Profit',
 definition:
 'Revenue minus costs. The money you actually keep. The true scoreboard of any business.',
 },
 {
 term: 'Market research',
 definition:
 'Finding out what customers want and what competitors charge BEFORE you launch, by asking, observing, and comparing.',
 },
 {
 term: 'MVP (minimum viable product)',
 definition:
 'The simplest version of your idea that you can offer to real customers, so you learn fast without betting big.',
 },
 {
 term: 'Form 1099',
 definition:
 'A tax form a client may send showing how much they paid you as an independent worker, a signal that self-employment income gets reported to the IRS.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Sam sells custom phone grips. This month he collected $300 from customers and spent $110 on materials and shipping. What is his profit?',
 options: [
 '$300, everything customers paid him',
 '$110, the amount he invested',
 '$190, revenue minus costs',
 '$410, revenue plus costs',
 ],
 answerIndex: 2,
 explanation:
 'That is the formula in action: $300 revenue - $110 costs = $190 profit. The $300 looks impressive, but only the $190 is actually his. Entrepreneurs who confuse revenue with profit run out of money fast.',
 },
 },
 {
   type: 'video',
   heading: 'Watch: Start Embarrassingly Small',
   body:
     'Watch this quick BFF video on finding a problem worth solving and the one formula you cannot skip. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 'amnwyA9Mb6o',
   source: 'BFF Classroom',
   aspect: 3 / 2,
   questions: [
     {
       at: 57,
       question:
         'Where does Alvin say a business should start?',
       options: [
         'With a clever idea nobody has had',
         'With a problem people already deal with',
         'With money to invest',
         'With a name and a logo',
       ],
       answerIndex: 1,
       explanation:
         'Parents who cannot find a babysitter on short notice, classmates who need a decent picture, neighbors with a yard nobody wants to touch. If you cannot name who is annoyed and what they do instead, you do not have a business yet.',
     },
     {
       at: 88,
       question:
         'You charge $25 to mow a lawn and spend $6 on gas. What did you make?',
       options: [
         '$25',
         '$19',
         '$31',
         '$6',
       ],
       answerIndex: 1,
       explanation:
         "Revenue minus costs equals profit, so $25 minus $6 is $19. Alvin's warning is that getting this wrong is how you end up busy every weekend and broke every month.",
     },
     {
       at: 112,
       question:
         'What does he suggest for pricing when you are starting out?',
       options: [
         'Charge the highest price you can',
         'Price slightly under competitors while you build reviews, then raise it',
         'Work free until people trust you',
         'Match the cheapest person exactly',
       ],
       answerIndex: 1,
       explanation:
         'Too low and you are working for free and attracting customers who complain. Too high with no track record and nobody buys. Price a little under while you build a backing, then raise it.',
     },
     {
       at: 140,
       question:
         'You are self-employed. What should you do about taxes?',
       options: [
         'Nothing, they come out automatically',
         'Set aside roughly a quarter of what you make, since nothing is withheld for you',
         'Only worry once you earn over $10,000',
         'Your customers report it for you',
       ],
       answerIndex: 1,
       explanation:
         'Self-employed income is not withheld the way a paycheck is, and it has to be self-reported. Putting aside about a quarter as you go is what keeps April from ambushing you.',
     },
   ],
 },

 {
 type: 'example',
 heading: "Example: Darius's Lawn Empire, Week One",
 body:
 'Darius mows lawns in his neighborhood for $40 each. In his first week he books 6 lawns: revenue = $240. His costs: $15 of gas, $10 for trimmer line and oil, and $6 for flyers = $31 total. Profit: $240 - $31 = $209 for roughly 9 hours of work, about $23 per hour, more than double what his friends make at the mall. Even better: the flyers were a one-time cost, so next week his profit margin grows without working a single extra hour.',
 },
 {
 type: 'content',
 heading: 'Pricing: The Goldilocks Zone',
 body:
 "Pricing feels scary, but it's just math plus confidence. Price too low and you work hard for crumbs, $10 lawns can actually LOSE money after gas. Price too high and customers pass. Find the Goldilocks zone: check what others charge locally, count your costs per job, and make sure your time earns a rate you respect. And remember, being a reliable, friendly teen who shows up on time IS a premium feature. People happily pay more for someone they trust.",
 bullets: [
 'Start with what competitors charge in YOUR area. That is your price range',
 'Add up your cost per job first; your price must clear it with room to spare',
 'Aim for a fair hourly rate after costs: if a $40 lawn takes 90 minutes plus $5 of gas, you earn about $23/hour',
 'Raise prices as your skills and reviews grow. Do not stay at rookie rates forever',
 ],
 },
 {
 type: 'content',
 heading: 'Market Research Without a Lab Coat',
 body:
 "Big companies spend millions on market research; you can do a scrappy version for free in a weekend. The goal is simple: prove people actually want your thing BEFORE you spend real money. Ask 10 potential customers what they currently do about the problem and what they pay. Check local Facebook groups, Nextdoor, or flyers to see who else offers it and at what price. Then run the smallest possible test, one lawn, one tutoring session, one logo, and listen hard to the feedback.",
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
 'That is MVP thinking! A small test with real customers teaches her what people want and will pay, before big money is at risk. The fancy mixer, the perfect website, and the race-to-the-bottom pricing can all wait until real demand is proven.',
 },
 },
 {
 type: 'content',
 heading: 'Reinvestment: Feed the Machine',
 body:
 "Here's the habit that separates hustlers from empire-builders: reinvestment. Instead of spending every dollar of profit, set aside a slice, say 25-30%, to make the business better. Darius banks $60 of his $209 weekly profit; in a month he has $240, enough for a used leaf blower that lets him charge $15 more per yard for cleanup add-ons. Profit buys tools, tools raise revenue, revenue grows profit. That loop is how small hustles snowball.",
 bullets: [
 'Set a fixed reinvestment percentage of every profit dollar (25-30% is a great start)',
 'Spend it on things that increase revenue: better tools, supplies in bulk, small ads',
 'Keep reinvestment money in a separate place so it does not get spent on snacks',
 'The rest of profit can be yours to save and spend, you earned it',
 ],
 },
 {
 type: 'content',
 heading: 'Taxes for the Self-Employed (Yes, Even You)',
 body:
 "When you work for yourself, no employer withholds taxes, YOU are the payroll department. If your net self-employment profit hits $400 or more in a year, the IRS generally expects you to file and pay self-employment tax, which is about 15.3% covering both halves of Social Security and Medicare (as an employee, your boss paid half, now you're both boss and employee). Clients who pay you enough may send you a Form 1099 reporting it, but the income counts even without a form. The lifesaver habit: keep records of every payment and every expense, because costs reduce the profit you're taxed on.",
 bullets: [
 'Net self-employment profit of $400+ in a year usually means you must file',
 'Self-employment tax is about 15.3%, both halves of Social Security and Medicare',
 'Save receipts: legitimate business costs lower your taxable profit',
 'A simple habit: set aside 20-25% of profit in a separate account for taxes, then relax',
 ],
 },
 {
 type: 'content',
 heading: 'MVP Thinking: Start Embarrassingly Small',
 body:
 "The number one killer of teen businesses isn't failure, it's never launching, because the plan got too big. MVP thinking flips that: launch the minimum viable product, the smallest real version of your idea, this week. One customer teaches you more than one month of planning. Amazon started by selling only books; Nike began with shoes sold from a car trunk. Your tutoring business can start with one student at your kitchen table. Start small, learn fast, improve every round, that is not a shortcut, it is literally how the giants did it.",
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
 'Revenue is 8 x $25 = $200, and costs are $40, so profit = $200 - $40 = $160. Tracking those small costs matters. Ignoring them would overstate her earnings by 25%.',
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
 'With no employer withholding taxes for you, you are your own payroll department. Once net profit hits $400 in a year, self-employment tax (about 15.3% for Social Security and Medicare) generally applies, and good expense records legally shrink the profit you are taxed on.',
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
 'Reinvestment means routing a slice of profit, say 25-30%, back into the business: equipment, supplies, small ads. Better tools raise revenue, which raises profit, which funds more growth. That loop is how side hustles snowball.',
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
 'The minimum viable product is the smallest real version customers can actually buy. Launching small and early gets you real feedback with low risk, one paying customer teaches more than months of planning.',
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
 'Aquí va algo increíble: no necesitas un título, una oficina ni el permiso de nadie para empezar un negocio. Cortar el césped, dar clases de matemáticas, diseñar logos, revender tenis: los adolescentes manejan negocios reales todos los días. Emprender es simplemente resolverle un problema a alguien y cobrar por ello. Hoy vas a aprender cómo encontrar ese problema, ponerle precio a tu trabajo, quedarte con más de lo que ganas y hacerlo crecer, empezando este fin de semana si quieres.',
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
   type: 'video',
   heading: 'Míralo: Empieza tan pequeño que dé vergüenza',
   body:
     'Mira este video corto de BFF sobre cómo encontrar un problema que valga la pena resolver y la única fórmula que no puedes saltarte. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 'amnwyA9Mb6o',
   source: 'BFF Classroom',
   aspect: 3 / 2,
   questions: [
     {
       at: 57,
       question:
         '¿Por dónde dice Alvin que debe empezar un negocio?',
       options: [
         'Por una idea genial que nadie ha tenido',
         'Por un problema que la gente ya sufre',
         'Por tener dinero para invertir',
         'Por un nombre y un logo',
       ],
       answerIndex: 1,
       explanation:
         'Padres que no encuentran niñera de un día para otro, compañeros que necesitan una buena foto, vecinos con un jardín que nadie quiere tocar. Si no puedes decir quién está molesto y qué hace en su lugar, todavía no tienes un negocio.',
     },
     {
       at: 88,
       question:
         'Cobras $25 por cortar un jardín y gastas $6 en gasolina. ¿Cuánto ganaste?',
       options: [
         '$25',
         '$19',
         '$31',
         '$6',
       ],
       answerIndex: 1,
       explanation:
         'Ingresos menos costos es igual a ganancia, así que $25 menos $6 son $19. La advertencia de Alvin es que equivocarse en esto es como acabas ocupado cada fin de semana y sin dinero cada mes.',
     },
     {
       at: 112,
       question:
         '¿Qué sugiere sobre los precios cuando apenas empiezas?',
       options: [
         'Cobrar lo más alto posible',
         'Cobrar un poco menos que la competencia mientras juntas reseñas, y luego subir',
         'Trabajar gratis hasta que confíen en ti',
         'Igualar exactamente al más barato',
       ],
       answerIndex: 1,
       explanation:
         'Muy barato y trabajas gratis atrayendo clientes que se quejan. Muy caro sin historial y nadie te compra. Cobra un poco menos mientras construyes respaldo, y después sube.',
     },
     {
       at: 140,
       question:
         'Trabajas por tu cuenta. ¿Qué debes hacer con los impuestos?',
       options: [
         'Nada, se descuentan solos',
         'Apartar más o menos una cuarta parte de lo que ganas, porque nadie retiene nada por ti',
         'Preocuparte solo si superas los $10,000',
         'Tus clientes lo reportan por ti',
       ],
       answerIndex: 1,
       explanation:
         'El ingreso por cuenta propia no se retiene como en un cheque de nómina y hay que reportarlo uno mismo. Apartar cerca de una cuarta parte sobre la marcha es lo que evita que abril te tome por sorpresa.',
     },
   ],
 },

 {
 type: 'example',
 heading: 'Ejemplo: El Imperio de Céspedes de Darius, Semana Uno',
 body:
 'Darius corta el césped en su vecindario por $40 cada uno. En su primera semana consigue 6 céspedes: ingresos = $240. Sus costos: $15 de gasolina, $10 de hilo para la bordeadora y aceite, y $6 de volantes = $31 en total. Ganancia: $240 - $31 = $209 por unas 9 horas de trabajo, cerca de $23 por hora, más del doble de lo que ganan sus amigos en el centro comercial. Y mejor aún: los volantes fueron un costo de una sola vez, así que la próxima semana su margen de ganancia crece sin trabajar ni una hora extra.',
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
 'Aquí va el hábito que separa a los que hacen negocitos de los que construyen imperios: la reinversión. En lugar de gastar cada dólar de ganancia, aparta una parte, digamos 25-30%, para mejorar el negocio. Darius guarda $60 de sus $209 de ganancia semanal; en un mes tiene $240, suficiente para un soplador de hojas usado que le permite cobrar $15 más por césped en servicios extra de limpieza. La ganancia compra herramientas, las herramientas suben los ingresos, los ingresos hacen crecer la ganancia. Ese ciclo es cómo los pequeños negocios se vuelven una bola de nieve.',
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
 'El asesino número uno de los negocios de adolescentes no es el fracaso: es nunca lanzarlos, porque el plan se hizo demasiado grande. Pensar como MVP le da la vuelta a eso: lanza el producto mínimo viable, la versión real más pequeña de tu idea, esta semana. Un cliente te enseña más que un mes de planeación. Amazon empezó vendiendo solo libros; Nike comenzó con zapatos vendidos desde la cajuela de un auto. Tu negocio de tutorías puede empezar con un solo estudiante en la mesa de tu cocina. Empieza pequeño, aprende rápido, mejora en cada ronda: eso no es un atajo, es literalmente cómo lo hicieron los gigantes.',
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
 zh: {
 title: '创业与副业',
 description:
 '把一台割草机、一台笔记本电脑或一项技能变成你的第一门真正的生意，学会发现值得解决的问题、像行家一样定价，并让这台赚钱机器不断成长。',
 sections: [
 {
 type: 'intro',
 heading: '开始创业不需要任何人的许可',
 body:
 '有件事挺疯狂的：你不需要学位、办公室，也不需要任何人的许可就能开始一门生意。割草、辅导数学、设计logo、转卖球鞋，青少年每天都在经营真正的生意。创业无非就是替别人解决一个问题，然后收钱。今天你会学到如何找到那个问题、给你的工作定价、留下更多你赚到的钱，并让它成长，只要你愿意，这个周末就能开始。',
 },
 {
 type: 'content',
 heading: '发现一个值得解决的问题',
 body:
 '每一门生意都始于某个人的烦恼。忙碌的邻居家草坪乱糟糟的。六年级学生被前代数（pre-algebra）折磨得快淹死了。本地一家面包店还用着1997年的logo。厉害的创业者都是问题侦探：他们留意人们抱怨什么、什么太费时间、什么没人愿意做。判断一个问题是否值得解决很简单，这个痛点烦人到有人愿意乐呵呵地掏钱把它解决掉吗？',
 bullets: [
 '倾听抱怨：每一句牢骚都是一个乔装打扮的生意点子',
 '看看你已经擅长什么，那些别人会找你帮忙的技能',
 '最好的入门点子是大人们太忙而顾不上做的事：院子活、技术帮助、宠物照料、辅导',
 '如果没人愿意花钱解决它，那它就是爱好，不是生意，爱好也挺好的！',
 ],
 },
 {
 type: 'content',
 heading: '你无法跳过的唯一公式',
 body:
 '地球上每一门生意，从卖柠檬水的小摊到Apple：都靠一条等式运转：收入 - 成本 = 利润。收入是顾客付给你的全部钱。成本是你为交付而花掉的钱：汽油、材料、软件、广告传单。利润才是最后真正属于你的。新手爱吹嘘收入；真正的创业者痴迷于利润。赚500美元一点意义都没有，如果为此你花掉了480美元。',
 bullets: [
 '收入：从顾客那里进来的全部钱',
 '成本：你为经营生意花掉的一切（材料、汽油、手续费、设备）',
 '利润 = 收入 - 成本，唯一真正进你口袋的那个数字',
 '记下每一笔成本，哪怕是小额的，它们会悄悄吃掉利润',
 ],
 },
 {
 type: 'terms',
 heading: '创始人词汇',
 terms: [
 {
 term: '收入（revenue）',
 definition:
 '在扣除任何费用之前，你的生意从顾客那里带来的全部钱。',
 },
 {
 term: '成本（costs）',
 definition:
 '你为经营生意花掉的钱，材料、汽油、设备、手续费和物料。也叫作开支。',
 },
 {
 term: '利润（profit）',
 definition:
 '收入减去成本，你真正留下的钱。任何生意真正的记分牌。',
 },
 {
 term: '市场调研（market research）',
 definition:
 '在你上线之前，通过询问、观察和比较，弄清楚顾客想要什么、竞争对手收多少钱。',
 },
 {
 term: 'MVP（最小可行产品，minimum viable product）',
 definition:
 '你能拿给真实顾客的、你点子的最简版本，让你快速学习而不必下大注。',
 },
 {
 term: '1099表（Form 1099）',
 definition:
 '客户可能寄给你的一份税表，显示他们作为独立工作者付了你多少钱，一个信号，表明个体经营收入会被报告给IRS。',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Sam卖定制手机指环支架。这个月他从顾客那里收了300美元，在材料和运费上花了110美元。他的利润是多少？',
 options: [
 '300美元，顾客付给他的全部',
 '110美元，他投入的金额',
 '190美元，收入减去成本',
 '410美元，收入加上成本',
 ],
 answerIndex: 2,
 explanation:
 '这就是公式在起作用：300美元收入 - 110美元成本 = 190美元利润。300美元看起来很唬人，但只有那190美元才真正是他的。把收入和利润搞混的创业者很快就会没钱花。',
 },
 },
 {
   type: 'video',
   heading: '观看：小到不好意思地开始',
   body:
     '看看这个 BFF 短视频，学会找到值得解决的问题，以及那条绝不能跳过的公式。注意，视频中途会暂停提问，认真看哦！',
   videoId: 'amnwyA9Mb6o',
   source: 'BFF Classroom',
   aspect: 3 / 2,
   questions: [
     {
       at: 57,
       question:
         'Alvin 说做生意应该从哪里开始？',
       options: [
         '从一个没人想过的绝妙点子开始',
         '从人们已经在忍受的某个麻烦开始',
         '从有钱可投开始',
         '从起名字和做标志开始',
       ],
       answerIndex: 1,
       explanation:
         '临时找不到保姆的家长、需要一张像样照片的同学、院子没人愿意打理的邻居。如果你说不出谁在烦恼、他们现在拿它怎么办，那你还没有一门生意。',
     },
     {
       at: 88,
       question:
         '你割一次草坪收 $25，油钱花了 $6。你赚了多少？',
       options: [
         '$25',
         '$19',
         '$31',
         '$6',
       ],
       answerIndex: 1,
       explanation:
         '收入减成本等于利润，所以 $25 减 $6 是 $19。Alvin 提醒：这一步算错，就会变成每个周末都忙、每个月都没钱。',
     },
     {
       at: 112,
       question:
         '刚起步时，他建议怎么定价？',
       options: [
         '能收多高收多高',
         '先比同行略低一点，攒够口碑后再涨价',
         '先免费干到别人信任你为止',
         '和最便宜的人收一模一样的价',
       ],
       answerIndex: 1,
       explanation:
         '定得太低，等于白干，还会招来爱挑刺的客户；定得太高又没有口碑，就没人买。先略低一点把底子攒起来，然后再涨。',
     },
     {
       at: 140,
       question:
         '你是自雇的。税该怎么办？',
       options: [
         '什么都不用管，会自动扣',
         '大约留出收入的四分之一，因为没有人替你预扣',
         '赚超过 $10,000 才需要操心',
         '客户会替你申报',
       ],
       answerIndex: 1,
       explanation:
         '自雇收入不像工资那样被预扣，必须自己申报。边赚边留出约四分之一，才不会在四月被打个措手不及。',
     },
   ],
 },

 {
 type: 'example',
 heading: '例子：Darius的割草帝国，第一周',
 body:
 'Darius在他的社区里割草，每片40美元。第一周他接了6片草坪：收入 = 240美元。他的成本：15美元汽油、10美元的割草机线和机油、6美元的传单 = 总共31美元。利润：240美元 - 31美元 = 209美元，换来的是大约9小时的工作，差不多每小时23美元，是他朋友们在商场打工的两倍还多。更妙的是：传单是一次性成本，所以下一周他的利润率在一小时都不用多干的情况下就上涨了。',
 },
 {
 type: 'content',
 heading: '定价：金发姑娘区间',
 body:
 '定价让人心里发慌，但它无非就是数学加上自信。定得太低，你就会累死累活只换来点面包屑，10美元一片的草坪在算上汽油后其实可能会亏钱。定得太高，顾客就走了。找到那个恰到好处的金发姑娘区间：看看你所在地区别人收多少、算清你每单的成本，并确保你的时间换来一个你看得起的报酬。还要记住，做一个可靠、友善、准时出现的青少年本身就是一项高级卖点。人们乐意为一个自己信得过的人多付钱。',
 bullets: [
 '从你所在地区竞争对手收的价格入手，那就是你的价格区间',
 '先把你每单的成本加起来；你的定价必须盖住它，还要留有余地',
 '目标是算上成本后一个公道的时薪：如果一片40美元的草坪要花90分钟外加5美元汽油，你差不多每小时挣23美元',
 '随着你的技能和好评增长而涨价，别永远停在新手价',
 ],
 },
 {
 type: 'content',
 heading: '不用穿白大褂的市场调研',
 body:
 '大公司在市场调研上花几百万；你可以在一个周末里免费搞一个精简版。目标很简单：在你花真金白银之前，先证明人们真的想要你的东西。问问10个潜在顾客，他们现在是怎么对付这个问题的、又付了多少钱。翻翻本地的Facebook小组、Nextdoor或传单，看看还有谁在做、价格是多少。然后做一个尽可能小的测试，一片草坪、一节辅导课、一个logo，并认真听取反馈。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Priya想开一门饼干生意。最聪明的第一步是什么？',
 options: [
 '花600美元买一台专业搅拌机和50磅面粉',
 '烤两批试验品，在义卖会上卖掉，并问买家他们平时愿意付多少',
 '等她有了完美的logo和网站再说',
 '把饼干定为每块1美元，因为最便宜的总能赢',
 ],
 answerIndex: 1,
 explanation:
 '这就是MVP思维！一个和真实顾客做的小测试能教会她人们想要什么、愿意付多少，而这一切都在大钱面临风险之前。花哨的搅拌机、完美的网站，还有那种一路杀到底的定价，全都可以等到真实需求得到验证之后再说。',
 },
 },
 {
 type: 'content',
 heading: '再投资：喂养这台机器',
 body:
 '这里有一个把小打小闹的人和帝国缔造者区分开来的习惯：再投资。别把每一美元利润都花掉，而是留出一部分，比如说25-30%，用来让生意变得更好。Darius从每周209美元的利润里存下60美元；一个月他就有了240美元，够买一台二手吹叶机，让他能在每片草坪上多收15美元的清理附加服务费。利润买来工具，工具抬高收入，收入做大利润。这个循环就是小副业如何滚成雪球的。',
 bullets: [
 '给每一美元利润设定一个固定的再投资比例（25-30%是个很好的起点）',
 '把它花在能增加收入的东西上：更好的工具、批量采购的物料、小额广告',
 '把再投资的钱单独放在一处，免得被拿去买零食花掉',
 '剩下的利润可以归你，用来储蓄和花销，是你挣来的',
 ],
 },
 {
 type: 'content',
 heading: '个体经营者的税（没错，连你也要交）',
 body:
 '当你为自己工作时，没有雇主替你预扣税款，你就是发薪部门。如果你一年的净个体经营利润达到400美元或以上，IRS通常就会期望你申报并缴纳自雇税，大约是15.3%，涵盖Social Security和Medicare的两半（作为雇员时，你老板付了一半，现在你既是老板又是雇员）。付你钱足够多的客户可能会寄给你一份1099表来报告它，但即使没有表格，这笔收入也照样算数。这个救命的习惯：把每一笔收入和每一笔开支都记下来，因为成本会减少你被征税的那部分利润。',
 bullets: [
 '一年的净个体经营利润达到400美元以上通常意味着你必须申报',
 '自雇税大约是15.3%，Social Security和Medicare的两半',
 '保留收据：合法的生意成本会降低你的应税利润',
 '一个简单的习惯：把利润的20-25%留在一个单独的账户里交税，然后就放心了',
 ],
 },
 {
 type: 'content',
 heading: 'MVP思维：从小到让人不好意思的地步开始',
 body:
 '青少年生意的头号杀手不是失败，而是从没上线，因为计划做得太大了。MVP思维把这一点反了过来：这一周就把最小可行产品上线，也就是你点子里最小的真实版本。一个顾客教会你的，比一个月的规划还多。Amazon一开始只卖书；Nike起步时是从一辆汽车后备箱里卖鞋。你的辅导生意可以从你家厨房餐桌上的一个学生开始。从小做起、快速学习、每一轮都改进，那不是抄近路，那正是那些巨头当年的做法。',
 },
 ],
 quiz: [
 {
 question: '每一门生意都赖以运转的核心公式是什么？',
 options: [
 '收入 + 成本 = 利润',
 '收入 - 成本 = 利润',
 '价格 x 顾客数 = 利润',
 '利润 - 税 = 收入',
 ],
 answerIndex: 1,
 explanation:
 '收入（进来的钱）减去成本（为交付而花掉的钱）等于利润（你留下的钱）。收入是那个抢眼的数字，但利润才是真正的记分牌。',
 },
 {
 question:
 'Mia每节辅导课收25美元，这个月上了8节，在练习册和公交车费上花了40美元。她的利润是多少？',
 options: ['200美元', '160美元', '240美元', '40美元'],
 answerIndex: 1,
 explanation:
 '收入是8 x 25美元 = 200美元，成本是40美元，所以利润 = 200美元 - 40美元 = 160美元。记下那些小额成本很重要，忽略它们会把她的收益虚报25%。',
 },
 {
 question: '是什么让一个问题作为生意点子"值得解决"？',
 options: [
 '它在社交媒体上听起来很唬人',
 '它需要昂贵的设备才能起步',
 '人们被它烦到愿意花钱把它解决掉',
 '从来没人抱怨过它',
 ],
 answerIndex: 2,
 explanation:
 '当有人愿意为一个解决方案付钱时，生意就存在了。抱怨、没人愿意干的杂活、耗时的事情都是金矿；如果没人愿意花钱解决它，那它就是爱好而不是生意。',
 },
 {
 question:
 '为什么一个个体经营的青少年要把每一笔收入和开支都记下来？',
 options: [
 '只有大公司才需要记录',
 '为了在朋友面前把生意显得更大',
 '这样他们就能向顾客收两次钱',
 '因为400美元以上利润的个体经营收入通常要纳税，而有记录的开支能减少应税利润',
 ],
 answerIndex: 3,
 explanation:
 '没有雇主替你预扣税款，你就是自己的发薪部门。一旦净利润在一年里达到400美元，自雇税（大约15.3%，用于Social Security和Medicare）通常就会适用，而良好的开支记录能合法地缩小你被征税的那部分利润。',
 },
 {
 question: '在你的生意里再投资意味着什么？',
 options: [
 '用你一部分利润去买有助于生意成长的东西，比如更好的工具',
 '把全部利润花在个人享受上',
 '请顾客们来投资你',
 '把全部收入放进一个支票账户然后忘掉它',
 ],
 answerIndex: 0,
 explanation:
 '再投资意味着把一部分利润，比如说25-30%，重新投回生意里：设备、物料、小额广告。更好的工具抬高收入，收入抬高利润，利润又资助更多成长。这个循环就是副业如何滚成雪球的。',
 },
 {
 question: '哪个上线计划最能体现MVP思维？',
 options: [
 '在服务任何人之前花六个月建一个网站',
 '第一天就借2,000美元买专业设备',
 '这一周就把服务最简单的真实版本提供给几个顾客，并根据反馈改进',
 '等到点子完美、竞争消失再说',
 ],
 answerIndex: 2,
 explanation:
 '最小可行产品是顾客能真正购买的、最小的真实版本。从小处、尽早上线能让你以低风险拿到真实反馈，一个付钱的顾客教会你的，比几个月的规划还多。',
 },
 ],
 },
}

export default lesson
