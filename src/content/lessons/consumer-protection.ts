import type { Lesson } from '../types'

const lesson: Lesson = {
  slug: 'consumer-protection',
  week: 4,
  day: 2,
  title: 'Consumer Protection',
  emoji: '🛡️',
  description:
    'Learn how to recognize scams, protect your identity, and understand your rights as a consumer.',
  durationMin: 20,
  sections: [
    {
      type: 'intro',
      heading: 'Something Phishy Is Going On',
      body:
        'What is the sketchiest text, email, or ad you have ever seen? How did you know it was fake — or did it trick you? Scammers are everywhere, and they love targeting people your age. Today you will learn how to spot their tricks, protect your identity, and know your rights as a consumer.',
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
          'Correct! The FTC is the federal agency that enforces antitrust laws and protects consumers. The BBB is helpful too, but it is an organization for reporting unethical businesses, not a federal agency.',
      },
    },
    {
      type: 'content',
      heading: 'Common Scams: Online',
      body:
        'Unfortunately, scams can be found almost everywhere you go, whether you are offline or online. Online, a few classics show up again and again — and they are getting more convincing every year.',
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
        'Most scams give themselves away if you know what to look for. Keep this red flag list in your back pocket — if a message hits even one of these, slow down before you tap anything.',
      bullets: [
        '"Too good to be true" offers',
        'Asking for gift card payments or personal info',
        'Urgency ("Act now or your account will be locked!")',
        'Bad grammar or suspicious links',
        'Emails with weird endings, like random numbers and letters',
        'Websites with weird domain extensions like .xyz, .vip, or .site',
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
          'Sharp eyes! That message stacks multiple red flags: fake urgency with a countdown, a suspicious link, and a weird .xyz domain. Real companies do not pressure you like this. When in doubt, delete it and go to the official website yourself.',
      },
    },
    {
      type: 'content',
      heading: 'Identity Theft',
      body:
        'Identity theft is when someone steals your personal info — your name, Social Security number, or bank info — to commit fraud. It usually starts with small mistakes that are easy to avoid once you know them.',
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
        'S - Secure your passwords: use strong, unique passwords for each account with upper- and lowercase letters, numbers, and symbols. Avoid obvious picks like your name or "123456." Consider a password manager — and do not just put them all in your Notes app!',
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
          'Exactly! 2FA adds an extra step, like a code texted to your phone, on top of your password. Even if a scammer steals your password, they still cannot get in. It is one of the easiest security upgrades you can make today.',
      },
    },
    {
      type: 'example',
      heading: 'Let’s Go Phishing! Activity',
      body:
        'Time to think like a scammer (so you can beat them). In small groups, create your best fake phishing message: an email, a text, or a social media DM. Choose a fake identity like Amazon, USPS, Netflix, or the IRS. Pick a bait: a suspicious login alert, a missed delivery, or a free prize. Be creative but keep it appropriate — then present it and see if the class can spot the red flags.',
    },
    {
      type: 'content',
      heading: 'Thank You from BFF Academy',
      body:
        'This concludes BFF Academy! Thank you for taking time out of your busy weeks to learn with BFF of America. You now know how to earn, budget, save, invest, manage credit, handle risk, plan your future, and protect yourself from scams. We look forward to seeing what you are capable of. One last quiz — let’s test your skills!',
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
        'Correct! Consumer protection is the whole system of laws, agencies, and tools — like the FTC, CFPB, and BBB — that defends people against scams, fraud, and shady business practices.',
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
        'You nailed it! Phishing is when emails, texts, or DMs pretend to be from banks, teachers, delivery services, and more to trick you into giving up info. Real companies do not ask for sensitive info this way.',
    },
    {
      question:
        'A "free trial" that quietly starts charging your card every month and is nearly impossible to cancel is called what?',
      options: ['A giveaway', 'A phishing text', 'Affinity fraud', 'A subscription trap'],
      answerIndex: 3,
      explanation:
        'Right! Subscription traps are free trials that auto-renew without clear permission or are extremely hard to cancel. Always check the fine print before entering your card info for a "free" trial.',
    },
    {
      question:
        'Someone pretends to belong to your religious community to win your trust and get you to invest in their scheme. What is this called?',
      options: ['Phishing', 'Affinity fraud', 'A subscription trap', 'Identity theft'],
      answerIndex: 1,
      explanation:
        'Correct! Affinity fraud is when someone fraudulently claims to be a member of the same ethnic, religious, career, or community group to gain a potential investor’s trust. Trust the math, not just the membership.',
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
        'Yes! Gift card payment requests are a classic scam red flag, along with urgency, "too good to be true" offers, bad grammar, suspicious links, and weird domain extensions like .xyz or .vip. No real company demands gift cards.',
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
        'Correct! L is for Lock your devices: always use a passcode, fingerprint, or face ID on your phone, tablet, and laptop so your info stays safe if a device is lost or stolen.',
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
        'Exactly! Public Wi-Fi at places like coffee shops and airports is not secure. Wait until you are on a trusted private network like your home Wi-Fi, or use your phone’s hotspot before entering anything sensitive.',
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
            '¡Correcto! La FTC es la agencia federal que hace cumplir las leyes antimonopolio y protege a los consumidores. La BBB también ayuda, pero es una organización para reportar negocios poco éticos, no una agencia federal.',
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
          'Sitios web con extensiones de dominio raras como .xyz, .vip o .site',
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
            '¡Buen ojo! Ese mensaje acumula varias señales de alerta: urgencia falsa con cuenta regresiva, un enlace sospechoso y un dominio .xyz raro. Las empresas reales no te presionan así. Si tienes dudas, bórralo y entra tú mismo al sitio web oficial.',
        },
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
            '¡Exacto! La 2FA agrega un paso extra, como un código enviado por texto a tu teléfono, además de tu contraseña. Aunque un estafador robe tu contraseña, no puede entrar. Es una de las mejoras de seguridad más fáciles que puedes hacer hoy mismo.',
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
          '¡Correcto! La protección al consumidor es todo el sistema de leyes, agencias y herramientas, como la FTC, la CFPB y la BBB, que defiende a las personas contra estafas, fraudes y prácticas comerciales turbias.',
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
          '¡Así es! Las trampas de suscripción son pruebas gratis que se renuevan automáticamente sin un permiso claro o que son extremadamente difíciles de cancelar. Siempre revisa las letras pequeñas antes de ingresar los datos de tu tarjeta para una prueba "gratis".',
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
          '¡Correcto! El fraude por afinidad es cuando alguien afirma falsamente ser miembro del mismo grupo étnico, religioso, profesional o comunitario para ganarse la confianza de un posible inversionista. Confía en las matemáticas, no solo en la membresía.',
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
          '¡Sí! Pedir pagos con tarjetas de regalo es una señal de alerta clásica de estafa, junto con la urgencia, las ofertas "demasiado buenas para ser verdad", la mala ortografía, los enlaces sospechosos y las extensiones de dominio raras como .xyz o .vip. Ninguna empresa real exige tarjetas de regalo.',
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
          '¡Correcto! La L es de Lock your devices (bloquea tus dispositivos): usa siempre un código, huella digital o reconocimiento facial en tu teléfono, tableta y laptop para que tu información quede a salvo si un dispositivo se pierde o te lo roban.',
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
          '¡Exacto! El Wi-Fi público de lugares como cafeterías y aeropuertos no es seguro. Espera a estar en una red privada de confianza, como el Wi-Fi de tu casa, o usa el hotspot de tu teléfono antes de ingresar cualquier dato sensible.',
      },
    ],
  },
}

export default lesson
