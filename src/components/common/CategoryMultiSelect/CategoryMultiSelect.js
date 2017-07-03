import React, { Component } from 'react'
import uuid from 'uuid'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { sortAlphabetically } from 'utils/misc'

import { apiSegments } from 'decorators/api'
import { Section } from 'components/layout'

import style from './segment-multi-select.styl'

@apiSegments({
  list: true
})
export default class CategoryMultiSelect extends Component {
  static propTypes = {
    segments: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
  };

  renderField = (field, segment) => {
    return (
      <div
        onClick={() => field.input.onChange(segment.id)}
        className={cx(style.segment, {
          [style.segmentActive]: segment.id === field.input.value
        })}
        key={segment.title}
      >
        <div className={style.icon}>
          <i className="material-icons">
            {segment.icon}
          </i>
        </div>
        <div className={style.title}>
          {segment.title}
        </div>
      </div>
    )
  };

  render() {
    const { name } = this.props
    const segmentsData = this.props.segments.state.list

    console.log('segmentsData', segmentsData)

    const segmentAll =
      segmentsData.length > 0 && segmentsData.filter(x => x.id === 1)[0]

    let segments = segmentsData
      .sort(sortAlphabetically('title'))
      .filter(x => x.id !== 1)

    if (segmentAll) {
      segments = [segmentAll, ...segments]
    }

    return (
      <Section guttersHalf maxWidth={800} contentClassName={style.wrapper}>
        {segments.length > 0 &&
          segments.map(segment =>
            <Field
              key={uuid.v1()}
              name={name}
              component={field => this.renderField(field, segment)}
            />
          )}
      </Section>
    )
  }
}
