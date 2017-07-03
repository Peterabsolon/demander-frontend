import React, { Component } from 'react'
import { omit } from 'lodash'
// import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as segmentsApi from 'redux/modules/api/segments'

const decorator = (config = {}) => ComposedComponent => {
  @connect(
    ({ api }) => ({
      state: api.segments
    }),
    {
      ...segmentsApi
    }
  )
  class Segments extends Component {
    static propTypes = {
      state: PropTypes.object.isRequired,
      getSegments: PropTypes.func.isRequired,
      getCategories: PropTypes.func.isRequired,
      getSubcategories: PropTypes.func.isRequired
    };

    componentWillMount() {
      const { state } = this.props

      config.segments &&
        !state.segments.loaded &&
        this.props.getSegments(state)
    }

    handleGetCategories = segments => {
      const { state } = this.props

      const filter = segments
        .map(segment => `&segmentId=${segment.id}`)
        .join('')

      this.props.getCategories({ ...state, filter })
    };

    handleGetSubcategories = categories => {
      const { state } = this.props

      const filter = categories
        .map(category => `&categoryId=${category.id}`)
        .join('')

      this.props.getSubcategories({ ...state, filter })
    };

    render() {
      const { state } = this.props

      const filteredProps = omit(this.props, ['state'])

      const payload = {
        state,
        api: {
          handleGetSegments: this.handleGetSegments,
          handleGetCategories: this.handleGetCategories,
          handleGetSubcategories: this.handleGetSubcategories
        }
      }

      return <ComposedComponent {...filteredProps} segments={payload} />
    }
  }

  return Segments
}

export default decorator
