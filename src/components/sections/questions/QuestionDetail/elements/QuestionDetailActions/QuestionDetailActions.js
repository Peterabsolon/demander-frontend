import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'

export default class QuestionActions extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div>
        <Button block label="Upraviť" />
      </div>
    )
  }
}
