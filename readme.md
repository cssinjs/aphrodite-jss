# Aphrodite-like API on top of JSS.

This project is a merge of good ideas from [aphrodite](https://github.com/Khan/aphrodite) and [JSS](https://github.com/cssinjs/jss). It provides an API of aphrodite but fixes lots of limitations and caveats by using JSS as a rendering engine under the hood.

## Good parts from aphrodite.

- Pretty much like inline styles known from React, except it allows to use the entire CSS.
- No CSS is generated until `css()` function invocation. Only the passed rules are converted to a CSS string and injected.
- Theming is possible without any headache or framework integrations.

## Benefits compared to aphrodite.

- More powerfull rendering abstraction through [JSS](https://github.com/cssinjs/jss) under the hood. You are using all it's plugins and [JSON DSL](https://github.com/cssinjs/jss/blob/master/docs/json-api.md). To name a few:
  - Children, siblings and any other kinds of selectors. ([jss-nested](https://github.com/cssinjs/jss-nested))
  - Global styles, without auto namespacing ([jss-global](https://github.com/cssinjs/jss-global)).
- Immediate render upon `css()` call invocation. It gives you an access to computed styles right after render, no need to use `setTimeout()`. It also avoids additional recalcs and repaints, which can cause flickers and general performance overhead.
- No auto "!important" insertion. You can write a plugin for this though.


## Example

```javascript
import {StyleSheet, css} from 'aphrodite-jss'

const sheet = StyleSheet.create({
  button: {
    border: '1px solid',
    borderRadius: 5,
    fontSize: 'inherit',
    lineHeight: '2.3em',
    padding: '0 1em',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
    backgroundRepeat: 'repeat-x',
    color: '#fff',
    fontWeight: 400,
    '& span': {
      marginRight: 5,
      color: '#fff'
    }
  },
  primary: {
    borderColor: '#1177cd #0f6ab6 #0d5c9e',
    backgroundImage: 'linear-gradient(to bottom, #2591ed 0%, #1177cd 100%)',
    backgroundColor: '#1385e5',
    '&:hover': {
      backgroundImage: 'linear-gradient(to bottom, #3c9def 0%, #1385e5 100%)'
    }
  }
})

document.body.innerHTML = `
  <button class="${css(sheet.button, sheet.primary)}">
    <span>&#10004;</span>Primary
  </button>
`
```

## API

### Create style sheet.

`StyleSheet.create(styles)`

Create function doesn't render anything, it just registers your styles.

Returns an object, where key names correspond the original styles obejct.

### Inject rules.

`css(rule1, [rule2], [rule3], ...)`

Injects a previously defined rule to the dom. This is done in sync, so the CSS rule is immediately available.

Returns a class name.

### Styles format.

The format for styles is defined in [jss](https://github.com/cssinjs/jss/blob/master/docs/json-api.md). Aprodisiac uses [jss-preset-default](https://github.com/cssinjs/jss-preset-default), so all default presets are already in place.

### Customizing JSS.

`aphroditeJss(jss, [options])`

You can pass your own JSS instance with your custom setup.

Returns aphrodite's interface.

```javascript
import aphroditeJss from 'aphrodite-jss'
import {create} from 'jss'

const {css, StyleSheet} = aphroditeJss(create())
```

### Serverside Rendering.

There are 2 functions you need to know - `toString()` and `reset()`.
As aphrodite-jss can not know that you are rendering a new response, you need to get the CSS (`toString()`) when you are processing the first request and call `reset()` to clean up the styles your current page has produced.


```javascript
import {toString, reset} from 'aphrodite-jss'

function render() {
  const app = renderApp()
  const css = toString()
  reset()

  return `
    <head>
      <style>
        ${css}
      </style>
    <head>
    <body>
      ${app}
    </body>
  `
}
```

## License

MIT
