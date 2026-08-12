import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'paying-for-college',
 week: 5,
 day: 3,
 title: 'Paying for College',
 icon: 'college',
 description:
 'Learn to shrink scary sticker prices, stack free money before loans, and shop for college like the smartest purchase of your life, because it just might be.',
 durationMin: 15,
 sections: [
 {
 type: 'intro',
 heading: 'The Biggest Purchase of Your Teenage Life',
 body:
 "College can be one of the best investments you'll ever make, and one of the most expensive. But here's the secret almost nobody tells you: the giant price on the website is like the first price at a flea market. Almost nobody pays it. Today you'll learn how financial aid actually works, how to compare offers like a pro shopper, and how to make sure a degree pays you back.",
 },
 {
 type: 'content',
 heading: 'Sticker Price vs. Net Price',
 body:
 "The sticker price (officially the 'cost of attendance') is the full published cost: tuition, fees, housing, food, and books. The net price is what YOU actually pay after grants and scholarships are subtracted. These can be wildly different, a private college with a $60,000 sticker can end up cheaper than a state school with a $28,000 sticker once aid is applied. Never cross a school off your list from the sticker price alone.",
 bullets: [
 'Sticker price = the full published cost of attendance',
 'Net price = sticker price minus free money (grants + scholarships)',
 "Most colleges have a 'net price calculator' on their website, try it before you apply",
 'Compare colleges by net price, never by sticker price',
 ],
 },
 {
 type: 'content',
 heading: 'FAFSA: The Form That Unlocks the Vault',
 body:
 "The FAFSA, Free Application for Federal Student Aid, is THE key that unlocks most financial aid in America. You (and a parent or guardian) fill it out online for free each fall of your senior year and every year of college. It uses your family's financial info to figure out what aid you qualify for. Skipping it is like leaving a scholarship check on the sidewalk: billions in aid goes unclaimed every year because students never applied.",
 bullets: [
 'FAFSA is 100% FREE to file at studentaid.gov, never pay a site to submit it',
 'It unlocks federal grants, work-study, and federal student loans',
 'Many states and colleges also use it to award their own aid',
 'File it every year, even if you think your family earns too much. You might be surprised',
 ],
 },
 {
 type: 'terms',
 heading: 'The Financial Aid Menu',
 terms: [
 {
 term: 'FAFSA',
 definition:
 'The Free Application for Federal Student Aid, the free government form that determines your eligibility for grants, work-study, and federal loans.',
 },
 {
 term: 'Grant',
 definition:
 'Free money for college, usually based on financial need (like the federal Pell Grant). You never pay it back.',
 },
 {
 term: 'Scholarship',
 definition:
 'Free money usually awarded for merit, grades, sports, art, essays, community service. Also never paid back, and you can stack many small ones.',
 },
 {
 term: 'Work-study',
 definition:
 'A federal program that gives you a part-time campus job so you can earn money for expenses while enrolled.',
 },
 {
 term: 'Subsidized loan',
 definition:
 'A need-based federal loan where the government pays the interest while you are in school. The friendliest loan you can get.',
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
 'Grants and scholarships are free money. They never get paid back. Every kind of loan, no matter how friendly the terms, must be repaid with interest. That is why the golden order is: free money first, loans last.',
 },
 },
 {
   type: 'video',
   heading: 'Watch: The Sticker Price Is Not the Price',
   body:
     'Watch this quick BFF video on net price, the FAFSA, and reading an award letter properly. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 'jrg1XZYTpKM',
   source: 'BFF Classroom',
   aspect: 3 / 2,
   questions: [
     {
       at: 44,
       question:
         'A college lists $90,000 a year. Why is that not what you will pay?',
       options: [
         'The list price always includes a discount',
         'That is the sticker price, and net price is what is left after aid you do not repay',
         'Nobody attends colleges that expensive',
         'The price drops every year you attend',
       ],
       answerIndex: 1,
       explanation:
         "Two students at the same school can pay wildly different amounts. Alvin's point is that an expensive-looking private school is sometimes cheaper than the state school once aid arrives.",
     },
     {
       at: 68,
       question:
         'What does the FAFSA unlock?',
       options: [
         'Private scholarships only',
         'Federal grants, work-study and federal loans',
         'A discount negotiated with the college',
         'Nothing unless your family has low income',
       ],
       answerIndex: 1,
       explanation:
         'It is free, opens in the fall of your senior year, and many states and colleges use it for their own aid too. Alvin calls skipping it because you assume you will not qualify the most expensive assumption in the lesson.',
     },
     {
       at: 100,
       question:
         'Which type of aid should you take last?',
       options: [
         'Grants',
         'Scholarships',
         'Work-study',
         'Unsubsidized loans',
       ],
       answerIndex: 3,
       explanation:
         'Unsubsidized loans start building interest the moment you receive the money. Grants and scholarships are free, work-study is a job, and subsidized loans at least have the government covering interest while you are in school.',
     },
     {
       at: 135,
       question:
         'School A leaves you $8,000 in debt, School B leaves you $12,000. What does that tell you?',
       options: [
         'School B is always the better deal',
         'School B is cheaper up front but more expensive later',
         'The two are equivalent',
         'School A must have a worse program',
       ],
       answerIndex: 1,
       explanation:
         "School B costs $13,000 out of pocket against School A's $20,000, so it is cheaper today. It also graduates you with more debt. That is why Alvin says to do the math on paper for every offer.",
     },
   ],
 },

 {
 type: 'content',
 heading: 'The Golden Order: Free Money First',
 body:
 "Not all aid is created equal, so smart students take it in a strict order. First, grab every grant and scholarship you can, that money is free. Next, take work-study if offered; you earn it, but you never owe it. Only THEN consider loans, and even those have a ranking: subsidized federal loans first (the government covers your interest while in school), unsubsidized federal loans second (interest ticks from day one), and private loans dead last, they usually have higher rates and far fewer protections.",
 bullets: [
 '1. Grants and scholarships, free, never repaid',
 '2. Work-study, earned money, never owed',
 '3. Subsidized federal loans, no interest while in school',
 '4. Unsubsidized federal loans, interest grows from day one',
 '5. Private loans, a last resort only',
 ],
 },
 {
 type: 'example',
 heading: 'Example: The Award Letter Showdown',
 body:
 "Amara gets into two schools. College A has a $32,000 sticker price and offers her an $18,000 grant-and-scholarship package. Net price: $14,000. College B has a $22,000 sticker price but offers only $5,000 in free money, net price: $17,000. Plot twist: the 'expensive' school is actually $3,000 per year cheaper, $12,000 cheaper over four years! But watch out: College B's letter also lists a $7,500 loan in big friendly letters as part of the 'award.' Loans are not a discount. They are just a bill with a delay.",
 },
 {
 type: 'content',
 heading: 'Reading Award Letters Like a Pro',
 body:
 "After you're accepted, each college sends a financial aid award letter, and some are sneakily designed to make the school look cheaper than it is. Some letters mix loans right in with grants so the 'total aid' looks huge. Your job: separate the free money from the borrowed money, and calculate the real net price yourself.",
 bullets: [
 'Subtract ONLY grants and scholarships from the sticker price to get net price',
 'Loans and work-study are not discounts, never subtract them',
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
 '$10,500, subtract everything on the letter',
 '$18,000, subtract only the $12,000 scholarship',
 '$12,500, subtract the scholarship and loan',
 '$30,000, aid never changes the price',
 ],
 answerIndex: 1,
 explanation:
 'Only free money lowers your price: $30,000 - $12,000 = $18,000 net price. The work-study is money you would have to earn, and the loan is money you would have to pay back. Neither one is a discount.',
 },
 },
 {
 type: 'content',
 heading: 'The Community College Power Move',
 body:
 "Here's a route that saves students tens of thousands of dollars: two years at a community college (often around $4,000 per year in tuition), then transferring to a four-year university to finish your bachelor's degree. Your diploma looks exactly the same as everyone else's, it only lists the school you graduated from. Many states even have guaranteed transfer agreements with their public universities. Two years at $4,000 instead of $25,000 can mean graduating with little or no debt. That is a power move, not a plan B.",
 },
 {
 type: 'content',
 heading: 'ROI: Think Like an Investor',
 body:
 "A degree is an investment, so think about its return. Research the starting salaries for careers you're considering, an engineering grad might start around $75,000 while some fields start closer to $40,000. Neither is 'wrong,' but your borrowing should match your future income. The classic rule of thumb: try to borrow LESS in total than your expected first-year salary. If you expect to earn $50,000 in year one, keep total loans under $50,000, that usually keeps payments manageable. Debt way beyond that number can shadow you for decades.",
 bullets: [
 'Rule of thumb: total student debt below your expected first-year salary',
 'Look up real starting salaries for majors and careers before you borrow',
 'A lower-cost path to the same career is a higher return on investment',
 'Trades, certificates, and apprenticeships are strong ROI paths too. College is one route, not the only one',
 ],
 },
 {
 type: 'example',
 heading: "Example: Maya's ROI Game Plan",
 body:
 'Maya wants to be a teacher and finds that starting salaries near her are around $46,000, so her borrowing ceiling is $46,000, and her stretch goal is way less. Her plan: two years at community college ($4,200 per year), then transfer to her state university ($11,000 per year after a $4,000 renewable transfer scholarship). Total four-year tuition: about $30,400. With a part-time job, a Pell Grant, and summer work, she borrows just $15,000 total, one third of her borrowing ceiling. Same classroom, same diploma, and a monthly loan payment her teacher salary can handle easily.',
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
 'The FAFSA is completely free at studentaid.gov and is the gateway to federal grants, work-study, and federal loans, plus much state and college aid. Any site charging you to file it is a scam.',
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
 'Work-study is a federal program (unlocked by the FAFSA) that provides part-time jobs, often on campus, so students can earn money while enrolled. You earn it as wages. It is never owed back, but it is not a discount either.',
 },
 {
 question:
 'College X: $40,000 sticker with $24,000 in grants. College Y: $25,000 sticker with $6,000 in grants. Which is cheaper to attend?',
 options: [
 'College Y, its sticker price is lower',
 'College X, its net price is $16,000 versus $19,000 for College Y',
 'They cost the same',
 'Impossible to tell without loan amounts',
 ],
 answerIndex: 1,
 explanation:
 'Net price is what counts: College X costs $40,000 - $24,000 = $16,000, while College Y costs $25,000 - $6,000 = $19,000. The school with the scarier sticker is actually $3,000 cheaper per year, which is exactly why you never judge by sticker price.',
 },
 {
 question:
 'Jordan expects a $48,000 starting salary in his chosen career. By the rule of thumb, what is the most total student debt he should take on?',
 options: [
 'Whatever the college offers him',
 'About $96,000, double his salary is fine',
 'Under $48,000, total borrowing below his expected first-year salary',
 '$0, all student loans are always a mistake',
 ],
 answerIndex: 2,
 explanation:
 'The rule of thumb says keep total borrowing under your expected first-year salary, for Jordan, under $48,000, so payments stay manageable. Borrowing less is even better, but modest loans for a degree with solid earning power can be a reasonable investment.',
 },
 ],
 es: {
 title: 'Cómo pagar la universidad',
 description:
 'Aprende a reducir precios de etiqueta que dan miedo, a apilar dinero gratis antes que préstamos y a comprar universidad como la compra más inteligente de tu vida, porque podría serlo.',
 sections: [
 {
 type: 'intro',
 heading: 'La compra más grande de tu adolescencia',
 body:
 'La universidad puede ser una de las mejores inversiones que hagas en la vida, y una de las más caras. Pero aquí está el secreto que casi nadie te cuenta: el precio gigante de la página web es como el primer precio en un mercadillo. Casi nadie lo paga. Hoy vas a aprender cómo funciona de verdad la ayuda financiera, cómo comparar ofertas como un comprador experto y cómo asegurarte de que un título te pague de vuelta.',
 },
 {
 type: 'content',
 heading: 'Precio de etiqueta vs. precio neto',
 body:
 'El precio de etiqueta (oficialmente el "costo de asistencia" o cost of attendance) es el costo total publicado: matrícula, cuotas, alojamiento, comida y libros. El precio neto es lo que TÚ pagas en realidad después de restar becas y subvenciones. Estos pueden ser muy distintos, una universidad privada con un precio de etiqueta de $60,000 puede terminar más barata que una universidad estatal con etiqueta de $28,000 una vez aplicada la ayuda. Nunca taches una escuela de tu lista solo por el precio de etiqueta.',
 bullets: [
 'Precio de etiqueta = el costo total publicado de asistencia',
 'Precio neto = precio de etiqueta menos el dinero gratis (subvenciones + becas)',
 'La mayoría de las universidades tienen una "calculadora de precio neto" en su sitio web, pruébala antes de postularte',
 'Compara universidades por el precio neto, nunca por el precio de etiqueta',
 ],
 },
 {
 type: 'content',
 heading: 'FAFSA: el formulario que abre la bóveda',
 body:
 'La FAFSA, Solicitud Gratuita de Ayuda Federal para Estudiantes (Free Application for Federal Student Aid), es LA llave que abre la mayor parte de la ayuda financiera en Estados Unidos. Tú (y un padre, madre o tutor) la llenan en línea gratis cada otoño de tu último año de preparatoria y cada año de universidad. Usa la información financiera de tu familia para calcular a qué ayuda calificas. Saltártela es como dejar un cheque de beca tirado en la banqueta: cada año quedan sin reclamar miles de millones en ayuda porque los estudiantes nunca la solicitaron.',
 bullets: [
 'La FAFSA es 100% GRATIS de presentar en studentaid.gov, nunca le pagues a un sitio por enviarla',
 'Abre subvenciones federales, trabajo-estudio y préstamos estudiantiles federales',
 'Muchos estados y universidades también la usan para otorgar su propia ayuda',
 'Preséntala cada año, aunque creas que tu familia gana demasiado, te podrías sorprender',
 ],
 },
 {
 type: 'terms',
 heading: 'El menú de la ayuda financiera',
 terms: [
 {
 term: 'FAFSA',
 definition:
 'La Solicitud Gratuita de Ayuda Federal para Estudiantes (Free Application for Federal Student Aid), el formulario gratuito del gobierno que determina tu elegibilidad para subvenciones, trabajo-estudio y préstamos federales.',
 },
 {
 term: 'Subvención (grant)',
 definition:
 'Dinero gratis para la universidad, por lo general basado en necesidad económica (como la subvención federal Pell). Nunca lo devuelves.',
 },
 {
 term: 'Beca (scholarship)',
 definition:
 'Dinero gratis que normalmente se otorga por mérito, calificaciones, deportes, arte, ensayos, servicio comunitario. Tampoco se devuelve, y puedes apilar muchas pequeñas.',
 },
 {
 term: 'Trabajo-estudio (work-study)',
 definition:
 'Un programa federal que te da un empleo de medio tiempo en el campus para que ganes dinero para tus gastos mientras estás inscrito.',
 },
 {
 term: 'Préstamo subsidiado (subsidized loan)',
 definition:
 'Un préstamo federal basado en necesidad en el que el gobierno paga los intereses mientras estás en la escuela, el préstamo más amable que puedes conseguir.',
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
 'Las subvenciones y las becas son dinero gratis, nunca se devuelven. Todo tipo de préstamo, por más amables que sean las condiciones, debe pagarse con intereses. Por eso el orden dorado es: primero el dinero gratis, los préstamos al final.',
 },
 },
 {
   type: 'video',
   heading: 'Míralo: El precio de lista no es el precio',
   body:
     'Mira este video corto de BFF sobre el precio neto, la FAFSA y cómo leer bien una carta de ayuda financiera. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 'jrg1XZYTpKM',
   source: 'BFF Classroom',
   aspect: 3 / 2,
   questions: [
     {
       at: 44,
       question:
         'Una universidad anuncia $90,000 al año. ¿Por qué eso no es lo que vas a pagar?',
       options: [
         'Porque el precio de lista ya incluye un descuento',
         'Porque ese es el precio de lista, y el precio neto es lo que queda tras la ayuda que no devuelves',
         'Porque nadie estudia en universidades tan caras',
         'Porque el precio baja cada año que asistes',
       ],
       answerIndex: 1,
       explanation:
         'Dos estudiantes de la misma escuela pueden pagar cantidades muy distintas. El punto de Alvin es que la privada que parece cara a veces sale más barata que la estatal una vez que llega la ayuda.',
     },
     {
       at: 68,
       question:
         '¿Qué desbloquea la FAFSA?',
       options: [
         'Solo becas privadas',
         'Becas federales, trabajo-estudio y préstamos federales',
         'Un descuento negociado con la universidad',
         'Nada, salvo que tu familia tenga bajos ingresos',
       ],
       answerIndex: 1,
       explanation:
         'Es gratis, abre en el otoño de tu último año, y muchos estados y universidades también la usan para su propia ayuda. Alvin llama a saltársela, suponiendo que no calificarás, la suposición más cara de toda la lección.',
     },
     {
       at: 100,
       question:
         '¿Qué tipo de ayuda deberías tomar al final?',
       options: [
         'Becas por necesidad (grants)',
         'Becas por mérito (scholarships)',
         'Trabajo-estudio',
         'Préstamos no subsidiados',
       ],
       answerIndex: 3,
       explanation:
         'Los préstamos no subsidiados empiezan a generar intereses en cuanto recibes el dinero. Las becas son gratis, el trabajo-estudio es un empleo, y en los subsidiados al menos el gobierno cubre el interés mientras estudias.',
     },
     {
       at: 135,
       question:
         'La escuela A te deja $8,000 de deuda y la B te deja $12,000. ¿Qué te dice eso?',
       options: [
         'Que la B siempre es mejor negocio',
         'Que la B es más barata al inicio pero más cara después',
         'Que son equivalentes',
         'Que la A debe tener peor programa',
       ],
       answerIndex: 1,
       explanation:
         'La escuela B cuesta $13,000 de tu bolsillo frente a los $20,000 de la A, así que hoy es más barata. También te gradúa con más deuda. Por eso Alvin dice que hagas la cuenta en papel para cada oferta.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'El orden dorado: primero el dinero gratis',
 body:
 'No toda la ayuda es igual, así que los estudiantes inteligentes la toman en un orden estricto. Primero, agarra cada subvención y beca que puedas, ese dinero es gratis. Luego, toma el trabajo-estudio si te lo ofrecen; te lo ganas, pero nunca lo debes. Solo ENTONCES considera los préstamos, y hasta esos tienen un ranking: primero los préstamos federales subsidiados (el gobierno cubre tus intereses mientras estás en la escuela), segundo los préstamos federales no subsidiados (los intereses corren desde el primer día), y los préstamos privados de últimos, suelen tener tasas más altas y muchas menos protecciones.',
 bullets: [
 '1. Subvenciones y becas, gratis, nunca se devuelven',
 '2. Trabajo-estudio, dinero ganado, nunca debido',
 '3. Préstamos federales subsidiados, sin intereses mientras estás en la escuela',
 '4. Préstamos federales no subsidiados, los intereses crecen desde el primer día',
 '5. Préstamos privados, solo como último recurso',
 ],
 },
 {
 type: 'example',
 heading: 'Ejemplo: el duelo de las cartas de oferta',
 body:
 'A Amara la aceptan en dos escuelas. La Universidad A tiene un precio de etiqueta de $32,000 y le ofrece un paquete de subvención y beca de $18,000, precio neto: $14,000. La Universidad B tiene un precio de etiqueta de $22,000 pero le ofrece solo $5,000 en dinero gratis, precio neto: $17,000. Giro inesperado: la escuela "cara" en realidad es $3,000 más barata al año, ¡$12,000 más barata en cuatro años! Pero cuidado: la carta de la Universidad B también incluye un préstamo de $7,500 en letras grandes y amigables como parte de la "oferta". Los préstamos no son un descuento. Son solo una factura con retraso.',
 },
 {
 type: 'content',
 heading: 'Leer las cartas de oferta como un experto',
 body:
 'Después de que te aceptan, cada universidad te envía una carta de oferta de ayuda financiera, y algunas están diseñadas con astucia para que la escuela parezca más barata de lo que es. Algunas cartas mezclan préstamos justo con las subvenciones para que la "ayuda total" se vea enorme. Tu trabajo: separar el dinero gratis del dinero prestado, y calcular tú mismo el precio neto real.',
 bullets: [
 'Resta SOLO las subvenciones y becas del precio de etiqueta para obtener el precio neto',
 'Los préstamos y el trabajo-estudio no son descuentos, nunca los restes',
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
 '$10,500, resta todo lo que aparece en la carta',
 '$18,000, resta solo la beca de $12,000',
 '$12,500, resta la beca y el préstamo',
 '$30,000, la ayuda nunca cambia el precio',
 ],
 answerIndex: 1,
 explanation:
 'Solo el dinero gratis reduce tu precio: $30,000 - $12,000 = $18,000 de precio neto. El trabajo-estudio es dinero que tendrías que ganar, y el préstamo es dinero que tendrías que devolver. Ninguno de los dos es un descuento.',
 },
 },
 {
 type: 'content',
 heading: 'La jugada maestra del colegio comunitario',
 body:
 'Aquí hay una ruta que le ahorra a los estudiantes decenas de miles de dólares: dos años en un colegio comunitario (a menudo alrededor de $4,000 al año de matrícula), y luego transferirte a una universidad de cuatro años para terminar tu licenciatura. Tu diploma se ve exactamente igual al de todos los demás, solo lleva el nombre de la escuela de la que te graduaste. Muchos estados incluso tienen acuerdos de transferencia garantizada con sus universidades públicas. Dos años a $4,000 en lugar de $25,000 puede significar graduarte con poca o ninguna deuda. Eso es una jugada maestra, no un plan B.',
 },
 {
 type: 'content',
 heading: 'ROI: piensa como inversionista',
 body:
 'Un título es una inversión, así que piensa en su retorno. Investiga los salarios iniciales de las carreras que estás considerando, alguien graduado en ingeniería podría empezar en unos $75,000 mientras que algunos campos empiezan más cerca de $40,000. Ninguno está "mal", pero lo que pidas prestado debería ir acorde con tu ingreso futuro. La regla general clásica: trata de pedir prestado en total MENOS que tu salario esperado del primer año. Si esperas ganar $50,000 en el año uno, mantén el total de préstamos por debajo de $50,000, eso suele mantener los pagos manejables. Una deuda muy por encima de ese número puede perseguirte por décadas.',
 bullets: [
 'Regla general: deuda estudiantil total por debajo de tu salario esperado del primer año',
 'Busca salarios iniciales reales para las carreras y profesiones antes de pedir prestado',
 'Una ruta de menor costo hacia la misma profesión es un mayor retorno de la inversión',
 'Los oficios, certificados y aprendizajes también son rutas de buen ROI. La universidad es una opción, no la única',
 ],
 },
 {
 type: 'example',
 heading: 'Ejemplo: el plan de ROI de Maya',
 body:
 'Maya quiere ser maestra y descubre que los salarios iniciales cerca de ella rondan los $46,000, así que su techo para pedir prestado es $46,000, y su meta ambiciosa es mucho menos. Su plan: dos años en un colegio comunitario ($4,200 al año), luego transferirse a la universidad estatal ($11,000 al año después de una beca de transferencia renovable de $4,000). Matrícula total de cuatro años: alrededor de $30,400. Con un trabajo de medio tiempo, una subvención Pell y trabajo de verano, pide prestado apenas $15,000 en total, un tercio de su techo para pedir prestado. El mismo salón de clases, el mismo diploma, y un pago mensual de préstamo que su salario de maestra puede manejar con facilidad.',
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
 'La FAFSA es completamente gratis en studentaid.gov y es la puerta de entrada a subvenciones federales, trabajo-estudio y préstamos federales, además de mucha ayuda estatal y universitaria. Cualquier sitio que te cobre por presentarla es una estafa.',
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
 'El trabajo-estudio es un programa federal (que desbloquea la FAFSA) que ofrece empleos de medio tiempo, a menudo en el campus, para que los estudiantes ganen dinero mientras están inscritos. Lo ganas como salario, nunca se debe devolver, pero tampoco es un descuento.',
 },
 {
 question:
 'Universidad X: $40,000 de etiqueta con $24,000 en subvenciones. Universidad Y: $25,000 de etiqueta con $6,000 en subvenciones. ¿Cuál es más barata para asistir?',
 options: [
 'Universidad Y, su precio de etiqueta es más bajo',
 'Universidad X, su precio neto es $16,000 frente a $19,000 de la Universidad Y',
 'Cuestan lo mismo',
 'Imposible saberlo sin los montos de los préstamos',
 ],
 answerIndex: 1,
 explanation:
 'El precio neto es lo que cuenta: la Universidad X cuesta $40,000 - $24,000 = $16,000, mientras que la Universidad Y cuesta $25,000 - $6,000 = $19,000. La escuela con la etiqueta más aterradora en realidad es $3,000 más barata al año, que es exactamente por qué nunca juzgas por el precio de etiqueta.',
 },
 {
 question:
 'Jordan espera un salario inicial de $48,000 en la carrera que eligió. Según la regla general, ¿cuál es la deuda estudiantil total máxima que debería asumir?',
 options: [
 'La que sea que le ofrezca la universidad',
 'Alrededor de $96,000, el doble de su salario está bien',
 'Menos de $48,000, el total de lo prestado por debajo de su salario esperado del primer año',
 '$0, todos los préstamos estudiantiles siempre son un error',
 ],
 answerIndex: 2,
 explanation:
 'La regla general dice mantener el total de lo prestado por debajo de tu salario esperado del primer año, para Jordan, menos de $48,000, para que los pagos sigan siendo manejables. Pedir prestado menos es aún mejor, pero préstamos modestos para un título con buen poder de ganancia pueden ser una inversión razonable.',
 },
 ],
 },
 zh: {
 title: '如何支付大学费用',
 description:
 '学会砍掉吓人的标价、在贷款之前先叠满免费的钱，并像对待人生最聪明的一笔消费那样去挑选大学，因为它很可能就是。',
 sections: [
 {
 type: 'intro',
 heading: '你青少年时期最大的一笔消费',
 body:
 '大学可以是你这辈子最好的投资之一，也可以是最贵的之一。但这里有个几乎没人告诉你的秘密：网站上那个巨大的价格，就像跳蚤市场上的第一个开价。几乎没人真的按它付钱。今天你会学到助学金究竟是怎么运作的、如何像精明的购物者一样比较录取方案，以及如何确保一个学位能回报你。',
 },
 {
 type: 'content',
 heading: '标价 vs. 净价',
 body:
 '标价（正式名称是"就读总成本"，cost of attendance）是公布出来的全部费用：学费、杂费、住宿、伙食和课本。净价才是减去助学金和奖学金之后，你实际要付的钱。这两者可能天差地别，一所标价60,000美元的私立大学，在算上助学金之后，最终可能比一所标价28,000美元的州立大学还便宜。千万不要只凭标价就把一所学校从你的名单上划掉。',
 bullets: [
 '标价 = 公布出来的全部就读成本',
 '净价 = 标价减去免费的钱（助学金 + 奖学金）',
 '大多数大学的网站上都有一个"净价计算器"，申请之前先试试',
 '比较大学要看净价，绝不要看标价',
 ],
 },
 {
 type: 'content',
 heading: 'FAFSA：打开金库的那张表',
 body:
 'FAFSA，联邦学生资助免费申请表（Free Application for Federal Student Aid），是美国大部分助学金的那把钥匙。你（和一位家长或监护人）在高中最后一年的每个秋天、以及大学的每一年，都在网上免费填写它。它会用你家庭的财务信息来算出你有资格获得哪些资助。跳过它，就像把一张奖学金支票丢在人行道上：每年都有数十亿美元的资助没人认领，只因为学生们从没申请过。',
 bullets: [
 'FAFSA在studentaid.gov上填写是100%免费的，绝不要付钱给任何网站帮你提交',
 '它能解锁联邦助学金、勤工助学和联邦学生贷款',
 '许多州和大学也用它来发放自己的资助',
 '每年都要填，就算你觉得家里赚得太多，你可能会惊讶',
 ],
 },
 {
 type: 'terms',
 heading: '助学金菜单',
 terms: [
 {
 term: 'FAFSA',
 definition:
 '联邦学生资助免费申请表（Free Application for Federal Student Aid），决定你是否有资格获得助学金、勤工助学和联邦贷款的那张免费政府表格。',
 },
 {
 term: '助学金（grant）',
 definition:
 '给大学用的免费的钱，通常基于经济需要（比如联邦Pell助学金）。你永远不用偿还。',
 },
 {
 term: '奖学金（scholarship）',
 definition:
 '免费的钱，通常凭优异表现颁发，成绩、体育、艺术、作文、社区服务。同样不用偿还，而且你可以把许多小额奖学金叠在一起。',
 },
 {
 term: '勤工助学（work-study）',
 definition:
 '一个联邦项目，给你一份校园兼职工作，让你在读书期间赚钱应付开销。',
 },
 {
 term: '贴息贷款（subsidized loan）',
 definition:
 '一种基于经济需要的联邦贷款，你在校期间由政府替你付利息，你能拿到的最友好的贷款。',
 },
 {
 term: '非贴息贷款（unsubsidized loan）',
 definition:
 '一种不论经济需要都能申请的联邦贷款，但利息从第一天起就开始增长，哪怕你还在上课。',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '下面哪一项在大学毕业后你不用偿还？',
 options: [
 '一笔联邦贴息贷款',
 '一笔联邦非贴息贷款',
 '一笔私人银行贷款',
 '一笔Pell助学金',
 ],
 answerIndex: 3,
 explanation:
 '助学金和奖学金是免费的钱，永远不用偿还。任何种类的贷款，不管条件多友好，都必须连本带利偿还。这就是为什么黄金顺序是：先用免费的钱，贷款放最后。',
 },
 },
 {
   type: 'video',
   heading: '观看：标价不等于你要付的价',
   body:
     '看看这个 BFF 短视频，了解净价、FAFSA，以及如何正确读懂助学金通知书。注意，视频中途会暂停提问，认真看哦！',
   videoId: 'jrg1XZYTpKM',
   source: 'BFF Classroom',
   aspect: 3 / 2,
   questions: [
     {
       at: 44,
       question:
         '一所大学标价每年 $90,000。为什么这不是你要付的钱？',
       options: [
         '因为标价里本来就含折扣',
         '因为那是标价，净价是扣掉不用偿还的资助之后剩下的',
         '因为没人上得起这么贵的学校',
         '因为每读一年价格就会降',
       ],
       answerIndex: 1,
       explanation:
         '同一所学校的两个学生付的钱可能天差地别。Alvin 的意思是：等资助到位后，看起来很贵的私立学校有时反而比州立学校便宜。',
     },
     {
       at: 68,
       question:
         'FAFSA 能打开哪些资助？',
       options: [
         '只有私人奖学金',
         '联邦助学金、勤工俭学和联邦贷款',
         '和学校谈下来的折扣',
         '除非家庭收入低，否则什么都没有',
       ],
       answerIndex: 1,
       explanation:
         '它是免费的，在高三秋季开放，很多州和学校也用它来决定自己的资助。Alvin 说，因为觉得自己不符合条件就不填，是整节课里最昂贵的假设。',
     },
     {
       at: 100,
       question:
         '哪一类资助应该放到最后才考虑？',
       options: [
         '助学金（grants）',
         '奖学金（scholarships）',
         '勤工俭学',
         '无补贴贷款',
       ],
       answerIndex: 3,
       explanation:
         '无补贴贷款从你拿到钱那一刻就开始计息。助学金和奖学金是白给的，勤工俭学是一份工作，而有补贴贷款至少在你读书期间由政府替你付利息。',
     },
     {
       at: 135,
       question:
         'A 校让你背 $8,000 的债，B 校让你背 $12,000。这说明什么？',
       options: [
         'B 校一定更划算',
         'B 校当下更便宜，但以后更贵',
         '两者其实一样',
         'A 校的项目一定更差',
       ],
       answerIndex: 1,
       explanation:
         'B 校自己要掏 $13,000，A 校要掏 $20,000，所以眼下 B 校更便宜，但毕业时欠得更多。这就是 Alvin 说每一份录取都要在纸上算一遍的原因。',
     },
   ],
 },

 {
 type: 'content',
 heading: '黄金顺序：先用免费的钱',
 body:
 '并非所有资助都一样，所以聪明的学生会按严格的顺序来领取。首先，把你能拿到的每一笔助学金和奖学金都抓到手，那是免费的钱。其次，如果提供勤工助学就接受它；这钱是你挣来的，但你永远不欠它。只有到那时才考虑贷款，而且贷款之间也有排序：先是联邦贴息贷款（在校期间政府替你付利息），其次是联邦非贴息贷款（利息从第一天起就走），私人贷款排在最末，它们通常利率更高，保障也少得多。',
 bullets: [
 '1. 助学金和奖学金，免费，永不偿还',
 '2. 勤工助学，挣来的钱，永不亏欠',
 '3. 联邦贴息贷款，在校期间无利息',
 '4. 联邦非贴息贷款，利息从第一天起就增长',
 '5. 私人贷款，只作为最后手段',
 ],
 },
 {
 type: 'example',
 heading: '例子：录取通知书对决',
 body:
 'Amara被两所学校录取了。A大学标价32,000美元，给了她一份18,000美元的助学金加奖学金方案，净价：14,000美元。B大学标价22,000美元，却只给了5,000美元的免费的钱，净价：17,000美元。剧情反转："贵"的那所学校其实每年便宜3,000美元，四年下来便宜12,000美元！但要当心：B大学的通知书还用又大又友好的字体列出了一笔7,500美元的贷款，把它当作"资助"的一部分。贷款不是折扣，它只是一张延后到期的账单。',
 },
 {
 type: 'content',
 heading: '像高手一样读懂录取通知书',
 body:
 '在你被录取之后，每所大学都会寄来一份助学金录取通知书，有些是被巧妙设计过的，好让学校看起来比实际更便宜。有些通知书把贷款和助学金混在一起，好让"资助总额"看起来很大。你的任务是：把免费的钱和借来的钱分开，自己算出真正的净价。',
 bullets: [
 '只把助学金和奖学金从标价里减掉，才能得到净价',
 '贷款和勤工助学不是折扣，绝不要减掉它们',
 '看清奖学金是否四年都可续，以及维持它需要多高的GPA',
 '向每所学校索要同样的数据，这样你才能公平地对比',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '一所大学的标价是30,000美元。你的录取通知书列出了一笔12,000美元的奖学金、2,000美元的勤工助学，和一笔5,500美元的贷款。你真正的净价是多少？',
 options: [
 '10,500美元，把通知书上的所有东西都减掉',
 '18,000美元，只减掉那12,000美元的奖学金',
 '12,500美元，减掉奖学金和贷款',
 '30,000美元，助学金从不改变价格',
 ],
 answerIndex: 1,
 explanation:
 '完美！只有免费的钱才会降低你的价格：30,000美元 - 12,000美元 = 18,000美元的净价。勤工助学是你得去挣的钱，贷款是你得偿还的钱，两者都不是折扣。',
 },
 },
 {
 type: 'content',
 heading: '社区大学的高招',
 body:
 '这里有一条能帮学生省下几万美元的路：先在社区大学读两年（学费往往一年在4,000美元左右），然后转到一所四年制大学去读完你的学士学位。你的毕业证和别人的看起来一模一样，上面只写你毕业的那所学校。许多州甚至和它们的公立大学之间有保证转学协议。两年花4,000美元而不是25,000美元，可能意味着毕业时几乎没有或完全没有负债。这是一招高棋，不是备胎方案。',
 },
 {
 type: 'content',
 heading: 'ROI：像投资者一样思考',
 body:
 '学位是一项投资，所以要想想它的回报。去研究一下你在考虑的职业的起薪，一名工程专业的毕业生起薪可能在75,000美元左右，而有些领域的起薪更接近40,000美元。哪个都不"错"，但你借的钱应该和你未来的收入相匹配。经典的经验法则是：尽量让借款总额低于你预期的第一年薪水。如果你预期第一年赚50,000美元，就把贷款总额控制在50,000美元以下，这通常能让还款保持在可承受的范围内。远超那个数字的负债可能会跟着你几十年。',
 bullets: [
 '经验法则：学生债务总额低于你预期的第一年薪水',
 '借钱之前，查一查各专业和职业的真实起薪',
 '通往同一职业的更省钱的路，就是更高的投资回报率',
 '技工、证书和学徒制也是回报率很高的路，大学是一条路，不是唯一的路',
 ],
 },
 {
 type: 'example',
 heading: '例子：Maya的ROI作战计划',
 body:
 'Maya想当老师，她发现她所在地区的起薪大约是46,000美元，所以她的借款上限是46,000美元，而她的挑战目标要低得多。她的计划是：先在社区大学读两年（一年4,200美元），然后转到她的州立大学（一年11,000美元，扣掉一笔4,000美元可续的转学奖学金之后）。四年学费总计：大约30,400美元。靠一份兼职工作、一笔Pell助学金和暑期打工，她一共只借了15,000美元，只有她借款上限的三分之一。同样的教室、同样的毕业证，还有一笔她的教师薪水能轻松应付的月度还款。',
 },
 ],
 quiz: [
 {
 question: '标价和净价之间有什么区别？',
 options: [
 '标价包含住宿；净价只是学费',
 '净价是公布的费用；标价才是你要付的',
 '标价是公布出来的全部费用；净价才是你在算上助学金和奖学金之后实际要付的',
 '它们永远是同一个数字',
 ],
 answerIndex: 2,
 explanation:
 '标价是公布出来的全部就读成本，而净价要减去你免费的钱（助学金和奖学金）。既然大多数学生都能拿到一些资助，净价就是比较学校时真正重要的那个数字。',
 },
 {
 question: '填写FAFSA要花多少钱，又能解锁什么？',
 options: [
 '要花99美元，只能解锁奖学金',
 '免费，能解锁联邦助学金、勤工助学和联邦学生贷款',
 '免费，但只有富裕家庭才符合条件',
 '要花50美元，并保证被州立学校录取',
 ],
 answerIndex: 1,
 explanation:
 'FAFSA在studentaid.gov上完全免费，是通往联邦助学金、勤工助学和联邦贷款的大门，还有大量州级和大学的资助。任何向你收费帮你提交的网站都是骗局。',
 },
 {
 question: '联邦贴息贷款和非贴息贷款之间的关键区别是什么？',
 options: [
 '贴息贷款永远不用偿还',
 '非贴息贷款只给研究生',
 '贴息贷款没有金额上限',
 '在你在校期间政府替你付贴息贷款的利息；非贴息贷款的利息从第一天起就增长',
 ],
 answerIndex: 3,
 explanation:
 '两者都是你必须偿还的联邦贷款，但贴息贷款（基于经济需要）在你注册在读期间不收利息，因为政府替你付了。非贴息贷款则立刻开始累积利息。',
 },
 {
 question: '什么是勤工助学？',
 options: [
 '一个联邦项目，给你一份兼职工作，让你赚钱应付大学开销',
 '一笔给承诺多学习的学生的助学金',
 '一笔你在毕业后靠工作来偿还的贷款',
 '一项作业辅导的订阅服务',
 ],
 answerIndex: 0,
 explanation:
 '勤工助学是一个联邦项目（由FAFSA解锁），提供兼职工作，往往在校园里，让学生在注册在读期间赚钱。你把它当作工资挣来，永远不用偿还，但它也不是折扣。',
 },
 {
 question:
 'X大学：标价40,000美元，有24,000美元助学金。Y大学：标价25,000美元，有6,000美元助学金。就读哪所更便宜？',
 options: [
 'Y大学，它的标价更低',
 'X大学，它的净价是16,000美元，而Y大学是19,000美元',
 '它们花费一样',
 '不知道贷款金额就无法判断',
 ],
 answerIndex: 1,
 explanation:
 '重要的是净价：X大学花费40,000美元 - 24,000美元 = 16,000美元，而Y大学花费25,000美元 - 6,000美元 = 19,000美元。标价更吓人的那所学校其实每年便宜3,000美元，这正是为什么你永远不该凭标价来判断。',
 },
 {
 question:
 'Jordan预期在他选定的职业里能拿到48,000美元的起薪。按照经验法则，他最多应该背上多少学生债务？',
 options: [
 '大学给他多少就多少',
 '大约96,000美元，他薪水的两倍没问题',
 '低于48,000美元，借款总额低于他预期的第一年薪水',
 '0美元，所有学生贷款永远都是错误',
 ],
 answerIndex: 2,
 explanation:
 '经验法则说要让借款总额低于你预期的第一年薪水，对Jordan来说就是低于48,000美元，这样还款才能保持在可承受的范围内。借得更少当然更好，但为一个有稳固收入能力的学位背上适度的贷款，可以是一项合理的投资。',
 },
 ],
 },
}

export default lesson
