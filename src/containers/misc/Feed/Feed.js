import React, { Component } from 'react'
import cx from 'classnames'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Waypoint from 'react-waypoint'

import { Spinner } from 'components/misc'
import { FeedFiltersForm } from 'containers/forms/common'

import style from './feed.styl'

@withRouter
export default class Feed extends Component {
  static propTypes = {
    handleFetchMore: PropTypes.func,
    instance: PropTypes.string.isRequired,
    Item: PropTypes.func.isRequired, // Component
    items: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    router: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired
  };

  static defaultProps = {
    items: []
  };

  render() {
    const { items, Item, router, loading, instance, loaded } = this.props

    const currentId = get(router, 'params.id')

    return (
      <div className={style.wrapper}>
        <div className={style.filters}>
          <FeedFiltersForm
            instance={instance}
            setFilter={this.props.setFilter}
          />
        </div>

        <div className={style.list}>
          <div
            className={cx(style.loader, {
              [style.loaderVisible]: loading || !loaded
            })}
          >
            <Spinner />
          </div>

          <div className={style.scrollArea}>
            {items.length > 0
              ? <div>
                {items.map(
                    item =>
                      item &&
                      <Item
                        isActive={parseInt(currentId) === item.id}
                        key={item.id}
                        {...item}
                      />
                  )}

                <Waypoint
                  bottomOffset="-250px"
                  onEnter={this.props.handleFetchMore}
                />
              </div>
              : !loading &&
                  loaded &&
                  <h4 className={style.noResults}>
                    Nenašli sa žiadne výsledky.
                  </h4>}
          </div>
        </div>
      </div>
    )
  }
}
