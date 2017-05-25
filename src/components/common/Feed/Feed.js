import React, { Component } from 'react'
// import cx from 'classnames'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Waypoint from 'react-waypoint'

// import { Spinner } from 'components/misc'
import { Section } from 'components/layout'
import { FeedFiltersForm } from 'containers/forms/common'

import style from './feed.styl'

@withRouter
export default class Feed extends Component {
  static propTypes = {
    handleFetchMore: PropTypes.func,
    handleGoToDetail: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    instance: PropTypes.string.isRequired,
    Item: PropTypes.func.isRequired, // Component
    items: PropTypes.array.isRequired,
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
      loading,
      type,
      handleGoToDetail,
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
          <div className={style.scrollArea}>
            {/* TODO: FML */}
            {/* <div
              className={cx(style.loader, {
                [style.loaderVisible]: isLoading
              })}
            >
              <Spinner />
            </div> */}

            <Section
              loading={loading}
              className={style.content}
              guttersHalf
              noBorder
            >
              {items.length > 0 &&
                <div className={style.grid}>
                  {items.map(
                    item =>
                      item &&
                      <div className={style.gridItem}>
                        <Item
                          isActive={parseInt(currentId) === item.id}
                          key={item.id}
                          type={type}
                          handleGoToDetail={handleGoToDetail}
                          handleDeleteItem={handleDeleteItem}
                          {...item}
                        />
                      </div>
                  )}

                  <Waypoint
                    bottomOffset="-250px"
                    onEnter={this.props.handleFetchMore}
                  />
                </div>}

              {items.length === 0 &&
                !loading &&
                <div className={style.noResults}>
                  <h4>Nebyly nalezeny žádné výsledky.</h4>
                </div>}
            </Section>
          </div>
        </div>
      </div>
    )
  }
}
