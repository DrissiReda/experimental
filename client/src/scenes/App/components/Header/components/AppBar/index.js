// @flow
import React from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import MenuIcon from 'material-ui-icons/Menu'
import CodeIcon from 'material-ui-icons/Code'
import Tooltip from 'material-ui//Tooltip'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

type Props = {
  classes: {
    root: string,
    flex: string,
    menuButton: string
  },
  toggleDrawer: Function,
  title: string
}

export default withStyles(styles)(
  (props: Props) => (<AppBar className={props.classes.root}>
    <Toolbar>
      <IconButton className={props.classes.menuButton} aria-label='Menu' color='inherit' onClick={props.toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography variant='title' className={props.classes.flex} color='inherit'>
        {props.title}
      </Typography>
      <Tooltip title='View source code'>
        <IconButton aria-label='Source code' component='a' color='inherit' href='https://github.com/shisty/aws-app'>
          <CodeIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>)
)
