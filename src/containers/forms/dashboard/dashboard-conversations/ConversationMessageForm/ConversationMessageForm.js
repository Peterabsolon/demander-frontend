import React, { Component } from 'react'
import { form } from 'decorators'
import PropTypes from 'prop-types'

import { Textarea } from 'components/fields'

import style from './converastion-message-form.styl'

@form({
  form: 'conversationMessage'
})
export default class ConversationMessageForm extends Component {
  static propTypes = {
    values: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  handleKeyPress = event => {
    if (event.which === 13 && !event.shiftKey) {
      event.preventDefault()

      const { values: { message } } = this.props

      this.props.onSubmit({ message })

      this.props.reset()
    }
  };

  render() {
    return (
      <div className={style.wrapper}>
        <Textarea
          transparent
          noMargin
          name="message"
          onKeyPress={this.handleKeyPress}
          placeholder="Vaše zpráva..."
        />
      </div>
    )
  }
}
