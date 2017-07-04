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
import {
  SelectCompany,
  SelectCategory,
  Input,
  Textarea
} from 'components/fields'
import { Button, FormStepper } from 'components/misc'

import { form } from 'decorators'
import { apiDemands, apiAuth } from 'decorators/api'

import validate from './demand-new-form.validation'
import style from './demand-new-form.styl'

@apiAuth()
@apiDemands()
@form({
  form: 'demandsNew',
  validate
})
export default class DemandNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    demands: PropTypes.object,
    values: PropTypes.object,
    auth: PropTypes.object
  };

  render() {
    const { handleSubmit, demands, auth, values } = this.props

    const isAdmin = auth.state.isAdmin

    return (
      <Form
        gutters
        wide
        onSubmit={handleSubmit(demands.api.handleCreateEntity)}
        className={style.form}
      >
        <FormStepper />

        <div className={style.fields}>
          <FormHeader number={1} label="Zádání poptávky" />

          {/* {isAdmin && <SelectCompany label="Dodavatel" name="company_id" />} */}

          <Input
            label="Titulek poptávky"
            name="title"
            placeholder="Zadejte titulek poptávky (max. 30 znaků)"
          />
          <Textarea
            label="Stručný popis poptávky"
            name="short_description"
            placeholder="Zadejte, co je předmětem Vaší poptávky (max. 140 znaků)"
          />
          <SelectCategory
            horizontal
            label="Kategorizace poptávky"
            // name="segment_id"
            placeholder="Vyberte odvětví a podkategorie"
            formValues={values}
          />

          <FormHeader number={2} label="Podrobný popis poptávky" />
          <Textarea
            label="Detailní popis poptávky"
            name="description"
            placeholder="Upřesněte zadání Vaší poptávky"
          />
          <Textarea
            label="Vstupy"
            name="input"
            placeholder="Napište, co vše svému dodavateli poskytnete jako součást zadání. Dodavatelé tak lépe odhadnou rozsah práce a cenu díla, případně si vyžádájí další potřebné podklady."
          />
          <Textarea
            label="Výstupy"
            name="output"
            placeholder="Přesně popište dílo, které očekáváte dodané od dodavatele. Čím lépe dílo specifikujete, tím snadněji budete moci dílo zkontrolovat."
          />
          <Textarea
            label="Termín a způsob dodání"
            name="timeplan"
            placeholder="Stanovte termín vyhotovení. Doporučujeme také popsat případné požadované milníky a kontrolní termíny projektu."
          />
          <Textarea
            label="Približný rozpočet poptávky"
            name="budget"
            placeholder="Doporučujeme zveřejnit odhad ceny díla pro lepší orientaci budoucích dodavatelů."
          />

          <FormHeader number={3} label="Identifikační údaje" />

          <Input
            label="Kontaktní osoba"
            name="contact_person"
            placeholder="Kontaktní osoba"
          />
          {isAdmin &&
            <SelectCompany
              label="Firma"
              name="company_id"
              placeholder="Vyberte svojí firmu"
            />}

          <Button
            type="submit"
            label="Vytvořit poptávku"
            center
            className="base-margin--top"
            isLoading={demands.state.submitting}
          />
        </div>
      </Form>
    )
  }
}
