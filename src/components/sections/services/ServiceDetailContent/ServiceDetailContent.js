import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

        <Title noMargin h4>Popis</Title>
        <Paragraph>{data.description}</Paragraph>

        {data.location &&
          <div>
            <Title noMargin h4>Lokace</Title>
            <Paragraph>{data.location}</Paragraph>
          </div>}

        <Button icon="forum" label="Reagovat" />
      </div>
    )
  }
}
