import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import style from './form-stepper.styl'

export default class FormStepper extends Component {
  static propTypes = {
    asyncValidate: PropTypes.func.isRequired,
    steps: PropTypes.array
  }

  state = {
    finished: false,
    stepIndex: 0
  }

  getStepContent(stepIndex) {
    const { steps } = this.props

    return steps[stepIndex].component
  }

  handleNext = () => {
    const { stepIndex } = this.state

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    })
  }

  handlePrev = () => {
    const { stepIndex } = this.state

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  render() {
    const { steps } = this.props
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }

    const StepComponent = steps[stepIndex].component

    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Základní informace</StepLabel>
          </Step>
          <Step>
            <StepLabel>Specifikace</StepLabel>
          </Step>
          <Step>
            <StepLabel>Podrobnosti</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished
            ? <p>
              <a
                href="#"
                onClick={event => {
                  event.preventDefault()
                  this.setState({ stepIndex: 0, finished: false })
                }}
              >
                  Click here
                </a>{' '}
                to reset the example.
              </p>
            : <div>
              <StepComponent {...this.props} />
              <div className={style.buttons}>
                <FlatButton
                  label="Zpět"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Odeslat' : 'Dále'}
                  primary
                  onTouchTap={() =>
                      this.props.asyncValidate().then(() => this.handleNext())}
                />
              </div>
            </div>}
        </div>
      </div>
    )
  }
}
