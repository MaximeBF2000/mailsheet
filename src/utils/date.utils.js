const DAYS = {
  en: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ],
  fr: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
}

export const getDayOfWeek = (lang = 'en') =>
  DAYS[lang]
    ? DAYS[lang][new Date().getDay() - 1]
    : DAYS['en'][new Date().getDay() - 1]

export const getDate = (lang = 'en') => {
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = now.getMonth().toString().padStart(2, '0')
  const day = now.getUTCDate().toString().padStart(2, '0')

  const FORMAT_BY_LANG = {
    en: `${year}/${month}/${day}`,
    fr: `${day}/${month}/${year}`
  }

  return FORMAT_BY_LANG[lang] ? FORMAT_BY_LANG[lang] : FORMAT_BY_LANG['en']
}
