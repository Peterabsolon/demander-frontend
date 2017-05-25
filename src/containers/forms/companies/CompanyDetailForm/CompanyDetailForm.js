import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Form, FormHeader, InputGroup, Section } from 'components/layout'
import { SelectCategory, Input, Textarea } from 'components/fields'
import { Button } from 'components/misc'

import { form } from 'decorators'
import { apiCompanies } from 'decorators/api'

import validate from './company-detail-form.validation'

// company_name
// company_nice_name
// company_id
// company_vat_id
// company_about
// company_description
// company_opening_hours
// company_gps_location
// contact_telephone
// contact_email
// contact_address
// contact_person
// slogan
// logo_url
// web_url
// fb_url
// twitter_url
// linkedin_url

@apiCompanies({
  detail: true
})
@connect((state, props) => ({
  initialValues: props.companies.state.detail
}))
@form({
  form: 'companies.new',
  initialProps: 'companies.state.detail',
  validate
})
export default class CompanyDetailForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    companies: PropTypes.object
  };

  render() {
    const { handleSubmit, companies } = this.props

    return (
      <Form
        onSubmit={handleSubmit(companies.api.handleEditEntity)}
        loading={companies.state.detailLoading}
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
            label="Upravit"
            center
            isLoading={companies.state.submitting}
          />
        </Section>
      </Form>
    )
  }
}
