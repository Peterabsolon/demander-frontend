import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { Input } from 'components/fields'
import { FieldError } from 'components/fields/__elements__'
import { Form } from 'components/layout'
import { Button } from 'components/misc'

import { login, saveUser, clearLoginError } from 'redux/modules/auth'

import validate from './login-form.validation'

// always use _.get() when pulling data from the store to prevent crash
@connect(
  ({ auth }) => ({
    loginError: get(auth, 'loginError'),
    isLoggingIn: get(auth, 'isLoggingIn')
  }),
  { login, saveUser, clearLoginError }
)
@reduxForm({
  form: 'login',
  validate
})
export default class LoginForm extends Component {
  static propTypes = {
    clearLoginError: PropTypes.func.isRequired,
    // handleSubmit is provided from redux-form
    handleSubmit: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool,
    login: PropTypes.func.isRequired,
    loginError: PropTypes.string,
    saveUser: PropTypes.func.isRequired
  };

  handleSubmit = values =>
    this.props
      .login(values) // call the API
      .then(user => this.props.saveUser(user)) // save user to node session
      .then(() => browserHistory.push('/otazky'));

  handleClearError = () => this.props.clearLoginError();

  render() {
    const { loginError, isLoggingIn } = this.props

    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="base-margin--double">
          <Input
            name="email"
            label="Email"
            placeholder="Email"
            onInputChange={this.handleClearError}
          />

          <Input
            name="password"
            type="password"
            label="Heslo"
            placeholder="Heslo"
            onInputChange={this.handleClearError}
          />

          <FieldError toShow={loginError} message={loginError} />
        </div>

        <Button
          center
          wide
          type="submit"
          label="Prihlásiť"
          className="base-margin--top"
          isLoading={isLoggingIn}
        />
      </Form>
    )
  }
}
