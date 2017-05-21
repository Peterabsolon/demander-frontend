import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import cx from 'classnames'
import uuid from 'uuid'
import moment from 'moment'
import { Field } from 'redux-form'
import { SingleDatePicker } from 'react-dates'

import { FieldError, FieldLabel } from 'components/fields/__elements__'

import style from './date-picker.styl'

@injectIntl
export default class DatePicker extends Component {
  // Disable eslint to declare propTypes for FieldError and FieldLabel
  /* eslint-disable */
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    intl: PropTypes.object.isRequired,
    inline: PropTypes.bool,
    required: PropTypes.bool,
    inlineLabelWidth: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func
  };
  /* eslint-enable */

  state = {
    date: null,
    focused: false
  };

  handleChange = (date, field) => {
    if (this.props.onChange) {
      this.props.onChange(date)
    }

    field.input.onChange(date)
  };

  handleFocusChange = ({ focused }) => this.setState({ focused });

  handleSetInitialMonth = field =>
    field.input.value ? moment(field.input.value) : moment();

  handleIsDayBlocked = date => date < moment().startOf('day');

  handleOpen = () => this.setState({ focused: true });

  renderField = field => {
    const {
      intl: { formatMessage },
      placeholder,
      inline,
      inlineLabelWidth
    } = this.props
    const { focused } = this.state

    const { input, meta } = field
    const { touched, error } = meta

    const date = input.value ? moment(input.value) : null

    let placeholderValue

    if (placeholder) {
      placeholderValue = typeof placeholder === 'object'
        ? formatMessage(placeholder)
        : placeholder
    }

    return (
      <div
        className={cx({
          [style.hasError]: touched && error
        })}
      >
        <div className={style.fieldWrapper}>
          {inline && <FieldLabel {...this.props} />}

          <SingleDatePicker
            id={uuid.v1()}
            isOutsideRange={() => false}
            numberOfMonths={1}
            date={date}
            focused={focused}
            onFocusChange={this.handleFocusChange}
            // initialVisibleMonth={() => this.handleSetInitialMonth(field)}
            isDayBlocked={this.handleIsDayBlocked}
            onDateChange={selectedDate =>
              this.handleChange(selectedDate, field)}
            placeholder={placeholderValue}
            displayFormat="DD.MM.YYYY"
          />

          <div onClick={this.handleOpen} className={style.icon}>
            <i className="ico ico--calendar" />
          </div>
        </div>

        <FieldError
          inlineLabelWidth={inlineLabelWidth}
          toShow={meta.touched && meta.error}
          message={meta.error}
        />
      </div>
    )
  };

  render() {
    const { name, inline } = this.props
    const { focused } = this.state

    return (
      <div
        className={cx(style.wrapper, 'form-group', {
          [style.focused]: focused
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
