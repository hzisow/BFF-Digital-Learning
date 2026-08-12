import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'financial-planning',
 week: 4,
 day: 1,
 title: 'Financial Planning',
 icon: 'map',
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
 'Short-term goals happen within 1 year, and 3 months definitely qualifies. The car is medium-term (1 to 5 years), and college tuition and a far-off emergency fund are long-term goals.',
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
 '$1,200 divided by 6 months is $200 per month. Working backwards turns a big scary number into a monthly amount you can actually build into your budget.',
 },
 },
 {
   type: 'video',
   heading: 'Watch: Turning a Picture Into a Plan',
   body:
     'Watch this quick BFF video on ranking your goals and making them specific enough to track. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 'HdqDwHZQlqc',
   source: 'BFF Classroom',
   questions: [
     {
       at: 63,
       question:
         'What does Alvin say your money should go to first?',
       options: [
         'Paying off debt',
         'An emergency fund of about $500',
         'Long-term investing',
         'Saving for a car',
       ],
       answerIndex: 1,
       explanation:
         "Without one, the first flat tire turns into credit card debt and undoes months of progress. He puts the starting number at $500, which covers most of what actually goes wrong in a teenager's life.",
     },
     {
       at: 87,
       question:
         'Why is "I want to save money" not a goal?',
       options: [
         'It is not ambitious enough',
         'It is a mood, with nothing specific or time-bound about it',
         'Saving is the wrong priority',
         'It does not name a dollar amount you can reach',
       ],
       answerIndex: 1,
       explanation:
         'Alvin calls it a mood. Rewritten as "save $600 for a laptop by June 1st by putting away $50 a month", you know every month whether you are on track instead of finding out at the end.',
     },
     {
       at: 105,
       question:
         'Why attack a credit card charging 24% before investing?',
       options: [
         'Credit card debt hurts your credit score more than anything',
         'Paying it down is like a guaranteed 24% return',
         'You cannot invest while you carry any debt',
         'The card company will close your account',
       ],
       answerIndex: 1,
       explanation:
         'It is a hole you cannot save your way out of. Clearing 24% interest is a guaranteed 24%, which beats almost anything you can invest in.',
     },
     {
       at: 145,
       question:
         'A $2,000 used car in three years works out to about what per month?',
       options: [
         '$56',
         '$200',
         '$667',
         '$28',
       ],
       answerIndex: 0,
       explanation:
         "Roughly $56 a month. Alvin's point is that nobody panics about $56 a month, but everybody panics about $2,000 in a week. Writing down when a milestone arrives turns it from an emergency into a line item.",
     },
   ],
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
 'The debt snowball lines up your debts from smallest to largest. You make minimum payments on everything else and attack the smallest first. Each payoff is a quick win that keeps you motivated to roll on to the next one.',
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
 '"Save $500 for a laptop in 4 months" is Specific, Measurable, Attainable, Relevant, and Timely. The other options are vague wishes with no clear target or timeline.',
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
 'Medium-term goals take 1 to 5 years, so a car in 3 years fits perfectly. Short-term goals happen within a year, and long-term goals take 5 or more years.',
 },
 {
 question:
 'You estimate moving out will cost $800. Using the "build a buffer" strategy, how much should you actually aim to save?',
 options: ['$400, since you can borrow the rest', 'Exactly $800', '$900 or more', '$100'],
 answerIndex: 2,
 explanation:
 'Always add a little extra for hidden costs. If you think you need $800, aim for $900 or more. Milestones almost always come with surprise expenses, and the buffer keeps them from wrecking your plan.',
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
 'The very first step is a $1,000 starter emergency fund. It is meant to keep you out of bad-debt situations when life throws you a flat tire or a shattered window.',
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
 'Baby Step 4 says to invest roughly 15% of your household income into retirement funds. Being debt free first is the key that lets you do this with no stress.',
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
 'Baby Step 7 is to build and give generously. Once you are fully debt free, you have the freedom to help others, start financial futures for your descendants, and make the world better through your hard work.',
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
 'Las metas de corto plazo ocurren en menos de 1 año, y 3 meses definitivamente califica. El carro es de mediano plazo (1 a 5 años), y la colegiatura universitaria y un fondo de emergencia lejano son metas de largo plazo.',
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
   type: 'video',
   heading: 'Míralo: Convertir una imagen en un plan',
   body:
     'Mira este video corto de BFF sobre cómo ordenar tus metas y hacerlas lo bastante específicas para seguirlas. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 'HdqDwHZQlqc',
   source: 'BFF Classroom',
   questions: [
     {
       at: 63,
       question:
         '¿A qué dice Alvin que debe ir tu dinero primero?',
       options: [
         'A pagar deudas',
         'A un fondo de emergencia de unos $500',
         'A invertir a largo plazo',
         'A ahorrar para un auto',
       ],
       answerIndex: 1,
       explanation:
         'Sin él, la primera llanta ponchada se convierte en deuda de tarjeta y borra meses de avance. Él pone la cifra inicial en $500, que cubre casi todo lo que de verdad sale mal en la vida de un adolescente.',
     },
     {
       at: 87,
       question:
         '¿Por qué "quiero ahorrar dinero" no es una meta?',
       options: [
         'No es lo bastante ambiciosa',
         'Es un estado de ánimo, sin nada específico ni con fecha',
         'Ahorrar es la prioridad equivocada',
         'No menciona una cantidad que puedas alcanzar',
       ],
       answerIndex: 1,
       explanation:
         'Alvin la llama un estado de ánimo. Reescrita como "ahorrar $600 para una laptop antes del 1 de junio guardando $50 al mes", sabes cada mes si vas bien en lugar de enterarte al final.',
     },
     {
       at: 105,
       question:
         '¿Por qué atacar una tarjeta que cobra 24% antes de invertir?',
       options: [
         'Porque la deuda de tarjeta daña tu puntaje más que nada',
         'Porque pagarla es como un rendimiento garantizado del 24%',
         'Porque no puedes invertir mientras tengas deudas',
         'Porque el banco cerrará tu cuenta',
       ],
       answerIndex: 1,
       explanation:
         'Es un hoyo del que no puedes salir ahorrando. Eliminar un interés del 24% equivale a un 24% garantizado, mejor que casi cualquier inversión.',
     },
     {
       at: 145,
       question:
         'Un auto usado de $2,000 en tres años equivale a cuánto al mes, más o menos?',
       options: [
         '$56',
         '$200',
         '$667',
         '$28',
       ],
       answerIndex: 0,
       explanation:
         'Unos $56 al mes. El punto de Alvin es que nadie entra en pánico por $56 al mes, pero todos entran en pánico por $2,000 en una semana. Anotar cuándo llega cada hito lo convierte de emergencia en una línea del presupuesto.',
     },
   ],
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
 '"Ahorrar $500 para una laptop en 4 meses" es específica, medible, alcanzable, relevante y con plazo. Las otras opciones son deseos vagos sin un objetivo ni un plazo claros.',
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
 'Las metas de mediano plazo toman de 1 a 5 años, así que un carro en 3 años encaja perfecto. Las metas de corto plazo ocurren en menos de un año, y las de largo plazo toman 5 años o más.',
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
 'Siempre agrega un poco extra para los costos ocultos. Si crees que necesitas $800, apunta a $900 o más. Los hitos casi siempre traen gastos sorpresa, y el colchón evita que arruinen tu plan.',
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
 'El primer paso es un fondo de emergencia inicial de $1,000. Su propósito es mantenerte fuera de situaciones de deuda mala cuando la vida te lanza una llanta ponchada o una ventana rota.',
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
 'El Baby Step 3 convierte tu fondo inicial en 3 a 6 meses de gastos y cuentas, manteniéndote seguro y financieramente estable en la mayoría de las situaciones.',
 },
 {
 question:
 'Según los Baby Steps, ¿aproximadamente qué porcentaje del ingreso de tu hogar deberías invertir para la jubilación?',
 options: ['5%', '50%', '15%', '30%'],
 answerIndex: 2,
 explanation:
 'El Baby Step 4 dice invertir aproximadamente el 15% del ingreso de tu hogar en fondos de jubilación. Estar primero libre de deudas es la clave que te permite hacerlo sin estrés.',
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
 'El Baby Step 7 es construir riqueza y dar con generosidad. Una vez totalmente libre de deudas, tienes la libertad de ayudar a otros, iniciar futuros financieros para tus descendientes y hacer del mundo un lugar mejor con tu esfuerzo.',
 },
 ],
 },
 zh: {
 title: '理财规划',
 description: '学习如何为未来设定 SMART 理财目标，并制定一个简单的计划来实现它们。',
 sections: [
 {
 type: 'intro',
 heading: '快进 15 年',
 body:
 '想象一下你可以把人生快进 15 年。在理财方面，你希望自己已经完成了哪一件事？要实现它需要付出什么？也许是一辆车、一个属于自己的住处，或者一个学位。今天的重点就是把那些遥远的"总有一天"的梦想，变成一个真实的、你现在就能开始行动的计划。',
 },
 {
 type: 'content',
 heading: 'SMART 目标：快速回顾',
 body:
 '回想一下我们一起度过的第二周。当你为未来做规划时，你设定的每一个理财目标都应该遵循 SMART 这个缩写。像"我想要变有钱"这样的目标太模糊了。而像"4 个月内存 $500 买一台笔记本电脑"这样的目标，则给了你一个清晰的目标和时间表。',
 bullets: [
 'Specific（具体），让你的目标精确明确。这能让你走在正确的轨道上。',
 'Measurable（可衡量），你应该能够在过程中读懂自己的进展。',
 'Attainable（可实现），不要把期望定得太高。',
 'Relevant（相关），确保你的目标符合你的实际情况。',
 'Timely（有时限），给你的目标设定一个时间期限。',
 ],
 },
 {
 type: 'example',
 heading: '重写这个目标',
 body:
 '这里有一个需要改进的目标："我想要一辆车。"它不具体，没有可衡量的数字，也没有截止日期。一个 SMART 版本可能是："在接下来的 12 个月里每月存 $250，攒够 $3,000 买一辆二手车。"同样的梦想，但现在你确切地知道每个月该做什么，以及什么时候能实现它。',
 },
 {
 type: 'content',
 heading: '为理财目标排优先级',
 body:
 '并不是所有目标都同样紧急或重要。理财目标根据实现所需的时间长短分为三种规模。需要与想要也起着作用：应急储蓄可能比娱乐更优先。（又回到第二周啦！）',
 bullets: [
 '短期（1 年以内）：新鞋、一次旅行',
 '中期（1 到 5 年）：买一台笔记本电脑、为一辆车存钱',
 '长期（5 年以上）：上大学、搬出去独立生活',
 ],
 },
 {
 type: 'content',
 heading: '如何排优先级',
 body:
 '当你的目标比钱多时（基本上一直如此），问问自己："现在最重要的是什么？"然后在决定钱先花在哪里之前，用几个关键因素来衡量每一个目标。',
 bullets: [
 '时间框架，你多快需要它？',
 '紧急程度：如果你等一等会发生什么？',
 '成本，实现它需要多少钱？',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '以下哪一项会被视为短期理财目标？',
 options: [
 '3 个月内存 $500 买一部手机',
 '2 年内存 $5,000 买一辆车',
 '5 年内存 $20,000 交大学学费',
 '为遥远未来意外的医疗费用建立应急基金',
 ],
 answerIndex: 0,
 explanation:
 '短期目标在 1 年以内实现，3 个月绝对符合。那辆车是中期目标（1 到 5 年），而大学学费和遥远的应急基金则是长期目标。',
 },
 },
 {
 type: 'content',
 heading: '人生里程碑管理',
 body:
 '未来你会面临一些人生的重大里程碑：毕业、拿驾照、上大学、搬出去住。每一个都有成本，有些显而易见，有些则是隐藏的，而且每一个都需要做准备。提前规划能减轻压力，让你做出更 SMART 的决定。（懂了吧？）',
 bullets: [
 '拿驾照 = 驾驶培训费、DMV 手续费、保险',
 '搬出去住 = 房租、家具、日用杂货',
 '上大学 = 学费、用品、交通、食宿',
 ],
 },
 {
 type: 'content',
 heading: '"提前规划"到底意味着什么',
 body:
 '提前规划不只是模模糊糊地为未来担忧。它是一套具体的策略，你可以把它用在任何即将到来的里程碑上。',
 bullets: [
 '预估成本：研究平均价格，弄清楚哪些是一次性费用（比如押金），哪些是经常性费用（比如房租）。',
 '设定时间表：你预计这个里程碑什么时候会发生？距离现在还有几个月？',
 '制定一个小目标：例如，"我想在 6 个月内为公寓开销存下 $1,200。"尽可能使用 SMART 格式。',
 '倒推计算：$1,200 除以 6 个月 = 每月 $200。把它纳入你的预算，想想可以削减哪些开销来腾出空间。',
 '留出缓冲：总是为隐藏成本多留一点。如果你觉得需要 $800，那就争取 $900 或更多。',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你想在 6 个月内为公寓开销存下 $1,200。用"倒推计算"策略，你每个月应该存多少？',
 options: ['$100', '$150', '$200', '$600'],
 answerIndex: 2,
 explanation:
 '$1,200 除以 6 个月就是每月 $200。倒推计算把一个又大又吓人的数字，变成了一个你真的能纳入预算的月度金额。',
 },
 },
 {
   type: 'video',
   heading: '观看：把想象变成计划',
   body:
     '看看这个 BFF 短视频，学会给目标排序，并让它具体到可以追踪。注意，视频中途会暂停提问，认真看哦！',
   videoId: 'HdqDwHZQlqc',
   source: 'BFF Classroom',
   questions: [
     {
       at: 63,
       question:
         'Alvin 说你的钱应该先去哪里？',
       options: [
         '先还债',
         '先存一笔大约 $500 的应急金',
         '先做长期投资',
         '先攒钱买车',
       ],
       answerIndex: 1,
       explanation:
         '没有应急金，第一次爆胎就会变成信用卡债，抹掉好几个月的努力。他把起步数字定在 $500，足以应付青少年生活中大部分真正会出的岔子。',
     },
     {
       at: 87,
       question:
         '为什么“我想存钱”不算一个目标？',
       options: [
         '因为不够有野心',
         '因为那是一种心情，既不具体也没有期限',
         '因为存钱不该是重点',
         '因为没说出一个能达到的金额',
       ],
       answerIndex: 1,
       explanation:
         'Alvin 说那只是一种心情。改写成“6 月 1 日前每月存 $50，攒够 $600 买笔记本电脑”，你每个月都知道自己是超前还是落后，而不是到最后才发现。',
     },
     {
       at: 105,
       question:
         '为什么要先解决年利率 24% 的信用卡，再去投资？',
       options: [
         '因为信用卡债对信用分伤害最大',
         '因为还掉它相当于稳赚 24% 的回报',
         '因为有债就不能投资',
         '因为银行会关掉你的账户',
       ],
       answerIndex: 1,
       explanation:
         '这是靠攒钱爬不出来的坑。消掉 24% 的利息等于稳拿 24%，比你几乎能买到的任何投资都强。',
     },
     {
       at: 145,
       question:
         '三年后要买一辆 $2,000 的二手车，大约相当于每月多少钱？',
       options: [
         '$56',
         '$200',
         '$667',
         '$28',
       ],
       answerIndex: 0,
       explanation:
         '大约每月 $56。Alvin 的意思是：没人会为每月 $56 慌张，但所有人都会为一周内要拿出 $2,000 慌张。把里程碑的时间写下来，它就从急事变成了预算里的一行。',
     },
   ],
 },

 {
 type: 'content',
 heading: 'Baby Steps（宝宝步骤）：Dave Ramsey',
 body:
 'Dave Ramsey 是一位备受尊敬的企业家和理财教练，他通过自己的广播节目、播客和 YouTube 频道积累了庞大的粉丝群。他的"Baby Steps"（宝宝步骤）是让你作为年轻人走上通往财务卓越之路的最佳方式之一。一共有七个步骤，每一步都建立在上一步的基础上。',
 },
 {
 type: 'content',
 heading: 'Baby Steps 1-3：打好你的基础',
 body:
 '前三个步骤都是关于安全。根据 Dave Ramsey 的说法，迈向理财目标的第一步是建立你的应急基础，然后消灭债务，接着把那个基础做得更大。',
 bullets: [
 '第 1 步，建立一个初始应急基金：存 $1,000，让自己远离糟糕的债务处境。你可能会用它来应付爆胎或碎掉的车窗。',
 '第 2 步，用债务滚雪球法还清所有债务（房贷除外）：把债务从最小到最大排好，除了最小的那笔外，其余都只还最低还款额，集中火力攻克最小的那笔，然后再沿着列表往上推进。',
 '第 3 步，建立一个资金充足的应急基金：一旦你无债一身轻（房贷除外），就存下 3 到 6 个月的开销和账单。这能让你在大多数情况下保持安全和稳定。',
 ],
 },
 {
 type: 'content',
 heading: 'Baby Steps 4-7：打造你的未来',
 body:
 '有了稳固的基础，没有债务压身，后面的步骤就从防守转向进攻：积累财富、还清房子、回馈他人。',
 bullets: [
 '第 4 步，为退休投资：争取把家庭收入的大约 15% 拿去投资。无债一身轻让你可以毫无压力地做到这一点。',
 '第 5 步，为孩子的大学存钱：这一步可能并不适用于每个人，这也是为什么退休排在前面。回想一下储蓄与投资那一课，考虑一下 ESA 或 529 计划。',
 '第 6 步，提前还清房贷：其他一切都处理好之后，专注于房贷，你会比想象中更快地彻底无债一身轻。',
 '第 7 步，积累财富并慷慨给予：当你对自己的钱拥有完全的自由时，为你的子孙后代开启财务未来，并帮助他人。慷慨给予是 Baby Steps 的终极成果。',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '在债务滚雪球法中，你会先集中精力还清哪一笔债务？',
 options: [
 '利率最高的那笔债务',
 '最小的那笔债务',
 '最大的那笔债务',
 '你的房贷',
 ],
 answerIndex: 1,
 explanation:
 '债务滚雪球法把你的债务从最小到最大排列。你对其余所有债务只还最低还款额，先集中火力攻克最小的那笔。每还清一笔都是一次快速的胜利，让你有动力继续推进到下一笔。',
 },
 },
 {
 type: 'content',
 heading: '总结收尾',
 body:
 '快速写下这节课的小结。哪些概念你一下子就通了？哪些还想再多琢磨一下？下节课我们会讲消费者保护，玩"我们去钓鱼吧！"这个活动，最后以课末测验收尾。现在，让我们来检验一下你的本领吧！',
 },
 ],
 quiz: [
 {
 question: '以下哪一个是 SMART 理财目标的最佳范例？',
 options: [
 '我总有一天想变有钱',
 '4 个月内存 $500 买一台笔记本电脑',
 '为一辆车弄到很多钱',
 '以后少花点钱',
 ],
 answerIndex: 1,
 explanation:
 '"4 个月内存 $500 买一台笔记本电脑"是具体的、可衡量的、可实现的、相关的，而且有时限。其他选项都是模糊的愿望，没有清晰的目标或时间表。',
 },
 {
 question: 'SMART 中的"T"代表什么？',
 options: ['Tough（艰难）', 'Total（总计）', 'Timely（有时限）', 'Tested（经过检验）'],
 answerIndex: 2,
 explanation:
 'Timely（有时限）！每个 SMART 目标都需要一个时间期限。截止日期把"总有一天"变成一个真实的、你可以用来衡量自己进展的计划。',
 },
 {
 question: '为一辆你打算 3 年后买的车存钱，属于哪种理财目标？',
 options: ['短期', '中期', '长期', '应急'],
 answerIndex: 1,
 explanation:
 '中期目标需要 1 到 5 年，所以 3 年后买车正好符合。短期目标在一年以内实现，而长期目标需要 5 年或更久。',
 },
 {
 question:
 '你估计搬出去住要花 $800。用"留出缓冲"策略，你实际上应该争取存多少？',
 options: ['$400，因为剩下的可以借', '正好 $800', '$900 或更多', '$100'],
 answerIndex: 2,
 explanation:
 '总是为隐藏成本多留一点。如果你觉得需要 $800，那就争取 $900 或更多。里程碑几乎总会伴随着意外开销，而缓冲能防止它们毁掉你的计划。',
 },
 {
 question: '在 Dave Ramsey 的计划中，Baby Step 1 是什么？',
 options: [
 '把收入的 15% 投资于退休',
 '提前还清你的房贷',
 '存下 3 到 6 个月的开销',
 '存 $1,000 作为初始应急基金',
 ],
 answerIndex: 3,
 explanation:
 '最开始的一步是 $1,000 的初始应急基金。它的作用是在生活给你一个爆胎或碎车窗时，让你远离糟糕的债务处境。',
 },
 {
 question:
 '在你变得无债一身轻（房贷除外）之后，你资金充足的应急基金应该覆盖多少？',
 options: [
 '3 到 6 个月的开销和账单',
 '正好 $1,000',
 '一年的薪水',
 '家庭收入的 15%',
 ],
 answerIndex: 0,
 explanation:
 '就是它！Baby Step 3 把你的初始基金扩大到 3 到 6 个月的开销和账单，让你在大多数情况下保持安全和财务稳定。',
 },
 {
 question:
 '根据 Baby Steps，你大约应该把家庭收入的百分之几拿去为退休投资？',
 options: ['5%', '50%', '15%', '30%'],
 answerIndex: 2,
 explanation:
 'Baby Step 4 说要把家庭收入的大约 15% 投资于退休基金。先做到无债一身轻，是让你能够毫无压力地做到这一点的关键。',
 },
 {
 question: '完成全部七个 Baby Steps 的终极成果是什么？',
 options: [
 '拥有尽可能多的车',
 '积累财富并慷慨给予',
 '再也不用做预算',
 '获得尽可能高的信用额度',
 ],
 answerIndex: 1,
 explanation:
 'Baby Step 7 就是积累财富并慷慨给予。一旦你彻底无债一身轻，你就有了自由去帮助他人、为子孙后代开启财务未来，并通过自己的努力让世界变得更美好。',
 },
 ],
 },
}

export default lesson
