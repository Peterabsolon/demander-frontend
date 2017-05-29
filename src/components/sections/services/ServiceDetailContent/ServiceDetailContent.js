import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonGroup } from 'components/layout'
import { Title, Paragraph, Button } from 'components/misc'

export default class ServiceDetailContent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props

    return (
      <div>
        <Title h2>{data.title}</Title>

        <Title smallMargin h4>Popis</Title>
        <Paragraph secondary>{data.description}</Paragraph>

        {data.location &&
          <div>
            <Title smallMargin h4>Lokace</Title>
            <Paragraph secondary>{data.location}</Paragraph>
          </div>}

        <ButtonGroup>
          <Button terniary to="/sluzby" icon="reply" label="Seznam" />
          <Button icon="forum" label="Reagovat" />
        </ButtonGroup>
      </div>
    )
  }
}
