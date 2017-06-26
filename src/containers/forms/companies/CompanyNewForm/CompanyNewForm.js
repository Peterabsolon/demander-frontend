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

import { Form, FormHeader, InputGroup } from 'components/layout'
import { SelectCategory, Input, Textarea } from 'components/fields'
import { FieldError } from 'components/fields/__elements__'
import { Button } from 'components/misc'

import { form } from 'decorators'
import { apiCompanies } from 'decorators/api'

import validate from './company-new-form.validation'
// import ReactTooltip from 'react-tooltip'

@apiCompanies()
@form({
  form: 'companies.new',
  validate,
})
export default class CompanyNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    companies: PropTypes.object,
  }

  render() {
    const { handleSubmit, companies } = this.props

    const submitError = companies.state.error

    return (
      <Form
        onSubmit={handleSubmit(companies.api.handleCreateEntity)}
        wide
        gutters
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

        <SelectCategory
          label="Kategorie"
          placeholder="Odvětví, ve kterém firma působí"
          name="category_id"
        />

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
