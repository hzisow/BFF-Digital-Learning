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
import { CertificatePreview } from '../components/CertificateSheet'
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
  // The promo shows a real date so the sheet does not read as a wireframe.
  const certDate = new Date().toLocaleDateString(
    zh ? 'zh-CN' : es ? 'es-MX' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )

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

      {/* ---------- The certificate ----------
          The reward for finishing was previously invisible until the moment a
          student had already finished, which is the one moment it cannot
          motivate anybody. Showing the real document, rendered by the same
          component that produces the earned one, gives the eight lessons a
          visible finish line. */}
      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-[1.05] text-ink sm:text-4xl">
              {zh ? (
                <>把这 8 节课上完，带走一张证书</>
              ) : es ? (
                <>Termina las 8 lecciones y llévate el certificado</>
              ) : (
                <>Finish the {LESSON_COUNT} lessons, leave with a certificate</>
              )}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink/65">
              {zh
                ? '每节课的测验都过关，这张印着你名字和测验平均分的证书就会解锁。可以直接下载 PDF，也可以打印出来。'
                : es
                  ? 'Pasa el examen de cada lección y se desbloquea con tu nombre y tu promedio. Descárgalo en PDF o imprímelo.'
                  : 'Pass the quiz on every lesson and it unlocks with your name and your quiz average on it. Download it as a PDF or print it.'}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/50">
              {zh
                ? '你的名字只留在这台设备上，不会被保存或上传。'
                : es
                  ? 'Tu nombre solo vive en tu dispositivo: no se guarda ni se envía a ningún lado.'
                  : 'Your name only ever lives on your own device. It is never saved or sent anywhere.'}
            </p>
            <Link to="/certificate" className="btn-secondary mt-8 inline-flex">
              {zh ? '看看这张证书' : es ? 'Ver el certificado' : 'See the certificate'}
            </Link>
          </div>

          {/* Tilted a couple of degrees so it reads as an object on a desk
              rather than another rectangle in the layout grid. */}
          <div className="lg:rotate-[-1.5deg]">
            <CertificatePreview
              name={zh ? '你的名字' : es ? 'Tu nombre' : 'Your name here'}
              dateStr={certDate}
              avgScore={96}
              lang={lang}
              className="rounded-[10px] shadow-card"
            />
          </div>
        </div>
      </section>

      {/* ---------- Who made this ----------
          A register, not another split. This was a headline and a paragraph in
          the left 40% with an empty right half waiting on a photograph that
          does not exist, which reads as a broken image rather than as
          whitespace. Facts in a ruled list fill the width honestly and give
          the page a fourth shape: the four sections above it are a dark band,
          a card board, and a split, so this one is none of those.

          Every number here is derived from the catalogue at build time. There
          are no invented metrics on this page. */}
      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <h2 className="max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {zh
              ? '高中生教高中生理财。'
              : es
                ? 'Estudiantes de secundaria enseñando dinero a estudiantes de secundaria.'
                : 'High schoolers teaching high schoolers about money.'}
          </h2>

          <dl className="mt-10 border-t border-ink/10">
            {[
              {
                k: zh ? '我们是谁' : es ? 'Quiénes somos' : 'Who runs it',
                v: zh
                  ? '由学生创办的 501(c)(3) 非营利组织。'
                  : es
                    ? 'Una organización 501(c)(3) fundada por estudiantes.'
                    : 'A student-founded 501(c)(3) nonprofit.',
              },
              {
                k: zh ? '在哪里上课' : es ? 'Dónde' : 'Where it happens',
                v: zh
                  ? '导师走进初高中课堂免费授课，同一套课程也在网上。'
                  : es
                    ? 'Mentores dando clases gratis en escuelas medias y secundarias, y el mismo programa en internet.'
                    : 'Mentors teaching free in middle and high school classrooms, and the same program online.',
              },
              {
                k: zh ? '包含什么' : es ? 'Qué incluye' : "What's in it",
                v: zh
                  ? `${LESSON_COUNT} 节课，${ACTIVITY_COUNT} 个游戏与挑战，中文、英文、西班牙文三种语言。`
                  : es
                    ? `${LESSON_COUNT} lecciones y ${ACTIVITY_COUNT} juegos, en inglés, español y chino.`
                    : `${LESSON_COUNT} lessons and ${ACTIVITY_COUNT} games, in English, Spanish and Chinese.`,
              },
              {
                k: zh ? '费用' : es ? 'Cuánto cuesta' : 'What it costs',
                v: zh ? '免费，永久免费。' : es ? 'Nada. Para siempre.' : 'Nothing. Forever.',
              },
            ].map((row) => (
              <div
                key={row.k}
                className="grid gap-1 border-b border-ink/10 py-5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink/50">
                  {row.k}
                </dt>
                <dd className="max-w-2xl leading-relaxed text-ink">{row.v}</dd>
              </div>
            ))}
          </dl>

          <a
            href="https://www.bffofamerica.org/join-the-cause"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary mt-10"
          >
            {zh ? '把 BFF 带进你的学校' : es ? 'Lleva BFF a tu escuela' : 'Bring BFF to your school'}
          </a>
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
        {/* No eyebrow. "THE COURSE" above a card titled "BFF Academy" is a
            label restating its own heading, and four of them on one page was
            most of what made this read as a template. */}
        <h2
          className={`font-display font-extrabold leading-tight text-ink ${
            primary ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          {title}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/65">{body}</p>
        {/* Arrows are rationed to one per view and the hero has it. Here the
            whole card is the link, so the arrow was decorating a target the
            user is already inside. */}
        <span className="link-underline mt-6 inline-flex font-display text-sm font-bold text-bff-700">
          {cta}
        </span>
      </div>
    </Link>
  )
}
