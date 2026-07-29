// Shared wording for the "you are offline" case.
//
// Four different screens need to say this, in three languages. Writing it once
// keeps them consistent — and consistency matters more than usual here, because
// a student who sees the same sentence in the Coach and in Practice learns that
// it means "the wifi, not the app", instead of reading each one as a new bug.
//
// The copy always says two things: what is not working, and what still is.

import type { Lang } from './i18n'

export interface OfflineCopy {
  title: string
  body: string
  retry: string
}

/** For an AI feature that cannot run without the network. */
export function offlineAICopy(lang: Lang): OfflineCopy {
  if (lang === 'zh') {
    return {
      title: '你已离线',
      body: '这项功能需要联网。课程、测验和挑战仍可正常使用，进度会保存在本设备上。',
      retry: '重新连接后重试',
    }
  }
  if (lang === 'es') {
    return {
      title: 'Estás sin conexión',
      body: 'Esta función necesita internet. Las lecciones, los exámenes y los desafíos siguen funcionando y tu progreso se guarda en este dispositivo.',
      retry: 'Reintentar al reconectar',
    }
  }
  return {
    title: "You're offline",
    body: 'This feature needs an internet connection. Lessons, quizzes, and challenges still work, and your progress is saved on this device.',
    retry: 'Try again once reconnected',
  }
}

/** For a live, multiplayer screen that genuinely cannot proceed offline. */
export function offlineLiveCopy(lang: Lang): OfflineCopy {
  if (lang === 'zh') {
    return {
      title: '你已离线',
      body: '实时游戏需要联网才能与同学保持同步。恢复网络后会自动重新连接。你也可以先去玩单人挑战。',
      retry: '重试',
    }
  }
  if (lang === 'es') {
    return {
      title: 'Estás sin conexión',
      body: 'Los juegos en vivo necesitan internet para mantenerte al día con tu clase. Te reconectaremos automáticamente. Mientras tanto, puedes jugar un desafío en solitario.',
      retry: 'Reintentar',
    }
  }
  return {
    title: "You're offline",
    body: 'Live games need a connection to stay in sync with your class. We will reconnect you automatically. In the meantime, you can play a solo challenge.',
    retry: 'Try again',
  }
}
