// @flow
import { CLOSE_SIGN_IN, OPEN_SIGN_IN, TOGGLE_SIGN_IN } from './constants'

export const toggleSignIn = (toggle: ?boolean): Object => {
  switch (toggle) {
    case true:
      return {type: OPEN_SIGN_IN}
    case false:
      return {type: CLOSE_SIGN_IN}
    default:
      return {type: TOGGLE_SIGN_IN}
  }
}
