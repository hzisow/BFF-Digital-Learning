import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'taxes-deep-dive',
  week: 5,
  day: 2,
  title: 'Taxes Deep-Dive',
  emoji: '🏛️',
  description:
    'Bust the biggest tax myths, decode how brackets really work, and find out exactly what all that withheld money builds — spoiler: raises are always worth taking.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'Taxes: The Subscription Fee for Society',
      body:
        "Nobody throws a party when taxes come up, but here's a reframe: taxes are like a group subscription that 330 million people split to run a country. The road to school, the firefighters down the street, the GPS satellites your phone uses — all tax-funded. Today we'll dig into why taxes exist, the different kinds you'll pay, and how tax brackets ACTUALLY work — including busting the most stubborn money myth in America. 🕵️",
    },
    {
      type: 'content',
      heading: 'What Do Taxes Actually Buy?',
      body:
        'Governments do not have their own money — they have OUR money, pooled together. Federal, state, and local governments each collect taxes and spend them on different things. When you see a deduction on your paystub, this is where it goes.',
      bullets: [
        'Federal: Social Security and Medicare, national defense, highways, scientific research, national parks',
        'State: public universities, state roads, police, health programs',
        'Local: public schools, libraries, parks, firefighters, trash pickup',
        'Fun one: public school spending often works out to more than $15,000 per student per year — your education is one of the biggest things taxes buy',
      ],
    },
    {
      type: 'content',
      heading: 'The Tax Family: Four Kinds You Will Meet',
      body:
        "Income tax is the famous one, but it has siblings you'll bump into constantly. Sales tax gets added at the register when you buy stuff — a $60 hoodie with 7% sales tax actually costs $64.20. Property tax is paid yearly by people who own homes and land, and it mostly funds local schools. Payroll taxes are the FICA deductions from your paycheck that fund Social Security and Medicare. And income tax is charged on the money you earn, at both the federal level and in most states.",
      bullets: [
        'Sales tax: paid when you buy things (rates vary by state and city)',
        'Property tax: paid by property owners, funds local schools and services',
        'Payroll tax (FICA): flat percentage from every paycheck for Social Security and Medicare',
        'Income tax: charged on earnings, and the federal version is progressive — higher incomes pay higher rates',
      ],
    },
    {
      type: 'terms',
      heading: 'Tax Talk: Key Terms',
      terms: [
        {
          term: 'Progressive tax',
          definition:
            'A tax where the rate increases as income increases — higher earners pay a larger percentage. The U.S. federal income tax is progressive.',
        },
        {
          term: 'Tax bracket',
          definition:
            'A range of income taxed at a specific rate. Your income fills up brackets in order, like water filling a stack of buckets.',
        },
        {
          term: 'Marginal tax rate',
          definition:
            'The rate you pay on your NEXT dollar of income — only the dollars inside a bracket get taxed at that bracket’s rate, not your whole income.',
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
          'Exactly — sales tax is added at the register when you buy things. Here it was 7%: $80 x 0.07 = $5.60 extra. Payroll tax comes out of paychecks, property tax is for real estate, and income tax is charged on money you earn.',
      },
    },
    {
      type: 'content',
      heading: 'How Tax Brackets REALLY Work',
      body:
        "Federal income tax is progressive, and brackets work like a stack of buckets. Picture pouring your income in from the top: the first bucket fills at a low rate, and only the overflow spills into the next bucket at a higher rate. Each rate applies ONLY to the dollars inside that bucket — never to your whole income. That per-bucket rate is called your marginal rate, and this one idea protects you from the most common tax myth out there.",
    },
    {
      type: 'example',
      heading: "Example: Zoe's Buckets",
      body:
        "Imagine a simple system with two brackets: 10% on your first $10,000 of income, and 20% on everything above that. Zoe earns $12,000 from her part-time job this year. Myth-thinking says she's 'in the 20% bracket' so she owes 20% of $12,000 = $2,400. Wrong! Here's the real math: her first $10,000 is taxed at 10% ($1,000), and only the $2,000 above the line is taxed at 20% ($400). Total: $1,400 — an overall rate of less than 12%, even though her top marginal rate is 20%. The buckets always work in her favor. 🪣",
    },
    {
      type: 'content',
      heading: 'Myth-Buster: "A Raise Can Lower Your Take-Home!"',
      body:
        "You will hear an adult say it someday: 'I can't take that raise, it'll bump me into a higher bracket and I'll take home LESS.' This is mathematically impossible under the bracket system. Moving into a higher bracket only changes the rate on the NEW dollars above the line — every dollar you already earned keeps its old, lower rate. If Zoe gets a raise from $12,000 to $13,000, only that new $1,000 is taxed at 20%; she keeps $800 of it. Earning more money ALWAYS means taking home more money. Say it loud. 📣",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "Devin's raise pushes his income from the 12% bracket into the 22% bracket. What happens to his take-home pay?",
        options: [
          'It goes down — his whole income is now taxed at 22%',
          'It goes up — only the dollars above the bracket line are taxed at 22%',
          'It stays exactly the same',
          'He must refuse the raise to avoid a penalty',
        ],
        answerIndex: 1,
        explanation:
          'You crushed the myth! Only the new dollars above the bracket threshold get taxed at 22% — everything below keeps its lower rates. His take-home pay definitely rises. A raise can never shrink your after-tax income under the bracket system.',
      },
    },
    {
      type: 'content',
      heading: 'Filing a Return (and Scoring a Refund)',
      body:
        "Each spring — the deadline is usually April 15 — people file a tax return, a form that adds up what you truly owed for last year and compares it to what your paychecks already withheld. Withheld too much? The government sends the difference back as a refund. Withheld too little? You pay the gap. For teens with part-time jobs, filing is often quick, free, and genuinely worth it: if you earned under the standard deduction, you likely owe $0 in federal income tax — and filing is the only way to get your withheld money back. That's real cash people leave on the table every year!",
    },
    {
      type: 'content',
      heading: 'The Standard Deduction: Your Free Pass',
      body:
        'Before any brackets kick in, the standard deduction shields a chunk of your income from federal income tax entirely — around $15,000 for a single filer. Earn $6,000 at a summer job? That is fully under the shield, so your federal income tax is $0, and any federal income tax that was withheld comes back to you when you file. (Heads up: FICA is different — Social Security and Medicare taxes apply from your very first dollar of wages and do not get refunded.)',
      bullets: [
        'Around $15,000 of income is federally income-tax-free for a single filer',
        'Most teen part-time earnings fall entirely under the standard deduction',
        'Filing a return is how you reclaim over-withheld income tax',
        'FICA (7.65%) still applies to all wages — the standard deduction does not block it',
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
        '$3,000 — 20% of the whole $15,000',
        '$1,500 — a flat 10% of everything',
        '$2,000 — 10% plus 20% split evenly',
        '$2,000 — $1,000 on the first bucket plus $1,000 on the $5,000 above the line',
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
        'Property tax is charged yearly on homes and land, and it is the backbone of local budgets — especially public schools, along with libraries, parks, and fire departments.',
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
        'Payroll taxes are the FICA deductions — 6.2% for Social Security and 1.45% for Medicare — taken from wages to fund those programs. Employers pay a matching share on top.',
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
        'His $5,500 sits entirely under the standard deduction, so his federal income tax bill is $0 — filing returns the $200 that was withheld. FICA is the exception: Social Security and Medicare taxes apply to all wages and are not refunded.',
    },
  ],
  es: {
    title: 'Los impuestos a fondo',
    description:
      'Derriba los mayores mitos sobre los impuestos, descifra cómo funcionan de verdad los tramos y descubre qué construye exactamente todo ese dinero retenido — spoiler: siempre vale la pena aceptar un aumento.',
    sections: [
      {
        type: 'intro',
        heading: 'Los impuestos: la cuota de suscripción de la sociedad',
        body:
          'Nadie hace una fiesta cuando salen a tema los impuestos, pero aquí va otra forma de verlo: los impuestos son como una suscripción grupal que 330 millones de personas se reparten para hacer funcionar un país. El camino a la escuela, los bomberos de tu cuadra, los satélites de GPS que usa tu teléfono — todo se financia con impuestos. Hoy vamos a profundizar en por qué existen los impuestos, los distintos tipos que pagarás y cómo funcionan DE VERDAD los tramos de impuestos — incluyendo derribar el mito sobre el dinero más terco de Estados Unidos. 🕵️',
      },
      {
        type: 'content',
        heading: '¿Qué compran realmente los impuestos?',
        body:
          'Los gobiernos no tienen su propio dinero — tienen NUESTRO dinero, juntado en un solo fondo. Los gobiernos federal, estatal y local recaudan impuestos cada uno y los gastan en cosas distintas. Cuando ves una deducción en tu recibo de pago, aquí es a donde va.',
        bullets: [
          'Federal: Seguro Social y Medicare, defensa nacional, autopistas, investigación científica, parques nacionales',
          'Estatal: universidades públicas, carreteras estatales, policía, programas de salud',
          'Local: escuelas públicas, bibliotecas, parques, bomberos, recolección de basura',
          'Dato curioso: el gasto en escuelas públicas suele salir en más de $15,000 por estudiante al año — tu educación es una de las cosas más grandes que compran los impuestos',
        ],
      },
      {
        type: 'content',
        heading: 'La familia de los impuestos: cuatro tipos que conocerás',
        body:
          'El impuesto sobre la renta es el famoso, pero tiene hermanos con los que te toparás a cada rato. El impuesto sobre las ventas (sales tax) se suma en la caja cuando compras cosas — una sudadera de $60 con 7% de impuesto sobre las ventas en realidad cuesta $64.20. El impuesto predial (property tax) lo pagan cada año las personas que son dueñas de casas y terrenos, y financia principalmente las escuelas locales. Los impuestos sobre la nómina (payroll taxes) son las deducciones de FICA de tu cheque que financian el Seguro Social y Medicare. Y el impuesto sobre la renta se cobra sobre el dinero que ganas, tanto a nivel federal como en la mayoría de los estados.',
        bullets: [
          'Impuesto sobre las ventas: se paga al comprar cosas (las tasas varían según el estado y la ciudad)',
          'Impuesto predial: lo pagan los dueños de propiedades, financia escuelas y servicios locales',
          'Impuesto sobre la nómina (FICA): porcentaje fijo de cada cheque para el Seguro Social y Medicare',
          'Impuesto sobre la renta: se cobra sobre las ganancias, y la versión federal es progresiva — los ingresos más altos pagan tasas más altas',
        ],
      },
      {
        type: 'terms',
        heading: 'Hablemos de impuestos: términos clave',
        terms: [
          {
            term: 'Impuesto progresivo (progressive tax)',
            definition:
              'Un impuesto en el que la tasa aumenta a medida que aumenta el ingreso — quienes ganan más pagan un porcentaje mayor. El impuesto federal sobre la renta de EE. UU. es progresivo.',
          },
          {
            term: 'Tramo de impuestos (tax bracket)',
            definition:
              'Un rango de ingreso gravado a una tasa específica. Tu ingreso llena los tramos en orden, como agua llenando una pila de cubetas.',
          },
          {
            term: 'Tasa impositiva marginal (marginal tax rate)',
            definition:
              'La tasa que pagas sobre tu SIGUIENTE dólar de ingreso — solo los dólares dentro de un tramo se gravan a la tasa de ese tramo, no todo tu ingreso.',
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
            'Exacto — el impuesto sobre las ventas se suma en la caja cuando compras cosas. Aquí fue 7%: $80 x 0.07 = $5.60 extra. El impuesto sobre la nómina sale de los cheques, el impuesto predial es para los bienes raíces y el impuesto sobre la renta se cobra sobre el dinero que ganas.',
        },
      },
      {
        type: 'content',
        heading: 'Cómo funcionan DE VERDAD los tramos de impuestos',
        body:
          'El impuesto federal sobre la renta es progresivo, y los tramos funcionan como una pila de cubetas. Imagina que viertes tu ingreso desde arriba: la primera cubeta se llena a una tasa baja, y solo lo que se desborda cae a la siguiente cubeta a una tasa más alta. Cada tasa se aplica SOLO a los dólares dentro de esa cubeta — nunca a todo tu ingreso. Esa tasa por cubeta se llama tu tasa marginal, y esta sola idea te protege del mito sobre impuestos más común que existe.',
      },
      {
        type: 'example',
        heading: 'Ejemplo: las cubetas de Zoe',
        body:
          'Imagina un sistema sencillo con dos tramos: 10% sobre tus primeros $10,000 de ingreso, y 20% sobre todo lo que esté por encima de eso. Zoe gana $12,000 este año en su trabajo de medio tiempo. El pensamiento del mito dice que ella está "en el tramo del 20%", así que debe el 20% de $12,000 = $2,400. ¡Mal! Aquí están las cuentas reales: sus primeros $10,000 se gravan al 10% ($1,000), y solo los $2,000 por encima de la línea se gravan al 20% ($400). Total: $1,400 — una tasa general de menos del 12%, aunque su tasa marginal más alta sea 20%. Las cubetas siempre trabajan a su favor. 🪣',
      },
      {
        type: 'content',
        heading: 'Cazamitos: "¡Un aumento puede reducir lo que te llevas a casa!"',
        body:
          'Algún día oirás a un adulto decirlo: "No puedo aceptar ese aumento, me va a subir a un tramo más alto y me voy a llevar MENOS a casa". Esto es matemáticamente imposible bajo el sistema de tramos. Subir a un tramo más alto solo cambia la tasa sobre los dólares NUEVOS por encima de la línea — cada dólar que ya ganaste conserva su tasa antigua y más baja. Si Zoe recibe un aumento de $12,000 a $13,000, solo esos $1,000 nuevos se gravan al 20%; se queda con $800 de eso. Ganar más dinero SIEMPRE significa llevarte más dinero a casa. Dilo bien fuerte. 📣',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'El aumento de Devin sube su ingreso del tramo del 12% al tramo del 22%. ¿Qué pasa con lo que se lleva a casa?',
          options: [
            'Baja — ahora todo su ingreso se grava al 22%',
            'Sube — solo los dólares por encima de la línea del tramo se gravan al 22%',
            'Se queda exactamente igual',
            'Debe rechazar el aumento para evitar una multa',
          ],
          answerIndex: 1,
          explanation:
            '¡Aplastaste el mito! Solo los dólares nuevos por encima del umbral del tramo se gravan al 22% — todo lo que está por debajo conserva sus tasas más bajas. Lo que se lleva a casa definitivamente sube. Un aumento nunca puede achicar tu ingreso después de impuestos bajo el sistema de tramos.',
        },
      },
      {
        type: 'content',
        heading: 'Presentar una declaración (y ganarte un reembolso)',
        body:
          'Cada primavera — la fecha límite suele ser el 15 de abril — la gente presenta una declaración de impuestos, un formulario que suma lo que de verdad debías del año pasado y lo compara con lo que tus cheques ya retuvieron. ¿Te retuvieron de más? El gobierno te devuelve la diferencia como reembolso. ¿Te retuvieron de menos? Pagas la diferencia. Para los adolescentes con trabajos de medio tiempo, declarar suele ser rápido, gratis y de verdad vale la pena: si ganaste menos de la deducción estándar, probablemente debas $0 en impuesto federal sobre la renta — y declarar es la única forma de recuperar tu dinero retenido. ¡Ese es dinero real que la gente deja sobre la mesa cada año!',
      },
      {
        type: 'content',
        heading: 'La deducción estándar: tu pase gratis',
        body:
          'Antes de que entren en juego los tramos, la deducción estándar protege una parte de tu ingreso del impuesto federal sobre la renta por completo — alrededor de $15,000 para quien declara solo. ¿Ganaste $6,000 en un trabajo de verano? Eso está totalmente bajo el escudo, así que tu impuesto federal sobre la renta es $0, y cualquier impuesto federal sobre la renta que te hayan retenido te lo devuelven al declarar. (Ojo: el FICA es diferente — los impuestos del Seguro Social y de Medicare se aplican desde tu primer dólar de salario y no se reembolsan.)',
        bullets: [
          'Alrededor de $15,000 de ingreso está libre de impuesto federal sobre la renta para quien declara solo',
          'La mayoría de las ganancias de medio tiempo de los adolescentes caen totalmente bajo la deducción estándar',
          'Presentar una declaración es como recuperas el impuesto sobre la renta retenido de más',
          'El FICA (7.65%) sigue aplicándose a todos los salarios — la deducción estándar no lo bloquea',
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
          '$3,000 — el 20% de los $15,000 completos',
          '$1,500 — un 10% fijo sobre todo',
          '$2,000 — 10% más 20% repartido por igual',
          '$2,000 — $1,000 en la primera cubeta más $1,000 sobre los $5,000 por encima de la línea',
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
          'El impuesto predial se cobra cada año sobre casas y terrenos, y es la columna vertebral de los presupuestos locales — sobre todo de las escuelas públicas, junto con bibliotecas, parques y cuerpos de bomberos.',
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
          'Los impuestos sobre la nómina son las deducciones de FICA — 6.2% para el Seguro Social y 1.45% para Medicare — que se toman de los salarios para financiar esos programas. Los empleadores pagan una parte igualada encima.',
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
          'Sus $5,500 quedan totalmente bajo la deducción estándar, así que su cuenta de impuesto federal sobre la renta es $0 — declarar le devuelve los $200 que le retuvieron. El FICA es la excepción: los impuestos del Seguro Social y de Medicare se aplican a todos los salarios y no se reembolsan.',
      },
    ],
  },
}

export default lesson
