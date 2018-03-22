// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = {
  list: {
    width: 250
  }
}

type Props = {
  classes: {
    list: string
  },
  open: boolean,
  handleClose: Function,
  toggleSignIn: Function
}

export default withStyles(styles)(
  (props: Props) => (<Drawer open={props.open} onClose={props.handleClose}>
    <List className={props.classes.list}>
      <ListItem component={Link} to='/' button onClick={props.handleClose}>
        <ListItemText primary='Home' />
      </ListItem>
      <ListItem component={Link} to='/settings' button onClick={props.handleClose} divider>
        <ListItemText primary='Settings' />
      </ListItem>
      <ListItem button onClick={() => {
        props.toggleSignIn()
        props.handleClose()
      }}>
        <ListItemText primary='Sign In' />
      </ListItem>
      <ListItem component={Link} to='/signup' button onClick={props.handleClose}>
        <ListItemText primary='Sign up' />
      </ListItem>
    </List>
  </Drawer>)
)
