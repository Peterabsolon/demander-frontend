import React, { Component } from 'react'
import uuid from 'uuid'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { sortAlphabetically } from 'utils/misc'

import { apiCategories } from 'decorators/api'
import { Section } from 'components/layout'

import style from './category-multi-select.styl'

@apiCategories({
  list: true
})
export default class CategoryMultiSelect extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
  };

  renderField = (field, category) => {
    return (
      <div
        onClick={() => field.input.onChange(category.id)}
        className={cx(style.category, {
          [style.categoryActive]: category.id === field.input.value
        })}
        key={category.title}
      >
        <div className={style.icon}>
          <i className="material-icons">{category.icon}</i>
        </div>
        <div className={style.title}>
          {category.title}
        </div>
      </div>
    )
  };

  render() {
    const { name } = this.props
    const categoriesData = this.props.categories.state.list

    const categoryAll = categoriesData.length > 0 &&
      categoriesData.filter(x => x.id === 1)[0]

    let categories = categoriesData
      .sort(sortAlphabetically('title'))
      .filter(x => x.id !== 1)

    if (categoryAll) {
      categories = [categoryAll, ...categories]
    }

    return (
      <Section guttersHalf maxWidth={800} contentClassName={style.wrapper}>
        {categories.length > 0 &&
          categories.map(category => (
            <Field
              key={uuid.v1()}
              name={name}
              component={field => this.renderField(field, category)}
            />
          ))}
      </Section>
    )
  }
}
