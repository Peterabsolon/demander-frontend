import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { InputGroup } from 'components/layout'
import { SelectCategory, Input, Textarea } from 'components/fields'

export default class CompanyFormStepBasics extends Component {
  static propTypes = {
    values: PropTypes.object
  }

  render() {
    const { values } = this.props

    return (
      <div>
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
      </div>
    )
  }
}
