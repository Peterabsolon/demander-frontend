import React, { Component } from 'react'
import { get } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { PAGE_SIZE } from 'constants/misc'
import PropTypes from 'prop-types'

import { schema } from 'models/questions'

import * as questionsApi from 'redux/modules/api/questions'
import * as appActions from 'redux/modules/app'

const decorator = (config = {}) =>
  ComposedComponent => {
    @connect(
      ({ api }) => ({
        questions: api.questions
      }),
      { ...questionsApi, ...appActions }
    )
    class Questions extends Component {
      static propTypes = {
        questions: PropTypes.object.isRequired,
        params: PropTypes.object,
        setParams: PropTypes.func.isRequired,
        notification: PropTypes.func.isRequired,
        createQuestion: PropTypes.func.isRequired,
        getQuestions: PropTypes.func.isRequired,
        getQuestion: PropTypes.func.isRequired
      };

      componentWillMount() {
        const { questions, params } = this.props

        config.list && !questions.loaded && this.props.getQuestions(questions)
        config.detail && get(params, 'id') && this.handleGetQuestion(params.id)
      }

      componentWillReceiveProps(nextProps) {
        this.handleLoadQuestions(nextProps)
        this.handleLoadQuestion(nextProps)
      }

      /**
       * Fetch list on filters/pagination change
       */
      handleLoadQuestions = nextProps => {
        const { questions } = this.props
        const { filter, offset, limit, sort } = nextProps.questions

        if (questions.limit !== limit) {
          config.list &&
            this.props.getQuestions(nextProps.questions, {
              noLoading: true
            })
        } else if (
          questions.filter !== filter ||
          questions.offset !== offset ||
          questions.sort !== sort
        ) {
          config.list && this.props.getQuestions(nextProps.questions)
        }
      };

      /**
       * Fetch detail on route change
       */
      handleLoadQuestion = nextProps => {
        const currentId = get(this.props, 'params.id')
        const nextId = get(nextProps, 'params.id')

        if (config.detail && nextId && currentId !== nextId) {
          this.props.getQuestion(nextId)
        }
      };

      handleGetQuestion = id => this.props.getQuestion(id);

      /**
       * Submit a new question
       */
      handleCreateQuestion = async model => {
        const { questions } = this.props
        const data = schema(model)

        const question = await this.props.createQuestion(data)

        await this.props.getQuestions(questions)
        const newId = question.body.id

        this.props.notification('Otázka úspešne vytvorená.', 'success')

        // TODO: Form leave hook gets triggered without this for some reason...
        setTimeout(() => browserHistory.push(`/otazky/${newId}`), 0)
      };

      /**
       * Update a question
       */
      handleUpdateQuestion = async model => {
        const { questions } = this.props
        const questionId = questions.detail.id
        const data = schema(model)

        await this.props.updateQuestion(questionId, data)
        await this.props.getQuestions(questions, { noLoading: true })

        this.props.notification('Otázka úspešne upravená.', 'success')
      };

      /**
       * Fetch more items for the infinite scroll feed
       */
      handleFetchMore = () => {
        const { questions } = this.props
        const { limit, count } = questions

        const hasMore = Math.abs(limit + PAGE_SIZE) <= PAGE_SIZE + count

        hasMore && this.props.setParams({ limit: limit + PAGE_SIZE })
      };

      handleGetQuestionExcelFile = () => {
        this.props.notification('Backend not ready yet', 'error')
      };

      render() {
        return (
          <ComposedComponent
            {...this.props}
            handleCreateQuestion={this.handleCreateQuestion}
            handleUpdateQuestion={this.handleUpdateQuestion}
            handleFetchMore={this.handleFetchMore}
            handleGetQuestionExcelFile={this.handleGetQuestionExcelFile}
          />
        )
      }
    }

    return Questions
  }

export default decorator
