// @flow
import { CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER } from './constants'

export const toggleDrawer = (toggle: ?boolean): Object => {
  switch (toggle) {
    case true:
      return {type: OPEN_DRAWER}
    case false:
      return {type: CLOSE_DRAWER}
    default:
      return {type: TOGGLE_DRAWER}
  }
}
