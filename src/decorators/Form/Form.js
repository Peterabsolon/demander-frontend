import React, { Component } from 'react'
// import { get } from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'

import { Modal } from 'containers/misc'
import { Title } from 'components/misc'

import { modal } from 'redux/modules/app'

function decorator(config = {}) {
  return ComposedComponent => {
    @withRouter
    @reduxForm({
      form: config.form,
      validate: config.validate,
      enableReinitialize: config.enableReinitialize || true,
      destroyOnUnmount: config.destroyOnUnmount === undefined || true
    })
    @connect(
      (state, props) => ({
        values: state.form[config.form || props.form] &&
          state.form[config.form || props.form].values,
        errors: state.form[config.form || props.form] &&
          state.form[config.form || props.form].syncErrors,
        modalObj: state.app.modal
      }),
      { modal, push }
    )
    class Form extends Component {
      static propTypes = {
        pristine: React.PropTypes.bool.isRequired,
        submitSucceeded: React.PropTypes.bool.isRequired,
        modalObj: React.PropTypes.object.isRequired,
        router: React.PropTypes.object.isRequired,
        route: React.PropTypes.object,
        modal: React.PropTypes.func.isRequired,
        push: React.PropTypes.func.isRequired,
        initialize: React.PropTypes.func.isRequired
      };

      componentDidMount() {
        !config.disableHook && this.handleLeaveHook()
        // this.handleFormInitialize(get(this.props, config.initialProps))
      }

      // componentWillReceiveProps = nextProps => {
      //   if (
      //     get(this.props, config.initialProps) !==
      //     get(nextProps, config.initialProps)
      //   ) {
      //     this.handleFormInitialize(get(nextProps, config.initialProps))
      //   }
      // };

      // handleFormInitialize = data =>
      //   config.initialProps && this.props.initialize(data);

      handleLeaveHook = () => {
        const { router, route } = this.props

        if (!route) {
          console.log(
            'Route is not specified. Provide route prop or set disableHook:true'
          )
          return
        }

        router.setRouteLeaveHook(route, nextLoc => {
          const { pristine, submitSucceeded } = this.props

          if (submitSucceeded || pristine) {
            return true
          }

          if (!pristine && nextLoc.state && nextLoc.state.shouldRedirect) {
            console.debug('Next location ...', nextLoc)
            return true
          }

          this.props.modal('WizardDialog', nextLoc.pathname)
          return false
        })
      };

      handleRedirect = () =>
        this.props.push({
          pathname: this.props.modalObj.next,
          state: { shouldRedirect: true }
        });

      render() {
        return (
          <div>
            <ComposedComponent {...this.props} />
            <Modal
              id="WizardDialog"
              action="Leave anyway"
              // intlKeyAction="button.leave_anyway"
              closeAction="Stay"
              // intlKeyClose="button.stay"
              onSubmit={this.handleRedirect}
            >
              <Title h3>
                Your changes haven't been saved. Data will be lost.
              </Title>
            </Modal>
          </div>
        )
      }
    }
    return Form
  }
}

export default decorator
