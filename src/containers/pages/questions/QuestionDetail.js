import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { QuestionDetailForm } from 'containers/forms/questions'

import { apiQuestions } from 'decorators/api'

@apiQuestions({
  detail: true,
  list: true
})
export default class Question extends Component {
  static propTypes = {
    questions: PropTypes.object.isRequired
  };

  render() {
    return <QuestionDetailForm />
  }
}
