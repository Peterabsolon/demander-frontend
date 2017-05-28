/**
 * Backend model
 *
 * title
 * goal
 * input
 * output
 * timeplan
 * budget
 * description
 * responsible_person
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, FormHeader } from 'components/layout'
import { SelectCategory, Input, Textarea } from 'components/fields'
import { Button } from 'components/misc'

import { form } from 'decorators'
import { apiDemands } from 'decorators/api'

import validate from './demand-new-form.validation'

@apiDemands()
@form({
  form: 'demands.new',
  validate
})
export default class DemandNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    demands: PropTypes.object
  };

  render() {
    const { handleSubmit, demands } = this.props

    return (
      <Form
        gutters
        mediumWide
        onSubmit={handleSubmit(demands.api.handleCreateEntity)}
      >
        <FormHeader number={1} label="Základní údaje" />
        <Input label="Název" name="title" />
        <Textarea label="Cíl" name="goal" />
        <SelectCategory label="Kategorie" name="category_id" />

        <FormHeader number={2} label="Vstup/výstup" />
        <Input label="Vstup" name="input" />
        <Input label="Výstup" name="output" />

        <FormHeader number={3} label="Podrobnosti" />
        <Input label="Časové rozmezí" name="timeplan" />
        <Input label="Rozpočet" name="budget" />
        <Textarea label="Detaily" name="description" />

        <Button
          type="submit"
          label="Vytvořit poptávku"
          center
          className="base-margin--top"
          isLoading={demands.state.submitting}
        />
      </Form>
    )
  }
}
