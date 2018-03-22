// @flow
import { combineReducers } from 'redux'
import * as headerReducers from '../components/Header/services/reducers'
import * as sessionHandlerReducers from '../components/SessionHandler/services/reducers'

export const header = combineReducers(headerReducers)
export const sessionHandler = combineReducers(sessionHandlerReducers)
