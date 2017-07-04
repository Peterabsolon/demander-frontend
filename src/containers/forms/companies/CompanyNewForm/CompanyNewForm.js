import React, { Component } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Form, FormHeader, InputGroup } from 'components/layout'
import { SelectCategory, Input, Textarea } from 'components/fields'
import { FieldError } from 'components/fields/__elements__'
import { Button } from 'components/misc'
import {
  CompanyFormStepBasics,
  CompanyFormStepSpecs,
  CompanyFormStepDetails
} from 'components/sections/companies'

import { form } from 'decorators'
import { apiAuth, apiCompanies } from 'decorators/api'

import validate from './company-new-form.validation'
// import ReactTooltip from 'react-tooltip'

@apiCompanies()
@apiAuth()
@connect((state, { auth }) => ({
  initialValues: {
    contact_person: get(auth, 'state.user.name'),
    contact_person_email: get(auth, 'state.user.email')
  }
}))
@form({
  form: 'companiesNew',
  validate
})
export default class CompanyNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    companies: PropTypes.object,
    values: PropTypes.object
  }

  render() {
    const { values, handleSubmit, companies } = this.props

    const submitError = companies.state.error

    return (
      <Form
        onSubmit={handleSubmit(companies.api.handleCreateEntity)}
        wide
        gutters
        noGuttersTop
        steps={[
          { label: 'Základní informace', component: CompanyFormStepBasics },
          { label: 'Specifikace', component: CompanyFormStepSpecs },
          { label: 'Podrobnosti', component: CompanyFormStepDetails }
        ]}
        {...this.props}
      >
        <FormHeader number={1} label="Profil a identifikace firmy" />
        <Input
          label="Název firmy"
          placeholder="Vyplňte název společnosti či OSVČ"
          name="company_name"
        />

        <InputGroup>
          <Input
            label="Kontaktní osoba"
            placeholder="Jméno a příjmení kontaktní osoby"
            name="contact_person"
          />
          <Input
            label="Email kontaktní osoby"
            placeholder="Email kontaktní osoby"
            name="contact_person_email"
          />
        </InputGroup>

        <InputGroup>
          <Input
            label="IČO"
            placeholder="IČO společnosti či OSVČ"
            name="company_id"
          />
          <Input
            label="DIČ"
            placeholder="DIČ, pokud jste plátci DPH"
            name="company_vat_id"
          />
        </InputGroup>

        <Input
          label="Motto"
          placeholder="Jaké je poslání firmy a čím se zabývá? Maximálně 140 znaků."
          name="slogan"
        />
        <Textarea
          label="O firmě"
          placeholder="Popište hlavní poslání společnosti, čemu se věnujete, jaké služby nabízíte a kdo jsou Vaši klienti."
          name="company_description"
        />

        <SelectCategory horizontal formValues={values} />

        <FormHeader number={2} label="Kontaktní informace firmy" />
        <Input
          label="Sídlo firmy - adresa"
          name="company_address"
          placeholder="Adresa sídla firmy"
        />
        {/* <Input label="Kontaktní osoba" name="contact_person" /> */}

        <Input
          label="Zápis v obchodním rejstříku"
          name="company_registration"
          placeholder="Zápis v obchodním rejstříku Společnost zapsaná v obchodním rejstříku vedeném u ..."
        />

        <InputGroup>
          <Input
            label="Firemní web"
            placeholder="Např. www.demander.cz"
            name="web_url"
          />
          <Input
            label="Kontaktní e-mail"
            placeholder="Např. info@demander.cz"
            name="contact_email"
          />
        </InputGroup>

        <InputGroup>
          <Input
            label="Telefon"
            name="company_telephone"
            placeholder="Kontaktní telefon"
          />
        </InputGroup>

        <InputGroup>
          <Input
            label="Facebook"
            placeholder="Vložte odkaz na Váš profil na Facebook"
            name="fb_url"
          />
          <Input
            label="Linkedin"
            placeholder="Vložte odkaz na Váš profil na Linkedin"
            name="linkedin_url"
          />
        </InputGroup>
        <InputGroup>
          <Input
            label="Twitter"
            placeholder="Vložte odkaz na Váš profil na Twitter"
            name="twitter_url"
          />
        </InputGroup>

        <FormHeader number={3} label="Identita firmy" />

        <Input
          label="Logo firmy"
          placeholder="Vložte URL loga firmy ve čtvercovém formátu (minimálně 300x300px), logo se zobrazuje na bílém pozadí."
          name="logo_url"
        />

        {submitError &&
          <FieldError toShow={submitError} message={submitError} />}

        <Button
          type="submit"
          label="Zaregistrovat Firmu"
          center
          className="base-margin--top"
          isLoading={companies.state.submitting}
        />
      </Form>
    )
  }
}
