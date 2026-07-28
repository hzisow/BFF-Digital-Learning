import { Link } from 'react-router-dom'
import { Ticket, Gamepad2, TrendingUp, Clock, GraduationCap, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Logo } from '../components/Logo'
import { getActivity, kindLabel, localizeActivity } from '../lib/activities'
import type { ActivityMeta } from '../lib/activities'
import { AppIcon } from '../lib/icons'
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

  const STEPS: { num: string; icon: LucideIcon; title: string; body: string }[] = [
    {
      num: '01',
      icon: Ticket,
      title: zh ? '拿到班级代码' : es ? 'Consigue un código de clase' : 'Get a class code',
      body: zh
        ? '你的 BFF 导师会给你们班一个代码。不用邮箱，不用注册账号——只要取个昵称，你就进来了。'
        : es
          ? 'Tu mentor de BFF le da un código a tu clase. Sin correo, sin cuenta — solo elige un apodo y ya estás dentro.'
          : 'Your BFF mentor gives your class a code. No email, no account — just pick a nickname and you are in.',
    },
    {
      num: '02',
      icon: Gamepad2,
      title: zh ? '完成你的课程和游戏' : es ? 'Haz tus lecciones y juegos' : 'Do your lessons & games',
      body: zh
        ? '跟着导师布置的课程一步步学，玩 Wolf of Wall Street，帮 Ben 撑过他的预算难关。'
        : es
          ? 'Avanza por las lecciones que asigne tu mentor, juega Wolf of Wall Street y ayuda a Ben a sobrevivir su presupuesto.'
          : 'Work through the lessons your mentor assigns, play Wolf of Wall Street, and help Ben survive his budget.',
    },
    {
      num: '03',
      icon: TrendingUp,
      title: zh ? '追踪你的进度' : es ? 'Sigue tu progreso' : 'Track your progress',
      body: zh
        ? '一边学，一边看着你的测验分数往上涨。没有班级代码？自己一个人也能探索全部内容——随时随地都能用。'
        : es
          ? 'Mira cómo suben tus puntajes de los quizzes a medida que avanzas. ¿No tienes código de clase? Explora todo por tu cuenta — funciona en cualquier lugar.'
          : 'Watch your quiz scores climb as you go. No class code? Explore everything solo — it all works anywhere.',
    },
  ]

  const trust = zh
    ? ['由学生打造', '501(c)(3) 非营利组织', '永久免费']
    : es
      ? ['Hecho por estudiantes', 'Organización 501(c)(3)', 'Gratis para siempre']
      : ['Built by students', '501(c)(3) nonprofit', 'Free forever']

  return (
    <div>
      {/* Hero — dark editorial ink band: eyebrow, em-emphasized display
          headline, orbit rings, and an oversized logo watermark bleeding
          off the right. */}
      <section className="ed-hero">
        <span
          aria-hidden="true"
          className="ed-hero-orbit -right-24 -top-32 h-[520px] w-[520px]"
        />
        <span
          aria-hidden="true"
          className="ed-hero-orbit gold -left-40 bottom-[-10rem] h-[460px] w-[460px]"
        />
        <Logo
          reversed
          decorative
          className="pointer-events-none absolute -right-16 top-1/2 hidden h-[130%] -translate-y-1/2 opacity-[0.05] lg:block"
        />
        <div className="relative z-[1] mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <Logo reversed className="h-11 sm:h-12" />
            <p className="eyebrow mt-8 text-bff-300">
              <span className="eyebrow-line" aria-hidden="true" />
              {zh ? 'BFF ACADEMY，现已数字化' : es ? 'BFF ACADEMY, AHORA DIGITAL' : 'BFF ACADEMY, NOW DIGITAL'}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.03] text-white sm:text-6xl">
              {zh ? (
                <>
                  真正管用的<em>理财技能</em>。
                </>
              ) : es ? (
                <>
                  Habilidades de dinero que <em>de verdad importan</em>.
                </>
              ) : (
                <>
                  Money skills that <em>actually matter</em>.
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {zh
                ? '在课堂上跟着你的 BFF 导师学习个人理财——或者按你自己的节奏，随时随地都能学。由学生打造，为学生服务。'
                : es
                  ? 'Aprende finanzas personales en clase con tu mentor de BFF — o a tu propio ritmo, desde donde sea. Hecho por estudiantes, para estudiantes.'
                  : 'Learn personal finance in class with your BFF mentor — or at your own pace, from anywhere. Built by students, for students.'}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/join" className="btn-primary w-full px-7 py-3 sm:w-auto">
                {zh ? '加入你的班级' : es ? 'Únete a tu clase' : 'Join your class'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={resume ? resume.path : '/lessons'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[5px] border border-white/25 px-5 py-3 font-display font-semibold text-white/90 transition-[transform,background-color,color] duration-150 hover:bg-white/10 hover:text-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-bff-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-auto"
              >
                {resume
                  ? zh
                    ? '从你上次停下的地方继续'
                    : es
                      ? 'Continúa donde lo dejaste'
                      : 'Continue where you left off'
                  : zh
                    ? '探索课程'
                    : es
                      ? 'Explora las lecciones'
                      : 'Explore lessons'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/60">
              {trust.map((item, i) => (
                <li key={item} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-white/30">·</span>}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats band — clean, thin ink divider, tabular figures. */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-ink/10 px-4 py-9">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <p className="font-display text-3xl font-extrabold tabular-nums text-bff-700 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-ink/60 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — real icons, a ghost step numeral, no floating badge. */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '开始' : es ? 'Empezar' : 'How it works'}
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-ink">
          {zh ? '三步就能上手' : es ? 'Tres pasos para empezar' : 'Three steps to get going'}
        </h2>
        <p className="mt-3 max-w-xl text-ink/60">
          {zh
            ? '只要三步，你就能成为那个真正懂钱的朋友。'
            : es
              ? 'Tres pasos entre tú y ser el amigo que de verdad entiende de dinero.'
              : 'Three steps between you and being the friend who actually understands money.'}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="card relative overflow-hidden">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-3 font-display text-6xl font-extrabold text-ink/5"
                >
                  {step.num}
                </span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-bff-600 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="relative mt-4 font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink/60">{step.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured activities */}
      <section className="border-y border-ink/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                {zh ? '试玩' : es ? 'Juega' : 'Featured'}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink">
                {zh ? '挑一个最爱的玩起来' : es ? 'Métete a una favorita' : 'Jump into a favorite'}
              </h2>
              <p className="mt-2 max-w-lg text-ink/60">
                {zh
                  ? '和 BFF 导师在课堂上带的活动一模一样——你想玩的时候随时都准备好了。'
                  : es
                    ? 'Las mismas actividades que los mentores de BFF hacen en los salones — listas cuando tú quieras.'
                    : 'The same activities BFF mentors run in classrooms — ready whenever you are.'}
              </p>
            </div>
            <Link to="/activities" className="btn-ghost shrink-0">
              {zh ? '查看所有活动' : es ? 'Ver todas las actividades' : 'See all activities'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {featured.map((a) => {
              const { title, description } = localizeActivity(a, lang)
              return (
                <Link
                  key={a.slug}
                  to={a.path}
                  className="card lift group flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
                      <AppIcon name={a.icon} className="h-6 w-6" />
                    </span>
                    <span className="chip bg-bff-50 text-bff-700">{kindLabel(a.kind, lang)}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-bff-700">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                    {description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-ink/50">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> ~{a.durationMin} {zh ? '分钟' : 'min'}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Schools & partners — a solid ink block, no gradient. White text on ink. */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[8px] bg-ink px-6 py-14 sm:px-12">
          <span
            aria-hidden="true"
            className="ed-hero-orbit gold -right-24 -top-28 h-[420px] w-[420px]"
          />
          <div className="relative z-[1] mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-600 text-white">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="eyebrow mt-5 justify-center text-bff-300">
              {zh ? '学校与合作伙伴' : es ? 'Escuelas y aliados' : 'Schools & partners'}
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              {zh ? '想把 BFF Academy 带进你的学校吗？' : es ? '¿Quieres traer BFF Academy a tu escuela?' : 'Bringing BFF Academy to your school?'}
            </h2>
            <p className="mt-3 text-white/70">
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
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
