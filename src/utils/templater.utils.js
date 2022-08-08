export const templater = (template, data) => {
  const re = /\{\{.*?\}\}/g
  let newTemplate = template

  while (newTemplate.match(re)?.length > 0) {
    const exec = re.exec(newTemplate)[0]
    const value = data[sanitizeTemplateVar(exec)]
    newTemplate = newTemplate.replaceAll(exec, value)
    console.log({ exec, value, newTemplate })
  }

  return newTemplate
}

function sanitizeTemplateVar(str) {
  return str.replaceAll('{', '').replaceAll('}', '').trim()
}
