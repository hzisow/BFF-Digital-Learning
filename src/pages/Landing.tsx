import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { getActivity, kindLabel, localizeActivity } from '../lib/activities'
import type { ActivityMeta } from '../lib/activities'
import { useLang } from '../lib/i18n'
import { resumeLesson } from '../lib/resume'

const FEATURED_SLUGS = ['wolf-of-wall-street', 'bens-budget', 'earning-income']

const featured: ActivityMeta[] = FEATURED_SLUGS.map(getActivity).filter(
  (a): a is ActivityMeta => a !== undefined,
)

export default function Landing() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const resume = resumeLesson()

  const STATS = [
    { value: '8', label: zh ? '互动课程' : es ? 'lecciones interactivas' : 'interactive lessons' },
    { value: '3', label: zh ? '游戏与挑战' : es ? 'juegos y desafíos' : 'games & challenges' },
    { value: '100%', label: zh ? '永久免费' : es ? 'gratis, para siempre' : 'free, forever' },
  ]

  const STEPS = [
    {
      num: '1',
      emoji: '🎟️',
      title: zh ? '拿到班级代码' : es ? 'Consigue un código de clase' : 'Get a class code',
      body: zh
        ? '你的 BFF 导师会给你们班一个代码。不用邮箱，不用注册账号——只要取个昵称，你就进来了。'
        : es
          ? 'Tu mentor de BFF le da un código a tu clase. Sin correo, sin cuenta — solo elige un apodo y ya estás dentro.'
          : 'Your BFF mentor gives your class a code. No email, no account — just pick a nickname and you are in.',
    },
    {
      num: '2',
      emoji: '🎮',
      title: zh ? '完成你的课程和游戏' : es ? 'Haz tus lecciones y juegos' : 'Do your lessons & games',
      body: zh
        ? '跟着导师布置的课程一步步学，玩 Wolf of Wall Street，帮 Ben 撑过他的预算难关。'
        : es
          ? 'Avanza por las lecciones que asigne tu mentor, juega Wolf of Wall Street y ayuda a Ben a sobrevivir su presupuesto.'
          : 'Work through the lessons your mentor assigns, play Wolf of Wall Street, and help Ben survive his budget.',
    },
    {
      num: '3',
      emoji: '📊',
      title: zh ? '追踪你的进度' : es ? 'Sigue tu progreso' : 'Track your progress',
      body: zh
        ? '一边学，一边看着你的测验分数往上涨。没有班级代码？自己一个人也能探索全部内容——随时随地都能用。'
        : es
          ? 'Mira cómo suben tus puntajes de los quizzes a medida que avanzas. ¿No tienes código de clase? Explora todo por tu cuenta — funciona en cualquier lugar.'
          : 'Watch your quiz scores climb as you go. No class code? Explore everything solo — it all works anywhere.',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bff-700 via-bff-800 to-bff-900">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-bff-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-bff-400/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <Logo reversed className="mx-auto h-16 animate-pop-in sm:h-20" />
          <h1 className="mx-auto mt-8 max-w-3xl animate-slide-up font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            {zh
              ? '真正管用的理财技能。'
              : es
                ? 'Habilidades de dinero que de verdad importan.'
                : 'Money skills that actually matter.'}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-bff-100">
            {zh
              ? 'BFF Academy 已经数字化了。在课堂上跟着你的 BFF 导师学习个人理财——或者按你自己的节奏，随时随地都能学。由学生打造，为学生服务。'
              : es
                ? 'BFF Academy se volvió digital. Aprende finanzas personales en clase con tu mentor de BFF — o a tu propio ritmo, desde donde sea. Hecho por estudiantes, para estudiantes.'
                : 'BFF Academy has gone digital. Learn personal finance in class with your BFF mentor — or at your own pace, from anywhere. Built by students, for students.'}
          </p>
          <div className="mt-10 flex animate-slide-up flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/join"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-display font-bold text-bff-700 shadow-lg transition hover:bg-bff-50 sm:w-auto"
            >
              {zh ? '加入你的班级' : es ? 'Únete a tu clase' : 'Join your class'} <span aria-hidden="true">🚀</span>
            </Link>
            <Link
              to={resume ? resume.path : '/lessons'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/60 px-7 py-3 font-display font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
            >
              {resume
                ? zh
                  ? '从你上次停下的地方继续 →'
                  : es
                    ? 'Continúa donde lo dejaste →'
                    : 'Continue where you left off →'
                : zh
                  ? '探索课程'
                  : es
                    ? 'Explora las lecciones'
                    : 'Explore lessons'}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-4 py-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-bff-700 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-bold text-slate-900">
          {zh ? '运作方式' : es ? 'Cómo funciona' : 'How it works'}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          {zh
            ? '只要三步，你就能成为那个真正懂钱的朋友。'
            : es
              ? 'Tres pasos entre tú y ser el amigo que de verdad entiende de dinero.'
              : 'Three steps between you and being the friend who actually understands money.'}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="card relative pt-8">
              <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-bff-600 font-display text-lg font-bold text-white shadow-md">
                {step.num}
              </span>
              <div className="text-3xl" aria-hidden="true">{step.emoji}</div>
              <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured activities */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                {zh ? '挑一个最爱的玩起来' : es ? 'Métete a una favorita' : 'Jump into a favorite'}
              </h2>
              <p className="mt-2 text-slate-600">
                {zh
                  ? '和 BFF 导师在课堂上带的活动一模一样——你想玩的时候随时都准备好了。'
                  : es
                    ? 'Las mismas actividades que los mentores de BFF hacen en los salones — listas cuando tú quieras.'
                    : 'The same activities BFF mentors run in classrooms — ready whenever you are.'}
              </p>
            </div>
            <Link to="/activities" className="btn-ghost shrink-0">
              {zh ? '查看所有活动 →' : es ? 'Ver todas las actividades →' : 'See all activities →'}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {featured.map((a) => {
              const { title, description } = localizeActivity(a, lang)
              return (
                <Link
                  key={a.slug}
                  to={a.path}
                  className="card group flex flex-col transition hover:-translate-y-1 hover:border-bff-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl" aria-hidden="true">{a.emoji}</span>
                    <span className="chip bg-bff-50 text-bff-700">{kindLabel(a.kind, lang)}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-bff-700">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-slate-500">
                    <span aria-hidden="true">⏱️</span> ~{a.durationMin} min
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Schools & partners */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="rounded-3xl bg-gradient-to-br from-bff-50 to-bff-100 px-6 py-12 text-center sm:px-12">
          <p className="text-3xl" aria-hidden="true">🏫</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-bff-900 sm:text-3xl">
            {zh ? '想把 BFF Academy 带进你的学校吗？' : es ? '¿Quieres traer BFF Academy a tu escuela?' : 'Bringing BFF Academy to your school?'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-bff-800">
            {zh
              ? 'BFF of America 是一家由学生创办的 501(c)(3) 非营利组织。我们的导师——他们自己就是高中生——会走进初中和高中，免费教授金融素养，而 BFF Classroom 把整个项目搬到了网上。老师、辅导员、家长们：我们非常期待收到你们的消息。'
              : es
                ? 'BFF of America es una organización sin fines de lucro 501(c)(3) fundada por estudiantes. Nuestros mentores — estudiantes de secundaria ellos mismos — visitan escuelas de nivel medio y secundaria para enseñar educación financiera gratis, y BFF Classroom lleva todo el programa a internet. Maestros, consejeros, padres: nos encantaría saber de ustedes.'
                : 'BFF of America is a student-founded 501(c)(3) nonprofit. Our mentors — high schoolers themselves — visit middle and high schools to teach financial literacy for free, and BFF Classroom brings the whole program online. Teachers, counselors, parents: we would love to hear from you.'}
          </p>
          <a
            href="https://www.bffofamerica.org"
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8"
          >
            {zh ? '通过 bffofamerica.org 联系我们' : es ? 'Contáctanos en bffofamerica.org' : 'Get in touch at bffofamerica.org'}
          </a>
        </div>
      </section>
    </div>
  )
}
