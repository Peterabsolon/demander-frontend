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
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Form, FormHeader } from 'components/layout'
import {
  SelectCompany,
  SelectSegment,
  Input,
  Textarea
} from 'components/fields'
import { Button } from 'components/misc'

import { form } from 'decorators'
import { apiAuth, apiDemands } from 'decorators/api'

import validate from './demand-detail-form.validation'

@apiAuth()
@apiDemands({
  detail: true
})
@connect((state, props) => ({
  initialValues: props.demands.state.detail
}))
@form({
  form: 'demands.new',
  validate
})
export default class DemandNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    demands: PropTypes.object,
    auth: PropTypes.object
  };

  render() {
    const { handleSubmit, demands, auth } = this.props

    const isAdmin = auth.state.isAdmin

    return (
      <Form
        gutters
        mediumWide
        onSubmit={handleSubmit(demands.api.handleEditEntity)}
      >
        <FormHeader number={1} label="Základní údaje" />
        {isAdmin && <SelectCompany label="Dodavatel" name="company_id" />}
        <Input label="Název" name="title" />
        <Textarea label="Cíl" name="goal" />
        <SelectSegment label="Segment" name="segment_id" />

        <FormHeader number={2} label="Vstup/výstup" />
        <Input label="Vstup" name="input" />
        <Input label="Výstup" name="output" />

        <FormHeader number={3} label="Podrobnosti" />
        <Input label="Časové rozmezí" name="timeplan" />
        <Input label="Rozpočet" name="budget" />
        <Textarea label="Detaily" name="description" />

        <Button
          type="submit"
          label="Upravit poptávku"
          center
          className="base-margin--top"
          isLoading={demands.state.submitting}
        />
      </Form>
    )
  }
}
