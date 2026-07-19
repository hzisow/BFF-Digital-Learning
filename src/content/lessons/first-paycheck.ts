import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'first-paycheck',
  week: 5,
  day: 1,
  title: 'Your First Paycheck',
  emoji: '🧾',
  description:
    'Crack the code on your very first paystub — where every dollar goes, why the number is smaller than you expected, and how to catch mistakes like a pro.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'Payday! 🎉 ...Wait, Where Did My Money Go?',
      body:
        "It finally happened — your first paycheck! You worked hard, did the math in your head, and then... the number is smaller than you expected. Don't panic, and don't assume anyone robbed you. Today you'll learn to read a paystub line by line, understand every deduction, and know exactly where each dollar went. By the end, that confusing slip of paper will read like a comic book.",
    },
    {
      type: 'content',
      heading: 'The Big Two: Gross Pay vs. Net Pay',
      body:
        "Every paystub tells a story with two main characters. Gross pay is everything you earned before anything is taken out — hours worked times your hourly rate, plus any overtime or tips your employer runs through payroll. Net pay is what actually lands in your pocket after deductions. The gap between them isn't a mistake; it's taxes and other withholdings doing their thing.",
      bullets: [
        'Gross pay = your hours x your rate (plus overtime, bonuses, or payroll tips)',
        'Net pay = gross pay minus all deductions — your real take-home money',
        'Budget with your NET pay, never your gross — gross is a number you never actually touch',
      ],
    },
    {
      type: 'content',
      heading: 'Income Tax Withholding: Pay As You Go',
      body:
        "The biggest chunk usually missing from your check is income tax withholding. Instead of handing the government one giant payment every April, your employer withholds a little from each paycheck and sends it in for you — federal income tax for the U.S. government, and state income tax if your state has one (a few, like Texas and Florida, don't!). Think of it as paying your tax bill in tiny installments all year long. If too much gets withheld, you get it back later as a refund. 💸",
    },
    {
      type: 'terms',
      heading: 'Paycheck Vocabulary',
      terms: [
        {
          term: 'Gross pay',
          definition:
            'The total amount you earned in a pay period before any deductions — the biggest number on your paystub.',
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
            'The Federal Insurance Contributions Act tax — 6.2% of your pay for Social Security plus 1.45% for Medicare (7.65% total). Your employer pays a matching 7.65% too.',
        },
        {
          term: 'W-4',
          definition:
            'The form you fill out when you start a job. It tells your employer how much federal income tax to withhold from each paycheck.',
        },
        {
          term: 'Direct deposit',
          definition:
            'An electronic payment that sends your net pay straight into your bank account on payday — no paper check, no waiting in line.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "Tasha's paystub shows gross pay of $500 and net pay of $432. Which number should she use when planning her spending?",
        options: [
          '$500 — that is what she earned, so that is what she can spend',
          '$432 — net pay is the money she actually takes home',
          'The average of the two, $466',
          'Neither — paystub numbers are just estimates',
        ],
        answerIndex: 1,
        explanation:
          "Nailed it! Net pay is the only number that actually hits her bank account, so it's the only number she can spend. The $68 difference went to taxes and other deductions — budgeting with gross pay is how people accidentally overspend.",
      },
    },
    {
      type: 'content',
      heading: 'FICA: Your Ticket to Social Security and Medicare',
      body:
        "Two lines on your stub — Social Security and Medicare — together make up FICA. Social Security takes 6.2% of your gross pay and funds monthly checks for retirees and people with disabilities. Medicare takes 1.45% and funds health insurance for people 65 and older. That's 7.65% total, and here's the cool part: your employer matches it, kicking in another 7.65% that never touches your paycheck. You're not losing this money into a void — you're earning credits toward benefits you can use decades from now.",
      bullets: [
        'Social Security: 6.2% of gross pay',
        'Medicare: 1.45% of gross pay',
        'Combined FICA: 7.65% from you + a matching 7.65% from your employer',
        'Unlike income tax, FICA is a flat rate — everyone pays the same percentage on their wages',
      ],
    },
    {
      type: 'example',
      heading: "Example: Jayden's First Stub",
      body:
        "Jayden bags groceries for $14 an hour and worked 25 hours over two weeks, so his gross pay is $350. His paystub shows: Social Security -$21.70 (6.2% of $350), Medicare -$5.08 (1.45%), federal income tax withholding -$11.00, and state income tax -$7.00. Total deductions: $44.78. Net pay: $305.22. At first Jayden thought he was 'missing' almost $45 — but line by line, every dollar is accounted for. He also spots his YTD (year-to-date) column, which will keep a running total all year. 🧾",
    },
    {
      type: 'content',
      heading: 'The W-4: The Form That Controls Your Withholding',
      body:
        "On day one of any job, HR hands you a Form W-4. It's not a test — it's how you tell your employer how much federal income tax to hold back. List your filing status and answer a few questions, and payroll does the math. If you're a student with one part-time job, the standard settings usually work fine. Claim too little withholding and you might owe money in April; withhold extra and you'll get it back as a refund. You can update your W-4 anytime your situation changes — new job, second job, big life change.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Marcus earns $200 gross this week. About how much will FICA (Social Security + Medicare) take out of his check?',
        options: [
          'About $15.30 — 7.65% of $200',
          'About $40 — FICA is always 20%',
          '$0 — teens are exempt from FICA',
          'About $62 — Social Security alone is 31%',
        ],
        answerIndex: 0,
        explanation:
          'You got it! FICA is 6.2% for Social Security ($12.40) plus 1.45% for Medicare ($2.90), which totals 7.65% — about $15.30 on a $200 check. And no, being a teen does not make you exempt: if you earn wages, you pay FICA.',
      },
    },
    {
      type: 'content',
      heading: 'Direct Deposit: Skip the Paper',
      body:
        "Most employers offer direct deposit — your net pay zaps electronically into your bank account on payday. No paper check to lose, no trip to the bank, no waiting for a check to clear. To set it up you'll give your employer your bank's routing number and your account number (both are on your bank's app or a check). Pro tip: some employers even let you split your deposit, sending part to checking and part straight to savings — automatic saving before you ever see the money. 🏦",
    },
    {
      type: 'content',
      heading: 'Be Your Own Auditor: Check Every Stub',
      body:
        "Payroll systems are run by humans, and humans make mistakes. Every payday, take 60 seconds to audit your own stub. If something looks off, don't be shy — politely ask your manager or the payroll contact listed on the stub. Errors are usually honest mistakes, and they get fixed fastest when you catch them early.",
      bullets: [
        'Check your hours: does the stub match the hours you actually worked?',
        'Check your rate: were you paid the hourly rate you were promised?',
        'Check overtime: hours past 40 in a week usually pay 1.5x your rate',
        'Check the math: rate x hours should equal your gross pay',
        'Keep your stubs (or screenshots) — they are your proof if a dispute ever comes up',
      ],
    },
    {
      type: 'content',
      heading: 'The W-2: Your Year-End Report Card',
      body:
        "Every January, your employer sends you a Form W-2 — a summary of your entire year: total wages earned and total taxes withheld for federal, state, and FICA. Don't confuse it with the W-4! The W-4 is what YOU fill out at hiring to set your withholding; the W-2 is what your EMPLOYER fills out after the year ends. You use the W-2 to file your tax return, and if too much was withheld during the year, that return is how you get your refund. File it away somewhere safe — tax season will thank you. 📬",
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
        'The $79 gap is your deductions: federal (and maybe state) income tax withholding plus FICA taxes came out of your gross pay before the net pay was deposited. That is completely normal — but you should still verify the math on your stub!',
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
        'The W-2 reports your total wages and everything withheld — federal, state, and FICA — for the whole year. You use those numbers to file your tax return, which is also how you claim a refund if too much was withheld.',
    },
    {
      question: 'Which of these is a benefit of direct deposit?',
      options: [
        'Your gross pay is deposited instead of your net pay',
        'You skip paying FICA taxes',
        'Your employer pays you a bonus for using it',
        'Your pay arrives electronically on payday — no paper check to lose or cash',
      ],
      answerIndex: 3,
      explanation:
        'Direct deposit sends your net pay straight to your bank account electronically, so there is no check to lose, deposit, or wait on. It does not change what you are paid or what taxes you owe — just how the money travels.',
    },
    {
      question:
        'Nia worked 22 hours at $15/hour, but her stub shows gross pay of $255 instead of $330. What should she do?',
      options: [
        'Nothing — the missing $75 is probably just taxes',
        'Quit immediately',
        'Compare the stub to her own record of hours, then politely ask her manager or payroll to fix the error',
        'Post the paystub online to warn others',
      ],
      answerIndex: 2,
      explanation:
        'Taxes come out AFTER gross pay is calculated, so a wrong gross number means the hours or rate were entered incorrectly. Checking rate x hours (22 x $15 = $330) and calmly flagging it with payroll is exactly how pros handle it — and why you always review your stub.',
    },
  ],
  es: {
    title: 'Tu primer cheque de pago',
    description:
      'Descifra el código de tu primer recibo de pago: a dónde va cada dólar, por qué el número es más chico de lo que esperabas y cómo detectar errores como todo un experto.',
    sections: [
      {
        type: 'intro',
        heading: '¡Día de pago! 🎉 ...Un momento, ¿a dónde fue mi dinero?',
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
          'Ingreso neto = ingreso bruto menos todas las deducciones — tu dinero real para llevar a casa',
          'Haz tu presupuesto con tu ingreso NETO, nunca con el bruto — el bruto es un número que en realidad nunca tocas',
        ],
      },
      {
        type: 'content',
        heading: 'Retención del impuesto sobre la renta: paga sobre la marcha',
        body:
          'La porción más grande que suele faltar en tu cheque es la retención del impuesto sobre la renta. En lugar de entregarle al gobierno un pago gigante cada abril, tu empleador retiene un poco de cada cheque y lo envía por ti: el impuesto federal sobre la renta para el gobierno de EE. UU., y el impuesto estatal sobre la renta si tu estado tiene uno (¡algunos, como Texas y Florida, no lo tienen!). Piénsalo como pagar tu cuenta de impuestos en pequeñas cuotas durante todo el año. Si te retienen de más, luego lo recuperas como reembolso. 💸',
      },
      {
        type: 'terms',
        heading: 'Vocabulario del cheque de pago',
        terms: [
          {
            term: 'Ingreso bruto (gross pay)',
            definition:
              'El monto total que ganaste en un período de pago antes de cualquier deducción — el número más grande de tu recibo de pago.',
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
              'Un pago electrónico que manda tu ingreso neto directo a tu cuenta bancaria el día de pago — sin cheque de papel y sin hacer fila.',
          },
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'El recibo de pago de Tasha muestra un ingreso bruto de $500 y un ingreso neto de $432. ¿Qué número debería usar al planear sus gastos?',
          options: [
            '$500 — eso es lo que ganó, así que eso es lo que puede gastar',
            '$432 — el ingreso neto es el dinero que de verdad se lleva a casa',
            'El promedio de los dos, $466',
            'Ninguno — los números del recibo son solo estimaciones',
          ],
          answerIndex: 1,
          explanation:
            '¡Lo lograste! El ingreso neto es el único número que de verdad llega a su cuenta bancaria, así que es el único número que puede gastar. La diferencia de $68 se fue a impuestos y otras deducciones — presupuestar con el ingreso bruto es como la gente termina gastando de más sin querer.',
        },
      },
      {
        type: 'content',
        heading: 'FICA: tu boleto al Seguro Social y a Medicare',
        body:
          'Dos líneas de tu recibo — Seguro Social y Medicare — juntas forman el FICA. El Seguro Social toma el 6.2% de tu ingreso bruto y financia los cheques mensuales para jubilados y personas con discapacidad. Medicare toma el 1.45% y financia el seguro médico para personas de 65 años en adelante. Eso es 7.65% en total, y aquí está lo genial: tu empleador lo iguala, aportando otro 7.65% que nunca toca tu cheque. No estás perdiendo este dinero en un vacío — estás ganando créditos para beneficios que podrás usar dentro de décadas.',
        bullets: [
          'Seguro Social: 6.2% del ingreso bruto',
          'Medicare: 1.45% del ingreso bruto',
          'FICA combinado: 7.65% de ti + un 7.65% igualado de tu empleador',
          'A diferencia del impuesto sobre la renta, el FICA es una tasa fija — todos pagan el mismo porcentaje sobre sus salarios',
        ],
      },
      {
        type: 'example',
        heading: 'Ejemplo: el primer recibo de Jayden',
        body:
          'Jayden empaca comestibles por $14 la hora y trabajó 25 horas en dos semanas, así que su ingreso bruto es $350. Su recibo de pago muestra: Seguro Social -$21.70 (6.2% de $350), Medicare -$5.08 (1.45%), retención del impuesto federal sobre la renta -$11.00 e impuesto estatal sobre la renta -$7.00. Total de deducciones: $44.78. Ingreso neto: $305.22. Al principio Jayden pensó que le "faltaban" casi $45 — pero línea por línea, cada dólar está justificado. También ve su columna de YTD (year-to-date, o acumulado del año), que llevará un total corrido durante todo el año. 🧾',
      },
      {
        type: 'content',
        heading: 'El W-4: el formulario que controla tu retención',
        body:
          'El primer día de cualquier trabajo, Recursos Humanos te da un Formulario W-4. No es un examen — es como le dices a tu empleador cuánto impuesto federal sobre la renta debe retener. Indica tu estado civil para efectos fiscales y responde unas preguntas, y la nómina hace las cuentas. Si eres estudiante con un solo trabajo de medio tiempo, la configuración estándar suele funcionar bien. Si reclamas muy poca retención podrías deber dinero en abril; si retienes de más lo recuperas como reembolso. Puedes actualizar tu W-4 en cualquier momento en que cambie tu situación — nuevo trabajo, segundo trabajo, un gran cambio en la vida.',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Marcus gana $200 brutos esta semana. ¿Aproximadamente cuánto le quitará el FICA (Seguro Social + Medicare) de su cheque?',
          options: [
            'Alrededor de $15.30 — el 7.65% de $200',
            'Alrededor de $40 — el FICA siempre es 20%',
            '$0 — los adolescentes están exentos del FICA',
            'Alrededor de $62 — solo el Seguro Social es 31%',
          ],
          answerIndex: 0,
          explanation:
            '¡Lo tienes! El FICA es 6.2% para el Seguro Social ($12.40) más 1.45% para Medicare ($2.90), lo que suma 7.65% — alrededor de $15.30 en un cheque de $200. Y no, ser adolescente no te hace estar exento: si ganas un salario, pagas FICA.',
        },
      },
      {
        type: 'content',
        heading: 'Depósito directo: sáltate el papel',
        body:
          'La mayoría de los empleadores ofrecen depósito directo — tu ingreso neto llega electrónicamente a tu cuenta bancaria el día de pago. Sin cheque de papel que perder, sin viaje al banco, sin esperar a que un cheque se haga efectivo. Para configurarlo le darás a tu empleador el número de ruta (routing number) de tu banco y tu número de cuenta (ambos están en la app de tu banco o en un cheque). Consejo pro: algunos empleadores hasta te dejan dividir tu depósito, mandando una parte a la cuenta corriente y otra directo al ahorro — ahorro automático antes de que veas el dinero. 🏦',
      },
      {
        type: 'content',
        heading: 'Sé tu propio auditor: revisa cada recibo',
        body:
          'Los sistemas de nómina los manejan personas, y las personas cometen errores. Cada día de pago, tómate 60 segundos para auditar tu propio recibo. Si algo se ve raro, no te dé pena — pregúntale con amabilidad a tu jefe o al contacto de nómina que aparece en el recibo. Los errores suelen ser equivocaciones honestas, y se arreglan más rápido cuando los detectas a tiempo.',
        bullets: [
          'Revisa tus horas: ¿el recibo coincide con las horas que de verdad trabajaste?',
          'Revisa tu tarifa: ¿te pagaron la tarifa por hora que te prometieron?',
          'Revisa las horas extra: las horas después de 40 en una semana suelen pagarse 1.5x tu tarifa',
          'Revisa las cuentas: tarifa x horas debería ser igual a tu ingreso bruto',
          'Guarda tus recibos (o capturas de pantalla) — son tu prueba si alguna vez surge una disputa',
        ],
      },
      {
        type: 'content',
        heading: 'El W-2: tu boleta de calificaciones de fin de año',
        body:
          'Cada enero, tu empleador te envía un Formulario W-2 — un resumen de todo tu año: total de salarios ganados y total de impuestos retenidos para el federal, el estatal y el FICA. ¡No lo confundas con el W-4! El W-4 es lo que TÚ llenas al ser contratado para fijar tu retención; el W-2 es lo que tu EMPLEADOR llena después de que termina el año. Usas el W-2 para presentar tu declaración de impuestos, y si te retuvieron de más durante el año, esa declaración es como recuperas tu reembolso. Guárdalo en un lugar seguro — la temporada de impuestos te lo agradecerá. 📬',
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
          'La diferencia de $79 son tus deducciones: la retención del impuesto federal (y quizás estatal) sobre la renta más los impuestos FICA salieron de tu ingreso bruto antes de que se depositara el ingreso neto. Eso es totalmente normal — pero de todos modos deberías verificar las cuentas de tu recibo.',
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
          'El W-2 reporta tus salarios totales y todo lo retenido — federal, estatal y FICA — de todo el año. Usas esos números para presentar tu declaración de impuestos, que también es como reclamas un reembolso si te retuvieron de más.',
      },
      {
        question: '¿Cuál de estos es un beneficio del depósito directo?',
        options: [
          'Se deposita tu ingreso bruto en lugar de tu ingreso neto',
          'Te saltas el pago de los impuestos FICA',
          'Tu empleador te paga un bono por usarlo',
          'Tu paga llega electrónicamente el día de pago — sin cheque de papel que perder ni efectivo',
        ],
        answerIndex: 3,
        explanation:
          'El depósito directo manda tu ingreso neto directo a tu cuenta bancaria de forma electrónica, así que no hay cheque que perder, depositar ni esperar. No cambia lo que te pagan ni los impuestos que debes — solo cómo viaja el dinero.',
      },
      {
        question:
          'Nia trabajó 22 horas a $15/hora, pero su recibo muestra un ingreso bruto de $255 en lugar de $330. ¿Qué debería hacer?',
        options: [
          'Nada — los $75 que faltan probablemente sean solo impuestos',
          'Renunciar de inmediato',
          'Comparar el recibo con su propio registro de horas y luego pedirle con amabilidad a su jefe o a nómina que corrija el error',
          'Publicar el recibo de pago en línea para advertir a los demás',
        ],
        answerIndex: 2,
        explanation:
          'Los impuestos salen DESPUÉS de calcular el ingreso bruto, así que un número bruto equivocado significa que se ingresaron mal las horas o la tarifa. Revisar tarifa x horas (22 x $15 = $330) y señalarlo con calma a nómina es exactamente como lo manejan los expertos — y por qué siempre revisas tu recibo.',
      },
    ],
  },
}

export default lesson
