import React, { Component } from 'react'
import cx from 'classnames'
import ReactSelect from 'react-select'
import debounce from 'debounce-promise'
import { isEqual, isEmpty } from 'lodash'
import { FormattedHTMLMessage } from 'react-intl'
import { Field } from 'redux-form'
import styles from './select.styl'

import { FieldError } from 'components/fields/__elements__'

export default class Select extends Component {
  static propTypes = {
    autocomplete: React.PropTypes.bool,
    backspaceToRemoveMessage: React.PropTypes.string,
    clearable: React.PropTypes.bool,
    creatable: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    disableRedux: React.PropTypes.bool,
    getOptions: React.PropTypes.func,
    hasFormGroup: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    ignoreAccents: React.PropTypes.bool,
    inlineLabelWidth: React.PropTypes.string,
    intlKey: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    labelKey: React.PropTypes.string,
    labelless: React.PropTypes.bool,
    multi: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    noResultsText: React.PropTypes.string,
    onInputChange: React.PropTypes.func,
    onSelectChange: React.PropTypes.func,
    options: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    promptTextCreator: React.PropTypes.func,
    searchable: React.PropTypes.bool,
    small: React.PropTypes.bool,
    updater: React.PropTypes.any,
    valueKey: React.PropTypes.string
  };

  static defaultProps = {
    backspaceToRemoveMessage: '',
    disableRedux: false,
    hasFormGroup: true,
    ignoreAccents: true,
    labelless: false,
    loadingPlaceholder: 'Vyhledáva se...',
    noResultsText: 'Nebyly nalezeny žádné výsledky.',
    placeholder: 'Vyhledat...',
    searchable: false,
    searchPromptText: 'Zadejte hledaný výraz',
    small: false
  };

  constructor(props) {
    super(props)

    this.getOptions = debounce(this.getOptions, 500)

    this.state = { isFocused: false }
  }

  shouldComponentUpdate(nextProps) {
    const { disabled, updater, autocomplete, params } = this.props

    if (disabled !== nextProps.disabled || updater !== nextProps.updater) {
      return true
    }

    if (autocomplete) {
      // discuss this and find a better solution
      return !isEqual(params, nextProps.params)
    }

    return true
  }

  getOptions = searchQuery => {
    if (!this.props.getOptions) {
      console.warn('Promise must be specified ')
      return false
    }

    if (!searchQuery) {
      return Promise.resolve([])
    }

    return this.props.getOptions(searchQuery).then(results => {
      const hasResults = results.body && results.body.length > 0
      const options = hasResults ? results.body : []

      return { options }
    })
  };

  handleChange = (field, obj) => {
    const { multi } = this.props
    let value

    if (isEmpty(obj)) {
      value = multi ? [] : null
    } else {
      value = obj
    }

    this.props.onSelectChange && this.props.onSelectChange(value)

    !this.props.disableRedux && field.input.onChange(value)
  };

  handleInputChange = (field, value) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(value)
    }
  };

  handleFocus = field => {
    field.input.onFocus()

    this.setState({ isFocused: true })
  };

  handleBlur = field => {
    field.input.onBlur()

    this.setState({ isFocused: false })
  };

  renderField = field => {
    const {
      autocomplete,
      backspaceToRemoveMessage,
      clearable,
      creatable,
      disabled,
      inline,
      noResultsText,
      // ignoreAccents,
      inlineLabelWidth,
      promptTextCreator,
      labelKey,
      multi,
      name,
      options,
      placeholder,
      searchable,
      small,
      valueKey
    } = this.props

    const { input, meta } = field

    let SelectComponent = ReactSelect
    let specificProps = {}

    if (this.props.getOptions) {
      SelectComponent = creatable
        ? ReactSelect.AsyncCreatable
        : ReactSelect.Async

      specificProps = {
        loadOptions: this.getOptions,
        autocomplete: true,
        searchable: true
        // cache: false
      }
    } else {
      SelectComponent = creatable ? ReactSelect.Creatable : ReactSelect

      specificProps = {
        options,
        autocomplete,
        promptTextCreator: creatable ? promptTextCreator : undefined
      }
    }

    return (
      <div
        className={cx(styles.controls, {
          'has-error': meta.touched && meta.error,
          [styles.small]: small,
          [styles.disabled]: disabled
        })}
      >
        <div className={styles.selectWrapper}>
          {inline && this.renderLabel()}

          <SelectComponent
            backspaceToRemoveMessage={backspaceToRemoveMessage}
            className="form-control--select"
            clearable={clearable}
            disabled={disabled}
            id={name}
            // ignoreAccents={ignoreAccents}
            labelKey={labelKey}
            multi={multi}
            noResultsText={noResultsText}
            onBlur={event => this.handleBlur(field, event)}
            onChange={obj => this.handleChange(field, obj)}
            onFocus={event => this.handleFocus(field, event)}
            onInputChange={val => this.handleInputChange(field, val)}
            placeholder={placeholder}
            searchable={searchable}
            value={input.value}
            valueKey={valueKey}
            {...specificProps}
            {...this.props}
          />

          {input.value &&
            clearable &&
            <button
              type="button"
              className={styles.btnClear}
              onClick={() => this.handleChange(field, { value: null })}
            >
              <span className={`ico ico--clear ${styles.ico}`} />
            </button>}
        </div>

        <FieldError
          inlineLabelWidth={inlineLabelWidth}
          toShow={meta.touched && meta.error}
          message={meta.error}
        />
      </div>
    )
  };

  renderLabel() {
    const {
      label,
      name,
      labelless,
      intlKey,
      inlineLabelWidth,
      inline
    } = this.props
    const { isFocused } = this.state

    const srOnlyClass = labelless ? 'sr-only' : ''

    return (
      <label
        htmlFor={name}
        className={cx('control-label', {
          [srOnlyClass]: srOnlyClass,
          [styles.isFocused]: isFocused,
          [styles.inline]: inline
        })}
        style={{ minWidth: inlineLabelWidth }}
      >
        {intlKey
          ? <FormattedHTMLMessage id={intlKey} defaultMessage={label} />
          : label}
      </label>
    )
  }

  render() {
    const { hasFormGroup, inline, name } = this.props

    const formGroupClass = hasFormGroup ? 'form-group' : ''

    return (
      <div className={formGroupClass}>
        {!inline && this.renderLabel()}

        <Field name={name} {...this.props} component={this.renderField} />
      </div>
    )
  }
}
