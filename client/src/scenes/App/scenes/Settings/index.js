// @flow
import React from 'react'
import { withStyles } from 'material-ui/styles/index'

const styles = {
  root: {}
}

type Props = {
  classes: {
    root: string
  }
}

export default withStyles(styles)(
  (props: Props) => (<div className={props.classes.root}>
    User settings will be displayed here
  </div>)
)
