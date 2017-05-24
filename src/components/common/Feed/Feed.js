import React, { Component } from 'react'
import cx from 'classnames'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Waypoint from 'react-waypoint'

import { Spinner } from 'components/misc'
import { Section } from 'components/layout'
import { FeedFiltersForm } from 'containers/forms/common'

import style from './feed.styl'

@withRouter
export default class Feed extends Component {
  static propTypes = {
    handleFetchMore: PropTypes.func,
    handleUpdateItem: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    instance: PropTypes.string.isRequired,
    Item: PropTypes.func.isRequired, // Component
    items: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    type: PropTypes.string,
    router: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired
  };

  static defaultProps = {
    items: []
  };

  render() {
    const {
      items,
      Item,
      router,
      instance,
      loaded,
      loading,
      type,
      handleUpdateItem,
      handleDeleteItem
    } = this.props

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
            <Section guttersHalf noBorder>
              {items.length > 0
                ? <div className="row">
                  {items.map(
                      item =>
                        item &&
                        <div className="col-xs-12 col-sm-4">
                          <Item
                            isActive={parseInt(currentId) === item.id}
                            key={item.id}
                            type={type}
                            handleUpdateItem={handleUpdateItem}
                            handleDeleteItem={handleDeleteItem}
                            {...item}
                          />
                        </div>
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
            </Section>
          </div>
        </div>
      </div>
    )
  }
}
