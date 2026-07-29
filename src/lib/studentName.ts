// How a student identifies themselves: first name plus a last initial.
//
// This replaced a nickname-plus-optional-PIN scheme. The PIN existed so a
// nickname could not be casually claimed by someone else, but it was friction at
// exactly the wrong moment — a room of students typing a class code, inventing a
// nickname, then inventing and confirming a 4-digit number — and it left mentors
// looking at a roster of "JayJay" and "xX_money_Xx" with no idea who was who.
//
// A first name and a last initial fixes both ends: a mentor can read the roster,
// and the student types two short things they already know. It is also what
// schools use on a wall chart or a graded paper, so it does not turn a
// deliberately low-data product into one that stores children's full names.
//
// The composed value goes into the existing `nickname` column, so nothing in the
// database had to change — identity is still (classroom, name), which is what
// lets a student reconnect from another device.

/** Strip anything that is not part of a name, and cap the length. */
export function cleanFirstName(raw: string): string {
  return raw.replace(/[^\p{L}\p{M}'\- ]/gu, '').replace(/\s+/g, ' ').trimStart().slice(0, 20)
}

/** A single letter. Students paste whole surnames here, so take the first one. */
export function cleanLastInitial(raw: string): string {
  const letters = raw.replace(/[^\p{L}]/gu, '')
  return letters.slice(0, 1).toUpperCase()
}

/**
 * The display name stored against the student record: `Jayden M.`
 *
 * The trailing period is part of the stored value on purpose. Identity is
 * matched on `lower(nickname)`, so the format has to be stable — building it in
 * one place is what stops "Jayden M" and "Jayden M." becoming two records for
 * the same person.
 */
export function composeStudentName(firstName: string, lastInitial: string): string {
  const first = capitalizeFirst(cleanFirstName(firstName).trim())
  const initial = cleanLastInitial(lastInitial)
  if (!first) return ''
  return initial ? `${first} ${initial}.` : first
}

/**
 * Upper-case the first letter and leave the rest alone. Students type in
 * lower case and a mentor's roster should not read "jayden M." — but only the
 * first letter is touched, so "McKenzie" and "OConnor" survive intact.
 */
function capitalizeFirst(name: string): string {
  if (!name) return name
  return name[0].toLocaleUpperCase() + name.slice(1)
}

/** Split a stored name back into its parts, for pre-filling a form. */
export function splitStudentName(name: string): { firstName: string; lastInitial: string } {
  const m = /^(.*?)\s+([\p{L}])\.?$/u.exec(name.trim())
  if (m) return { firstName: m[1], lastInitial: m[2].toUpperCase() }
  return { firstName: name.trim(), lastInitial: '' }
}
