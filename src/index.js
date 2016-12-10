import {create} from 'jss'
import preset from 'jss-preset-default'
import hash from 'murmurhash-js/murmurhash3_gc'

const meta = 'aphrodisiac'
const isNotFalsy = val => val != null
const getClassName = rule => rule.className
const generateClassName = (name, str) => `${name}-${hash(name + str + meta)}`
const mergeStyles = (style, rule) => ({...style, ...rule.style})

export default function aphrodisiac(jss, options) {
  const renderSheet = () => (
    jss.createStyleSheet(null, {meta, ...options}).attach()
  )

  let sheet = renderSheet()

  function css(...rules) {
    // Filter falsy values to allow `css(a, test && c)`.
    rules = rules.filter(isNotFalsy)

    if (!rules.length) return ''

    // A joined class name from all rules.
    const className = rules.map(getClassName).join('--')

    if (sheet.getRule(className)) return className

    const style = rules.reduce(mergeStyles, {})
    sheet.addRule(className, style, {className})

    return className
  }

  function register(styles) {
    return Object.keys(styles).reduce((map, name) => {
      map[name] = {
        className: generateClassName(name, JSON.stringify(styles[name])),
        style: styles[name]
      }
      return map
    }, {})
  }

  function reset() {
    sheet.detach()
    jss.sheets.remove(sheet)
    sheet = renderSheet()
  }

  return {
    StyleSheet: {create: register},
    toString: () => sheet.toString(),
    css,
    reset,
    version: __VERSION__
  }
}

export const {css, StyleSheet, reset, toString, version} = aphrodisiac(create(preset()))
