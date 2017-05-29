import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonGroup } from 'components/layout'
import { Title, Paragraph, Button } from 'components/misc'

export default class DemandDetailContent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props

    return (
      <div>
        <Title h2>{data.title}</Title>

        {data.goal &&
          <div>
            <Title smallMargin h4>Cíl</Title>
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
            <Title smallMargin h4>Časové rozmezí</Title>
            <Paragraph secondary>{data.timeplan}</Paragraph>
          </div>}

        {data.budget &&
          <div>
            <Title smallMargin h4>Rozpočet</Title>
            <Paragraph secondary>{data.budget}</Paragraph>
          </div>}

        {data.description &&
          <div>
            <Title smallMargin h4>Detaily</Title>
            <Paragraph secondary>{data.description}</Paragraph>
          </div>}

        <ButtonGroup>
          <Button terniary to="/poptavky" icon="reply" label="Seznam" />
          <Button icon="forum" label="Reagovat" />
        </ButtonGroup>
      </div>
    )
  }
}
