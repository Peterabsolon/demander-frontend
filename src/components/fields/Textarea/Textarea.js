import React, { Component } from 'react'
import cx from 'classnames'
// import { CircleLoader } from 'components/loaders'
import { FormattedHTMLMessage } from 'react-intl'
import { Field } from 'redux-form'
import TextareaAutosize from 'react-textarea-autosize'

import { FieldError } from 'components/fields/__elements__'

import styles from './textarea.styl'

export default class Textarea extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    onInputChange: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    normalizeOnBlur: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    disableLineBreaks: React.PropTypes.bool,
    clearable: React.PropTypes.bool,
    optional: React.PropTypes.bool,
    titleStyle: React.PropTypes.bool,
    descriptionStyle: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    inlineLabelWidth: React.PropTypes.string,
    loading: React.PropTypes.bool,
    labelless: React.PropTypes.bool,
    required: React.PropTypes.bool,
    noMargin: React.PropTypes.bool,
    transparent: React.PropTypes.bool,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    intlKey: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    step: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    normalize: React.PropTypes.func
  }

  static defaultProps = {
    loading: false,
    optional: false,
    disabled: false,
    clearable: false,
    validate: () => {}
  }

  state = { isFocused: false }

  handleChange = (e, field) => {
    const { disableLineBreaks } = this.props
    let value = e.target.value

    if (disableLineBreaks) {
      value = value.replace(/(?:\r\n|\r|\n)/g, '')
    }

    if (this.props.onInputChange) {
      this.props.onInputChange(value)
    }

    field.input.onChange(value)
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
      label,
      min,
      max,
      inlineLabelWidth,
      placeholder,
      inline
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
        max
      }
    }

    return (
      <div
        className={`${styles.controls} ${errorClass} ${disabledClass} ${clearableClass}`}
      >
        <div className={styles.inputWrapper}>
          {inline && this.renderLabel()}

          <TextareaAutosize
            className="form-control"
            {...input}
            type={type || 'text'}
            {...numberParams}
            onChange={e => this.handleChange(e, field)}
            onBlur={e => this.handleOnBlur(e, field)}
            onFocus={e => this.handleOnFocus(e, field)}
            disabled={disabled}
            onKeyPress={this.props.onKeyPress}
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

  renderLabel() {
    const {
      label,
      name,
      intlKey,
      inline,
      optional,
      required,
      labelless,
      inlineLabelWidth
    } = this.props
    const srOnlyClass = labelless ? 'sr-only' : ''
    const { isFocused } = this.state

    return (
      label &&
      <label
        htmlFor={name}
        className={cx('control-label', styles.label, {
          [srOnlyClass]: srOnlyClass,
          [styles.isFocused]: isFocused,
          [styles.inline]: inline
        })}
        style={{ minWidth: inlineLabelWidth }}
      >
        {intlKey
          ? <FormattedHTMLMessage id={intlKey} defaultMessage={label} />
          : label}
        {optional && ' '}
        {optional &&
          <FormattedHTMLMessage
            id="label.optional"
            defaultMessage="(optional)"
          />}
        {required && <span className={styles.required}> *</span>}
      </label>
    )
  }

  render() {
    const {
      className,
      name,
      inline,
      loading,
      titleStyle,
      descriptionStyle,
      transparent,
      noMargin
    } = this.props

    return (
      <div
        className={cx('form-group', styles.wrapper, {
          [className]: className,
          [styles.titleStyle]: titleStyle,
          [styles.descriptionStyle]: descriptionStyle,
          [styles.transparent]: transparent,
          [styles.noMargin]: noMargin
        })}
      >
        {!inline && this.renderLabel()}
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
