import React, { Component, PropTypes } from 'react'

import { Feed } from 'containers/common'
import { QuestionFeedItem } from 'components/sections/questions'

import { apiQuestions } from 'decorators/api'

@apiQuestions({
  list: true
})
export default class Questions extends Component {
  static propTypes = {
    children: PropTypes.any,
    questions: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    handleFetchMore: PropTypes.func.isRequired
  };

  render() {
    const { questions } = this.props

    return (
      <Feed
        handleFetchMore={this.props.handleFetchMore}
        instance="questions"
        Item={QuestionFeedItem}
        items={questions.list}
        loaded={questions.loaded}
        loading={questions.listLoading}
        setFilter={this.props.setFilter}
      >
        {this.props.children}
      </Feed>
    )
  }
}
