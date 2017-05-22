import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

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

  handleToggleCategory = (field, category) => {
    field.input.onChange(category)
  };

  renderField = (field, category) => {
    return (
      <div
        onClick={() => field.input.onChange(category.id)}
        className={style.category}
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
    const categories = get(this.props, 'categories.state.list')

    return (
      <Section gutters maxWidth={800} contentClassName={style.wrapper}>
        {categories.length > 0 &&
          categories.map(category => (
            <Field
              name={name}
              component={field => this.renderField(field, category)}
            />
          ))}
      </Section>
    )
  }
}
