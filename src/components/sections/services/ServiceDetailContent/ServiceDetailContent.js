import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonGroup } from 'components/layout'
import { RequestServiceForm } from 'containers/forms/services'
import { Title, Paragraph, Button } from 'components/misc'

export default class ServiceDetailContent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    handleRequestService: PropTypes.func.isRequired,
    handleRequestServiceSubmit: PropTypes.func.isRequired
  }

  render() {
    const {
      data,
      handleRequestService,
      handleRequestServiceSubmit
    } = this.props

    return (
      <div>
        <ButtonGroup stretch className="base-margin--bottom">
          <Button
            onClick={handleRequestService}
            icon="forum"
            label="Poptat Službu"
          />

          <Button terniary to="/sluzby" icon="reply" label="Seznam" />
        </ButtonGroup>

        <Title h2>{data.title}</Title>

        <Title smallMargin h4>Popis služby</Title>
        <Paragraph secondary>{data.description}</Paragraph>

        {data.location &&
          <div>
            <Title smallMargin h4>Lokalita poskytovaní služby</Title>
            <Paragraph secondary>{data.location}</Paragraph>
          </div>}

        <RequestServiceForm
          onSubmit={values => handleRequestServiceSubmit(values, data)}
        />
      </div>
    )
  }
}
