import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'risk-insurance',
  week: 3,
  day: 1,
  title: 'Risk Management & Insurance',
  emoji: '🛡️',
  description:
    'Understand how to manage risks, budget insurance policies, and prepare yourself for the unexpected.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Welcome to Week 3!',
      body:
        "Life is full of surprises, and not all of them are the fun kind. A fender bender, a cracked phone screen, a sudden illness. Today you'll learn how insurance helps you prepare for the unexpected so one bad day doesn't wreck your finances. Let's cover our bases!",
    },
    {
      type: 'content',
      heading: 'Warm-Up: Protect It or Risk It?',
      body:
        "Think about an expensive item you use every day, like your phone. Would you rather pay $10 a month to protect it, or risk paying $1,000 later if something goes wrong? There's no single right answer, but this exact trade-off is what insurance is all about. Keep your answer in mind as we go.",
    },
    {
      type: 'content',
      heading: 'What Is Risk?',
      body:
        "Risk is the chance that something bad or unexpected will happen. Financial risk is the chance of losing money because of an accident, illness, theft, or disaster. Here's the key idea: everyone faces risk. You can't eliminate it, but you can absolutely prepare for it.",
      bullets: [
        'Getting into a car accident',
        'Not being able to work because of a sickness',
        'Having something valuable stolen',
        'A disaster damaging your home or belongings',
      ],
    },
    {
      type: 'content',
      heading: 'How Insurance Works',
      body:
        "Insurance is protection for the things you care about. You pay a little each month, called a premium, to avoid paying a huge amount if something bad happens. If disaster strikes, you file a claim, which is your request to the insurance company for help covering the loss. But there's a catch: almost every policy also has a deductible, the amount you must pay out of pocket before insurance covers the rest.",
    },
    {
      type: 'terms',
      heading: 'Insurance Vocabulary',
      terms: [
        {
          term: 'Risk',
          definition: 'The chance that something bad or unexpected will happen.',
        },
        {
          term: 'Financial Risk',
          definition:
            'The chance of losing money because of an accident, illness, theft, or disaster.',
        },
        {
          term: 'Premium',
          definition:
            'The small amount you pay each month to keep your insurance active.',
        },
        {
          term: 'Claim',
          definition:
            'The request you make to your insurance company for help covering a loss.',
        },
        {
          term: 'Deductible',
          definition:
            'The amount you must pay out of pocket before insurance covers the rest.',
        },
        {
          term: 'Coverage',
          definition:
            'What your policy protects, such as medical bills, car damage, or theft.',
        },
      ],
    },
    {
      type: 'example',
      heading: 'A Deductible in Action',
      body:
        "Say you have car insurance with a $500 deductible. You get into an accident and the repairs cost $2,000. You pay the first $500, and your insurance pays the remaining $1,500. Without insurance, that whole $2,000 bill would have been yours. Ouch.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'You have insurance with a $300 deductible. A covered accident causes $1,200 in damage. How much do you pay out of pocket?',
        options: ['$1,200', '$300', '$900', '$0'],
        answerIndex: 1,
        explanation:
          'Nice work! The deductible is what you pay before insurance kicks in. You pay $300, and insurance covers the remaining $900.',
      },
    },
    {
      type: 'content',
      heading: 'The Big Idea: Transferring Risk',
      body:
        "The main idea behind insurance is the transference of risk. Bad things can still happen to you, but with insurance, you get financial assistance when they do. The risk is transferred from you (the insured) to the insurance company (the insurer). There are many types of insurance with different kinds of coverage, and even subtypes inside each one. For example, a high-deductible health plan is a subset of health insurance.",
    },
    {
      type: 'content',
      heading: 'Premiums and Deductibles: The Seesaw',
      body:
        "Premiums and deductibles are inversely related. When one goes up, the other goes down, like a seesaw. Choosing between them depends on how likely you are to file claims.",
      bullets: [
        'High premiums mean a low deductible. This is better if you have higher risk and expect to file more claims.',
        'A high deductible means low premiums. This is better if you have lower risk and rarely file claims.',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Maya rarely gets sick and almost never visits the doctor. Based on the premium-deductible seesaw, which plan probably makes more sense for her?',
        options: [
          'High premium, low deductible',
          'High premium, high deductible',
          'Low premium, high deductible',
          'No insurance at all, since she is healthy',
        ],
        answerIndex: 2,
        explanation:
          "Exactly! Since Maya rarely files claims, she can save money with lower monthly premiums and accept a higher deductible. And skipping insurance entirely is risky, because no one can predict the unexpected.",
      },
    },
    {
      type: 'content',
      heading: 'Types of Insurance: Health and Auto',
      body:
        "Health insurance is an agreement where an insurance company pays some or all of your medical expenses, like doctor visits, hospital stays, and medicines, in exchange for a monthly premium. Many health plans include a copayment, a set amount you pay when you see a doctor or dentist while the insurance company pays the rest. Auto insurance covers damage to your car and to others if you get into an accident.",
      bullets: [
        'Liability insurance is required by law in most states and covers damages to other people and their vehicles.',
        'Collision coverage pays for damage to your own vehicle in a crash.',
        'Comprehensive coverage handles damage not caused by collisions, like hail or theft.',
      ],
    },
    {
      type: 'video',
      heading: "Watch: I'm Young & Healthy — Can I Skip Health Insurance?",
      body:
        "Lots of young people figure they don't need health insurance. Two Cents runs the numbers on that gamble. The video pauses to quiz you, so stay sharp!",
      videoId: 'WTtjmdyTCRM',
      source: 'Two Cents · PBS Digital Studios',
      questions: [
        {
          at: 100,
          question: 'Why do even young, healthy people need health insurance?',
          options: [
            'It is a fashion statement',
            'Accidents and sudden illnesses can hit anyone — and the bills can be enormous',
            'Doctors refuse to see uninsured people',
            'They do not — young people never get sick',
          ],
          answerIndex: 1,
          explanation:
            'A single broken leg or emergency surgery can cost tens of thousands of dollars. You cannot schedule your accidents — that is exactly the kind of huge, unpredictable risk insurance exists to cover.',
        },
        {
          at: 240,
          question: 'At its core, what does insurance protect you from?',
          options: [
            'Ever having to pay a premium',
            'A giant surprise bill wiping out your finances',
            'Small everyday costs, like snacks',
            'Paying taxes',
          ],
          answerIndex: 1,
          explanation:
            "Insurance transfers the BIG risks — the catastrophic, budget-destroying bills — to the insurance company in exchange for a predictable premium. You handle the small stuff; it catches the disasters.",
        },
      ],
    },
    {
      type: 'content',
      heading: 'Types of Insurance: Home, Renters, and Life',
      body:
        "Homeowners insurance covers losses and damages to your residence, your furnishings, and other assets, plus liability coverage for accidents on the property. If a thief steals your flat-screen TV, you may be compensated for its cash value. Renters insurance is similar but protects tenants in a rented place like an apartment. If an apartment fire damages your clothes and laptop, renters insurance replaces them. Life insurance provides money to your beneficiaries, usually family, if you pass away. It matters most when someone depends on your income, like young children who cannot work. Common types include term and whole-life insurance.",
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Jordan rents an apartment. A kitchen fire destroys his laptop and clothes. Which insurance would replace his belongings?',
        options: [
          'Homeowners insurance',
          'Liability auto insurance',
          'Life insurance',
          'Renters insurance',
        ],
        answerIndex: 3,
        explanation:
          'You got it! Renters insurance protects tenants in a rented dwelling, covering personal property, liability claims, and extra living expenses when a unit is damaged.',
      },
    },
    {
      type: 'example',
      heading: 'Cover Your Bases: Planning for Ben',
      body:
        "In class, we play Cover Your Bases. You already made Ben's budget, and now you plan his insurance premiums with a $500 budget. The goal is to pick the coverage that fits his life best, using your whole budget without going over. At the end, we reveal what actually happened to Ben this month and see which premiums paid off. It's a great reminder that smart insurance choices are about matching coverage to real risks, not buying everything or nothing.",
    },
  ],
  quiz: [
    {
      question: 'What is financial risk?',
      options: [
        'The guarantee that you will lose money every year',
        'The chance of losing money because of an accident, illness, theft, or disaster',
        'The fee a bank charges for a checking account',
        'The interest you earn on a savings account',
      ],
      answerIndex: 1,
      explanation:
        'Financial risk is the chance of losing money due to accidents, illness, theft, or disaster. You cannot eliminate risk, but you can prepare for it.',
    },
    {
      question: 'What is a premium?',
      options: [
        'The amount you pay each month to keep your insurance active',
        'The amount you pay out of pocket before insurance covers a loss',
        'A request to your insurance company for help covering a loss',
        'A reward the insurance company pays you for safe driving',
      ],
      answerIndex: 0,
      explanation:
        'The premium is the small, regular payment you make, usually monthly, so that insurance protects you from paying a huge amount later.',
    },
    {
      question:
        'You have a $500 deductible on your car insurance and your accident repairs cost $2,000. How much does the insurance company pay?',
      options: ['$2,000', '$500', '$1,500', '$0'],
      answerIndex: 2,
      explanation:
        'You pay your $500 deductible first, and insurance pays the remaining $1,500 of the $2,000 repair bill.',
    },
    {
      question: 'The main idea behind insurance is best described as...',
      options: [
        'Eliminating all risk from your life',
        'Earning investment profits on monthly payments',
        'Avoiding taxes on large purchases',
        'Transferring risk from the insured to the insurer',
      ],
      answerIndex: 3,
      explanation:
        'Insurance transfers risk from you to the insurance company. Bad things can still happen, but you get financial assistance when they do.',
    },
    {
      question: 'How are premiums and deductibles related?',
      options: [
        'They are always exactly equal',
        'They are inversely related: when one is high, the other is low',
        'They both rise and fall together',
        'They have no relationship at all',
      ],
      answerIndex: 1,
      explanation:
        'Premiums and deductibles work like a seesaw. High premiums come with low deductibles, and high deductibles come with low premiums.',
    },
    {
      question:
        'Which type of auto insurance is required by law in most states?',
      options: [
        'Comprehensive coverage',
        'Collision coverage',
        'Liability insurance',
        'Rental reimbursement coverage',
      ],
      answerIndex: 2,
      explanation:
        'Liability insurance, which covers damages to other people and their vehicles, is required by law in most states.',
    },
    {
      question:
        'A set amount you pay when you visit the doctor while your health insurance pays the rest is called a...',
      options: ['Copayment', 'Beneficiary', 'Claim', 'Premium'],
      answerIndex: 0,
      explanation:
        'That set fee is a copayment. Many health insurance policies include copayments for doctor, dentist, and other health care visits.',
    },
    {
      question: 'Life insurance is usually most important for people who...',
      options: [
        'Want to protect their car from theft',
        'Rent an apartment instead of owning a home',
        'Never plan to visit a doctor',
        'Have someone who depends on their income, like young children',
      ],
      answerIndex: 3,
      explanation:
        'Life insurance provides money to your beneficiaries if you pass away, so it matters most when someone, like young children, relies on your income.',
    },
  ],
  es: {
    title: 'Manejo de riesgos y seguros',
    description:
      'Comprende cómo manejar los riesgos, presupuestar pólizas de seguro y prepararte para lo inesperado.',
    sections: [
      {
        type: 'intro',
        heading: '¡Te damos la bienvenida a la semana 3!',
        body:
          'La vida está llena de sorpresas, y no todas son de las divertidas. Un choque leve, una pantalla de teléfono rota, una enfermedad repentina. Hoy aprenderás cómo el seguro te ayuda a prepararte para lo inesperado, para que un mal día no arruine tus finanzas. ¡Vamos a cubrir todas las bases!',
      },
      {
        type: 'content',
        heading: 'Calentamiento: ¿lo proteges o te arriesgas?',
        body:
          'Piensa en un objeto caro que usas todos los días, como tu teléfono. ¿Preferirías pagar $10 al mes para protegerlo, o arriesgarte a pagar $1,000 después si algo sale mal? No hay una única respuesta correcta, pero de este intercambio exacto se trata el seguro. Ten tu respuesta en mente mientras avanzamos.',
      },
      {
        type: 'content',
        heading: '¿Qué es el riesgo?',
        body:
          'El riesgo es la posibilidad de que ocurra algo malo o inesperado. El riesgo financiero es la posibilidad de perder dinero por un accidente, una enfermedad, un robo o un desastre. Aquí va la idea clave: todos enfrentamos riesgos. No puedes eliminarlos, pero sí puedes prepararte para ellos.',
        bullets: [
          'Tener un accidente de auto',
          'No poder trabajar por una enfermedad',
          'Que te roben algo valioso',
          'Un desastre que dañe tu casa o tus pertenencias',
        ],
      },
      {
        type: 'content',
        heading: 'Cómo funciona el seguro',
        body:
          'El seguro es protección para las cosas que te importan. Pagas un poco cada mes, lo que se llama prima, para evitar pagar una cantidad enorme si algo malo sucede. Si ocurre un desastre, presentas un reclamo, que es tu solicitud a la compañía de seguros para que te ayude a cubrir la pérdida. Pero hay un detalle: casi toda póliza también tiene un deducible, la cantidad que debes pagar de tu bolsillo antes de que el seguro cubra el resto.',
      },
      {
        type: 'terms',
        heading: 'Vocabulario de seguros',
        terms: [
          {
            term: 'Riesgo (risk)',
            definition: 'La posibilidad de que ocurra algo malo o inesperado.',
          },
          {
            term: 'Riesgo financiero (financial risk)',
            definition:
              'La posibilidad de perder dinero por un accidente, una enfermedad, un robo o un desastre.',
          },
          {
            term: 'Prima (premium)',
            definition:
              'La pequeña cantidad que pagas cada mes para mantener tu seguro activo.',
          },
          {
            term: 'Reclamo (claim)',
            definition:
              'La solicitud que le haces a tu compañía de seguros para que te ayude a cubrir una pérdida.',
          },
          {
            term: 'Deducible (deductible)',
            definition:
              'La cantidad que debes pagar de tu bolsillo antes de que el seguro cubra el resto.',
          },
          {
            term: 'Cobertura (coverage)',
            definition:
              'Lo que protege tu póliza, como gastos médicos, daños al auto o robos.',
          },
        ],
      },
      {
        type: 'example',
        heading: 'Un deducible en acción',
        body:
          'Supón que tienes un seguro de auto con un deducible de $500. Tienes un accidente y las reparaciones cuestan $2,000. Tú pagas los primeros $500 y tu seguro paga los $1,500 restantes. Sin seguro, esa factura completa de $2,000 habría sido tuya. ¡Auch!',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Tienes un seguro con un deducible de $300. Un accidente cubierto causa $1,200 en daños. ¿Cuánto pagas de tu bolsillo?',
          options: ['$1,200', '$300', '$900', '$0'],
          answerIndex: 1,
          explanation:
            '¡Bien hecho! El deducible es lo que pagas antes de que el seguro entre en acción. Tú pagas $300 y el seguro cubre los $900 restantes.',
        },
      },
      {
        type: 'content',
        heading: 'La gran idea: transferir el riesgo',
        body:
          'La idea principal detrás del seguro es la transferencia del riesgo. Las cosas malas todavía pueden pasarte, pero con un seguro recibes ayuda financiera cuando ocurren. El riesgo se transfiere de ti (el asegurado) a la compañía de seguros (el asegurador). Existen muchos tipos de seguro con distintas coberturas, e incluso subtipos dentro de cada uno. Por ejemplo, un plan de salud con deducible alto es un subtipo del seguro de salud.',
      },
      {
        type: 'content',
        heading: 'Primas y deducibles: el sube y baja',
        body:
          'Las primas y los deducibles están inversamente relacionados. Cuando uno sube, el otro baja, como un sube y baja. Elegir entre ellos depende de qué tan probable sea que presentes reclamos.',
        bullets: [
          'Primas altas significan un deducible bajo. Esto es mejor si tienes un riesgo más alto y esperas presentar más reclamos.',
          'Un deducible alto significa primas bajas. Esto es mejor si tienes un riesgo más bajo y casi nunca presentas reclamos.',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Maya casi nunca se enferma y rara vez visita al doctor. Según el sube y baja de primas y deducibles, ¿qué plan probablemente tiene más sentido para ella?',
          options: [
            'Prima alta, deducible bajo',
            'Prima alta, deducible alto',
            'Prima baja, deducible alto',
            'Ningún seguro, ya que está sana',
          ],
          answerIndex: 2,
          explanation:
            '¡Exacto! Como Maya casi nunca presenta reclamos, puede ahorrar dinero con primas mensuales más bajas y aceptar un deducible más alto. Y quedarse sin seguro por completo es arriesgado, porque nadie puede predecir lo inesperado.',
        },
      },
      {
        type: 'content',
        heading: 'Tipos de seguro: salud y auto',
        body:
          'El seguro de salud es un acuerdo en el que una compañía de seguros paga una parte o la totalidad de tus gastos médicos, como visitas al doctor, estancias en el hospital y medicinas, a cambio de una prima mensual. Muchos planes de salud incluyen un copago (copayment), una cantidad fija que pagas cuando ves al doctor o al dentista mientras la compañía de seguros paga el resto. El seguro de auto cubre los daños a tu carro y a otras personas si tienes un accidente.',
        bullets: [
          'El seguro de responsabilidad civil (liability) es obligatorio por ley en la mayoría de los estados y cubre los daños a otras personas y a sus vehículos.',
          'La cobertura de colisión (collision) paga los daños a tu propio vehículo en un choque.',
          'La cobertura amplia (comprehensive) se encarga de los daños que no son por choques, como el granizo o los robos.',
        ],
      },
      {
        type: 'video',
        heading: 'Mira: Soy joven y saludable, ¿puedo saltarme el seguro de salud?',
        body:
          'Muchos jóvenes piensan que no necesitan seguro de salud. Two Cents hace las cuentas de esa apuesta. Ojo: el video está en inglés, pero las preguntas y explicaciones aparecen en español. El video se pausa para ponerte a prueba, ¡así que mantente alerta!',
        videoId: 'WTtjmdyTCRM',
        source: 'Two Cents · PBS Digital Studios',
        questions: [
          {
            at: 100,
            question:
              '¿Por qué incluso los jóvenes saludables necesitan seguro de salud?',
            options: [
              'Es una declaración de moda',
              'Los accidentes y las enfermedades repentinas le pueden pasar a cualquiera, y las facturas pueden ser enormes',
              'Los doctores se niegan a atender a personas sin seguro',
              'No lo necesitan: los jóvenes nunca se enferman',
            ],
            answerIndex: 1,
            explanation:
              'Una sola pierna rota o una cirugía de emergencia puede costar decenas de miles de dólares. No puedes agendar tus accidentes; ese es exactamente el tipo de riesgo enorme e impredecible que el seguro existe para cubrir.',
          },
          {
            at: 240,
            question: 'En esencia, ¿de qué te protege el seguro?',
            options: [
              'De tener que pagar una prima alguna vez',
              'De que una factura sorpresa gigante arrase con tus finanzas',
              'De los pequeños gastos diarios, como los snacks',
              'De pagar impuestos',
            ],
            answerIndex: 1,
            explanation:
              'El seguro transfiere los riesgos GRANDES, esas facturas catastróficas que destruyen presupuestos, a la compañía de seguros a cambio de una prima predecible. Tú te encargas de lo pequeño; el seguro atrapa los desastres.',
          },
        ],
      },
      {
        type: 'content',
        heading: 'Tipos de seguro: hogar, inquilinos y vida',
        body:
          'El seguro de propietarios de vivienda (homeowners) cubre pérdidas y daños a tu residencia, tus muebles y otros bienes, además de cobertura de responsabilidad civil por accidentes en la propiedad. Si un ladrón se roba tu televisor de pantalla plana, podrías recibir una compensación por su valor en efectivo. El seguro de inquilinos (renters) es similar, pero protege a quienes rentan un lugar, como un apartamento. Si un incendio en el apartamento daña tu ropa y tu laptop, el seguro de inquilinos las reemplaza. El seguro de vida les da dinero a tus beneficiarios, normalmente tu familia, si falleces. Importa más cuando alguien depende de tus ingresos, como niños pequeños que no pueden trabajar. Los tipos más comunes incluyen el seguro a término (term) y el de vida entera (whole life).',
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'Jordan renta un apartamento. Un incendio en la cocina destruye su laptop y su ropa. ¿Qué seguro reemplazaría sus pertenencias?',
          options: [
            'Seguro de propietarios de vivienda',
            'Seguro de auto de responsabilidad civil',
            'Seguro de vida',
            'Seguro de inquilinos',
          ],
          answerIndex: 3,
          explanation:
            '¡Lo lograste! El seguro de inquilinos protege a quienes rentan una vivienda: cubre las pertenencias personales, los reclamos de responsabilidad civil y los gastos de vivienda adicionales cuando la unidad sufre daños.',
        },
      },
      {
        type: 'example',
        heading: 'Cubre tus bases: un plan para Ben',
        body:
          'En clase jugamos Cover Your Bases. Ya hiciste el presupuesto de Ben, y ahora planeas sus primas de seguro con un presupuesto de $500. La meta es elegir la cobertura que mejor se ajuste a su vida, usando todo tu presupuesto sin pasarte. Al final, revelamos qué le pasó realmente a Ben este mes y vemos qué primas valieron la pena. Es un gran recordatorio de que las decisiones inteligentes de seguro se tratan de ajustar la cobertura a los riesgos reales, no de comprarlo todo o no comprar nada.',
      },
    ],
    quiz: [
      {
        question: '¿Qué es el riesgo financiero?',
        options: [
          'La garantía de que perderás dinero cada año',
          'La posibilidad de perder dinero por un accidente, una enfermedad, un robo o un desastre',
          'La comisión que cobra un banco por una cuenta de cheques',
          'El interés que ganas en una cuenta de ahorros',
        ],
        answerIndex: 1,
        explanation:
          'El riesgo financiero es la posibilidad de perder dinero por accidentes, enfermedades, robos o desastres. No puedes eliminar el riesgo, pero sí puedes prepararte para él.',
      },
      {
        question: '¿Qué es una prima?',
        options: [
          'La cantidad que pagas cada mes para mantener tu seguro activo',
          'La cantidad que pagas de tu bolsillo antes de que el seguro cubra una pérdida',
          'Una solicitud a tu compañía de seguros para que te ayude a cubrir una pérdida',
          'Una recompensa que la compañía de seguros te paga por manejar con cuidado',
        ],
        answerIndex: 0,
        explanation:
          'La prima es el pago pequeño y regular que haces, normalmente cada mes, para que el seguro te proteja de pagar una cantidad enorme después.',
      },
      {
        question:
          'Tienes un deducible de $500 en tu seguro de auto y las reparaciones de tu accidente cuestan $2,000. ¿Cuánto paga la compañía de seguros?',
        options: ['$2,000', '$500', '$1,500', '$0'],
        answerIndex: 2,
        explanation:
          'Primero pagas tu deducible de $500, y el seguro paga los $1,500 restantes de la factura de reparación de $2,000.',
      },
      {
        question: 'La idea principal detrás del seguro se describe mejor como...',
        options: [
          'Eliminar todo el riesgo de tu vida',
          'Ganar utilidades de inversión con los pagos mensuales',
          'Evitar impuestos en las compras grandes',
          'Transferir el riesgo del asegurado al asegurador',
        ],
        answerIndex: 3,
        explanation:
          'El seguro transfiere el riesgo de ti a la compañía de seguros. Las cosas malas todavía pueden pasar, pero recibes ayuda financiera cuando ocurren.',
      },
      {
        question: '¿Cómo se relacionan las primas y los deducibles?',
        options: [
          'Siempre son exactamente iguales',
          'Están inversamente relacionados: cuando uno es alto, el otro es bajo',
          'Suben y bajan juntos',
          'No tienen ninguna relación',
        ],
        answerIndex: 1,
        explanation:
          'Las primas y los deducibles funcionan como un sube y baja. Las primas altas vienen con deducibles bajos, y los deducibles altos vienen con primas bajas.',
      },
      {
        question:
          '¿Qué tipo de seguro de auto es obligatorio por ley en la mayoría de los estados?',
        options: [
          'Cobertura amplia (comprehensive)',
          'Cobertura de colisión (collision)',
          'Seguro de responsabilidad civil (liability)',
          'Cobertura de reembolso de auto rentado',
        ],
        answerIndex: 2,
        explanation:
          'El seguro de responsabilidad civil, que cubre los daños a otras personas y a sus vehículos, es obligatorio por ley en la mayoría de los estados.',
      },
      {
        question:
          'Una cantidad fija que pagas cuando visitas al doctor mientras tu seguro de salud paga el resto se llama...',
        options: ['Copago (copayment)', 'Beneficiario', 'Reclamo', 'Prima'],
        answerIndex: 0,
        explanation:
          'Esa cantidad fija es un copago. Muchas pólizas de seguro de salud incluyen copagos para visitas al doctor, al dentista y otros servicios de salud.',
      },
      {
        question: 'El seguro de vida suele ser más importante para las personas que...',
        options: [
          'Quieren proteger su carro contra robos',
          'Rentan un apartamento en lugar de tener casa propia',
          'Nunca planean visitar al doctor',
          'Tienen a alguien que depende de sus ingresos, como niños pequeños',
        ],
        answerIndex: 3,
        explanation:
          'El seguro de vida les da dinero a tus beneficiarios si falleces, así que importa más cuando alguien, como niños pequeños, depende de tus ingresos.',
      },
    ],
  },
}

export default lesson
