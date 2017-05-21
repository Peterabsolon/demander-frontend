import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notification } from 'redux/modules/app'
import NotificationSystem from 'react-notification-system'

@connect(state => ({
  app: state.app
}))
export default class Notification extends Component {
  static propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props)
    this.state = {}
    this.notify = null
  }

  componentDidMount() {
    this.notify = this.refs.notificationSystem
  }

  componentWillReceiveProps(nextProps) {
    const { message, level, active } = nextProps.app.notification

    // return if notification has not been set as active
    if (!active) {
      return
    }

    this.notify.addNotification({
      message,
      level: level || 'success',
      position: 'tc',
      autoDismiss: 4,
      onRemove: this.handleRemove()
    })
  }

  handleRemove() {
    this.props.dispatch(notification('', '', false))
  }

  render() {
    return <NotificationSystem ref="notificationSystem" />
  }
}
