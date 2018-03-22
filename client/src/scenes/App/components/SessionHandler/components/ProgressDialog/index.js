// @flow
import React from 'react'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogContent, withMobileDialog } from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'

const styles = {
  content: {
    margin: '50px 100px 50px 100px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
}

type Props = {
  classes: {
    content: string,
    progress: string
  },
  fullScreen: boolean
}

export default withMobileDialog()(withStyles(styles)(
  (props: Props) => <Dialog fullScreen={props.fullScreen} open aria-label='Waiting for response'>
    <DialogContent className={props.classes.content}>
      <CircularProgress className={props.classes.progress} />
    </DialogContent>
  </Dialog>))
