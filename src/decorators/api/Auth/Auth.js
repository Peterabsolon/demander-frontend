import React, { Component } from 'react'
import { omit } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as authApi from 'redux/modules/api/auth'

const decorator = () =>
  ComposedComponent => {
    @connect(
      ({ api }) => ({
        state: api.auth
      }),
      {
        ...authApi
      }
    )
    class Auth extends Component {
      static propTypes = {
        state: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
      };

      handleSignup = async model => {
        delete model.passwordConfirm

        const user = await this.props.signup(model)

        await this.props.saveUser(user)

        browserHistory.push('/dodavatele/vytvorit')
      };

      handleLogin = async model => {
        const user = await this.props.login(model)

        await this.props.saveUser(user)

        browserHistory.push('/poptavky')
      };

      handleLogout = async () => {
        await this.props.logout()

        browserHistory.push('/')

        window.location.reload()
      };

      render() {
        const { state } = this.props

        const reducerMethods = [
          'load',
          'login',
          'signup',
          'saveUser',
          'logout',
          'clearError'
        ]

        const api = {
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleSignup: this.handleSignup
        }

        const filteredProps = omit(this.props, ['state', ...reducerMethods])

        reducerMethods.forEach(method => {
          api[method] = this.props[method]
        })

        const payload = { state, api }

        return <ComposedComponent {...filteredProps} auth={payload} />
      }
    }

    return Auth
  }

export default decorator
