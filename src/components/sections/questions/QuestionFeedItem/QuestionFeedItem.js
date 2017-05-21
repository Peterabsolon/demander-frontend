import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import moment from 'moment'

import { Title, Link } from 'components/misc'

import style from './question-feed-item.styl'

export default class QuestionFeedItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    tags: PropTypes.array,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    availableFrom: PropTypes.string.isRequired,
    availableTo: PropTypes.string.isRequired
  };

  static defaultProps = {
    tags: []
  };

  render() {
    const {
      id,
      isActive,
      title,
      author,
      tags,
      availableFrom,
      availableTo
    } = this.props

    const tagsCount = tags.length
    const duration = {
      remaining: moment(availableFrom).format('DD.MM.YYYY'),
      availableFrom: moment(availableFrom).format('DD.MM.YYYY'),
      availableTo: moment(availableTo).format('DD.MM.YYYY')
    }

    return (
      <div
        className={cx(style.wrapper, {
          [style.isActive]: isActive
        })}
      >
        <Title h3 className={style.title}>
          <Link to={`/otazky/${id}`}>
            {title}
          </Link>
        </Title>

        <div className={style.meta}>
          <div className={style.author}>
            <span className="color--gray-alpha">autor:</span>
            {' '}
            <span>{author}</span>
          </div>
          <div className={style.duration}>
            <span>
              {duration.remaining}
            </span>
            <span className="color--gray-alpha">
              {duration.availableFrom}
            </span>
            <span className="color--gray-alpha">
              {duration.availableTo}
            </span>
          </div>
          {tagsCount > 0 &&
            <Link primary to="/nastavenia">
              {tags.map((tag, index) => {
                return `${tag.name}${index !== tagsCount - 1 ? ', ' : ''}`
              })}
            </Link>}
        </div>
      </div>
    )
  }
}
