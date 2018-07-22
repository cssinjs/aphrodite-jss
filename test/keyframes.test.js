import {create} from 'jss'
import aphroditeJss from '../src'

test('keyframe styles are included in css unmodified', () => {
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

  expect(aphrodite.toString()).toMatchSnapshot()
});
