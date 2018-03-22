// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import WebFont from 'webfontloader'
import registerServiceWorker from './services/registerServiceWorker'
import App from './scenes/App/index'
import * as reducers from './scenes/App/services/reducers'
import axios from 'axios'

axios.defaults.baseURL = 'https://aws-twitter.herokuapp.com/api'
axios.defaults.timeout = 5000

const store = createStore(combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

WebFont.load({
  google: {
    families: ['Roboto:300,400,500']
  }
})

// $FlowFixMe: document.getElementById('root') should never return null
ReactDOM.render((<Provider store={store}><Router><App /></Router></Provider>), document.getElementById('root'))
registerServiceWorker()
