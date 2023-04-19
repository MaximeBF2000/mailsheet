import { getDate, getDayOfWeek } from './date.utils'

const VARIABLE_NOTATIONS = {
  DOUBLE_BRACKET_VARIABLE_NOTATION: {
    title: '{{ variable }}',
    re: /\{\{.*?\}\}/g
  },
  SINGLE_BRACKET_VARIABLE_NOTATION: {
    title: '{ variable }',
    re: /\{.*?\}/g
  },
  DOUBLE_CROCHET_VARIABLE_NOTATION: {
    title: '[[ variable ]]',
    re: /\[\[.*?\]\]/g
  },
  SINGLE_CROCHET_VARIABLE_NOTATION: {
    title: '[ variable ]',
    re: /\[.*?\]/g
  }
}

export const CHOOSEN_VARIABLE_NOTATION =
  VARIABLE_NOTATIONS.DOUBLE_BRACKET_VARIABLE_NOTATION

const createTemplater = (template, data, re) => {
  let newTemplate = template

  while (newTemplate.match(re)?.length > 0) {
    const exec = re.exec(newTemplate)[0]
    const value = data[sanitizeTemplateVar(exec)]
      ? data[sanitizeTemplateVar(exec)]
      : executeJavascript(sanitizeTemplateVar(exec), data)
    newTemplate = newTemplate.replaceAll(exec, value)
  }

  return newTemplate
}

export const templater = (template, data) =>
  createTemplater(template, data, CHOOSEN_VARIABLE_NOTATION.re)

function sanitizeTemplateVar(str) {
  return str.replaceAll('{', '').replaceAll('}', '').trim()
}

function executeJavascript(code, data) {
  const arrowParamsKeys =
    Object.keys(data).length > 0 ? `(${Object.keys(data).join(', ')})` : '()'
  const arrowParamsValues =
    Object.values(data).length > 0
      ? `(${Object.values(data)
          .map(el => (typeof el === 'string' ? `"${el}"` : el))
          .join(', ')})`
      : '()'

  // List here every utils that should be available in templates
  function cap(strs) {
    return strs
      .split(' ')
      .map((s, i) => (i === 0 ? s[0].toUpperCase() + s.slice(1) : s))
      .join(' ')
  }
  const TODAY = getDayOfWeek('fr')
  const DATE = getDate('fr')

  // Execute javascript code from template
  try {
    const res = eval(`(${arrowParamsKeys} => (${code}))${arrowParamsValues}`)
    return res
  } catch {
    return ''
  }
}
