import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'taxes-deep-dive',
 week: 5,
 day: 2,
 title: 'Taxes Deep-Dive',
 icon: 'landmark',
 description:
 'Bust the biggest tax myths, decode how brackets really work, and find out exactly what all that withheld money builds. Spoiler: raises are always worth taking.',
 durationMin: 15,
 sections: [
 {
 type: 'intro',
 heading: 'Taxes: The Subscription Fee for Society',
 body:
 "Nobody throws a party when taxes come up, but here's a reframe: taxes are like a group subscription that 330 million people split to run a country. The road to school, the firefighters down the street, the GPS satellites your phone uses, all tax-funded. Today we'll dig into why taxes exist, the different kinds you'll pay, and how tax brackets ACTUALLY work, including busting the most stubborn money myth in America.",
 },
 {
 type: 'content',
 heading: 'What Do Taxes Actually Buy?',
 body:
 'Governments do not have their own money. They have OUR money, pooled together. Federal, state, and local governments each collect taxes and spend them on different things. When you see a deduction on your paystub, this is where it goes.',
 bullets: [
 'Federal: Social Security and Medicare, national defense, highways, scientific research, national parks',
 'State: public universities, state roads, police, health programs',
 'Local: public schools, libraries, parks, firefighters, trash pickup',
 'Fun one: public school spending often works out to more than $15,000 per student per year. Your education is one of the biggest things taxes buy',
 ],
 },
 {
 type: 'content',
 heading: 'The Tax Family: Four Kinds You Will Meet',
 body:
 "Income tax is the famous one, but it has siblings you'll bump into constantly. Sales tax gets added at the register when you buy stuff, a $60 hoodie with 7% sales tax actually costs $64.20. Property tax is paid yearly by people who own homes and land, and it mostly funds local schools. Payroll taxes are the FICA deductions from your paycheck that fund Social Security and Medicare. And income tax is charged on the money you earn, at both the federal level and in most states.",
 bullets: [
 'Sales tax: paid when you buy things (rates vary by state and city)',
 'Property tax: paid by property owners, funds local schools and services',
 'Payroll tax (FICA): flat percentage from every paycheck for Social Security and Medicare',
 'Income tax: charged on earnings, and the federal version is progressive. Higher incomes pay higher rates',
 ],
 },
 {
 type: 'terms',
 heading: 'Tax Talk: Key Terms',
 terms: [
 {
 term: 'Progressive tax',
 definition:
 'A tax where the rate increases as income increases. Higher earners pay a larger percentage. The U.S. federal income tax is progressive.',
 },
 {
 term: 'Tax bracket',
 definition:
 'A range of income taxed at a specific rate. Your income fills up brackets in order, like water filling a stack of buckets.',
 },
 {
 term: 'Marginal tax rate',
 definition:
 'The rate you pay on your NEXT dollar of income, only the dollars inside a bracket get taxed at that bracket’s rate, not your whole income.',
 },
 {
 term: 'Standard deduction',
 definition:
 'An amount of income (around $15,000 for a single filer) that the federal government does not tax at all. Most people subtract it automatically when filing.',
 },
 {
 term: 'Tax return',
 definition:
 'The form (usually a 1040) you file each spring reporting what you earned and calculating the tax you truly owe for the year.',
 },
 {
 term: 'Refund',
 definition:
 'Money the government sends back to you when your paycheck withholding added up to more than you actually owed. It was your money all along!',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'You buy $80 of sneakers and the register charges you $85.60. Which type of tax just happened?',
 options: [
 'Payroll tax',
 'Property tax',
 'Sales tax',
 'Federal income tax',
 ],
 answerIndex: 2,
 explanation:
 'Sales tax is added at the register when you buy things. Here it was 7%: $80 x 0.07 = $5.60 extra. Payroll tax comes out of paychecks, property tax is for real estate, and income tax is charged on money you earn.',
 },
 },
 {
   type: 'video',
   heading: 'Watch: How Tax Brackets Really Work',
   body:
     'Watch this quick BFF video on where taxes go and why a raise never leaves you with less. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 'Uat5nnzQgP8',
   source: 'BFF Classroom',
   questions: [
     {
       at: 47,
       question:
         'Which of these is paid for with taxes?',
       options: [
         'Only the military',
         'Roads, public schools, firefighters and food safety inspections',
         'Only programs for people who are retired',
         'Nothing you use day to day',
       ],
       answerIndex: 1,
       explanation:
         "Alvin's list includes roads, public schools, firefighters, food safety inspections, the military, and the bridges you drive over without thinking about it. You can argue about the amount, but you cannot really opt out of the list.",
     },
     {
       at: 70,
       question:
         'In a progressive tax system, what does a higher bracket actually tax?',
       options: [
         'All of your income, at the higher rate',
         'Only the dollars that fall inside that bracket',
         'Your income from the previous year',
         'Everything above your savings',
       ],
       answerIndex: 1,
       explanation:
         'This is the part everyone misses. The higher rate applies only to the dollars inside that bracket, which is why earning one more dollar can never leave you with less money overall.',
     },
     {
       at: 125,
       question:
         'You paid $5,180 on $45,000 of income. What is your effective rate?',
       options: [
         'About 12%, the same as your bracket',
         'About 11.5%, lower than your bracket',
         'About 10%, the lowest bracket',
         'About 24%, double your bracket',
       ],
       answerIndex: 1,
       explanation:
         'Your marginal rate is the rate on your next dollar, which is 12% here. Your effective rate is what you actually paid across all your income, about 11.5%, and it is always lower.',
     },
     {
       at: 150,
       question:
         'Your summer job withheld tax but you owe nothing. What should you do?',
       options: [
         'Nothing, since you do not have to file',
         'File anyway, because that is often free money waiting with the IRS',
         'Ask your employer to reverse it',
         'Carry it forward to next year',
       ],
       answerIndex: 1,
       explanation:
         'The standard deduction means a chunk of income is not taxed at all, so many students owe nothing. If your employer withheld some anyway, filing a return is how you get it back.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'How Tax Brackets REALLY Work',
 body:
 "Federal income tax is progressive, and brackets work like a stack of buckets. Picture pouring your income in from the top: the first bucket fills at a low rate, and only the overflow spills into the next bucket at a higher rate. Each rate applies ONLY to the dollars inside that bucket, never to your whole income. That per-bucket rate is called your marginal rate, and this one idea protects you from the most common tax myth out there.",
 },
 {
 type: 'example',
 heading: "Example: Zoe's Buckets",
 body:
 "Imagine a simple system with two brackets: 10% on your first $10,000 of income, and 20% on everything above that. Zoe earns $12,000 from her part-time job this year. Myth-thinking says she's 'in the 20% bracket' so she owes 20% of $12,000 = $2,400. Wrong! Here's the real math: her first $10,000 is taxed at 10% ($1,000), and only the $2,000 above the line is taxed at 20% ($400). Total: $1,400, an overall rate of less than 12%, even though her top marginal rate is 20%. The buckets always work in her favor.",
 },
 {
 type: 'content',
 heading: 'Myth-Buster: "A Raise Can Lower Your Take-Home!"',
 body:
 "You will hear an adult say it someday: 'I can't take that raise, it'll bump me into a higher bracket and I'll take home LESS.' This is mathematically impossible under the bracket system. Moving into a higher bracket only changes the rate on the NEW dollars above the line, every dollar you already earned keeps its old, lower rate. If Zoe gets a raise from $12,000 to $13,000, only that new $1,000 is taxed at 20%; she keeps $800 of it. Earning more money ALWAYS means taking home more money. Say it loud.",
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 "Devin's raise pushes his income from the 12% bracket into the 22% bracket. What happens to his take-home pay?",
 options: [
 'It goes down. His whole income is now taxed at 22%',
 'It goes up, only the dollars above the bracket line are taxed at 22%',
 'It stays exactly the same',
 'He must refuse the raise to avoid a penalty',
 ],
 answerIndex: 1,
 explanation:
 'You crushed the myth! Only the new dollars above the bracket threshold get taxed at 22%. Everything below keeps its lower rates. His take-home pay definitely rises. A raise can never shrink your after-tax income under the bracket system.',
 },
 },
 {
 type: 'content',
 heading: 'Filing a Return (and Scoring a Refund)',
 body:
 "Each spring, the deadline is usually April 15, people file a tax return, a form that adds up what you truly owed for last year and compares it to what your paychecks already withheld. Withheld too much? The government sends the difference back as a refund. Withheld too little? You pay the gap. For teens with part-time jobs, filing is often quick, free, and genuinely worth it: if you earned under the standard deduction, you likely owe $0 in federal income tax, and filing is the only way to get your withheld money back. That's real cash people leave on the table every year!",
 },
 {
 type: 'content',
 heading: 'The Standard Deduction: Your Free Pass',
 body:
 'Before any brackets kick in, the standard deduction shields a chunk of your income from federal income tax entirely, around $15,000 for a single filer. Earn $6,000 at a summer job? That is fully under the shield, so your federal income tax is $0, and any federal income tax that was withheld comes back to you when you file. (Heads up: FICA is different, Social Security and Medicare taxes apply from your very first dollar of wages and do not get refunded.)',
 bullets: [
 'Around $15,000 of income is federally income-tax-free for a single filer',
 'Most teen part-time earnings fall entirely under the standard deduction',
 'Filing a return is how you reclaim over-withheld income tax',
 'FICA (7.65%) still applies to all wages. The standard deduction does not block it',
 ],
 },
 ],
 quiz: [
 {
 question: 'Which of these is something your tax dollars pay for?',
 options: [
 'Public schools, roads, and firefighters',
 'Private company stock dividends',
 'Celebrity endorsement deals',
 'Your personal savings account interest',
 ],
 answerIndex: 0,
 explanation:
 'Taxes fund shared public goods and services: schools, roads, parks, defense, firefighters, Social Security, Medicare, and much more. They are the pooled money that runs federal, state, and local government.',
 },
 {
 question:
 'In a system with 10% on the first $10,000 and 20% above that, how much tax does someone earning $15,000 owe?',
 options: [
 '$3,000, 20% of the whole $15,000',
 '$1,500, a flat 10% of everything',
 '$2,000, 10% plus 20% split evenly',
 '$2,000, $1,000 on the first bucket plus $1,000 on the $5,000 above the line',
 ],
 answerIndex: 3,
 explanation:
 'Brackets work like buckets: the first $10,000 is taxed at 10% ($1,000), and only the $5,000 above the line is taxed at 20% ($1,000), for $2,000 total. The 20% rate never touches the income in the lower bucket.',
 },
 {
 question: 'Which tax is paid by homeowners and mostly funds local public schools?',
 options: ['Sales tax', 'Property tax', 'Payroll tax', 'Federal income tax'],
 answerIndex: 1,
 explanation:
 'Property tax is charged yearly on homes and land, and it is the backbone of local budgets, especially public schools, along with libraries, parks, and fire departments.',
 },
 {
 question: 'What are payroll taxes?',
 options: [
 'Taxes stores pay to print receipts',
 'A fee for using direct deposit',
 'The FICA deductions from paychecks that fund Social Security and Medicare',
 'Taxes only self-employed people pay',
 ],
 answerIndex: 2,
 explanation:
 'Payroll taxes are the FICA deductions, 6.2% for Social Security and 1.45% for Medicare, taken from wages to fund those programs. Employers pay a matching share on top.',
 },
 {
 question: 'You get a $350 tax refund in the spring. What does that actually mean?',
 options: [
 'The government paid you a bonus for filing early',
 'Your withholding during the year added up to $350 more than you actually owed',
 'You won a tax lottery',
 'You underpaid and now owe interest',
 ],
 answerIndex: 1,
 explanation:
 'A refund is your own money coming back: your paychecks withheld more than your true tax bill, and filing a return is how the government settles up and returns the extra $350.',
 },
 {
 question:
 'Leo earned $5,500 at his summer job, and $200 of federal income tax was withheld. With a standard deduction around $15,000, what should he expect if he files a return?',
 options: [
 'He owes more tax because he is a student',
 'Nothing changes whether he files or not',
 'He gets the $200 back, since his income is fully under the standard deduction',
 'He gets his FICA taxes refunded too',
 ],
 answerIndex: 2,
 explanation:
 'His $5,500 sits entirely under the standard deduction, so his federal income tax bill is $0. Filing returns the $200 that was withheld. FICA is the exception: Social Security and Medicare taxes apply to all wages and are not refunded.',
 },
 ],
 es: {
 title: 'Los impuestos a fondo',
 description:
 'Derriba los mayores mitos sobre los impuestos, descifra cómo funcionan de verdad los tramos y descubre qué construye exactamente todo ese dinero retenido, spoiler: siempre vale la pena aceptar un aumento.',
 sections: [
 {
 type: 'intro',
 heading: 'Los impuestos: la cuota de suscripción de la sociedad',
 body:
 'Nadie hace una fiesta cuando salen a tema los impuestos, pero aquí va otra forma de verlo: los impuestos son como una suscripción grupal que 330 millones de personas se reparten para hacer funcionar un país. El camino a la escuela, los bomberos de tu cuadra, los satélites de GPS que usa tu teléfono, todo se financia con impuestos. Hoy vamos a profundizar en por qué existen los impuestos, los distintos tipos que pagarás y cómo funcionan DE VERDAD los tramos de impuestos, incluyendo derribar el mito sobre el dinero más terco de Estados Unidos.',
 },
 {
 type: 'content',
 heading: '¿Qué compran realmente los impuestos?',
 body:
 'Los gobiernos no tienen su propio dinero. Tienen NUESTRO dinero, juntado en un solo fondo. Los gobiernos federal, estatal y local recaudan impuestos cada uno y los gastan en cosas distintas. Cuando ves una deducción en tu recibo de pago, aquí es a donde va.',
 bullets: [
 'Federal: Seguro Social y Medicare, defensa nacional, autopistas, investigación científica, parques nacionales',
 'Estatal: universidades públicas, carreteras estatales, policía, programas de salud',
 'Local: escuelas públicas, bibliotecas, parques, bomberos, recolección de basura',
 'Dato curioso: el gasto en escuelas públicas suele salir en más de $15,000 por estudiante al año. Tu educación es una de las cosas más grandes que compran los impuestos',
 ],
 },
 {
 type: 'content',
 heading: 'La familia de los impuestos: cuatro tipos que conocerás',
 body:
 'El impuesto sobre la renta es el famoso, pero tiene hermanos con los que te toparás a cada rato. El impuesto sobre las ventas (sales tax) se suma en la caja cuando compras cosas, una sudadera de $60 con 7% de impuesto sobre las ventas en realidad cuesta $64.20. El impuesto predial (property tax) lo pagan cada año las personas que son dueñas de casas y terrenos, y financia principalmente las escuelas locales. Los impuestos sobre la nómina (payroll taxes) son las deducciones de FICA de tu cheque que financian el Seguro Social y Medicare. Y el impuesto sobre la renta se cobra sobre el dinero que ganas, tanto a nivel federal como en la mayoría de los estados.',
 bullets: [
 'Impuesto sobre las ventas: se paga al comprar cosas (las tasas varían según el estado y la ciudad)',
 'Impuesto predial: lo pagan los dueños de propiedades, financia escuelas y servicios locales',
 'Impuesto sobre la nómina (FICA): porcentaje fijo de cada cheque para el Seguro Social y Medicare',
 'Impuesto sobre la renta: se cobra sobre las ganancias, y la versión federal es progresiva, los ingresos más altos pagan tasas más altas',
 ],
 },
 {
 type: 'terms',
 heading: 'Hablemos de impuestos: términos clave',
 terms: [
 {
 term: 'Impuesto progresivo (progressive tax)',
 definition:
 'Un impuesto en el que la tasa aumenta a medida que aumenta el ingreso, quienes ganan más pagan un porcentaje mayor. El impuesto federal sobre la renta de EE. UU. es progresivo.',
 },
 {
 term: 'Tramo de impuestos (tax bracket)',
 definition:
 'Un rango de ingreso gravado a una tasa específica. Tu ingreso llena los tramos en orden, como agua llenando una pila de cubetas.',
 },
 {
 term: 'Tasa impositiva marginal (marginal tax rate)',
 definition:
 'La tasa que pagas sobre tu SIGUIENTE dólar de ingreso, solo los dólares dentro de un tramo se gravan a la tasa de ese tramo, no todo tu ingreso.',
 },
 {
 term: 'Deducción estándar (standard deduction)',
 definition:
 'Una cantidad de ingreso (alrededor de $15,000 para quien declara solo) que el gobierno federal no grava en absoluto. La mayoría de la gente la resta automáticamente al declarar.',
 },
 {
 term: 'Declaración de impuestos (tax return)',
 definition:
 'El formulario (por lo general un 1040) que presentas cada primavera reportando lo que ganaste y calculando el impuesto que de verdad debes por el año.',
 },
 {
 term: 'Reembolso (refund)',
 definition:
 'El dinero que el gobierno te devuelve cuando la retención de tu cheque sumó más de lo que en realidad debías. ¡Era tu dinero desde el principio!',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Compras $80 de tenis y la caja te cobra $85.60. ¿Qué tipo de impuesto acaba de pasar?',
 options: [
 'Impuesto sobre la nómina',
 'Impuesto predial',
 'Impuesto sobre las ventas',
 'Impuesto federal sobre la renta',
 ],
 answerIndex: 2,
 explanation:
 'El impuesto sobre las ventas se suma en la caja cuando compras cosas. Aquí fue 7%: $80 x 0.07 = $5.60 extra. El impuesto sobre la nómina sale de los cheques, el impuesto predial es para los bienes raíces y el impuesto sobre la renta se cobra sobre el dinero que ganas.',
 },
 },
 {
   type: 'video',
   heading: 'Míralo: Cómo funcionan de verdad los tramos fiscales',
   body:
     'Mira este video corto de BFF sobre a dónde van los impuestos y por qué un aumento nunca te deja con menos. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 'Uat5nnzQgP8',
   source: 'BFF Classroom',
   questions: [
     {
       at: 47,
       question:
         '¿Cuál de estas cosas se paga con impuestos?',
       options: [
         'Solo el ejército',
         'Carreteras, escuelas públicas, bomberos e inspecciones de seguridad alimentaria',
         'Solo programas para personas jubiladas',
         'Nada que uses en tu día a día',
       ],
       answerIndex: 1,
       explanation:
         'La lista de Alvin incluye carreteras, escuelas públicas, bomberos, inspecciones de seguridad alimentaria, el ejército y los puentes por los que pasas sin pensarlo. Puedes discutir el monto, pero no puedes salirte de la lista.',
     },
     {
       at: 70,
       question:
         'En un sistema progresivo, ¿sobre qué aplica realmente un tramo más alto?',
       options: [
         'Sobre todo tu ingreso, a la tasa más alta',
         'Solo sobre los dólares que caen dentro de ese tramo',
         'Sobre el ingreso del año anterior',
         'Sobre todo lo que supere tus ahorros',
       ],
       answerIndex: 1,
       explanation:
         'Esta es la parte que casi todos pasan por alto. La tasa más alta aplica solo a los dólares dentro de ese tramo, por eso ganar un dólar más nunca puede dejarte con menos dinero en total.',
     },
     {
       at: 125,
       question:
         'Pagaste $5,180 sobre $45,000 de ingreso. ¿Cuál es tu tasa efectiva?',
       options: [
         'Cerca del 12%, igual que tu tramo',
         'Cerca del 11.5%, más baja que tu tramo',
         'Cerca del 10%, el tramo más bajo',
         'Cerca del 24%, el doble de tu tramo',
       ],
       answerIndex: 1,
       explanation:
         'Tu tasa marginal es la del siguiente dólar, aquí 12%. Tu tasa efectiva es lo que realmente pagaste sobre todo tu ingreso, cerca del 11.5%, y siempre es más baja.',
     },
     {
       at: 150,
       question:
         'Tu trabajo de verano retuvo impuestos pero no debes nada. ¿Qué deberías hacer?',
       options: [
         'Nada, porque no estás obligado a declarar',
         'Declarar de todos modos, porque suele ser dinero gratis esperándote en el IRS',
         'Pedirle a tu empleador que lo revierta',
         'Guardarlo para el año siguiente',
       ],
       answerIndex: 1,
       explanation:
         'La deducción estándar deja una parte del ingreso sin gravar, así que muchos estudiantes no deben nada. Si aun así te retuvieron algo, declarar es la forma de recuperarlo.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'Cómo funcionan DE VERDAD los tramos de impuestos',
 body:
 'El impuesto federal sobre la renta es progresivo, y los tramos funcionan como una pila de cubetas. Imagina que viertes tu ingreso desde arriba: la primera cubeta se llena a una tasa baja, y solo lo que se desborda cae a la siguiente cubeta a una tasa más alta. Cada tasa se aplica SOLO a los dólares dentro de esa cubeta, nunca a todo tu ingreso. Esa tasa por cubeta se llama tu tasa marginal, y esta sola idea te protege del mito sobre impuestos más común que existe.',
 },
 {
 type: 'example',
 heading: 'Ejemplo: las cubetas de Zoe',
 body:
 'Imagina un sistema sencillo con dos tramos: 10% sobre tus primeros $10,000 de ingreso, y 20% sobre todo lo que esté por encima de eso. Zoe gana $12,000 este año en su trabajo de medio tiempo. El pensamiento del mito dice que ella está "en el tramo del 20%", así que debe el 20% de $12,000 = $2,400. ¡Mal! Aquí están las cuentas reales: sus primeros $10,000 se gravan al 10% ($1,000), y solo los $2,000 por encima de la línea se gravan al 20% ($400). Total: $1,400, una tasa general de menos del 12%, aunque su tasa marginal más alta sea 20%. Las cubetas siempre trabajan a su favor.',
 },
 {
 type: 'content',
 heading: 'Cazamitos: "¡Un aumento puede reducir lo que te llevas a casa!"',
 body:
 'Algún día oirás a un adulto decirlo: "No puedo aceptar ese aumento, me va a subir a un tramo más alto y me voy a llevar MENOS a casa". Esto es matemáticamente imposible bajo el sistema de tramos. Subir a un tramo más alto solo cambia la tasa sobre los dólares NUEVOS por encima de la línea, cada dólar que ya ganaste conserva su tasa antigua y más baja. Si Zoe recibe un aumento de $12,000 a $13,000, solo esos $1,000 nuevos se gravan al 20%; se queda con $800 de eso. Ganar más dinero SIEMPRE significa llevarte más dinero a casa. Dilo bien fuerte.',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'El aumento de Devin sube su ingreso del tramo del 12% al tramo del 22%. ¿Qué pasa con lo que se lleva a casa?',
 options: [
 'Baja, ahora todo su ingreso se grava al 22%',
 'Sube, solo los dólares por encima de la línea del tramo se gravan al 22%',
 'Se queda exactamente igual',
 'Debe rechazar el aumento para evitar una multa',
 ],
 answerIndex: 1,
 explanation:
 '¡Aplastaste el mito! Solo los dólares nuevos por encima del umbral del tramo se gravan al 22%, todo lo que está por debajo conserva sus tasas más bajas. Lo que se lleva a casa definitivamente sube. Un aumento nunca puede achicar tu ingreso después de impuestos bajo el sistema de tramos.',
 },
 },
 {
 type: 'content',
 heading: 'Presentar una declaración (y ganarte un reembolso)',
 body:
 'Cada primavera, la fecha límite suele ser el 15 de abril, la gente presenta una declaración de impuestos, un formulario que suma lo que de verdad debías del año pasado y lo compara con lo que tus cheques ya retuvieron. ¿Te retuvieron de más? El gobierno te devuelve la diferencia como reembolso. ¿Te retuvieron de menos? Pagas la diferencia. Para los adolescentes con trabajos de medio tiempo, declarar suele ser rápido, gratis y de verdad vale la pena: si ganaste menos de la deducción estándar, probablemente debas $0 en impuesto federal sobre la renta, y declarar es la única forma de recuperar tu dinero retenido. ¡Ese es dinero real que la gente deja sobre la mesa cada año!',
 },
 {
 type: 'content',
 heading: 'La deducción estándar: tu pase gratis',
 body:
 'Antes de que entren en juego los tramos, la deducción estándar protege una parte de tu ingreso del impuesto federal sobre la renta por completo, alrededor de $15,000 para quien declara solo. ¿Ganaste $6,000 en un trabajo de verano? Eso está totalmente bajo el escudo, así que tu impuesto federal sobre la renta es $0, y cualquier impuesto federal sobre la renta que te hayan retenido te lo devuelven al declarar. (Ojo: el FICA es diferente, los impuestos del Seguro Social y de Medicare se aplican desde tu primer dólar de salario y no se reembolsan.)',
 bullets: [
 'Alrededor de $15,000 de ingreso está libre de impuesto federal sobre la renta para quien declara solo',
 'La mayoría de las ganancias de medio tiempo de los adolescentes caen totalmente bajo la deducción estándar',
 'Presentar una declaración es como recuperas el impuesto sobre la renta retenido de más',
 'El FICA (7.65%) sigue aplicándose a todos los salarios, la deducción estándar no lo bloquea',
 ],
 },
 ],
 quiz: [
 {
 question: '¿Cuál de estas es algo que pagan tus dólares de impuestos?',
 options: [
 'Escuelas públicas, carreteras y bomberos',
 'Dividendos de acciones de empresas privadas',
 'Contratos de patrocinio con celebridades',
 'Los intereses de tu cuenta de ahorros personal',
 ],
 answerIndex: 0,
 explanation:
 'Los impuestos financian bienes y servicios públicos compartidos: escuelas, carreteras, parques, defensa, bomberos, Seguro Social, Medicare y mucho más. Son el dinero juntado que hace funcionar al gobierno federal, estatal y local.',
 },
 {
 question:
 'En un sistema con 10% sobre los primeros $10,000 y 20% por encima de eso, ¿cuánto impuesto debe alguien que gana $15,000?',
 options: [
 '$3,000, el 20% de los $15,000 completos',
 '$1,500, un 10% fijo sobre todo',
 '$2,000, 10% más 20% repartido por igual',
 '$2,000, $1,000 en la primera cubeta más $1,000 sobre los $5,000 por encima de la línea',
 ],
 answerIndex: 3,
 explanation:
 'Los tramos funcionan como cubetas: los primeros $10,000 se gravan al 10% ($1,000), y solo los $5,000 por encima de la línea se gravan al 20% ($1,000), para un total de $2,000. La tasa del 20% nunca toca el ingreso de la cubeta más baja.',
 },
 {
 question: '¿Qué impuesto pagan los dueños de casas y financia principalmente las escuelas públicas locales?',
 options: ['Impuesto sobre las ventas', 'Impuesto predial', 'Impuesto sobre la nómina', 'Impuesto federal sobre la renta'],
 answerIndex: 1,
 explanation:
 'El impuesto predial se cobra cada año sobre casas y terrenos, y es la columna vertebral de los presupuestos locales, sobre todo de las escuelas públicas, junto con bibliotecas, parques y cuerpos de bomberos.',
 },
 {
 question: '¿Qué son los impuestos sobre la nómina?',
 options: [
 'Impuestos que pagan las tiendas por imprimir recibos',
 'Una comisión por usar el depósito directo',
 'Las deducciones de FICA de los cheques que financian el Seguro Social y Medicare',
 'Impuestos que solo pagan las personas que trabajan por cuenta propia',
 ],
 answerIndex: 2,
 explanation:
 'Los impuestos sobre la nómina son las deducciones de FICA, 6.2% para el Seguro Social y 1.45% para Medicare, que se toman de los salarios para financiar esos programas. Los empleadores pagan una parte igualada encima.',
 },
 {
 question: 'Recibes un reembolso de impuestos de $350 en la primavera. ¿Qué significa eso en realidad?',
 options: [
 'El gobierno te pagó un bono por declarar temprano',
 'Tu retención durante el año sumó $350 más de lo que en realidad debías',
 'Ganaste una lotería de impuestos',
 'Pagaste de menos y ahora debes intereses',
 ],
 answerIndex: 1,
 explanation:
 'Un reembolso es tu propio dinero regresando: tus cheques retuvieron más que tu cuenta real de impuestos, y presentar una declaración es como el gobierno hace las cuentas y te devuelve los $350 de más.',
 },
 {
 question:
 'Leo ganó $5,500 en su trabajo de verano, y le retuvieron $200 de impuesto federal sobre la renta. Con una deducción estándar de alrededor de $15,000, ¿qué debería esperar si presenta una declaración?',
 options: [
 'Debe más impuesto porque es estudiante',
 'Nada cambia, presente o no la declaración',
 'Recupera los $200, ya que su ingreso está totalmente bajo la deducción estándar',
 'También le reembolsan sus impuestos FICA',
 ],
 answerIndex: 2,
 explanation:
 'Sus $5,500 quedan totalmente bajo la deducción estándar, así que su cuenta de impuesto federal sobre la renta es $0, declarar le devuelve los $200 que le retuvieron. El FICA es la excepción: los impuestos del Seguro Social y de Medicare se aplican a todos los salarios y no se reembolsan.',
 },
 ],
 },
 zh: {
 title: '深入了解税收',
 description:
 '打破最大的税收误区，看懂税级究竟是怎么运作的，弄清楚被扣掉的那些钱到底建成了什么，剧透一下：加薪永远都值得接受。',
 sections: [
 {
 type: 'intro',
 heading: '税收：社会的订阅费',
 body:
 '一提到税，没人会开派对庆祝，但换个角度想想：税收就像一份3.3亿人一起分摊、用来运转一个国家的团体订阅。通往学校的道路、你家街尾的消防员、你手机用到的GPS卫星，全都靠税收来资助。今天我们会深入了解税为什么存在、你会缴哪几种税，以及税级究竟是怎么运作的，顺便打破美国最顽固的一个金钱误区。',
 },
 {
 type: 'content',
 heading: '税收到底买来了什么？',
 body:
 '政府并没有自己的钱，他们用的是我们的钱，汇集在一起。联邦、州和地方政府各自征税，再花在不同的事情上。当你在工资单上看到一项扣款时，钱就是流向了这些地方。',
 bullets: [
 '联邦：Social Security和Medicare、国防、公路、科学研究、国家公园',
 '州：公立大学、州级道路、警察、健康项目',
 '地方：公立学校、图书馆、公园、消防员、垃圾清运',
 '有意思的一点：公立学校的开支往往算下来每名学生每年超过15,000美元，你的教育是税收买来的最大项目之一',
 ],
 },
 {
 type: 'content',
 heading: '税收大家族：你会遇到的四种税',
 body:
 '所得税是名气最大的那个，但它还有几个兄弟姐妹，你会经常碰到。销售税（sales tax）在你买东西时于收银台加上，一件60美元的连帽衫加上7%的销售税，实际上要花64.20美元。房产税（property tax）由拥有房屋和土地的人每年缴纳，主要用来资助本地学校。工资税（payroll taxes）就是从你工资里扣掉的FICA，用来资助Social Security和Medicare。而所得税则是对你赚到的钱征收的，联邦层面和大多数州都会收。',
 bullets: [
 '销售税：买东西时缴纳（税率因州和城市而异）',
 '房产税：由房产所有者缴纳，资助本地学校和服务',
 '工资税（FICA）：从每张工资里按固定比例扣除，用于Social Security和Medicare',
 '所得税：对收入征收，联邦版本是累进的，收入越高，税率越高',
 ],
 },
 {
 type: 'terms',
 heading: '税务用语：关键术语',
 terms: [
 {
 term: '累进税（progressive tax）',
 definition:
 '一种税率随收入增加而提高的税，收入越高的人缴纳的比例越大。美国联邦所得税就是累进的。',
 },
 {
 term: '税级（tax bracket）',
 definition:
 '按特定税率征税的一个收入区间。你的收入会依次填满各个税级，就像水注满一摞水桶一样。',
 },
 {
 term: '边际税率（marginal tax rate）',
 definition:
 '你下一美元收入所适用的税率，只有落在某个税级内的那部分美元才按该税级的税率征税，而不是你的全部收入。',
 },
 {
 term: '标准扣除额（standard deduction）',
 definition:
 '一部分收入（单身申报者大约15,000美元）联邦政府完全不征税。大多数人在申报时会自动减掉它。',
 },
 {
 term: '报税表（tax return）',
 definition:
 '你每年春天申报的表格（通常是1040），用来报告你赚了多少钱，并计算你这一年真正应缴的税。',
 },
 {
 term: '退税（refund）',
 definition:
 '当你工资里预扣的税累计超过了你实际应缴的税时，政府退还给你的钱。这钱本来就一直是你的！',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你买了80美元的运动鞋，收银台向你收了85.60美元。刚刚发生的是哪种税？',
 options: [
 '工资税',
 '房产税',
 '销售税',
 '联邦所得税',
 ],
 answerIndex: 2,
 explanation:
 '销售税在你买东西时于收银台加上。这里是7%：80美元 x 0.07 = 多出5.60美元。工资税从工资里扣，房产税针对房地产，而所得税是对你赚到的钱征收的。',
 },
 },
 {
   type: 'video',
   heading: '观看：税率档次到底怎么算',
   body:
     '看看这个 BFF 短视频，了解税钱花在哪里，以及为什么加薪绝不会让你拿得更少。注意，视频中途会暂停提问，认真看哦！',
   videoId: 'Uat5nnzQgP8',
   source: 'BFF Classroom',
   questions: [
     {
       at: 47,
       question:
         '下面哪一项是用税款支付的？',
       options: [
         '只有军队',
         '道路、公立学校、消防员和食品安全检查',
         '只有给退休人员的项目',
         '你日常用不到的东西',
       ],
       answerIndex: 1,
       explanation:
         'Alvin 列举了道路、公立学校、消防员、食品安全检查、军队，以及你开车经过却从没想过的桥。你可以争论交多少，但很难真的退出这份清单。',
     },
     {
       at: 70,
       question:
         '在累进税制下，更高的档次实际上对什么征税？',
       options: [
         '对你全部收入按高税率征税',
         '只对落在那一档之内的那部分钱征税',
         '对你去年的收入征税',
         '对超出你存款的全部金额征税',
       ],
       answerIndex: 1,
       explanation:
         '这是几乎所有人都搞错的地方。高税率只适用于落在那一档内的钱，所以多赚一美元绝不可能让你总收入反而变少。',
     },
     {
       at: 125,
       question:
         '你在 $45,000 的收入上交了 $5,180。你的实际税率是多少？',
       options: [
         '约 12%，和所在档次一样',
         '约 11.5%，低于所在档次',
         '约 10%，最低档次',
         '约 24%，是档次的两倍',
       ],
       answerIndex: 1,
       explanation:
         '边际税率是你下一美元适用的税率，这里是 12%。实际税率是你在全部收入上真正付出的比例，约 11.5%，而且永远更低。',
     },
     {
       at: 150,
       question:
         '暑期工被预扣了税，但你其实一分不欠。该怎么做？',
       options: [
         '什么都不做，反正不用报税',
         '还是要报，因为那往往是国税局那边等你去领的钱',
         '让雇主把钱退回来',
         '留到明年再说',
       ],
       answerIndex: 1,
       explanation:
         '标准扣除额意味着一部分收入根本不用交税，所以很多学生本来就不欠。如果雇主还是预扣了，报税就是把钱拿回来的办法。',
     },
   ],
 },

 {
 type: 'content',
 heading: '税级究竟是怎么运作的',
 body:
 '联邦所得税是累进的，税级的运作就像一摞水桶。想象你的收入从顶部倒进去：第一个桶按较低的税率注满，只有溢出来的部分才流入下一个桶，按更高的税率征税。每个税率只适用于那个桶里的美元，绝不会适用于你的全部收入。这个按桶计算的税率就叫作你的边际税率，光是这一个概念，就能保护你不被最常见的税收误区骗到。',
 },
 {
 type: 'example',
 heading: '例子：Zoe的水桶',
 body:
 '想象一个简单的两级税制：前10,000美元收入按10%征税，超过部分按20%征税。Zoe今年从她的兼职工作赚了12,000美元。误区思维会说她"处在20%税级里"，所以她欠12,000美元的20% = 2,400美元。错了！真正的算法是这样：她的前10,000美元按10%征税（1,000美元），只有超过分界线的那2,000美元按20%征税（400美元）。总计：1,400美元，总体税率还不到12%，尽管她最高的边际税率是20%。水桶永远对她有利。',
 },
 {
 type: 'content',
 heading: '误区破解："加薪反而会让你到手更少！"',
 body:
 '总有一天你会听到某个大人说："我不能接受那笔加薪，它会把我推进更高的税级，我到手的反而会更少。"在税级制度下，这在数学上是不可能的。进入更高的税级只会改变超过分界线那部分新美元的税率，你已经赚到的每一美元仍然保持它原来的、更低的税率。如果Zoe从12,000美元加薪到13,000美元，只有那新增的1,000美元按20%征税；她还能留下其中的800美元。赚更多的钱永远意味着到手更多的钱。大声说出来。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Devin的加薪把他的收入从12%的税级推进了22%的税级。他的到手工资会怎么样？',
 options: [
 '会下降，他的全部收入现在都按22%征税',
 '会上升，只有超过税级分界线的那部分美元才按22%征税',
 '完全保持不变',
 '他必须拒绝加薪才能避免罚款',
 ],
 answerIndex: 1,
 explanation:
 '你破解了这个误区！只有超过税级门槛的新增美元才按22%征税，门槛以下的一切仍然保持更低的税率。他的到手工资肯定会上升。在税级制度下，加薪绝不可能缩水你的税后收入。',
 },
 },
 {
 type: 'content',
 heading: '申报报税表（顺便拿到退税）',
 body:
 '每年春天，截止日期通常是4月15日，人们会申报报税表，这份表格会算出你去年真正应缴的税，并和你工资里已经预扣的税作比较。预扣太多了？政府会把差额作为退税退还给你。预扣太少了？你补缴差额。对于有兼职工作的青少年来说，报税通常又快又免费，而且真的很值：如果你赚的钱低于标准扣除额，你的联邦所得税很可能是0美元，而报税是你拿回被预扣钱款的唯一途径。那可是实实在在的现金，每年都有人白白放弃！',
 },
 {
 type: 'content',
 heading: '标准扣除额：你的免费通行证',
 body:
 '在任何税级开始起作用之前，标准扣除额会把你一部分收入完全挡在联邦所得税之外，单身申报者大约15,000美元。暑期工赚了6,000美元？那完全在这道护盾之下，所以你的联邦所得税是0美元，任何被预扣的联邦所得税都会在你报税时退还给你。（提醒一下：FICA不一样，Social Security和Medicare税从你工资的第一美元起就适用，而且不会退还。）',
 bullets: [
 '单身申报者大约有15,000美元的收入免缴联邦所得税',
 '大多数青少年的兼职收入完全落在标准扣除额之下',
 '申报报税表是你拿回被多预扣的所得税的方式',
 'FICA（7.65%）仍然适用于所有工资，标准扣除额挡不住它',
 ],
 },
 ],
 quiz: [
 {
 question: '下面哪一项是你的税款所支付的？',
 options: [
 '公立学校、道路和消防员',
 '私营公司的股票分红',
 '名人代言合约',
 '你个人储蓄账户的利息',
 ],
 answerIndex: 0,
 explanation:
 '税收资助共享的公共物品和服务：学校、道路、公园、国防、消防员、Social Security、Medicare等等等等。它们是汇集起来、用来运转联邦、州和地方政府的钱。',
 },
 {
 question:
 '在一个前10,000美元按10%、超过部分按20%征税的税制里，一个赚了15,000美元的人要缴多少税？',
 options: [
 '3,000美元，整个15,000美元的20%',
 '1,500美元，一律按10%',
 '2,000美元，10%加20%平均分',
 '2,000美元，第一个桶里的1,000美元加上分界线以上5,000美元的1,000美元',
 ],
 answerIndex: 3,
 explanation:
 '税级像水桶一样运作：前10,000美元按10%征税（1,000美元），只有超过分界线的那5,000美元按20%征税（1,000美元），合计2,000美元。20%的税率绝不会碰到较低那个桶里的收入。',
 },
 {
 question: '哪种税由房主缴纳，并主要用来资助本地公立学校？',
 options: ['销售税', '房产税', '工资税', '联邦所得税'],
 answerIndex: 1,
 explanation:
 '房产税每年针对房屋和土地征收，是地方预算的支柱，尤其是公立学校，还有图书馆、公园和消防部门。',
 },
 {
 question: '什么是工资税？',
 options: [
 '商店为打印收据缴纳的税',
 '使用直接存款的手续费',
 '从工资里扣掉、用来资助Social Security和Medicare的FICA',
 '只有个体经营者才缴的税',
 ],
 answerIndex: 2,
 explanation:
 '工资税就是FICA扣款，6.2%用于Social Security，1.45%用于Medicare：从工资里扣出来资助这些项目。雇主还要额外配缴相同的份额。',
 },
 {
 question: '你在春天拿到了350美元的退税。这实际上意味着什么？',
 options: [
 '政府因为你提前报税给了你一笔奖金',
 '你这一年预扣的税累计比你实际应缴的多了350美元',
 '你中了税务彩票',
 '你缴少了，现在欠利息',
 ],
 answerIndex: 1,
 explanation:
 '退税就是你自己的钱回来了：你的工资预扣得比你真正的税单多，而申报报税表就是政府结算并把多出的350美元还给你的方式。',
 },
 {
 question:
 'Leo在暑期工赚了5,500美元，被预扣了200美元的联邦所得税。在标准扣除额大约15,000美元的情况下，如果他去报税，应该预期什么？',
 options: [
 '因为他是学生，所以要缴更多税',
 '报不报税都没什么区别',
 '他会拿回那200美元，因为他的收入完全在标准扣除额之下',
 '他的FICA税也会退还给他',
 ],
 answerIndex: 2,
 explanation:
 '他的5,500美元完全落在标准扣除额之下，所以他的联邦所得税单是0美元，报税会退还被预扣的那200美元。FICA是例外：Social Security和Medicare税适用于所有工资，而且不退还。',
 },
 ],
 },
}

export default lesson
