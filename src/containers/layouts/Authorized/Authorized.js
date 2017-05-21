import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { Header } from 'components/layout'

import { logout } from 'redux/modules/auth'

@connect(null, { logout })
export default class Authorized extends Component {
  static propTypes = {
    children: PropTypes.any,
    logout: PropTypes.func.isRequired
  };

  handleLogout = () =>
    this.props.logout().then(() => browserHistory.push('/login'));

  render() {
    return (
      <div>
        <Header handleLogout={this.handleLogout} />

        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    )
  }
}
