import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Title, Link } from 'components/misc'

import style from './post-feed-item.styl'

export default class PostFeedItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string.isRequired
  };

  render() {
    const { id, author, title, isActive, imageUrl } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [style.isActive]: isActive,
          [style.hasImage]: imageUrl
        })}
      >
        {imageUrl &&
          <Link className={style.imageLink} to={`/clanky/${id}`}>
            <div
              className={style.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </Link>}

        <div className={style.content}>
          <Title h3 className={style.title}>
            <Link to={`/clanky/${id}`}>
              {title}
            </Link>
          </Title>

          <div className={cx(style.meta, 'color--gray-alpha')}>
            <div className={style.author}>
              <span>{author}</span>
            </div>
            <div className={style.postedAt}>
              <span>Pred 1 hodinou</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
