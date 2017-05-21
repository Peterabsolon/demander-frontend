import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Input,
  Textarea,
  SelectCity,
  SelectTags // Select
} from 'components/fields'
import { Button, LineDivider } from 'components/misc'
import { Form } from 'components/layout'

import { form } from 'decorators'
import { apiPosts } from 'decorators/api'

import validate from './post-new-form.validation'

const LABEL_WIDTH = '150px'
const FORM_NAME = 'postNew'

@apiPosts()
@connect(() => ({
  initialValues: {
    author: 'Admin',
    contentUrl: 'http://',
    postTypeId: 'article'
  }
}))
@form({
  form: FORM_NAME,
  validate
})
export default class PostNewForm extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCreatePost: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, handleCreatePost, posts } = this.props

    const { submitting } = posts

    return (
      <Form wide onSubmit={handleSubmit(handleCreatePost)}>
        {/* <Select
          searchable={false}
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Typ článku"
          name="postTypeId"
          placeholder=""
          options={[
            { label: 'Článok z internetu', value: 'article' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' }
          ]}
        /> */}

        <Textarea
          disableLineBreaks
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Text (nadpis)"
          name="title"
          titleStyle
          required
        />

        <Input
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Link na článok"
          name="contentUrl"
          required
        />

        <Input
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Link na obrázok"
          name="imageUrl"
          required
        />

        <LineDivider />

        <Input
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Autor"
          name="author"
          required
        />

        <SelectCity
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Región"
          name="cities"
        />

        <SelectTags
          inline
          inlineLabelWidth={LABEL_WIDTH}
          label="Tagy"
          name="tags"
        />

        <Button
          isLoading={submitting}
          label="Vytvoriť článok"
          offsetLeft={LABEL_WIDTH}
          type="submit"
        />
      </Form>
    )
  }
}
