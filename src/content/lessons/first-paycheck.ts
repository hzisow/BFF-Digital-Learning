import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'first-paycheck',
 week: 5,
 day: 1,
 title: 'Your First Paycheck',
 icon: 'receipt',
 description:
 'Crack the code on your very first paystub. Where every dollar goes, why the number is smaller than you expected, and how to catch mistakes like a pro.',
 durationMin: 15,
 sections: [
 {
 type: 'intro',
 heading: 'Payday! ...Wait, Where Did My Money Go?',
 body:
 "It finally happened, your first paycheck! You worked hard, did the math in your head, and then... the number is smaller than you expected. Don't panic, and don't assume anyone robbed you. Today you'll learn to read a paystub line by line, understand every deduction, and know exactly where each dollar went. By the end, that confusing slip of paper will read like a comic book.",
 },
 {
 type: 'content',
 heading: 'The Big Two: Gross Pay vs. Net Pay',
 body:
 "Every paystub tells a story with two main characters. Gross pay is everything you earned before anything is taken out, hours worked times your hourly rate, plus any overtime or tips your employer runs through payroll. Net pay is what actually lands in your pocket after deductions. The gap between them isn't a mistake; it's taxes and other withholdings doing their thing.",
 bullets: [
 'Gross pay = your hours x your rate (plus overtime, bonuses, or payroll tips)',
 'Net pay = gross pay minus all deductions. Your real take-home money',
 'Budget with your NET pay, never your gross. Gross is a number you never actually touch',
 ],
 },
 {
 type: 'content',
 heading: 'Income Tax Withholding: Pay As You Go',
 body:
 "The biggest chunk usually missing from your check is income tax withholding. Instead of handing the government one giant payment every April, your employer withholds a little from each paycheck and sends it in for you, federal income tax for the U.S. government, and state income tax if your state has one (a few, like Texas and Florida, don't!). Think of it as paying your tax bill in tiny installments all year long. If too much gets withheld, you get it back later as a refund.",
 },
 {
 type: 'terms',
 heading: 'Paycheck Vocabulary',
 terms: [
 {
 term: 'Gross pay',
 definition:
 'The total amount you earned in a pay period before any deductions, the biggest number on your paystub.',
 },
 {
 term: 'Net pay',
 definition:
 'Your take-home pay after all taxes and deductions are subtracted. This is the money that actually reaches your bank account.',
 },
 {
 term: 'Withholding',
 definition:
 'Money your employer takes out of each paycheck and sends to the government on your behalf to cover your income taxes.',
 },
 {
 term: 'FICA',
 definition:
 'The Federal Insurance Contributions Act tax. 6.2% of your pay for Social Security plus 1.45% for Medicare (7.65% total). Your employer pays a matching 7.65% too.',
 },
 {
 term: 'W-4',
 definition:
 'The form you fill out when you start a job. It tells your employer how much federal income tax to withhold from each paycheck.',
 },
 {
 term: 'Direct deposit',
 definition:
 'An electronic payment that sends your net pay straight into your bank account on payday, no paper check, no waiting in line.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 "Tasha's paystub shows gross pay of $500 and net pay of $432. Which number should she use when planning her spending?",
 options: [
 '$500, that is what she earned, so that is what she can spend',
 '$432, net pay is the money she actually takes home',
 'The average of the two, $466',
 'Neither, paystub numbers are just estimates',
 ],
 answerIndex: 1,
 explanation:
 "Nailed it! Net pay is the only number that actually hits her bank account, so it's the only number she can spend. The $68 difference went to taxes and other deductions. Budgeting with gross pay is how people accidentally overspend.",
 },
 },
 {
   type: 'video',
   heading: 'Watch: Where Did My Paycheck Go?',
   body:
     'Watch this quick BFF video on the gap between what you earn and what lands in your account. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 'xNkc1us-WlY',
   source: 'BFF Classroom',
   questions: [
     {
       at: 43,
       question:
         'You earned $600 but the deposit says $478. What are those two numbers called?',
       options: [
         'Net pay and gross pay, in that order',
         'Gross pay and net pay, in that order',
         'Base pay and bonus pay',
         'Taxable pay and tax-free pay',
       ],
       answerIndex: 1,
       explanation:
         '$600 is gross pay, which is what you earned. $478 is net pay, which is what you keep. Everything between the two is itemized on your paystub, and most people never read it.',
     },
     {
       at: 62,
       question:
         'Why does the government take tax out of every paycheck instead of billing you once a year?',
       options: [
         'You pay less tax overall that way',
         'So the same tax is spread out instead of wrecking you all at once',
         'It is a penalty for working hourly',
         'Your employer keeps the difference',
       ],
       answerIndex: 1,
       explanation:
         'You are paying the same tax either way. Withholding just takes a slice as you go, rather than hitting you with one enormous bill every April.',
     },
     {
       at: 88,
       question:
         'What does FICA pay for?',
       options: [
         'Unemployment benefits only',
         'Social Security and Medicare',
         "Your state's roads and schools",
         "Your employer's health plan",
       ],
       answerIndex: 1,
       explanation:
         'It is 7.65% of your pay, split between Social Security and Medicare, and your employer quietly pays the same amount again on your behalf. It funds people who are retired right now, and one day it funds you.',
     },
     {
       at: 135,
       question:
         'You had tax withheld but earned very little. What should you do?',
       options: [
         'Nothing, the money is gone',
         'File a return anyway, since that is often how you get it back',
         'Ask your employer for a refund directly',
         'Wait until you earn more before filing',
       ],
       answerIndex: 1,
       explanation:
         'Everything gets summarized on a W-2 at year end. If you earned little enough to owe nothing, filing is how you claim back what was already withheld.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'FICA: Your Ticket to Social Security and Medicare',
 body:
 "Two lines on your stub, Social Security and Medicare. Together make up FICA. Social Security takes 6.2% of your gross pay and funds monthly checks for retirees and people with disabilities. Medicare takes 1.45% and funds health insurance for people 65 and older. That's 7.65% total, and here's the cool part: your employer matches it, kicking in another 7.65% that never touches your paycheck. You're not losing this money into a void. You're earning credits toward benefits you can use decades from now.",
 bullets: [
 'Social Security: 6.2% of gross pay',
 'Medicare: 1.45% of gross pay',
 'Combined FICA: 7.65% from you + a matching 7.65% from your employer',
 'Unlike income tax, FICA is a flat rate. Everyone pays the same percentage on their wages',
 ],
 },
 {
 type: 'example',
 heading: "Example: Jayden's First Stub",
 body:
 "Jayden bags groceries for $14 an hour and worked 25 hours over two weeks, so his gross pay is $350. His paystub shows: Social Security -$21.70 (6.2% of $350), Medicare -$5.08 (1.45%), federal income tax withholding -$11.00, and state income tax -$7.00. Total deductions: $44.78. Net pay: $305.22. At first Jayden thought he was 'missing' almost $45, but line by line, every dollar is accounted for. He also spots his YTD (year-to-date) column, which will keep a running total all year.",
 },
 {
 type: 'content',
 heading: 'The W-4: The Form That Controls Your Withholding',
 body:
 "On day one of any job, HR hands you a Form W-4. It's not a test, it's how you tell your employer how much federal income tax to hold back. List your filing status and answer a few questions, and payroll does the math. If you're a student with one part-time job, the standard settings usually work fine. Claim too little withholding and you might owe money in April; withhold extra and you'll get it back as a refund. You can update your W-4 anytime your situation changes, new job, second job, big life change.",
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Marcus earns $200 gross this week. About how much will FICA (Social Security + Medicare) take out of his check?',
 options: [
 'About $15.30, 7.65% of $200',
 'About $40, FICA is always 20%',
 '$0, teens are exempt from FICA',
 'About $62, Social Security alone is 31%',
 ],
 answerIndex: 0,
 explanation:
 'FICA is 6.2% for Social Security ($12.40) plus 1.45% for Medicare ($2.90), which totals 7.65%, about $15.30 on a $200 check. And no, being a teen does not make you exempt: if you earn wages, you pay FICA.',
 },
 },
 {
 type: 'content',
 heading: 'Direct Deposit: Skip the Paper',
 body:
 "Most employers offer direct deposit, your net pay zaps electronically into your bank account on payday. No paper check to lose, no trip to the bank, no waiting for a check to clear. To set it up you'll give your employer your bank's routing number and your account number (both are on your bank's app or a check). Pro tip: some employers even let you split your deposit, sending part to checking and part straight to savings, automatic saving before you ever see the money.",
 },
 {
 type: 'content',
 heading: 'Be Your Own Auditor: Check Every Stub',
 body:
 "Payroll systems are run by humans, and humans make mistakes. Every payday, take 60 seconds to audit your own stub. If something looks off, don't be shy, politely ask your manager or the payroll contact listed on the stub. Errors are usually honest mistakes, and they get fixed fastest when you catch them early.",
 bullets: [
 'Check your hours: does the stub match the hours you actually worked?',
 'Check your rate: were you paid the hourly rate you were promised?',
 'Check overtime: hours past 40 in a week usually pay 1.5x your rate',
 'Check the math: rate x hours should equal your gross pay',
 'Keep your stubs (or screenshots). They are your proof if a dispute ever comes up',
 ],
 },
 {
 type: 'content',
 heading: 'The W-2: Your Year-End Report Card',
 body:
 "Every January, your employer sends you a Form W-2, a summary of your entire year: total wages earned and total taxes withheld for federal, state, and FICA. Don't confuse it with the W-4! The W-4 is what YOU fill out at hiring to set your withholding; the W-2 is what your EMPLOYER fills out after the year ends. You use the W-2 to file your tax return, and if too much was withheld during the year, that return is how you get your refund. File it away somewhere safe, tax season will thank you.",
 },
 ],
 quiz: [
 {
 question: 'Your gross pay is $600 but your bank account only shows $521. What happened?',
 options: [
 'The bank charged you an $79 transfer fee',
 'Taxes and other deductions were withheld before your net pay was deposited',
 'Your employer made an illegal error',
 'Direct deposit always loses a percentage',
 ],
 answerIndex: 1,
 explanation:
 'The $79 gap is your deductions: federal (and maybe state) income tax withholding plus FICA taxes came out of your gross pay before the net pay was deposited. That is completely normal, but you should still verify the math on your stub!',
 },
 {
 question: 'What are the two parts of FICA, and what rates do YOU pay?',
 options: [
 'Federal tax at 10% and state tax at 5%',
 'Social Security at 6.2% and Medicare at 1.45%',
 'Social Security at 12.4% and Medicare at 2.9%',
 'Retirement at 3% and insurance at 4%',
 ],
 answerIndex: 1,
 explanation:
 'FICA is Social Security (6.2%) plus Medicare (1.45%), totaling 7.65% of your gross wages. The 12.4% and 2.9% figures are the combined totals only after your employer adds its matching share.',
 },
 {
 question: 'What is the purpose of the W-4 form you fill out when starting a job?',
 options: [
 'It tells your employer how much federal income tax to withhold from your paychecks',
 'It summarizes your total yearly earnings for tax filing',
 'It signs you up for direct deposit',
 'It proves you are legally allowed to drive to work',
 ],
 answerIndex: 0,
 explanation:
 'The W-4 sets your federal income tax withholding. Fill it out when you are hired, and update it whenever your situation changes. The form that summarizes your yearly earnings is the W-2, which arrives every January.',
 },
 {
 question: 'In January, your employer sends you a W-2. What is it for?',
 options: [
 'It is a bill for taxes you still owe',
 'It is a coupon for tax preparation software',
 'It summarizes your year of wages and withheld taxes so you can file your tax return',
 'It resets your withholding for the new year',
 ],
 answerIndex: 2,
 explanation:
 'The W-2 reports your total wages and everything withheld, federal, state, and FICA, for the whole year. You use those numbers to file your tax return, which is also how you claim a refund if too much was withheld.',
 },
 {
 question: 'Which of these is a benefit of direct deposit?',
 options: [
 'Your gross pay is deposited instead of your net pay',
 'You skip paying FICA taxes',
 'Your employer pays you a bonus for using it',
 'Your pay arrives electronically on payday, no paper check to lose or cash',
 ],
 answerIndex: 3,
 explanation:
 'Direct deposit sends your net pay straight to your bank account electronically, so there is no check to lose, deposit, or wait on. It does not change what you are paid or what taxes you owe, just how the money travels.',
 },
 {
 question:
 'Nia worked 22 hours at $15/hour, but her stub shows gross pay of $255 instead of $330. What should she do?',
 options: [
 'Nothing, the missing $75 is probably just taxes',
 'Quit immediately',
 'Compare the stub to her own record of hours, then politely ask her manager or payroll to fix the error',
 'Post the paystub online to warn others',
 ],
 answerIndex: 2,
 explanation:
 'Taxes come out AFTER gross pay is calculated, so a wrong gross number means the hours or rate were entered incorrectly. Checking rate x hours (22 x $15 = $330) and calmly flagging it with payroll is exactly how pros handle it, and why you always review your stub.',
 },
 ],
 es: {
 title: 'Tu primer cheque de pago',
 description:
 'Descifra el código de tu primer recibo de pago: a dónde va cada dólar, por qué el número es más chico de lo que esperabas y cómo detectar errores como todo un experto.',
 sections: [
 {
 type: 'intro',
 heading: '¡Día de pago! ...Un momento, ¿a dónde fue mi dinero?',
 body:
 'Por fin pasó: ¡tu primer cheque de pago! Trabajaste duro, hiciste las cuentas en tu cabeza y luego... el número es más chico de lo que esperabas. No te asustes y no pienses que alguien te robó. Hoy vas a aprender a leer un recibo de pago línea por línea, a entender cada deducción y a saber exactamente a dónde fue cada dólar. Al terminar, ese papelito confuso se va a leer como una historieta.',
 },
 {
 type: 'content',
 heading: 'Los dos grandes: ingreso bruto vs. ingreso neto',
 body:
 'Cada recibo de pago cuenta una historia con dos personajes principales. El ingreso bruto (gross pay) es todo lo que ganaste antes de que te quiten nada: las horas trabajadas por tu tarifa por hora, más cualquier hora extra o propina que tu empleador procese por la nómina. El ingreso neto (net pay) es lo que de verdad llega a tu bolsillo después de las deducciones. La diferencia entre ambos no es un error; son los impuestos y otras retenciones haciendo su trabajo.',
 bullets: [
 'Ingreso bruto = tus horas x tu tarifa (más horas extra, bonos o propinas por nómina)',
 'Ingreso neto = ingreso bruto menos todas las deducciones, tu dinero real para llevar a casa',
 'Haz tu presupuesto con tu ingreso NETO, nunca con el bruto. El bruto es un número que en realidad nunca tocas',
 ],
 },
 {
 type: 'content',
 heading: 'Retención del impuesto sobre la renta: paga sobre la marcha',
 body:
 'La porción más grande que suele faltar en tu cheque es la retención del impuesto sobre la renta. En lugar de entregarle al gobierno un pago gigante cada abril, tu empleador retiene un poco de cada cheque y lo envía por ti: el impuesto federal sobre la renta para el gobierno de EE. UU., y el impuesto estatal sobre la renta si tu estado tiene uno (¡algunos, como Texas y Florida, no lo tienen!). Piénsalo como pagar tu cuenta de impuestos en pequeñas cuotas durante todo el año. Si te retienen de más, luego lo recuperas como reembolso.',
 },
 {
 type: 'terms',
 heading: 'Vocabulario del cheque de pago',
 terms: [
 {
 term: 'Ingreso bruto (gross pay)',
 definition:
 'El monto total que ganaste en un período de pago antes de cualquier deducción, el número más grande de tu recibo de pago.',
 },
 {
 term: 'Ingreso neto (net pay)',
 definition:
 'Tu paga para llevar a casa después de restar todos los impuestos y deducciones. Este es el dinero que de verdad llega a tu cuenta bancaria.',
 },
 {
 term: 'Retención (withholding)',
 definition:
 'El dinero que tu empleador saca de cada cheque y envía al gobierno de tu parte para cubrir tus impuestos sobre la renta.',
 },
 {
 term: 'FICA',
 definition:
 'El impuesto de la Ley Federal de Contribuciones al Seguro (Federal Insurance Contributions Act): 6.2% de tu paga para el Seguro Social más 1.45% para Medicare (7.65% en total). Tu empleador también paga un 7.65% igualado.',
 },
 {
 term: 'W-4',
 definition:
 'El formulario que llenas cuando empiezas un trabajo. Le dice a tu empleador cuánto impuesto federal sobre la renta debe retener de cada cheque.',
 },
 {
 term: 'Depósito directo (direct deposit)',
 definition:
 'Un pago electrónico que manda tu ingreso neto directo a tu cuenta bancaria el día de pago, sin cheque de papel y sin hacer fila.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'El recibo de pago de Tasha muestra un ingreso bruto de $500 y un ingreso neto de $432. ¿Qué número debería usar al planear sus gastos?',
 options: [
 '$500, eso es lo que ganó, así que eso es lo que puede gastar',
 '$432, el ingreso neto es el dinero que de verdad se lleva a casa',
 'El promedio de los dos, $466',
 'Ninguno, los números del recibo son solo estimaciones',
 ],
 answerIndex: 1,
 explanation:
 '¡Lo lograste! El ingreso neto es el único número que de verdad llega a su cuenta bancaria, así que es el único número que puede gastar. La diferencia de $68 se fue a impuestos y otras deducciones, presupuestar con el ingreso bruto es como la gente termina gastando de más sin querer.',
 },
 },
 {
   type: 'video',
   heading: 'Míralo: ¿A dónde se fue mi cheque?',
   body:
     'Mira este video corto de BFF sobre la diferencia entre lo que ganas y lo que llega a tu cuenta. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 'xNkc1us-WlY',
   source: 'BFF Classroom',
   questions: [
     {
       at: 43,
       question:
         'Ganaste $600 pero el depósito dice $478. ¿Cómo se llaman esos dos números?',
       options: [
         'Ingreso neto e ingreso bruto, en ese orden',
         'Ingreso bruto e ingreso neto, en ese orden',
         'Sueldo base y bono',
         'Ingreso gravable e ingreso libre de impuestos',
       ],
       answerIndex: 1,
       explanation:
         '$600 es el ingreso bruto, lo que ganaste. $478 es el ingreso neto, lo que te quedas. Todo lo que hay entre ambos está detallado en tu recibo de pago, y casi nadie lo lee.',
     },
     {
       at: 62,
       question:
         '¿Por qué el gobierno retiene impuestos de cada cheque en vez de cobrarte una vez al año?',
       options: [
         'Porque así pagas menos impuestos en total',
         'Para repartir el mismo impuesto en lugar de golpearte de una sola vez',
         'Porque es un castigo por trabajar por hora',
         'Porque tu empleador se queda con la diferencia',
       ],
       answerIndex: 1,
       explanation:
         'Pagas el mismo impuesto de cualquier forma. La retención solo toma una parte sobre la marcha, en vez de dejarte una factura enorme cada abril.',
     },
     {
       at: 88,
       question:
         '¿Para qué sirve FICA?',
       options: [
         'Solo para el seguro de desempleo',
         'Para el Seguro Social y Medicare',
         'Para las carreteras y escuelas de tu estado',
         'Para el plan de salud de tu empleador',
       ],
       answerIndex: 1,
       explanation:
         'Es el 7.65% de tu paga, repartido entre el Seguro Social y Medicare, y tu empleador aporta esa misma cantidad por ti. Financia a quienes están jubilados ahora, y algún día te financiará a ti.',
     },
     {
       at: 135,
       question:
         'Te retuvieron impuestos pero ganaste muy poco. ¿Qué deberías hacer?',
       options: [
         'Nada, ese dinero ya se perdió',
         'Declarar de todos modos, porque así es como suelen devolvértelo',
         'Pedirle el reembolso directamente a tu empleador',
         'Esperar a ganar más antes de declarar',
       ],
       answerIndex: 1,
       explanation:
         'Todo se resume en un W-2 al final del año. Si ganaste tan poco que no debías nada, declarar es la forma de recuperar lo que ya te retuvieron.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'FICA: tu boleto al Seguro Social y a Medicare',
 body:
 'Dos líneas de tu recibo, Seguro Social y Medicare, juntas forman el FICA. El Seguro Social toma el 6.2% de tu ingreso bruto y financia los cheques mensuales para jubilados y personas con discapacidad. Medicare toma el 1.45% y financia el seguro médico para personas de 65 años en adelante. Eso es 7.65% en total, y aquí está lo genial: tu empleador lo iguala, aportando otro 7.65% que nunca toca tu cheque. No estás perdiendo este dinero en un vacío, estás ganando créditos para beneficios que podrás usar dentro de décadas.',
 bullets: [
 'Seguro Social: 6.2% del ingreso bruto',
 'Medicare: 1.45% del ingreso bruto',
 'FICA combinado: 7.65% de ti + un 7.65% igualado de tu empleador',
 'A diferencia del impuesto sobre la renta, el FICA es una tasa fija, todos pagan el mismo porcentaje sobre sus salarios',
 ],
 },
 {
 type: 'example',
 heading: 'Ejemplo: el primer recibo de Jayden',
 body:
 'Jayden empaca comestibles por $14 la hora y trabajó 25 horas en dos semanas, así que su ingreso bruto es $350. Su recibo de pago muestra: Seguro Social -$21.70 (6.2% de $350), Medicare -$5.08 (1.45%), retención del impuesto federal sobre la renta -$11.00 e impuesto estatal sobre la renta -$7.00. Total de deducciones: $44.78. Ingreso neto: $305.22. Al principio Jayden pensó que le "faltaban" casi $45, pero línea por línea, cada dólar está justificado. También ve su columna de YTD (year-to-date, o acumulado del año), que llevará un total corrido durante todo el año.',
 },
 {
 type: 'content',
 heading: 'El W-4: el formulario que controla tu retención',
 body:
 'El primer día de cualquier trabajo, Recursos Humanos te da un Formulario W-4. No es un examen, es como le dices a tu empleador cuánto impuesto federal sobre la renta debe retener. Indica tu estado civil para efectos fiscales y responde unas preguntas, y la nómina hace las cuentas. Si eres estudiante con un solo trabajo de medio tiempo, la configuración estándar suele funcionar bien. Si reclamas muy poca retención podrías deber dinero en abril; si retienes de más lo recuperas como reembolso. Puedes actualizar tu W-4 en cualquier momento en que cambie tu situación, nuevo trabajo, segundo trabajo, un gran cambio en la vida.',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Marcus gana $200 brutos esta semana. ¿Aproximadamente cuánto le quitará el FICA (Seguro Social + Medicare) de su cheque?',
 options: [
 'Alrededor de $15.30, el 7.65% de $200',
 'Alrededor de $40. El FICA siempre es 20%',
 '$0, los adolescentes están exentos del FICA',
 'Alrededor de $62. Solo el Seguro Social es 31%',
 ],
 answerIndex: 0,
 explanation:
 '¡Lo tienes! El FICA es 6.2% para el Seguro Social ($12.40) más 1.45% para Medicare ($2.90), lo que suma 7.65%, alrededor de $15.30 en un cheque de $200. Y no, ser adolescente no te hace estar exento: si ganas un salario, pagas FICA.',
 },
 },
 {
 type: 'content',
 heading: 'Depósito directo: sáltate el papel',
 body:
 'La mayoría de los empleadores ofrecen depósito directo, tu ingreso neto llega electrónicamente a tu cuenta bancaria el día de pago. Sin cheque de papel que perder, sin viaje al banco, sin esperar a que un cheque se haga efectivo. Para configurarlo le darás a tu empleador el número de ruta (routing number) de tu banco y tu número de cuenta (ambos están en la app de tu banco o en un cheque). Consejo pro: algunos empleadores hasta te dejan dividir tu depósito, mandando una parte a la cuenta corriente y otra directo al ahorro, ahorro automático antes de que veas el dinero.',
 },
 {
 type: 'content',
 heading: 'Sé tu propio auditor: revisa cada recibo',
 body:
 'Los sistemas de nómina los manejan personas, y las personas cometen errores. Cada día de pago, tómate 60 segundos para auditar tu propio recibo. Si algo se ve raro, no te dé pena, pregúntale con amabilidad a tu jefe o al contacto de nómina que aparece en el recibo. Los errores suelen ser equivocaciones honestas, y se arreglan más rápido cuando los detectas a tiempo.',
 bullets: [
 'Revisa tus horas: ¿el recibo coincide con las horas que de verdad trabajaste?',
 'Revisa tu tarifa: ¿te pagaron la tarifa por hora que te prometieron?',
 'Revisa las horas extra: las horas después de 40 en una semana suelen pagarse 1.5x tu tarifa',
 'Revisa las cuentas: tarifa x horas debería ser igual a tu ingreso bruto',
 'Guarda tus recibos (o capturas de pantalla). Son tu prueba si alguna vez surge una disputa',
 ],
 },
 {
 type: 'content',
 heading: 'El W-2: tu boleta de calificaciones de fin de año',
 body:
 'Cada enero, tu empleador te envía un Formulario W-2, un resumen de todo tu año: total de salarios ganados y total de impuestos retenidos para el federal, el estatal y el FICA. ¡No lo confundas con el W-4! El W-4 es lo que TÚ llenas al ser contratado para fijar tu retención; el W-2 es lo que tu EMPLEADOR llena después de que termina el año. Usas el W-2 para presentar tu declaración de impuestos, y si te retuvieron de más durante el año, esa declaración es como recuperas tu reembolso. Guárdalo en un lugar seguro, la temporada de impuestos te lo agradecerá.',
 },
 ],
 quiz: [
 {
 question: 'Tu ingreso bruto es $600 pero tu cuenta bancaria solo muestra $521. ¿Qué pasó?',
 options: [
 'El banco te cobró una comisión de transferencia de $79',
 'Se retuvieron impuestos y otras deducciones antes de que se depositara tu ingreso neto',
 'Tu empleador cometió un error ilegal',
 'El depósito directo siempre pierde un porcentaje',
 ],
 answerIndex: 1,
 explanation:
 'La diferencia de $79 son tus deducciones: la retención del impuesto federal (y quizás estatal) sobre la renta más los impuestos FICA salieron de tu ingreso bruto antes de que se depositara el ingreso neto. Eso es totalmente normal, pero de todos modos deberías verificar las cuentas de tu recibo.',
 },
 {
 question: '¿Cuáles son las dos partes del FICA, y qué tasas pagas TÚ?',
 options: [
 'Impuesto federal al 10% e impuesto estatal al 5%',
 'Seguro Social al 6.2% y Medicare al 1.45%',
 'Seguro Social al 12.4% y Medicare al 2.9%',
 'Jubilación al 3% y seguro al 4%',
 ],
 answerIndex: 1,
 explanation:
 'El FICA es Seguro Social (6.2%) más Medicare (1.45%), que suman 7.65% de tus salarios brutos. Las cifras de 12.4% y 2.9% son los totales combinados solo después de que tu empleador agrega su parte igualada.',
 },
 {
 question: '¿Cuál es el propósito del formulario W-4 que llenas al empezar un trabajo?',
 options: [
 'Le dice a tu empleador cuánto impuesto federal sobre la renta debe retener de tus cheques',
 'Resume tus ganancias anuales totales para la declaración de impuestos',
 'Te inscribe en el depósito directo',
 'Comprueba que legalmente tienes permitido manejar al trabajo',
 ],
 answerIndex: 0,
 explanation:
 'El W-4 fija tu retención del impuesto federal sobre la renta. Llénalo cuando te contraten, y actualízalo cada vez que cambie tu situación. El formulario que resume tus ganancias anuales es el W-2, que llega cada enero.',
 },
 {
 question: 'En enero, tu empleador te envía un W-2. ¿Para qué sirve?',
 options: [
 'Es una factura por impuestos que todavía debes',
 'Es un cupón para software de preparación de impuestos',
 'Resume tu año de salarios e impuestos retenidos para que puedas presentar tu declaración de impuestos',
 'Reinicia tu retención para el año nuevo',
 ],
 answerIndex: 2,
 explanation:
 'El W-2 reporta tus salarios totales y todo lo retenido, federal, estatal y FICA, de todo el año. Usas esos números para presentar tu declaración de impuestos, que también es como reclamas un reembolso si te retuvieron de más.',
 },
 {
 question: '¿Cuál de estos es un beneficio del depósito directo?',
 options: [
 'Se deposita tu ingreso bruto en lugar de tu ingreso neto',
 'Te saltas el pago de los impuestos FICA',
 'Tu empleador te paga un bono por usarlo',
 'Tu paga llega electrónicamente el día de pago, sin cheque de papel que perder ni efectivo',
 ],
 answerIndex: 3,
 explanation:
 'El depósito directo manda tu ingreso neto directo a tu cuenta bancaria de forma electrónica, así que no hay cheque que perder, depositar ni esperar. No cambia lo que te pagan ni los impuestos que debes, solo cómo viaja el dinero.',
 },
 {
 question:
 'Nia trabajó 22 horas a $15/hora, pero su recibo muestra un ingreso bruto de $255 en lugar de $330. ¿Qué debería hacer?',
 options: [
 'Nada, los $75 que faltan probablemente sean solo impuestos',
 'Renunciar de inmediato',
 'Comparar el recibo con su propio registro de horas y luego pedirle con amabilidad a su jefe o a nómina que corrija el error',
 'Publicar el recibo de pago en línea para advertir a los demás',
 ],
 answerIndex: 2,
 explanation:
 'Los impuestos salen DESPUÉS de calcular el ingreso bruto, así que un número bruto equivocado significa que se ingresaron mal las horas o la tarifa. Revisar tarifa x horas (22 x $15 = $330) y señalarlo con calma a nómina es exactamente como lo manejan los expertos, y por qué siempre revisas tu recibo.',
 },
 ],
 },
 zh: {
 title: '你的第一份工资',
 description:
 '破解你人生第一张工资单的密码：每一块钱都去了哪里、为什么这个数字比你预期的要少，以及如何像行家一样揪出错误。',
 sections: [
 {
 type: 'intro',
 heading: '发工资啦！……等等，我的钱去哪儿了？',
 body:
 '它终于来了，你的第一份工资！你努力工作，在脑子里算好了账，然后……这个数字比你预期的要少。别慌，也别以为有人抢了你的钱。今天你将学会逐行阅读一张工资单、理解每一项扣款，并确切地知道每一块钱去了哪里。等学完之后，那张让人一头雾水的纸片读起来就会像一本漫画书一样简单。',
 },
 {
 type: 'content',
 heading: '两大主角：税前工资 vs. 税后工资',
 body:
 '每一张工资单都在讲一个有两个主角的故事。税前工资（gross pay）是在扣除任何东西之前你赚到的全部，工作时长乘以你的时薪，加上任何由你雇主通过工资系统发放的加班费或小费。税后工资（net pay）是扣款之后真正进到你口袋里的钱。两者之间的差额不是错误，而是税款和其他代扣项在发挥作用。',
 bullets: [
 '税前工资 = 你的工时 x 你的时薪（加上加班费、奖金或通过工资系统发放的小费）',
 '税后工资 = 税前工资减去所有扣款，你真正能带回家的钱',
 '用你的税后工资来做预算，永远不要用税前，税前是一个你实际上从来碰不到的数字',
 ],
 },
 {
 type: 'content',
 heading: '所得税代扣：边赚边缴',
 body:
 '你支票里通常缺失的最大一块是所得税代扣。你的雇主不会让你每年四月给政府一笔巨额付款，而是从你每张工资里代扣一点，替你上缴，联邦所得税缴给美国政府，如果你所在的州有州所得税，还有州所得税（有些州，比如 Texas 和 Florida，就没有！）。把它想成是一整年里用一笔笔小额分期来缴纳你的税单。如果代扣得太多，之后你会以退税的形式拿回来。',
 },
 {
 type: 'terms',
 heading: '工资单词汇',
 terms: [
 {
 term: '税前工资（gross pay）',
 definition:
 '在任何扣款之前，你在一个发薪周期内赚到的总金额，工资单上最大的那个数字。',
 },
 {
 term: '税后工资（net pay）',
 definition:
 '扣除所有税款和扣款之后你能带回家的工资。这才是真正到达你银行账户的钱。',
 },
 {
 term: '代扣（withholding）',
 definition:
 '你的雇主从你每张工资里扣出、并代你上缴给政府用于缴纳你所得税的钱。',
 },
 {
 term: 'FICA',
 definition:
 '联邦保险贡献法案（Federal Insurance Contributions Act）税，你工资的 6.2% 用于社会保障（Social Security），加上 1.45% 用于医疗保险（Medicare），共计 7.65%。你的雇主也会缴纳与之相等的 7.65%。',
 },
 {
 term: 'W-4',
 definition:
 '你开始一份工作时填写的表格。它告诉你的雇主要从你每张工资里代扣多少联邦所得税。',
 },
 {
 term: '直接存款（direct deposit）',
 definition:
 '一种在发薪日把你的税后工资直接打进你银行账户的电子付款，没有纸质支票，也不用排队。',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Tasha 的工资单显示税前工资 $500，税后工资 $432。她在规划开销时应该用哪个数字？',
 options: [
 '$500，那是她赚到的，所以那就是她能花的',
 '$432，税后工资才是她真正带回家的钱',
 '两者的平均值，$466',
 '都不用，工资单上的数字只是估算',
 ],
 answerIndex: 1,
 explanation:
 '税后工资是唯一真正进到她银行账户的数字，所以它是唯一她能花的数字。那 $68 的差额进了税款和其他扣款，用税前工资做预算，正是人们不小心超支的原因。',
 },
 },
 {
   type: 'video',
   heading: '观看：我的工资去哪了？',
   body:
     '看看这个 BFF 短视频，弄清你赚到的钱和真正到账的钱之间差在哪里。注意，视频中途会暂停提问，认真看哦！',
   videoId: 'xNkc1us-WlY',
   source: 'BFF Classroom',
   questions: [
     {
       at: 43,
       question:
         '你赚了 $600，但到账只有 $478。这两个数字分别叫什么？',
       options: [
         '先是净工资，后是税前工资',
         '先是税前工资（gross），后是净工资（net）',
         '底薪和奖金',
         '应税收入和免税收入',
       ],
       answerIndex: 1,
       explanation:
         '$600 是税前工资，也就是你赚到的；$478 是净工资，也就是你留下的。两者之间的差额都逐项列在工资单上，而大多数人从来不看。',
     },
     {
       at: 62,
       question:
         '政府为什么从每次工资里扣税，而不是一年收一次？',
       options: [
         '因为这样总共少交税',
         '为了把同样的税分摊开，而不是一次把你压垮',
         '因为这是对按小时计酬的惩罚',
         '因为雇主可以留下差额',
       ],
       answerIndex: 1,
       explanation:
         '不管哪种方式，你交的税是一样的。预扣只是边赚边扣一点，免得每年四月被一张巨额账单砸中。',
     },
     {
       at: 88,
       question:
         'FICA 是用来支付什么的？',
       options: [
         '只支付失业救济',
         '支付社会保障金和医疗保险（Medicare）',
         '支付本州的道路和学校',
         '支付雇主的健康保险计划',
       ],
       answerIndex: 1,
       explanation:
         '它占你工资的 7.65%，分给社会保障金和 Medicare，而且你的雇主还会以你的名义再交一份同样的钱。它供养现在已经退休的人，将来也会供养你。',
     },
     {
       at: 135,
       question:
         '你被扣了税，但赚得很少。应该怎么做？',
       options: [
         '什么都不用做，钱回不来了',
         '还是去报税，这通常正是把钱要回来的方式',
         '直接找雇主退钱',
         '等赚得多一些再报税',
       ],
       answerIndex: 1,
       explanation:
         '年底所有信息都会汇总在 W-2 上。如果你赚得少到本来就不用交税，报税就是把已经被预扣的钱要回来的途径。',
     },
   ],
 },

 {
 type: 'content',
 heading: 'FICA：你通往社会保障和医疗保险的门票',
 body:
 '你工资单上的两行，社会保障和医疗保险，合在一起构成了 FICA。社会保障拿走你税前工资的 6.2%，用于给退休人员和残障人士发放每月的支票。医疗保险拿走 1.45%，用于为 65 岁及以上的人提供医疗保险。合计是 7.65%，而酷的地方在于：你的雇主会与之相配，再额外投入 7.65%，这部分从来不碰你的工资。你并不是把这笔钱丢进了无底洞，你是在赚取积分，换取几十年后你能用上的福利。',
 bullets: [
 '社会保障：税前工资的 6.2%',
 '医疗保险：税前工资的 1.45%',
 'FICA 合计：你出 7.65% + 你雇主相配的 7.65%',
 '与所得税不同，FICA 是统一税率，每个人对自己的工资都缴纳相同的百分比',
 ],
 },
 {
 type: 'example',
 heading: '示例：Jayden 的第一张工资单',
 body:
 'Jayden 以每小时 $14 的时薪帮忙装袋杂货，两周内工作了 25 小时，所以他的税前工资是 $350。他的工资单显示：社会保障 -$21.70（$350 的 6.2%）、医疗保险 -$5.08（1.45%）、联邦所得税代扣 -$11.00，以及州所得税 -$7.00。扣款合计：$44.78。税后工资：$305.22。起初 Jayden 以为自己"丢"了差不多 $45，但逐行来看，每一块钱都有交代。他还发现了自己的 YTD（year-to-date，年初至今）那一列，它会在一整年里保持一个累计总额。',
 },
 {
 type: 'content',
 heading: 'W-4：控制你代扣额的那张表',
 body:
 '任何工作的第一天，HR 都会递给你一张 W-4 表格。它不是考试，它是你告诉雇主要代扣多少联邦所得税的方式。列出你的报税身份并回答几个问题，工资部门就会把账算好。如果你是只有一份兼职工作的学生，标准设置通常就够用了。如果你申报的代扣太少，四月你可能要补缴；如果代扣多了，你会以退税的形式拿回来。只要你的情况发生变化，新工作、第二份工作、人生重大变化，你随时可以更新你的 W-4。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Marcus 这周赚了 $200 的税前工资。FICA（社会保障 + 医疗保险）大约会从他的支票里扣掉多少？',
 options: [
 '大约 $15.30，$200 的 7.65%',
 '大约 $40，FICA 一直都是 20%',
 '$0，青少年免缴 FICA',
 '大约 $62，光社会保障就是 31%',
 ],
 answerIndex: 0,
 explanation:
 'FICA 是社会保障的 6.2%（$12.40）加上医疗保险的 1.45%（$2.90），合计 7.65%，在一张 $200 的支票上大约是 $15.30。而且不，作为青少年并不能让你免缴：只要你赚工资，你就得缴 FICA。',
 },
 },
 {
 type: 'content',
 heading: '直接存款：跳过纸质环节',
 body:
 '大多数雇主都提供直接存款，你的税后工资会在发薪日电子化地"嗖"地一下进到你的银行账户。没有纸质支票会弄丢，不用跑一趟银行，也不用等支票兑现。要设置它，你得把你银行的路由号（routing number）和你的账号给你的雇主（两者都能在你银行的 App 或一张支票上找到）。专业提示：有些雇主甚至让你把存款拆分，一部分打进活期账户，一部分直接进储蓄账户，在你还没见到钱之前就自动储蓄了。',
 },
 {
 type: 'content',
 heading: '做你自己的审计员：检查每一张工资单',
 body:
 '工资系统是由人来运行的，而人会犯错。每个发薪日，花 60 秒审计一下你自己的工资单。如果有什么看起来不对劲，别不好意思，礼貌地问问你的经理，或者工资单上列出的工资联系人。错误通常都是无心之失，而且越早被你发现，就能越快得到修正。',
 bullets: [
 '检查你的工时：工资单和你实际工作的时长对得上吗？',
 '检查你的时薪：付给你的是当初承诺的时薪吗？',
 '检查加班：一周内超过 40 小时的部分通常按 1.5 倍时薪支付',
 '检查算术：时薪 x 工时应该等于你的税前工资',
 '保留好你的工资单（或截图），万一将来出现纠纷，它们就是你的证据',
 ],
 },
 {
 type: 'content',
 heading: 'W-2：你的年终成绩单',
 body:
 '每年一月，你的雇主都会给你寄一张 W-2 表格，它是你整整一年的汇总：赚到的总工资，以及联邦、州和 FICA 代扣的税款总额。别把它和 W-4 弄混了！W-4 是入职时由你来填、用来设定代扣额的；W-2 是年末之后由你雇主来填的。你用 W-2 来报税，如果这一年里代扣得太多，这份报税单就是你拿回退税的方式。把它归档存放到安全的地方，报税季会感谢你的。',
 },
 ],
 quiz: [
 {
 question: '你的税前工资是 $600，但你的银行账户只显示 $521。发生了什么？',
 options: [
 '银行向你收了 $79 的转账手续费',
 '在你的税后工资被存入之前，税款和其他扣款被代扣了',
 '你的雇主犯了一个违法的错误',
 '直接存款总会损失一定百分比',
 ],
 answerIndex: 1,
 explanation:
 '那 $79 的差额就是你的扣款：联邦（也可能有州）所得税代扣加上 FICA 税，在税后工资被存入之前从你的税前工资里扣掉了。这完全正常，但你仍然应该核对一下工资单上的算术！',
 },
 {
 question: 'FICA 的两个部分是什么，以及你自己缴纳的税率是多少？',
 options: [
 '联邦税 10% 和州税 5%',
 '社会保障 6.2% 和医疗保险 1.45%',
 '社会保障 12.4% 和医疗保险 2.9%',
 '退休 3% 和保险 4%',
 ],
 answerIndex: 1,
 explanation:
 'FICA 是社会保障（6.2%）加上医疗保险（1.45%），合计为你税前工资的 7.65%。12.4% 和 2.9% 这两个数字是只有在你雇主加上其相配的那一份之后的合计总额。',
 },
 {
 question: '你开始一份工作时填写的 W-4 表格有什么用途？',
 options: [
 '它告诉你的雇主要从你的工资里代扣多少联邦所得税',
 '它汇总你的全年总收入以供报税',
 '它帮你注册直接存款',
 '它证明你在法律上被允许开车去上班',
 ],
 answerIndex: 0,
 explanation:
 'W-4 设定你的联邦所得税代扣额。入职时填好它，并在你的情况发生变化时随时更新。汇总你全年收入的那张表是 W-2，它每年一月寄来。',
 },
 {
 question: '一月里，你的雇主给你寄来一张 W-2。它是做什么用的？',
 options: [
 '它是一张你还欠税款的账单',
 '它是一张报税软件的优惠券',
 '它汇总你一年的工资和代扣税款，好让你申报纳税',
 '它为新的一年重置你的代扣额',
 ],
 answerIndex: 2,
 explanation:
 'W-2 报告你全年的总工资和所有代扣的部分，联邦、州和 FICA。你用这些数字来报税，如果代扣得太多，报税也是你申领退税的方式。',
 },
 {
 question: '以下哪一项是直接存款的好处？',
 options: [
 '存入的是你的税前工资而不是税后工资',
 '你可以免缴 FICA 税',
 '你的雇主会因为你使用它而付给你一笔奖金',
 '你的工资在发薪日电子化地到账，没有纸质支票会弄丢，也没有现金',
 ],
 answerIndex: 3,
 explanation:
 '直接存款把你的税后工资以电子方式直接送到你的银行账户，所以没有支票会弄丢、要去存、或要等着兑现。它不会改变你的薪水或你要缴的税，只改变钱的传递方式。',
 },
 {
 question:
 'Nia 以每小时 $15 工作了 22 小时，但她的工资单显示税前工资是 $255 而不是 $330。她应该怎么做？',
 options: [
 '什么都不做，少的那 $75 大概只是税款',
 '立刻辞职',
 '把工资单和她自己的工时记录对比一下，然后礼貌地请她的经理或工资部门修正错误',
 '把工资单发到网上警告别人',
 ],
 answerIndex: 2,
 explanation:
 '税款是在税前工资算好之后才扣的，所以税前数字错了就意味着工时或时薪录入有误。核对时薪 x 工时（22 x $15 = $330）并冷静地向工资部门指出，正是行家的处理方式，也是你为什么总要检查工资单的原因。',
 },
 ],
 },
}

export default lesson
