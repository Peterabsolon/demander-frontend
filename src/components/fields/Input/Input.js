import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
// import { CircleLoader } from 'components/loaders'
import { Field } from 'redux-form'
import { FieldError, FieldLabel } from 'components/fields/__elements__'
import styles from './input.styl'

export default class Input extends Component {
  // Disable eslint here to declare required propTypes for the label
  /* eslint-disable */
  static propTypes = {
    className: PropTypes.string,
    onInputChange: PropTypes.func,
    normalizeOnBlur: PropTypes.func,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    optional: PropTypes.bool,
    required: PropTypes.bool,
    inline: PropTypes.bool,
    inlineLabelWidth: PropTypes.string,
    loading: PropTypes.bool,
    labelless: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    intlKey: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    normalize: PropTypes.func,
  }
  /* eslint-enable */

  static defaultProps = {
    loading: false,
    optional: false,
    disabled: false,
    clearable: false,
    validate: () => {},
  }

  state = { isFocused: false }

  handleChange = (e, field) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(e.target.value)
    }

    field.input.onChange(e.target.value)
  }

  handleOnFocus = (e, field) => {
    this.setState({ isFocused: true })

    field.input.onFocus(e)
  }

  handleOnBlur = (e, field) => {
    this.setState({ isFocused: false })

    if (this.props.normalizeOnBlur) {
      this.props.normalizeOnBlur(field)
    }

    field.input.onBlur()
  }

  handleClear = field => field.input.onChange(null)

  renderField = field => {
    const {
      type,
      disabled,
      clearable,
      step,
      min,
      max,
      label,
      inlineLabelWidth,
      placeholder,
      inline,
    } = this.props

    const { meta, input } = field
    const errorClass = meta.touched && meta.error ? 'has-error' : ''
    const disabledClass = disabled ? styles.disabled : ''
    const clearableClass = clearable ? styles.clearable : ''

    let numberParams = {}

    if (type === 'number') {
      numberParams = {
        step,
        min,
        max,
      }
    }

    return (
      <div
        className={`${styles.controls} ${errorClass} ${disabledClass} ${clearableClass}`}
      >
        <div className={styles.inputWrapper}>

          {inline && <FieldLabel {...this.props} />}

          <input
            className="form-control"
            {...input}
            type={type || 'text'}
            {...numberParams}
            onChange={e => this.handleChange(e, field)}
            onBlur={e => this.handleOnBlur(e, field)}
            onFocus={e => this.handleOnFocus(e, field)}
            disabled={disabled}
            placeholder={placeholder || label}
          />
          {clearable &&
            input.value &&
            <span
              className={`ico ico--clear ${styles.btnClear}`}
              onClick={() => this.handleClear(field)}
            />}
        </div>

        <FieldError
          inlineLabelWidth={inlineLabelWidth}
          toShow={meta.touched && meta.error}
          message={meta.error}
        />

        {/* {field.loading && <span className={styles.loader}>
          <CircleLoader size={32} />
        </span>} */}
      </div>
    )
  }

  render() {
    const { className, name, loading, inline } = this.props

    return (
      <div
        className={cx('form-group', {
          [className]: className,
        })}
      >
        {!inline && <FieldLabel {...this.props} {...this.state} />}

        <Field
          id={name}
          name={name}
          component={this.renderField}
          normalize={this.props.normalize}
          loading={loading}
        />
      </div>
    )
  }
}
