export function getDictonary(locale) {
  return require(`react-intl/locale-data/${getDictonaryName(locale)}`)
}

export function getDictonaryName(locale) {
  if (!locale) {
    return 'en'
  }

  let dictonaryToLoad = locale

  if (locale.includes('_')) {
    dictonaryToLoad = locale.split('_')[0]
  }

  if (locale.includes('-')) {
    dictonaryToLoad = locale.split('-')[0]
  }

  return dictonaryToLoad
}

export function toDash(locale) {
  if (!locale) {
    return
  }

  let dictonaryToLoad = locale

  if (locale.includes('_')) {
    dictonaryToLoad = locale.replace('_', '-')
  }

  return dictonaryToLoad
}
