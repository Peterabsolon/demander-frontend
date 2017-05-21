import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Input,
  Textarea,
  // WysiwygEditor,
  DatePicker,
  SelectCity,
  SelectTags
} from 'components/fields'
import { Button, LineDivider } from 'components/misc'
import { Form } from 'components/layout'

import { form } from 'decorators'
import { apiQuestions } from 'decorators/api'

import validate from './question-new-form.validation'

const LABEL_WIDTH = '150px'
const FORM_NAME = 'questionNew'

@apiQuestions()
@connect(() => ({
  initialValues: {
    author: 'Admin'
  }
}))
@form({
  form: FORM_NAME,
  validate
})
export default class QuestionNewForm extends Component {
  static propTypes = {
    questions: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCreateQuestion: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, handleCreateQuestion, questions } = this.props

    const { submitting } = questions

    return (
      <Form wide onSubmit={handleSubmit(handleCreateQuestion)}>
        <Textarea
          disableLineBreaks
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Text (nadpis)"
          name="title"
          required
          titleStyle
        />

        <Textarea
          disableLineBreaks
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Popis"
          name="text"
          required
          descriptionStyle
        />

        {/* TODO: Link highlight */}
        {/* <WysiwygEditor
          disableLineBreaks
          formName={FORM_NAME}
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Popis"
          name="text"
        /> */}

        <LineDivider />

        <Input
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Autor"
          name="author"
          required
        />

        <DatePicker
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Koniec hlasovania"
          placeholder="Dátum"
          name="availableTo"
          required
        />

        <SelectCity
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Región"
          name="cities"
        />

        <LineDivider />

        <Textarea
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Meníme Slovensko"
          name="effect"
        />

        <Textarea
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Doplňujúci popis"
          name="effectNote"
        />

        <SelectTags
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Tagy"
          name="tags"
        />

        <Button
          isLoading={submitting}
          label="Vytvoriť otázku"
          offsetLeft={LABEL_WIDTH}
          type="submit"
        />
      </Form>
    )
  }
}
