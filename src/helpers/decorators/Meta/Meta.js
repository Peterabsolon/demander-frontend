import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setPage } from 'redux/modules/app'
import Helmet from 'react-helmet'

function decorator(config) {
  return ComposedComponent => {
    @connect(null, {
      setPage
    })
    @injectIntl
    class Meta extends Component {
      static propTypes = {
        setPage: React.PropTypes.func.isRequired,
        intl: React.PropTypes.object.isRequired,
      }

      componentDidMount = () => {
        const { intl } = this.props

        !config.noOverride &&
          this.props.setPage(config.intlKey ?
            intl.formatMessage({
              id: config.intlKey || '',
              defaultMessage: config.title
            }) :
            config.title
            , false)
      }

      render() {
        const { title, description = '', image = '' } = config

        const meta = [
           { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
           { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
           { charset: 'utf-8' },
           { property: 'site_name', content: 'Duke of Edinburgh' },
           { property: 'og:image', content: image },
           { property: 'og:locale', content: 'en_US' },
           { property: 'og:title', content: 'The Duke of Edinburgh’s Award - BackOffice Web' },
           { property: 'og:description', content: description },
           { property: 'og:type', content: 'website' },
           { property: 'og:url', content: '' },
           { property: 'twitter:card', content: 'summary' },
           { property: 'twitter:site', content: '@' },
           { property: 'twitter:creator', content: '@' },
           { property: 'twitter:title', content: title },
           { property: 'twitter:description', content: description },
           { property: 'twitter:image', content: image },
           { property: 'twitter:image:width', content: '200' },
           { property: 'twitter:image:height', content: '200' }
        ]

        return (
          <div>
            <Helmet
              title={'Duke of Edinburgh - ' + title}
              titleTemplate={'Duke of Edinburgh - ' + title}
              defaultTitle='Duke of Edinburgh'
              meta={meta}
            />
            <ComposedComponent {...this.props} />
          </div>
        )
      }
    }
    return Meta
  }
}


export default decorator
