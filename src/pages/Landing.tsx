// The front page.
//
// It used to run 2,681px over five sections: hero, a 8/3/100% stat strip, a
// three-card "how it works", a three-card "featured activities", then a schools
// block. Two near-identical three-up card grids of icon-plus-text, no
// photography anywhere, and BFF Academy — the actual product — never named on a
// button. A reviewer's summary was "there's just so much bullshit."
//
// This version has one job: get somebody into BFF Academy. So the page is the
// hero, two image-led doors, and a short line about who made it. Everything cut
// still exists one click away on /activities and /lessons.

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '../components/Logo'
import PhotoPanel from '../components/PhotoPanel'
import { hasPhoto } from '../lib/photos'
import { useLang } from '../lib/i18n'
import { resumeLesson } from '../lib/resume'
import { ACTIVITIES } from '../lib/activities'

const LESSON_COUNT = ACTIVITIES.filter((a) => a.kind === 'lesson').length
// Games and challenges only. `kind !== 'lesson'` would sweep in the five bonus
// electives, which are self-paced reading units on the course path, not
// something a mentor runs in a classroom — the card's own copy says otherwise.
const ACTIVITY_COUNT = ACTIVITIES.filter(
  (a) => a.kind === 'game' || a.kind === 'challenge',
).length

export default function Landing() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const resume = resumeLesson()

  // The primary action changes once somebody has started: "Start BFF Academy"
  // is the wrong words for a student who is seven lessons in.
  const primaryTo = resume ? resume.path : '/lessons'
  const primaryLabel = resume
    ? zh
      ? '继续学习'
      : es
        ? 'Continuar'
        : 'Keep going'
    : zh
      ? '开始 BFF Academy'
      : es
        ? 'Empezar BFF Academy'
        : 'Start BFF Academy'

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="ed-hero">
        <span aria-hidden="true" className="ed-hero-orbit -right-24 -top-32 h-[520px] w-[520px]" />
        <Logo
          reversed
          decorative
          className="pointer-events-none absolute -right-16 top-1/2 hidden h-[125%] -translate-y-1/2 opacity-[0.05] lg:block"
        />
        <div className="relative z-[1] mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-2xl">
            <Logo reversed className="h-10 sm:h-11" />
            <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.03] text-white sm:text-6xl">
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
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              {zh
                ? `BFF Academy 是一门 ${LESSON_COUNT} 节课的免费课程，由高中生为高中生打造。在课堂上跟导师一起学，或者自己随时学。`
                : es
                  ? `BFF Academy es un curso gratuito de ${LESSON_COUNT} lecciones, hecho por estudiantes de secundaria para estudiantes de secundaria. Tómalo en clase con tu mentor, o por tu cuenta.`
                  : `BFF Academy is a free ${LESSON_COUNT}-lesson course, built by high schoolers for high schoolers. Take it in class with a mentor, or on your own.`}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to={primaryTo} className="btn-primary w-full px-7 py-3 sm:w-auto">
                {primaryLabel}
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/join"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[5px] border border-white/25 px-5 py-3 font-display font-semibold text-white/90 transition-[transform,background-color,color] duration-150 hover:bg-white/10 hover:text-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-bff-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-auto"
              >
                {zh ? '我有班级代码' : es ? 'Tengo un código de clase' : 'I have a class code'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- The two doors ----------
          Image-led, and the image is never underneath the words: the caption
          sits in its own block below the frame. Text floated over a darkened
          photo is the most recognisable generated-landing-page move there is,
          and avoiding it is most of what makes this read as designed. */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-5">
          <DoorCard
            to={primaryTo}
            slot="academy"
            motif="rings"
            className="lg:col-span-3"
            frameClass="aspect-[16/10]"
            eyebrow={zh ? '课程' : es ? 'El curso' : 'The course'}
            title="BFF Academy"
            body={
              zh
                ? `四周，${LESSON_COUNT} 节课，每节约 20 分钟。视频、随堂测验，以及一条你实际能看到自己走了多远的路径。`
                : es
                  ? `Cuatro semanas, ${LESSON_COUNT} lecciones, ~20 minutos cada una. Videos, quizzes y una ruta donde de verdad ves cuánto llevas.`
                  : `Four weeks, ${LESSON_COUNT} lessons, ~20 minutes each. Videos, quizzes, and a path where you can actually see how far you have come.`
            }
            cta={primaryLabel}
            primary
          />
          <DoorCard
            to="/activities"
            slot="activities"
            motif="bars"
            className="lg:col-span-2"
            // Narrower column, so its frame absorbs whatever height the Academy
            // card sets rather than leaving a pocket of dead space under the copy.
            frameClass="aspect-[4/3] lg:aspect-auto lg:min-h-[240px] lg:flex-1"
            eyebrow={zh ? '边玩边学' : es ? 'Juega' : 'Play'}
            title={zh ? '游戏与挑战' : es ? 'Juegos y desafíos' : 'Games & Challenges'}
            body={
              zh
                ? `BFF 导师在课堂上带的那 ${ACTIVITY_COUNT} 个活动，自己玩，或者和全班一起玩。`
                : es
                  ? `Las ${ACTIVITY_COUNT} actividades que los mentores de BFF hacen en los salones, solo o con toda la clase.`
                  : `The ${ACTIVITY_COUNT} activities BFF mentors run in classrooms. Solo, or live with your whole class.`
            }
            cta={zh ? '开始玩' : es ? 'Jugar' : 'Play now'}
          />
        </div>
      </section>

      {/* ---------- Who made this ----------
          One band, not three. The credibility claims that were spread across a
          stat strip and a paragraph now sit on a single line. */}
      <section className="border-t border-ink/10 bg-white">
        {/* Two columns only when there is a photo to fill the second one.
            Without it the copy was stranded in the left half against a large
            empty right half, which reads as a failed image rather than as
            deliberate whitespace. */}
        <div
          className={`mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 lg:py-16 ${
            hasPhoto('schools') ? 'lg:flex-row lg:items-center lg:gap-16' : ''
          }`}
        >
          <div className={hasPhoto('schools') ? 'lg:flex-1' : 'max-w-3xl'}>
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              {zh ? '关于我们' : es ? 'Quiénes somos' : 'Who we are'}
            </p>
            <h2 className="mt-3 max-w-lg font-display text-2xl font-bold text-ink sm:text-3xl">
              {zh ? (
                <>
                  高中生教高中生<em>理财</em>。
                </>
              ) : es ? (
                <>
                  Estudiantes de secundaria enseñando <em>dinero</em> a estudiantes de secundaria.
                </>
              ) : (
                <>
                  High schoolers teaching high schoolers about <em>money</em>.
                </>
              )}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/65">
              {zh
                ? 'BFF of America 是一家由学生创办的 501(c)(3) 非营利组织。我们的导师走进初高中课堂免费授课，BFF Classroom 把同一套课程搬到了网上，永久免费。'
                : es
                  ? 'BFF of America es una organización 501(c)(3) fundada por estudiantes. Nuestros mentores dan clases gratis en escuelas medias y secundarias, y BFF Classroom lleva ese mismo programa a internet, gratis, para siempre.'
                  : 'BFF of America is a student-founded 501(c)(3) nonprofit. Our mentors teach for free in middle and high school classrooms, and BFF Classroom puts that same program online, free, forever.'}
            </p>
            <a
              href="https://www.bffofamerica.org/join-the-cause"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-7"
            >
              {zh ? '把 BFF 带进你的学校' : es ? 'Lleva BFF a tu escuela' : 'Bring BFF to your school'}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          {hasPhoto('schools') && (
            <div className="lz-frame w-full overflow-hidden lg:w-[42%]">
              <div className="aspect-[3/2]">
                <PhotoPanel slot="schools" motif="grid" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ---------- Card ----------

function DoorCard({
  to,
  slot,
  motif,
  eyebrow,
  title,
  body,
  cta,
  className = '',
  frameClass,
  primary = false,
}: {
  to: string
  slot: 'academy' | 'activities'
  motif: 'rings' | 'bars'
  eyebrow: string
  title: string
  body: string
  cta: string
  className?: string
  frameClass: string
  primary?: boolean
}) {
  return (
    <Link
      to={to}
      className={`ed-door group flex flex-col ${primary ? 'ed-door--primary' : ''} ${className}`}
    >
      {/* Only rendered once a real photograph exists. The designed ink panel
          that used to stand in for one was doing more harm than good: a large
          empty dark box above the title reads as a broken image rather than as
          a treatment, and it pushed the actual words down the page. Drop
          academy.jpg into src/assets/photos and the frame comes back on its
          own, with no code change. */}
      {hasPhoto(slot) && (
        <div className={`ed-door-frame ${frameClass}`}>
          <PhotoPanel slot={slot} motif={motif} />
        </div>
      )}
      {/* Not flex-1: the image frame is what absorbs spare height, so a short
          caption does not leave a pocket of dead white under the link. */}
      <div className="flex flex-col p-6 sm:p-7">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          className={`mt-3 font-display font-extrabold leading-tight text-ink ${
            primary ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          {title}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/65">{body}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-bff-700">
          {cta}
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
