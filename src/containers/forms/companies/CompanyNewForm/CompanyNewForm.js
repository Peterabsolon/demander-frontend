/**
 * Backend model
 *
 * company_about
 * company_address
 * company_description
 * company_gps_location
 * company_id
 * company_name
 * company_nice_name
 * company_opening_hours
 * company_vat_id
 * contact_email
 * contact_person
 * contact_telephone
 * fb_url
 * linkedin_url
 * logo_url
 * slogan
 * twitter_url
 * web_url
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, FormHeader, InputGroup, Section } from 'components/layout'
import { SelectCategory, Input, Textarea } from 'components/fields'
import { Button } from 'components/misc'

import { form } from 'decorators'
import { apiCompanies } from 'decorators/api'

import validate from './company-new-form.validation'

@apiCompanies()
@form({
  form: 'companies.new',
  validate
})
export default class CompanyNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    companies: PropTypes.object
  };

  render() {
    const { handleSubmit, companies } = this.props

    return (
      <Form
        onSubmit={handleSubmit(companies.api.handleCreateEntity)}
        wide
        gutters
      >
        <FormHeader number={1} label="Profil společnosti" />
        <InputGroup>
          <Input label="Název" name="company_name" />
          <SelectCategory label="Kategorie" name="category_id" />
        </InputGroup>
        <InputGroup>
          <Input label="Webstránka" name="web_url" />
          <Input label="Logo URL" name="logo_url" />
        </InputGroup>
        <Input label="Slogan" name="slogan" />
        <Textarea label="Popis společnosti" name="company_description" />

        <FormHeader number={2} label="Kontakty" />
        <InputGroup>
          <Input label="Telefon" name="company_telephone" />
          <Input label="Email" name="contact_email" />
        </InputGroup>
        <InputGroup>
          <Input label="Adresa" name="company_address" />
          <Input label="Kontaktní osoba" name="contact_person" />
        </InputGroup>

        <FormHeader number={3} label="Sociálni média" />
        <InputGroup>
          <Input label="Facebook" name="fb_url" />
          <Input label="Linkedin" name="linkedin_url" />
        </InputGroup>
        <InputGroup>
          <Input label="Twitter" name="twitter_url" />
        </InputGroup>

        <Section noBorder borderTop gutters>
          <Button
            type="submit"
            label="Zaregistrovat"
            center
            isLoading={companies.state.submitting}
          />
        </Section>
      </Form>
    )
  }
}
