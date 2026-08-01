import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'financial-decision-making',
 week: 3,
 day: 2,
 title: 'Financial Decision-Making',
 icon: 'brain',
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
 'El costo de oportunidad es el valor de aquello a lo que renuncias, en este caso la patineta. Hasta las compras divertidas tienen un costo de oportunidad.',
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
 zh: {
 title: '财务决策',
 description: '学习如何用机会成本、货比三家等决策工具来评估各种财务选择。',
 sections: [
 {
 type: 'intro',
 heading: '每个选择都有代价',
 body:
 '你每天都要做出几十个决定：吃什么、买什么、放弃什么。今天你将学到一些工具，把"算了，我就买吧"变成一个聪明、笃定的选择。学完之后，你就能像高手一样权衡各种选项，而你未来的钱包会感谢你。',
 },
 {
 type: 'content',
 heading: '热身：50美元的两难',
 body:
 '想象一下：今晚有人出50美元请你帮忙看孩子，但你的朋友要去一场你不想错过的演唱会。你会怎么选，为什么？这里没有错误答案，但请注意一件事：不管你选哪个，你都放弃了另一个。这种取舍有个名字，也是我们的第一个大概念。',
 },
 {
 type: 'content',
 heading: '机会成本',
 body:
 '每个选择都伴随着取舍，尤其是涉及钱的时候。机会成本是指当你选择一样东西而不是另一样时，你所放弃的那样东西的价值。每个决定都有代价。举个例子，买一辆新车的机会成本，就是你本可以通过买二手车省下的那笔额外的钱。你不可能什么都拥有，所以明智的决定意味着权衡你所有的选项，并分析每一个的成本和收益。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你把60美元花在了演唱会门票上，而没有把它攒起来买一块新滑板。你这个选择的机会成本是什么？',
 options: [
 '你花在门票上的60美元',
 '你在演唱会上获得的快乐',
 '你放弃的那块滑板',
 '没有代价，因为你享受了演唱会',
 ],
 answerIndex: 2,
 explanation:
 '机会成本是你所放弃之物的价值，在这里就是那块滑板。就连让人开心的消费也有机会成本。',
 },
 },
 {
 type: 'terms',
 heading: '决策工具箱',
 terms: [
 {
 term: 'Opportunity Cost（机会成本）',
 definition:
 '当你选择一样东西而不是另一样时，你所放弃的那样东西的价值。',
 },
 {
 term: 'Comparison Shopping（货比三家）',
 definition:
 '在购买之前，比较不同商家的产品或服务的价格和功能。',
 },
 {
 term: 'Cost-Benefit Analysis（成本收益分析）',
 definition:
 '把购买一件商品或服务的收益与其成本进行比较。',
 },
 {
 term: 'Delayed Gratification（延迟满足）',
 definition:
 '在购买之前先等一等。等得越久，你可能获得的价值越多，或者越少后悔。',
 },
 ],
 },
 {
 type: 'content',
 heading: '聪明消费的策略',
 body:
 '当一件商品在向你招手时，慢下来，让它先经过这三种策略的检验。它们适用于运动鞋、订阅服务，以及将来某天的汽车和公寓。',
 bullets: [
 '货比三家：先查查不同卖家的价格和功能。去年的Kyrie篮球鞋可能比今年的便宜得多。',
 '成本收益分析：列出你从这次购买中得到什么，再拿它和它让你付出的代价作比较。',
 '延迟满足：买之前先等等。价格会降，热度会退，你也会弄清楚自己是不是真的想要它。',
 ],
 },
 {
 type: 'content',
 heading: '最后的小贴士',
 body:
 '在任何一次购买之前，先问自己两个快速的问题：这次购买有必要吗？我能不能等打折，或者选一个更便宜的选项？这十秒钟的思考为购物者省下的钱，比任何印出来的优惠券都多。另外，想想你最近一次引以为豪的购买。是什么让它变得明智？',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Deja想要今年最新款的篮球鞋，但她逛了三家店，发现去年的款式功能几乎一模一样，价格却只有一半。她用的是哪种策略？',
 options: [
 '货比三家',
 '冲动购买',
 '透支保护',
 '风险转移',
 ],
 answerIndex: 0,
 explanation:
 '在购买前跨不同商家比较价格和功能，这就是货比三家，它刚刚为Deja省下了一半的价钱。',
 },
 },
 {
 type: 'content',
 heading: '评估金融服务',
 body:
 '在挑选银行、账户和其他金融服务时，这些同样的技巧也管用。比较能帮你做出更聪明的选择。还要当心：许多服务会想方设法用订阅和小额收费来对付你，这些费用会随时间累积，所以要记好你的每一笔付款！',
 bullets: [
 '价格：前期要花多少钱？',
 '价值：你花的钱实际换来了什么？',
 '质量：它耐不耐用、好不好使？',
 '功能：哪些额外功能对你是真的重要？',
 '隐藏费用：细则里埋着哪些偷偷摸摸的收费？',
 ],
 },
 {
 type: 'example',
 heading: '银行大战：EasyBank vs. SecurePlus',
 body:
 '比较两个支票账户。EasyBank Basic没有月费，在超过15,000台ATM上免费使用，有一个带转账和提醒功能的基础版应用，每次透支收35美元。SecurePlus Checking每月5美元（保持500美元余额即可免除），可在全国任意ATM免费使用，包含预算工具以及提前拿到工资的功能，而且因为会自动拒付，所以没有透支费。对一个月度余额较低的人来说，哪个更好？谁能从预算工具中获益最多？什么样的消费者能完全避开透支费？不同的人，有不同的最佳答案。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Sam的账户里通常不到100美元。根据这个比较，哪个账户可能更适合他，为什么？',
 options: [
 'SecurePlus，因为凡是收费的账户质量都更高',
 'EasyBank Basic，因为他能避开SecurePlus在他余额低时会收的5美元月费',
 'SecurePlus，因为他账户里保持着500美元以上',
 '都不适合，因为支票账户只适合成年人',
 ],
 answerIndex: 1,
 explanation:
 '分析得很棒！由于账户里不到500美元，Sam会被SecurePlus收取5美元月费，所以EasyBank的0美元月费很可能更适合他。他只需要小心那35美元的透支费。',
 },
 },
 {
 type: 'example',
 heading: '你会选哪个？',
 body:
 '你一年赚70,000美元。你会选买一辆新车、把钱全花掉，还是买一辆二手车、把剩下的存起来？从财务上说，二手车通常更胜一筹，哪怕它看起来差一点。接下来：一部1,000美元的新iPhone，还是1,000美元的Apple股票？投资往往是更聪明的一招，但想象一下关税来袭，Apple的投资者损失了一半的钱。投资也伴随着实实在在的风险。最后一个：一份薪水高得多但福利更少的工作，还是一份薪水较低、靠提成、但福利好得多（比如带薪休假）的工作？每个选项都有取舍。这正是重点所在。',
 },
 {
 type: 'content',
 heading: '总结',
 body:
 '现在你有了一整套决策工具：看清机会成本、货比三家、做成本收益分析，并让延迟满足施展它的魔力。记下今天让你豁然开朗的地方，以及你想多加练习的地方。下节课：财务规划，配有一段Dave Ramsey的视频和一个课后测验。到时候见！',
 },
 ],
 quiz: [
 {
 question: '什么是机会成本？',
 options: [
 '一件昂贵物品的价格标签',
 '当你选择一样东西而不是另一样时，你所放弃的那样东西的价值',
 '商店对退货收取的费用',
 '银行为储蓄支付的利息',
 ],
 answerIndex: 1,
 explanation:
 '机会成本是指当你选择一个选项而不是另一个时，你所放弃之物的价值。每个决定都有代价。',
 },
 {
 question:
 '买一辆全新的车而不是一辆二手车，其机会成本是……',
 options: [
 '你本可以通过买二手车省下的那笔额外的钱',
 '新车用掉的汽油',
 '每月的保险保费',
 '没有，因为新车永远不会贬值',
 ],
 answerIndex: 0,
 explanation:
 '选择新车，你就放弃了二手车本会为你口袋省下的那笔额外积蓄。那笔失去的积蓄就是机会成本。',
 },
 {
 question:
 '在购买之前查看好几个不同卖家的价格和功能，这叫做……',
 options: [
 '延迟满足',
 '冲动购买',
 '成本转移',
 '货比三家',
 ],
 answerIndex: 3,
 explanation:
 '货比三家意味着在你购买之前跨商家比较价格和功能，比如用比今年更便宜的价格抢到去年的Kyrie鞋。',
 },
 {
 question:
 '把一次购买的收益与它让你付出的代价放在一起权衡，这是一个……',
 options: [
 '免赔额复核',
 '预算冻结',
 '成本收益分析',
 '信用检查',
 ],
 answerIndex: 2,
 explanation:
 '成本收益分析把购买一件商品或服务的收益与其成本进行比较，帮助你判断它值不值得。',
 },
 {
 question:
 '在购买一件被大肆宣传的新品之前先等上几周，往往能拿到更好的价格或避免后悔，这是……的一个例子。',
 options: [
 '延迟满足',
 '机会成本',
 '透支保护',
 '责任保障',
 ],
 answerIndex: 0,
 explanation:
 '这就是延迟满足。等得越久，你可能获得的价值越多，或者你可能感到的后悔越少。',
 },
 {
 question:
 '在评估一项金融服务时，因为小额收费会随时间累积，以下哪一项是你应当当心的？',
 options: [
 '免费的ATM使用',
 '隐藏费用和订阅',
 '手机应用的提醒',
 '被免除的月费',
 ],
 answerIndex: 1,
 explanation:
 '许多服务会偷偷塞进订阅和小额隐藏收费，它们悄无声息地累积起来。记好你的每一笔付款！',
 },
 {
 question:
 '在银行比较中，为什么SecurePlus Checking可能会吸引一个经常透支的人？',
 options: [
 '它每次透支都付给客户35美元',
 '它有全城最便宜的ATM费用',
 '它提供最高500美元的免费透支',
 '它没有透支费，因为它会自动拒绝那些会导致账户透支的交易',
 ],
 answerIndex: 3,
 explanation:
 'SecurePlus会自动拒付那些会导致账户透支的购买，所以没有透支费，这与EasyBank每次透支35美元不同。',
 },
 {
 question:
 '"你会选哪个？"这个活动表明，把1,000美元投进Apple股票而不是买一部iPhone……',
 options: [
 '保证你的钱会翻倍',
 '总是比买手机更糟',
 '能让你的钱增值，但仍然伴随着实实在在的贬值风险',
 '对任何30岁以下的人都是违法的',
 ],
 answerIndex: 2,
 explanation:
 '投资往往是更聪明的财务之举，但正如关税的转折所显示的，永远存在亏钱的风险。聪明的决策者会同时权衡风险与回报。',
 },
 ],
 },
}

export default lesson
