import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'consumer-protection',
 week: 4,
 day: 2,
 title: 'Consumer Protection',
 icon: 'detective',
 description:
 'Learn how to recognize scams, protect your identity, and understand your rights as a consumer.',
 durationMin: 20,
 sections: [
 {
 type: 'intro',
 heading: 'Something Phishy Is Going On',
 body:
 'What is the sketchiest text, email, or ad you have ever seen? How did you know it was fake, or did it trick you? Scammers are everywhere, and they love targeting people your age. Today you will learn how to spot their tricks, protect your identity, and know your rights as a consumer.',
 },
 {
 type: 'content',
 heading: 'Consumer Protection Basics',
 body:
 'Children and teens are common targets for digital scams and identity theft because of their online habits and lack of experience. This is not a small problem: 38% of people who reported a fraud said they lost money (FTC, 2024). The good news? There is a whole system built to defend you.',
 },
 {
 type: 'terms',
 heading: 'Who Has Your Back',
 terms: [
 {
 term: 'Consumer Protection',
 definition:
 'The laws, agencies, and tools that defend people against scams, fraud, and shady business practices.',
 },
 {
 term: 'Federal Trade Commission (FTC)',
 definition:
 'Federal agency that enforces antitrust laws and protects consumers.',
 },
 {
 term: 'Consumer Financial Protection Bureau (CFPB)',
 definition:
 'Agency charged with overseeing consumer-related financial products and services.',
 },
 {
 term: 'Better Business Bureau (BBB)',
 definition:
 'An organization to which consumers can report unethical business practices.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Which organization is a federal agency that enforces antitrust laws and protects consumers?',
 options: [
 'Better Business Bureau (BBB)',
 'Federal Trade Commission (FTC)',
 'Internal Revenue Service (IRS)',
 'Department of Motor Vehicles (DMV)',
 ],
 answerIndex: 1,
 explanation:
 'The FTC is the federal agency that enforces antitrust laws and protects consumers. The BBB is helpful too, but it is an organization for reporting unethical businesses, not a federal agency.',
 },
 },
 {
 type: 'content',
 heading: 'Common Scams: Online',
 body:
 'Unfortunately, scams can be found almost everywhere you go, whether you are offline or online. Online, a few classics show up again and again, and they are getting more convincing every year.',
 bullets: [
 'Phishing - emails, texts, or DMs that pretend to be from banks, teachers, delivery services, and more.',
 'Fake online stores or social media giveaways ("Free AirPods if you fill this out!")',
 'Subscription traps - free trials that auto-renew without permission or that are extremely hard to cancel.',
 ],
 },
 {
 type: 'content',
 heading: 'Common Scams: Offline',
 body:
 'Online scams are not the only danger. Some of the oldest tricks in the book happen face to face, and they work because they abuse your trust.',
 bullets: [
 'Affinity fraud - when someone fraudulently claims to be a member of the same ethnic, religious, career, or community group in order to gain a potential investor’s trust.',
 'Ticket resale scams - scalpers sell fake or copied tickets for concerts or sports games. You pay cash and find out at the door that they are invalid.',
 ],
 },
 {
 type: 'content',
 heading: 'Scam Red Flags',
 body:
 'Most scams give themselves away if you know what to look for. Keep this red flag list in your back pocket, if a message hits even one of these, slow down before you tap anything.',
 bullets: [
 '"Too good to be true" offers',
 'Asking for gift card payments or personal info',
 'Urgency ("Act now or your account will be locked!")',
 'Bad grammar or suspicious links',
 'Emails with weird endings, like random numbers and letters',
 'Websites with weird domain extensions like.xyz,.vip, or.site',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'You get a text: "URGENT: Your package is held! Pay a $1 fee in the next 30 minutes at usps-delivery.xyz or it will be returned!" How many red flags can you spot?',
 options: [
 'None, this looks legitimate',
 'One: the small fee',
 'Several: urgency, a suspicious link, and a weird domain extension',
 'It is only a scam if the fee is over $100',
 ],
 answerIndex: 2,
 explanation:
 'Sharp eyes! That message stacks multiple red flags: fake urgency with a countdown, a suspicious link, and a weird.xyz domain. Real companies do not pressure you like this. When in doubt, delete it and go to the official website yourself.',
 },
 },
 {
   type: 'video',
   heading: 'Watch: How to Spot a Scam Before It Costs You',
   body:
     'Watch this quick BFF video on phishing, the red flags every scam shares, and who has your back. Heads up, it pauses to quiz you along the way, so pay attention!',
   videoId: 't7tLcoyRBOc',
   source: 'BFF Classroom',
   questions: [
     {
       at: 43,
       question:
         'What is phishing?',
       options: [
         'A virus that spreads through email attachments',
         'Someone pretending to be an organization you trust to get something out of you',
         'A company selling your data to advertisers',
         'A fake product listing on a shopping site',
       ],
       answerIndex: 1,
       explanation:
         "Usually they are after your password, sometimes your money, often both. Alvin's point is that it works on smart people constantly, because it is not testing intelligence.",
     },
     {
       at: 70,
       question:
         'Which of these is a red flag on an email from your "bank"?',
       options: [
         'It addresses you by name',
         'It carries the company logo',
         'It gives you four hours before your account is locked',
         'It arrives on a weekday',
       ],
       answerIndex: 2,
       explanation:
         'Urgency is the tell, because a real bank does not give you four hours. Threats stop you checking, and an address like bank.co instead of bank.com is almost right on purpose.',
     },
     {
       at: 95,
       question:
         'Which agency handles complaints about banks, lenders, and debt collectors?',
       options: [
         'The Federal Trade Commission',
         'The Consumer Financial Protection Bureau',
         'The Better Business Bureau',
         'The Federal Reserve',
       ],
       answerIndex: 1,
       explanation:
         'The CFPB covers banks, lenders and debt collectors. The FTC takes scam reports more broadly, and the BBB tracks complaints so you can look up a business before handing over money.',
     },
     {
       at: 130,
       question:
         'Why use a different password on every site?',
       options: [
         'Sites require it now',
         'So one leak does not unlock your whole life',
         'It makes passwords easier to remember',
         'It speeds up how fast you can log in',
       ],
       answerIndex: 1,
       explanation:
         'One breach somewhere should not open everything else. Alvin pairs it with two-factor authentication, which makes a stolen password useless on its own, and a free yearly credit report check.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'Identity Theft',
 body:
 'Identity theft is when someone steals your personal info, your name, Social Security number, or bank info, to commit fraud. It usually starts with small mistakes that are easy to avoid once you know them.',
 bullets: [
 'Not shredding sensitive information (like bank statements)',
 'Clicking fake links',
 'Sharing personal info on social media',
 'Weak or reused passwords',
 'Lost or stolen devices',
 ],
 },
 {
 type: 'content',
 heading: 'Protect Yourself: S.H.I.E.L.D.',
 body:
 'To protect yourself from identity theft, remember the acronym S.H.I.E.L.D. Six habits, one shield between you and the scammers.',
 bullets: [
 'S - Secure your passwords: use strong, unique passwords for each account with upper- and lowercase letters, numbers, and symbols. Avoid obvious picks like your name or "123456." Consider a password manager, and do not just put them all in your Notes app!',
 'H - Hide your personal info: do not post private details like your birthday, address, school name, or phone number on public social media. Scammers can use them to answer security questions or pretend to be you.',
 'I - Ignore suspicious messages: if a strange text, email, or DM asks for money or personal info or says "Click here fast!", just delete it. Do not respond and do not click. Real companies do not ask for sensitive info this way.',
 'E - Enable 2FA: two-factor authentication requires two forms of identification to access your accounts, like a code sent to your phone. Even if someone has your password, they are locked out.',
 'L - Lock your devices: always use a passcode, fingerprint, or face ID on your phone, tablet, and laptop. If a device is lost or stolen, your info stays safe from strangers.',
 'D - Do not shop on public Wi-Fi: coffee shop and airport Wi-Fi is not secure. Never enter card info or passwords on it. Wait for a trusted private network like your home network, or use your phone’s hotspot.',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: 'What does two-factor authentication (2FA) do?',
 options: [
 'It doubles the strength of your password automatically',
 'It requires two forms of identification to access an account, like a password plus a code sent to your phone',
 'It lets two people share one account safely',
 'It blocks all suspicious emails before they reach you',
 ],
 answerIndex: 1,
 explanation:
 '2FA adds an extra step, like a code texted to your phone, on top of your password. Even if a scammer steals your password, they still cannot get in. It is one of the easiest security upgrades you can make today.',
 },
 },
 {
 type: 'example',
 heading: 'Let’s Go Phishing! Activity',
 body:
 'Time to think like a scammer (so you can beat them). In small groups, create your best fake phishing message: an email, a text, or a social media DM. Choose a fake identity like Amazon, USPS, Netflix, or the IRS. Pick a bait: a suspicious login alert, a missed delivery, or a free prize. Be creative but keep it appropriate, then present it and see if the class can spot the red flags.',
 },
 {
 type: 'content',
 heading: 'Thank You from BFF Academy',
 body:
 'This concludes BFF Academy! Thank you for taking time out of your busy weeks to learn with BFF of America. You now know how to earn, budget, save, invest, manage credit, handle risk, plan your future, and protect yourself from scams. We look forward to seeing what you are capable of. One last quiz. Let’s test your skills!',
 },
 ],
 quiz: [
 {
 question: 'What is consumer protection?',
 options: [
 'A type of insurance you buy for your purchases',
 'The laws, agencies, and tools that defend people against scams, fraud, and shady business practices',
 'A warranty that comes with electronics',
 'A government program that refunds all scam victims automatically',
 ],
 answerIndex: 1,
 explanation:
 'Consumer protection is the whole system of laws, agencies, and tools, like the FTC, CFPB, and BBB, that defends people against scams, fraud, and shady business practices.',
 },
 {
 question:
 'Which agency is charged with overseeing consumer-related financial products and services?',
 options: [
 'Better Business Bureau (BBB)',
 'Federal Trade Commission (FTC)',
 'Consumer Financial Protection Bureau (CFPB)',
 'Social Security Administration (SSA)',
 ],
 answerIndex: 2,
 explanation:
 'That is the CFPB! It focuses specifically on consumer-related financial products and services, while the FTC handles broader consumer protection and antitrust enforcement.',
 },
 {
 question:
 'An email claims to be from your bank and asks you to click a link and confirm your password. This is most likely an example of what?',
 options: ['Phishing', 'A subscription trap', 'Affinity fraud', 'A ticket resale scam'],
 answerIndex: 0,
 explanation:
 'Phishing is when emails, texts, or DMs pretend to be from banks, teachers, delivery services, and more to trick you into giving up info. Real companies do not ask for sensitive info this way.',
 },
 {
 question:
 'A "free trial" that quietly starts charging your card every month and is nearly impossible to cancel is called what?',
 options: ['A giveaway', 'A phishing text', 'Affinity fraud', 'A subscription trap'],
 answerIndex: 3,
 explanation:
 'Subscription traps are free trials that auto-renew without clear permission or are extremely hard to cancel. Always check the fine print before entering your card info for a "free" trial.',
 },
 {
 question:
 'Someone pretends to belong to your religious community to win your trust and get you to invest in their scheme. What is this called?',
 options: ['Phishing', 'Affinity fraud', 'A subscription trap', 'Identity theft'],
 answerIndex: 1,
 explanation:
 'Affinity fraud is when someone fraudulently claims to be a member of the same ethnic, religious, career, or community group to gain a potential investor’s trust. Trust the math, not just the membership.',
 },
 {
 question: 'Which of these is a red flag that a message might be a scam?',
 options: [
 'It comes from a domain you recognize and use often',
 'It asks you to pay with gift cards',
 'It has no links or attachments',
 'It arrives during business hours',
 ],
 answerIndex: 1,
 explanation:
 'Gift card payment requests are a classic scam red flag, along with urgency, "too good to be true" offers, bad grammar, suspicious links, and weird domain extensions like.xyz or.vip. No real company demands gift cards.',
 },
 {
 question: 'In the S.H.I.E.L.D. acronym, what does the "L" stand for?',
 options: [
 'Log out of every website',
 'Limit your screen time',
 'Lock your devices',
 'Leave social media',
 ],
 answerIndex: 2,
 explanation:
 'L is for Lock your devices: always use a passcode, fingerprint, or face ID on your phone, tablet, and laptop so your info stays safe if a device is lost or stolen.',
 },
 {
 question: 'Why should you avoid entering card info or passwords on public Wi-Fi?',
 options: [
 'Public Wi-Fi is too slow for secure payments',
 'Public Wi-Fi is not secure, so strangers could capture your sensitive info',
 'Stores charge extra fees for public Wi-Fi purchases',
 'Public Wi-Fi automatically shares your history with the network owner',
 ],
 answerIndex: 1,
 explanation:
 'Public Wi-Fi at places like coffee shops and airports is not secure. Wait until you are on a trusted private network like your home Wi-Fi, or use your phone’s hotspot before entering anything sensitive.',
 },
 ],
 es: {
 title: 'Protección al consumidor',
 description:
 'Aprende a reconocer las estafas, proteger tu identidad y entender tus derechos como consumidor.',
 sections: [
 {
 type: 'intro',
 heading: 'Aquí hay algo sospechoso',
 body:
 '¿Cuál es el mensaje de texto, correo o anuncio más sospechoso que has visto? ¿Cómo supiste que era falso, o acaso te engañó? Los estafadores están en todas partes, y les encanta apuntar a personas de tu edad. Hoy aprenderás a detectar sus trucos, proteger tu identidad y conocer tus derechos como consumidor.',
 },
 {
 type: 'content',
 heading: 'Lo básico de la protección al consumidor',
 body:
 'Los niños y adolescentes son blancos comunes de las estafas digitales y el robo de identidad por sus hábitos en línea y su falta de experiencia. No es un problema pequeño: el 38% de las personas que reportaron un fraude dijeron que perdieron dinero (FTC, 2024). ¿La buena noticia? Existe todo un sistema construido para defenderte.',
 },
 {
 type: 'terms',
 heading: 'Quiénes te respaldan',
 terms: [
 {
 term: 'Protección al consumidor (consumer protection)',
 definition:
 'Las leyes, agencias y herramientas que defienden a las personas contra estafas, fraudes y prácticas comerciales turbias.',
 },
 {
 term: 'Comisión Federal de Comercio (Federal Trade Commission, FTC)',
 definition:
 'Agencia federal que hace cumplir las leyes antimonopolio y protege a los consumidores.',
 },
 {
 term: 'Oficina para la Protección Financiera del Consumidor (Consumer Financial Protection Bureau, CFPB)',
 definition:
 'Agencia encargada de supervisar los productos y servicios financieros para consumidores.',
 },
 {
 term: 'Better Business Bureau (BBB)',
 definition:
 'Una organización ante la cual los consumidores pueden reportar prácticas comerciales poco éticas.',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '¿Qué organización es una agencia federal que hace cumplir las leyes antimonopolio y protege a los consumidores?',
 options: [
 'Better Business Bureau (BBB)',
 'Comisión Federal de Comercio (FTC)',
 'Servicio de Impuestos Internos (IRS)',
 'Departamento de Vehículos Motorizados (DMV)',
 ],
 answerIndex: 1,
 explanation:
 'La FTC es la agencia federal que hace cumplir las leyes antimonopolio y protege a los consumidores. La BBB también ayuda, pero es una organización para reportar negocios poco éticos, no una agencia federal.',
 },
 },
 {
 type: 'content',
 heading: 'Estafas comunes: en línea',
 body:
 'Por desgracia, las estafas se encuentran casi en cualquier lugar al que vayas, ya sea fuera de línea o en línea. En internet, unos cuantos clásicos aparecen una y otra vez, y cada año son más convincentes.',
 bullets: [
 'Phishing: correos, textos o mensajes directos que fingen ser de bancos, maestros, servicios de paquetería y más.',
 'Tiendas en línea falsas o sorteos en redes sociales ("¡AirPods gratis si llenas este formulario!")',
 'Trampas de suscripción: pruebas gratis que se renuevan automáticamente sin permiso o que son extremadamente difíciles de cancelar.',
 ],
 },
 {
 type: 'content',
 heading: 'Estafas comunes: fuera de línea',
 body:
 'Las estafas en línea no son el único peligro. Algunos de los trucos más viejos del mundo ocurren cara a cara, y funcionan porque abusan de tu confianza.',
 bullets: [
 'Fraude por afinidad (affinity fraud): cuando alguien afirma falsamente ser miembro del mismo grupo étnico, religioso, profesional o comunitario para ganarse la confianza de un posible inversionista.',
 'Estafas de reventa de boletos: los revendedores venden boletos falsos o copiados para conciertos o juegos deportivos. Pagas en efectivo y descubres en la puerta que no son válidos.',
 ],
 },
 {
 type: 'content',
 heading: 'Señales de alerta de estafa',
 body:
 'La mayoría de las estafas se delatan solas si sabes qué buscar. Guarda esta lista de señales de alerta en tu bolsillo: si un mensaje presenta aunque sea una de ellas, detente antes de tocar cualquier cosa.',
 bullets: [
 'Ofertas "demasiado buenas para ser verdad"',
 'Pedir pagos con tarjetas de regalo o información personal',
 'Urgencia ("¡Actúa ahora o tu cuenta será bloqueada!")',
 'Mala ortografía o enlaces sospechosos',
 'Correos con terminaciones raras, como números y letras al azar',
 'Sitios web con extensiones de dominio raras como.xyz,.vip o.site',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Recibes un texto: "¡URGENTE: Tu paquete está retenido! Paga una cuota de $1 en los próximos 30 minutos en usps-delivery.xyz o será devuelto!" ¿Cuántas señales de alerta puedes detectar?',
 options: [
 'Ninguna, esto parece legítimo',
 'Una: la cuota pequeña',
 'Varias: urgencia, un enlace sospechoso y una extensión de dominio rara',
 'Solo es una estafa si la cuota supera los $100',
 ],
 answerIndex: 2,
 explanation:
 'Ese mensaje acumula varias señales de alerta: urgencia falsa con cuenta regresiva, un enlace sospechoso y un dominio.xyz raro. Las empresas reales no te presionan así. Si tienes dudas, bórralo y entra tú mismo al sitio web oficial.',
 },
 },
 {
   type: 'video',
   heading: 'Míralo: Cómo detectar una estafa antes de que te cueste',
   body:
     'Mira este video corto de BFF sobre el phishing, las señales que comparten todas las estafas y quién te respalda. Ojo, se detiene para hacerte preguntas, así que presta atención.',
   videoId: 't7tLcoyRBOc',
   source: 'BFF Classroom',
   questions: [
     {
       at: 43,
       question:
         '¿Qué es el phishing?',
       options: [
         'Un virus que se propaga por archivos adjuntos',
         'Alguien que finge ser una organización en la que confías para sacarte algo',
         'Una empresa que vende tus datos a anunciantes',
         'Un producto falso en una tienda en línea',
       ],
       answerIndex: 1,
       explanation:
         'Normalmente buscan tu contraseña, a veces tu dinero y muchas veces ambos. El punto de Alvin es que funciona con gente inteligente todo el tiempo, porque no está midiendo tu inteligencia.',
     },
     {
       at: 70,
       question:
         '¿Cuál de estas es una señal de alerta en un correo de tu "banco"?',
       options: [
         'Que te llame por tu nombre',
         'Que traiga el logo de la empresa',
         'Que te dé cuatro horas antes de bloquear tu cuenta',
         'Que llegue entre semana',
       ],
       answerIndex: 2,
       explanation:
         'La urgencia es la señal, porque un banco real no te da cuatro horas. Las amenazas te impiden verificar, y una dirección como banco.co en vez de banco.com está casi bien a propósito.',
     },
     {
       at: 95,
       question:
         '¿Qué agencia atiende quejas sobre bancos, prestamistas y cobradores?',
       options: [
         'La Comisión Federal de Comercio (FTC)',
         'La Oficina de Protección Financiera del Consumidor (CFPB)',
         'El Better Business Bureau (BBB)',
         'La Reserva Federal',
       ],
       answerIndex: 1,
       explanation:
         'La CFPB cubre bancos, prestamistas y cobradores. La FTC recibe reportes de estafas en general, y el BBB registra quejas para que investigues un negocio antes de entregar tu dinero.',
     },
     {
       at: 130,
       question:
         '¿Por qué usar una contraseña distinta en cada sitio?',
       options: [
         'Porque los sitios ya lo exigen',
         'Para que una sola filtración no abra toda tu vida',
         'Porque hace más fácil recordarlas',
         'Porque acelera el inicio de sesión',
       ],
       answerIndex: 1,
       explanation:
         'Una filtración en un lugar no debería abrir todo lo demás. Alvin lo combina con la autenticación de dos factores, que deja inútil una contraseña robada, y con revisar tu reporte de crédito gratis una vez al año.',
     },
   ],
 },

 {
 type: 'content',
 heading: 'El robo de identidad',
 body:
 'El robo de identidad es cuando alguien roba tu información personal, como tu nombre, tu número de Seguro Social o tus datos bancarios, para cometer fraude. Suele comenzar con pequeños errores que son fáciles de evitar una vez que los conoces.',
 bullets: [
 'No triturar información sensible (como los estados de cuenta del banco)',
 'Hacer clic en enlaces falsos',
 'Compartir información personal en redes sociales',
 'Contraseñas débiles o repetidas',
 'Dispositivos perdidos o robados',
 ],
 },
 {
 type: 'content',
 heading: 'Protégete: S.H.I.E.L.D.',
 body:
 'Para protegerte del robo de identidad, recuerda el acrónimo S.H.I.E.L.D. (que en inglés significa "escudo"). Seis hábitos, un escudo entre tú y los estafadores.',
 bullets: [
 'S - Secure your passwords (asegura tus contraseñas): usa contraseñas fuertes y únicas para cada cuenta, con mayúsculas, minúsculas, números y símbolos. Evita opciones obvias como tu nombre o "123456". Considera un administrador de contraseñas, ¡y no las guardes todas en tu app de Notas!',
 'H - Hide your personal info (esconde tu información personal): no publiques detalles privados como tu cumpleaños, dirección, nombre de tu escuela o número de teléfono en redes sociales públicas. Los estafadores pueden usarlos para responder preguntas de seguridad o hacerse pasar por ti.',
 'I - Ignore suspicious messages (ignora los mensajes sospechosos): si un texto, correo o mensaje directo extraño te pide dinero o información personal, o dice "¡Haz clic aquí rápido!", solo bórralo. No respondas y no hagas clic. Las empresas reales no piden información sensible de esta manera.',
 'E - Enable 2FA (activa la autenticación de dos factores): la autenticación de dos factores requiere dos formas de identificación para entrar a tus cuentas, como un código enviado a tu teléfono. Aunque alguien tenga tu contraseña, se queda afuera.',
 'L - Lock your devices (bloquea tus dispositivos): usa siempre un código, huella digital o reconocimiento facial en tu teléfono, tableta y laptop. Si un dispositivo se pierde o te lo roban, tu información queda a salvo de extraños.',
 'D - Do not shop on public Wi-Fi (no compres en Wi-Fi público): el Wi-Fi de cafeterías y aeropuertos no es seguro. Nunca ingreses datos de tarjetas ni contraseñas en él. Espera a una red privada de confianza, como la de tu casa, o usa el hotspot de tu teléfono.',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '¿Qué hace la autenticación de dos factores (2FA)?',
 options: [
 'Duplica automáticamente la fuerza de tu contraseña',
 'Requiere dos formas de identificación para entrar a una cuenta, como una contraseña más un código enviado a tu teléfono',
 'Permite que dos personas compartan una cuenta de forma segura',
 'Bloquea todos los correos sospechosos antes de que te lleguen',
 ],
 answerIndex: 1,
 explanation:
 'La 2FA agrega un paso extra, como un código enviado por texto a tu teléfono, además de tu contraseña. Aunque un estafador robe tu contraseña, no puede entrar. Es una de las mejoras de seguridad más fáciles que puedes hacer hoy mismo.',
 },
 },
 {
 type: 'example',
 heading: 'Actividad: ¡Vamos de phishing!',
 body:
 'Es hora de pensar como un estafador (para poder vencerlos). En grupos pequeños, creen su mejor mensaje falso de phishing: un correo, un texto o un mensaje directo en redes sociales. Elijan una identidad falsa como Amazon, USPS, Netflix o el IRS. Escojan una carnada: una alerta de inicio de sesión sospechoso, una entrega perdida o un premio gratis. Sean creativos pero manténganlo apropiado, y luego preséntenlo para ver si la clase puede detectar las señales de alerta.',
 },
 {
 type: 'content',
 heading: 'Gracias de parte de BFF Academy',
 body:
 '¡Así concluye BFF Academy! Gracias por sacar tiempo de tus semanas ocupadas para aprender con BFF of America. Ahora sabes cómo ganar dinero, hacer un presupuesto, ahorrar, invertir, manejar el crédito, enfrentar los riesgos, planear tu futuro y protegerte de las estafas. Esperamos con gusto ver de qué eres capaz. Un último quiz: ¡pongamos a prueba tus habilidades!',
 },
 ],
 quiz: [
 {
 question: '¿Qué es la protección al consumidor?',
 options: [
 'Un tipo de seguro que compras para tus compras',
 'Las leyes, agencias y herramientas que defienden a las personas contra estafas, fraudes y prácticas comerciales turbias',
 'Una garantía que viene con los aparatos electrónicos',
 'Un programa del gobierno que reembolsa automáticamente a todas las víctimas de estafas',
 ],
 answerIndex: 1,
 explanation:
 'La protección al consumidor es todo el sistema de leyes, agencias y herramientas, como la FTC, la CFPB y la BBB, que defiende a las personas contra estafas, fraudes y prácticas comerciales turbias.',
 },
 {
 question:
 '¿Qué agencia está encargada de supervisar los productos y servicios financieros para consumidores?',
 options: [
 'Better Business Bureau (BBB)',
 'Comisión Federal de Comercio (FTC)',
 'Oficina para la Protección Financiera del Consumidor (CFPB)',
 'Administración del Seguro Social (SSA)',
 ],
 answerIndex: 2,
 explanation:
 '¡Esa es la CFPB! Se enfoca específicamente en los productos y servicios financieros para consumidores, mientras que la FTC se encarga de la protección al consumidor en general y de hacer cumplir las leyes antimonopolio.',
 },
 {
 question:
 'Un correo dice ser de tu banco y te pide hacer clic en un enlace y confirmar tu contraseña. ¿De qué es más probable que sea un ejemplo?',
 options: [
 'Phishing',
 'Una trampa de suscripción',
 'Fraude por afinidad',
 'Una estafa de reventa de boletos',
 ],
 answerIndex: 0,
 explanation:
 '¡Lo clavaste! El phishing es cuando correos, textos o mensajes directos fingen ser de bancos, maestros, servicios de paquetería y más para engañarte y sacarte información. Las empresas reales no piden información sensible de esta manera.',
 },
 {
 question:
 'Una "prueba gratis" que en silencio empieza a cobrarle a tu tarjeta cada mes y es casi imposible de cancelar, ¿cómo se llama?',
 options: [
 'Un sorteo',
 'Un texto de phishing',
 'Fraude por afinidad',
 'Una trampa de suscripción',
 ],
 answerIndex: 3,
 explanation:
 'Las trampas de suscripción son pruebas gratis que se renuevan automáticamente sin un permiso claro o que son extremadamente difíciles de cancelar. Siempre revisa las letras pequeñas antes de ingresar los datos de tu tarjeta para una prueba "gratis".',
 },
 {
 question:
 'Alguien finge pertenecer a tu comunidad religiosa para ganarse tu confianza y lograr que inviertas en su plan. ¿Cómo se llama esto?',
 options: [
 'Phishing',
 'Fraude por afinidad',
 'Una trampa de suscripción',
 'Robo de identidad',
 ],
 answerIndex: 1,
 explanation:
 'El fraude por afinidad es cuando alguien afirma falsamente ser miembro del mismo grupo étnico, religioso, profesional o comunitario para ganarse la confianza de un posible inversionista. Confía en las matemáticas, no solo en la membresía.',
 },
 {
 question:
 '¿Cuál de estas es una señal de alerta de que un mensaje podría ser una estafa?',
 options: [
 'Viene de un dominio que reconoces y usas con frecuencia',
 'Te pide pagar con tarjetas de regalo',
 'No tiene enlaces ni archivos adjuntos',
 'Llega durante el horario laboral',
 ],
 answerIndex: 1,
 explanation:
 'Pedir pagos con tarjetas de regalo es una señal de alerta clásica de estafa, junto con la urgencia, las ofertas "demasiado buenas para ser verdad", la mala ortografía, los enlaces sospechosos y las extensiones de dominio raras como.xyz o.vip. Ninguna empresa real exige tarjetas de regalo.',
 },
 {
 question: 'En el acrónimo S.H.I.E.L.D., ¿qué significa la "L"?',
 options: [
 'Log out (cierra sesión en cada sitio web)',
 'Limit (limita tu tiempo de pantalla)',
 'Lock (bloquea tus dispositivos)',
 'Leave (abandona las redes sociales)',
 ],
 answerIndex: 2,
 explanation:
 'La L es de Lock your devices (bloquea tus dispositivos): usa siempre un código, huella digital o reconocimiento facial en tu teléfono, tableta y laptop para que tu información quede a salvo si un dispositivo se pierde o te lo roban.',
 },
 {
 question:
 '¿Por qué debes evitar ingresar datos de tarjetas o contraseñas en el Wi-Fi público?',
 options: [
 'El Wi-Fi público es demasiado lento para pagos seguros',
 'El Wi-Fi público no es seguro, así que extraños podrían capturar tu información sensible',
 'Las tiendas cobran cuotas extra por compras hechas en Wi-Fi público',
 'El Wi-Fi público comparte automáticamente tu historial con el dueño de la red',
 ],
 answerIndex: 1,
 explanation:
 'El Wi-Fi público de lugares como cafeterías y aeropuertos no es seguro. Espera a estar en una red privada de confianza, como el Wi-Fi de tu casa, o usa el hotspot de tu teléfono antes de ingresar cualquier dato sensible.',
 },
 ],
 },
 zh: {
 title: '消费者保护',
 description: '学习如何识别骗局、保护你的身份信息，并了解你作为消费者的权利。',
 sections: [
 {
 type: 'intro',
 heading: '这里有点可疑',
 body:
 '你见过的最可疑的短信、邮件或广告是什么？你是怎么知道它是假的的，或者它骗到你了吗？骗子无处不在，而且他们特别喜欢盯上你这个年纪的人。今天你将学会如何识破他们的把戏、保护你的身份信息，并了解你作为消费者的权利。',
 },
 {
 type: 'content',
 heading: '消费者保护基础',
 body:
 '由于上网习惯和缺乏经验，儿童和青少年是数字骗局和身份盗窃的常见目标。这可不是个小问题：在举报诈骗的人中，有 38% 表示自己损失了钱（FTC，2024 年）。好消息呢？有一整套体系专门用来保护你。',
 },
 {
 type: 'terms',
 heading: '谁在为你撑腰',
 terms: [
 {
 term: '消费者保护（Consumer Protection）',
 definition:
 '一系列保护人们免受骗局、欺诈和不正当商业行为侵害的法律、机构和工具。',
 },
 {
 term: '联邦贸易委员会（Federal Trade Commission，FTC）',
 definition: '执行反垄断法并保护消费者的联邦机构。',
 },
 {
 term: '消费者金融保护局（Consumer Financial Protection Bureau，CFPB）',
 definition: '负责监管与消费者相关的金融产品和服务的机构。',
 },
 {
 term: 'Better Business Bureau（BBB，商业改进局）',
 definition: '一个消费者可以向其举报不道德商业行为的组织。',
 },
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '哪个组织是执行反垄断法并保护消费者的联邦机构？',
 options: [
 'Better Business Bureau（BBB）',
 '联邦贸易委员会（FTC）',
 '国税局（IRS）',
 '机动车辆管理局（DMV）',
 ],
 answerIndex: 1,
 explanation:
 'FTC 是执行反垄断法并保护消费者的联邦机构。BBB 也很有帮助，但它是一个用来举报不道德企业的组织，而不是联邦机构。',
 },
 },
 {
 type: 'content',
 heading: '常见骗局：线上',
 body:
 '不幸的是，无论你在线下还是线上，几乎在你去的任何地方都能碰到骗局。在网上，有几个经典套路一次又一次地出现，而且它们一年比一年更逼真。',
 bullets: [
 '网络钓鱼：假装来自银行、老师、快递公司等的邮件、短信或私信。',
 '虚假的网店或社交媒体抽奖（"填了这个就送免费 AirPods！"）',
 '订阅陷阱，免费试用未经许可就自动续费，或者极难取消。',
 ],
 },
 {
 type: 'content',
 heading: '常见骗局：线下',
 body:
 '线上骗局并不是唯一的危险。有些最古老的套路是面对面发生的，而它们之所以奏效，是因为它们滥用了你的信任。',
 bullets: [
 '亲和欺诈，有人谎称自己是同一个族裔、宗教、职业或社区群体的成员，以此骗取潜在投资者的信任。',
 '门票转售骗局，黄牛出售伪造或复制的演唱会或体育比赛门票。你付了现金，到了门口才发现票是无效的。',
 ],
 },
 {
 type: 'content',
 heading: '骗局的危险信号',
 body:
 '只要你知道该找什么，大多数骗局都会露出马脚。把这份危险信号清单揣在口袋里，如果一条消息哪怕只中了其中一条，在你点任何东西之前都要先慢下来。',
 bullets: [
 '"好得令人难以置信"的优惠',
 '要求用礼品卡付款或索取个人信息',
 '紧迫感（"立即行动，否则你的账户将被锁定！"）',
 '糟糕的语法或可疑的链接',
 '结尾很奇怪的邮件地址，比如一堆随机的数字和字母',
 '域名后缀很奇怪的网站，比如.xyz、.vip 或.site',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你收到一条短信："紧急：你的包裹被扣留了！请在接下来 30 分钟内在 usps-delivery.xyz 支付 $1 的费用，否则将被退回！"你能发现多少个危险信号？',
 options: [
 '没有，这看起来是合法的',
 '一个：那笔小额费用',
 '好几个：紧迫感、可疑链接和奇怪的域名后缀',
 '只有费用超过 $100 才算骗局',
 ],
 answerIndex: 2,
 explanation:
 '眼睛真尖！那条消息叠加了多个危险信号：带倒计时的虚假紧迫感、一个可疑链接，以及一个奇怪的.xyz 域名。真正的公司不会这样逼迫你。如果有疑问，就把它删掉，自己去官方网站查看。',
 },
 },
 {
   type: 'video',
   heading: '观看：在被骗之前识破骗局',
   body:
     '看看这个 BFF 短视频，认识钓鱼诈骗、所有骗局共有的危险信号，以及谁在保护你。注意，视频中途会暂停提问，认真看哦！',
   videoId: 't7tLcoyRBOc',
   source: 'BFF Classroom',
   questions: [
     {
       at: 43,
       question:
         '什么是钓鱼（phishing）？',
       options: [
         '通过邮件附件传播的病毒',
         '有人冒充你信任的机构，从你这里骗取东西',
         '公司把你的数据卖给广告商',
         '购物网站上的虚假商品',
       ],
       answerIndex: 1,
       explanation:
         '他们通常想要你的密码，有时想要你的钱，常常两样都要。Alvin 强调，聪明人也天天中招，因为它考验的根本不是智力。',
     },
     {
       at: 70,
       question:
         '以下哪一项是“银行”邮件里的危险信号？',
       options: [
         '邮件里叫得出你的名字',
         '邮件带有公司的标志',
         '给你四小时，否则账户就被冻结',
         '在工作日发来',
       ],
       answerIndex: 2,
       explanation:
         '紧迫感就是破绽，真正的银行不会只给你四小时。威胁让你来不及核实，而 bank.co 这种和 bank.com 只差一点的地址，是故意做得几乎一样。',
     },
     {
       at: 95,
       question:
         '哪个机构负责处理关于银行、放贷方和催收公司的投诉？',
       options: [
         '联邦贸易委员会（FTC）',
         '消费者金融保护局（CFPB）',
         '商业改进局（BBB）',
         '美联储',
       ],
       answerIndex: 1,
       explanation:
         'CFPB 负责银行、放贷方和催收公司。FTC 更广泛地受理诈骗举报，BBB 记录投诉，方便你在交钱之前先查一查这家公司。',
     },
     {
       at: 130,
       question:
         '为什么每个网站都要用不同的密码？',
       options: [
         '因为网站现在都强制要求',
         '这样一处泄露不会打开你的全部生活',
         '这样更容易记住密码',
         '这样登录更快',
       ],
       answerIndex: 1,
       explanation:
         '一个地方被攻破，不该把其他所有账户一起打开。Alvin 还建议开启双重验证，让被偷的密码单独无用，并每年免费查一次信用报告。',
     },
   ],
 },

 {
 type: 'content',
 heading: '身份盗窃',
 body:
 '身份盗窃是指有人窃取你的个人信息，你的姓名、社会安全号或银行信息，用来实施欺诈。它通常始于一些小失误，而这些失误一旦你了解了就很容易避免。',
 bullets: [
 '不粉碎敏感信息（比如银行对账单）',
 '点击虚假链接',
 '在社交媒体上分享个人信息',
 '弱密码或重复使用密码',
 '设备丢失或被盗',
 ],
 },
 {
 type: 'content',
 heading: '保护自己：S.H.I.E.L.D.',
 body:
 '为了保护自己免受身份盗窃，记住这个缩写 S.H.I.E.L.D.（在英语中意为"盾牌"）。六个习惯，一面挡在你和骗子之间的盾牌。',
 bullets: [
 'S - Secure your passwords（保护好你的密码）：为每个账户使用由大小写字母、数字和符号组成的、强而独特的密码。避免像你的名字或"123456"这样显而易见的选择。可以考虑用密码管理器，别把它们全都存在你的备忘录 App 里！',
 'H - Hide your personal info（隐藏你的个人信息）：不要在公开的社交媒体上发布私人细节，比如你的生日、地址、学校名称或电话号码。骗子可以用它们来回答安全问题或冒充你。',
 'I - Ignore suspicious messages（忽略可疑消息）：如果一条奇怪的短信、邮件或私信索要钱财或个人信息，或者说"快点这里！"，直接删掉就好。不要回复，也不要点击。真正的公司不会用这种方式索要敏感信息。',
 'E - Enable 2FA（启用双重认证）：双重认证需要两种身份验证方式才能访问你的账户，比如发送到你手机上的验证码。即使有人拿到了你的密码，他们也进不去。',
 'L - Lock your devices（锁定你的设备）：在你的手机、平板和笔记本电脑上始终使用密码、指纹或面容 ID。如果设备丢失或被盗，你的信息也能免于被陌生人获取。',
 'D - Do not shop on public Wi-Fi（不要在公共 Wi-Fi 上购物）：咖啡店和机场的 Wi-Fi 并不安全。绝不要在上面输入银行卡信息或密码。等到连上像你家里网络那样值得信赖的私人网络，或者用你手机的热点。',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question: '双重认证（2FA）的作用是什么？',
 options: [
 '它会自动把你密码的强度翻倍',
 '它需要两种身份验证方式才能访问账户，比如一个密码加上发送到你手机的验证码',
 '它让两个人可以安全地共用一个账户',
 '它在所有可疑邮件到达你之前就把它们拦截掉',
 ],
 answerIndex: 1,
 explanation:
 '2FA 在你的密码之上增加了一个额外步骤，比如一条发到你手机的验证码短信。即使骗子偷走了你的密码，他们仍然进不去。这是你今天就能做的最简单的安全升级之一。',
 },
 },
 {
 type: 'example',
 heading: '活动："我们去钓鱼吧！"',
 body:
 '是时候像骗子一样思考了（这样你才能打败他们）。分成小组，创作出你们最厉害的假冒钓鱼消息：一封邮件、一条短信，或者一条社交媒体私信。选一个假身份，比如 Amazon、USPS、Netflix 或 IRS。挑一个诱饵：一条可疑的登录提醒、一次错过的快递，或者一份免费奖品。要有创意，但要保持得体，然后把它展示出来，看看全班能不能找出那些危险信号。',
 },
 {
 type: 'content',
 heading: '来自 BFF Academy 的感谢',
 body:
 'BFF Academy 到此就结束啦！感谢你在繁忙的几周里抽出时间和 BFF of America 一起学习。现在你已经知道如何赚钱、做预算、储蓄、投资、管理信用、应对风险、规划未来，以及保护自己免受骗局侵害。我们期待看到你能做出怎样的成绩。最后一个测验，让我们来检验一下你的本领吧！',
 },
 ],
 quiz: [
 {
 question: '什么是消费者保护？',
 options: [
 '一种你为自己的购买行为买的保险',
 '一系列保护人们免受骗局、欺诈和不正当商业行为侵害的法律、机构和工具',
 '一份随电子产品附带的保修',
 '一个自动退款给所有诈骗受害者的政府项目',
 ],
 answerIndex: 1,
 explanation:
 '消费者保护是整套法律、机构和工具的体系，比如 FTC、CFPB 和 BBB，用来保护人们免受骗局、欺诈和不正当商业行为的侵害。',
 },
 {
 question: '哪个机构负责监管与消费者相关的金融产品和服务？',
 options: [
 'Better Business Bureau（BBB）',
 '联邦贸易委员会（FTC）',
 '消费者金融保护局（CFPB）',
 '社会安全局（SSA）',
 ],
 answerIndex: 2,
 explanation:
 '那就是 CFPB！它专门关注与消费者相关的金融产品和服务，而 FTC 处理更广泛的消费者保护和反垄断执法。',
 },
 {
 question:
 '一封邮件声称来自你的银行，要求你点击一个链接并确认你的密码。这最有可能是什么的例子？',
 options: ['网络钓鱼', '订阅陷阱', '亲和欺诈', '门票转售骗局'],
 answerIndex: 0,
 explanation:
 '说得太对了！网络钓鱼是指邮件、短信或私信假装来自银行、老师、快递公司等，来骗你交出信息。真正的公司不会用这种方式索要敏感信息。',
 },
 {
 question:
 '一个悄悄开始每月扣你银行卡钱、几乎无法取消的"免费试用"，叫做什么？',
 options: ['抽奖', '钓鱼短信', '亲和欺诈', '订阅陷阱'],
 answerIndex: 3,
 explanation:
 '订阅陷阱是指未经明确许可就自动续费、或者极难取消的免费试用。在为"免费"试用输入银行卡信息之前，一定要看清小字条款。',
 },
 {
 question:
 '有人假装属于你的宗教社区，来赢得你的信任并让你投资他们的计划。这叫做什么？',
 options: ['网络钓鱼', '亲和欺诈', '订阅陷阱', '身份盗窃'],
 answerIndex: 1,
 explanation:
 '亲和欺诈是指有人谎称自己是同一个族裔、宗教、职业或社区群体的成员，以此骗取潜在投资者的信任。要相信数字，而不只是相信"自己人"的身份。',
 },
 {
 question: '以下哪一项是消息可能是骗局的危险信号？',
 options: [
 '它来自一个你认得且经常使用的域名',
 '它要求你用礼品卡付款',
 '它没有链接或附件',
 '它在工作时间送达',
 ],
 answerIndex: 1,
 explanation:
 '要求用礼品卡付款是一个经典的骗局危险信号，此外还有紧迫感、"好得令人难以置信"的优惠、糟糕的语法、可疑链接，以及像.xyz 或.vip 这样奇怪的域名后缀。没有一家真正的公司会索要礼品卡。',
 },
 {
 question: '在 S.H.I.E.L.D. 这个缩写中，"L"代表什么？',
 options: [
 'Log out（退出每个网站的登录）',
 'Limit（限制你的屏幕时间）',
 'Lock（锁定你的设备）',
 'Leave（离开社交媒体）',
 ],
 answerIndex: 2,
 explanation:
 'L 代表 Lock your devices（锁定你的设备）：在你的手机、平板和笔记本电脑上始终使用密码、指纹或面容 ID，这样即使设备丢失或被盗，你的信息也能保持安全。',
 },
 {
 question: '为什么你应该避免在公共 Wi-Fi 上输入银行卡信息或密码？',
 options: [
 '公共 Wi-Fi 太慢，不适合安全支付',
 '公共 Wi-Fi 不安全，陌生人可能会截获你的敏感信息',
 '商店会对通过公共 Wi-Fi 完成的购买收取额外费用',
 '公共 Wi-Fi 会自动把你的浏览记录分享给网络所有者',
 ],
 answerIndex: 1,
 explanation:
 '咖啡店和机场等场所的公共 Wi-Fi 并不安全。在输入任何敏感信息之前，等到你连上像你家里 Wi-Fi 那样值得信赖的私人网络，或者用你手机的热点。',
 },
 ],
 },
}

export default lesson
