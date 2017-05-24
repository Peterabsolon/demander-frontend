import React, { Component } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

function decorator(config) {
  return ComposedComponent => {
    @connect(({ form }, props) => {
      const formName = `${config.form}.${props.instance || ''}`

      return {
        form: formName,
        formValues: get(form, `${formName}.values`)
      }
    })
    @reduxForm({
      destroyOnUnmount: !config.persist
    })
    class Filter extends Component {
      static propTypes = {
        setFilter: PropTypes.func.isRequired,
        query: PropTypes.string,
        handleSubmit: PropTypes.func
      };

      componentDidUpdate(prevProps) {
        if (prevProps.formValues !== this.props.formValues) {
          this.handleFilterCreate(this.props.formValues || {})
        }
      }

      componentWillUnmount() {
        !config.persist && this.props.setFilter('')
      }

      normalizeFields = model => {
        const fields = {}

        Object.keys(model).map(key => {
          const field = model[key]

          if (Array.isArray(field)) {
            if (field.length > 0) {
              fields[key] = field
            }
          } else if (field) {
            fields[key] = field
          }
        })

        return fields
      };

      createFilters = model => {
        const fields = this.normalizeFields(model)
        let filter = ''

        Object.keys(fields).map(key => {
          const value = fields[key]

          if (Array.isArray(value)) {
            value.length > 0 &&
              value.map(item => {
                filter += `&include[${key}][where][id]=${item.id}`
              })
          } else if (value) {
            filter += `&include[${key}][where][id]=${value.id || value}`
          }
        })

        return filter
      };

      handleFilterCreate = fields => {
        const query = this.createFilters(fields)

        this.props.setFilter(query)
      };

      render() {
        const { query, handleSubmit } = this.props

        return (
          <form onSubmit={handleSubmit(this.handleFilterCreate)}>
            <ComposedComponent {...this.props} query={query} />
          </form>
        )
      }
    }
    return Filter
  }
}

export default decorator
