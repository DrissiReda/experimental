// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog'
import { InputAdornment } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    minWidth: '300px'
  },
  forgotPassword: {
    fontSize: '0.75rem',
    textAlign: 'right'
  },
  noAccount: {
    marginTop: '20px'
  }
}

type State = {
  showPassword: boolean
}

type Props = {
  classes: {
    root: string,
    forgotPassword: string,
    noAccount: string
  },
  open: boolean,
  fullScreen: boolean,
  email: string,
  password: string,
  handleClose: Function,
  handleConfirm: Function,
  handleEmailChange: Function,
  handlePasswordChange: Function
}

export default withMobileDialog()(withStyles(styles)(class extends Component<Props, State> {
  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  preventFocus = event => {
    event.preventDefault()
  }

  passwordAdornment = () => <InputAdornment position='end'>
    <IconButton aria-label='Toggle password visibility' onClick={this.togglePassword} onMouseDown={this.preventFocus}>
      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  </InputAdornment>

  constructor (props: Props) {
    super(props)
    this.state = {
      showPassword: false
    }
  }

  render () {
    return <Dialog fullScreen={this.props.fullScreen} className={this.props.classes.root} open={this.props.open}
      onClose={this.props.handleClose} aria-label='Sign in form'>
      <DialogTitle>Sign in</DialogTitle>
      <DialogContent>
        <TextField autoFocus onChange={this.props.handleEmailChange} value={this.props.email} margin='dense'
          label='Email address' type='email' fullWidth />
        <TextField onChange={this.props.handlePasswordChange} value={this.props.password} margin='dense'
          label='Password' type={this.state.showPassword ? 'text' : 'password'} fullWidth
          InputProps={{endAdornment: this.passwordAdornment()}} />
        <DialogContentText className={this.props.classes.forgotPassword}>
          Recover password (placeholder)
        </DialogContentText>
        <DialogContentText className={this.props.classes.noAccount}>
          Don't have an account? <Link to='/signup' onClick={this.props.handleClose}>Sign up</Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={this.props.handleConfirm} color='primary'>
          Sign in
        </Button>
      </DialogActions>
    </Dialog>
  }
}))
