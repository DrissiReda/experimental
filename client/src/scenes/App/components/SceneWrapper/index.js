// @flow
import type { Node } from 'react'
import React from 'react'
import { withStyles } from 'material-ui/styles/index'

const styles = {
  wrapper: {
    marginTop: '150px',
    marginBottom: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '93%',
    maxWidth: '700px',
    minWidth: '350px'
  }
}

type Props = {
  classes: {
    wrapper: string
  },
  children?: Node
}

export default withStyles(styles)(
  (props: Props) => (<div className={props.classes.wrapper}>
    {props.children}
  </div>)
)
