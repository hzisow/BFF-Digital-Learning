// First name + last initial, as one control.
//
// The three live game screens and the class-join screen all ask the same
// question, so they share this rather than triplicating two inputs and their
// trilingual labels. It also guarantees they compose the name identically —
// which matters, because that string *is* the student's identity when they
// reconnect.

import { useId } from 'react'
import { useLang } from '../lib/i18n'
import { cleanFirstName, cleanLastInitial } from '../lib/studentName'

export default function StudentNameFields({
  firstName,
  lastInitial,
  onFirstName,
  onLastInitial,
  autoFocus = false,
}: {
  firstName: string
  lastInitial: string
  onFirstName: (v: string) => void
  onLastInitial: (v: string) => void
  autoFocus?: boolean
}) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const es = lang === 'es'
  const id = useId()

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <label htmlFor={`${id}-first`} className="sr-only">
          {zh ? '名字' : es ? 'Nombre' : 'First name'}
        </label>
        <input
          id={`${id}-first`}
          className="input text-center font-display text-lg"
          value={firstName}
          onChange={(e) => onFirstName(cleanFirstName(e.target.value))}
          placeholder={zh ? '名字' : es ? 'Nombre' : 'First name'}
          autoComplete="given-name"
          autoFocus={autoFocus}
        />
      </div>
      <div className="w-20">
        <label htmlFor={`${id}-initial`} className="sr-only">
          {zh ? '姓氏首字母' : es ? 'Inicial del apellido' : 'Last initial'}
        </label>
        <input
          id={`${id}-initial`}
          className="input text-center font-display text-lg uppercase"
          value={lastInitial}
          onChange={(e) => onLastInitial(cleanLastInitial(e.target.value))}
          placeholder="M"
          maxLength={1}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
