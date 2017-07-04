import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const decorator = () => ComposedComponent => {
  class Wizard extends Component {
    static propTypes = {
      // something: PropTypes.any
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return Wizard
}

export default decorator
