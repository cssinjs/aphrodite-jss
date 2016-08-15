## Aphrodite like API on top of JSS.

This project is a merge of good ideas from [aphrodite](https://github.com/Khan/aphrodite) and [JSS](https://github.com/cssinjs/jss). It provides an API of aphrodite but fixes lots of limitations and caveats by using JSS as a rendering engine under the hood.

## Reimplemented good parts.

- Pretty much like inline styles known from React, except it allows to use all of CSS.
- No CSS is generated until `css()` invocation. Only the passed rules are converted to a CSS string and injected.
- Theming is possible without any headache or framework integrations.

## Benefits compared to aphrodite.

- More powerfull rendering abstraction [JSS](https://github.com/cssinjs/jss) under the hood. You are using all it's plugins and [JSON DSL](https://github.com/cssinjs/jss/blob/master/docs/json-api.md). To name a few:
  - Supports children, siblings and any other kinds of selectors. ([jss-nested](https://github.com/cssinjs/jss-nested))
  - Support for global styles, without auto namespacing. (option `{named: false}`)
- Immediate render upon `css()` call invocation. It gives you an access to computed styles right after render, no need to use `setTimeout()`. It also avoids additional recalcs and repaints, which can cause flickers and general performance overhead.
- No auto "!important" insertion. You can write a plugin for this though.


## Example

```javascript
import {StyleSheet, css} from 'aphrodisiac'

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

### Inject rules.

`css(rule1, [rule2], [rule3], ...)`

Injects the previousely defined rule to the dom. This is done in sync, so the CSS rule is immediately available.

It returns a class name string.

### Styles format.

The format for styles in defined in [jss](https://github.com/cssinjs/jss/blob/master/docs/json-api.md). Aprodisiac uses [jss-preset-default](https://github.com/cssinjs/jss-preset-default), so all default presets are already in place.

### Customizing JSS.

`aphrodisiac(jss, [options])`

You can pass your own JSS instance with your plugins setup. It will return the aphrodite's interface.

```javascript
import aphrodisiac from 'aphrodisiac'
import {create} from 'jss'

const {css, StyleSheet} = aphrodisiac(create())
```

## Todo

- @media
- @keyframes

## License

MIT
