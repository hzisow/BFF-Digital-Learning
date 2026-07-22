import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { BACKEND_ENABLED } from '../../lib/config'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'

function cleanCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
}

function SoloModeCard() {
  const { lang } = useLang()
  const es = lang === 'es'
  return (
    <div className="card animate-pop-in mx-auto max-w-md text-center">
      <p className="text-5xl" aria-hidden="true">🎟️</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
        {es ? '¡Los códigos de clase estarán disponibles muy pronto!' : 'Class codes are coming online soon!'}
      </h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        {es
          ? 'Tu mentor de BFF repartirá los códigos de clase cuando las aulas estén activas. Mientras tanto, cada lección, juego y desafío está totalmente abierto — y tu progreso se guarda aquí mismo en este dispositivo.'
          : 'Your BFF mentor will hand out class codes once classrooms go live. Until then, every lesson, game, and challenge is wide open — and your progress saves right on this device.'}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/lessons" className="btn-primary">
          {es ? 'Explorar lecciones' : 'Explore lessons'} <span aria-hidden="true">📚</span>
        </Link>
        <Link to="/activities" className="btn-secondary">
          {es ? 'Juegos y desafíos' : 'Games & challenges'} <span aria-hidden="true">🎮</span>
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
  const [params] = useSearchParams()
  // A shared join link (…/#/join?code=ABC123) pre-fills the code.
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
        es
          ? 'Tus PIN no coinciden — escribe los mismos 4 dígitos en ambas casillas.'
          : "Your PINs don't match — type the same 4 digits in both boxes.",
      )
      return
    }
    setError(null)
    setBusy(true)
    try {
      await joinClass(code, nickname, pin)
      navigate('/student')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : es
            ? 'Algo salió mal — ¡inténtalo de nuevo!'
            : 'Something went wrong — try again!',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card animate-pop-in mx-auto max-w-md">
      <div className="text-center">
        <p className="text-5xl" aria-hidden="true">👋</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
          {es ? 'Únete a tu clase' : 'Join your class'}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {es
            ? 'Consigue el código de clase de 6 letras de tu mentor de BFF y elige un apodo. Sin correo, sin cuenta, sin datos personales.'
            : 'Grab the 6-letter class code from your BFF mentor and pick a nickname. No email, no account, no personal info needed.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="class-code" className="font-display text-sm font-semibold text-slate-700">
            {es ? 'Código de clase' : 'Class code'}
          </label>
          <input
            ref={codeRef}
            id="class-code"
            className="input mt-1.5 text-center font-display text-2xl font-bold uppercase tracking-[0.35em]"
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
            {es ? 'Tu apodo' : 'Your nickname'}
          </label>
          <input
            ref={nickRef}
            id="nickname"
            className="input mt-1.5"
            placeholder={es ? 'p. ej. SavvySam' : 'e.g. SavvySam'}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={24}
            autoComplete="off"
            aria-describedby="nickname-hint"
          />
          <p id="nickname-hint" className="mt-1.5 text-xs text-slate-500">
            {es
              ? 'Tu mentor ve este apodo — que sea fácil de reconocer (y apropiado para la escuela '
              : 'Your mentor sees this nickname — keep it recognizable (and school-appropriate '}
            <span aria-hidden="true">😄</span>).
          </p>
        </div>
        <div>
          <label htmlFor="pin" className="font-display text-sm font-semibold text-slate-700">
            PIN <span className="font-normal text-slate-400">{es ? '(opcional)' : '(optional)'}</span>
          </label>
          <input
            id="pin"
            className="input mt-1.5 tracking-[0.3em]"
            type="text"
            inputMode="numeric"
            placeholder={es ? '4 dígitos' : '4 digits'}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
            maxLength={4}
            autoComplete="off"
            aria-describedby="pin-hint"
          />
          <p id="pin-hint" className="mt-1.5 text-xs text-slate-500">
            {es ? (
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
              {es ? 'Confirma el PIN' : 'Confirm PIN'}
            </label>
            <input
              id="confirm-pin"
              className={`input mt-1.5 tracking-[0.3em] ${
                pinMismatch ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
              }`}
              type="text"
              inputMode="numeric"
              placeholder={es ? 'escríbelo de nuevo' : 'type it again'}
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
                  {es ? 'Los dos PIN aún no coinciden.' : "The two PINs don't match yet."}
                </span>
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
          {busy ? (
            es ? 'Uniéndote…' : 'Joining…'
          ) : (
            <>{es ? 'Unirse a la clase' : 'Join class'} <span aria-hidden="true">🚀</span></>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        {es ? '¿No tienes código de clase? Todavía puedes ' : 'No class code? You can still '}
        <Link to="/lessons" className="font-semibold text-bff-700 hover:text-bff-800">
          {es ? 'explorar todo por tu cuenta' : 'explore everything solo'}
        </Link>{' '}
        {es ? '— tu progreso se guarda en este dispositivo.' : '— progress saves on this device.'}
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
