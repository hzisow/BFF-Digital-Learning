import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'crypto-and-scams',
 week: 5,
 day: 5,
 title: 'Crypto & Modern Money Traps',
 icon: 'crypto',
 description:
 'Get the no-hype truth about crypto, spot the tricks behind viral money schemes, and build the scam radar that protects your wallet for life.',
 durationMin: 15,
 sections: [
 {
 type: 'intro',
 heading: 'Welcome to the Wild West of Money',
 body:
 "Your feed is full of it: coins going 'to the moon,' influencers flashing rented Lamborghinis, betting apps promising easy parlays, and checkout buttons whispering 'only 4 easy payments!' Some of this is real technology, some is gambling in a costume, and some is straight-up scam. Today we're building your radar, so you can tell innovation from trap, and keep your money out of other people's pockets.",
 },
 {
 type: 'content',
 heading: 'What Cryptocurrency Actually Is',
 body:
 "Strip away the hype and cryptocurrency is digital money that isn't issued by any government or bank. Instead of a bank keeping the records, transactions are tracked on a blockchain, a shared public ledger copied across thousands of computers, which makes the record very hard to fake. Bitcoin was the first; thousands of others followed. The tech is genuinely clever. But here's the catch: most crypto has no cash flow behind it, no rent, no profits, no interest. Its price is purely what the next person will pay, and that can change violently in a day.",
 bullets: [
 'Digital money tracked on a blockchain, a shared public record, not a bank ledger',
 'No government backing and, in the U.S., no FDIC insurance if an exchange fails or you get hacked',
 "Most coins' prices rest entirely on what the next buyer will pay",
 'Real technology AND real risk can be true at the same time',
 ],
 },
 {
 type: 'content',
 heading: 'Volatility vs. Saving: Not the Same Sport',
 body:
 "Volatility means how wildly a price swings. A savings account moves like a calm escalator: slow, boring, insured, always upward. Crypto moves like an untested rollercoaster. Bitcoin has dropped more than 50% in a few months multiple times, and smaller coins have gone to zero. That's why money you NEED, emergency fund, car savings, college money, never belongs in something that can lose half its value before homecoming. Saving and speculating are different sports with different rules.",
 bullets: [
 'Savings account: insured up to $250,000, grows slowly, never drops',
 'Crypto: can rise or crash 20% in a single day, and some coins never recover',
 'Money you need soon belongs in savings, full stop',
 'If someone calls crypto "just like a savings account," they are wrong or lying',
 ],
 },
 {
 type: 'terms',
 heading: 'Trap-Spotting Vocabulary',
 terms: [
 {
 term: 'Cryptocurrency',
 definition:
 'Digital money recorded on a blockchain instead of at a bank, not issued or backed by any government. Known for big price swings.',
 },
 {
 term: 'Volatility',
 definition:
 'How much and how fast a price swings up and down. High volatility means big possible gains AND big possible losses.',
 },
 {
 term: 'Pump-and-dump',
 definition:
 'A scheme where insiders hype an asset to pump up its price, then dump their own holdings on the fans who bought in, crashing the price.',
 },
 {
 term: 'House edge',
 definition:
 'The built-in mathematical advantage that guarantees casinos, betting apps, and loot boxes profit over time, meaning players, as a group, must lose.',
 },
 {
 term: 'FOMO',
 definition:
 'Fear of missing out, the anxious urge to jump in because everyone else seems to be winning. The #1 emotion scammers weaponize.',
 },
 {
 term: 'Buy now, pay later (BNPL)',
 definition:
 'Checkout plans that split a purchase into installments. They feel free, but stacked plans and late fees quietly turn into real debt.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Kayla has $800 saved for a car she needs to buy in 6 months. A friend says to put it all in a hot new coin. What is the biggest problem with that plan?',
 options: [
 'Crypto apps are too hard to download',
 'The coin could easily drop 50% before she needs the money. Savings for near-term needs should not be gambled',
 'She would owe extra FICA taxes on it',
 'Nothing, coins always bounce back eventually',
 ],
 answerIndex: 1,
 explanation:
 "Volatility is the dealbreaker: money she NEEDS on a deadline cannot ride something that can crash 20-50% in weeks, and no, coins do not always come back. Savings and speculation are different sports, and her car fund belongs in savings.",
 },
 },
 {
   type: 'video',
   heading: 'Watch: "Get Rich Quick" Is Always the Tell',
   body:
     'Watch this quick BFF video on what crypto actually is and how the traps around it work. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 'q-IzijaDfZI',
   source: 'BFF Classroom',
   questions: [
     {
       at: 62,
       question:
         "What is most crypto's price actually based on?",
       options: [
         'Rent, profits or interest the asset earns',
         'Whatever the next person is willing to pay for it',
         'A government guarantee',
         'The cost of the computers running it',
       ],
       answerIndex: 1,
       explanation:
         "The blockchain technology is genuinely clever, but Alvin's catch is that most crypto has no cash behind it. No rent, no profits, no interest, so the price is purely the next buyer.",
     },
     {
       at: 100,
       question:
         'Where does money you actually need belong?',
       options: [
         'In crypto, for the higher returns',
         'Somewhere that cannot lose half its value in a couple of weeks',
         'Split evenly between savings and crypto',
         'In whatever went up most last year',
       ],
       answerIndex: 1,
       explanation:
         'Bitcoin has dropped more than 50% in a few months on multiple occasions, and plenty of smaller coins went to zero and stayed there. Saving and speculating are different things and should not follow the same rules.',
     },
     {
       at: 130,
       question:
         'Someone online is urging you to get in early on a coin. What is probably happening?',
       options: [
         'You found a genuine opportunity',
         'You are the exit, not the early buyer',
         'The coin is about to be regulated',
         'They want you to split the fees',
       ],
       answerIndex: 1,
       explanation:
         'In a pump and dump, insiders hype something to drive the price up, then sell their own holdings to the people who believed them. As Alvin puts it, if a stranger is urging you in early, you are probably their way out.',
     },
     {
       at: 155,
       question:
         'What single rule covers almost all of this?',
       options: [
         'Only invest what you can explain',
         'Anything promising guaranteed, fast or risk-free returns is selling you something',
         'Never invest before you turn 18',
         'Always take the highest advertised return',
       ],
       answerIndex: 1,
       explanation:
         'Real investing is slow and boring, and slow and boring is usually what works. A betting app runs on the house edge, which means over enough plays the house wins mathematically, not just usually.',
     },
   ],
 },

 {
 type: 'content',
 heading: '"Get Rich Quick" Is Always a Red Flag',
 body:
 "Burn this into your brain: real wealth compounds slowly, so anyone promising fast, easy, guaranteed money is selling something, and it's usually you. 'Guaranteed 10x!' '... before it's too late!' 'Everyone is getting in!' These phrases are engineered pressure. And influencer shills are the modern version: that creator hyping a coin was often paid to promote it, or bought early hoping YOUR purchase pumps their price. When they sell, and they do, the fans hold the crash. If a stranger truly had a guaranteed money machine, they would not be sharing it on TikTok.",
 bullets: [
 "Words that should trigger your alarm: 'guaranteed,' 'can't lose,' 'act now,' 'secret method'",
 'Urgency is a weapon: real opportunities do not expire in 24 hours',
 'Ask who profits if you buy, with paid shills, the answer is them, not you',
 'If it sounds too good to be true, it is. Every time. No exceptions',
 ],
 },
 {
 type: 'example',
 heading: 'Example: The $200 Rocket That Crashed',
 body:
 "Devon, 16, sees a gaming influencer hyping 'MoonRocketCoin, 100x incoming, NOT financial advice.' Comments are full of people posting gains. Devon puts in $200 of lawn-mowing money at $0.40 per coin. It jumps to $0.55 in two days. He's up 37% and feels like a genius! What Devon can't see: the influencer and insiders bought millions of coins at $0.02 and are selling into the hype. A week later the coin sits at $0.03, the influencer has deleted the video, and Devon's $200 is worth $15. That's a pump-and-dump, and versions of it have been run since long before crypto existed.",
 },
 {
 type: 'content',
 heading: 'The House Always Wins: Betting & Loot Boxes',
 body:
 "Sports betting apps and video game loot boxes run on the same engine: the house edge. Every game is mathematically tilted so that, across all players, the company MUST come out ahead, that's how they afford those ads. Individual wins absolutely happen (that's the hook!), but the math grinds everyone down over time. Betting apps even celebrate your wins with confetti to keep you playing. Loot boxes are the same psychology in miniature: pay $5 for a chance at a rare skin, and the odds quietly guarantee the game company profits. An occasional win is the bait, the edge is the trap.",
 bullets: [
 'House edge means the odds are set so the company always profits over time',
 'A 5% edge sounds tiny, but bet $50 weekly and it averages out to losing about $130 per year, and streaks can be far worse',
 'Wins are engineered to feel amazing so you keep playing. Confetti is not your friend',
 'Loot boxes are gambling mechanics aimed at players your age; many countries regulate them like casinos',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 "An influencer posts: 'This coin is GUARANTEED to 50x by Friday. My followers are all in! Link in bio, don't miss out!!' What are the red flags?",
 options: [
 'None, followers posting gains is proof it works',
 'Only the emoji use',
 "The word 'coin'. Everything else is normal marketing",
 "'Guaranteed' returns, extreme urgency, and hype from someone who profits if you buy, the full pump-and-dump starter pack",
 ],
 answerIndex: 3,
 explanation:
 "You spotted all three! Nothing in investing is guaranteed, urgency exists to stop you from thinking, and a promoter who benefits from your purchase is not advice. It is an ad. That post is the anatomy of a pump-and-dump.",
 },
 },
 {
 type: 'content',
 heading: 'FOMO: The Hack for Your Brain',
 body:
 "Why do smart people fall for obvious traps? FOMO, fear of missing out. Your brain is wired to copy the crowd and to fear losing a chance more than it fears losing money. Scammers know this, so they manufacture crowds (fake comments, bots posting gains) and deadlines ('window closes tonight!'). The defense is beautifully simple: slow down. Real opportunities survive a 48-hour think-it-over. Anything that punishes you for pausing to think was never an opportunity, it was an ambush.",
 },
 {
 type: 'example',
 heading: 'Example: The $60 Hoodie That Cost $95',
 body:
 "Lena, 17, wants a $60 hoodie. Checkout offers '4 easy payments of $15!', feels basically free. Two weeks later she splits $80 of sneakers, then $48 of concert merch. Now three plans overlap: $47 is auto-drafting from her account every two weeks, more than half her part-time paycheck. When a payment bounces during a slow work week, she gets a $10 late fee, a $32 overdraft fee from her bank, and a warning on her account. Her 'easy payments' hoodie effectively cost $95 (that's 58% extra!), and BNPL companies count on exactly this stacking. If you cannot afford it today, four slices of it are still unaffordable.",
 },
 {
 type: 'content',
 heading: 'The Golden Rule (Tattoo This on Your Brain)',
 body:
 "Here it is, the rule that would have saved every victim of every scheme in this lesson: never invest money you can't afford to lose, and never invest in anything you don't understand. Two parts, both mandatory. If losing the money would wreck your plans, it doesn't belong in anything risky. And if you can't explain how the thing makes money in two plain sentences, you're not investing, you're donating to someone who can. Curious about crypto someday? Fine: tiny amounts, fully-funded savings first, full understanding, zero borrowed money. Boring? Maybe. But boring is how people actually get rich.",
 bullets: [
 "Part 1: only risk money whose loss you could shrug off completely",
 "Part 2: if you can't explain how it makes money, you don't buy it",
 'Emergency fund and goal savings come first, always in insured accounts',
 'Slow, diversified, boring investing beats hype in the long run, every reliable study agrees',
 ],
 },
 ],
 quiz: [
 {
 question: 'What is a cryptocurrency, in plain language?',
 options: [
 'Digital money recorded on a blockchain, not issued or insured by any government or bank',
 'A savings account run by the government',
 'A type of stock that pays guaranteed dividends',
 'Arcade tokens that work online',
 ],
 answerIndex: 0,
 explanation:
 'Crypto is digital money tracked on a blockchain, a shared public ledger, instead of by a bank, with no government backing. The technology is real, but most coins have no cash flow behind them, so prices swing on pure supply and demand.',
 },
 {
 question: 'Why is crypto a bad place for your emergency fund or car savings?',
 options: [
 'Crypto accounts charge monthly maintenance fees',
 'It is too hard to sell crypto quickly',
 'Its high volatility means the value could drop 20-50% right before you need the money',
 'Emergency funds are not allowed to grow',
 ],
 answerIndex: 2,
 explanation:
 'Money you need on a deadline cannot survive big swings. Crypto has repeatedly lost half its value in months, while an insured savings account never drops. Saving and speculating are different jobs for different dollars.',
 },
 {
 question: 'In a pump-and-dump scheme, who ends up losing money?',
 options: [
 'The insiders who bought early',
 'The fans who bought during the hype, right before insiders sold',
 'The blockchain itself',
 'Nobody, prices always recover',
 ],
 answerIndex: 1,
 explanation:
 'Insiders buy cheap, manufacture hype to pump the price, then dump their coins on the fans buying in at the top. When the selling crashes the price, the late buyers hold the losses. That is the entire design of the scheme.',
 },
 {
 question: 'What does the "house edge" mean for sports betting apps and loot boxes?',
 options: [
 'Experienced players can flip the edge in their favor',
 'The company matches whatever you win',
 'The odds are fair because wins and losses balance out for everyone',
 'The odds are mathematically set so the company always profits over time, meaning players as a group must lose',
 ],
 answerIndex: 3,
 explanation:
 'The house edge is a built-in mathematical tilt: across all players and all bets, the company is guaranteed to come out ahead. Individual wins happen. They are the hook, but the longer you play, the more the math grinds you down.',
 },
 {
 question: 'How can buy-now-pay-later plans become a money trap?',
 options: [
 'They require a college degree to use',
 'Stacking several "small" payment plans adds up to real debt, and missed payments trigger late fees and overdrafts',
 'They only work on purchases over $500',
 'They cannot, splitting payments is always free money',
 ],
 answerIndex: 1,
 explanation:
 'Each plan feels tiny, but three or four overlapping ones can quietly claim most of a paycheck, and one bounced payment can snowball into late fees and overdraft charges. If you cannot afford it today, four slices of it are still unaffordable.',
 },
 {
 question: 'What is the golden rule for risky investments like crypto?',
 options: [
 'Invest early and often in whatever is trending',
 'Borrow money so your gains are bigger',
 'Never invest money you cannot afford to lose, and never in things you do not understand',
 'Only invest when an influencer you trust recommends it',
 ],
 answerIndex: 2,
 explanation:
 'Both halves are mandatory: risk only money whose loss would not wreck your plans, and only put it in things you can explain in plain words. Everything else in this lesson, FOMO, shills, house edges, is defeated by this one rule.',
 },
 ],
 es: {
 title: 'Cripto y Trampas Modernas del Dinero',
 description:
 'Conoce la verdad sin exageraciones sobre las criptomonedas, detecta los trucos detrás de los esquemas virales de dinero y construye el radar antiestafas que protege tu bolsillo de por vida.',
 sections: [
 {
 type: 'intro',
 heading: 'Bienvenido al Salvaje Oeste del Dinero',
 body:
 'Tu feed está lleno de eso: monedas que van "a la luna", influencers presumiendo Lamborghinis rentados, apps de apuestas prometiendo combinadas fáciles y botones de pago que susurran "¡solo 4 pagos fáciles!". Algo de esto es tecnología real, algo es apuesta disfrazada y algo es pura estafa. Hoy vamos a construir tu radar, para que puedas distinguir la innovación de la trampa y mantener tu dinero fuera de los bolsillos de otros.',
 },
 {
 type: 'content',
 heading: 'Qué Es Realmente una Criptomoneda',
 body:
 'Quita la exageración y una criptomoneda es dinero digital que no emite ningún gobierno ni banco. En lugar de que un banco lleve los registros, las transacciones se rastrean en una blockchain (cadena de bloques): un libro de registro público y compartido, copiado en miles de computadoras, lo que hace que el registro sea muy difícil de falsificar. Bitcoin fue la primera; miles de otras siguieron. La tecnología es de verdad ingeniosa. Pero aquí está el detalle: la mayoría de las criptomonedas no tienen flujo de dinero detrás: ni renta, ni ganancias, ni intereses. Su precio es puramente lo que la siguiente persona pagará, y eso puede cambiar violentamente en un día.',
 bullets: [
 'Dinero digital rastreado en una blockchain: un registro público y compartido, no el libro de un banco',
 'Sin respaldo del gobierno y, en EE. UU., sin seguro de la FDIC si un exchange quiebra o te hackean',
 'El precio de la mayoría de las monedas depende por completo de lo que pagará el siguiente comprador',
 'Que sea tecnología real Y riesgo real pueden ser ciertos al mismo tiempo',
 ],
 },
 {
 type: 'content',
 heading: 'Volatilidad vs. Ahorrar: No Es el Mismo Deporte',
 body:
 'La volatilidad se refiere a qué tan bruscamente se mueve un precio. Una cuenta de ahorros se mueve como una escalera eléctrica tranquila: lenta, aburrida, asegurada, siempre hacia arriba. Las criptomonedas se mueven como una montaña rusa sin probar: Bitcoin ha caído más del 50% en unos meses varias veces, y monedas más pequeñas han llegado a cero. Por eso el dinero que NECESITAS (fondo de emergencia, ahorros para el auto, dinero de la universidad) nunca pertenece a algo que puede perder la mitad de su valor antes del baile de bienvenida. Ahorrar y especular son deportes distintos con reglas distintas.',
 bullets: [
 'Cuenta de ahorros: asegurada hasta $250,000, crece despacio, nunca baja',
 'Cripto: puede subir o desplomarse 20% en un solo día, y algunas monedas nunca se recuperan',
 'El dinero que necesitas pronto pertenece a los ahorros, punto',
 'Si alguien dice que las criptomonedas son "igual que una cuenta de ahorros", está equivocado o mintiendo',
 ],
 },
 {
 type: 'terms',
 heading: 'Vocabulario para Detectar Trampas',
 terms: [
 {
 term: 'Criptomoneda (cryptocurrency)',
 definition:
 'Dinero digital registrado en una blockchain en lugar de en un banco, no emitido ni respaldado por ningún gobierno. Conocida por sus grandes cambios de precio.',
 },
 {
 term: 'Volatilidad (volatility)',
 definition:
 'Cuánto y qué tan rápido sube y baja un precio. Una volatilidad alta significa grandes ganancias posibles Y grandes pérdidas posibles.',
 },
 {
 term: 'Inflar y tirar (pump-and-dump)',
 definition:
 'Un esquema donde los de adentro exageran un activo para inflar su precio, y luego venden todo lo suyo a los fans que compraron, desplomando el precio.',
 },
 {
 term: 'Ventaja de la casa (house edge)',
 definition:
 'La ventaja matemática incorporada que garantiza que los casinos, las apps de apuestas y las cajas de botín ganen con el tiempo, lo que significa que los jugadores, como grupo, deben perder.',
 },
 {
 term: 'FOMO',
 definition:
 'Miedo a quedarse afuera (fear of missing out): el impulso ansioso de meterse porque parece que todos los demás están ganando. La emoción #1 que los estafadores usan como arma.',
 },
 {
 term: 'Compra ahora, paga después (BNPL)',
 definition:
 'Planes de pago que dividen una compra en cuotas. Se sienten gratis, pero los planes acumulados y los cargos por atraso se convierten en deuda real sin que te des cuenta.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Kayla tiene $800 ahorrados para un auto que necesita comprar en 6 meses. Una amiga le dice que lo ponga todo en una moneda nueva de moda. ¿Cuál es el mayor problema con ese plan?',
 options: [
 'Las apps de cripto son demasiado difíciles de descargar',
 'La moneda fácilmente podría caer 50% antes de que ella necesite el dinero: los ahorros para necesidades cercanas no se deben apostar',
 'Tendría que pagar impuestos FICA extra por ello',
 'Nada: las monedas siempre se recuperan tarde o temprano',
 ],
 answerIndex: 1,
 explanation:
 'La volatilidad es el problema decisivo: el dinero que NECESITA para una fecha límite no puede montarse en algo que puede desplomarse 20-50% en semanas, y no, las monedas no siempre regresan. Ahorrar y especular son deportes distintos, y su fondo para el auto pertenece a los ahorros.',
 },
 },
 {
   type: 'video',
   heading: 'Míralo: "Hazte rico rápido" siempre es la señal',
   body:
     'Mira este video corto de BFF sobre qué es realmente el cripto y cómo funcionan las trampas a su alrededor. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 'q-IzijaDfZI',
   source: 'BFF Classroom',
   questions: [
     {
       at: 62,
       question:
         '¿En qué se basa realmente el precio de la mayoría de las criptomonedas?',
       options: [
         'En rentas, ganancias o intereses que genera el activo',
         'En lo que la siguiente persona esté dispuesta a pagar',
         'En una garantía del gobierno',
         'En el costo de las computadoras que la sostienen',
       ],
       answerIndex: 1,
       explanation:
         'La tecnología blockchain es genuinamente ingeniosa, pero la trampa que señala Alvin es que la mayoría del cripto no tiene efectivo detrás. Ni renta, ni ganancias, ni intereses, así que el precio es puramente el siguiente comprador.',
     },
     {
       at: 100,
       question:
         '¿Dónde debe estar el dinero que de verdad necesitas?',
       options: [
         'En cripto, por los rendimientos más altos',
         'En algo que no pueda perder la mitad de su valor en un par de semanas',
         'Repartido por igual entre ahorros y cripto',
         'En lo que más subió el año pasado',
       ],
       answerIndex: 1,
       explanation:
         'Bitcoin ha caído más del 50% en pocos meses en varias ocasiones, y muchas monedas pequeñas llegaron a cero y ahí se quedaron. Ahorrar y especular son cosas distintas y no deben seguir las mismas reglas.',
     },
     {
       at: 130,
       question:
         'Alguien en línea te insiste en entrar temprano a una moneda. ¿Qué está pasando probablemente?',
       options: [
         'Encontraste una oportunidad genuina',
         'Tú eres su salida, no el comprador temprano',
         'La moneda está por ser regulada',
         'Quieren que compartas las comisiones',
       ],
       answerIndex: 1,
       explanation:
         'En un pump and dump, los de adentro inflan el precio y luego venden sus propias tenencias a quienes les creyeron. Como dice Alvin, si un desconocido te urge a entrar temprano, probablemente eres su salida.',
     },
     {
       at: 155,
       question:
         '¿Qué regla cubre casi todo esto?',
       options: [
         'Invertir solo en lo que puedas explicar',
         'Todo lo que prometa rendimientos garantizados, rápidos o sin riesgo te está vendiendo algo',
         'No invertir antes de los 18',
         'Elegir siempre el rendimiento más alto anunciado',
       ],
       answerIndex: 1,
       explanation:
         'Invertir de verdad es lento y aburrido, y lento y aburrido suele ser lo que funciona. Una app de apuestas vive de la ventaja de la casa: con suficientes jugadas, la casa gana matemáticamente, no solo casi siempre.',
     },
   ],
 },

 {
 type: 'content',
 heading: '"Hacerse Rico Rápido" Siempre Es una Señal de Alerta',
 body:
 'Grábate esto en el cerebro: la riqueza real se acumula despacio, así que cualquiera que promete dinero rápido, fácil y garantizado está vendiendo algo, y por lo general eres tú. "¡Garantizado 10x!" "...¡antes de que sea demasiado tarde!" "¡Todos se están metiendo!" Estas frases son presión fabricada. Y los influencers que promocionan son la versión moderna: ese creador que exagera una moneda muchas veces cobró por promoverla, o compró temprano esperando que TU compra infle su precio. Cuando venden, y lo hacen, los fans se quedan con la caída. Si un desconocido de verdad tuviera una máquina de dinero garantizado, no la estaría compartiendo en TikTok.',
 bullets: [
 'Palabras que deberían activar tu alarma: "garantizado", "no puedes perder", "actúa ya", "método secreto"',
 'La urgencia es un arma: las oportunidades reales no vencen en 24 horas',
 'Pregunta quién gana si tú compras: con los promotores pagados, la respuesta son ellos, no tú',
 'Si suena demasiado bueno para ser verdad, lo es. Cada vez. Sin excepciones',
 ],
 },
 {
 type: 'example',
 heading: 'Ejemplo: El Cohete de $200 que Se Estrelló',
 body:
 'Devon, de 16 años, ve a un influencer de videojuegos exagerando "MoonRocketCoin: viene un 100x, NO es consejo financiero ". Los comentarios están llenos de gente publicando ganancias. Devon mete $200 de su dinero de cortar el césped a $0.40 por moneda. Sube a $0.55 en dos días: ¡va ganando 37% y se siente un genio! Lo que Devon no puede ver: el influencer y los de adentro compraron millones de monedas a $0.02 y las están vendiendo aprovechando la euforia. Una semana después la moneda está a $0.03, el influencer borró el video y los $200 de Devon valen $15. Eso es inflar y tirar (pump-and-dump), y versiones de esto se han hecho desde mucho antes de que existieran las criptomonedas.',
 },
 {
 type: 'content',
 heading: 'La Casa Siempre Gana: Apuestas y Cajas de Botín',
 body:
 'Las apps de apuestas deportivas y las cajas de botín de los videojuegos funcionan con el mismo motor: la ventaja de la casa. Cada juego está inclinado matemáticamente para que, entre todos los jugadores, la empresa DEBA salir ganando; así es como pagan esos anuncios. Las victorias individuales absolutamente pasan (¡ese es el anzuelo!), pero la matemática desgasta a todos con el tiempo. Las apps de apuestas hasta celebran tus victorias con confeti para que sigas jugando. Las cajas de botín son la misma psicología en miniatura: paga $5 por la posibilidad de una skin rara, y las probabilidades garantizan discretamente que la empresa del juego gane. Una victoria ocasional es la carnada; la ventaja es la trampa.',
 bullets: [
 'La ventaja de la casa significa que las probabilidades están puestas para que la empresa siempre gane con el tiempo',
 'Una ventaja del 5% suena diminuta, pero si apuestas $50 por semana, en promedio se traduce en perder cerca de $130 al año, y las rachas pueden ser mucho peores',
 'Las victorias están diseñadas para sentirse increíbles y que sigas jugando: el confeti no es tu amigo',
 'Las cajas de botín son mecánicas de apuestas dirigidas a jugadores de tu edad; muchos países las regulan como casinos',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Un influencer publica: "Esta moneda está GARANTIZADA a hacer 50x para el viernes: ¡mis seguidores están todos adentro! Link en la bio, ¡¡no te lo pierdas!!" ¿Cuáles son las señales de alerta?',
 options: [
 'Ninguna: que los seguidores publiquen ganancias es prueba de que funciona',
 'Solo el uso de emojis',
 'La palabra "moneda": todo lo demás es marketing normal',
 'Retornos "garantizados", urgencia extrema y exageración de alguien que gana si tú compras: el paquete completo para empezar un inflar y tirar',
 ],
 answerIndex: 3,
 explanation:
 '¡Detectaste las tres! Nada en las inversiones está garantizado, la urgencia existe para impedir que pienses, y un promotor que se beneficia de tu compra no da un consejo: es un anuncio. Esa publicación es la anatomía de un inflar y tirar.',
 },
 },
 {
 type: 'content',
 heading: 'FOMO: El Hackeo para Tu Cerebro',
 body:
 '¿Por qué la gente inteligente cae en trampas obvias? FOMO: el miedo a quedarse afuera. Tu cerebro está programado para copiar a la multitud y para temer perder una oportunidad más de lo que teme perder dinero. Los estafadores lo saben, así que fabrican multitudes (comentarios falsos, bots publicando ganancias) y fechas límite ("¡la ventana se cierra esta noche!"). La defensa es hermosamente simple: ve más despacio. Las oportunidades reales sobreviven a un pensarlo bien de 48 horas. Cualquier cosa que te castiga por pausar a pensar nunca fue una oportunidad: fue una emboscada.',
 },
 {
 type: 'example',
 heading: 'Ejemplo: La Sudadera de $60 que Costó $95',
 body:
 'Lena, de 17 años, quiere una sudadera de $60. El pago ofrece "¡4 pagos fáciles de $15!": se siente básicamente gratis. Dos semanas después divide $80 de tenis, luego $48 de mercancía de un concierto. Ahora se traslapan tres planes: $47 se cargan automáticamente de su cuenta cada dos semanas, más de la mitad de su sueldo de medio tiempo. Cuando un pago rebota durante una semana floja de trabajo, le cobran un cargo por atraso de $10, un cargo por sobregiro de $32 de su banco y una advertencia en su cuenta. Su sudadera de "pagos fáciles" en efecto costó $95 (¡eso es 58% extra!), y las empresas de compra ahora, paga después cuentan exactamente con esta acumulación. Si no te lo puedes pagar hoy, cuatro pedazos de ello siguen siendo inalcanzables.',
 },
 {
 type: 'content',
 heading: 'La Regla de Oro (Tatúatela en el Cerebro)',
 body:
 'Aquí está: la regla que habría salvado a cada víctima de cada esquema de esta lección: nunca inviertas dinero que no puedas darte el lujo de perder, y nunca inviertas en algo que no entiendas. Dos partes, ambas obligatorias. Si perder el dinero arruinaría tus planes, no pertenece a nada arriesgado. Y si no puedes explicar cómo la cosa gana dinero en dos oraciones simples, no estás invirtiendo: estás donando a alguien que sí puede. ¿Con curiosidad sobre las criptomonedas algún día? Está bien: cantidades diminutas, ahorros completamente financiados primero, entendimiento total, cero dinero prestado. ¿Aburrido? Tal vez. Pero lo aburrido es como la gente de verdad se vuelve rica.',
 bullets: [
 'Parte 1: solo arriesga dinero cuya pérdida podrías tomarte completamente a la ligera',
 'Parte 2: si no puedes explicar cómo gana dinero, no lo compras',
 'El fondo de emergencia y los ahorros para metas van primero: siempre en cuentas aseguradas',
 'Invertir de forma lenta, diversificada y aburrida le gana a la exageración a largo plazo: cada estudio confiable está de acuerdo',
 ],
 },
 ],
 quiz: [
 {
 question: '¿Qué es una criptomoneda, en palabras simples?',
 options: [
 'Dinero digital registrado en una blockchain, no emitido ni asegurado por ningún gobierno ni banco',
 'Una cuenta de ahorros administrada por el gobierno',
 'Un tipo de acción que paga dividendos garantizados',
 'Fichas de arcade que funcionan en línea',
 ],
 answerIndex: 0,
 explanation:
 'Las criptomonedas son dinero digital rastreado en una blockchain (un libro de registro público y compartido) en lugar de por un banco, sin respaldo del gobierno. La tecnología es real, pero la mayoría de las monedas no tienen flujo de dinero detrás, así que los precios se mueven por pura oferta y demanda.',
 },
 {
 question: '¿Por qué las criptomonedas son un mal lugar para tu fondo de emergencia o tus ahorros para el auto?',
 options: [
 'Las cuentas de cripto cobran cuotas de mantenimiento mensuales',
 'Es demasiado difícil vender criptomonedas rápido',
 'Su alta volatilidad significa que el valor podría caer 20-50% justo antes de que necesites el dinero',
 'A los fondos de emergencia no se les permite crecer',
 ],
 answerIndex: 2,
 explanation:
 'El dinero que necesitas para una fecha límite no puede sobrevivir grandes cambios. Las criptomonedas han perdido repetidamente la mitad de su valor en meses, mientras que una cuenta de ahorros asegurada nunca baja. Ahorrar y especular son trabajos distintos para dólares distintos.',
 },
 {
 question: 'En un esquema de inflar y tirar, ¿quién termina perdiendo dinero?',
 options: [
 'Los de adentro que compraron temprano',
 'Los fans que compraron durante la euforia, justo antes de que los de adentro vendieran',
 'La blockchain misma',
 'Nadie: los precios siempre se recuperan',
 ],
 answerIndex: 1,
 explanation:
 'Los de adentro compran barato, fabrican euforia para inflar el precio y luego les venden sus monedas a los fans que compran en la cima. Cuando la venta desploma el precio, los compradores tardíos se quedan con las pérdidas: ese es todo el diseño del esquema.',
 },
 {
 question: '¿Qué significa la "ventaja de la casa" para las apps de apuestas deportivas y las cajas de botín?',
 options: [
 'Los jugadores con experiencia pueden voltear la ventaja a su favor',
 'La empresa iguala lo que sea que ganes',
 'Las probabilidades son justas porque las victorias y las pérdidas se equilibran para todos',
 'Las probabilidades están puestas matemáticamente para que la empresa siempre gane con el tiempo, lo que significa que los jugadores como grupo deben perder',
 ],
 answerIndex: 3,
 explanation:
 'La ventaja de la casa es una inclinación matemática incorporada: entre todos los jugadores y todas las apuestas, la empresa tiene garantizado salir ganando. Las victorias individuales pasan (son el anzuelo), pero mientras más juegas, más te desgasta la matemática.',
 },
 {
 question: '¿Cómo pueden los planes de compra ahora, paga después convertirse en una trampa de dinero?',
 options: [
 'Requieren un título universitario para usarse',
 'Acumular varios planes de pago "pequeños" suma una deuda real, y los pagos perdidos activan cargos por atraso y sobregiros',
 'Solo funcionan en compras de más de $500',
 'No pueden: dividir los pagos siempre es dinero gratis',
 ],
 answerIndex: 1,
 explanation:
 'Cada plan se siente diminuto, pero tres o cuatro que se traslapan pueden reclamar discretamente la mayor parte de un sueldo, y un pago rebotado puede convertirse en una bola de nieve de cargos por atraso y de sobregiro. Si no te lo puedes pagar hoy, cuatro pedazos de ello siguen siendo inalcanzables.',
 },
 {
 question: '¿Cuál es la regla de oro para las inversiones arriesgadas como las criptomonedas?',
 options: [
 'Invierte temprano y seguido en lo que sea que esté de moda',
 'Pide dinero prestado para que tus ganancias sean más grandes',
 'Nunca inviertas dinero que no puedas darte el lujo de perder, y nunca en cosas que no entiendas',
 'Solo invierte cuando un influencer en el que confías lo recomiende',
 ],
 answerIndex: 2,
 explanation:
 'Ambas mitades son obligatorias: arriesga solo dinero cuya pérdida no arruinaría tus planes, y ponlo solo en cosas que puedas explicar con palabras simples. Todo lo demás en esta lección (FOMO, promotores, ventajas de la casa) se derrota con esta única regla.',
 },
 ],
 },
 zh: {
 title: '加密货币与现代金钱陷阱',
 description:
 '获取关于加密货币不带炒作的真相，看穿病毒式金钱骗局背后的把戏，并建立起能守护你钱包一辈子的骗局雷达。',
 sections: [
 {
 type: 'intro',
 heading: '欢迎来到金钱的蛮荒西部',
 body:
 '你的信息流里满是这些：要"冲上月球"的币、炫耀租来的兰博基尼的网红、承诺轻松串关的博彩App，还有小声嘀咕"只要4笔轻松付款！"的结账按钮。这里面有些是真正的技术，有些是披着外衣的赌博，还有些干脆就是骗局。今天我们要给你装上雷达，让你能把创新和陷阱分开，把你的钱留在别人的口袋之外。',
 },
 {
 type: 'content',
 heading: '加密货币究竟是什么',
 body:
 '剥去炒作的外衣，加密货币就是一种不由任何政府或银行发行的数字货币。交易不是由银行来记账，而是记录在区块链（blockchain）上，一个被复制到成千上万台电脑上的、共享的公开账本，这让记录非常难以造假。Bitcoin是第一个；之后又冒出了成千上万种其他币。这项技术确实很巧妙。但问题在这儿：大多数加密货币背后没有现金流，没有租金、没有利润、没有利息。它的价格完全取决于下一个人愿意付多少，而这在一天之内就可能剧烈变化。',
 bullets: [
 '记录在区块链上的数字货币，一个共享的公开记录，而不是银行账本',
 '没有政府背书，而且在美国，如果交易所倒闭或你被黑，也没有FDIC保险',
 '大多数币的价格完全取决于下一个买家愿意付多少',
 '"是真正的技术"和"有真实的风险"可以同时成立',
 ],
 },
 {
 type: 'content',
 heading: '波动 vs. 储蓄：不是同一项运动',
 body:
 '波动指的是一个价格摆动得有多剧烈。储蓄账户像一部平缓的自动扶梯那样移动：慢、无聊、有保险、始终向上。加密货币则像一台没经过测试的过山车，Bitcoin曾多次在几个月内下跌超过50%，更小的币则跌到了归零。这就是为什么你需要用到的钱，应急基金、买车的存款、上大学的钱，永远都不该放进一个在返校节之前就可能损失一半价值的东西里。储蓄和投机是两项不同的运动，规则也不同。',
 bullets: [
 '储蓄账户：最高25万美元有保险，增长缓慢，从不下跌',
 '加密货币：可能在一天内上涨或暴跌20%，而且有些币再也回不来了',
 '你很快要用的钱就该放在储蓄里，没得商量',
 '如果有人说加密货币"就跟储蓄账户一样"，他要么错了，要么在撒谎',
 ],
 },
 {
 type: 'terms',
 heading: '识破陷阱的词汇',
 terms: [
 {
 term: '加密货币（cryptocurrency）',
 definition:
 '记录在区块链上而不是记在银行的数字货币，不由任何政府发行或背书。以价格大幅波动而闻名。',
 },
 {
 term: '波动性（volatility）',
 definition:
 '一个价格上下摆动的幅度和速度。高波动性意味着可能有大额收益，也可能有大额亏损。',
 },
 {
 term: '拉高出货（pump-and-dump）',
 definition:
 '一种骗局，内部人炒作某个资产以拉高它的价格，然后把自己手里的持仓倾销给买进来的粉丝，把价格砸崩。',
 },
 {
 term: '庄家优势（house edge）',
 definition:
 '一种内建的数学优势，保证赌场、博彩App和开箱（loot box）长期都能盈利，也就是说玩家作为一个整体注定要输。',
 },
 {
 term: 'FOMO',
 definition:
 '害怕错过（fear of missing out），因为看起来别人都在赢而焦虑地想冲进去的冲动。骗子最爱当武器用的头号情绪。',
 },
 {
 term: '先买后付（BNPL）',
 definition:
 '把一笔消费拆成几期的结账方案。它们感觉像免费的，但叠加的方案和滞纳金会悄悄变成实实在在的债务。',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Kayla攒了800美元，准备6个月后买一辆她需要的车。一个朋友让她把这钱全押进一个火爆的新币。这个计划最大的问题是什么？',
 options: [
 '加密货币App太难下载了',
 '这个币很可能在她需要用钱之前就跌掉50%，为近期需求准备的存款不该拿去赌',
 '她得为它额外缴FICA税',
 '没问题，币最终总会反弹',
 ],
 answerIndex: 1,
 explanation:
 '波动性就是那个致命伤：她有截止期限、必须要用的钱，不能押在一个几周内就可能暴跌20-50%的东西上，而且不，币并不总会回来。储蓄和投机是两项不同的运动，她的购车基金属于储蓄。',
 },
 },
 {
   type: 'video',
   heading: '观看：“快速致富”永远是破绽',
   body:
     '看看这个 BFF 短视频，弄清加密货币到底是什么，以及围绕它的那些陷阱怎么运作。注意，视频中途会暂停提问，认真看哦！',
   videoId: 'q-IzijaDfZI',
   source: 'BFF Classroom',
   questions: [
     {
       at: 62,
       question:
         '大多数加密货币的价格实际上靠什么支撑？',
       options: [
         '资产本身带来的租金、利润或利息',
         '下一个人愿意出多少钱',
         '政府的担保',
         '运行它的电脑的成本',
       ],
       answerIndex: 1,
       explanation:
         '区块链技术本身确实巧妙，但 Alvin 指出的关键是：大多数加密货币背后没有现金流。没有租金、没有利润、没有利息，价格完全取决于下一个买家。',
     },
     {
       at: 100,
       question:
         '你真正需要用的钱应该放在哪里？',
       options: [
         '放进加密货币，博更高回报',
         '放在几周内不会腰斩的地方',
         '在储蓄和加密货币之间对半分',
         '放进去年涨得最多的那个',
       ],
       answerIndex: 1,
       explanation:
         '比特币曾多次在几个月内跌超 50%，还有很多小币归零后再也没回来。储蓄和投机是两回事，不该套用同一套规则。',
     },
     {
       at: 130,
       question:
         '网上有人催你“趁早”买某个币。这多半是怎么回事？',
       options: [
         '你发现了真正的机会',
         '你是他们的出货对象，而不是早期买家',
         '这个币快要被监管了',
         '他们想和你分摊手续费',
       ],
       answerIndex: 1,
       explanation:
         '在拉高出货（pump and dump）里，内部人先把价格炒上去，再把自己手里的货卖给相信他们的人。用 Alvin 的话说，如果陌生人催你“趁早进场”，你多半是他们的出口。',
     },
     {
       at: 155,
       question:
         '哪一条规则几乎能覆盖以上所有情况？',
       options: [
         '只投你能讲明白的东西',
         '凡是承诺保本、快速或无风险回报的，都是在向你推销东西',
         '18 岁之前不要投资',
         '永远选广告上回报最高的',
       ],
       answerIndex: 1,
       explanation:
         '真正的投资又慢又无聊，而又慢又无聊往往才是有效的。博彩 App 靠的是庄家优势：玩得够多，庄家赢是数学上的必然，而不只是通常如此。',
     },
   ],
 },

 {
 type: 'content',
 heading: '"快速致富"永远是一面红旗',
 body:
 '把这个刻进你的脑子里：真正的财富慢慢复利增长，所以任何承诺又快、又轻松、又有保证的钱的人都在卖东西，而被卖的通常就是你。"保证10倍！""……趁还不算太晚！""所有人都在进场！"这些话都是精心制造出来的压力。而带货的网红就是它的现代版本：那个炒作某个币的创作者，往往是被付了钱去推广的，或者早早买了进去、指望着你的购买去拉高他的价格。当他们卖出时，他们一定会卖，粉丝们就接住了那场暴跌。如果一个陌生人真有一台保证赚钱的机器，他不会把它发到TikTok上。',
 bullets: [
 '应该触发你警报的词："保证"、"不会亏"、"马上行动"、"秘密方法"',
 '紧迫感是一件武器：真正的机会不会在24小时内到期',
 '问问如果你买了谁会赚钱，碰上被付钱的带货者，答案是他们，不是你',
 '如果听起来好得不真实，那它就是不真实。每一次。没有例外',
 ],
 },
 {
 type: 'example',
 heading: '例子：那枚坠毁的200美元火箭',
 body:
 '16岁的Devon看到一个游戏网红在炒作"MoonRocketCoin，100倍就要来了，这不是投资建议"。评论区满是晒收益的人。Devon把200美元的割草钱以每枚0.40美元投了进去。两天内它涨到了0.55美元，他赚了37%，觉得自己是个天才！Devon看不到的是：那个网红和内部人以每枚0.02美元买了几百万枚币，正趁着这股热潮在抛售。一周后这个币停在0.03美元，网红把视频删了，Devon的200美元只值15美元了。这就是拉高出货（pump-and-dump），而它的各种版本早在加密货币出现之前很久就有人在玩了。',
 },
 {
 type: 'content',
 heading: '庄家永远赢：博彩与开箱',
 body:
 '体育博彩App和电子游戏开箱靠的是同一台引擎：庄家优势。每一局游戏在数学上都被做了倾斜，好让公司在所有玩家中间必定占上风，那些广告就是这么付得起的。个人赢钱当然会发生（那正是鱼钩！），但数学会随着时间把每个人一点点磨下去。博彩App甚至用彩带庆祝你的胜利，好让你继续玩。开箱是同一套心理学的缩小版：花5美元买一次抽到稀有皮肤的机会，而概率悄悄保证了游戏公司稳赚。偶尔赢一次是诱饵，那个优势才是陷阱。',
 bullets: [
 '庄家优势意味着概率被设定成让公司长期总是盈利',
 '5%的优势听起来微不足道，但每周下注50美元，平均算下来一年要亏大约130美元，运气差的连串下来还会糟糕得多',
 '赢的时刻被设计得感觉超爽，好让你继续玩，彩带不是你的朋友',
 '开箱是瞄准你这个年龄段玩家的赌博机制；许多国家像监管赌场一样监管它们',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '一个网红发帖："这个币保证在周五前涨50倍，我的粉丝全都进场了！链接在简介里，别错过！！"这里有哪些红旗？',
 options: [
 '没有，粉丝晒收益就是它管用的证明',
 '只有表情符号的用法',
 '"币"这个字，其他一切都是正常营销',
 '"保证"的回报、极端的紧迫感，以及一个你买了就能获利的人在炒作，一整套拉高出货的入门套装',
 ],
 answerIndex: 3,
 explanation:
 '你把三样都揪出来了！投资里没有任何东西是有保证的，紧迫感的存在就是为了不让你思考，而一个从你的购买中获益的推广者给的不是建议，那是广告。那条帖子就是一场拉高出货的解剖图。',
 },
 },
 {
 type: 'content',
 heading: 'FOMO：针对你大脑的漏洞',
 body:
 '为什么聪明人会掉进明显的陷阱？FOMO，害怕错过。你的大脑天生就会去模仿人群，而且害怕失去一个机会甚于害怕失去金钱。骗子们知道这一点，所以他们制造出人群（假评论、晒收益的机器人）和截止期限（"窗口今晚关闭！"）。防御的办法简单得漂亮：慢下来。真正的机会经得起48小时的深思熟虑。任何因为你停下来想一想就惩罚你的东西，从来都不是机会，那是一场埋伏。',
 },
 {
 type: 'example',
 heading: '例子：那件花了95美元的60美元连帽衫',
 body:
 '17岁的Lena想要一件60美元的连帽衫。结账时提供"4笔轻松付款，每笔15美元！"，感觉基本上跟免费似的。两周后她又把80美元的球鞋分了期，接着是48美元的演唱会周边。现在三个方案重叠在一起：每两周有47美元从她账户里自动扣走，超过了她兼职工资的一半。当某笔付款在一个工作清淡的周里跳票时，她被收了10美元滞纳金、来自她银行的32美元透支费，账户上还挂了一条警告。她那件"轻松付款"的连帽衫实际上花了95美元（那可是多出58%！），而先买后付公司正是指望着这种叠加。如果你今天付不起它，把它切成四份仍然是付不起。',
 },
 {
 type: 'content',
 heading: '黄金法则（把它刺在你的脑子上）',
 body:
 '就是它了，这条法则本可以拯救这节课里每一个骗局的每一个受害者：永远不要投入你亏不起的钱，也永远不要投资任何你不理解的东西。两个部分，都是必须的。如果亏掉这笔钱会毁掉你的计划，它就不该放进任何有风险的东西里。而如果你没法用两句大白话解释这东西是怎么赚钱的，你就不是在投资，你是在给一个能解释清楚的人捐款。哪天对加密货币好奇了？可以：极小的金额、先把储蓄填满、完全理解、绝不借钱。无聊？也许吧。但无聊正是人们真正致富的方式。',
 bullets: [
 '第一部分：只拿那些亏了也能完全一笑而过的钱去冒险',
 '第二部分：如果你没法解释它是怎么赚钱的，你就不买它',
 '应急基金和目标储蓄排在最前面，永远放在有保险的账户里',
 '缓慢、分散、无聊的投资长期下来胜过炒作，每一项可靠的研究都同意这一点',
 ],
 },
 ],
 quiz: [
 {
 question: '用大白话说，加密货币是什么？',
 options: [
 '记录在区块链上的数字货币，不由任何政府或银行发行或承保',
 '一个由政府运营的储蓄账户',
 '一种支付有保证分红的股票',
 '一种能在网上使用的游戏机代币',
 ],
 answerIndex: 0,
 explanation:
 '加密货币是记录在区块链上（一个共享的公开账本）而不是记在银行的数字货币，没有政府背书。技术是真的，但大多数币背后没有现金流，所以价格完全靠供需摆动。',
 },
 {
 question: '为什么加密货币是存放你的应急基金或购车存款的糟糕地方？',
 options: [
 '加密货币账户每月收取维护费',
 '加密货币太难快速卖出了',
 '它的高波动性意味着价值可能在你正需要用钱之前就跌掉20-50%',
 '应急基金不被允许增长',
 ],
 answerIndex: 2,
 explanation:
 '你有截止期限、必须要用的钱经不起大幅波动。加密货币曾一再在几个月内损失一半价值，而一个有保险的储蓄账户从不下跌。储蓄和投机是不同的钱该干的不同的活。',
 },
 {
 question: '在一场拉高出货的骗局里，最后是谁在亏钱？',
 options: [
 '早早买进的内部人',
 '在热潮中买入、恰好赶在内部人卖出之前的粉丝',
 '区块链本身',
 '没人，价格总会恢复',
 ],
 answerIndex: 1,
 explanation:
 '内部人低价买进，制造热潮来拉高价格，然后在高位把币倾销给买进来的粉丝。当抛售把价格砸崩时，晚进场的买家接住了亏损，这就是整个骗局的设计。',
 },
 {
 question: '对体育博彩App和开箱来说，"庄家优势"意味着什么？',
 options: [
 '有经验的玩家可以把优势翻转到自己这边',
 '你赢多少公司就配多少',
 '概率是公平的，因为对所有人来说输赢会相互抵消',
 '概率在数学上被设定成让公司长期总是盈利，也就是说玩家作为一个整体注定要输',
 ],
 answerIndex: 3,
 explanation:
 '庄家优势是一种内建的数学倾斜：在所有玩家和所有下注中间，公司稳赢。个人赢钱会发生，那是鱼钩，但你玩得越久，数学就把你磨得越狠。',
 },
 {
 question: '先买后付方案怎么会变成一个金钱陷阱？',
 options: [
 '使用它们需要大学学位',
 '把好几个"小额"付款方案叠在一起会累成实实在在的债务，而错过付款会触发滞纳金和透支',
 '它们只对500美元以上的消费有效',
 '不会，分期付款永远是免费的钱',
 ],
 answerIndex: 1,
 explanation:
 '每个方案感觉都微不足道，但三四个重叠在一起就可能悄悄占去一份工资的大部分，而一次跳票的付款就可能滚成滞纳金和透支费的雪球。如果你今天付不起它，把它切成四份仍然是付不起。',
 },
 {
 question: '对加密货币这类高风险投资来说，黄金法则是什么？',
 options: [
 '尽早并频繁地投资任何正在流行的东西',
 '借钱好让你的收益更大',
 '永远不要投入你亏不起的钱，也永远不要投资你不理解的东西',
 '只在你信任的网红推荐时才投资',
 ],
 answerIndex: 2,
 explanation:
 '两半都是必须的：只拿那些亏了也不会毁掉你计划的钱去冒险，而且只把它投进你能用大白话解释清楚的东西里。这节课里其他的一切，FOMO、带货者、庄家优势，都被这一条法则打败。',
 },
 ],
 },
}

export default lesson
