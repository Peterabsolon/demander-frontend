import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import { Modal } from 'containers/misc'
import { Title } from 'components/misc'
import { Textarea } from 'components/fields'

import modals from 'constants/modals'

import validate from './request-service-form.validation'

@reduxForm({
  form: 'requestService',
  validate
})
export default class RequestServiceForm extends Component {
  static propTypes = {
    reset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  handleAfterClose = () => this.props.reset()

  render() {
    const { handleSubmit } = this.props

    return (
      <Modal
        id={modals.REQUEST_SERVICE}
        action="Odeslat"
        onClose={this.handleAfterClose}
        onSubmit={handleSubmit}
      >
        <Title noMargin h3>Poptat službu</Title>
        <Textarea name="message" />
      </Modal>
    )
  }
}
