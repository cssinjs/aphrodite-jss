import {create} from 'jss'
import preset from 'jss-preset-default'

const isNotFalsy = val => val != null
const getClassName = rule => rule.className

export default function aphrodisiac(jss, options) {
  const sheet = jss.createStyleSheet(null, {meta: 'aphrodite-jss', ...options}).attach()

  function css(...rules) {
    // Filter out falsy values from the input, to allow for
    // `css(a, test && c)`
    rules = rules.filter(isNotFalsy)

    if (!rules.length) return ''

    // A compound class name from all rules.
    const className = rules.map(getClassName).join('--')

    if (!sheet.getRule(className)) {
      const style = rules.reduce((res, rule) => ({...res, ...rule.style}), {})
      sheet.addRule(className, style, {className})
    }

    return className
  }

  function register(styles) {
    return Object.keys(styles).reduce((map, name) => {
      map[name] = {
        className: jss.generateClassName(JSON.stringify(styles[name]), {name}),
        style: styles[name]
      }
      return map
    }, {})
  }

  return {
    css,
    StyleSheet: {create: register}
  }
}

export const {css, StyleSheet} = aphrodisiac(create(preset()))
