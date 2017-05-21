import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'

export default class QuestionDetail extends Component {
  static propTypes = {
    handleToggleEdit: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        QuestionDetail

        <Button block label="Upraviť" onClick={this.props.handleToggleEdit} />
      </div>
    )
  }
}
