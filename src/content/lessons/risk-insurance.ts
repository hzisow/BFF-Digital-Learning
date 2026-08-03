import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'risk-insurance',
 week: 3,
 day: 1,
 title: 'Risk Management & Insurance',
 icon: 'shield',
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
 'The deductible is what you pay before insurance kicks in. You pay $300, and insurance covers the remaining $900.',
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
 "Since Maya rarely files claims, she can save money with lower monthly premiums and accept a higher deductible. And skipping insurance entirely is risky, because no one can predict the unexpected.",
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
 heading: 'Watch: Can I Skip Insurance?',
 body:
 "Watch this short BFF video on why insurance matters even when you're young and healthy. Heads up, it pauses to quiz you along the way, so pay attention!",
 videoId: '64VPvCvBq3g',
 source: 'BFF Classroom',
 questions: [
 {
 at: 76,
 question: 'Why do even young, healthy people need health insurance?',
 options: [
 "It's a fashion statement",
 'Accidents and sudden illness can hit anyone, and the bills can be enormous',
 "Doctors won't see uninsured people",
 "They don't, young people never get sick",
 ],
 answerIndex: 1,
 explanation:
 "One broken leg or ER visit can cost tens of thousands of dollars, and you can't schedule an accident. That's the huge, unpredictable risk insurance covers.",
 },
 {
  at: 97,
  question:
   'What is a deductible?',
  options: [
   'The amount you pay every month to stay covered',
   'The amount you pay yourself before insurance starts paying',
   'A discount for being young and healthy',
   'Money the insurance company pays you each year',
  ],
  answerIndex: 1,
  explanation:
   'Your premium is the regular payment that keeps you covered. Your deductible is what comes out of your own pocket before insurance starts paying, and a higher deductible usually means a lower premium.',
 },
 {
 at: 126,
 question: 'At its core, what does insurance protect you from?',
 options: [
 'Ever having to pay a premium',
 'A giant surprise bill wiping out your finances',
 'Small everyday costs, like snacks',
 'Paying taxes',
 ],
 answerIndex: 1,
 explanation:
 "Insurance trades a small, predictable premium for protection against a rare, catastrophic cost. That's its whole job.",
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
 'Renters insurance protects tenants in a rented dwelling, covering personal property, liability claims, and extra living expenses when a unit is damaged.',
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
 'El deducible es lo que pagas antes de que el seguro entre en acción. Tú pagas $300 y el seguro cubre los $900 restantes.',
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
 'Como Maya casi nunca presenta reclamos, puede ahorrar dinero con primas mensuales más bajas y aceptar un deducible más alto. Y quedarse sin seguro por completo es arriesgado, porque nadie puede predecir lo inesperado.',
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
 heading: 'Mira: ¿Puedo saltarme el seguro?',
 body:
 'Mira este breve video de BFF sobre por qué el seguro importa incluso cuando eres joven y estás sano. Ojo: se pausa para ponerte a prueba en el camino, ¡así que presta atención!',
 videoId: '64VPvCvBq3g',
 source: 'BFF Classroom',
 questions: [
 {
 at: 76,
 question:
 '¿Por qué incluso los jóvenes saludables necesitan seguro de salud?',
 options: [
 'Es una declaración de moda',
 'Los accidentes y las enfermedades repentinas le pueden pasar a cualquiera, y las facturas pueden ser enormes',
 'Los doctores no atienden a personas sin seguro',
 'No lo necesitan: los jóvenes nunca se enferman',
 ],
 answerIndex: 1,
 explanation:
 'Una sola pierna rota o una visita a urgencias puede costar decenas de miles de dólares, y no puedes agendar un accidente. Ese es el riesgo enorme e impredecible que cubre el seguro.',
 },
 {
  at: 97,
  question:
   '¿Qué es un deducible?',
  options: [
   'Lo que pagas cada mes para seguir cubierto',
   'Lo que pagas de tu propio bolsillo antes de que el seguro empiece a pagar',
   'Un descuento por ser joven y sano',
   'Dinero que la aseguradora te paga cada año',
  ],
  answerIndex: 1,
  explanation:
   'La prima es el pago regular que te mantiene cubierto. El deducible es lo que sale de tu bolsillo antes de que el seguro empiece a pagar, y un deducible más alto suele significar una prima más baja.',
 },
 {
 at: 126,
 question: 'En esencia, ¿de qué te protege el seguro?',
 options: [
 'De tener que pagar una prima alguna vez',
 'De que una factura sorpresa gigante arrase con tus finanzas',
 'De los pequeños gastos diarios, como los snacks',
 'De pagar impuestos',
 ],
 answerIndex: 1,
 explanation:
 'El seguro cambia una prima pequeña y predecible por protección contra un costo raro y catastrófico: ese es todo su trabajo.',
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
 zh: {
 title: '风险管理与保险',
 description: '了解如何管理风险、为保险保单做预算，并为意外做好准备。',
 sections: [
 {
 type: 'intro',
 heading: '欢迎来到第三周！',
 body:
 '生活充满了惊喜，而且并非都是有趣的那种。一次小追尾、一块摔碎的手机屏、一场突如其来的疾病。今天你将学到保险如何帮助你为意外做好准备，让糟糕的一天不至于毁掉你的财务。让我们守好每一垒！',
 },
 {
 type: 'content',
 heading: '热身：保护它，还是赌一把？',
 body:
 '想想一件你每天都在用的贵重物品，比如你的手机。你宁愿每月付10美元来保护它，还是赌一把、以后万一出问题再付1,000美元？这个问题没有唯一正确的答案，但保险讲的正是这种取舍。往下学的时候，把你的答案记在心里。',
 },
 {
 type: 'content',
 heading: '什么是风险？',
 body:
 '风险是指坏事或意外发生的可能性。财务风险是指因事故、疾病、盗窃或灾难而损失金钱的可能性。这里有个关键的观念：每个人都面临风险。你无法消除它，但你绝对可以为它做好准备。',
 bullets: [
 '发生车祸',
 '因生病而无法工作',
 '贵重物品被偷',
 '灾难损坏了你的房屋或财物',
 ],
 },
 {
 type: 'content',
 heading: '保险是如何运作的',
 body:
 '保险是对你所在乎的东西的一种保护。你每月付一点点钱，叫做保费（premium），以避免在坏事发生时付出一大笔钱。如果灾难来临，你就提出理赔（claim），也就是向保险公司请求帮助来弥补损失。但有个门道：几乎每份保单还有一个免赔额（deductible），也就是在保险公司支付其余部分之前，你必须自掏腰包先付的金额。',
 },
 {
 type: 'terms',
 heading: '保险词汇',
 terms: [
 {
 term: 'Risk（风险）',
 definition: '坏事或意外发生的可能性。',
 },
 {
 term: 'Financial Risk（财务风险）',
 definition:
 '因事故、疾病、盗窃或灾难而损失金钱的可能性。',
 },
 {
 term: 'Premium（保费）',
 definition:
 '你每月支付的一小笔钱，用来让你的保险保持有效。',
 },
 {
 term: 'Claim（理赔）',
 definition:
 '你向保险公司提出的、请求帮助弥补损失的申请。',
 },
 {
 term: 'Deductible（免赔额）',
 definition:
 '在保险公司支付其余部分之前，你必须自掏腰包先付的金额。',
 },
 {
 term: 'Coverage（保障范围）',
 definition:
 '你的保单所保护的内容，比如医疗账单、车辆损坏或盗窃。',
 },
 ],
 },
 {
 type: 'example',
 heading: '免赔额的实际运作',
 body:
 '假设你有一份免赔额为500美元的汽车保险。你出了一次事故，修车费用是2,000美元。你先付前500美元，你的保险支付剩下的1,500美元。要是没有保险，那整整2,000美元的账单都得由你来出。真疼。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你有一份免赔额为300美元的保险。一次受保的事故造成了1,200美元的损失。你需要自掏腰包付多少？',
 options: ['$1,200', '$300', '$900', '$0'],
 answerIndex: 1,
 explanation:
 '干得好！免赔额是保险开始生效之前你要先付的钱。你付300美元，保险支付剩下的900美元。',
 },
 },
 {
 type: 'content',
 heading: '核心观念：转移风险',
 body:
 '保险背后的核心观念是风险的转移。坏事仍然可能发生在你身上，但有了保险，坏事发生时你能得到财务上的帮助。风险从你（被保险人）转移到了保险公司（保险人）。保险有很多种，各有不同的保障范围，每一种里面甚至还有细分类型。举个例子，高免赔额健康计划就是健康保险下的一个细分类型。',
 },
 {
 type: 'content',
 heading: '保费和免赔额：跷跷板',
 body:
 '保费和免赔额是成反比关系的。当一个上升时，另一个就下降，就像跷跷板一样。在两者之间怎么选，取决于你有多大可能会提出理赔。',
 bullets: [
 '高保费意味着低免赔额。如果你风险较高、预计会更频繁地理赔，这样更好。',
 '高免赔额意味着低保费。如果你风险较低、很少理赔，这样更好。',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Maya很少生病，几乎从不看医生。根据保费与免赔额的跷跷板，哪种计划对她可能更合适？',
 options: [
 '高保费，低免赔额',
 '高保费，高免赔额',
 '低保费，高免赔额',
 '完全不买保险，因为她很健康',
 ],
 answerIndex: 2,
 explanation:
 '既然Maya很少理赔，她就可以用较低的月保费省钱，并接受较高的免赔额。而完全不买保险是有风险的，因为没人能预测意外。',
 },
 },
 {
 type: 'content',
 heading: '保险的类型：健康与汽车',
 body:
 '健康保险是一种协议：保险公司支付你的部分或全部医疗费用，比如看病、住院和买药，作为交换，你要付一笔月保费。许多健康计划包含一项共付额（copayment），也就是你看医生或牙医时支付的固定金额，其余部分由保险公司支付。汽车保险则覆盖你出事故时你的车以及他人所受的损坏。',
 bullets: [
 '责任险（liability）在大多数州是法律规定必须购买的，它覆盖对他人及其车辆造成的损害。',
 '碰撞险（collision）支付你自己的车在撞车中受到的损坏。',
 '综合险（comprehensive）处理非碰撞造成的损坏，比如冰雹或盗窃。',
 ],
 },
 {
 type: 'video',
 heading: '观看：我可以不买保险吗？',
 body:
 '看看这个简短的BFF视频，了解为什么即使你年轻又健康，保险也很重要。注意：视频会中途暂停来考考你，所以要专心！',
 videoId: '64VPvCvBq3g',
 source: 'BFF Classroom',
 questions: [
 {
 at: 76,
 question: '为什么连年轻、健康的人也需要健康保险？',
 options: [
 '这是一种时尚宣言',
 '事故和突发疾病可能降临到任何人头上，而账单可能是天文数字',
 '医生不给没保险的人看病',
 '不需要，年轻人永远不会生病',
 ],
 answerIndex: 1,
 explanation:
 '一次腿骨折或一趟急诊就可能花费数万美元，而你没法给意外排日程。这正是保险所覆盖的那种巨大又难以预测的风险。',
 },
 {
  at: 97,
  question:
   '什么是免赔额（deductible）？',
  options: [
   '你每月为维持保障而支付的钱',
   '在保险开始赔付之前，需要你自己先承担的金额',
   '给年轻健康人群的折扣',
   '保险公司每年付给你的钱',
  ],
  answerIndex: 1,
  explanation:
   '保费是你为维持保障而定期支付的钱；免赔额是保险开始赔付前需要你自己先掏的部分，免赔额越高，保费通常越低。',
 },
 {
 at: 126,
 question: '归根结底，保险保护你免受什么？',
 options: [
 '永远不用付保费',
 '一张巨额的意外账单把你的财务一扫而空',
 '日常的小额开支，比如零食',
 '缴税',
 ],
 answerIndex: 1,
 explanation:
 '保险用一笔小额、可预测的保费，换取对罕见而灾难性开支的保障，这就是它的全部作用。',
 },
 ],
 },
 {
 type: 'content',
 heading: '保险的类型：房屋、租客与人寿',
 body:
 '房屋保险（homeowners）覆盖你的住宅、家具及其他资产的损失和损坏，还包括对物业内事故的责任保障。如果小偷偷走了你的平板电视，你可能会按其现金价值获得赔偿。租客保险（renters）与之类似，但保护的是在租来的地方（比如公寓）居住的租客。如果公寓失火烧坏了你的衣服和笔记本电脑，租客保险会赔付它们。人寿保险在你去世时向你的受益人（通常是家人）提供钱。当有人依赖你的收入时，它最为重要，比如无法工作的年幼孩子。常见的类型包括定期寿险（term）和终身寿险（whole life）。',
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Jordan租了一套公寓。一场厨房火灾毁掉了他的笔记本电脑和衣服。哪种保险会赔付他的财物？',
 options: [
 '房屋保险',
 '汽车责任险',
 '人寿保险',
 '租客保险',
 ],
 answerIndex: 3,
 explanation:
 '租客保险保护在租住房屋里的租客，覆盖个人财物、责任理赔，以及房屋受损时的额外居住费用。',
 },
 },
 {
 type: 'example',
 heading: '守好每一垒：为Ben做规划',
 body:
 '在课堂上，我们玩"Cover Your Bases（守好你的每一垒）"。你已经做好了Ben的预算，现在你要用500美元的预算来规划他的保险保费。目标是选出最适合他生活的保障，用完整个预算又不超支。最后，我们会揭晓这个月Ben实际遇到了什么，看看哪些保费买得值。这是一个很好的提醒：明智的保险选择在于把保障与真实的风险相匹配，而不是什么都买或什么都不买。',
 },
 ],
 quiz: [
 {
 question: '什么是财务风险？',
 options: [
 '你每年都一定会损失金钱的保证',
 '因事故、疾病、盗窃或灾难而损失金钱的可能性',
 '银行对支票账户收取的费用',
 '你在储蓄账户上赚取的利息',
 ],
 answerIndex: 1,
 explanation:
 '财务风险是指因事故、疾病、盗窃或灾难而损失金钱的可能性。你无法消除风险，但你可以为它做好准备。',
 },
 {
 question: '什么是保费？',
 options: [
 '你每月支付的、用来让保险保持有效的金额',
 '在保险弥补损失之前你自掏腰包先付的金额',
 '向保险公司提出的、请求帮助弥补损失的申请',
 '保险公司因你安全驾驶而付给你的奖励',
 ],
 answerIndex: 0,
 explanation:
 '保费是你定期支付的一小笔钱，通常是每月一次，好让保险保护你免于日后付出一大笔钱。',
 },
 {
 question:
 '你的汽车保险免赔额是500美元，事故修车费用是2,000美元。保险公司支付多少？',
 options: ['$2,000', '$500', '$1,500', '$0'],
 answerIndex: 2,
 explanation:
 '你先付你的500美元免赔额，保险支付这2,000美元修车账单中剩下的1,500美元。',
 },
 {
 question: '保险背后的核心观念，最贴切的描述是……',
 options: [
 '消除你生活中的一切风险',
 '用每月的付款赚取投资利润',
 '避免大额消费的税',
 '把风险从被保险人转移给保险人',
 ],
 answerIndex: 3,
 explanation:
 '保险把风险从你转移给保险公司。坏事仍然可能发生，但发生时你能得到财务上的帮助。',
 },
 {
 question: '保费和免赔额是什么关系？',
 options: [
 '它们总是完全相等',
 '它们成反比：一个高，另一个就低',
 '它们一起升、一起降',
 '它们完全没有关系',
 ],
 answerIndex: 1,
 explanation:
 '保费和免赔额像跷跷板一样运作。高保费搭配低免赔额，高免赔额搭配低保费。',
 },
 {
 question:
 '哪种汽车保险在大多数州是法律规定必须购买的？',
 options: [
 '综合险（comprehensive）',
 '碰撞险（collision）',
 '责任险（liability）',
 '租车报销保障',
 ],
 answerIndex: 2,
 explanation:
 '责任险覆盖对他人及其车辆造成的损害，在大多数州是法律规定必须购买的。',
 },
 {
 question:
 '你看医生时支付的一笔固定金额、其余由你的健康保险支付，这叫做……',
 options: ['共付额（copayment）', '受益人', '理赔', '保费'],
 answerIndex: 0,
 explanation:
 '那笔固定金额就是共付额。许多健康保险保单对看医生、看牙医和其他医疗就诊都设有共付额。',
 },
 {
 question: '人寿保险通常对哪类人最重要……',
 options: [
 '想保护自己的车免遭盗窃的人',
 '租公寓而不是自己买房的人',
 '从不打算看医生的人',
 '有人依赖其收入的人，比如有年幼孩子',
 ],
 answerIndex: 3,
 explanation:
 '人寿保险在你去世时向你的受益人提供钱，所以当有人（比如年幼的孩子）依赖你的收入时，它最为重要。',
 },
 ],
 },
}

export default lesson
