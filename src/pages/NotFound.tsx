import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'

export default function NotFound() {
  const { lang } = useLang()
  const es = lang === 'es'
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="animate-pop-in text-7xl" aria-hidden="true">🫰💸</p>
      <h1 className="mt-6 font-display text-5xl font-extrabold text-bff-700">404</h1>
      <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">
        {es
          ? 'Esta página rebotó — como un cheque sin fondos.'
          : 'This page bounced — like a bad check.'}
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600">
        {es
          ? 'Revisamos todo nuestro balance y esta página simplemente no es un activo que tengamos. Considéralo un costo hundido y reinvierte tu clic en algo con mejor rendimiento.'
          : 'We checked our whole balance sheet and this page just is not an asset we own. Consider it a sunk cost and reinvest your click somewhere with a better return.'}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          {es ? 'Llévame al inicio' : 'Take me home'} <span aria-hidden="true">🏠</span>
        </Link>
        <Link to="/lessons" className="btn-secondary">
          {es ? 'Ver lecciones' : 'Browse lessons'} <span aria-hidden="true">📚</span>
        </Link>
      </div>
    </div>
  )
}
