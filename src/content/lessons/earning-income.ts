import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'earning-income',
  week: 1,
  day: 1,
  title: 'Earning Income',
  emoji: '💵',
  description:
    'How to begin building an income and interpreting the myriad of numbers that come with it — from types of income to reading your first paystub.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Welcome to BFF Classroom!',
      body:
        "Welcome to Week 1, Day 1! Before we talk about money, let's talk about why we're here. Financial literacy is the knowledge and understanding of the financial concepts, tools, and practices you need to navigate the financial world and make informed choices. Understanding personal finance helps you build a positive relationship with money — so you can spend and save responsibly. Today: how income actually works.",
    },
    {
      type: 'content',
      heading: 'Earned vs. Unearned Income',
      body:
        "Not all money arrives the same way. Earned income is money you receive as payment for work — taxable employee pay. Unearned income is money you earn passively, without clocking in. It's generally taxable too, with some exceptions. Knowing which is which matters, because they're treated differently at tax time.",
      bullets: [
        'Earned income includes: wages (time-based), salaries (not time-based), bonuses, commissions, tips, and self-employed earnings',
        'Unearned income includes: interest on savings, stock dividends, lottery or casino winnings, rental income from properties, inheritances, and gifts',
        'Quick test: did you trade your work for it? Earned. Did it come to you passively? Unearned.',
      ],
    },
    {
      type: 'terms',
      heading: 'Three Flavors of Earned Income',
      terms: [
        {
          term: 'Wages',
          definition:
            'Pay based on hourly work — the most common setup for teenagers. Hourly pay ranges from the federal minimum of $7.25 all the way to hundreds per hour for jobs like lawyers. Many wage-based jobs come from small businesses, internships, and similar gigs.',
        },
        {
          term: 'Salary',
          definition:
            'Pay fixed as a total amount, usually divided into set monthly, biweekly, or weekly payments. Salaried employees receive the same amount regardless of hours worked — unlike wage jobs, which pay by the hour.',
        },
        {
          term: 'Commission',
          definition:
            'Pay that varies based on sales performance, common for agents, salespeople, and advisors. A real estate agent might take a percentage of each sale; a car salesman might take home a set amount per car sold.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Your cousin gets paid $15 for every hour she works at a smoothie shop. What kind of income is that?',
        options: [
          'A salary — the payments are regular',
          'Wages — earned income based on hourly work',
          'Unearned income — smoothies count as passive',
          'A commission — she earns per smoothie sold',
        ],
        answerIndex: 1,
        explanation:
          "Exactly right — pay that's based on hours worked is a wage, which is a classic form of earned income. A salary would be a fixed total amount regardless of hours, and commission would depend on how much she sells, not how long she works.",
      },
    },
    {
      type: 'content',
      heading: 'Factor 1: Education',
      body:
        "What decides how much you earn? Factor one: education. Generally, the more you learn, the more you earn — higher levels of education tend to result in greater incomes, and they open up more opportunities in today's world. Important caveat, straight from us: this does NOT mean you have to go to college! Trades, certifications, and skills all count, as you'll see later in this lesson.",
    },
    {
      type: 'content',
      heading: 'Factor 2: Seniority',
      body:
        'Seniority means extended continuous service with a company or organization — think working at the same company for 20 years versus working at 5 different companies for 4 years each. The people who have worked somewhere the longest have the highest seniority, and it usually pays off. But there is a trade-off.',
      bullets: [
        'Higher seniority generally brings: higher salary, increased priority for promotions, and more paid time off (PTO)',
        'The catch: building seniority reduces your flexibility',
        'You might earn more at another company, or another company might offer a better benefits package',
      ],
    },
    {
      type: 'content',
      heading: 'Factor 3: Skills and Experience',
      body:
        'Skilled workers earn, on average, higher wages than unskilled workers. Everyone has an aptitude — a natural ability to do something — and taking an aptitude test can help you identify areas of work where you might shine. Experience matters just as much: studies find that work experience may contribute as much to income as education does. The more experience you have, the more you get paid.',
    },
    {
      type: 'content',
      heading: 'Factor 4: Macroeconomic Factors',
      body:
        'Some things that affect your income have nothing to do with you. Macroeconomic factors are influential fiscal, natural, or geopolitical events that broadly affect a national economy — like inflation, unemployment, and GDP. The economy moves in cycles, and your paycheck rides along.',
      bullets: [
        'Recessions are times of high unemployment; expansions are times of low unemployment',
        'During recessions, companies have to reduce costs',
        'That often means lower salaries and increased layoffs — even for great employees',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Maria has worked at the same company for 15 years. Which perk is she LEAST likely to get from that seniority?',
        options: [
          'Higher salary',
          'More paid time off',
          'Increased priority for promotions',
          'More flexibility to switch jobs',
        ],
        answerIndex: 3,
        explanation:
          "You got it! Seniority typically brings higher pay, more PTO, and better shots at promotions — but it actually reduces flexibility. Maria might earn more or find better benefits elsewhere, and leaving means starting her seniority clock over.",
      },
    },
    {
      type: 'terms',
      heading: 'Paystubs and Deductions',
      terms: [
        {
          term: 'Paystub',
          definition:
            'A paper or digital record given to an employee with each paycheck. It shows the amount of money the employee earned and the amount removed for taxes, insurance costs, and other deductions.',
        },
        {
          term: 'Gross income',
          definition: 'Your income before deductions — the big number, before anything is taken out.',
        },
        {
          term: 'Net income',
          definition: 'Your income after deductions — the amount you actually take home.',
        },
        {
          term: 'Mandatory deductions',
          definition:
            'Deductions required by law: federal and state income tax, plus FICA taxes, which fund Social Security and Medicare.',
        },
        {
          term: 'Voluntary deductions',
          definition:
            'Deductions you choose, like health insurance premiums, life insurance premiums, and retirement account contributions.',
        },
      ],
    },
    {
      type: 'content',
      heading: 'Anatomy of a Paystub',
      body:
        "A real paystub looks intimidating, but it's just a few zones. First comes pay period info — when the stub was issued and which working days it covers — plus employee info like your work location, employee ID, and payroll contact. There's a section for paid leave (sick, business, necessary, and vacation leave), and your tax status codes (for example, 'M4' means a married individual).",
      bullets: [
        "Gross pay: everything earned over the period, including normal pay, bonuses, and extra pay for credentials like a master's or doctorate",
        'Deductions: employee deductions are withheld from your gross pay; employer deductions are paid by the employer, not taken from you',
        'Net pay: what you actually take home after deductions — always smaller than gross, so don’t be shocked',
        'Current vs. YTD (year-to-date) totals: a running summary, including pre-tax deductions like pension and retirement funds',
      ],
    },
    {
      type: 'example',
      heading: 'Real-World Example: MrBeast',
      body:
        'MrBeast (Jimmy Donaldson) is perhaps one of the most famous entrepreneurs in the world right now, and he makes his money several ways at once. Self-employment: he primarily earns from his own YouTube videos and brand deals built on his own intellectual and digital property — earned income. Business income: owning Feastables and MrBeast Burger are huge assets beyond YouTube. Royalties: much of his money comes from ad revenue and royalties on his videos.',
    },
    {
      type: 'example',
      heading: 'Real-World Example: Mario',
      body:
        "Maybe the most famous plumber in the world, Mario and his brother earn their living with no college degree — representing millions of skilled workers in the trades. Wages and commissions: as a plumber, Mario earns an hourly rate combined with commission-based pay per job. Education: like electricians and other trade workers, he usually needs certification but no bachelor's degree — and can make as much as or more than many who have one. And it's all earned income: he gets paid for his labor (saving princesses, fixing pipes), not passive investments.",
    },
    {
      type: 'example',
      heading: 'Real-World Example: LeBron James',
      body:
        'Over his 20+ year NBA tenure, King James has built a career far beyond the court. Endorsements: LeBron is endorsed by Nike, one of the biggest brands in the world, generating huge income through shoe deals and other companies. Business income: he co-owns businesses like Blaze Pizza and SpringHill Entertainment. Earned income: years of hard work earned him one of the heftiest NBA salaries ever — currently sitting at almost $49 million!',
    },
  ],
  quiz: [
    {
      question: 'Which of the following is an example of UNEARNED income?',
      options: [
        'Tips from waiting tables',
        'A bonus from your employer',
        'Interest on your savings account',
        'Self-employed earnings from mowing lawns',
      ],
      answerIndex: 2,
      explanation:
        'Interest on savings arrives passively — you did not work for those specific dollars, so it is unearned income. Tips, bonuses, and self-employed earnings are all payment for work, which makes them earned income.',
    },
    {
      question:
        'A real estate agent takes home a percentage of every house she sells. What type of pay is this?',
      options: ['Commission', 'Salary', 'Wages', 'Dividends'],
      answerIndex: 0,
      explanation:
        'Pay that varies based on sales performance is commission — common for agents, salespeople, and advisors. Wages are hourly, salaries are a fixed total, and dividends are unearned income from stocks.',
    },
    {
      question: 'What is the main difference between a wage and a salary?',
      options: [
        'Wages are always higher than salaries',
        'Wages are based on hours worked; a salary is a fixed total regardless of hours',
        'Salaries are unearned income; wages are earned income',
        'Only salaries are taxable',
      ],
      answerIndex: 1,
      explanation:
        'Wages pay you per hour of work, while a salary is a fixed total amount split into regular payments no matter how many hours you work. Both are earned income, and both are taxable.',
    },
    {
      question: 'During a recession, which of these is most likely to happen?',
      options: [
        'Unemployment falls and salaries rise',
        'Companies expand hiring rapidly',
        'The federal minimum wage automatically increases',
        'Companies cut costs, leading to lower salaries and more layoffs',
      ],
      answerIndex: 3,
      explanation:
        'Recessions are times of high unemployment. Companies have to reduce costs, which often means lower salaries and increased layoffs. Expansions, by contrast, are times of low unemployment.',
    },
    {
      question: 'Your gross income is $2,000 and your net income is $1,550. What explains the difference?',
      options: [
        'A math error by the payroll department',
        'Employer deductions were added to your pay',
        'Deductions like taxes and insurance were subtracted from your gross pay',
        'Your unearned income was removed',
      ],
      answerIndex: 2,
      explanation:
        'Gross income is your pay before deductions; net income is what remains after deductions like federal and state income tax, FICA taxes, and insurance premiums are taken out. The $450 gap is your deductions.',
    },
    {
      question: 'Which of these is a MANDATORY deduction on a paystub?',
      options: [
        'Retirement account contributions',
        'FICA taxes for Social Security and Medicare',
        'Life insurance premiums',
        'Health insurance premiums',
      ],
      answerIndex: 1,
      explanation:
        'FICA taxes — which fund Social Security and Medicare — are required by law, along with federal and state income taxes. Health insurance, life insurance, and retirement contributions are voluntary deductions you choose.',
    },
    {
      question:
        'Mario earns a great living as a plumber without a college degree. What does his story show about factors affecting income?',
      options: [
        'Education never affects how much you earn',
        'Only unearned income can make you wealthy',
        'Seniority is the only factor that matters',
        'Skilled trade workers with certifications can earn as much as or more than many degree holders',
      ],
      answerIndex: 3,
      explanation:
        "Education generally boosts income, but it doesn't have to mean college. Skilled trades like plumbing and electrical work usually require certification, not a bachelor's degree — and skills and experience can contribute as much to income as education.",
    },
  ],
  es: {
    title: 'Cómo ganar ingresos',
    description:
      'Cómo empezar a generar un ingreso e interpretar todos los números que vienen con él: desde los tipos de ingreso hasta leer tu primer talón de pago.',
    sections: [
      {
        type: 'intro',
        heading: '¡Te damos la bienvenida a BFF Classroom!',
        body:
          '¡Llegaste a la Semana 1, Día 1! Antes de hablar de dinero, hablemos de por qué estamos aquí. La educación financiera es el conocimiento y la comprensión de los conceptos, las herramientas y las prácticas financieras que necesitas para navegar el mundo del dinero y tomar decisiones informadas. Entender las finanzas personales te ayuda a construir una relación positiva con el dinero, para que puedas gastar y ahorrar con responsabilidad. Hoy: cómo funcionan realmente los ingresos.',
      },
      {
        type: 'content',
        heading: 'Ingreso ganado vs. ingreso no ganado',
        body:
          'No todo el dinero llega de la misma manera. El ingreso ganado (earned income) es el dinero que recibes como pago por tu trabajo: la paga gravable de un empleado. El ingreso no ganado (unearned income) es dinero que ganas de forma pasiva, sin marcar tarjeta. En general también paga impuestos, con algunas excepciones. Saber cuál es cuál importa, porque se tratan de forma distinta a la hora de los impuestos.',
        bullets: [
          'El ingreso ganado incluye: salarios por hora (wages), sueldos fijos (salaries), bonos, comisiones, propinas y ganancias del trabajo por cuenta propia',
          'El ingreso no ganado incluye: intereses de tus ahorros, dividendos de acciones, premios de lotería o casino, rentas de propiedades, herencias y regalos',
          'Prueba rápida: ¿lo cambiaste por tu trabajo? Es ganado. ¿Te llegó de forma pasiva? Es no ganado.',
        ],
      },
      {
        type: 'terms',
        heading: 'Tres sabores de ingreso ganado',
        terms: [
          {
            term: 'Salario por hora (wages)',
            definition:
              'Pago basado en horas de trabajo: el formato más común para adolescentes. El pago por hora va desde el mínimo federal de $7.25 hasta cientos de dólares por hora en trabajos como el de abogado. Muchos trabajos por hora vienen de pequeños negocios, pasantías y empleos similares.',
          },
          {
            term: 'Sueldo fijo (salary)',
            definition:
              'Pago fijado como un monto total, normalmente dividido en pagos mensuales, quincenales o semanales establecidos. Los empleados asalariados reciben la misma cantidad sin importar las horas trabajadas, a diferencia de los trabajos por hora.',
          },
          {
            term: 'Comisión (commission)',
            definition:
              'Pago que varía según el desempeño en ventas, común para agentes, vendedores y asesores. Un agente de bienes raíces puede llevarse un porcentaje de cada venta; un vendedor de autos puede llevarse un monto fijo por cada auto vendido.',
          },
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'A tu prima le pagan $15 por cada hora que trabaja en una tienda de licuados. ¿Qué tipo de ingreso es ese?',
          options: [
            'Un sueldo fijo: los pagos son regulares',
            'Salario por hora (wages): ingreso ganado basado en horas trabajadas',
            'Ingreso no ganado: los licuados cuentan como algo pasivo',
            'Una comisión: gana por cada licuado vendido',
          ],
          answerIndex: 1,
          explanation:
            '¡Exacto! El pago basado en horas trabajadas es un salario por hora (wage), una forma clásica de ingreso ganado. Un sueldo fijo sería un monto total sin importar las horas, y una comisión dependería de cuánto vende, no de cuánto tiempo trabaja.',
        },
      },
      {
        type: 'content',
        heading: 'Factor 1: La educación',
        body:
          '¿Qué decide cuánto ganas? Factor uno: la educación. En general, mientras más aprendes, más ganas: los niveles más altos de educación suelen traducirse en mayores ingresos y abren más oportunidades en el mundo de hoy. Aclaración importante, directo de nosotros: ¡esto NO significa que tengas que ir a la universidad! Los oficios, las certificaciones y las habilidades también cuentan, como verás más adelante en esta lección.',
      },
      {
        type: 'content',
        heading: 'Factor 2: La antigüedad',
        body:
          'La antigüedad (seniority) significa servicio continuo y prolongado en una empresa u organización: piensa en trabajar en la misma empresa por 20 años versus trabajar en 5 empresas distintas por 4 años cada una. Las personas que llevan más tiempo en un lugar tienen la mayor antigüedad, y normalmente rinde frutos. Pero hay un precio.',
        bullets: [
          'Mayor antigüedad generalmente trae: mejor sueldo, más prioridad para los ascensos y más días libres pagados (PTO)',
          'El detalle: acumular antigüedad reduce tu flexibilidad',
          'Podrías ganar más en otra empresa, u otra empresa podría ofrecerte un mejor paquete de beneficios',
        ],
      },
      {
        type: 'content',
        heading: 'Factor 3: Habilidades y experiencia',
        body:
          'Los trabajadores calificados ganan, en promedio, mejores salarios que los no calificados. Todos tenemos una aptitud, una habilidad natural para hacer algo, y tomar una prueba de aptitudes puede ayudarte a identificar áreas de trabajo donde podrías brillar. La experiencia importa igual: los estudios encuentran que la experiencia laboral puede aportar al ingreso tanto como la educación. Mientras más experiencia tienes, más te pagan.',
      },
      {
        type: 'content',
        heading: 'Factor 4: Factores macroeconómicos',
        body:
          'Algunas cosas que afectan tu ingreso no tienen nada que ver contigo. Los factores macroeconómicos son eventos fiscales, naturales o geopolíticos influyentes que afectan ampliamente la economía de un país, como la inflación, el desempleo y el PIB. La economía se mueve en ciclos, y tu cheque de pago viaja con ella.',
        bullets: [
          'Las recesiones son épocas de alto desempleo; las expansiones son épocas de bajo desempleo',
          'Durante las recesiones, las empresas tienen que reducir costos',
          'Eso suele significar sueldos más bajos y más despidos, incluso para empleados excelentes',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Maria ha trabajado en la misma empresa por 15 años. ¿Cuál beneficio es MENOS probable que obtenga gracias a esa antigüedad?',
          options: [
            'Un sueldo más alto',
            'Más días libres pagados',
            'Más prioridad para los ascensos',
            'Más flexibilidad para cambiar de trabajo',
          ],
          answerIndex: 3,
          explanation:
            '¡Lo lograste! La antigüedad suele traer mejor paga, más PTO y mejores oportunidades de ascenso, pero en realidad reduce la flexibilidad. Maria podría ganar más o encontrar mejores beneficios en otro lugar, e irse significa reiniciar su reloj de antigüedad desde cero.',
        },
      },
      {
        type: 'terms',
        heading: 'Talones de pago y deducciones',
        terms: [
          {
            term: 'Talón de pago (paystub)',
            definition:
              'Un registro en papel o digital que se entrega al empleado con cada cheque de pago. Muestra la cantidad de dinero que ganó el empleado y la cantidad que se le descontó por impuestos, costos de seguros y otras deducciones.',
          },
          {
            term: 'Ingreso bruto (gross income)',
            definition:
              'Tu ingreso antes de las deducciones: el número grande, antes de que le quiten nada.',
          },
          {
            term: 'Ingreso neto (net income)',
            definition:
              'Tu ingreso después de las deducciones: la cantidad que realmente te llevas a casa.',
          },
          {
            term: 'Deducciones obligatorias (mandatory deductions)',
            definition:
              'Deducciones exigidas por ley: el impuesto federal y estatal sobre el ingreso, más los impuestos FICA, que financian el Seguro Social (Social Security) y Medicare.',
          },
          {
            term: 'Deducciones voluntarias (voluntary deductions)',
            definition:
              'Deducciones que tú eliges, como las primas del seguro médico, las primas del seguro de vida y las contribuciones a cuentas de jubilación.',
          },
        ],
      },
      {
        type: 'content',
        heading: 'Anatomía de un talón de pago',
        body:
          "Un talón de pago real se ve intimidante, pero solo son unas cuantas zonas. Primero viene la información del período de pago (cuándo se emitió el talón y qué días laborales cubre), más tus datos de empleado, como tu lugar de trabajo, tu número de empleado y el contacto de nómina. Hay una sección para los permisos pagados (por enfermedad, asuntos de trabajo, necesidad y vacaciones) y tus códigos de estado fiscal (por ejemplo, 'M4' significa una persona casada).",
        bullets: [
          'Pago bruto (gross pay): todo lo ganado en el período, incluyendo el pago normal, bonos y pagos extra por credenciales como una maestría o un doctorado',
          'Deducciones: las deducciones del empleado se retienen de tu pago bruto; las deducciones del empleador las paga el empleador, no salen de tu bolsillo',
          'Pago neto (net pay): lo que realmente te llevas a casa después de las deducciones. Siempre es menor que el bruto, así que no te asustes',
          'Totales actuales vs. YTD (year-to-date, acumulado del año): un resumen continuo que incluye deducciones antes de impuestos, como los fondos de pensión y jubilación',
        ],
      },
      {
        type: 'example',
        heading: 'Ejemplo de la vida real: MrBeast',
        body:
          'MrBeast (Jimmy Donaldson) es quizás uno de los emprendedores más famosos del mundo en este momento, y gana su dinero de varias formas a la vez. Trabajo por cuenta propia: gana principalmente con sus propios videos de YouTube y acuerdos de marca construidos sobre su propia propiedad intelectual y digital — ingreso ganado. Ingresos de negocios: ser dueño de Feastables y MrBeast Burger son activos enormes más allá de YouTube. Regalías: gran parte de su dinero viene de los ingresos por publicidad y las regalías de sus videos.',
      },
      {
        type: 'example',
        heading: 'Ejemplo de la vida real: Mario',
        body:
          'Quizás el plomero más famoso del mundo, Mario y su hermano se ganan la vida sin un título universitario, representando a millones de trabajadores calificados de los oficios. Salario por hora y comisiones: como plomero, Mario gana una tarifa por hora combinada con pagos por comisión por cada trabajo. Educación: igual que los electricistas y otros trabajadores de oficios, normalmente necesita una certificación pero no una licenciatura, y puede ganar tanto o más que muchos que sí la tienen. Y todo es ingreso ganado: le pagan por su trabajo (rescatar princesas, arreglar tuberías), no por inversiones pasivas.',
      },
      {
        type: 'example',
        heading: 'Ejemplo de la vida real: LeBron James',
        body:
          'A lo largo de sus más de 20 años en la NBA, King James ha construido una carrera que va mucho más allá de la cancha. Patrocinios: LeBron es patrocinado por Nike, una de las marcas más grandes del mundo, generando ingresos enormes con contratos de tenis y otras empresas. Ingresos de negocios: es copropietario de negocios como Blaze Pizza y SpringHill Entertainment. Ingreso ganado: años de trabajo duro le ganaron uno de los sueldos más altos de la historia de la NBA — ¡actualmente casi $49 millones!',
      },
    ],
    quiz: [
      {
        question: '¿Cuál de los siguientes es un ejemplo de ingreso NO ganado?',
        options: [
          'Propinas por atender mesas',
          'Un bono de tu empleador',
          'Los intereses de tu cuenta de ahorros',
          'Ganancias por cuenta propia por cortar el césped',
        ],
        answerIndex: 2,
        explanation:
          'Los intereses de los ahorros llegan de forma pasiva: no trabajaste por esos dólares específicos, así que son ingreso no ganado. Las propinas, los bonos y las ganancias por cuenta propia son pagos por trabajo, lo que los convierte en ingreso ganado.',
      },
      {
        question:
          'Una agente de bienes raíces se lleva un porcentaje de cada casa que vende. ¿Qué tipo de pago es este?',
        options: ['Comisión', 'Sueldo fijo', 'Salario por hora', 'Dividendos'],
        answerIndex: 0,
        explanation:
          'El pago que varía según el desempeño en ventas es la comisión, común para agentes, vendedores y asesores. El salario por hora se paga por hora, el sueldo fijo es un monto total fijo, y los dividendos son ingreso no ganado que viene de las acciones.',
      },
      {
        question: '¿Cuál es la diferencia principal entre un salario por hora (wage) y un sueldo fijo (salary)?',
        options: [
          'El salario por hora siempre es más alto que el sueldo fijo',
          'El salario por hora se basa en las horas trabajadas; el sueldo fijo es un monto total sin importar las horas',
          'El sueldo fijo es ingreso no ganado; el salario por hora es ingreso ganado',
          'Solo el sueldo fijo paga impuestos',
        ],
        answerIndex: 1,
        explanation:
          'El salario por hora te paga por cada hora de trabajo, mientras que el sueldo fijo es un monto total dividido en pagos regulares sin importar cuántas horas trabajes. Ambos son ingreso ganado, y ambos pagan impuestos.',
      },
      {
        question: 'Durante una recesión, ¿cuál de estas cosas es más probable que ocurra?',
        options: [
          'El desempleo baja y los sueldos suben',
          'Las empresas contratan gente a gran velocidad',
          'El salario mínimo federal sube automáticamente',
          'Las empresas recortan costos, lo que lleva a sueldos más bajos y más despidos',
        ],
        answerIndex: 3,
        explanation:
          'Las recesiones son épocas de alto desempleo. Las empresas tienen que reducir costos, lo que a menudo significa sueldos más bajos y más despidos. Las expansiones, en cambio, son épocas de bajo desempleo.',
      },
      {
        question: 'Tu ingreso bruto es de $2,000 y tu ingreso neto es de $1,550. ¿Qué explica la diferencia?',
        options: [
          'Un error de cálculo del departamento de nómina',
          'Las deducciones del empleador se sumaron a tu pago',
          'Se restaron de tu pago bruto deducciones como impuestos y seguros',
          'Te quitaron tu ingreso no ganado',
        ],
        answerIndex: 2,
        explanation:
          'El ingreso bruto es tu pago antes de las deducciones; el ingreso neto es lo que queda después de restar deducciones como el impuesto federal y estatal sobre el ingreso, los impuestos FICA y las primas de seguros. Esa brecha de $450 son tus deducciones.',
      },
      {
        question: '¿Cuál de estas es una deducción OBLIGATORIA en un talón de pago?',
        options: [
          'Las contribuciones a cuentas de jubilación',
          'Los impuestos FICA para el Seguro Social y Medicare',
          'Las primas del seguro de vida',
          'Las primas del seguro médico',
        ],
        answerIndex: 1,
        explanation:
          'Los impuestos FICA, que financian el Seguro Social y Medicare, son exigidos por ley, junto con los impuestos federales y estatales sobre el ingreso. El seguro médico, el seguro de vida y las contribuciones para la jubilación son deducciones voluntarias que tú eliges.',
      },
      {
        question:
          'Mario se gana muy bien la vida como plomero sin un título universitario. ¿Qué muestra su historia sobre los factores que afectan el ingreso?',
        options: [
          'La educación nunca afecta cuánto ganas',
          'Solo el ingreso no ganado puede hacerte rico',
          'La antigüedad es el único factor que importa',
          'Los trabajadores calificados de los oficios con certificaciones pueden ganar tanto o más que muchos con título universitario',
        ],
        answerIndex: 3,
        explanation:
          'La educación generalmente aumenta el ingreso, pero no tiene que significar universidad. Los oficios calificados como la plomería y la electricidad normalmente requieren una certificación, no una licenciatura, y las habilidades y la experiencia pueden aportar al ingreso tanto como la educación.',
      },
    ],
  },
  zh: {
    title: '赚取收入',
    description:
      '如何开始建立收入，并读懂随之而来的各种数字——从收入的类型，到看懂你人生的第一张工资单。',
    sections: [
      {
        type: 'intro',
        heading: '欢迎来到 BFF Classroom！',
        body:
          '欢迎来到第一周，第一天！在聊钱之前，先聊聊我们为什么在这里。金融素养是指你在金融世界里做出明智选择所需要的金融概念、工具和实践方面的知识与理解。理解个人理财能帮你和钱建立一种积极的关系——让你可以负责任地花钱和存钱。今天的主题：收入到底是怎么运作的。',
      },
      {
        type: 'content',
        heading: '劳动所得 vs. 非劳动所得',
        body:
          '并不是所有的钱都以同样的方式到来。劳动所得（earned income）是你因工作而得到的报酬——需要纳税的员工薪酬。非劳动所得（unearned income）是你被动赚到的钱，不用打卡上班。它一般也要纳税，但有一些例外。分清楚哪个是哪个很重要，因为报税时它们的处理方式不一样。',
        bullets: [
          '劳动所得包括：工资（按时间计算的 wages）、薪水（不按时间计算的 salaries）、奖金、佣金、小费，以及自雇收入',
          '非劳动所得包括：存款利息、股票分红、彩票或赌场奖金、房产租金收入、遗产，以及礼金',
          '快速判断法：这是你用工作换来的吗？那是劳动所得。它是被动到你手上的吗？那是非劳动所得。',
        ],
      },
      {
        type: 'terms',
        heading: '劳动所得的三种类型',
        terms: [
          {
            term: '工资（Wages）',
            definition:
              '按小时工作计算的报酬——这是青少年最常见的形式。时薪从联邦最低标准的 $7.25，一直到像律师这样每小时几百美元的工作都有。很多按小时计酬的工作来自小企业、实习和类似的零工。',
          },
          {
            term: '薪水（Salary）',
            definition:
              '以一个固定总额确定的报酬，通常按设定好的月、双周或每周分期发放。领薪水的员工不管工作多少小时，拿到的金额都一样——这和按小时计酬的工作不同。',
          },
          {
            term: '佣金（Commission）',
            definition:
              '根据销售业绩而变动的报酬，常见于经纪人、销售员和顾问。房地产经纪人可能从每笔交易中抽取一定比例；汽车销售员每卖出一辆车可能拿到一笔固定金额。',
          },
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            '你表姐在一家冰沙店工作，每工作一小时就拿到 $15。这属于哪种收入？',
          options: [
            '薪水——因为付款是定期的',
            '工资（wages）——基于按小时工作的劳动所得',
            '非劳动所得——冰沙算是被动的',
            '佣金——她每卖出一杯冰沙就赚钱',
          ],
          answerIndex: 1,
          explanation:
            '完全正确——基于工作小时数的报酬就是工资（wage），这是劳动所得的经典形式。薪水是不管工时多少都固定的总额，而佣金取决于她卖出多少，而不是她工作多久。',
        },
      },
      {
        type: 'content',
        heading: '因素一：教育',
        body:
          '是什么决定你能赚多少？因素一：教育。一般来说，你学得越多，赚得越多——更高的教育水平往往带来更高的收入，也在当今世界打开更多机会。一个很重要的说明，我们要直接告诉你：这并不意味着你必须上大学！技术工种、职业证书和各种技能同样重要，你在本课后面会看到。',
      },
      {
        type: 'content',
        heading: '因素二：资历',
        body:
          '资历（seniority）指的是在一家公司或组织里长期连续地工作——想象一下在同一家公司工作 20 年，与在 5 家不同公司各工作 4 年之间的区别。在一个地方待得最久的人资历最高，而这通常是有回报的。但也有代价。',
        bullets: [
          '更高的资历一般带来：更高的薪水、更优先的晋升机会，以及更多的带薪休假（PTO）',
          '代价是：积累资历会降低你的灵活度',
          '你在另一家公司也许能赚得更多，或者另一家公司可能提供更好的福利待遇',
        ],
      },
      {
        type: 'content',
        heading: '因素三：技能与经验',
        body:
          '技术工人的平均工资高于非技术工人。每个人都有一种天赋（aptitude）——做某件事的天生能力，做一次天赋测试可以帮你找出你可能大放异彩的工作领域。经验同样重要：研究发现，工作经验对收入的贡献可能不亚于教育。你的经验越多，得到的报酬就越高。',
      },
      {
        type: 'content',
        heading: '因素四：宏观经济因素',
        body:
          '有些影响你收入的事情跟你本人一点关系都没有。宏观经济因素是指那些广泛影响一国经济的重大财政、自然或地缘政治事件——比如通货膨胀、失业率和 GDP。经济会周期性波动，而你的工资也随之起伏。',
        bullets: [
          '衰退期是高失业率的时期；扩张期是低失业率的时期',
          '在衰退期，公司不得不削减成本',
          '这往往意味着更低的薪水和更多的裁员——即使是很优秀的员工也不例外',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Maria 在同一家公司工作了 15 年。凭这份资历，她最不可能得到下面哪一项好处？',
          options: [
            '更高的薪水',
            '更多的带薪休假',
            '更优先的晋升机会',
            '更换工作时更大的灵活度',
          ],
          answerIndex: 3,
          explanation:
            '答对了！资历通常带来更高的薪酬、更多的 PTO 和更好的晋升机会——但它实际上会降低灵活度。Maria 在别处也许能赚更多或找到更好的福利，而一旦离开，她的资历时钟就得从头开始。',
        },
      },
      {
        type: 'terms',
        heading: '工资单与扣款',
        terms: [
          {
            term: '工资单（Paystub）',
            definition:
              '随每张工资支票一起发给员工的纸质或电子记录。它显示员工赚到的金额，以及因税款、保险费用和其他扣款而被扣除的金额。',
          },
          {
            term: '税前收入（Gross income）',
            definition: '你扣款之前的收入——就是那个大数字，在扣掉任何东西之前。',
          },
          {
            term: '税后收入（Net income）',
            definition: '你扣款之后的收入——你实际拿回家的金额。',
          },
          {
            term: '强制扣款（Mandatory deductions）',
            definition:
              '法律要求的扣款：联邦和州所得税，再加上 FICA 税，用来资助 Social Security（社会保障）和 Medicare。',
          },
          {
            term: '自愿扣款（Voluntary deductions）',
            definition:
              '你自己选择的扣款，比如医疗保险费、人寿保险费，以及退休账户的缴款。',
          },
        ],
      },
      {
        type: 'content',
        heading: '工资单的结构解析',
        body:
          '一张真实的工资单看起来很吓人，但其实只是几个区块。首先是发薪周期信息——工资单是什么时候开出的、涵盖哪些工作日——再加上你的员工信息，比如工作地点、员工编号和薪资联系人。还有一个区块记录带薪假（病假、事假、必要假和年假），以及你的报税状态代码（例如，「M4」表示一位已婚人士）。',
        bullets: [
          '税前工资（gross pay）：这一周期内赚到的全部，包括正常工资、奖金，以及因硕士或博士等学历而多拿的报酬',
          '扣款：员工扣款从你的税前工资中扣除；雇主扣款由雇主支付，不从你这里扣',
          '税后工资（net pay）：扣款之后你实际拿回家的钱——总是比税前少，所以别被吓到',
          '本期 vs. YTD（year-to-date，年初至今）合计：一个滚动的汇总，包括养老金和退休金等税前扣款',
        ],
      },
      {
        type: 'example',
        heading: '现实案例：MrBeast',
        body:
          'MrBeast（Jimmy Donaldson）大概是当今世界上最出名的创业者之一，他同时用好几种方式赚钱。自雇：他主要靠自己的 YouTube 视频和建立在自己知识产权和数字资产之上的品牌合作赚钱——属于劳动所得。企业收入：拥有 Feastables 和 MrBeast Burger 是 YouTube 之外的巨大资产。版税：他的钱有很大一部分来自视频的广告收入和版税。',
      },
      {
        type: 'example',
        heading: '现实案例：Mario',
        body:
          '也许是世界上最出名的水管工，Mario 和他的兄弟没有大学学位就能谋生——代表着技术工种里数以百万计的技术工人。工资与佣金：作为水管工，Mario 赚的是时薪加上按每项工作计算的佣金。教育：和电工及其他技术工人一样，他通常需要职业证书，但不需要学士学位——而且能赚得跟很多有学位的人一样多，甚至更多。这一切都是劳动所得：他是靠自己的劳动（拯救公主、修理水管）拿到报酬，而不是靠被动投资。',
      },
      {
        type: 'example',
        heading: '现实案例：LeBron James',
        body:
          '在他 20 多年的 NBA 生涯中，「詹皇」打造出了一份远远超越球场的事业。代言：LeBron 由 Nike 代言，那是世界上最大的品牌之一，通过球鞋合约和其他公司为他带来巨额收入。企业收入：他是 Blaze Pizza 和 SpringHill Entertainment 等企业的联合所有人。劳动所得：多年的努力为他赢得了 NBA 历史上最丰厚的薪水之一——目前接近 $4900 万！',
      },
    ],
    quiz: [
      {
        question: '下列哪一项是非劳动所得（UNEARNED income）的例子？',
        options: [
          '当服务员得到的小费',
          '你雇主发的奖金',
          '你储蓄账户的利息',
          '帮人割草挣到的自雇收入',
        ],
        answerIndex: 2,
        explanation:
          '存款利息是被动到来的——你并没有为那几块钱具体去工作，所以它是非劳动所得。小费、奖金和自雇收入都是工作的报酬，因此属于劳动所得。',
      },
      {
        question:
          '一位房地产经纪人从她卖出的每一套房子中拿走一定比例。这是哪种报酬？',
        options: ['佣金', '薪水', '工资', '分红'],
        answerIndex: 0,
        explanation:
          '根据销售业绩变动的报酬就是佣金——常见于经纪人、销售员和顾问。工资是按小时计算的，薪水是固定总额，而分红是来自股票的非劳动所得。',
      },
      {
        question: '工资（wage）和薪水（salary）之间的主要区别是什么？',
        options: [
          '工资总是比薪水高',
          '工资基于工作的小时数；薪水是不管工时多少都固定的总额',
          '薪水是非劳动所得；工资是劳动所得',
          '只有薪水需要纳税',
        ],
        answerIndex: 1,
        explanation:
          '工资是按你工作的每一小时付给你，而薪水是一个固定总额，不管你工作多少小时都分成定期发放。两者都是劳动所得，也都要纳税。',
      },
      {
        question: '在衰退期，下面哪种情况最有可能发生？',
        options: [
          '失业率下降，薪水上升',
          '公司迅速扩大招聘',
          '联邦最低工资自动上调',
          '公司削减成本，导致薪水更低、裁员更多',
        ],
        answerIndex: 3,
        explanation:
          '衰退期是高失业率的时期。公司不得不削减成本，这往往意味着更低的薪水和更多的裁员。相比之下，扩张期则是低失业率的时期。',
      },
      {
        question: '你的税前收入是 $2,000，税后收入是 $1,550。这个差额是怎么来的？',
        options: [
          '薪资部门算错了',
          '雇主扣款被加到了你的工资里',
          '税款和保险等扣款从你的税前工资中被扣掉了',
          '你的非劳动所得被扣走了',
        ],
        answerIndex: 2,
        explanation:
          '税前收入是你扣款之前的工资；税后收入是扣掉联邦和州所得税、FICA 税以及保险费等扣款之后剩下的。那 $450 的差额就是你的扣款。',
      },
      {
        question: '下面哪一项是工资单上的强制（MANDATORY）扣款？',
        options: [
          '退休账户缴款',
          '用于 Social Security 和 Medicare 的 FICA 税',
          '人寿保险费',
          '医疗保险费',
        ],
        answerIndex: 1,
        explanation:
          'FICA 税——用来资助 Social Security 和 Medicare——是法律要求的，联邦和州所得税也是。医疗保险、人寿保险和退休缴款则是你自己选择的自愿扣款。',
      },
      {
        question:
          'Mario 没有大学学位，却靠当水管工过上了很好的生活。他的故事说明了影响收入的因素方面的什么道理？',
        options: [
          '教育永远不会影响你赚多少',
          '只有非劳动所得才能让你致富',
          '资历是唯一重要的因素',
          '有职业证书的技术工人可以赚得跟很多有学位的人一样多，甚至更多',
        ],
        answerIndex: 3,
        explanation:
          '教育一般会提高收入，但这不一定意味着上大学。像水管和电工这样的技术工种通常需要职业证书，而不是学士学位——而且技能和经验对收入的贡献可以不亚于教育。',
      },
    ],
  },
}

export default lesson
