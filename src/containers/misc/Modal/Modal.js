import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import { Motion, spring } from 'react-motion'
import { modal } from 'redux/modules/app'
import { Button } from 'components/misc'

import styles from './modal.styl'

const resetStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: 'none',
    background: 'transparent',
    overflow: 'visible',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    outline: 'none',
    padding: '20px'
  }
}

@connect(
  state => ({
    modalObj: state.app.modal
  }),
  { modal }
)
export default class Modal extends PureComponent {
  static propTypes = {
    contentLabel: React.PropTypes.string,
    modalObj: React.PropTypes.object,
    compact: React.PropTypes.bool,
    enableOverflow: React.PropTypes.bool,
    wider: React.PropTypes.bool,
    large: React.PropTypes.bool,
    isLoading: React.PropTypes.bool,
    customActions: React.PropTypes.bool,
    dontCloseAfterSubmit: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired,
    onSubmit: React.PropTypes.func,
    onClose: React.PropTypes.func,
    action: React.PropTypes.string,
    closeAction: React.PropTypes.string,
    intlKeyClose: React.PropTypes.string,
    intlKeyAction: React.PropTypes.string,
    modal: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    action: '',
    closeAction: 'Dismiss',
    compact: false,
    enableOverflow: false,
    wider: false,
    large: false,
    redirect: false,
    isLoading: false,
    customActions: false,
    dontCloseAfterSubmit: false,
    contentLabel: ''
  };

  constructor(props) {
    super(props)
    this.state = {
      y: -100,
      opacity: 0,
      z: -2000,
      shouldClose: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.modalObj.id !== nextProps.modalObj.id && !nextProps.modalObj.id
    ) {
      this.handleOnRequestClose()
    }
  }

  componentWillUnmount() {
    this.handleClose()
  }

  handleOnRequestClose = () => {
    this.setState(
      {
        y: -100,
        opacity: 0,
        z: -2000,
        shouldClose: true
      },
      () => {
        this.handleClose()
      }
    )
  };

  handleClose = () => {
    this.props.modal(null, null)

    if (this.props.onClose) {
      this.props.onClose()
    }
  };

  handleAfterOpen = () => {
    this.setState({
      y: 0,
      opacity: 1,
      z: 0,
      shouldClose: false
    })
  };

  handleAfterSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit()
    }

    !this.props.dontCloseAfterSubmit && this.props.modal(null, null)
  };

  render() {
    const {
      modalObj,
      id,
      children,
      action,
      closeAction,
      compact,
      customActions,
      wider,
      large,
      enableOverflow,
      isLoading,
      intlKeyClose,
      intlKeyAction
    } = this.props
    const { y, z, opacity } = this.state
    const compactClass = compact ? styles.modalCompact : ''
    const widerClass = wider ? styles.wider : ''
    const largeClass = large ? styles.large : ''
    const overflowClass = enableOverflow ? styles.overflow : ''

    let content = children
    let contentCTA = null

    if (children && Array.isArray(children) && children.length > 0) {
      content = children.filter(
        item => get(item, 'type.displayName') !== 'ModalCTA'
      )
      contentCTA = children.filter(
        item => get(item, 'type.displayName') === 'ModalCTA'
      )
    }

    return (
      <ReactModal
        isOpen={modalObj.id === id}
        onRequestClose={this.handleOnRequestClose}
        style={resetStyles}
        className="modal-content"
        onAfterOpen={this.handleAfterOpen}
        closeTimeoutMS={380}
        contentLabel={this.props.contentLabel}
      >
        <Motion
          defaultStyle={{ y, z, opacity }}
          style={{
            y: spring(y, { stiffness: 65, damping: 13 }),
            opacity: spring(opacity, { stiffness: 65, damping: 13 }),
            z: spring(z)
          }}
        >
          {interpolatingStyle => (
            <div
              className={
                `${styles.modalContent} ${compactClass} ${widerClass} ${largeClass} ${overflowClass}`
              }
              style={{
                transform: `translate3d(0, ${interpolatingStyle.y}px, ${interpolatingStyle.z}px)`,
                opacity: `${interpolatingStyle.opacity}`
              }}
            >
              <div className={styles.innerContent}>
                {content}
                {!customActions &&
                  <div className={styles.btns}>
                    <Button secondary onClick={this.handleOnRequestClose}>
                      {intlKeyClose
                        ? <FormattedMessage
                          id={intlKeyClose}
                          defaultMessage={closeAction}
                        />
                        : closeAction}
                    </Button>
                    {action &&
                      <Button
                        className={styles.btn}
                        onClick={this.handleAfterSubmit}
                        isLoading={isLoading}
                        disabled={isLoading}
                      >
                        {intlKeyAction
                          ? <FormattedMessage
                            id={intlKeyAction}
                            defaultMessage={action}
                          />
                          : action}
                      </Button>}
                  </div>}
                {contentCTA}
              </div>
            </div>
          )}
        </Motion>
      </ReactModal>
    )
  }
}
