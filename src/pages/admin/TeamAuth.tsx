// Sign in for BFF team members (mentors & admins) — Google only.
// Students never see this — they join classes with a code, no account needed.

import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BACKEND_ENABLED, GOOGLE_CLIENT_ID } from '../../lib/config'
import { useAdmin } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import GoogleSignInButton from '../../components/GoogleSignInButton'

/**
 * Shown on all /team + /admin pages when no Supabase backend is configured.
 * Shared by AdminDashboard and ClassroomDetail.
 */
export function BackendOffCard() {
  const { lang } = useLang()
  const es = lang === 'es'
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="card animate-pop-in text-center">
        <div className="text-4xl" aria-hidden>
          🔌
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
          {es ? 'El panel del equipo aún no está conectado' : 'Team dashboard not connected yet'}
        </h1>
        <p className="mt-3 text-slate-600">
          {es
            ? 'Los códigos de clase, las tareas y el panel del mentor se activan una vez que el backend está conectado; consulta el README para la configuración rápida de Supabase. Las lecciones y las actividades individuales ya funcionan para todos, sin necesidad de backend.'
            : 'Class codes, assignments, and the mentor dashboard activate once the backend is connected — see the README for the quick Supabase setup. Lessons and solo activities already work for everyone, no backend needed.'}
        </p>
        <Link to="/" className="btn-secondary mt-6">
          {es ? '← Volver al inicio' : '← Back home'}
        </Link>
      </div>
    </div>
  )
}

export default function TeamAuth() {
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const [error, setError] = useState<string | null>(null)

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return (
      <div role="status" className="px-4 py-16 text-center text-slate-500">
        {es ? 'Cargando…' : 'Loading…'}
      </div>
    )
  }
  if (adminUser) return <Navigate to="/admin" replace />

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900">{es ? 'Equipo BFF' : 'BFF Team'}</h1>
        <p className="mt-2 text-slate-600">
          {es
            ? 'Acceso para mentores y administradores: aulas, tareas y juegos en vivo.'
            : 'Mentor & admin sign-in for classrooms, assignments, and live games.'}
        </p>
      </div>

      <div className="card animate-pop-in">
        {GOOGLE_CLIENT_ID ? (
          <>
            <GoogleSignInButton onError={setError} />
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </p>
            )}
            <p className="mt-5 text-center text-sm text-slate-600">
              {es
                ? '¿Eres nuevo? Al iniciar sesión se crea tu cuenta. Un administrador de BFF la aprueba antes de que puedas gestionar aulas.'
                : 'New here? Signing in creates your account. A BFF admin approves it before you can manage classrooms.'}
            </p>
          </>
        ) : (
          <p role="status" className="text-center text-sm text-slate-600">
            {es
              ? 'El inicio de sesión con Google aún no está configurado. Agrega un Google Client ID para habilitar el acceso del equipo.'
              : "Google sign-in isn't configured yet. Add a Google Client ID to enable team sign-in."}
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        {es
          ? 'Los estudiantes nunca necesitan una cuenta: se unen con un código de clase y un apodo. Este acceso es solo para el equipo de BFF.'
          : 'Students never need an account — they join with a class code and a nickname. This login is only for the BFF team.'}
      </p>
    </div>
  )
}
