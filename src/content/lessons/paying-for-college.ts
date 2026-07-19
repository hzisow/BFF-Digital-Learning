import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'paying-for-college',
  week: 5,
  day: 3,
  title: 'Paying for College',
  emoji: '🎓',
  description:
    'Learn to shrink scary sticker prices, stack free money before loans, and shop for college like the smartest purchase of your life — because it just might be.',
  durationMin: 15,
  sections: [
    {
      type: 'intro',
      heading: 'The Biggest Purchase of Your Teenage Life',
      body:
        "College can be one of the best investments you'll ever make — and one of the most expensive. But here's the secret almost nobody tells you: the giant price on the website is like the first price at a flea market. Almost nobody pays it. Today you'll learn how financial aid actually works, how to compare offers like a pro shopper, and how to make sure a degree pays you back. 🎓",
    },
    {
      type: 'content',
      heading: 'Sticker Price vs. Net Price',
      body:
        "The sticker price (officially the 'cost of attendance') is the full published cost: tuition, fees, housing, food, and books. The net price is what YOU actually pay after grants and scholarships are subtracted. These can be wildly different — a private college with a $60,000 sticker can end up cheaper than a state school with a $28,000 sticker once aid is applied. Never cross a school off your list from the sticker price alone.",
      bullets: [
        'Sticker price = the full published cost of attendance',
        'Net price = sticker price minus free money (grants + scholarships)',
        "Most colleges have a 'net price calculator' on their website — try it before you apply",
        'Compare colleges by net price, never by sticker price',
      ],
    },
    {
      type: 'content',
      heading: 'FAFSA: The Form That Unlocks the Vault',
      body:
        "The FAFSA — Free Application for Federal Student Aid — is THE key that unlocks most financial aid in America. You (and a parent or guardian) fill it out online for free each fall of your senior year and every year of college. It uses your family's financial info to figure out what aid you qualify for. Skipping it is like leaving a scholarship check on the sidewalk: billions in aid goes unclaimed every year because students never applied.",
      bullets: [
        'FAFSA is 100% FREE to file at studentaid.gov — never pay a site to submit it',
        'It unlocks federal grants, work-study, and federal student loans',
        'Many states and colleges also use it to award their own aid',
        'File it every year, even if you think your family earns too much — you might be surprised',
      ],
    },
    {
      type: 'terms',
      heading: 'The Financial Aid Menu',
      terms: [
        {
          term: 'FAFSA',
          definition:
            'The Free Application for Federal Student Aid — the free government form that determines your eligibility for grants, work-study, and federal loans.',
        },
        {
          term: 'Grant',
          definition:
            'Free money for college, usually based on financial need (like the federal Pell Grant). You never pay it back.',
        },
        {
          term: 'Scholarship',
          definition:
            'Free money usually awarded for merit — grades, sports, art, essays, community service. Also never paid back, and you can stack many small ones.',
        },
        {
          term: 'Work-study',
          definition:
            'A federal program that gives you a part-time campus job so you can earn money for expenses while enrolled.',
        },
        {
          term: 'Subsidized loan',
          definition:
            'A need-based federal loan where the government pays the interest while you are in school — the friendliest loan you can get.',
        },
        {
          term: 'Unsubsidized loan',
          definition:
            'A federal loan available regardless of need, but interest starts growing from day one, even while you are still in class.',
        },
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          'Which of these do you NOT have to pay back after college?',
        options: [
          'A subsidized federal loan',
          'An unsubsidized federal loan',
          'A private bank loan',
          'A Pell Grant',
        ],
        answerIndex: 3,
        explanation:
          'Grants and scholarships are free money — they never get paid back. Every kind of loan, no matter how friendly the terms, must be repaid with interest. That is why the golden order is: free money first, loans last.',
      },
    },
    {
      type: 'content',
      heading: 'The Golden Order: Free Money First',
      body:
        "Not all aid is created equal, so smart students take it in a strict order. First, grab every grant and scholarship you can — that money is free. Next, take work-study if offered; you earn it, but you never owe it. Only THEN consider loans, and even those have a ranking: subsidized federal loans first (the government covers your interest while in school), unsubsidized federal loans second (interest ticks from day one), and private loans dead last — they usually have higher rates and far fewer protections.",
      bullets: [
        '1. Grants and scholarships — free, never repaid',
        '2. Work-study — earned money, never owed',
        '3. Subsidized federal loans — no interest while in school',
        '4. Unsubsidized federal loans — interest grows from day one',
        '5. Private loans — a last resort only',
      ],
    },
    {
      type: 'example',
      heading: 'Example: The Award Letter Showdown',
      body:
        "Amara gets into two schools. College A has a $32,000 sticker price and offers her an $18,000 grant-and-scholarship package — net price: $14,000. College B has a $22,000 sticker price but offers only $5,000 in free money — net price: $17,000. Plot twist: the 'expensive' school is actually $3,000 per year cheaper — $12,000 cheaper over four years! But watch out: College B's letter also lists a $7,500 loan in big friendly letters as part of the 'award.' Loans are not a discount — they are just a bill with a delay. 🔍",
    },
    {
      type: 'content',
      heading: 'Reading Award Letters Like a Pro',
      body:
        "After you're accepted, each college sends a financial aid award letter — and some are sneakily designed to make the school look cheaper than it is. Some letters mix loans right in with grants so the 'total aid' looks huge. Your job: separate the free money from the borrowed money, and calculate the real net price yourself.",
      bullets: [
        'Subtract ONLY grants and scholarships from the sticker price to get net price',
        'Loans and work-study are not discounts — never subtract them',
        "Check if scholarships are renewable for all four years, and what GPA keeps them",
        'Ask each school for the same numbers so you can compare apples to apples',
      ],
    },
    {
      type: 'checkpoint',
      checkpoint: {
        question:
          "A college's sticker price is $30,000. Your award letter lists a $12,000 scholarship, $2,000 work-study, and a $5,500 loan. What is your real net price?",
        options: [
          '$10,500 — subtract everything on the letter',
          '$18,000 — subtract only the $12,000 scholarship',
          '$12,500 — subtract the scholarship and loan',
          '$30,000 — aid never changes the price',
        ],
        answerIndex: 1,
        explanation:
          'Perfect! Only free money lowers your price: $30,000 - $12,000 = $18,000 net price. The work-study is money you would have to earn, and the loan is money you would have to pay back — neither one is a discount.',
      },
    },
    {
      type: 'content',
      heading: 'The Community College Power Move',
      body:
        "Here's a route that saves students tens of thousands of dollars: two years at a community college (often around $4,000 per year in tuition), then transferring to a four-year university to finish your bachelor's degree. Your diploma looks exactly the same as everyone else's — it only lists the school you graduated from. Many states even have guaranteed transfer agreements with their public universities. Two years at $4,000 instead of $25,000 can mean graduating with little or no debt. That is a power move, not a plan B. 💪",
    },
    {
      type: 'content',
      heading: 'ROI: Think Like an Investor',
      body:
        "A degree is an investment, so think about its return. Research the starting salaries for careers you're considering — an engineering grad might start around $75,000 while some fields start closer to $40,000. Neither is 'wrong,' but your borrowing should match your future income. The classic rule of thumb: try to borrow LESS in total than your expected first-year salary. If you expect to earn $50,000 in year one, keep total loans under $50,000 — that usually keeps payments manageable. Debt way beyond that number can shadow you for decades.",
      bullets: [
        'Rule of thumb: total student debt below your expected first-year salary',
        'Look up real starting salaries for majors and careers before you borrow',
        'A lower-cost path to the same career is a higher return on investment',
        'Trades, certificates, and apprenticeships are strong ROI paths too — college is one route, not the only one',
      ],
    },
    {
      type: 'example',
      heading: "Example: Maya's ROI Game Plan",
      body:
        'Maya wants to be a teacher and finds that starting salaries near her are around $46,000 — so her borrowing ceiling is $46,000, and her stretch goal is way less. Her plan: two years at community college ($4,200 per year), then transfer to her state university ($11,000 per year after a $4,000 renewable transfer scholarship). Total four-year tuition: about $30,400. With a part-time job, a Pell Grant, and summer work, she borrows just $15,000 total — one third of her borrowing ceiling. Same classroom, same diploma, and a monthly loan payment her teacher salary can handle easily. 🍎',
    },
  ],
  quiz: [
    {
      question: 'What is the difference between sticker price and net price?',
      options: [
        'Sticker price includes housing; net price is tuition only',
        'Net price is the published cost; sticker price is what you pay',
        'Sticker price is the full published cost; net price is what you actually pay after grants and scholarships',
        'They are always the same number',
      ],
      answerIndex: 2,
      explanation:
        'The sticker price is the full published cost of attendance, while net price subtracts your free money (grants and scholarships). Since most students get some aid, net price is the number that matters when comparing schools.',
    },
    {
      question: 'What does filing the FAFSA cost, and what does it unlock?',
      options: [
        'It costs $99 and unlocks scholarships only',
        'It is free and unlocks federal grants, work-study, and federal student loans',
        'It is free but only wealthy families qualify',
        'It costs $50 and guarantees admission to state schools',
      ],
      answerIndex: 1,
      explanation:
        'The FAFSA is completely free at studentaid.gov and is the gateway to federal grants, work-study, and federal loans — plus much state and college aid. Any site charging you to file it is a scam.',
    },
    {
      question: 'What is the key difference between subsidized and unsubsidized federal loans?',
      options: [
        'Subsidized loans never have to be repaid',
        'Unsubsidized loans are only for graduate students',
        'Subsidized loans have no dollar limit',
        'The government pays the interest on subsidized loans while you are in school; unsubsidized loans grow interest from day one',
      ],
      answerIndex: 3,
      explanation:
        'Both are federal loans you must repay, but subsidized loans (based on financial need) charge no interest while you are enrolled because the government covers it. Unsubsidized loans start accruing interest immediately.',
    },
    {
      question: 'What is work-study?',
      options: [
        'A federal program giving you a part-time job to earn money for college expenses',
        'A grant for students who promise to study more',
        'A loan you repay by working after graduation',
        'A homework-help subscription service',
      ],
      answerIndex: 0,
      explanation:
        'Work-study is a federal program (unlocked by the FAFSA) that provides part-time jobs, often on campus, so students can earn money while enrolled. You earn it as wages — it is never owed back, but it is not a discount either.',
    },
    {
      question:
        'College X: $40,000 sticker with $24,000 in grants. College Y: $25,000 sticker with $6,000 in grants. Which is cheaper to attend?',
      options: [
        'College Y — its sticker price is lower',
        'College X — its net price is $16,000 versus $19,000 for College Y',
        'They cost the same',
        'Impossible to tell without loan amounts',
      ],
      answerIndex: 1,
      explanation:
        'Net price is what counts: College X costs $40,000 - $24,000 = $16,000, while College Y costs $25,000 - $6,000 = $19,000. The school with the scarier sticker is actually $3,000 cheaper per year — which is exactly why you never judge by sticker price.',
    },
    {
      question:
        'Jordan expects a $48,000 starting salary in his chosen career. By the rule of thumb, what is the most total student debt he should take on?',
      options: [
        'Whatever the college offers him',
        'About $96,000 — double his salary is fine',
        'Under $48,000 — total borrowing below his expected first-year salary',
        '$0 — all student loans are always a mistake',
      ],
      answerIndex: 2,
      explanation:
        'The rule of thumb says keep total borrowing under your expected first-year salary — for Jordan, under $48,000 — so payments stay manageable. Borrowing less is even better, but modest loans for a degree with solid earning power can be a reasonable investment.',
    },
  ],
  es: {
    title: 'Cómo pagar la universidad',
    description:
      'Aprende a reducir precios de etiqueta que dan miedo, a apilar dinero gratis antes que préstamos y a comprar universidad como la compra más inteligente de tu vida — porque podría serlo.',
    sections: [
      {
        type: 'intro',
        heading: 'La compra más grande de tu adolescencia',
        body:
          'La universidad puede ser una de las mejores inversiones que hagas en la vida — y una de las más caras. Pero aquí está el secreto que casi nadie te cuenta: el precio gigante de la página web es como el primer precio en un mercadillo. Casi nadie lo paga. Hoy vas a aprender cómo funciona de verdad la ayuda financiera, cómo comparar ofertas como un comprador experto y cómo asegurarte de que un título te pague de vuelta. 🎓',
      },
      {
        type: 'content',
        heading: 'Precio de etiqueta vs. precio neto',
        body:
          'El precio de etiqueta (oficialmente el "costo de asistencia" o cost of attendance) es el costo total publicado: matrícula, cuotas, alojamiento, comida y libros. El precio neto es lo que TÚ pagas en realidad después de restar becas y subvenciones. Estos pueden ser muy distintos — una universidad privada con un precio de etiqueta de $60,000 puede terminar más barata que una universidad estatal con etiqueta de $28,000 una vez aplicada la ayuda. Nunca taches una escuela de tu lista solo por el precio de etiqueta.',
        bullets: [
          'Precio de etiqueta = el costo total publicado de asistencia',
          'Precio neto = precio de etiqueta menos el dinero gratis (subvenciones + becas)',
          'La mayoría de las universidades tienen una "calculadora de precio neto" en su sitio web — pruébala antes de postularte',
          'Compara universidades por el precio neto, nunca por el precio de etiqueta',
        ],
      },
      {
        type: 'content',
        heading: 'FAFSA: el formulario que abre la bóveda',
        body:
          'La FAFSA — Solicitud Gratuita de Ayuda Federal para Estudiantes (Free Application for Federal Student Aid) — es LA llave que abre la mayor parte de la ayuda financiera en Estados Unidos. Tú (y un padre, madre o tutor) la llenan en línea gratis cada otoño de tu último año de preparatoria y cada año de universidad. Usa la información financiera de tu familia para calcular a qué ayuda calificas. Saltártela es como dejar un cheque de beca tirado en la banqueta: cada año quedan sin reclamar miles de millones en ayuda porque los estudiantes nunca la solicitaron.',
        bullets: [
          'La FAFSA es 100% GRATIS de presentar en studentaid.gov — nunca le pagues a un sitio por enviarla',
          'Abre subvenciones federales, trabajo-estudio y préstamos estudiantiles federales',
          'Muchos estados y universidades también la usan para otorgar su propia ayuda',
          'Preséntala cada año, aunque creas que tu familia gana demasiado — te podrías sorprender',
        ],
      },
      {
        type: 'terms',
        heading: 'El menú de la ayuda financiera',
        terms: [
          {
            term: 'FAFSA',
            definition:
              'La Solicitud Gratuita de Ayuda Federal para Estudiantes (Free Application for Federal Student Aid) — el formulario gratuito del gobierno que determina tu elegibilidad para subvenciones, trabajo-estudio y préstamos federales.',
          },
          {
            term: 'Subvención (grant)',
            definition:
              'Dinero gratis para la universidad, por lo general basado en necesidad económica (como la subvención federal Pell). Nunca lo devuelves.',
          },
          {
            term: 'Beca (scholarship)',
            definition:
              'Dinero gratis que normalmente se otorga por mérito — calificaciones, deportes, arte, ensayos, servicio comunitario. Tampoco se devuelve, y puedes apilar muchas pequeñas.',
          },
          {
            term: 'Trabajo-estudio (work-study)',
            definition:
              'Un programa federal que te da un empleo de medio tiempo en el campus para que ganes dinero para tus gastos mientras estás inscrito.',
          },
          {
            term: 'Préstamo subsidiado (subsidized loan)',
            definition:
              'Un préstamo federal basado en necesidad en el que el gobierno paga los intereses mientras estás en la escuela — el préstamo más amable que puedes conseguir.',
          },
          {
            term: 'Préstamo no subsidiado (unsubsidized loan)',
            definition:
              'Un préstamo federal disponible sin importar la necesidad, pero los intereses empiezan a crecer desde el primer día, incluso mientras sigues en clase.',
          },
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            '¿Cuál de estos NO tienes que devolver después de la universidad?',
          options: [
            'Un préstamo federal subsidiado',
            'Un préstamo federal no subsidiado',
            'Un préstamo de un banco privado',
            'Una subvención Pell',
          ],
          answerIndex: 3,
          explanation:
            'Las subvenciones y las becas son dinero gratis — nunca se devuelven. Todo tipo de préstamo, por más amables que sean las condiciones, debe pagarse con intereses. Por eso el orden dorado es: primero el dinero gratis, los préstamos al final.',
        },
      },
      {
        type: 'content',
        heading: 'El orden dorado: primero el dinero gratis',
        body:
          'No toda la ayuda es igual, así que los estudiantes inteligentes la toman en un orden estricto. Primero, agarra cada subvención y beca que puedas — ese dinero es gratis. Luego, toma el trabajo-estudio si te lo ofrecen; te lo ganas, pero nunca lo debes. Solo ENTONCES considera los préstamos, y hasta esos tienen un ranking: primero los préstamos federales subsidiados (el gobierno cubre tus intereses mientras estás en la escuela), segundo los préstamos federales no subsidiados (los intereses corren desde el primer día), y los préstamos privados de últimos — suelen tener tasas más altas y muchas menos protecciones.',
        bullets: [
          '1. Subvenciones y becas — gratis, nunca se devuelven',
          '2. Trabajo-estudio — dinero ganado, nunca debido',
          '3. Préstamos federales subsidiados — sin intereses mientras estás en la escuela',
          '4. Préstamos federales no subsidiados — los intereses crecen desde el primer día',
          '5. Préstamos privados — solo como último recurso',
        ],
      },
      {
        type: 'example',
        heading: 'Ejemplo: el duelo de las cartas de oferta',
        body:
          'A Amara la aceptan en dos escuelas. La Universidad A tiene un precio de etiqueta de $32,000 y le ofrece un paquete de subvención y beca de $18,000 — precio neto: $14,000. La Universidad B tiene un precio de etiqueta de $22,000 pero le ofrece solo $5,000 en dinero gratis — precio neto: $17,000. Giro inesperado: la escuela "cara" en realidad es $3,000 más barata al año — ¡$12,000 más barata en cuatro años! Pero cuidado: la carta de la Universidad B también incluye un préstamo de $7,500 en letras grandes y amigables como parte de la "oferta". Los préstamos no son un descuento — son solo una factura con retraso. 🔍',
      },
      {
        type: 'content',
        heading: 'Leer las cartas de oferta como un experto',
        body:
          'Después de que te aceptan, cada universidad te envía una carta de oferta de ayuda financiera — y algunas están diseñadas con astucia para que la escuela parezca más barata de lo que es. Algunas cartas mezclan préstamos justo con las subvenciones para que la "ayuda total" se vea enorme. Tu trabajo: separar el dinero gratis del dinero prestado, y calcular tú mismo el precio neto real.',
        bullets: [
          'Resta SOLO las subvenciones y becas del precio de etiqueta para obtener el precio neto',
          'Los préstamos y el trabajo-estudio no son descuentos — nunca los restes',
          'Revisa si las becas son renovables por los cuatro años, y qué promedio (GPA) las mantiene',
          'Pídele a cada escuela los mismos números para poder comparar peras con peras',
        ],
      },
      {
        type: 'checkpoint',
        checkpoint: {
          question:
            'El precio de etiqueta de una universidad es $30,000. Tu carta de oferta incluye una beca de $12,000, $2,000 de trabajo-estudio y un préstamo de $5,500. ¿Cuál es tu precio neto real?',
          options: [
            '$10,500 — resta todo lo que aparece en la carta',
            '$18,000 — resta solo la beca de $12,000',
            '$12,500 — resta la beca y el préstamo',
            '$30,000 — la ayuda nunca cambia el precio',
          ],
          answerIndex: 1,
          explanation:
            '¡Perfecto! Solo el dinero gratis reduce tu precio: $30,000 - $12,000 = $18,000 de precio neto. El trabajo-estudio es dinero que tendrías que ganar, y el préstamo es dinero que tendrías que devolver — ninguno de los dos es un descuento.',
        },
      },
      {
        type: 'content',
        heading: 'La jugada maestra del colegio comunitario',
        body:
          'Aquí hay una ruta que le ahorra a los estudiantes decenas de miles de dólares: dos años en un colegio comunitario (a menudo alrededor de $4,000 al año de matrícula), y luego transferirte a una universidad de cuatro años para terminar tu licenciatura. Tu diploma se ve exactamente igual al de todos los demás — solo lleva el nombre de la escuela de la que te graduaste. Muchos estados incluso tienen acuerdos de transferencia garantizada con sus universidades públicas. Dos años a $4,000 en lugar de $25,000 puede significar graduarte con poca o ninguna deuda. Eso es una jugada maestra, no un plan B. 💪',
      },
      {
        type: 'content',
        heading: 'ROI: piensa como inversionista',
        body:
          'Un título es una inversión, así que piensa en su retorno. Investiga los salarios iniciales de las carreras que estás considerando — alguien graduado en ingeniería podría empezar en unos $75,000 mientras que algunos campos empiezan más cerca de $40,000. Ninguno está "mal", pero lo que pidas prestado debería ir acorde con tu ingreso futuro. La regla general clásica: trata de pedir prestado en total MENOS que tu salario esperado del primer año. Si esperas ganar $50,000 en el año uno, mantén el total de préstamos por debajo de $50,000 — eso suele mantener los pagos manejables. Una deuda muy por encima de ese número puede perseguirte por décadas.',
        bullets: [
          'Regla general: deuda estudiantil total por debajo de tu salario esperado del primer año',
          'Busca salarios iniciales reales para las carreras y profesiones antes de pedir prestado',
          'Una ruta de menor costo hacia la misma profesión es un mayor retorno de la inversión',
          'Los oficios, certificados y aprendizajes también son rutas de buen ROI — la universidad es una opción, no la única',
        ],
      },
      {
        type: 'example',
        heading: 'Ejemplo: el plan de ROI de Maya',
        body:
          'Maya quiere ser maestra y descubre que los salarios iniciales cerca de ella rondan los $46,000 — así que su techo para pedir prestado es $46,000, y su meta ambiciosa es mucho menos. Su plan: dos años en un colegio comunitario ($4,200 al año), luego transferirse a la universidad estatal ($11,000 al año después de una beca de transferencia renovable de $4,000). Matrícula total de cuatro años: alrededor de $30,400. Con un trabajo de medio tiempo, una subvención Pell y trabajo de verano, pide prestado apenas $15,000 en total — un tercio de su techo para pedir prestado. El mismo salón de clases, el mismo diploma, y un pago mensual de préstamo que su salario de maestra puede manejar con facilidad. 🍎',
      },
    ],
    quiz: [
      {
        question: '¿Cuál es la diferencia entre el precio de etiqueta y el precio neto?',
        options: [
          'El precio de etiqueta incluye el alojamiento; el precio neto es solo la matrícula',
          'El precio neto es el costo publicado; el precio de etiqueta es lo que pagas',
          'El precio de etiqueta es el costo total publicado; el precio neto es lo que pagas en realidad después de subvenciones y becas',
          'Siempre son el mismo número',
        ],
        answerIndex: 2,
        explanation:
          'El precio de etiqueta es el costo total publicado de asistencia, mientras que el precio neto resta tu dinero gratis (subvenciones y becas). Como la mayoría de los estudiantes reciben algo de ayuda, el precio neto es el número que importa al comparar escuelas.',
      },
      {
        question: '¿Cuánto cuesta presentar la FAFSA, y qué desbloquea?',
        options: [
          'Cuesta $99 y desbloquea solo becas',
          'Es gratis y desbloquea subvenciones federales, trabajo-estudio y préstamos estudiantiles federales',
          'Es gratis pero solo califican las familias adineradas',
          'Cuesta $50 y garantiza la admisión a las escuelas estatales',
        ],
        answerIndex: 1,
        explanation:
          'La FAFSA es completamente gratis en studentaid.gov y es la puerta de entrada a subvenciones federales, trabajo-estudio y préstamos federales — además de mucha ayuda estatal y universitaria. Cualquier sitio que te cobre por presentarla es una estafa.',
      },
      {
        question: '¿Cuál es la diferencia clave entre los préstamos federales subsidiados y no subsidiados?',
        options: [
          'Los préstamos subsidiados nunca se tienen que devolver',
          'Los préstamos no subsidiados son solo para estudiantes de posgrado',
          'Los préstamos subsidiados no tienen límite en dólares',
          'El gobierno paga los intereses de los préstamos subsidiados mientras estás en la escuela; los no subsidiados generan intereses desde el primer día',
        ],
        answerIndex: 3,
        explanation:
          'Ambos son préstamos federales que debes devolver, pero los préstamos subsidiados (basados en necesidad económica) no cobran intereses mientras estás inscrito porque el gobierno los cubre. Los préstamos no subsidiados empiezan a acumular intereses de inmediato.',
      },
      {
        question: '¿Qué es el trabajo-estudio?',
        options: [
          'Un programa federal que te da un empleo de medio tiempo para ganar dinero para los gastos universitarios',
          'Una subvención para estudiantes que prometen estudiar más',
          'Un préstamo que devuelves trabajando después de graduarte',
          'Un servicio de suscripción de ayuda con la tarea',
        ],
        answerIndex: 0,
        explanation:
          'El trabajo-estudio es un programa federal (que desbloquea la FAFSA) que ofrece empleos de medio tiempo, a menudo en el campus, para que los estudiantes ganen dinero mientras están inscritos. Lo ganas como salario — nunca se debe devolver, pero tampoco es un descuento.',
      },
      {
        question:
          'Universidad X: $40,000 de etiqueta con $24,000 en subvenciones. Universidad Y: $25,000 de etiqueta con $6,000 en subvenciones. ¿Cuál es más barata para asistir?',
        options: [
          'Universidad Y — su precio de etiqueta es más bajo',
          'Universidad X — su precio neto es $16,000 frente a $19,000 de la Universidad Y',
          'Cuestan lo mismo',
          'Imposible saberlo sin los montos de los préstamos',
        ],
        answerIndex: 1,
        explanation:
          'El precio neto es lo que cuenta: la Universidad X cuesta $40,000 - $24,000 = $16,000, mientras que la Universidad Y cuesta $25,000 - $6,000 = $19,000. La escuela con la etiqueta más aterradora en realidad es $3,000 más barata al año — que es exactamente por qué nunca juzgas por el precio de etiqueta.',
      },
      {
        question:
          'Jordan espera un salario inicial de $48,000 en la carrera que eligió. Según la regla general, ¿cuál es la deuda estudiantil total máxima que debería asumir?',
        options: [
          'La que sea que le ofrezca la universidad',
          'Alrededor de $96,000 — el doble de su salario está bien',
          'Menos de $48,000 — el total de lo prestado por debajo de su salario esperado del primer año',
          '$0 — todos los préstamos estudiantiles siempre son un error',
        ],
        answerIndex: 2,
        explanation:
          'La regla general dice mantener el total de lo prestado por debajo de tu salario esperado del primer año — para Jordan, menos de $48,000 — para que los pagos sigan siendo manejables. Pedir prestado menos es aún mejor, pero préstamos modestos para un título con buen poder de ganancia pueden ser una inversión razonable.',
      },
    ],
  },
}

export default lesson
