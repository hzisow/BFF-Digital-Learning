import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Ticket, BookOpen, Gamepad2, Smile } from 'lucide-react'
import { BACKEND_ENABLED } from '../../lib/config'
import { useStudent } from '../../lib/session'
import { isNetworkError, isOnline } from '../../lib/online'
import { cleanFirstName, cleanLastInitial, composeStudentName } from '../../lib/studentName'
import { offlineLiveCopy } from '../../lib/offlineCopy'
import { useLang } from '../../lib/i18n'

function cleanCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
}

function SoloModeCard() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  return (
    <div className="mx-auto max-w-lg animate-pop-in text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bff-600 text-white shadow-sm">
        <Ticket className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="eyebrow mt-6 justify-center">
        <span className="eyebrow-line" aria-hidden="true" />
        {zh ? '班级代码' : es ? 'Códigos de clase' : 'Class codes'}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
        {zh ? (
          <>班级代码马上就要<em>上线</em>啦！</>
        ) : es ? (
          <>¡Los códigos de clase estarán disponibles muy <em>pronto</em>!</>
        ) : (
          <>Class codes are coming <em>online</em> soon!</>
        )}
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/70">
        {zh
          ? '等教室正式启用后，你的 BFF 导师就会发放班级代码。在那之前，每一节课、每个游戏和挑战都完全开放，而且你的进度就保存在这台设备上。'
          : es
          ? 'Tu mentor de BFF repartirá los códigos de clase cuando las aulas estén activas. Mientras tanto, cada lección, juego y desafío está totalmente abierto, y tu progreso se guarda aquí mismo en este dispositivo.'
          : 'Your BFF mentor will hand out class codes once classrooms go live. Until then, every lesson, game, and challenge is wide open, and your progress saves right on this device.'}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/lessons" className="btn-primary">
          {zh ? '探索课程' : es ? 'Explorar lecciones' : 'Explore lessons'} <BookOpen className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/activities" className="btn-secondary">
          {zh ? '游戏和挑战' : es ? 'Juegos y desafíos' : 'Games & challenges'} <Gamepad2 className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function JoinForm() {
  const { joinClass } = useStudent()
  const navigate = useNavigate()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [params] = useSearchParams()
  // A shared join link (…/join?code=ABC123) pre-fills the code.
  const prefilledCode = cleanCode(params.get('code') ?? '')
  const [code, setCode] = useState(prefilledCode)
  const [firstName, setFirstName] = useState('')
  const [lastInitial, setLastInitial] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const codeRef = useRef<HTMLInputElement>(null)
  const nickRef = useRef<HTMLInputElement>(null)
  // Focus the first empty field on load: the name if the code came prefilled.
  useEffect(() => {
    if (prefilledCode.length === 6) nickRef.current?.focus()
    else codeRef.current?.focus()
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // "Jayden M." — built in one place so the same student always resolves to the
  // same record. Identity is matched on this string.
  const displayName = composeStudentName(firstName, lastInitial)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    setError(null)
    // Joining a class writes to the server, so it genuinely cannot work
    // offline. Say so plainly rather than surfacing a lookup failure that reads
    // like "your code is wrong".
    if (!isOnline()) {
      const copy = offlineLiveCopy(lang)
      setError(`${copy.title}. ${copy.body}`)
      return
    }
    setBusy(true)
    try {
      await joinClass(code, displayName)
      navigate('/student')
    } catch (err) {
      if (isNetworkError(err)) {
        const copy = offlineLiveCopy(lang)
        setError(`${copy.title}. ${copy.body}`)
        return
      }
      setError(
        err instanceof Error
          ? err.message
          : zh
            ? '出了点问题，再试一次吧！'
            : es
            ? 'Algo salió mal, ¡inténtalo de nuevo!'
            : 'Something went wrong, try again!',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md animate-pop-in">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bff-600 text-white shadow-sm">
          <Ticket className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6 justify-center">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '班级代码' : es ? 'Código de clase' : 'Class code'}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
          {zh ? (
            <>加入你的<em>班级</em></>
          ) : es ? (
            <>Únete a tu <em>clase</em></>
          ) : (
            <>Join your <em>class</em></>
          )}
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
          {zh
            ? '向你的 BFF 导师要一个 6 位字母的班级代码，然后填写名字和姓氏首字母。不需要邮箱，也不需要账号。'
            : es
            ? 'Consigue el código de clase de 6 letras de tu mentor de BFF y pon tu nombre y la inicial de tu apellido. Sin correo y sin cuenta.'
            : 'Grab the 6-letter class code from your BFF mentor, then add your first name and last initial. No email, no account.'}
        </p>
      </div>

      <div className="panel ink mt-8 p-6 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="class-code" className="font-display text-sm font-semibold text-slate-700">
              {zh ? '班级代码' : es ? 'Código de clase' : 'Class code'}
            </label>
            <input
              ref={codeRef}
              id="class-code"
              className="input mt-1.5 text-center font-display text-3xl font-bold uppercase tracking-[0.35em]"
              placeholder="ABC123"
              value={code}
              onChange={(e) => setCode(cleanCode(e.target.value))}
              maxLength={6}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="first-name" className="font-display text-sm font-semibold text-slate-700">
                {zh ? '名字' : es ? 'Nombre' : 'First name'}
              </label>
              <input
                ref={nickRef}
                id="first-name"
                className="input mt-1.5"
                placeholder={zh ? '例如 小明' : es ? 'p. ej. Jayden' : 'e.g. Jayden'}
                value={firstName}
                onChange={(e) => setFirstName(cleanFirstName(e.target.value))}
                autoComplete="given-name"
                aria-describedby="name-hint"
              />
            </div>
            <div className="w-24">
              <label htmlFor="last-initial" className="font-display text-sm font-semibold text-slate-700">
                {zh ? '姓氏首字母' : es ? 'Inicial' : 'Last initial'}
              </label>
              <input
                id="last-initial"
                className="input mt-1.5 text-center uppercase"
                placeholder={zh ? 'M' : 'M'}
                value={lastInitial}
                onChange={(e) => setLastInitial(cleanLastInitial(e.target.value))}
                maxLength={1}
                autoComplete="off"
                aria-describedby="name-hint"
              />
            </div>
          </div>
          <p id="name-hint" className="-mt-2 text-xs text-slate-500">
            {zh ? (
              <>
                你的导师会看到 <strong>{displayName || '小明 M.'}</strong>
                ，只需要姓氏的第一个字母，不用填写全名 <Smile className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />。
                用同样的名字在<strong>任何设备</strong>上重新加入，就能继续你的进度。
              </>
            ) : es ? (
              <>
                Tu mentor verá <strong>{displayName || 'Jayden M.'}</strong>, solo la primera letra
                del apellido, nunca el nombre completo{' '}
                <Smile className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />. Vuelve
                a entrar con el mismo nombre en <strong>cualquier dispositivo</strong> para continuar.
              </>
            ) : (
              <>
                Your mentor sees <strong>{displayName || 'Jayden M.'}</strong>, just the first letter
                of your last name, never your full name{' '}
                <Smile className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />. Join
                again with the same name on <strong>any device</strong> to keep your progress.
              </>
            )}
          </p>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={busy || code.length !== 6 || displayName.length === 0}
            aria-busy={busy}
          >
            {busy
              ? zh ? '加入中……' : es ? 'Uniéndote…' : 'Joining…'
              : zh ? '加入班级' : es ? 'Unirse a la clase' : 'Join class'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        {zh ? '没有班级代码？你仍然可以' : es ? '¿No tienes código de clase? Todavía puedes ' : 'No class code? You can still '}
        <Link to="/lessons" className="font-semibold text-bff-700 hover:text-bff-800">
          {zh ? '自己探索全部内容' : es ? 'explorar todo por tu cuenta' : 'explore everything solo'}
        </Link>{' '}
        {zh ? '，进度会保存在这台设备上。' : es ? ', tu progreso se guarda en este dispositivo.' : ', progress saves on this device.'}
      </p>
    </div>
  )
}

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {BACKEND_ENABLED ? <JoinForm /> : <SoloModeCard />}
    </div>
  )
}
