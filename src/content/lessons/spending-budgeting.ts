import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'spending-budgeting',
 week: 1,
 day: 2,
 title: 'Spending & Budgeting',
 icon: 'cart',
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
 "Watch this quick BFF video on budgeting basics. Heads up — it pauses to quiz you along the way, so pay attention!",
 videoId: 'AbqJUXeviI0',
 source: 'BFF Classroom',
 questions: [
 {
 at: 36,
 question: 'What is a budget, really?',
 options: [
 'A way to never spend money on fun',
 'A plan that tells your money where to go before you spend it',
 'Something only adults with jobs need',
 'A type of bank account',
 ],
 answerIndex: 1,
 explanation:
 'A budget is just a plan for the money you already have — any amount — and it makes room for needs and wants on purpose.',
 },
 {
 at: 152,
 question: 'Using the 50/30/20 rule on $200 this week, how much goes to savings?',
 options: [
 '$100',
 '$60',
 '$40',
 '$0',
 ],
 answerIndex: 2,
 explanation:
 '20% goes to savings, and 20% of $200 is $40. Needs get $100 (50%), wants get $60 (30%).',
 },
  {
  at: 204,
  question:
   'You see something you want and feel the urge to buy it right now. What does the video suggest?',
  options: [
   'Buy it before the price goes up',
   'Wait one full day before buying it',
   'Ask a friend to buy it for you',
   'Cancel a subscription to pay for it',
  ],
  answerIndex: 1,
  explanation:
   'The 24-hour rule: wait a full day before an impulse buy. Most of the time the urge passes — and if it does not, it was probably worth buying.',
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
 {
 type: 'open',
 heading: 'Your turn: design a budget',
 prompt:
 "Imagine you earn $200 a month from a part-time job. In a few sentences, describe how you'd split it between needs, wants, and savings — and explain one trade-off you'd make.",
 rubric:
 'Reward answers that split the money across needs/wants/savings with rough amounts and name a concrete trade-off. Encourage saving something. Keep it positive.',
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
 'Mira este video rápido de BFF sobre los fundamentos del presupuesto. Ojo — se pausa para hacerte preguntas en el camino, ¡así que pon atención!',
 videoId: 'AbqJUXeviI0',
 source: 'BFF Classroom',
 questions: [
 {
 at: 36,
 question: '¿Qué es un presupuesto, en realidad?',
 options: [
 'Una forma de nunca gastar dinero en cosas divertidas',
 'Un plan que le dice a tu dinero a dónde ir antes de que lo gastes',
 'Algo que solo necesitan los adultos con trabajo',
 'Un tipo de cuenta bancaria',
 ],
 answerIndex: 1,
 explanation:
 'Un presupuesto no es más que un plan para el dinero que ya tienes — cualquier cantidad — y hace lugar a propósito para las necesidades y los deseos.',
 },
 {
 at: 152,
 question: 'Usando la regla 50/30/20 con $200 esta semana, ¿cuánto va al ahorro?',
 options: [
 '$100',
 '$60',
 '$40',
 '$0',
 ],
 answerIndex: 2,
 explanation:
 'El 20% va al ahorro, y el 20% de $200 es $40. Las necesidades reciben $100 (50%) y los deseos reciben $60 (30%).',
 },
  {
  at: 204,
  question:
   'Ves algo que quieres y sientes el impulso de comprarlo ya mismo. ¿Qué sugiere el video?',
  options: [
   'Cómpralo antes de que suba de precio',
   'Espera un día completo antes de comprarlo',
   'Pídele a un amigo que lo compre por ti',
   'Cancela una suscripción para pagarlo',
  ],
  answerIndex: 1,
  explanation:
   'La regla de las 24 horas: espera un día completo antes de una compra impulsiva. Casi siempre se te pasan las ganas — y si no, probablemente valía la pena.',
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
 {
 type: 'open',
 heading: 'Tu turno: diseña un presupuesto',
 prompt:
 'Imagina que ganas $200 al mes en un trabajo de medio tiempo. En unas frases, describe cómo lo repartirías entre necesidades, deseos y ahorros — y explica un sacrificio que harías.',
 rubric:
 'Reward answers that split the money across needs/wants/savings with rough amounts and name a concrete trade-off. Encourage saving something. Keep it positive.',
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
 zh: {
 title: '花钱与预算',
 description:
 '如何聪明地花钱、避开冲动消费的陷阱，并围绕你的「想要」和「需要」建立一份简单好用的预算。',
 sections: [
 {
 type: 'intro',
 heading: '热身：$100 的问题',
 body:
 '欢迎回到 BFF Classroom——第一周，第二天！开始之前先来个快速热身：如果现在给你 $100，你会拿它花在什么上，为什么？认真地想象一下。记住你的答案，因为到这节课结束时，你就会知道那笔消费到底是「需要」、「想要」，还是一个彻头彻尾的消费陷阱。今天的主题就是聪明地花钱，并建立一份真正管用的预算。',
 },
 {
 type: 'content',
 heading: '需要 vs. 想要',
 body:
 '你花的每一块钱，要么是用于「需要」，要么是用于「想要」。需要是你为了生存和正常生活必须拥有的东西；想要是让生活更美好、但并非必不可少的东西。两者都不坏——但把它们搞混，正是预算崩溃的原因。',
 bullets: [
 '需要：基本的食物和水——每个人都需要它们来生存，选择实惠的日常采买有助于满足这一点',
 '需要：干净的空气——能呼吸到没有污染的空气，对保持健康是必不可少的',
 '需要：住所和衣物——它们保护我们免受天气侵袭，也帮助我们参与日常生活',
 '想要：经常在外面吃饭或点外卖——很方便，但通常没必要，而且更贵',
 '想要：最新的科技产品——科技能提升生产力，但即使在我们这个现代世界，它对日常生活也不是必需的',
 '想要：设计师品牌时装——时髦的衣服也许能提升自信和社会地位，但对满足基本需要并非必不可少',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你的冬季外套破得没法再修，于是你买了一件替换的。你朋友买了第三件设计师品牌卫衣来配他的球鞋。下面哪种说法是对的？',
 options: [
 '两笔消费都是想要',
 '两笔消费都是需要',
 '你的外套是需要；那第三件设计师品牌卫衣是想要',
 '衣物永远不算需要',
 ],
 answerIndex: 2,
 explanation:
 '说得太对了。能保护你免受天气侵袭的衣物是需要。但设计师品牌时装——尤其是第三件卫衣——是想要：它也许能提升自信和造型，但并非必不可少。同一个类别，却是很不一样的消费。',
 },
 },
 {
 type: 'content',
 heading: '制定预算：B.U.I.L.D.',
 body:
 '制定预算（budget）是管理个人财务最重要的技能之一。为了记住这个过程，用英文缩写 B.U.I.L.D.：Begin with a goal（从一个目标开始）、Understand your income（了解你的收入）、Identify your expenses（识别你的支出）、Limit your spending（限制你的花费），以及 Develop a habit（养成一个习惯）。我们会一个字母一个字母地、一步步走一遍。',
 },
 {
 type: 'content',
 heading: 'B——从一个目标开始',
 body:
 '每一份预算都从你的目标开始。想清楚你到底在为什么做预算——为买新手机存钱、建立你的投资组合，还是买一辆车。而你设定的每一个目标都应该是 SMART 的：',
 bullets: [
 'Specific（具体）——让目标精确，这能让你保持在正确的轨道上',
 'Measurable（可衡量）——你应该能够读懂沿途的结果',
 'Attainable（可实现）——不要把期望定得太高',
 'Relevant（相关）——确保你的目标符合你的实际情况',
 'Timely（有时限）——给它定一个时间期限',
 ],
 },
 {
 type: 'example',
 heading: 'SMART 还是不 SMART？你来判断',
 body:
 '来给一些目标打打分。「我要在接下来 3 个月里存 $150 买一双新跑鞋」——SMART：具体、可衡量、有时间线。「我要每周留出 $10，坚持 6 个月，攒一个 $240 的应急基金」——SMART。「我要在 4 周内，每周存 $15，把欠朋友的 $60 还清」——SMART。但「我想将来某天存钱买辆车」呢？没有金额，没有截止日期——不 SMART。那「我这个月要在吃的和其他东西上少花点钱」呢？「少」和「其他东西」没法衡量。含糊的目标，正是预算去睡大觉的地方。',
 },
 {
 type: 'content',
 heading: 'U——了解你的收入',
 body:
 '设定目标之后，开始盘点你的现金流入和流出——这一步正是大多数人一听到「做预算」这个词时脑海里浮现的画面。算出你固定会有多少钱进账：来自工作、每周零花钱、礼金等等。举个例子，Joe 每周帮邻居看孩子赚 $80。这 $80 就是他整份预算所依托的原材料。',
 },
 {
 type: 'content',
 heading: 'I——识别你的支出',
 body:
 '这一步和上一步是相辅相成的。把你在一段设定时间内的所有花费列出来——像食物和账单这样的需要，以及像购物、零食和订阅这样的想要。例如：「我每月在需要上花 $450，在想要上花 $200。」你可以把支出归入不同类别来做得更具体，比如下面这份每月合计 $3,840 的成人预算样例：',
 bullets: [
 '住房：房租 $1,700——合计 $1,700',
 '交通：车贷 $380、保险 $100、汽油 $200——合计 $680',
 '日常生活：日常采买 $800、水电等公用事业约 $300——合计 $1,100',
 '杂项：信用卡 $75、手机 $185、娱乐 $100——合计 $360',
 ],
 },
 {
 type: 'content',
 heading: 'L——限制你的花费',
 body:
 '既然你已经识别出了自己的收入和支出，现在就该真正按照预算来分配你的钱了。用 50/30/20 法则作为大纲：50% 的钱用于需要，30% 用于想要，20% 用于储蓄。这是一个起点，不是铁律——根据你的情况来调整。',
 },
 {
 type: 'content',
 heading: 'D——养成一个习惯',
 body:
 '制定预算的最后一步是最难也是最重要的：真正去执行你制定的计划。最简单的办法就是记录你的每笔消费。用笔记本、电子表格或 App 来记下你花了什么，需要时再调整你的计划。一份你不理会的预算，只不过是一张排版精美的愿望清单。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '按照 50/30/20 法则，如果你每月进账 $200，应该有多少用于储蓄？',
 options: ['$100', '$60', '$40', '$20'],
 answerIndex: 2,
 explanation:
 '没错！50/30/20 法则把 20% 拨给储蓄——而 $200 的 20% 就是 $40。其余的分配是：$100（50%）用于需要，$60（30%）用于想要。别忘了，你可以调整这些百分比来适应你的情况。',
 },
 },
 {
 type: 'video',
 heading: '观看：预算入门',
 body:
 '来看这段 BFF 的短视频，讲讲预算入门。注意——它会中途暂停来考你，所以要专心！',
 videoId: 'AbqJUXeviI0',
 source: 'BFF Classroom',
 questions: [
 {
 at: 36,
 question: '预算到底是什么？',
 options: [
 '一种永远不把钱花在娱乐上的方式',
 '一份在你花钱之前告诉你的钱该去哪里的计划',
 '只有有工作的成年人才需要的东西',
 '一种银行账户',
 ],
 answerIndex: 1,
 explanation:
 '预算不过是为你已经拥有的钱制定的计划——无论金额多少——它会有意地为需要和想要留出空间。',
 },
 {
 at: 152,
 question: '按照 50/30/20 法则，这周的 $200 中有多少进入储蓄？',
 options: [
 '$100',
 '$60',
 '$40',
 '$0',
 ],
 answerIndex: 2,
 explanation:
 '20% 进入储蓄，而 $200 的 20% 就是 $40。需要占 $100（50%），想要占 $60（30%）。',
 },
  {
  at: 204,
  question:
   '你看到想要的东西，很想马上买下来。视频建议怎么做？',
  options: [
   '趁涨价前赶紧买',
   '先等满一天再决定',
   '让朋友帮你买',
   '取消一项订阅来付钱',
  ],
  answerIndex: 1,
  explanation:
   '24 小时法则：冲动消费前先等满一天。大多数时候这股冲动会过去——如果没过去，那它可能真的值得买。',
 },
],
 },
 {
 type: 'content',
 heading: '记录你的消费',
 body:
 '记录你的预算和消费，是实现财务目标的最好方法之一。它能确保你永远不会陷入窘境，并且总能为接下来的事做好准备。记录能帮你避免超支——因为如果你不知道钱去了哪里，就永远不会知道它是从哪里消失的。幸运的是，记录的方法多得很：',
 bullets: [
 '笔记本或日记——有点老派，但纸质记录能帮你把事情理清楚',
 '记账 App——Mint、Goodbudget，甚至你手机上的备忘录 App，都能记录日常消费',
 '银行和信用卡对账单——你永远找不到比自己真实购买记录更准确的记录了',
 ],
 },
 {
 type: 'content',
 heading: '记录的小技巧',
 body:
 '有三个习惯能让记录坚持下去。第一，每隔几天就查一次你的消费，而不是等到月底，这样你随时都清楚自己的状况。第二，给快餐、个人用品、游戏和订阅这类类别设定每周或每月的上限——记住 50/30/20 法则。第三，为小小的胜利庆祝！当你没有超支时，要真心为自己高兴。一个幻灯片能做的有限——要多走这一步、不超支，需要一个意志坚强的人。',
 },
 {
 type: 'content',
 heading: '常见的消费陷阱',
 body:
 '消费陷阱是指一种习惯、一笔消费或一个决定，会让你花掉比自己意识到或打算花的更多的钱——常常是不假思索地。下面是三大陷阱，以及如何从每一个里脱身。最后一个小贴士：任何消费之前，问问自己——一周之后我还会在乎这个吗？如果不会，就别买。',
 bullets: [
 '冲动购物——你看到某样东西，当下就想要，然后不假思索地买下。解决办法：24 小时法则——买想要的东西前先等一天',
 '订阅消费——堆积一堆会自动续费的流媒体服务、App 和游戏通行证。解决办法：每隔几个月做一次订阅审查',
 '同伴压力和 FOMO（害怕错过）——为了跟上朋友，在新衣服、活动等方面花钱。解决办法：提议更便宜的替代方案',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你一看到一个 $30 的手机游戏皮肤，就想立刻买下。哪种策略最能对抗这个消费陷阱？',
 options: [
 '趁自己还没被劝退，赶紧买下来',
 '用 24 小时法则，先等一天再决定',
 '再加三样东西，让运费显得更值',
 '订阅，让皮肤每个月自动续费',
 ],
 answerIndex: 1,
 explanation:
 '没错——那种一看到就想要、就想买的感觉是冲动购物，而 24 小时法则就是解药：买想要的东西前先等一天。加分动作：问问自己一周之后还会不会在乎它。如果不会，就别买。',
 },
 },
 {
 type: 'open',
 heading: '轮到你了：设计一份预算',
 prompt:
 '假设你做兼职每月赚 $200。用几句话说说你会怎样把这笔钱分配到“需要”、“想要”和储蓄上——并解释你会做出的一个取舍。',
 rubric:
 'Reward answers that split the money across needs/wants/savings with rough amounts and name a concrete trade-off. Encourage saving something. Keep it positive.',
 },
 ],
 quiz: [
 {
 question: '下列哪一项是「需要」而不是「想要」？',
 options: [
 '几乎每晚都点外卖',
 '发售当天就买最新的智能手机',
 '设计师品牌时装',
 '实惠的日常采买',
 ],
 answerIndex: 3,
 explanation:
 '基本的食物和水是需要，实惠的日常采买满足了它们。经常点外卖、最新科技产品和设计师品牌时装都是想要——有了很好，但对生存和正常生活并非必不可少。',
 },
 {
 question: '在做预算里，缩写 B.U.I.L.D. 代表什么？',
 options: [
 'Begin with a goal（从一个目标开始）、Understand your income（了解你的收入）、Identify your expenses（识别你的支出）、Limit your spending（限制你的花费）、Develop a habit（养成一个习惯）',
 '少买、用优惠券、尽早投资、控制债务、分散配置',
 '每月做预算、了解税务、给一切上保险、谨慎借出、经常捐赠',
 '开始储蓄、使用现金、忽略想要、列出需要、推迟消费',
 ],
 answerIndex: 0,
 explanation:
 'B.U.I.L.D. 是五步做预算的过程：Begin with a goal（从一个目标开始）、Understand your income（了解你的收入）、Identify your expenses（识别你的支出）、Limit your spending（限制你的花费），以及 Develop a habit（养成一个习惯）。',
 },
 {
 question: '下列哪个目标是 SMART 的？',
 options: [
 '我想将来某天存钱买辆车',
 '我这个月要在吃的和其他东西上少花点钱',
 '我要在接下来 3 个月里存 $150 买一双新跑鞋',
 '我希望自己最终能变得有钱',
 ],
 answerIndex: 2,
 explanation:
 '在 3 个月里存 $150 买跑鞋，是具体的、可衡量的、可实现的、相关的，而且有时限的。其他几个都很含糊——没有明确金额、没有截止日期，也没法衡量进度。',
 },
 {
 question: '在 50/30/20 法则下，那 30% 应该用于什么？',
 options: ['储蓄', '想要', '需要', '税款'],
 answerIndex: 1,
 explanation:
 '50/30/20 法则把 50% 拨给需要、30% 拨给想要、20% 拨给储蓄。这是一个大纲，你可以调整它来适应自己的情况。',
 },
 {
 question: '为什么记录你的消费很重要？',
 options: [
 '它会自动增加你的收入',
 '它让你完全不必做预算',
 '银行要求客户记录消费',
 '它能帮你避免超支——如果你不知道钱去了哪里，就永远不会知道它是从哪里消失的',
 ],
 answerIndex: 3,
 explanation:
 '记录能让你远离窘境，并为接下来的事做好准备。无论你用笔记本、App 还是银行对账单，知道钱去了哪里，才是不让它消失的办法。',
 },
 {
 question:
 '你注意到自己在为五个流媒体服务和三个游戏订阅付费，而且都是自动续费。推荐的解决办法是什么？',
 options: [
 '每隔几个月做一次订阅审查',
 '对每次续费都套用 24 小时法则',
 '让朋友们分摊每一项订阅',
 '把它们全都改成按年付费',
 ],
 answerIndex: 0,
 explanation:
 '那一堆自动续费的服务就是订阅消费，属于最常见的消费陷阱之一。解决办法是每隔几个月做一次订阅审查——检查你在为什么付费，并取消你不再使用的。',
 },
 {
 question:
 '你的朋友都要去一个很贵的活动，你感到压力，想花掉本来打算存起来的钱。这是哪种消费陷阱，一个解决办法是什么？',
 options: [
 '冲动购物；用一个记账 App 来解决',
 '订阅消费；通过取消那个活动来解决',
 '同伴压力和 FOMO；通过提议更便宜的替代方案来解决',
 '50/30/20 法则；通过把储蓄花掉来解决',
 ],
 answerIndex: 2,
 explanation:
 '为了跟上朋友而花钱，就是同伴压力和 FOMO 陷阱。提议更便宜的替代方案，能让你既保住友情又保住预算。你的储蓄类别会感谢你的。',
 },
 {
 question: '在买一件你想要的东西之前，这节课建议你最后问自己什么问题？',
 options: [
 '我能用信用卡付吗？',
 '一周之后我还会在乎这笔消费吗？',
 '它现在在打折吗？',
 '我朋友已经有了吗？',
 ],
 answerIndex: 1,
 explanation:
 '最后一个小贴士：问问自己一周之后还会不会在乎这笔消费。如果答案是不会，就别买——这一个问题就能在大多数冲动消费发生之前把它们过滤掉。',
 },
 ],
 },
}

export default lesson
