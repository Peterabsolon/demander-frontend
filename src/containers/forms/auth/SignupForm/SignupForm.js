import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Input } from 'components/fields'
import { FieldError } from 'components/fields/__elements__'
import { Form } from 'components/layout'
import { Button, Title } from 'components/misc'

import { apiAuth } from 'decorators/api'

import validate from './signup-form.validation'

@apiAuth()
@reduxForm({
  form: 'signup',
  validate
})
export default class SignupForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { auth } = this.props

    return (
      <Form
        gutters
        noBorder
        onSubmit={this.props.handleSubmit(auth.api.handleSignup)}
      >
        <Title h2>Registrace</Title>

        <div className="base-margin--double">
          <Input
            name="name"
            label="Jméno"
            placeholder="Jméno"
            onInputChange={auth.api.clearError}
          />

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

          <Input
            name="passwordConfirm"
            type="password"
            label="Potvrzení hesla"
            placeholder="Potvrzení hesla"
            onInputChange={auth.api.clearError}
          />

          <FieldError toShow={auth.state.error} message={auth.state.error} />
        </div>

        <Button
          center
          wide
          type="submit"
          label="Zaregistrovat"
          className="base-margin--top"
          isLoading={auth.state.isSigningUp}
        />

        <Button
          center
          wide
          centeredWithIcon
          className="base-margin--top"
          icon="keyboard_arrow_left"
          label="Přihlášení"
          noBackground
          to="/prihlaseni"
        />
      </Form>
    )
  }
}
