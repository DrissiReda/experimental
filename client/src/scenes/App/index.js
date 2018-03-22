// @flow
import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CssBaseline from 'material-ui/CssBaseline'
import Header from './components/Header/index'
import SceneWrapper from './components/SceneWrapper/index'
import Home from './scenes/Home/index'
import Settings from './scenes/Settings/index'
import SignUp from './scenes/SignUp/index'
import Error from './scenes/404/index'
import SessionHandler from './components/SessionHandler/index'

// Page title & headerTitle should probably be managed using Redux, to allow child component to modify them?
const pageContent = {
  home: {
    scene: <Home />,
    pageTitle: 'AWS – Home',
    headerTitle: 'AWS – Home'
  },
  settings: {
    scene: <Settings />,
    pageTitle: 'AWS – Settings',
    headerTitle: 'AWS – Settings'
  },
  signUp: {
    scene: <SignUp />,
    pageTitle: 'AWS – Sign up',
    headerTitle: 'AWS – Sign up'
  },
  error: {
    scene: <Error />,
    pageTitle: 'Error 404 (not found)',
    headerTitle: 'AWS – 404'
  }
}

type Props = {
  content: typeof pageContent.home
}

const Page = (props: Props) => (<Fragment>
  <Helmet>
    <title>{props.content.pageTitle}</title>
  </Helmet>
  <Header title={props.content.headerTitle} />
  <SceneWrapper>
    {props.content.scene}
  </SceneWrapper>
</Fragment>)

export default () => (<Fragment>
  <CssBaseline />
  <SessionHandler />
  <Switch>
    <Route exact path='/' render={() => <Page content={pageContent.home} />} />
    <Route exact path='/settings' render={() => <Page content={pageContent.settings} />} />
    <Route exact path='/signup' render={() => <Page content={pageContent.signUp} />} />
    <Route exact path='/404' render={() => <Page content={pageContent.error} />} />
    <Redirect to='/404' />
  </Switch>
</Fragment>)
