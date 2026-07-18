import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="animate-pop-in text-7xl" aria-hidden="true">🫰💸</p>
      <h1 className="mt-6 font-display text-5xl font-extrabold text-bff-700">404</h1>
      <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">
        This page bounced — like a bad check.
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600">
        We checked our whole balance sheet and this page just is not an asset we own.
        Consider it a sunk cost and reinvest your click somewhere with a better return.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          Take me home <span aria-hidden="true">🏠</span>
        </Link>
        <Link to="/lessons" className="btn-secondary">
          Browse lessons <span aria-hidden="true">📚</span>
        </Link>
      </div>
    </div>
  )
}
