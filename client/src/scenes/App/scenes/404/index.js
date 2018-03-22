// @flow
import React, { Fragment } from 'react'
import { withStyles } from 'material-ui/styles/index'
import Typography from 'material-ui/Typography'

const styles = {
  bold: {
    fontWeight: 'bold'
  }
}

type Props = {
  classes: {
    bold: string
  }
}

export default withStyles(styles)(
  (props: Props) => (<Fragment>
    <Typography variant='display4' gutterBottom>
      404
    </Typography>
    <Typography variant='headline' gutterBottom>
      <span className={props.classes.bold}>Oops! </span>The requested URL was not found
    </Typography>
  </Fragment>)
)
