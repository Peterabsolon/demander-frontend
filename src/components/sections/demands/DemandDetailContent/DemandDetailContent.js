import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonGroup } from 'components/layout'
import { Title, Paragraph, Button } from 'components/misc'

export default class DemandDetailContent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { data } = this.props

    return (
      <div>
        <ButtonGroup stretch className="base-margin--bottom">
          <Button icon="forum" label="Reagovat" />
          <Button terniary to="/poptavky" icon="reply" label="Seznam" />
        </ButtonGroup>

        <Title h2>{data.title}</Title>

        {data.goal &&
          <div>
            <Title smallMargin h4>Stručný popis poptávky</Title>
            <Paragraph secondary>{data.goal}</Paragraph>
          </div>}

        <hr />

        {data.input &&
          <div>
            <Title smallMargin h4>Vstupy</Title>
            <Paragraph secondary>{data.input}</Paragraph>
          </div>}

        {data.output &&
          <div>
            <Title smallMargin h4>Výstupy</Title>
            <Paragraph secondary>{data.output}</Paragraph>
          </div>}

        <hr />

        {data.timeplan &&
          <div>
            <Title smallMargin h4>Termín a způsob dodání</Title>
            <Paragraph secondary>{data.timeplan}</Paragraph>
          </div>}

        {data.budget &&
          <div>
            <Title smallMargin h4>Přibližný rozpočet</Title>
            <Paragraph secondary>{data.budget} Kš s DPH</Paragraph>
          </div>}

        {data.description &&
          <div>
            <Title smallMargin h4>Detaily</Title>
            <Paragraph secondary>{data.description}</Paragraph>
          </div>}
      </div>
    )
  }
}
