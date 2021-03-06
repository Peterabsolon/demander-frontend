import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Input } from 'components/fields'
import { FieldError } from 'components/fields/__elements__'
import { Form } from 'components/layout'
import { Button, Title } from 'components/misc'

import { apiAuth } from 'decorators/api'

import validate from './login-form.validation'

@apiAuth()
@reduxForm({
  form: 'login',
  validate
})
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      state: PropTypes.shape({
        loginError: PropTypes.string
      }),
      api: PropTypes.shape({
        clearError: PropTypes.func.isRequired
      })
    }).isRequired
  };

  render() {
    const { auth } = this.props

    return (
      <Form
        gutters
        noBorder
        onSubmit={this.props.handleSubmit(auth.api.handleLogin)}
      >
        <Title h2>Přihlášení</Title>

        <div className="base-margin--double">
          <Input
            name="email"
            label="Email"
            placeholder="Email"
            onInputChange={auth.api.clearError}
          />

          <Input
            name="password"
            type="password"
            label="Heslo"
            placeholder="Heslo"
            onInputChange={auth.api.clearError}
          />

          <FieldError toShow={auth.state.error} message={auth.state.error} />
        </div>

        <Button
          center
          wide
          type="submit"
          label="Přihlásit"
          className="base-margin--top"
          isLoading={auth.api.isLoggingIn}
        />

        <Button
          center
          wide
          noBackground
          iconRight="keyboard_arrow_right"
          centeredWithIcon
          type="submit"
          label="Registrace"
          className="base-margin--top"
          to="/registrace"
        />
      </Form>
    )
  }
}
