import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Ticket, BookOpen, Gamepad2, Smile } from 'lucide-react'
import { BACKEND_ENABLED } from '../../lib/config'
import { useStudent } from '../../lib/session'
import { isNetworkError, isOnline } from '../../lib/online'
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
          ? '等教室正式启用后，你的 BFF 导师就会发放班级代码。在那之前，每一节课、每个游戏和挑战都完全开放——而且你的进度就保存在这台设备上。'
          : es
          ? 'Tu mentor de BFF repartirá los códigos de clase cuando las aulas estén activas. Mientras tanto, cada lección, juego y desafío está totalmente abierto — y tu progreso se guarda aquí mismo en este dispositivo.'
          : 'Your BFF mentor will hand out class codes once classrooms go live. Until then, every lesson, game, and challenge is wide open — and your progress saves right on this device.'}
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
  const [nickname, setNickname] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const codeRef = useRef<HTMLInputElement>(null)
  const nickRef = useRef<HTMLInputElement>(null)
  // Focus the first empty field on load: the nickname if the code came prefilled.
  useEffect(() => {
    if (prefilledCode.length === 6) nickRef.current?.focus()
    else codeRef.current?.focus()
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pinMismatch = pin.length > 0 && confirmPin.length > 0 && pin !== confirmPin

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    // If they're setting a PIN, both boxes must match so it can't be a typo.
    if (pin.length > 0 && pin !== confirmPin) {
      setError(
        zh
          ? 'PIN 码不一致——请在两个框里输入相同的 4 位数字。'
          : es
          ? 'Tus PIN no coinciden — escribe los mismos 4 dígitos en ambas casillas.'
          : "Your PINs don't match — type the same 4 digits in both boxes.",
      )
      return
    }
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
      await joinClass(code, nickname, pin)
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
            ? '出了点问题——再试一次吧！'
            : es
            ? 'Algo salió mal — ¡inténtalo de nuevo!'
            : 'Something went wrong — try again!',
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
            ? '向你的 BFF 导师要一个 6 位字母的班级代码，再取一个昵称。不需要邮箱、账号，也不需要任何个人信息。'
            : es
            ? 'Consigue el código de clase de 6 letras de tu mentor de BFF y elige un apodo. Sin correo, sin cuenta, sin datos personales.'
            : 'Grab the 6-letter class code from your BFF mentor and pick a nickname. No email, no account, no personal info needed.'}
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
          <div>
            <label htmlFor="nickname" className="font-display text-sm font-semibold text-slate-700">
              {zh ? '你的昵称' : es ? 'Tu apodo' : 'Your nickname'}
            </label>
            <input
              ref={nickRef}
              id="nickname"
              className="input mt-1.5"
              placeholder={zh ? '例如 SavvySam' : es ? 'p. ej. SavvySam' : 'e.g. SavvySam'}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={24}
              autoComplete="off"
              aria-describedby="nickname-hint"
            />
            <p id="nickname-hint" className="mt-1.5 text-xs text-slate-500">
              {zh
                ? '你的导师会看到这个昵称——让它容易辨认（也要适合在学校里使用 '
                : es
                ? 'Tu mentor ve este apodo — que sea fácil de reconocer (y apropiado para la escuela '
                : 'Your mentor sees this nickname — keep it recognizable (and school-appropriate '}
              <Smile className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />).
            </p>
          </div>
          <div>
            <label htmlFor="pin" className="font-display text-sm font-semibold text-slate-700">
              PIN <span className="font-normal text-slate-400">{zh ? '（可选）' : es ? '(opcional)' : '(optional)'}</span>
            </label>
            <input
              id="pin"
              className="input mt-1.5 tracking-[0.3em]"
              type="text"
              inputMode="numeric"
              placeholder={zh ? '4 位数字' : es ? '4 dígitos' : '4 digits'}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              maxLength={4}
              autoComplete="off"
              aria-describedby="pin-hint"
            />
            <p id="pin-hint" className="mt-1.5 text-xs text-slate-500">
              {zh ? (
                <>
                  设置一个 4 位 PIN 码，你的进度就会和你的名字绑定保存——用相同的昵称 + PIN 码在
                  <strong>任何设备</strong>上重新登录，就能从上次离开的地方继续。
                </>
              ) : es ? (
                <>
                  Elige un PIN de 4 dígitos y tu progreso se guardará con tu nombre — vuelve a entrar
                  con el mismo apodo + PIN en <strong>cualquier dispositivo</strong> para continuar
                  donde lo dejaste.
                </>
              ) : (
                <>
                  Pick a 4-digit PIN and it saves your progress to your name — sign back in with the
                  same nickname + PIN on <strong>any device</strong> to pick up where you left off.
                </>
              )}
            </p>
          </div>
          {pin.length > 0 && (
            <div>
              <label htmlFor="confirm-pin" className="font-display text-sm font-semibold text-slate-700">
                {zh ? '确认 PIN 码' : es ? 'Confirma el PIN' : 'Confirm PIN'}
              </label>
              <input
                id="confirm-pin"
                className={`input mt-1.5 tracking-[0.3em] ${
                  pinMismatch ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
                }`}
                type="text"
                inputMode="numeric"
                placeholder={zh ? '再输入一次' : es ? 'escríbelo de nuevo' : 'type it again'}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                maxLength={4}
                autoComplete="off"
                aria-invalid={pinMismatch}
                aria-describedby="confirm-pin-hint"
              />
              <p id="confirm-pin-hint" className="mt-1.5 text-xs text-slate-500">
                {pinMismatch ? (
                  <span className="font-semibold text-red-600">
                    {zh ? '两个 PIN 码还不一致。' : es ? 'Los dos PIN aún no coinciden.' : "The two PINs don't match yet."}
                  </span>
                ) : zh ? (
                  '输入相同的 4 位数字，这样就不会忘记。'
                ) : es ? (
                  'Escribe los mismos 4 dígitos para que no se te olviden.'
                ) : (
                  'Type the same 4 digits so you don’t forget them.'
                )}
              </p>
            </div>
          )}

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
            disabled={
              busy ||
              code.length !== 6 ||
              nickname.trim().length === 0 ||
              (pin.length > 0 && confirmPin !== pin)
            }
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
        {zh ? '——进度会保存在这台设备上。' : es ? '— tu progreso se guarda en este dispositivo.' : '— progress saves on this device.'}
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
