import React, { Component } from 'react'
import { get, omit } from 'lodash'
import { connect } from 'react-redux'
import { FormattedHTMLMessage } from 'react-intl'
import cx from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'

import { FieldError } from 'components/fields/__elements__'

import style from './wysiwyg-editor.styl'

@connect(({ form }, { formName, name }) => ({
  form,
  value: get(form, `[${formName}].values.${name}`)
}))
export default class WysiwygEditor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    // For handling initial values
    /* eslint-disable */
    formName: PropTypes.string.isRequired,
    /* eslint-enable */
    label: PropTypes.string,
    intlKey: React.PropTypes.string,
    value: React.PropTypes.string,
    labelless: React.PropTypes.bool,
    disableLineBreaks: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    inlineLabelWidth: React.PropTypes.string,
    optional: React.PropTypes.bool,
    className: PropTypes.string,
    toolbarOnFocus: PropTypes.bool,
    inline: PropTypes.bool
  };

  state = {
    initialized: false,
    editorState: EditorState.createEmpty()
  };

  // componentWillMount = () => this.handleInitialize();
  //
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.value !== nextProps.value && this.state.initialized) {
  //     this.setState({ initialized: false })
  //   }
  // }
  //
  // componentDidUpdate = () => this.handleInitialize();
  //
  handleInitialize = () => {
    if (typeof document !== 'undefined') {
      const { initialized } = this.state
      const { value } = this.props

      if (!initialized && value) {
        const processedHTML = DraftPasteProcessor.processHTML(value)
        const contentState = ContentState.createFromBlockArray(processedHTML)

        this.setState({
          initialized: true,
          editorState: EditorState.createWithContent(contentState)
        })
      }
    }
  };

  handleEditorStateChange = (editorState, field) => {
    const { disableLineBreaks } = this.props

    const html = stateToHTML(editorState.getCurrentContent())
    const hasLineBreaks = Boolean(html.match(/(?:\r\n|\r|\n)/g))

    if (disableLineBreaks && hasLineBreaks) {
      return
    }

    field.input.onChange(html)
    this.setState({ editorState })
  };

  renderField = field => {
    const { editorState } = this.state
    const { toolbarOnFocus, disabled, inline, inlineLabelWidth } = this.props

    const { meta, input } = field

    const inputProps = omit(input, 'onChange')

    return (
      <div
        className={cx(style.controls, {
          [style.hasError]: meta.touched && meta.error,
          [style.disabled]: disabled
        })}
      >
        <div className={style.editorWrapper}>
          {inline && this.renderLabel()}

          <Editor
            {...inputProps}
            editorState={editorState}
            toolbarOnFocus={toolbarOnFocus}
            wrapperClassName={style.fieldWrapper}
            toolbarClassName={style.toolbar}
            editorClassName={style.editor}
            onEditorStateChange={state =>
              this.handleEditorStateChange(state, field)}
            toolbar={{
              options: ['link'],
              link: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                dropdownClassName: undefined,
                showOpenOptionOnHover: true,
                defaultTargetOption: '_self',
                options: ['link', 'unlink']
              }
            }}
          />
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
      intlKey,
      inline,
      optional,
      labelless,
      inlineLabelWidth
    } = this.props
    const srOnlyClass = labelless ? 'sr-only' : ''
    const { isFocused } = this.state

    return (
      <label
        htmlFor={name}
        className={cx('control-label', style.label, {
          [srOnlyClass]: srOnlyClass,
          [style.isFocused]: isFocused,
          [style.inline]: inline
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
      </label>
    )
  }

  render() {
    const { name, className, inline, loading } = this.props

    return (
      <div
        className={cx('form-group', style.wrapper, {
          [className]: className
        })}
      >
        {!inline && this.renderLabel()}

        <Field
          id={name}
          name={name}
          component={this.renderField}
          loading={loading}
        />
      </div>
    )
  }
}
