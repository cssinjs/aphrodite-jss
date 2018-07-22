import {assert} from 'chai'
import {create} from 'jss'
import aphroditeJss from '../src'

describe('aphrodite-jss', function() {

  describe('keyframes', () => {

    it('generates css for keyframe', () => {
      let aphrodite = aphroditeJss(create())
      let styles = aphrodite.StyleSheet.create({
        '@keyframes anim1': {
          '0%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        }
      })

      let rendered = aphrodite.toString()
      assert.include(rendered, '@keyframes anim1 {')
      assert.include(rendered, '0% {')
      assert.include(rendered, 'transform: scale(0);')
      assert.include(rendered, '100% {')
      assert.include(rendered, 'transform: scale(1);')
    })

  })

})