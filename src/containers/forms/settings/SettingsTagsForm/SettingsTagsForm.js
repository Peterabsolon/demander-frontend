import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Title, Button } from 'components/misc'
import { Form } from 'components/layout'
import { SelectTags } from 'components/fields'

import { form } from 'decorators'
import { apiCommon } from 'decorators/api'

import style from './settings-tags-form.styl'
import validate from './settings-tags-form.validation'

const LABEL_WIDTH = '150px'
const FORM_NAME = 'settingsTags'

@apiCommon({ tags: true })
@form({
  form: FORM_NAME,
  initialProps: 'posts.detail',
  validate,
  warn: validate
})
export default class SettingsTagsForm extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    isCreatingTags: PropTypes.bool.isRequired,
    duplicateTags: PropTypes.array.isRequired,
    handleCreateTag: PropTypes.func.isRequired,
    handleDeleteTag: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  state = { tagIdToDelete: null };

  handleDeleteTag = tagId => {
    this.setState({ tagIdToDelete: tagId })

    this.props.handleDeleteTag(tagId)
  };

  render() {
    const {
      common,
      handleSubmit,
      handleCreateTag,
      duplicateTags,
      isCreatingTags
    } = this.props
    const { tagIdToDelete } = this.state

    const tags = common.tags.list || []

    return (
      <Form mediumWide onSubmit={handleSubmit(handleCreateTag)}>
        <Title h2>Tagy</Title>

        <SelectTags
          inline
          inlineLabelWidth={LABEL_WIDTH}
          onlyCreatable
          label="Pridať tagy"
          placeholder="Názvy tagov"
          name="tags"
        />

        <div
          className={cx(style.duplicateTags, {
            [style.duplicateTagsVisible]: duplicateTags.length > 0
          })}
        >
          Tieto tagy už existujú:
          {duplicateTags.map(tag => (
            <div className={style.dupliciteTag}>{tag}</div>
          ))}
        </div>

        <Button
          isLoading={isCreatingTags}
          type="submit"
          offsetLeft={LABEL_WIDTH}
        >
          Pridať tagy
        </Button>

        <span className={style.tagsTitle}>Používané tagy</span>

        <div className={style.tagsList}>
          {tags.length > 0 &&
            tags.map((tag, index) => {
              const isLast = index === tags.length - 1

              return (
                <div
                  key={tag.id}
                  className={cx(style.tag, {
                    [style.tagDeleted]: tag.id === tagIdToDelete
                  })}
                >
                  <h3>{tag.name} {tag.id}</h3>

                  <button
                    type="button"
                    onClick={() => this.handleDeleteTag(tag.id)}
                  >
                    ✕
                  </button>

                  {!isLast && <h3 className={style.comma}>,</h3>}
                </div>
              )
            })}
        </div>
      </Form>
    )
  }
}
