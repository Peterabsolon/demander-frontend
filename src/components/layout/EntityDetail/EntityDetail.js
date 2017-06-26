import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './entity-detail.styl'

export default class EntityDetail extends Component {
  static propTypes = {
    data: PropTypes.object,
    Sidebar: PropTypes.func,
    Content: PropTypes.func
  }

  static defaultProps = {
    data: {}
  }

  render() {
    const { Sidebar, Content, data } = this.props

    return (
      <div className={style.wrapper}>
        {Sidebar &&
          <div className={style.sidebar}>
            <Sidebar data={data} {...this.props} />
          </div>}

        {Content &&
          <div className={style.content}>
            <Content data={data} {...this.props} />
          </div>}
      </div>
    )
  }
}
