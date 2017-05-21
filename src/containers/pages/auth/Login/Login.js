import React, { Component, PropTypes } from 'react'

import { LoginForm } from 'containers/forms/auth'

export default class Login extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return <LoginForm />
  }
}
