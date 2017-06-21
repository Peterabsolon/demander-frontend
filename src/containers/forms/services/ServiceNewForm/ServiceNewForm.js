/**
 * Backend model
 *
 * title
 * location
 * description
 * category_id
 * company_id
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'components/layout'
import {
  SelectCompany,
  SelectCategory,
  Input,
  Textarea,
} from 'components/fields'
import { Button } from 'components/misc'

import { form } from 'decorators'
import { apiAuth, apiServices } from 'decorators/api'

import validate from './service-new-form.validation'

@apiAuth()
@apiServices()
@form({
  form: 'services.new',
  validate,
})
export default class ServiceNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    auth: PropTypes.object,
    services: PropTypes.object,
  }

  render() {
    const { auth, handleSubmit, services } = this.props

    const isAdmin = auth.state.isAdmin

    return (
      <Form
        gutters
        mediumWide
        onSubmit={handleSubmit(services.api.handleCreateEntity)}
      >
        {isAdmin &&
          <SelectCompany
            label="Vyberte firmu, ktrerá službu poskytuje"
            placeholder="Firma"
            name="company_id"
          />}
        <Input label="Název služby" name="title" />
        <Textarea label="Popis služby" name="description" />
        <Input label="Lokalita poskytování služby" name="location" />
        <SelectCategory
          label="Kategorizace"
          placeholder="Výběr odvětví kategorie"
          name="category_id"
        />

        <Button
          type="submit"
          label="Přidat službu"
          center
          className="base-margin--top"
          isLoading={services.state.submitting}
        />
      </Form>
    )
  }
}
