import { Link } from 'react-router-dom'
import { Home, BookOpen, Compass } from 'lucide-react'
import { useLang } from '../lib/i18n'

export default function NotFound() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[10px] bg-ink text-bff-300">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <p className="eyebrow mt-8 justify-center">404</p>
      <h1 className="mt-3 font-display text-6xl font-extrabold text-ink sm:text-7xl">404</h1>
      <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
        {zh ? (
          <>这个页面<em>跳票</em>了，就像一张空头支票。</>
        ) : es ? (
          <>Esta página <em>rebotó</em>, como un cheque sin fondos.</>
        ) : (
          <>This page <em>bounced</em>, like a bad check.</>
        )}
      </h2>
      <p className="mt-4 leading-relaxed text-ink/60">
        {zh
          ? '我们把整张资产负债表都翻遍了，这个页面根本不是我们拥有的资产。就把它当成沉没成本吧，把你的这一次点击重新投资到回报更高的地方。'
          : es
            ? 'Revisamos todo nuestro balance y esta página simplemente no es un activo que tengamos. Considéralo un costo hundido y reinvierte tu clic en algo con mejor rendimiento.'
            : 'We checked our whole balance sheet and this page just is not an asset we own. Consider it a sunk cost and reinvest your click somewhere with a better return.'}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          {zh ? '带我回首页' : es ? 'Llévame al inicio' : 'Take me home'} <Home className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/lessons" className="btn-ghost">
          {zh ? '浏览课程' : es ? 'Ver lecciones' : 'Browse lessons'} <BookOpen className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
