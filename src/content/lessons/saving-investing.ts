import type { Lesson } from '../types'

const lesson: Lesson = {
 slug: 'saving-investing',
 week: 2,
 day: 1,
 title: 'Saving & Investing',
 icon: 'growth',
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
 "Watch this short BFF video on how compound interest works. Heads up — it pauses to quiz you along the way, so pay attention!",
 videoId: 'StjQs88nDZE',
 source: 'BFF Classroom',
 questions: [
 {
 at: 80,
 question:
 'You put in $100 at 10% per year. After year 1 you have $110. About how much after year 2?',
 options: ['$120', '$121', '$110', '$200'],
 answerIndex: 1,
 explanation:
 "Year 2 you earn 10% on $110 — that's $11 — so $121. You earned interest on your interest.",
 },
 {
 at: 108,
 question: 'What makes compound interest different from simple interest?',
 options: [
 'Compounding only works at big banks',
 'With compounding you earn interest on your interest, not just your original deposit',
 'Simple interest always grows faster',
 "There's no real difference",
 ],
 answerIndex: 1,
 explanation:
 "Simple interest pays only on your original deposit; compounding pays on your deposit plus everything it's already earned — which is why it snowballs.",
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
 'Mira este breve video de BFF sobre cómo funciona el interés compuesto. ¡Ojo! — se pausa para hacerte preguntas por el camino, así que pon atención.',
 videoId: 'StjQs88nDZE',
 source: 'BFF Classroom',
 questions: [
 {
 at: 80,
 question:
 'Pones $100 al 10% por año. Después del año 1 tienes $110. ¿Aproximadamente cuánto tienes después del año 2?',
 options: ['$120', '$121', '$110', '$200'],
 answerIndex: 1,
 explanation:
 'En el año 2 ganas el 10% sobre $110 — eso son $11 — así que $121. Ganaste interés sobre tu interés.',
 },
 {
 at: 108,
 question: '¿Qué hace diferente al interés compuesto del interés simple?',
 options: [
 'El interés compuesto solo funciona en los bancos grandes',
 'Con el interés compuesto ganas interés sobre tu interés, no solo sobre tu depósito original',
 'El interés simple siempre crece más rápido',
 'No hay ninguna diferencia real',
 ],
 answerIndex: 1,
 explanation:
 'El interés simple paga solo sobre tu depósito original; el compuesto paga sobre tu depósito más todo lo que ya ha ganado — por eso crece como bola de nieve.',
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
 zh: {
 title: '储蓄与投资',
 description:
 '如何随着时间积累财富、把钱放到正确的地方，并理解时间在复利增长中的力量。',
 sections: [
 {
 type: 'intro',
 heading: '随着时间积累财富',
 body:
 '快速热身：有什么大件的东西是你希望有朝一日能买得起的，你觉得要存多久才够？一辆车？大学学费？一次旅行？把那个目标记在心里，因为今天的主题就是如何真正实现它。我们会讲到储蓄 vs. 投资、复利的魔力，以及该把钱放到哪里。',
 },
 {
 type: 'content',
 heading: '储蓄 vs. 投资：不是一回事！',
 body:
 '和很多人的想法相反，储蓄和投资并不是一回事。储蓄是指把钱放在一个安全的地方，用于短期或应急需要，比如把现金存进储蓄账户来买一部新手机。那笔钱没有亏损的可能。投资是指把钱投入资产，目标是长期增长，比如为退休购买股票或共同基金。',
 bullets: [
 '储蓄：低风险、低回报，非常适合应急和短期目标',
 '投资：中到高风险、更高回报，非常适合长期目标',
 '投资甚至还有一些分支，比如日内交易（day-trading），它跟踪股市每天的走势',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Sean 上一年级。他的父母持续地留出钱，为他多年之后的教育做准备。这是储蓄还是投资？',
 options: [
 '储蓄，因为他们很谨慎',
 '投资，因为这是为一个遥远的目标而投入、追求长期增长的钱',
 '都不是，因为 Sean 太小了',
 '两者完全是一回事',
 ],
 answerIndex: 1,
 explanation:
 '想得不错！因为 Sean 的教育在很多年之后，为它留出的钱追求的是长期增长，这就使它成为投资。储蓄是为了短期或应急需要。还有记住：储蓄和投资绝对不是一回事！',
 },
 },
 {
 type: 'terms',
 heading: '利息、APR 和复利',
 terms: [
 {
 term: '利息（Interest）',
 definition:
 '为存入的钱所支付的利率。举个例子，$1,000 存款的 3% 利息，会给你带来 $30。',
 },
 {
 term: 'APR（Annual Percentage Rate，年百分率）',
 definition: '以年度利率表示的利息。',
 },
 {
 term: '复利（Compound Interest）',
 definition:
 '在利息之上再赚到的利息。你的钱每年增长得越来越多，这让它成为积累财富最简单的方式之一。',
 },
 {
 term: '货币的时间价值（Time Value of Money）',
 definition:
 '这个理念是说，一美元现在的价值比将来更高，因为有通货膨胀，也因为从今天起就能开始赚取利息。',
 },
 ],
 },
 {
 type: 'example',
 heading: '复利实战：认识 Joe',
 body:
 'Joe 的 $10,000 存款赚 5% APR。第 1 年：$10,000 x 1.05 = $10,500，赚了 $500。第 2 年：$10,500 x 1.05 = $11,025，赚了 $525。第 3 年：$11,025 x 1.05 = $11,576.25，赚了 $551.25。注意到每一年的收益都比上一年更大了吗？这就是复利：利息生利息。而 Joe 连一根手指都没动。',
 },
 {
 type: 'content',
 heading: '复利的关键是时间',
 body:
 '你拥有的时间越多，能赚到的钱就越多。这就是为什么趁年轻开始基本上就是一种超能力。这里有两种能让复利自动为你效力的策略。',
 bullets: [
 '先支付给自己（Pay Yourself First）：从每一张工资支票里拿出一小部分，在花任何钱之前先把它投出去（记住 50/30/20 法则！）',
 '定投成本平均法（Dollar Cost Averaging，DCA）：持续地按固定的美元金额购买某只股票，比如每月买 $50 的 AMZN，不管当时价格如何',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 'Joe 以 5% APR 的复利存入 $10,000。为什么他在第 2 年赚到的超过 $500？',
 options: [
 '银行在第 2 年觉得自己很慷慨',
 '他的 APR 每年自动翻倍',
 '他赚的是原始存款的利息，加上第 1 年的利息之上的利息',
 '他并没有赚更多；复利每年支付的金额都一样',
 ],
 answerIndex: 2,
 explanation:
 '完全正确！第 1 年之后，Joe 的余额是 $10,500，所以第 2 年的 5% 是对这个更大的数字计算的，给他带来 $525 而不是 $500。利息生利息就是复利全部的魔术，而且你放着不动的时间越长，它就滚得越大。',
 },
 },
 {
 type: 'video',
 heading: '观看：复利实战',
 body:
 '看这段 BFF 的短视频，了解复利是怎么运作的。提醒一下——它会中途暂停来考你，所以要认真看哦！',
 videoId: 'StjQs88nDZE',
 source: 'BFF Classroom',
 questions: [
 {
 at: 80,
 question:
 '你以每年 10% 存入 $100。第 1 年后你有 $110。第 2 年后大约有多少？',
 options: ['$120', '$121', '$110', '$200'],
 answerIndex: 1,
 explanation:
 '第 2 年你在 $110 上赚 10%——也就是 $11——所以是 $121。你赚到了利息之上的利息。',
 },
 {
 at: 108,
 question: '复利和单利有什么不同？',
 options: [
 '复利只在大银行才管用',
 '有了复利，你会在利息之上赚利息，而不只是在你原来的本金上',
 '单利总是增长得更快',
 '其实没有区别',
 ],
 answerIndex: 1,
 explanation:
 '单利只对你的原始存款支付利息；复利支付的是你的存款加上它已经赚到的一切之上的利息——这就是为什么它会滚雪球般增长。',
 },
 ],
 },
 {
 type: 'content',
 heading: '你该把钱放在哪里？',
 body:
 '账户和投资的类型有好几种，用哪一种取决于你的目标和你的财务状况。（还记得 SMART 目标策略吗？它能帮你做决定。）主要的选项包括股票、共同基金和 ETF、债券、储蓄账户、像 401(k) 这样的退休账户，以及教育计划。我们来逐一了解。',
 },
 {
 type: 'content',
 heading: '股票',
 body:
 '股票（stocks）是公开上市公司的份额。当你买入一家公司的股票时，你就成了那家公司的部分所有人。挺酷的，对吧？股票的风险可高可低，取决于公司。',
 bullets: [
 '股票指数是股市的一个假想分段，比如 NASDAQ 或 Dow Jones',
 'S&P 500 是一个股票指数，年复一年平均约有 10% 的回报',
 '资本利得（capital gains）是把一项投资以高于你买入价的价格卖出所得的利润',
 '分红（dividends）是公司直接支付给股东的那部分利润',
 ],
 },
 {
 type: 'content',
 heading: '共同基金、ETF 和债券',
 body:
 '共同基金和 ETF 是不同股票的「篮子」。举例来说，一个能源基金可以包含种类广泛的能源公司。篮子通常比单只股票风险更低，因为它给你带来分散化：把你的投资分布到整个市场。债券（bonds）是一种借贷型投资，你把钱借给一家公司或政府，作为回报赚取利息。',
 bullets: [
 '共同基金由专业的基金经理管理，但会收取年费',
 'ETF 不收年费，但没有专业管理',
 '债券有多种类型，比如公司债、国债和市政债',
 '债券有信用评级；高风险债券可能违约（default），也就是借款方不偿还它的债务',
 ],
 },
 {
 type: 'content',
 heading: '储蓄账户、退休账户和 529 计划',
 body:
 '储蓄账户是用来存放你不打算马上花掉的钱的银行账户。它们通常会限制每月取款的次数，但作为回报会付给你复利。为了退休，401(k)（由雇主发起）和 IRA（不由雇主发起）会把你工资中每月的缴款投入市场。而 529 计划是大学储蓄账户，通过持续投资随时间增长。',
 bullets: [
 '高收益储蓄账户（High-Yield Savings Accounts，HYSAs）平均有 4-5% APR，而传统储蓄账户平均只有 0.1-0.3% APR',
 '传统的 401(k) 和 IRA 是税延的：你缴入税前的钱，取款时再缴税',
 'Roth 版的 401(k) 和 IRA 则反过来：你用税后的钱缴款，但取款不缴税',
 '你随时可以开一个 529 计划，但没有用于教育的钱会被征收 10% 的税，那可是一大笔',
 ],
 },
 {
 type: 'checkpoint',
 checkpoint: {
 question:
 '你想投资，但单只股票让你觉得风险太大。哪个选项能一次性把你的钱分散到许多公司？',
 options: [
 '发薪日贷款（payday loan）',
 '某一家公司的单独一股',
 '传统储蓄账户',
 '共同基金或 ETF',
 ],
 answerIndex: 3,
 explanation:
 '答对了！共同基金和 ETF 是许多股票的「篮子」，给你带来分散化，把你的投资分布到整个市场，相比把宝押在单独一家公司上，降低了你的风险。基金经理收费管理共同基金；ETF 则省去了费用和经理。',
 },
 },
 {
 type: 'example',
 heading: '华尔街之狼！（课堂游戏）',
 body:
 '在课堂上，这节课配有一个游戏。你会得到 $1,000 的预算，去「投资」你自选的 3 只股票，根据它们过去的表现决定每只各买多少股。在演示的最后，大家一起看看自己的选择表现如何，并结算各自的收益（或亏损）。这是一种有趣、零风险的方式，让你体会真实投资决策的感觉：分析表现、分散配置，并承担结果。',
 },
 {
 type: 'content',
 heading: '总结',
 body:
 '今天的几个大观点：储蓄安全且偏短期，投资风险更高但能让你的钱长期增长，而复利加上时间是现存最简单的财富积累组合。先支付给自己、分散配置，并让账户与目标相匹配。快速写下哪些地方让你恍然大悟、哪些是你想复习的。下一节：信用与债务！',
 },
 ],
 quiz: [
 {
 question: '储蓄和投资的主要区别是什么？',
 options: [
 '储蓄是把钱放在安全的地方应对短期需要；投资是把钱投入资产以求长期增长',
 '储蓄赚到的回报比投资更高',
 '投资没有风险，而储蓄有风险',
 '它们是一回事，只是名字不同',
 ],
 answerIndex: 0,
 explanation:
 '储蓄是低风险、低回报的，非常适合应急和短期目标。投资承担中到高的风险，但提供更高的回报，使它成为像退休这样长期目标的工具。',
 },
 {
 question:
 'Joe 以 5% APR 的复利存入 $10,000。2 年后他大约有多少？',
 options: ['$10,500', '$11,000', '$11,025', '$12,000'],
 answerIndex: 2,
 explanation:
 '第 1 年：$10,000 x 1.05 = $10,500。第 2 年：$10,500 x 1.05 = $11,025。复利意味着第 2 年会在第 1 年的利息之上再赚利息，这就是为什么收益从 $500 增长到 $525。',
 },
 {
 question: '「先支付给自己」（Pay Yourself First）是什么意思？',
 options: [
 '在付任何账单之前先给自己买个小奖励',
 '从每一张工资支票里拿出一小部分，在花任何别的钱之前先把它投出去',
 '在存钱之前先还清你所有的债务',
 '请你雇主在同事之前先给你发工资',
 ],
 answerIndex: 1,
 explanation:
 '先支付给自己意味着在花一分钱之前，先从每张工资支票里留出一部分用于储蓄和投资，这样你的未来总能得到资金支持。它和 50/30/20 法则搭配得天衣无缝。',
 },
 {
 question: '什么是分红（dividend）？',
 options: [
 '共同基金经理每年收取的费用',
 '你以更高价格卖出股票所赚的利润',
 '你借给政府的一笔贷款',
 '公司直接支付给股东的那部分利润',
 ],
 answerIndex: 3,
 explanation:
 '分红是公司支付给股东的那部分利润。相比之下，资本利得是你把一项投资以高于买入价的价格卖出所赚的利润。',
 },
 {
 question: 'ETF 和共同基金有什么不同？',
 options: [
 'ETF 只持有一只股票，而共同基金持有很多只',
 'ETF 不收年费但没有专业管理；共同基金有专业管理但收取费用',
 'ETF 是一种债券，而共同基金是一种股票',
 'ETF 只能用于退休账户',
 ],
 answerIndex: 1,
 explanation:
 '两者都是提供分散化的股票「篮子」。取舍在于：共同基金配有专业的基金经理和一笔年费，而 ETF 省去了经理和费用。',
 },
 {
 question:
 '相比传统储蓄账户的 0.1-0.3%，哪种账户通常能赚 4-5% APR？',
 options: [
 '支票账户',
 '用来买菜的 529 计划',
 '高收益储蓄账户（High-Yield Savings Account，HYSA）',
 '发薪日贷款账户',
 ],
 answerIndex: 2,
 explanation:
 '高收益储蓄账户平均有 4-5% APR，而传统储蓄账户平均只有 0.1-0.3% APR。同样的安全性，复利却好得多，所以你把储蓄停在哪里真的很重要。',
 },
 {
 question: '传统的 401(k) 或 IRA 与 Roth 版之间的关键区别是什么？',
 options: [
 '传统账户只面向教师',
 'Roth 账户只能持有债券',
 '传统账户完全不用缴税',
 '传统账户用税前的钱、取款时缴税；Roth 账户用税后的钱、取款时不缴税',
 ],
 answerIndex: 3,
 explanation:
 '传统的 401(k) 和 IRA 是税延的：现在缴入税前的钱，取款时再缴税。Roth 版则反过来：现在就为这笔钱缴税，以后取款免税。',
 },
 {
 question: '为什么时间对复利如此重要？',
 options: [
 '银行只给年纪大的客户付利息',
 '你的钱复利的时间越长，利息生利息就越多，所以收益每年都在变大',
 '股票只在某些年份才卖',
 '通货膨胀会让你的钱随时间变得更值钱',
 ],
 answerIndex: 1,
 explanation:
 '每一年，复利都是在一个更大的余额上支付利息，所以你保持投资的时间越长，增长就越加速。这就是货币的时间价值在起作用，也是为什么趁年轻开始是这么大的一个优势。',
 },
 ],
 },
}

export default lesson
