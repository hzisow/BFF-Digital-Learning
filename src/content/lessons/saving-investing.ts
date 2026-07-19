import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'saving-investing',
  week: 2,
  day: 1,
  title: 'Saving & Investing',
  emoji: '📈',
  description:
    'How to build wealth over time, put your money in the right places, and understand the power of time in compound growth.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Building Wealth Over Time',
      body:
        "Quick warm-up: what's something big you'd like to afford one day, and how long do you think it would take to save for it? A car? College? A trip? Keep that goal in mind, because today is all about how to actually get there. We'll cover saving vs. investing, the magic of compounding, and where to put your money.",
    },
    {
      type: 'content',
      heading: 'Saving vs. Investing: Not the Same Thing!',
      body:
        "Contrary to popular belief, saving and investing are not the same. Saving means putting money aside in a safe place for short-term or emergency needs, like stashing cash in a savings account for a new phone. There's no chance of losing that money. Investing means putting money into assets with the goal of long-term growth, like buying stocks or mutual funds for retirement.",
      bullets: [
        'Saving: low risk, low return, great for emergencies and short-term goals',
        'Investing: medium-to-high risk, higher return, great for long-term goals',
        'There are even subsets of investing, like day-trading, which follows daily stock market patterns',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Sean is a 1st grader. His parents consistently set aside money to pay for his education years from now. Is this saving or investing?',
        options: [
          'Saving, because they are being careful',
          'Investing, because it is money put toward long-term growth for a far-off goal',
          'Neither, because Sean is too young',
          'Both are exactly the same thing',
        ],
        answerIndex: 1,
        explanation:
          "Nice thinking! Because Sean's education is many years away, money set aside for it is aimed at long-term growth, which makes it investing. Saving is for short-term or emergency needs. And remember, saving and investing are definitely not the same thing!",
      },
    },
    {
      type: 'terms',
      heading: 'Interest, APR, and Compounding',
      terms: [
        {
          term: 'Interest',
          definition:
            'The rate paid for money on deposit. For example, 3% interest on a $1,000 deposit earns you $30.',
        },
        {
          term: 'APR (Annual Percentage Rate)',
          definition: 'Interest expressed as a yearly rate.',
        },
        {
          term: 'Compound Interest',
          definition:
            'Interest earned on top of interest. Your money grows by more and more each year, making it one of the easiest ways to build wealth.',
        },
        {
          term: 'Time Value of Money',
          definition:
            'The idea that a dollar is worth more now than in the future, because of inflation and the ability to earn interest starting today.',
        },
      ],
    },
    {
      type: 'example',
      heading: 'Compounding in Action: Meet Joe',
      body:
        "Joe earns 5% APR on his $10,000 deposit. Year 1: $10,000 x 1.05 = $10,500, a gain of $500. Year 2: $10,500 x 1.05 = $11,025, a gain of $525. Year 3: $11,025 x 1.05 = $11,576.25, a gain of $551.25. Notice how each year's gain is bigger than the last? That's compounding: interest earning interest. Joe didn't lift a finger.",
    },
    {
      type: 'content',
      heading: 'The Key to Compounding Is Time',
      body:
        "The more time you have, the more money you can make. That's why starting young is basically a superpower. Here are two strategies that make compounding work for you automatically.",
      bullets: [
        'Pay Yourself First: take a small portion of every paycheck and invest it before you spend anything (remember the 50/30/20 rule!)',
        'Dollar Cost Averaging (DCA): purchase a set dollar amount of a stock consistently, like buying $50 of AMZN every month, no matter the price',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Joe deposits $10,000 at 5% APR with compound interest. Why does he earn MORE than $500 in year 2?',
        options: [
          'The bank feels generous in year 2',
          'His APR automatically doubles every year',
          'He earns interest on his original deposit plus the interest from year 1',
          'He does not earn more; compound interest pays the same amount every year',
        ],
        answerIndex: 2,
        explanation:
          "Exactly! After year 1, Joe's balance is $10,500, so year 2's 5% applies to that bigger number, earning him $525 instead of $500. Interest earning interest is the whole magic trick of compounding, and it snowballs the longer you leave it alone.",
      },
    },
    {
      type: 'video',
      heading: 'Watch: Compound Interest in Action',
      body:
        'Want to see the math behind the magic? Watch Khan Academy walk through exactly how compounding snowballs. The video will pause and quiz you — no skipping ahead!',
      videoId: 'Rm6UdfRs3gw',
      source: 'Khan Academy',
      questions: [
        {
          at: 95,
          question:
            'You deposit $100 at 10% interest, compounded yearly. After year 1 you have $110. About how much after year 2?',
          options: ['$120', '$121', '$130', '$110 — it stays the same'],
          answerIndex: 1,
          explanation:
            "Year 2's 10% applies to the whole $110 — not just your original $100 — so you earn $11 and land on $121. That extra dollar is interest earning interest, and it grows every single year.",
        },
        {
          at: 240,
          question: 'What makes compound interest different from simple interest?',
          options: [
            'Compound interest only works at big banks',
            'With compounding, you earn interest on your interest — not just on what you deposited',
            'Simple interest grows faster over time',
            'There is no difference, just different names',
          ],
          answerIndex: 1,
          explanation:
            'Simple interest pays on your original deposit only, forever. Compounding pays on your deposit PLUS everything it has already earned — which is why it starts slow and then explodes over the years.',
        },
      ],
    },
    {
      type: 'content',
      heading: 'Where Should You Put Your Money?',
      body:
        "There are several different types of accounts and investments, and which ones you use depends on your goals and your financial situation. (Remember the SMART goal strategy? It will help you decide.) The main options include stocks, mutual funds and ETFs, bonds, savings accounts, retirement accounts like 401(k)s, and education plans. Let's tour each one.",
    },
    {
      type: 'content',
      heading: 'Stocks',
      body:
        "Stocks are shares of publicly-traded companies. When you buy a company's stock, you become a partial owner of that company. Pretty cool, right? Stocks can be high or low risk depending on the company.",
      bullets: [
        'A stock index is a hypothetical segment of the stock market, like the NASDAQ or Dow Jones',
        'The S&P 500, a stock index, averages about 10% returns year over year',
        'Capital gains are profits from selling an investment for more than you paid',
        'Dividends are portions of profits paid to shareholders directly from the company',
      ],
    },
    {
      type: 'content',
      heading: 'Mutual Funds, ETFs, and Bonds',
      body:
        'Mutual funds and ETFs are "baskets" of different stocks. An energy fund, for example, can include a wide range of energy companies. Baskets are generally lower risk than individual stocks because they give you diversification: spreading your investments across the market. Bonds are a lending investment where you loan money to a company or government and earn interest payments in return.',
      bullets: [
        'Mutual funds are managed by a professional fund manager, but charge an annual fee',
        "ETFs don't charge an annual fee, but they are not professionally managed",
        'Bonds come in types like corporate, treasury, and municipal',
        'Bonds have credit ratings; risky bonds can default, meaning the borrower does not pay its debt back',
      ],
    },
    {
      type: 'content',
      heading: 'Savings Accounts, Retirement Accounts, and 529s',
      body:
        "Savings accounts are bank accounts for money you don't plan to spend right away. They usually limit monthly withdrawals but pay you compounding interest in return. For retirement, 401(k)s (employer-sponsored) and IRAs (not employer-sponsored) invest monthly contributions from your paycheck into the market. And 529 plans are college savings accounts that grow over time with consistent investment.",
      bullets: [
        'High-Yield Savings Accounts (HYSAs) average 4-5% APR, while traditional savings accounts average just 0.1-0.3% APR',
        'Traditional 401(k)s and IRAs are tax-deferred: you contribute pre-tax dollars, then pay taxes on withdrawal',
        'Roth 401(k)s and IRAs flip it: you pay with after-tax dollars, but withdrawals are not taxed',
        'You can start a 529 plan at any time, but money not used for education gets hit with a 10% tax, which is huge',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You want to invest but individual stocks feel too risky. Which option spreads your money across many companies at once?',
        options: [
          'A payday loan',
          'A single share of one company',
          'A traditional savings account',
          'A mutual fund or ETF',
        ],
        answerIndex: 3,
        explanation:
          'You got it! Mutual funds and ETFs are "baskets" of many stocks, giving you diversification, which spreads your investments across the market and lowers your risk compared to betting on a single company. Fund managers run mutual funds for a fee; ETFs skip the fee and the manager.',
      },
    },
    {
      type: 'example',
      heading: 'Wolf of Wall Street! (Class Game)',
      body:
        "In class, this lesson comes with a game. You get a $1,000 budget to \"invest\" in 3 stocks of your choice, deciding how many shares of each to buy based on their past performance. At the end of the presentation, everyone checks how their picks did and tallies up their winnings (or losses). It's a fun, zero-risk way to feel what real investing decisions are like: analyzing performance, diversifying, and living with the results.",
    },
    {
      type: 'content',
      heading: 'Wrapping Up',
      body:
        "Big ideas from today: saving is safe and short-term, investing is riskier but grows your money long-term, and compound interest plus time is the easiest wealth-building combo there is. Pay yourself first, diversify, and match the account to the goal. Jot down a quick summary of what clicked and what you want to review. Next session: Credit and Debt!",
    },
  ],
  quiz: [
    {
      question: 'What is the main difference between saving and investing?',
      options: [
        'Saving is putting money in a safe place for short-term needs; investing is putting money into assets for long-term growth',
        'Saving earns higher returns than investing',
        'Investing has no risk, while saving is risky',
        'They are the same thing with different names',
      ],
      answerIndex: 0,
      explanation:
        'Saving is low risk and low return, perfect for emergencies and short-term goals. Investing carries medium-to-high risk but offers higher returns, making it the tool for long-term goals like retirement.',
    },
    {
      question:
        'Joe deposits $10,000 at 5% APR with compound interest. About how much does he have after 2 years?',
      options: ['$10,500', '$11,000', '$11,025', '$12,000'],
      answerIndex: 2,
      explanation:
        'Year 1: $10,000 x 1.05 = $10,500. Year 2: $10,500 x 1.05 = $11,025. Compound interest means year 2 earns interest on the interest from year 1, which is why the gain grows from $500 to $525.',
    },
    {
      question: 'What does "Pay Yourself First" mean?',
      options: [
        'Buy yourself a treat before paying any bills',
        'Take a small portion of every paycheck and invest it before spending on anything else',
        'Pay off all your debts before ever saving',
        'Ask your employer to pay you before your coworkers',
      ],
      answerIndex: 1,
      explanation:
        'Pay Yourself First means setting aside part of every paycheck for saving and investing before you spend a dime, so your future always gets funded. It pairs perfectly with the 50/30/20 rule.',
    },
    {
      question: 'What is a dividend?',
      options: [
        'The fee a mutual fund manager charges each year',
        'The profit you make from selling a stock at a higher price',
        'A loan you make to a government',
        'A portion of company profits paid directly to shareholders',
      ],
      answerIndex: 3,
      explanation:
        'Dividends are portions of profits a company pays to its shareholders. Capital gains, by contrast, are profits you earn from selling an investment for more than you paid.',
    },
    {
      question: 'How is an ETF different from a mutual fund?',
      options: [
        'An ETF holds only one stock, while a mutual fund holds many',
        "An ETF doesn't charge an annual fee but isn't professionally managed; a mutual fund is professionally managed but charges a fee",
        'An ETF is a type of bond, while a mutual fund is a type of stock',
        'ETFs are only for retirement accounts',
      ],
      answerIndex: 1,
      explanation:
        'Both are "baskets" of stocks that offer diversification. The trade-off: mutual funds come with a professional fund manager and an annual fee, while ETFs skip both the manager and the fee.',
    },
    {
      question:
        'Which account typically earns 4-5% APR, compared to 0.1-0.3% for a traditional savings account?',
      options: [
        'A checking account',
        'A 529 plan used for groceries',
        'A High-Yield Savings Account (HYSA)',
        'A payday loan account',
      ],
      answerIndex: 2,
      explanation:
        'High-Yield Savings Accounts average 4-5% APR while traditional savings accounts average just 0.1-0.3% APR. Same safety, way better compounding, so where you park your savings really matters.',
    },
    {
      question: 'What is the key difference between a traditional and a Roth 401(k) or IRA?',
      options: [
        'Traditional accounts are only for teachers',
        'Roth accounts can only hold bonds',
        'Traditional accounts have no taxes at all',
        'Traditional accounts use pre-tax dollars and are taxed on withdrawal; Roth accounts use after-tax dollars and are not taxed on withdrawal',
      ],
      answerIndex: 3,
      explanation:
        'Traditional 401(k)s and IRAs are tax-deferred: contribute pre-tax now, pay taxes when you withdraw. Roth versions flip it: pay taxes on the money now, withdraw tax-free later.',
    },
    {
      question: 'Why is time so important for compounding?',
      options: [
        'Banks only pay interest to older customers',
        'The more time your money compounds, the more interest earns interest, so gains grow larger every year',
        'Stocks are only sold during certain years',
        'Inflation makes your money worth more over time',
      ],
      answerIndex: 1,
      explanation:
        'Each year, compounding pays interest on a bigger balance, so growth accelerates the longer you stay invested. That is the time value of money in action, and it is why starting young is such an advantage.',
    },
  ],
  es: {
    title: 'Ahorro e inversión',
    description:
      'Cómo construir riqueza con el tiempo, poner tu dinero en los lugares correctos y entender el poder del tiempo en el crecimiento compuesto.',
    sections: [
      {
        type: 'intro',
        heading: 'Construir riqueza con el tiempo',
        body:
          'Calentamiento rápido: ¿qué es algo grande que te gustaría poder pagar algún día, y cuánto tiempo crees que te tomaría ahorrar para conseguirlo? ¿Un auto? ¿La universidad? ¿Un viaje? Mantén esa meta en mente, porque hoy se trata de cómo llegar ahí de verdad. Veremos ahorrar vs. invertir, la magia del interés compuesto y dónde poner tu dinero.',
      },
      {
        type: 'content',
        heading: 'Ahorrar vs. invertir: ¡no son lo mismo!',
        body:
          'Al contrario de lo que mucha gente cree, ahorrar e invertir no son lo mismo. Ahorrar significa apartar dinero en un lugar seguro para necesidades de corto plazo o emergencias, como guardar efectivo en una cuenta de ahorros para un teléfono nuevo. No hay riesgo de perder ese dinero. Invertir significa poner dinero en activos con la meta de que crezca a largo plazo, como comprar acciones o fondos mutuos para el retiro.',
        bullets: [
          'Ahorrar: riesgo bajo, rendimiento bajo, ideal para emergencias y metas de corto plazo',
          'Invertir: riesgo medio a alto, rendimiento más alto, ideal para metas de largo plazo',
          'Incluso hay ramas de la inversión, como el day-trading, que sigue los patrones diarios de la bolsa de valores',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Sean está en primer grado. Sus padres apartan dinero de forma constante para pagar su educación dentro de muchos años. ¿Esto es ahorrar o invertir?',
          options: [
            'Ahorrar, porque están siendo cuidadosos',
            'Invertir, porque es dinero destinado a crecer a largo plazo para una meta lejana',
            'Ninguna de las dos, porque Sean es demasiado pequeño',
            'Ambas son exactamente lo mismo',
          ],
          answerIndex: 1,
          explanation:
            '¡Bien pensado! Como la educación de Sean está a muchos años de distancia, el dinero apartado para ella busca crecer a largo plazo, y eso lo convierte en inversión. El ahorro es para necesidades de corto plazo o emergencias. Y recuerda: ¡ahorrar e invertir definitivamente no son lo mismo!',
        },
      },
      {
        type: 'terms',
        heading: 'Interés, APR e interés compuesto',
        terms: [
          {
            term: 'Interés (interest)',
            definition:
              'La tasa que se paga por el dinero depositado. Por ejemplo, un interés del 3% sobre un depósito de $1,000 te gana $30.',
          },
          {
            term: 'APR (Annual Percentage Rate, tasa de porcentaje anual)',
            definition: 'El interés expresado como una tasa anual.',
          },
          {
            term: 'Interés compuesto (compound interest)',
            definition:
              'Interés que se gana sobre el interés. Tu dinero crece más y más cada año, lo que lo convierte en una de las formas más fáciles de construir riqueza.',
          },
          {
            term: 'Valor del dinero en el tiempo (time value of money)',
            definition:
              'La idea de que un dólar vale más ahora que en el futuro, por la inflación y por la posibilidad de empezar a ganar interés desde hoy.',
          },
        ],
      },
      {
        type: 'example',
        heading: 'El interés compuesto en acción: conoce a Joe',
        body:
          'Joe gana 5% APR sobre su depósito de $10,000. Año 1: $10,000 x 1.05 = $10,500, una ganancia de $500. Año 2: $10,500 x 1.05 = $11,025, una ganancia de $525. Año 3: $11,025 x 1.05 = $11,576.25, una ganancia de $551.25. ¿Notas cómo la ganancia de cada año es mayor que la del anterior? Eso es el interés compuesto: interés que gana interés. Y Joe no movió ni un dedo.',
      },
      {
        type: 'content',
        heading: 'La clave del interés compuesto es el tiempo',
        body:
          'Mientras más tiempo tengas, más dinero puedes ganar. Por eso empezar joven es básicamente un superpoder. Aquí tienes dos estrategias que hacen que el interés compuesto trabaje para ti de forma automática.',
        bullets: [
          'Págate a ti primero (Pay Yourself First): toma una pequeña parte de cada cheque de pago e inviértela antes de gastar en cualquier otra cosa (¡recuerda la regla 50/30/20!)',
          'Promedio de costo en dólares (Dollar Cost Averaging, DCA): compra un monto fijo en dólares de una acción de forma constante, como comprar $50 de AMZN cada mes, sin importar el precio',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Joe deposita $10,000 al 5% APR con interés compuesto. ¿Por qué gana MÁS de $500 en el año 2?',
          options: [
            'El banco se siente generoso en el año 2',
            'Su APR se duplica automáticamente cada año',
            'Gana interés sobre su depósito original más el interés del año 1',
            'No gana más; el interés compuesto paga la misma cantidad cada año',
          ],
          answerIndex: 2,
          explanation:
            '¡Exacto! Después del año 1, el saldo de Joe es de $10,500, así que el 5% del año 2 se aplica a ese número más grande, ganándole $525 en lugar de $500. El interés que gana interés es todo el truco de magia del interés compuesto, y crece como bola de nieve mientras más tiempo lo dejes quieto.',
        },
      },
      {
        type: 'video',
        heading: 'Mira el video: El interés compuesto en acción',
        body:
          '¿Quieres ver las matemáticas detrás de la magia? Mira cómo Khan Academy explica exactamente cómo el interés compuesto crece como bola de nieve. El video está en inglés y se pausará para hacerte preguntas — ¡nada de adelantarse!',
        videoId: 'Rm6UdfRs3gw',
        source: 'Khan Academy',
        questions: [
          {
            at: 95,
            question:
              'Depositas $100 al 10% de interés, compuesto anualmente. Después del año 1 tienes $110. ¿Aproximadamente cuánto tienes después del año 2?',
            options: ['$120', '$121', '$130', '$110 — se queda igual'],
            answerIndex: 1,
            explanation:
              'El 10% del año 2 se aplica a los $110 completos — no solo a tus $100 originales — así que ganas $11 y llegas a $121. Ese dólar extra es interés que gana interés, y crece cada año que pasa.',
          },
          {
            at: 240,
            question: '¿Qué hace diferente al interés compuesto del interés simple?',
            options: [
              'El interés compuesto solo funciona en los bancos grandes',
              'Con el interés compuesto, ganas interés sobre tu interés — no solo sobre lo que depositaste',
              'El interés simple crece más rápido con el tiempo',
              'No hay diferencia, solo son nombres distintos',
            ],
            answerIndex: 1,
            explanation:
              'El interés simple paga solo sobre tu depósito original, para siempre. El compuesto paga sobre tu depósito MÁS todo lo que ya ha ganado — por eso empieza lento y luego explota con los años.',
          },
        ],
      },
      {
        type: 'content',
        heading: '¿Dónde deberías poner tu dinero?',
        body:
          'Existen varios tipos de cuentas e inversiones, y cuáles usar depende de tus metas y de tu situación financiera. (¿Recuerdas la estrategia de metas SMART? Te ayudará a decidir.) Las opciones principales incluyen acciones, fondos mutuos y ETFs, bonos, cuentas de ahorro, cuentas de retiro como los 401(k) y planes de educación. Vamos a recorrer cada una.',
      },
      {
        type: 'content',
        heading: 'Acciones',
        body:
          'Las acciones (stocks) son participaciones de empresas que cotizan en bolsa. Cuando compras la acción de una empresa, te conviertes en dueño parcial de esa empresa. Bastante genial, ¿no? Las acciones pueden ser de riesgo alto o bajo dependiendo de la empresa.',
        bullets: [
          'Un índice bursátil es un segmento hipotético del mercado de valores, como el NASDAQ o el Dow Jones',
          'El S&P 500, un índice bursátil, promedia rendimientos de alrededor del 10% año tras año',
          'Las ganancias de capital (capital gains) son las utilidades por vender una inversión a un precio mayor del que pagaste',
          'Los dividendos son porciones de las utilidades que la empresa paga directamente a sus accionistas',
        ],
      },
      {
        type: 'content',
        heading: 'Fondos mutuos, ETFs y bonos',
        body:
          'Los fondos mutuos y los ETFs son "canastas" de diferentes acciones. Un fondo de energía, por ejemplo, puede incluir una amplia gama de empresas de energía. Las canastas generalmente tienen menos riesgo que las acciones individuales porque te dan diversificación: repartir tus inversiones por todo el mercado. Los bonos (bonds) son una inversión de préstamo en la que le prestas dinero a una empresa o a un gobierno y a cambio recibes pagos de interés.',
        bullets: [
          'Los fondos mutuos son administrados por un gestor profesional de fondos, pero cobran una cuota anual',
          'Los ETFs no cobran cuota anual, pero no tienen administración profesional',
          'Los bonos vienen en tipos como corporativos, del tesoro y municipales',
          'Los bonos tienen calificaciones de crédito; los bonos riesgosos pueden caer en impago (default), es decir, que el prestatario no devuelve su deuda',
        ],
      },
      {
        type: 'content',
        heading: 'Cuentas de ahorro, cuentas de retiro y planes 529',
        body:
          'Las cuentas de ahorro son cuentas bancarias para el dinero que no planeas gastar de inmediato. Normalmente limitan los retiros mensuales, pero a cambio te pagan interés compuesto. Para el retiro, los 401(k) (patrocinados por el empleador) y las IRA (no patrocinadas por el empleador) invierten en el mercado contribuciones mensuales de tu cheque de pago. Y los planes 529 son cuentas de ahorro para la universidad que crecen con el tiempo mediante una inversión constante.',
        bullets: [
          'Las cuentas de ahorro de alto rendimiento (High-Yield Savings Accounts, HYSAs) promedian 4-5% APR, mientras que las cuentas de ahorro tradicionales promedian apenas 0.1-0.3% APR',
          'Los 401(k) e IRA tradicionales tienen impuestos diferidos: contribuyes dólares antes de impuestos y luego pagas impuestos al retirar',
          'Los 401(k) e IRA Roth lo invierten: pagas con dólares después de impuestos, pero los retiros no pagan impuestos',
          'Puedes abrir un plan 529 en cualquier momento, pero el dinero que no se usa para educación recibe un impuesto del 10%, que es muchísimo',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Quieres invertir, pero las acciones individuales te parecen demasiado riesgosas. ¿Qué opción reparte tu dinero entre muchas empresas a la vez?',
          options: [
            'Un préstamo de día de pago (payday loan)',
            'Una sola acción de una sola empresa',
            'Una cuenta de ahorros tradicional',
            'Un fondo mutuo o un ETF',
          ],
          answerIndex: 3,
          explanation:
            '¡Lo lograste! Los fondos mutuos y los ETFs son "canastas" de muchas acciones que te dan diversificación, la cual reparte tus inversiones por todo el mercado y baja tu riesgo comparado con apostarlo todo a una sola empresa. Los gestores de fondos manejan los fondos mutuos por una cuota; los ETFs se saltan la cuota y el gestor.',
        },
      },
      {
        type: 'example',
        heading: '¡El lobo de Wall Street! (Juego de clase)',
        body:
          'En clase, esta lección viene con un juego. Recibes un presupuesto de $1,000 para "invertir" en 3 acciones de tu elección, decidiendo cuántas participaciones de cada una comprar según su desempeño pasado. Al final de la presentación, todos revisan cómo les fue a sus elecciones y suman sus ganancias (o pérdidas). Es una forma divertida y sin riesgo de sentir cómo son las decisiones de inversión reales: analizar el desempeño, diversificar y vivir con los resultados.',
      },
      {
        type: 'content',
        heading: 'Para cerrar',
        body:
          'Las grandes ideas de hoy: ahorrar es seguro y de corto plazo, invertir es más riesgoso pero hace crecer tu dinero a largo plazo, y el interés compuesto más el tiempo es el combo más fácil que existe para construir riqueza. Págate a ti primero, diversifica y elige la cuenta según la meta. Anota un resumen rápido de lo que te quedó claro y lo que quieres repasar. Próxima sesión: ¡Crédito y deuda!',
      },
    ],
    quiz: [
      {
        question: '¿Cuál es la diferencia principal entre ahorrar e invertir?',
        options: [
          'Ahorrar es poner dinero en un lugar seguro para necesidades de corto plazo; invertir es poner dinero en activos para que crezca a largo plazo',
          'Ahorrar gana rendimientos más altos que invertir',
          'Invertir no tiene riesgo, mientras que ahorrar es riesgoso',
          'Son lo mismo con nombres diferentes',
        ],
        answerIndex: 0,
        explanation:
          'Ahorrar es de bajo riesgo y bajo rendimiento, perfecto para emergencias y metas de corto plazo. Invertir conlleva un riesgo medio a alto pero ofrece rendimientos más altos, lo que lo convierte en la herramienta para metas de largo plazo como el retiro.',
      },
      {
        question:
          'Joe deposita $10,000 al 5% APR con interés compuesto. ¿Aproximadamente cuánto tiene después de 2 años?',
        options: ['$10,500', '$11,000', '$11,025', '$12,000'],
        answerIndex: 2,
        explanation:
          'Año 1: $10,000 x 1.05 = $10,500. Año 2: $10,500 x 1.05 = $11,025. El interés compuesto significa que el año 2 gana interés sobre el interés del año 1, y por eso la ganancia crece de $500 a $525.',
      },
      {
        question: '¿Qué significa "Págate a ti primero" (Pay Yourself First)?',
        options: [
          'Cómprate un gusto antes de pagar cualquier cuenta',
          'Toma una pequeña parte de cada cheque de pago e inviértela antes de gastar en cualquier otra cosa',
          'Paga todas tus deudas antes de siquiera ahorrar',
          'Pídele a tu empleador que te pague antes que a tus compañeros',
        ],
        answerIndex: 1,
        explanation:
          'Págate a ti primero significa apartar una parte de cada cheque de pago para ahorrar e invertir antes de gastar un solo centavo, para que tu futuro siempre reciba su parte. Combina perfecto con la regla 50/30/20.',
      },
      {
        question: '¿Qué es un dividendo?',
        options: [
          'La cuota que cobra cada año el gestor de un fondo mutuo',
          'La utilidad que obtienes al vender una acción a un precio más alto',
          'Un préstamo que le haces a un gobierno',
          'Una porción de las utilidades de la empresa pagada directamente a los accionistas',
        ],
        answerIndex: 3,
        explanation:
          'Los dividendos son porciones de las utilidades que una empresa paga a sus accionistas. Las ganancias de capital, en cambio, son las utilidades que obtienes al vender una inversión a un precio mayor del que pagaste.',
      },
      {
        question: '¿En qué se diferencia un ETF de un fondo mutuo?',
        options: [
          'Un ETF tiene una sola acción, mientras que un fondo mutuo tiene muchas',
          'Un ETF no cobra cuota anual pero no tiene administración profesional; un fondo mutuo es administrado profesionalmente pero cobra una cuota',
          'Un ETF es un tipo de bono, mientras que un fondo mutuo es un tipo de acción',
          'Los ETFs son solo para cuentas de retiro',
        ],
        answerIndex: 1,
        explanation:
          'Ambos son "canastas" de acciones que ofrecen diversificación. El intercambio: los fondos mutuos vienen con un gestor profesional y una cuota anual, mientras que los ETFs se saltan tanto al gestor como la cuota.',
      },
      {
        question:
          '¿Qué cuenta suele ganar 4-5% APR, comparado con el 0.1-0.3% de una cuenta de ahorros tradicional?',
        options: [
          'Una cuenta de cheques',
          'Un plan 529 usado para el supermercado',
          'Una cuenta de ahorros de alto rendimiento (High-Yield Savings Account, HYSA)',
          'Una cuenta de préstamos de día de pago',
        ],
        answerIndex: 2,
        explanation:
          'Las cuentas de ahorro de alto rendimiento promedian 4-5% APR mientras que las cuentas de ahorro tradicionales promedian apenas 0.1-0.3% APR. La misma seguridad con un interés compuesto mucho mejor, así que dónde estacionas tus ahorros realmente importa.',
      },
      {
        question: '¿Cuál es la diferencia clave entre un 401(k) o IRA tradicional y uno Roth?',
        options: [
          'Las cuentas tradicionales son solo para maestros',
          'Las cuentas Roth solo pueden tener bonos',
          'Las cuentas tradicionales no pagan impuestos en absoluto',
          'Las cuentas tradicionales usan dólares antes de impuestos y pagan impuestos al retirar; las cuentas Roth usan dólares después de impuestos y no pagan impuestos al retirar',
        ],
        answerIndex: 3,
        explanation:
          'Los 401(k) e IRA tradicionales tienen impuestos diferidos: contribuyes antes de impuestos ahora y pagas impuestos cuando retiras. Las versiones Roth lo invierten: pagas los impuestos del dinero ahora y retiras libre de impuestos después.',
      },
      {
        question: '¿Por qué el tiempo es tan importante para el interés compuesto?',
        options: [
          'Los bancos solo pagan interés a los clientes mayores',
          'Mientras más tiempo se compone tu dinero, más interés gana interés, así que las ganancias crecen cada año',
          'Las acciones solo se venden durante ciertos años',
          'La inflación hace que tu dinero valga más con el tiempo',
        ],
        answerIndex: 1,
        explanation:
          'Cada año, el interés compuesto paga interés sobre un saldo más grande, así que el crecimiento se acelera mientras más tiempo te mantengas invertido. Ese es el valor del dinero en el tiempo en acción, y es la razón por la que empezar joven es una ventaja tan grande.',
      },
    ],
  },
}

export default lesson
