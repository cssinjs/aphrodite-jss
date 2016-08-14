import {create} from 'jss'
import preset from 'jss-preset-default'

export default function aphrodisiac(jss, options) {
  const sheet = jss
    .createStyleSheet(null, {meta: 'aphrodite-jss', ...options})
    .attach()

  const isNotEmpty = val => val != null

  const getClassName = rule => rule.className

  function css(...rules) {
    // Filter out falsy values from the input, to allow for
    // `css(a, test && c)`
    rules = rules.filter(isNotEmpty)

    if (!rules.length) return ''

    // A compound class name from all rules.
    const className = rules.map(getClassName).join('--')

    if (sheet.getRule(className)) return className

    const style = rules.reduce((res, rule) => Object.assign(res, rule.style), {})

    // TODO make jss accept options here.
    sheet.addRule(className, style, {className})

    return className
  }

  function register(styles) {
    return Object.keys(styles).reduce((rulesMap, name) => {
      const style = styles[name]
      rulesMap[name] = {
        className: jss.generateClassName(JSON.stringify(style), {name}),
        style
      }
      return rulesMap
    }, {})
  }

  return {
    css,
    StyleSheet: {create: register}
  }
}

export const {css, StyleSheet} = aphrodisiac(create(preset()))
