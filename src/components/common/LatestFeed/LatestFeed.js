import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Section } from 'components/layout'
import { Title } from 'components/misc'

import style from './latest-feed.styl'

export default class LatestFeed extends Component {
  static propTypes = {
    title: PropTypes.string,
    handleGoToEdit: PropTypes.func,
    handleGoToDetail: PropTypes.func,
    type: PropTypes.string,
    dark: PropTypes.bool,
    items: PropTypes.array,
    Item: PropTypes.func, // component
    button: PropTypes.element,
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const {
      button,
      dark,
      title,
      items,
      Item,
      type,
      handleGoToEdit,
      handleGoToDetail,
    } = this.props

    return (
      <Section textCenter gutters className={cx({ [style.dark]: dark })}>
        {title && <Title h2>{title}</Title>}

        <div className={style.grid}>
          {items.length > 0 &&
            items.map(
              (item, index) =>
                index < 3 &&
                <div className={style.gridItem}>
                  <Item
                    key={item.id}
                    type={type}
                    handleGoToEdit={handleGoToEdit}
                    handleGoToDetail={handleGoToDetail}
                    {...item}
                  />
                </div>,
            )}
        </div>

        {button}
      </Section>
    )
  }
}
