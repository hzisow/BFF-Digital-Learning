import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'crypto-and-scams',
  week: 5,
  day: 5,
  title: 'Crypto & Modern Money Traps',
  emoji: '🪙',
  description:
    'Get the no-hype truth about crypto, spot the tricks behind viral money schemes, and build the scam radar that protects your wallet for life.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'Welcome to the Wild West of Money',
      body:
        "Your feed is full of it: coins going 'to the moon,' influencers flashing rented Lamborghinis, betting apps promising easy parlays, and checkout buttons whispering 'only 4 easy payments!' Some of this is real technology, some is gambling in a costume, and some is straight-up scam. Today we're building your radar — so you can tell innovation from trap, and keep your money out of other people's pockets. 🛰️",
    },
    {
      type: 'content',
      heading: 'What Cryptocurrency Actually Is',
      body:
        "Strip away the hype and cryptocurrency is digital money that isn't issued by any government or bank. Instead of a bank keeping the records, transactions are tracked on a blockchain — a shared public ledger copied across thousands of computers, which makes the record very hard to fake. Bitcoin was the first; thousands of others followed. The tech is genuinely clever. But here's the catch: most crypto has no cash flow behind it — no rent, no profits, no interest. Its price is purely what the next person will pay, and that can change violently in a day.",
      bullets: [
        'Digital money tracked on a blockchain — a shared public record, not a bank ledger',
        'No government backing and, in the U.S., no FDIC insurance if an exchange fails or you get hacked',
        "Most coins' prices rest entirely on what the next buyer will pay",
        'Real technology AND real risk can be true at the same time',
      ],
    },
    {
      type: 'content',
      heading: 'Volatility vs. Saving: Not the Same Sport',
      body:
        "Volatility means how wildly a price swings. A savings account moves like a calm escalator: slow, boring, insured, always upward. Crypto moves like an untested rollercoaster — Bitcoin has dropped more than 50% in a few months multiple times, and smaller coins have gone to zero. That's why money you NEED — emergency fund, car savings, college money — never belongs in something that can lose half its value before homecoming. Saving and speculating are different sports with different rules.",
      bullets: [
        'Savings account: insured up to $250,000, grows slowly, never drops',
        'Crypto: can rise or crash 20% in a single day — and some coins never recover',
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
            'A scheme where insiders hype an asset to pump up its price, then dump their own holdings on the fans who bought in — crashing the price.',
        },
        {
          term: 'House edge',
          definition:
            'The built-in mathematical advantage that guarantees casinos, betting apps, and loot boxes profit over time — meaning players, as a group, must lose.',
        },
        {
          term: 'FOMO',
          definition:
            'Fear of missing out — the anxious urge to jump in because everyone else seems to be winning. The #1 emotion scammers weaponize.',
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
          'The coin could easily drop 50% before she needs the money — savings for near-term needs should not be gambled',
          'She would owe extra FICA taxes on it',
          'Nothing — coins always bounce back eventually',
        ],
        answerIndex: 1,
        explanation:
          "Exactly. Volatility is the dealbreaker: money she NEEDS on a deadline cannot ride something that can crash 20-50% in weeks — and no, coins do not always come back. Savings and speculation are different sports, and her car fund belongs in savings.",
      },
    },
    {
      type: 'content',
      heading: '"Get Rich Quick" Is Always a Red Flag',
      body:
        "Burn this into your brain: real wealth compounds slowly, so anyone promising fast, easy, guaranteed money is selling something — and it's usually you. 'Guaranteed 10x!' '. . . before it's too late!' 'Everyone is getting in!' These phrases are engineered pressure. And influencer shills are the modern version: that creator hyping a coin was often paid to promote it, or bought early hoping YOUR purchase pumps their price. When they sell — and they do — the fans hold the crash. If a stranger truly had a guaranteed money machine, they would not be sharing it on TikTok.",
      bullets: [
        "Words that should trigger your alarm: 'guaranteed,' 'can't lose,' 'act now,' 'secret method'",
        'Urgency is a weapon: real opportunities do not expire in 24 hours',
        'Ask who profits if you buy — with paid shills, the answer is them, not you',
        'If it sounds too good to be true, it is. Every time. No exceptions',
      ],
    },
    {
      type: 'example',
      heading: 'Example: The $200 Rocket That Crashed',
      body:
        "Devon, 16, sees a gaming influencer hyping 'MoonRocketCoin — 100x incoming, NOT financial advice 😉.' Comments are full of people posting gains. Devon puts in $200 of lawn-mowing money at $0.40 per coin. It jumps to $0.55 in two days — he's up 37% and feels like a genius! What Devon can't see: the influencer and insiders bought millions of coins at $0.02 and are selling into the hype. A week later the coin sits at $0.03, the influencer has deleted the video, and Devon's $200 is worth $15. That's a pump-and-dump — and versions of it have been run since long before crypto existed. 📉",
    },
    {
      type: 'content',
      heading: 'The House Always Wins: Betting & Loot Boxes',
      body:
        "Sports betting apps and video game loot boxes run on the same engine: the house edge. Every game is mathematically tilted so that, across all players, the company MUST come out ahead — that's how they afford those ads. Individual wins absolutely happen (that's the hook!), but the math grinds everyone down over time. Betting apps even celebrate your wins with confetti to keep you playing. Loot boxes are the same psychology in miniature: pay $5 for a chance at a rare skin, and the odds quietly guarantee the game company profits. An occasional win is the bait — the edge is the trap.",
      bullets: [
        'House edge means the odds are set so the company always profits over time',
        'A 5% edge sounds tiny, but bet $50 weekly and it averages out to losing about $130 per year — and streaks can be far worse',
        'Wins are engineered to feel amazing so you keep playing — confetti is not your friend',
        'Loot boxes are gambling mechanics aimed at players your age; many countries regulate them like casinos',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "An influencer posts: 'This coin is GUARANTEED to 50x by Friday — my followers are all in! Link in bio, don't miss out!!' What are the red flags?",
        options: [
          'None — followers posting gains is proof it works',
          'Only the emoji use',
          "The word 'coin' — everything else is normal marketing",
          "'Guaranteed' returns, extreme urgency, and hype from someone who profits if you buy — the full pump-and-dump starter pack",
        ],
        answerIndex: 3,
        explanation:
          "You spotted all three! Nothing in investing is guaranteed, urgency exists to stop you from thinking, and a promoter who benefits from your purchase is not advice — it is an ad. That post is the anatomy of a pump-and-dump.",
      },
    },
    {
      type: 'content',
      heading: 'FOMO: The Hack for Your Brain',
      body:
        "Why do smart people fall for obvious traps? FOMO — fear of missing out. Your brain is wired to copy the crowd and to fear losing a chance more than it fears losing money. Scammers know this, so they manufacture crowds (fake comments, bots posting gains) and deadlines ('window closes tonight!'). The defense is beautifully simple: slow down. Real opportunities survive a 48-hour think-it-over. Anything that punishes you for pausing to think was never an opportunity — it was an ambush. 🧠",
    },
    {
      type: 'example',
      heading: 'Example: The $60 Hoodie That Cost $95',
      body:
        "Lena, 17, wants a $60 hoodie. Checkout offers '4 easy payments of $15!' — feels basically free. Two weeks later she splits $80 of sneakers, then $48 of concert merch. Now three plans overlap: $47 is auto-drafting from her account every two weeks, more than half her part-time paycheck. When a payment bounces during a slow work week, she gets a $10 late fee, a $32 overdraft fee from her bank, and a warning on her account. Her 'easy payments' hoodie effectively cost $95 (that's 58% extra!) — and BNPL companies count on exactly this stacking. If you cannot afford it today, four slices of it are still unaffordable. 🧾",
    },
    {
      type: 'content',
      heading: 'The Golden Rule (Tattoo This on Your Brain)',
      body:
        "Here it is — the rule that would have saved every victim of every scheme in this lesson: never invest money you can't afford to lose, and never invest in anything you don't understand. Two parts, both mandatory. If losing the money would wreck your plans, it doesn't belong in anything risky. And if you can't explain how the thing makes money in two plain sentences, you're not investing — you're donating to someone who can. Curious about crypto someday? Fine: tiny amounts, fully-funded savings first, full understanding, zero borrowed money. Boring? Maybe. But boring is how people actually get rich.",
      bullets: [
        "Part 1: only risk money whose loss you could shrug off completely",
        "Part 2: if you can't explain how it makes money, you don't buy it",
        'Emergency fund and goal savings come first — always in insured accounts',
        'Slow, diversified, boring investing beats hype in the long run — every reliable study agrees',
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
        'Crypto is digital money tracked on a blockchain — a shared public ledger — instead of by a bank, with no government backing. The technology is real, but most coins have no cash flow behind them, so prices swing on pure supply and demand.',
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
        'Nobody — prices always recover',
      ],
      answerIndex: 1,
      explanation:
        'Insiders buy cheap, manufacture hype to pump the price, then dump their coins on the fans buying in at the top. When the selling crashes the price, the late buyers hold the losses — that is the entire design of the scheme.',
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
        'The house edge is a built-in mathematical tilt: across all players and all bets, the company is guaranteed to come out ahead. Individual wins happen — they are the hook — but the longer you play, the more the math grinds you down.',
    },
    {
      question: 'How can buy-now-pay-later plans become a money trap?',
      options: [
        'They require a college degree to use',
        'Stacking several "small" payment plans adds up to real debt, and missed payments trigger late fees and overdrafts',
        'They only work on purchases over $500',
        'They cannot — splitting payments is always free money',
      ],
      answerIndex: 1,
      explanation:
        'Each plan feels tiny, but three or four overlapping ones can quietly claim most of a paycheck — and one bounced payment can snowball into late fees and overdraft charges. If you cannot afford it today, four slices of it are still unaffordable.',
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
        'Both halves are mandatory: risk only money whose loss would not wreck your plans, and only put it in things you can explain in plain words. Everything else in this lesson — FOMO, shills, house edges — is defeated by this one rule.',
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
          'Tu feed está lleno de eso: monedas que van "a la luna", influencers presumiendo Lamborghinis rentados, apps de apuestas prometiendo combinadas fáciles y botones de pago que susurran "¡solo 4 pagos fáciles!". Algo de esto es tecnología real, algo es apuesta disfrazada y algo es pura estafa. Hoy vamos a construir tu radar, para que puedas distinguir la innovación de la trampa y mantener tu dinero fuera de los bolsillos de otros. 🛰️',
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
            'Exacto. La volatilidad es el problema decisivo: el dinero que NECESITA para una fecha límite no puede montarse en algo que puede desplomarse 20-50% en semanas, y no, las monedas no siempre regresan. Ahorrar y especular son deportes distintos, y su fondo para el auto pertenece a los ahorros.',
        },
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
          'Devon, de 16 años, ve a un influencer de videojuegos exagerando "MoonRocketCoin: viene un 100x, NO es consejo financiero 😉". Los comentarios están llenos de gente publicando ganancias. Devon mete $200 de su dinero de cortar el césped a $0.40 por moneda. Sube a $0.55 en dos días: ¡va ganando 37% y se siente un genio! Lo que Devon no puede ver: el influencer y los de adentro compraron millones de monedas a $0.02 y las están vendiendo aprovechando la euforia. Una semana después la moneda está a $0.03, el influencer borró el video y los $200 de Devon valen $15. Eso es inflar y tirar (pump-and-dump), y versiones de esto se han hecho desde mucho antes de que existieran las criptomonedas. 📉',
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
          '¿Por qué la gente inteligente cae en trampas obvias? FOMO: el miedo a quedarse afuera. Tu cerebro está programado para copiar a la multitud y para temer perder una oportunidad más de lo que teme perder dinero. Los estafadores lo saben, así que fabrican multitudes (comentarios falsos, bots publicando ganancias) y fechas límite ("¡la ventana se cierra esta noche!"). La defensa es hermosamente simple: ve más despacio. Las oportunidades reales sobreviven a un pensarlo bien de 48 horas. Cualquier cosa que te castiga por pausar a pensar nunca fue una oportunidad: fue una emboscada. 🧠',
      },
      {
        type: 'example',
        heading: 'Ejemplo: La Sudadera de $60 que Costó $95',
        body:
          'Lena, de 17 años, quiere una sudadera de $60. El pago ofrece "¡4 pagos fáciles de $15!": se siente básicamente gratis. Dos semanas después divide $80 de tenis, luego $48 de mercancía de un concierto. Ahora se traslapan tres planes: $47 se cargan automáticamente de su cuenta cada dos semanas, más de la mitad de su sueldo de medio tiempo. Cuando un pago rebota durante una semana floja de trabajo, le cobran un cargo por atraso de $10, un cargo por sobregiro de $32 de su banco y una advertencia en su cuenta. Su sudadera de "pagos fáciles" en efecto costó $95 (¡eso es 58% extra!), y las empresas de compra ahora, paga después cuentan exactamente con esta acumulación. Si no te lo puedes pagar hoy, cuatro pedazos de ello siguen siendo inalcanzables. 🧾',
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
}

export default lesson
