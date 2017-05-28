import React, { Component, PropTypes } from 'react'
import { asyncConnect } from 'redux-connect'
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/api/auth'
import {
  isLoaded as isConfigLoaded,
  load as loadConfig
} from 'redux/modules/config'
import { IntlProvider } from 'react-intl'
import { messages, intlData } from './constants/locales'
import { Notification } from 'components/misc'
import moment from 'moment'
import 'moment/locale/cs'

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = []

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()))
      }

      if (!isConfigLoaded()) {
        promises.push(dispatch(loadConfig()))
      }

      return Promise.all(promises)
    }
  }
])
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    moment.locale('cs')
  }

  render() {
    const { children } = this.props

    return (
      <IntlProvider
        key="intl"
        locale="en"
        formats={intlData.en}
        messages={messages.en}
      >
        <div>
          {children}
          <Notification />
        </div>
      </IntlProvider>
    )
  }
}
