import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'credit-debt',
 week: 2,
 day: 2,
 title: 'Credit & Debt',
 icon: 'card',
 description:
 'Understand how credit works, what affects your credit score, and how to borrow money responsibly.',
 durationMin: 18,
 sections: [
 {
 type: 'intro',
 heading: 'Borrow Now, Pay Later?',
 body:
 "Warm-up question: imagine you want something you can't afford right now. Would you wait and save up, or borrow money to get it today? Why? There's no single right answer, and that tension is exactly what today's lesson is about. By the end, you'll know how credit works, what a credit score really measures, and how to borrow without getting burned.",
 },
 {
 type: 'terms',
 heading: 'How Credit Works',
 terms: [
 {
 term: 'Credit',
 definition:
 'The ability to borrow money now and pay it back later, usually with interest. Lenders give credit based on trust that you will repay them.',
 },
 {
 term: 'Revolving credit',
 definition:
 'Credit with a set limit where you pay the amount due each month or make minimum monthly payments. Credit cards are the classic example.',
 },
 {
 term: 'Installment credit',
 definition:
 'A lump sum of money the borrower must repay in fixed installments by a certain date. Mortgages and car loans are examples.',
 },
 ],
 },
 {
 type: 'content',
 heading: 'What Is Credit Actually For?',
 body:
 "Credit is often used for large, expensive purchases, like a mortgage for a house, because most people can't pay for those in full. But credit also shows up in day-to-day life: many people use credit cards with cashback or other benefits for everyday purchases. Just don't confuse them with debit cards, which pull money directly from your checking account.",
 bullets: [
 'Big purchases: mortgages, car loans, and other things people rarely pay for all at once',
 'Everyday purchases: credit cards with cashback or perks',
 'Debit cards are different: they charge your checking account directly, no borrowing involved',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: 'Which of these is an example of installment credit?',
 options: [
 'A credit card you pay off each month',
 'A debit card connected to your checking account',
 'A car loan repaid in fixed monthly payments by a set date',
 'Cashback rewards on groceries',
 ],
 answerIndex: 2,
 explanation:
 'Installment credit gives you a lump sum that you repay in fixed installments by a certain date, like car loans and mortgages. Credit cards are revolving credit, and debit cards are not credit at all since they pull straight from your checking account.',
 },
 },
 {
 type: 'content',
 heading: 'Credit Scores: Your Financial Report Card',
 body:
 "A credit score is a 3-digit number that tells lenders how risky it is to lend to you. Credit scores use the system provided by FICO and range from 300 to 850. Higher is better. Your score affects whether you'll be approved for loans and what interest rate you'll get on them, so this little number can save (or cost) you a lot of money.",
 },
 {
 type: 'content',
 heading: 'The Five Factors of Your Credit Score',
 body:
 'Five things determine your credit score, and they are not weighted equally. The biggest one is simply paying your bills on time. Here they are, from heaviest to lightest.',
 bullets: [
 'Payment history (35%): paying bills on time',
 'Credit utilization (30%): how much of your available credit you use',
 "Length of credit history (15%): how long you've had credit accounts",
 'Credit mix (10%): your mix of credit types, revolving and installment',
 'New credit (10%): recent applications for new credit',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: 'Which pair of activities would HELP your credit score?',
 options: [
 'Maxing out your credit card and opening five new cards in one week',
 'Always paying your credit card bill on time and only using 20% of your credit limit',
 'Ignoring your bills and closing your oldest account',
 'Only using cash for everything, forever',
 ],
 answerIndex: 1,
 explanation:
 'On-time payments are the biggest factor (35%) and keeping utilization low, like using only 20% of your limit, helps the second biggest factor (30%). Maxing out cards and opening five new cards in a week both hurt your score.',
 },
 },
 {
 type: 'video',
 heading: 'Watch: What Goes Into Your Credit Score?',
 body:
 'Watch this quick BFF video on what actually moves your credit score. Heads up, it pauses to quiz you along the way, so pay attention!',
 videoId: 'rNVIS8YsBbQ',
 source: 'BFF Classroom',
 questions: [
 {
 at: 66,
 question: 'Which factor counts the MOST in your credit score?',
 options: [
 'How many cards you own',
 'Your payment history, paying on time',
 'Your salary',
 'How often you check your score',
 ],
 answerIndex: 1,
 explanation:
 'Payment history is the heavyweight at about 35%. One missed payment can hurt for years, which is why autopay helps.',
 },
 {
  at: 127,
  question:
   'Why does the video say to stay away from payday loans?',
  options: [
   'They are only for people with perfect credit',
   'They are short, high-interest loans that usually leave you deeper in debt than you started',
   'They take too long to get approved',
   'They can only be used to pay for school',
  ],
  answerIndex: 1,
  explanation:
   'Payday loans are short-term and carry very high interest. People take them to get from one paycheck to the next, and almost always end up owing more than they borrowed.',
 },
 {
 at: 148,
 question: "What's one of the WORST things for your credit score?",
 options: [
 'Keeping an old card open',
 'Using under 30% of your limit',
 'Missing a payment',
 'Checking your own credit report',
 ],
 answerIndex: 2,
 explanation:
 'A missed payment hits the biggest factor and can stay on your report up to 7 years. Old accounts and low utilization actually help; checking your own report never hurts.',
 },
  {
  at: 182,
  question:
   'What makes a credit card act like a free loan?',
  options: [
   'Paying only the minimum each month',
   'Paying your balance in full every month',
   'Keeping the card right at its limit',
   'Opening several cards at once',
  ],
  answerIndex: 1,
  explanation:
   'Pay the full balance and you have borrowed for free. Pay only the minimum and interest starts building on what is left, which costs far more over time.',
 },
],
 },
 {
 type: 'content',
 heading: 'Good Debt vs. Bad Debt',
 body:
 "Not all debt is created equal. Good debt is borrowing for things that help you make money or grow in value. Bad debt is borrowing for things that are unnecessary and won't help you in the long term. The trick is asking: will this debt leave me better off later, or just cooler-looking today?",
 bullets: [
 'Good: student loans can increase your potential income, as long as you manage money correctly',
 'Good: mortgages, as long as you stay on track with payments',
 'Good: business loans, which increase your potential income',
 'Bad: loans for wants like designer fashion, technology, or car leases',
 ],
 },
 {
 type: 'example',
 heading: 'The Payday Loan Trap',
 body:
 'Payday loans are short-term, high-interest loans that will only hurt you financially. They are marketed as help for people living "paycheck-to-paycheck," but in reality they almost always leave you in more debt than you started with. The high interest piles up fast, so you borrow again to cover it, and the cycle repeats. Steer clear.',
 },
 {
 type: 'content',
 heading: 'Understanding Credit Cards',
 body:
 "Credit cards can be an extremely powerful tool if used correctly. A credit card lets you borrow money up to a limit and pay it back later. If you pay it off in full each month, it's essentially a free loan. But if you don't pay the full amount by the due date, interest is charged on the balance, and paying only the minimum payment costs you more over time.",
 bullets: [
 'Pay in full every month and you pay zero interest',
 'Carry a balance and interest piles onto whatever you owe',
 'Minimum payments keep you in debt longer and cost more overall',
 'Some cards offer perks like cashback or travel points, but watch for traps!',
 'Already in debt? The snowball and avalanche methods are two strategies for paying it down',
 ],
 },
 {
 type: 'example',
 heading: 'Reading a Real Credit Card Offer',
 body:
 "Here's an example credit card: APR of 22.99%, credit limit of $1,000, annual fee of $0, minimum payment of $35 per month. Translation: you can borrow up to $1,000, and there's no yearly fee. But if you carry a balance, it grows at a steep 22.99% per year. Pay only the $35 minimum on a maxed-out card, and interest will eat most of that payment. Paying in full is the winning move.",
 },
 {
 type: 'content',
 heading: 'How Credit Card Companies Make Money',
 body:
 "Ever wonder why companies hand out cards with free rewards? Credit card companies make profit through interest when balances are left unpaid, and through fees: late payment fees, annual fees, and over-limit fees. Their business model counts on people slipping up. Your job is to not be that person.",
 bullets: [
 'Always pay off your balance in full every month',
 'Use your credit card for consistent monthly expenses you already budget for',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'You have the example card with 22.99% APR. What happens if you only pay the $35 minimum payment on a big balance each month?',
 options: [
 'Interest keeps getting charged on the remaining balance, so it costs you more over time',
 'The balance disappears after three payments',
 'The company waives all interest as a reward',
 'Your credit limit automatically doubles',
 ],
 answerIndex: 0,
 explanation:
 'Minimum payments barely dent the balance, so that 22.99% APR keeps charging interest on everything left over. Paying in full every month is what turns a credit card into an essentially free loan instead of an expensive one.',
 },
 },
 {
 type: 'content',
 heading: 'Wrapping Up',
 body:
 "Today you learned that credit is borrowed trust, your credit score is built mostly by paying on time and keeping utilization low, good debt helps your future while bad debt drains it, and credit cards are only free if you pay in full. Jot down what clicked and what needs review. Next session: Risk Management and Insurance, plus the Cover Your Bases activity!",
 },
 ],
 quiz: [
 {
 question: 'What is credit?',
 options: [
 'Money the government gives you for free',
 'The ability to borrow money now and pay it back later, usually with interest',
 'A type of savings account',
 'The money in your checking account',
 ],
 answerIndex: 1,
 explanation:
 'Credit means borrowing now and repaying later, usually with interest. Lenders extend credit based on trust that you will pay them back, which is exactly what your credit score measures.',
 },
 {
 question: 'A credit card is an example of which type of credit?',
 options: ['Installment credit', 'A debit account', 'Revolving credit', 'A payday loan'],
 answerIndex: 2,
 explanation:
 'Credit cards are revolving credit: you have a credit limit and pay the amount due each month (or make minimum payments). Installment credit, like mortgages and car loans, is a lump sum repaid in fixed payments by a set date.',
 },
 {
 question: 'What range do FICO credit scores fall in?',
 options: ['0 to 100', '100 to 1,000', '1 to 10', '300 to 850'],
 answerIndex: 3,
 explanation:
 'Credit scores use the FICO system and range from 300 to 850. The higher your score, the less risky you look to lenders, which means easier loan approvals and better interest rates.',
 },
 {
 question: 'Which factor has the BIGGEST impact on your credit score?',
 options: [
 'Payment history: paying your bills on time (35%)',
 'Credit mix (10%)',
 'New credit applications (10%)',
 'Length of credit history (15%)',
 ],
 answerIndex: 0,
 explanation:
 'Payment history is the heavyweight at 35%, followed by credit utilization at 30%. Simply paying every bill on time is the single most powerful thing you can do for your score.',
 },
 {
 question: 'Which of these is generally considered GOOD debt?',
 options: [
 'A payday loan to cover the weekend',
 'A loan for designer fashion',
 'A student loan that increases your potential income',
 'Financing a gaming setup you cannot afford',
 ],
 answerIndex: 2,
 explanation:
 'Good debt helps you make money or grow in value, like student loans, mortgages, and business loans (managed responsibly). Loans for wants like fashion and tech, and especially payday loans, are bad debt.',
 },
 {
 question: 'Why are payday loans considered dangerous?',
 options: [
 'They require excellent credit to get',
 'They are short-term, high-interest loans that almost always leave you in more debt than you started with',
 'They can only be used to buy houses',
 'They take too long to be approved',
 ],
 answerIndex: 1,
 explanation:
 'Payday loans are marketed as quick help between paychecks, but their extremely high interest traps borrowers in a cycle of re-borrowing. They almost always leave you worse off than before.',
 },
 {
 question: 'How do you use a credit card so that it works like a free loan?',
 options: [
 'Pay only the minimum payment each month',
 'Max out the card to earn maximum rewards',
 'Never activate the card',
 'Pay off your balance in full every month',
 ],
 answerIndex: 3,
 explanation:
 'If you pay your balance in full by the due date, no interest is ever charged, making the card essentially a free loan (sometimes with cashback on top). Carrying a balance or paying only the minimum is where the costs pile up.',
 },
 {
 question: 'How do credit card companies make most of their money?',
 options: [
 'Selling the physical plastic cards',
 'Interest on unpaid balances plus fees like late, annual, and over-limit fees',
 'Government grants',
 'Charging stores nothing and users nothing',
 ],
 answerIndex: 1,
 explanation:
 'Credit card companies profit from interest when balances go unpaid, plus late payment fees, annual fees, and over-limit fees. Pay in full and on time, and you flip the deal in your favor.',
 },
 ],
 es: {
 title: 'Crédito y deuda',
 description:
 'Entiende cómo funciona el crédito, qué afecta tu puntaje de crédito y cómo pedir dinero prestado con responsabilidad.',
 sections: [
 {
 type: 'intro',
 heading: '¿Pedir prestado ahora y pagar después?',
 body:
 'Pregunta de calentamiento: imagina que quieres algo que no puedes pagar ahora mismo. ¿Esperarías y ahorrarías, o pedirías dinero prestado para tenerlo hoy? ¿Por qué? No hay una única respuesta correcta, y esa tensión es exactamente de lo que trata la lección de hoy. Al final, sabrás cómo funciona el crédito, qué mide realmente un puntaje de crédito y cómo pedir prestado sin quemarte.',
 },
 {
 type: 'terms',
 heading: 'Cómo funciona el crédito',
 terms: [
 {
 term: 'Crédito (credit)',
 definition:
 'La capacidad de pedir dinero prestado ahora y pagarlo después, normalmente con interés. Los prestamistas dan crédito basándose en la confianza de que les vas a pagar.',
 },
 {
 term: 'Crédito revolvente (revolving credit)',
 definition:
 'Crédito con un límite establecido en el que pagas el monto que debes cada mes o haces pagos mínimos mensuales. Las tarjetas de crédito son el ejemplo clásico.',
 },
 {
 term: 'Crédito en cuotas (installment credit)',
 definition:
 'Una suma de dinero que el prestatario debe devolver en cuotas fijas antes de una fecha determinada. Las hipotecas y los préstamos de auto son ejemplos.',
 },
 ],
 },
 {
 type: 'content',
 heading: '¿Para qué sirve realmente el crédito?',
 body:
 'El crédito se usa a menudo para compras grandes y caras, como una hipoteca para una casa, porque la mayoría de la gente no puede pagarlas de contado. Pero el crédito también aparece en la vida diaria: mucha gente usa tarjetas de crédito con cashback (dinero de vuelta) u otros beneficios para las compras de todos los días. Eso sí, no las confundas con las tarjetas de débito, que sacan el dinero directamente de tu cuenta de cheques.',
 bullets: [
 'Compras grandes: hipotecas, préstamos de auto y otras cosas que la gente rara vez paga de una sola vez',
 'Compras del día a día: tarjetas de crédito con cashback o beneficios',
 'Las tarjetas de débito son diferentes: cobran directamente de tu cuenta de cheques, sin ningún préstamo de por medio',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '¿Cuál de estos es un ejemplo de crédito en cuotas?',
 options: [
 'Una tarjeta de crédito que pagas por completo cada mes',
 'Una tarjeta de débito conectada a tu cuenta de cheques',
 'Un préstamo de auto que se paga en cuotas mensuales fijas antes de una fecha establecida',
 'Las recompensas de cashback en el supermercado',
 ],
 answerIndex: 2,
 explanation:
 'El crédito en cuotas te da una suma de dinero que devuelves en cuotas fijas antes de una fecha determinada, como los préstamos de auto y las hipotecas. Las tarjetas de crédito son crédito revolvente, y las tarjetas de débito ni siquiera son crédito, porque sacan el dinero directo de tu cuenta de cheques.',
 },
 },
 {
 type: 'content',
 heading: 'El puntaje de crédito: tu boleta de calificaciones financiera',
 body:
 'Un puntaje de crédito (credit score) es un número de 3 dígitos que les dice a los prestamistas qué tan riesgoso es prestarte. Los puntajes de crédito usan el sistema de FICO y van de 300 a 850. Mientras más alto, mejor. Tu puntaje afecta si te aprobarán préstamos y qué tasa de interés te darán en ellos, así que este numerito puede ahorrarte (o costarte) mucho dinero.',
 },
 {
 type: 'content',
 heading: 'Los cinco factores de tu puntaje de crédito',
 body:
 'Cinco cosas determinan tu puntaje de crédito, y no pesan lo mismo. La más grande es simplemente pagar tus cuentas a tiempo. Aquí están, de la más pesada a la más ligera.',
 bullets: [
 'Historial de pagos (35%): pagar las cuentas a tiempo',
 'Utilización del crédito (30%): cuánto usas del crédito que tienes disponible',
 'Antigüedad del historial de crédito (15%): cuánto tiempo llevas teniendo cuentas de crédito',
 'Mezcla de crédito (10%): tu combinación de tipos de crédito, revolvente y en cuotas',
 'Crédito nuevo (10%): solicitudes recientes de crédito nuevo',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '¿Cuál par de actividades AYUDARÍA a tu puntaje de crédito?',
 options: [
 'Llevar tu tarjeta de crédito al límite y abrir cinco tarjetas nuevas en una semana',
 'Pagar siempre tu tarjeta de crédito a tiempo y usar solo el 20% de tu límite de crédito',
 'Ignorar tus cuentas y cerrar tu cuenta más antigua',
 'Usar solo efectivo para todo, por siempre',
 ],
 answerIndex: 1,
 explanation:
 'Los pagos a tiempo son el factor más grande (35%), y mantener baja la utilización, como usar solo el 20% de tu límite, ayuda al segundo factor más grande (30%). Llevar las tarjetas al límite y abrir cinco tarjetas nuevas en una semana dañan tu puntaje.',
 },
 },
 {
 type: 'video',
 heading: 'Mira el video: ¿Qué compone tu puntaje de crédito?',
 body:
 'Mira este video rápido de BFF sobre lo que realmente mueve tu puntaje de crédito. ¡Ojo, se pausa para hacerte preguntas por el camino, así que presta atención!',
 videoId: 'rNVIS8YsBbQ',
 source: 'BFF Classroom',
 questions: [
 {
 at: 66,
 question: '¿Qué factor cuenta MÁS en tu puntaje de crédito?',
 options: [
 'Cuántas tarjetas tienes',
 'Tu historial de pagos, pagar a tiempo',
 'Tu sueldo',
 'Qué tan seguido revisas tu puntaje',
 ],
 answerIndex: 1,
 explanation:
 'El historial de pagos es el peso pesado, con cerca del 35%. Un solo pago perdido puede afectarte por años, por eso el pago automático ayuda.',
 },
 {
  at: 127,
  question:
   '¿Por qué el video dice que evites los préstamos de día de pago (payday loans)?',
  options: [
   'Solo son para personas con crédito perfecto',
   'Son préstamos cortos con intereses altísimos que casi siempre te dejan con más deuda de la que empezaste',
   'Tardan demasiado en aprobarse',
   'Solo se pueden usar para pagar la escuela',
  ],
  answerIndex: 1,
  explanation:
   'Los préstamos de día de pago son a corto plazo y con intereses muy altos. La gente los usa para llegar al siguiente cheque, y casi siempre termina debiendo más de lo que pidió.',
 },
 {
 at: 148,
 question:
 '¿Cuál es una de las PEORES cosas para tu puntaje de crédito?',
 options: [
 'Mantener abierta una tarjeta antigua',
 'Usar menos del 30% de tu límite',
 'No hacer un pago',
 'Revisar tu propio reporte de crédito',
 ],
 answerIndex: 2,
 explanation:
 'No hacer un pago golpea el factor más grande y puede quedarse en tu reporte hasta por 7 años. Las cuentas antiguas y la utilización baja en realidad te ayudan; revisar tu propio reporte nunca daña.',
 },
  {
  at: 182,
  question:
   '¿Qué hace que una tarjeta de crédito funcione como un préstamo gratis?',
  options: [
   'Pagar solo el mínimo cada mes',
   'Pagar el saldo completo todos los meses',
   'Mantener la tarjeta justo en su límite',
   'Abrir varias tarjetas a la vez',
  ],
  answerIndex: 1,
  explanation:
   'Si pagas el saldo completo, pediste prestado gratis. Si pagas solo el mínimo, empiezan a acumularse intereses sobre lo que queda, y eso cuesta mucho más con el tiempo.',
 },
],
 },
 {
 type: 'content',
 heading: 'Deuda buena vs. deuda mala',
 body:
 'No todas las deudas son iguales. La deuda buena es pedir prestado para cosas que te ayudan a ganar dinero o que crecen en valor. La deuda mala es pedir prestado para cosas innecesarias que no te ayudarán a largo plazo. El truco es preguntarte: ¿esta deuda me dejará mejor después, o solo más a la moda hoy?',
 bullets: [
 'Buena: los préstamos estudiantiles pueden aumentar tu ingreso potencial, siempre que manejes bien el dinero',
 'Buena: las hipotecas, siempre que te mantengas al día con los pagos',
 'Buena: los préstamos de negocio, que aumentan tu ingreso potencial',
 'Mala: los préstamos para deseos como moda de diseñador, tecnología o el leasing de autos',
 ],
 },
 {
 type: 'example',
 heading: 'La trampa de los préstamos de día de pago',
 body:
 'Los préstamos de día de pago (payday loans) son préstamos de corto plazo con intereses altísimos que solo te harán daño financiero. Se anuncian como ayuda para la gente que vive "de cheque en cheque", pero en realidad casi siempre te dejan con más deuda de la que tenías al empezar. El interés alto se acumula rápido, así que vuelves a pedir prestado para cubrirlo, y el ciclo se repite. Mantente lejos.',
 },
 {
 type: 'content',
 heading: 'Entender las tarjetas de crédito',
 body:
 'Las tarjetas de crédito pueden ser una herramienta extremadamente poderosa si se usan correctamente. Una tarjeta de crédito te permite pedir dinero prestado hasta un límite y pagarlo después. Si la pagas por completo cada mes, es esencialmente un préstamo gratis. Pero si no pagas el monto completo antes de la fecha límite, se cobra interés sobre el saldo, y pagar solo el pago mínimo te cuesta más con el tiempo.',
 bullets: [
 'Paga el total cada mes y no pagas nada de interés',
 'Deja un saldo pendiente y el interés se acumula sobre lo que debes',
 'Los pagos mínimos te mantienen endeudado más tiempo y cuestan más en total',
 'Algunas tarjetas ofrecen beneficios como cashback o puntos de viaje, ¡pero cuidado con las trampas!',
 '¿Ya estás endeudado? Los métodos bola de nieve (snowball) y avalancha (avalanche) son dos estrategias para pagar la deuda',
 ],
 },
 {
 type: 'example',
 heading: 'Leer una oferta real de tarjeta de crédito',
 body:
 'Aquí tienes una tarjeta de crédito de ejemplo: APR del 22.99%, límite de crédito de $1,000, cuota anual de $0, pago mínimo de $35 al mes. Traducción: puedes pedir prestado hasta $1,000 y no hay cuota anual. Pero si dejas un saldo pendiente, crece a un empinado 22.99% al año. Si pagas solo el mínimo de $35 con la tarjeta al tope, el interés se comerá la mayor parte de ese pago. Pagar el total es la jugada ganadora.',
 },
 {
 type: 'content',
 heading: 'Cómo ganan dinero las compañías de tarjetas de crédito',
 body:
 '¿Alguna vez te has preguntado por qué las compañías regalan tarjetas con recompensas gratis? Las compañías de tarjetas de crédito ganan dinero con el interés cuando los saldos se quedan sin pagar, y con las cuotas: cargos por pago tardío, cuotas anuales y cargos por pasarse del límite. Su modelo de negocio cuenta con que la gente se equivoque. Tu trabajo es no ser esa persona.',
 bullets: [
 'Paga siempre tu saldo completo cada mes',
 'Usa tu tarjeta de crédito para gastos mensuales constantes que ya tienes presupuestados',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Tienes la tarjeta de ejemplo con 22.99% de APR. ¿Qué pasa si solo pagas el pago mínimo de $35 cada mes sobre un saldo grande?',
 options: [
 'El interés se sigue cobrando sobre el saldo restante, así que te cuesta más con el tiempo',
 'El saldo desaparece después de tres pagos',
 'La compañía te perdona todo el interés como recompensa',
 'Tu límite de crédito se duplica automáticamente',
 ],
 answerIndex: 0,
 explanation:
 'Los pagos mínimos apenas rascan el saldo, así que ese APR del 22.99% sigue cobrando interés sobre todo lo que queda. Pagar el total cada mes es lo que convierte una tarjeta de crédito en un préstamo esencialmente gratis en lugar de uno caro.',
 },
 },
 {
 type: 'content',
 heading: 'Para cerrar',
 body:
 'Hoy aprendiste que el crédito es confianza prestada, que tu puntaje de crédito se construye sobre todo pagando a tiempo y manteniendo baja la utilización, que la deuda buena ayuda a tu futuro mientras la deuda mala lo drena, y que las tarjetas de crédito solo son gratis si pagas el total. Anota lo que te quedó claro y lo que necesitas repasar. Próxima sesión: Gestión de riesgos y seguros, ¡más la actividad Cover Your Bases (cubre tus bases)!',
 },
 ],
 quiz: [
 {
 question: '¿Qué es el crédito?',
 options: [
 'Dinero que el gobierno te da gratis',
 'La capacidad de pedir dinero prestado ahora y pagarlo después, normalmente con interés',
 'Un tipo de cuenta de ahorros',
 'El dinero de tu cuenta de cheques',
 ],
 answerIndex: 1,
 explanation:
 'El crédito significa pedir prestado ahora y devolver después, normalmente con interés. Los prestamistas otorgan crédito basándose en la confianza de que les vas a pagar, que es exactamente lo que mide tu puntaje de crédito.',
 },
 {
 question: 'Una tarjeta de crédito es un ejemplo de ¿qué tipo de crédito?',
 options: [
 'Crédito en cuotas',
 'Una cuenta de débito',
 'Crédito revolvente',
 'Un préstamo de día de pago',
 ],
 answerIndex: 2,
 explanation:
 'Las tarjetas de crédito son crédito revolvente: tienes un límite de crédito y pagas el monto que debes cada mes (o haces pagos mínimos). El crédito en cuotas, como las hipotecas y los préstamos de auto, es una suma que se devuelve en pagos fijos antes de una fecha establecida.',
 },
 {
 question: '¿En qué rango caen los puntajes de crédito FICO?',
 options: ['De 0 a 100', 'De 100 a 1,000', 'De 1 a 10', 'De 300 a 850'],
 answerIndex: 3,
 explanation:
 'Los puntajes de crédito usan el sistema FICO y van de 300 a 850. Mientras más alto tu puntaje, menos riesgoso te ves para los prestamistas, lo que significa aprobaciones de préstamos más fáciles y mejores tasas de interés.',
 },
 {
 question: '¿Qué factor tiene el MAYOR impacto en tu puntaje de crédito?',
 options: [
 'Historial de pagos: pagar tus cuentas a tiempo (35%)',
 'Mezcla de crédito (10%)',
 'Solicitudes de crédito nuevo (10%)',
 'Antigüedad del historial de crédito (15%)',
 ],
 answerIndex: 0,
 explanation:
 'El historial de pagos es el peso pesado con el 35%, seguido por la utilización del crédito con el 30%. Simplemente pagar cada cuenta a tiempo es lo más poderoso que puedes hacer por tu puntaje.',
 },
 {
 question: '¿Cuál de estas se considera generalmente deuda BUENA?',
 options: [
 'Un préstamo de día de pago para cubrir el fin de semana',
 'Un préstamo para moda de diseñador',
 'Un préstamo estudiantil que aumenta tu ingreso potencial',
 'Financiar un equipo de videojuegos que no puedes pagar',
 ],
 answerIndex: 2,
 explanation:
 'La deuda buena te ayuda a ganar dinero o crece en valor, como los préstamos estudiantiles, las hipotecas y los préstamos de negocio (manejados con responsabilidad). Los préstamos para deseos como moda y tecnología, y especialmente los préstamos de día de pago, son deuda mala.',
 },
 {
 question: '¿Por qué se consideran peligrosos los préstamos de día de pago?',
 options: [
 'Requieren un crédito excelente para conseguirlos',
 'Son préstamos de corto plazo con intereses altos que casi siempre te dejan con más deuda de la que tenías al empezar',
 'Solo se pueden usar para comprar casas',
 'Tardan demasiado en aprobarse',
 ],
 answerIndex: 1,
 explanation:
 'Los préstamos de día de pago se anuncian como ayuda rápida entre cheques de pago, pero sus intereses extremadamente altos atrapan a los prestatarios en un ciclo de volver a pedir prestado. Casi siempre te dejan peor que antes.',
 },
 {
 question: '¿Cómo usas una tarjeta de crédito para que funcione como un préstamo gratis?',
 options: [
 'Pagando solo el pago mínimo cada mes',
 'Llevando la tarjeta al límite para ganar el máximo de recompensas',
 'No activando nunca la tarjeta',
 'Pagando tu saldo completo cada mes',
 ],
 answerIndex: 3,
 explanation:
 'Si pagas tu saldo completo antes de la fecha límite, nunca se cobra interés, lo que hace que la tarjeta sea esencialmente un préstamo gratis (a veces con cashback encima). Dejar un saldo pendiente o pagar solo el mínimo es donde los costos se acumulan.',
 },
 {
 question: '¿Cómo ganan la mayor parte de su dinero las compañías de tarjetas de crédito?',
 options: [
 'Vendiendo las tarjetas de plástico físicas',
 'Con el interés de los saldos sin pagar más las cuotas: cargos por pago tardío, cuotas anuales y cargos por pasarse del límite',
 'Con subvenciones del gobierno',
 'No cobrándoles nada ni a las tiendas ni a los usuarios',
 ],
 answerIndex: 1,
 explanation:
 'Las compañías de tarjetas de crédito ganan con el interés cuando los saldos se quedan sin pagar, más los cargos por pago tardío, las cuotas anuales y los cargos por pasarse del límite. Paga el total y a tiempo, y volteas el trato a tu favor.',
 },
 ],
 },
 zh: {
 title: '信用与债务',
 description: '了解信用是如何运作的、哪些因素会影响你的信用分数，以及如何负责任地借钱。',
 sections: [
 {
 type: 'intro',
 heading: '先买后付？',
 body:
 '热身问题：想象一下你想要一样现在买不起的东西。你会等着攒钱，还是借钱今天就把它买下来？为什么？这个问题没有唯一正确的答案，而这种纠结正是今天这节课要讲的内容。学完之后，你就会明白信用是怎么运作的、信用分数到底衡量的是什么，以及如何借钱又不被坑。',
 },
 {
 type: 'terms',
 heading: '信用是如何运作的',
 terms: [
 {
 term: 'Credit（信用）',
 definition:
 '现在借钱、以后再还的能力，通常需要付利息。放款方之所以给你信用，是基于相信你会把钱还给他们。',
 },
 {
 term: 'Revolving credit（循环信用）',
 definition:
 '有固定额度的信用，你每月偿还应还金额，或者只还最低还款额。信用卡就是最经典的例子。',
 },
 {
 term: 'Installment credit（分期信用）',
 definition:
 '借款人必须在某个日期前分期按固定金额偿还的一笔钱。房贷和车贷就是例子。',
 },
 ],
 },
 {
 type: 'content',
 heading: '信用到底是用来做什么的？',
 body:
 '信用常常用于大额、昂贵的消费，比如买房用的房贷，因为大多数人没法一次性付清。但信用也出现在日常生活中：很多人用带返现（cashback）或其他福利的信用卡来支付日常消费。不过别把它们和借记卡（debit card）搞混了，借记卡是直接从你的支票账户里扣钱的。',
 bullets: [
 '大额消费：房贷、车贷，以及其他人们很少一次性付清的东西',
 '日常消费：带返现或福利的信用卡',
 '借记卡不一样：它直接从你的支票账户扣款，完全不涉及借钱',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '以下哪一个是分期信用的例子？',
 options: [
 '一张你每月都全额还清的信用卡',
 '一张连接到你支票账户的借记卡',
 '一笔在规定日期前按固定月供偿还的车贷',
 '买菜时获得的返现奖励',
 ],
 answerIndex: 2,
 explanation:
 '分期信用给你一笔钱，你要在某个日期前按固定金额分期偿还，比如车贷和房贷。信用卡属于循环信用，而借记卡根本不算信用，因为它直接从你的支票账户扣钱。',
 },
 },
 {
 type: 'content',
 heading: '信用分数：你的财务成绩单',
 body:
 '信用分数是一个3位数的数字，它告诉放款方借钱给你有多大风险。信用分数采用FICO提供的系统，范围是300到850。越高越好。你的分数会影响你能否获批贷款，以及贷款的利率是多少，所以这个小小的数字可能帮你省下（或让你多花）很多钱。',
 },
 {
 type: 'content',
 heading: '信用分数的五大因素',
 body:
 '有五件事决定你的信用分数，而且它们的权重并不相同。最重要的一个，就是按时付账单。下面按从重到轻的顺序列出来。',
 bullets: [
 '还款记录（35%）：按时付账单',
 '信用使用率（30%）：你用掉了可用额度的多少',
 '信用历史长度（15%）：你拥有信用账户的时间有多久',
 '信用类型组合（10%）：你的信用类型搭配，包括循环信用和分期信用',
 '新增信用（10%）：最近申请新信用的情况',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '以下哪一组做法会帮助你的信用分数？',
 options: [
 '刷爆你的信用卡，并在一周内开五张新卡',
 '总是按时还信用卡账单，并且只用掉信用额度的20%',
 '不理会你的账单，并注销你最早开的账户',
 '永远只用现金支付一切',
 ],
 answerIndex: 1,
 explanation:
 '按时还款是最大的因素（35%），而把使用率保持在低位，比如只用额度的20%，则有助于第二大因素（30%）。刷爆信用卡和一周内开五张新卡都会伤害你的分数。',
 },
 },
 {
 type: 'video',
 heading: '观看：你的信用分数是由什么构成的？',
 body:
 '来看这段BFF的短视频，了解到底是什么在真正影响你的信用分数。注意，它中途会暂停来考考你，所以要集中注意力！',
 videoId: 'rNVIS8YsBbQ',
 source: 'BFF Classroom',
 questions: [
 {
 at: 66,
 question: '在你的信用分数里，哪个因素占的比重最大？',
 options: [
 '你拥有多少张卡',
 '你的还款记录，按时还款',
 '你的工资',
 '你查看自己分数的频率',
 ],
 answerIndex: 1,
 explanation:
 '还款记录是重量级选手，大约占35%。哪怕只错过一次付款，也可能影响你的分数好几年，这就是为什么自动扣款很有帮助。',
 },
 {
  at: 127,
  question:
   '视频为什么建议远离发薪日贷款（payday loan）？',
  options: [
   '它们只提供给信用完美的人',
   '它们是高利息的短期贷款，往往让你欠得比一开始更多',
   '审批时间太长',
   '只能用来支付学费',
  ],
  answerIndex: 1,
  explanation:
   '发薪日贷款期限短、利息极高。人们借它来撑到下一次发薪，结果几乎总是欠下比借的时候更多。',
 },
 {
 at: 148,
 question: '对你的信用分数来说，最糟糕的事情之一是什么？',
 options: [
 '保留一张旧卡不注销',
 '使用不到30%的额度',
 '错过一次付款',
 '查看自己的信用报告',
 ],
 answerIndex: 2,
 explanation:
 '错过一次付款会重创最大的因素，而且可能会在你的报告上留存长达7年。旧账户和低使用率其实是在帮你；查看自己的报告永远不会有害。',
 },
  {
  at: 182,
  question:
   '怎样才能让信用卡相当于一笔免息贷款？',
  options: [
   '每月只还最低还款额',
   '每月把账单全额还清',
   '一直把卡刷到额度上限',
   '一次性开好几张卡',
  ],
  answerIndex: 1,
  explanation:
   '全额还清，就等于免费借用了这笔钱。只还最低还款额，剩下的余额就开始计息，长期下来贵得多。',
 },
],
 },
 {
 type: 'content',
 heading: '好债务 vs. 坏债务',
 body:
 '不是所有债务都一样。好债务是为那些能帮你赚钱或会增值的东西借钱。坏债务是为那些不必要、长期对你没帮助的东西借钱。诀窍是问自己：这笔债务会让我以后过得更好，还是只是让我今天看起来更酷？',
 bullets: [
 '好：只要你把钱管理好，学生贷款能提升你的潜在收入',
 '好：房贷，只要你按时还款不掉队',
 '好：商业贷款，能提升你的潜在收入',
 '坏：为设计师品牌时装、电子产品或租车这类欲望而借的贷款',
 ],
 },
 {
 type: 'example',
 heading: '发薪日贷款的陷阱',
 body:
 '发薪日贷款（payday loans）是短期、高利息的贷款，只会在财务上害了你。它们被宣传为帮助那些"月光族"（靠每份工资勉强度日的人）的救星，但实际上几乎总是让你欠下比一开始更多的债。高额利息迅速堆积，于是你为了填补它又去借，如此循环往复。离它远点。',
 },
 {
 type: 'content',
 heading: '读懂信用卡',
 body:
 '如果用得对，信用卡可以是一个极其强大的工具。信用卡让你在额度内借钱、以后再还。如果你每月都全额还清，它本质上就是一笔免费的贷款。但如果你没在到期日前把全额还清，就会对余额收取利息，而且只还最低还款额会让你随时间付出更多。',
 bullets: [
 '每月全额还清，你就一分利息都不用付',
 '留有欠款，利息就会不断累加到你欠的钱上',
 '最低还款额会让你负债更久、总体花费更多',
 '有些卡提供返现或旅行积分等福利，但要当心陷阱！',
 '已经欠债了？雪球法（snowball）和雪崩法（avalanche）是两种还债的策略',
 ],
 },
 {
 type: 'example',
 heading: '读懂一份真实的信用卡优惠',
 body:
 '这里有一张信用卡的例子：APR为22.99%，信用额度1,000美元，年费0美元，每月最低还款额35美元。翻译一下：你最多可以借1,000美元，而且没有年费。但如果你留有欠款，它会以陡峭的每年22.99%增长。如果你刷爆了卡却只还35美元的最低额，利息会吃掉这笔还款的大部分。全额还清才是制胜之举。',
 },
 {
 type: 'content',
 heading: '信用卡公司是怎么赚钱的',
 body:
 '有没有想过，为什么这些公司要发放带免费奖励的卡？信用卡公司通过未还清余额产生的利息赚钱，也靠各种费用赚钱：逾期费、年费和超限费。他们的商业模式就指望着人们出错。你的任务，就是别当那个出错的人。',
 bullets: [
 '每个月都要全额还清你的欠款',
 '把信用卡用在你已经列入预算的固定每月开支上',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你有那张APR为22.99%的示例卡。如果每月对一大笔欠款只还35美元的最低还款额，会发生什么？',
 options: [
 '利息会继续对剩余欠款计收，所以随时间推移会让你花更多钱',
 '还三次款之后欠款就消失了',
 '公司会作为奖励免除所有利息',
 '你的信用额度会自动翻倍',
 ],
 answerIndex: 0,
 explanation:
 '最低还款额几乎撼动不了欠款本金，所以那22.99%的APR会继续对剩下的一切计收利息。每月全额还清，才能把信用卡变成一笔本质上免费的贷款，而不是一笔昂贵的贷款。',
 },
 },
 {
 type: 'content',
 heading: '总结',
 body:
 '今天你学到了：信用就是借来的信任；你的信用分数主要靠按时还款和保持低使用率来建立；好债务有助于你的未来，而坏债务会把它耗干；信用卡只有在你全额还清时才是免费的。记下让你豁然开朗的地方，以及需要复习的地方。下节课：风险管理与保险，还有"Cover Your Bases（守好你的每一垒）"活动！',
 },
 ],
 quiz: [
 {
 question: '什么是信用？',
 options: [
 '政府免费给你的钱',
 '现在借钱、以后再还的能力，通常需要付利息',
 '一种储蓄账户',
 '你支票账户里的钱',
 ],
 answerIndex: 1,
 explanation:
 '信用意味着现在借、以后还，通常要付利息。放款方是基于相信你会还钱才给你信用的，而这正是你的信用分数所衡量的东西。',
 },
 {
 question: '信用卡是哪种类型的信用的例子？',
 options: ['分期信用', '借记账户', '循环信用', '发薪日贷款'],
 answerIndex: 2,
 explanation:
 '信用卡属于循环信用：你有一个信用额度，每月偿还应还金额（或还最低额）。而分期信用，比如房贷和车贷，是一笔在规定日期前按固定金额偿还的钱。',
 },
 {
 question: 'FICO信用分数的范围是多少？',
 options: ['0到100', '100到1,000', '1到10', '300到850'],
 answerIndex: 3,
 explanation:
 '信用分数采用FICO系统，范围是300到850。你的分数越高，在放款方眼里风险就越低，这意味着更容易获批贷款、拿到更好的利率。',
 },
 {
 question: '哪个因素对你的信用分数影响最大？',
 options: [
 '还款记录：按时付账单（35%）',
 '信用类型组合（10%）',
 '新增信用申请（10%）',
 '信用历史长度（15%）',
 ],
 answerIndex: 0,
 explanation:
 '还款记录是重量级选手，占35%，其次是信用使用率，占30%。仅仅是按时付清每一张账单，就是你能为自己分数做的最有力的事。',
 },
 {
 question: '以下哪一项通常被认为是好债务？',
 options: [
 '为了过周末而借的发薪日贷款',
 '为买设计师品牌时装而借的贷款',
 '一笔能提升你潜在收入的学生贷款',
 '为一套你负担不起的游戏装备做的分期',
 ],
 answerIndex: 2,
 explanation:
 '好债务能帮你赚钱或会增值，比如学生贷款、房贷和商业贷款（在负责任管理的前提下）。为时装、电子产品这类欲望而借的贷款，尤其是发薪日贷款，都属于坏债务。',
 },
 {
 question: '为什么发薪日贷款被认为很危险？',
 options: [
 '需要极好的信用才能拿到',
 '它们是短期、高利息的贷款，几乎总是让你欠下比一开始更多的债',
 '只能用来买房',
 '审批时间太长',
 ],
 answerIndex: 1,
 explanation:
 '发薪日贷款被宣传为发薪之间的快速救急，但其极高的利息会把借款人困在不断再借的循环里。它们几乎总是让你比之前过得更糟。',
 },
 {
 question: '怎样使用信用卡，才能让它像一笔免费贷款一样？',
 options: [
 '每月只还最低还款额',
 '刷爆卡以赚取最多的奖励',
 '永远不激活这张卡',
 '每个月都全额还清你的欠款',
 ],
 answerIndex: 3,
 explanation:
 '如果你在到期日前全额还清欠款，就永远不会被收利息，这让这张卡本质上成了一笔免费贷款（有时还附带返现）。留有欠款或只还最低额，才是费用堆积的地方。',
 },
 {
 question: '信用卡公司大部分的钱是怎么赚来的？',
 options: [
 '出售实体塑料卡片',
 '未还清余额产生的利息，加上逾期费、年费和超限费等各种费用',
 '政府拨款',
 '对商家和用户都分文不收',
 ],
 answerIndex: 1,
 explanation:
 '信用卡公司靠未还清余额产生的利息赚钱，再加上逾期费、年费和超限费。只要你全额且按时还款，就能把这笔交易扭转到对自己有利的一边。',
 },
 ],
 },
}

export default lesson
