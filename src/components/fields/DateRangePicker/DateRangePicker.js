import React, { Component, PropTypes } from 'react'
import { get } from 'lodash'
import { injectIntl } from 'react-intl'
import cx from 'classnames'
import moment from 'moment'
import { Field } from 'redux-form'
import { DateRangePicker as RDDateRangePicker } from 'react-dates'

import { FieldError, FieldLabel } from 'components/fields/__elements__'

import style from './date-range-picker.styl'

@injectIntl
export default class DateRangePicker extends Component {
  // Disable Eslint to declare propTypes for FieldError and FieldLabel
  /* eslint-disable */
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    optional: PropTypes.bool,
    intlKey: PropTypes.string,
    alwaysShowError: PropTypes.bool,
    placeholderFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    intl: PropTypes.object.isRequired,
    initialVisibleMonth: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    isDayBlocked: PropTypes.func,
    inline: PropTypes.bool,
    inlineLabelWidth: PropTypes.string
  };
  /* eslint-enable */

  state = {
    focusedInput: null,
    shouldChange: false
  };

  handleChange = (values, field) => {
    const dates = {
      dateFrom: moment(values.startDate).format('YYYY-MM-DD'),
      dateTo: values.endDate && moment(values.endDate).format('YYYY-MM-DD')
    }

    this.props.onChange && this.props.onChange(dates)

    field.input.onChange(dates)
  };

  /**
   * Call parent onChange handler only when both
   * dates are set to prevent unnecessary rerender
   */
  handleChangeBoth = (values, field) => {
    const { shouldChange } = this.state

    const current = {
      dateFrom: get(field, 'input.value.dateFrom'),
      dateTo: get(field, 'input.value.dateTo')
    }

    const dates = {
      dateFrom: values.startDate,
      dateTo: values.endDate
    }

    if (!current.dateFrom.isSame(dates.dateFrom)) {
      field.input.onChange({ dateFrom: dates.dateFrom })
      this.setState({ shouldChange: true })
    }

    if (shouldChange && this.props.onChange) {
      field.input.onChange(dates)
      this.setState({ shouldChange: false })

      this.props.onChange(dates)
    }
  };

  handleFocusChange = focusedInput => this.setState({ focusedInput });

  handleOpen = () => this.setState({ focusedInput: 'startDate' });

  renderField = field => {
    const { focusedInput } = this.state
    const {
      intl: { formatMessage },
      // initialVisibleMonth,
      inlineLabelWidth,
      inline,
      placeholderFrom,
      placeholderTo,
      alwaysShowError
    } = this.props

    const { input, meta } = field
    const { touched, error } = meta

    const values = {
      dateFrom: get(input, 'value.dateFrom')
        ? moment(input.value.dateFrom)
        : null,
      dateTo: get(input, 'value.dateTo') ? moment(input.value.dateTo) : null
    }

    const dates = {
      dateFrom: values.dateFrom && values.dateFrom._isValid
        ? values.dateFrom
        : null,
      dateTo: values.dateTo && values.dateTo._isValid ? values.dateTo : null
    }

    const showError = alwaysShowError ? meta.error : meta.touched && meta.error

    let errorMessage = meta.error

    if (get(meta, 'error.intlKey')) {
      if (get(meta, 'error.extra')) {
        errorMessage = `${formatMessage(meta.error.intlKey)} ${meta.error.extra}`
      } else {
        errorMessage = formatMessage(meta.error.intlKey)
      }
    }

    const placeholderFromValue = placeholderFrom &&
      (typeof placeholderFrom === 'object'
        ? formatMessage(placeholderFrom)
        : placeholderFrom)

    const placeholderToValue = placeholderTo &&
      (typeof placeholderTo === 'object'
        ? formatMessage(placeholderTo)
        : placeholderTo)

    return (
      <div
        className={cx(style.field, {
          [style.hasError]: touched && error,
          [style.showSelected]: dates.dateTo
        })}
      >
        <div className={style.fieldWrapper}>
          {inline && <FieldLabel {...this.props} />}

          <RDDateRangePicker
            // isDayBlocked={
            //   this.props.isDayBlocked ? this.props.isDayBlocked : () => false
            // }
            // isOutsideRange={() => false}
            startDate={dates.dateFrom}
            endDate={dates.dateTo}
            focusedInput={focusedInput}
            onFocusChange={this.handleFocusChange}
            // initialVisibleMonth={() => initialVisibleMonth || moment()}
            onDatesChange={selectedDates =>
              this.handleChange(selectedDates, field)}
            startDatePlaceholderText={placeholderFromValue}
            endDatePlaceholderText={placeholderToValue}
            displayFormat="DD.MM.YYYY"
          />

          <div onClick={this.handleOpen} className={style.icon}>
            <i className="ico ico--calendar" />
          </div>
        </div>

        <FieldError
          inlineLabelWidth={inlineLabelWidth}
          toShow={showError}
          message={errorMessage}
        />
      </div>
    )
  };

  render() {
    const { name, inline } = this.props
    const { focusedInput } = this.state

    return (
      <div
        className={cx(style.wrapper, 'form-group', {
          [style.focused]: focusedInput
        })}
      >
        {!inline && <FieldLabel {...this.props} />}

        <Field
          name={name}
          component={this.renderField}
          {...this.props}
          {...this.state}
        />
      </div>
    )
  }
}
