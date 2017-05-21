import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import {
  DatePicker,
  SelectTags,
  SelectCity,
  Input,
  Textarea
} from 'components/fields'
import { Form } from 'components/layout'

import { form } from 'decorators'
import { apiQuestions } from 'decorators/api'

import validate from './question-detail-form.validation'

const FORM_NAME = 'questionEdit'

@apiQuestions({
  detail: true
})
@form({
  form: FORM_NAME,
  initialProps: 'questions.detail',
  validate
})
export default class QuestionDetailForm extends Component {
  static propTypes = {
    handleUpdateQuestion: PropTypes.func.isRequired,
    handleGetQuestionExcelFile: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired
  };

  render() {
    const { handleSubmit, handleUpdateQuestion } = this.props
    const loading = get(this.props.questions, 'detailLoading')

    return (
      <Form onSubmit={handleSubmit(handleUpdateQuestion)} loading={loading}>
        <Textarea
          disableLineBreaks
          label="Text (nadpis)"
          name="title"
          titleStyle
        />

        <Textarea
          descriptionStyle
          disableLineBreaks
          label="Popis"
          name="text"
        />

        <hr />

        <Input label="Autor" name="author" />

        <DatePicker
          label="Koniec hlasovania"
          placeholder="Dátum"
          name="availableTo"
        />

        <SelectCity label="Región" name="cities" />

        <hr />

        <Textarea label="Meníme Slovensko" name="effect" />

        <Textarea label="Doplňujúci popis" name="effectNote" />

        <SelectTags label="Tagy" name="tags" className="base-margin--bottom" />

        <Button block type="submit" label="Upraviť" />

        <Button
          success
          block
          onClick={this.props.handleGetQuestionExcelFile}
          label="Stiahnuť Excel"
        />
      </Form>
    )
  }
}
