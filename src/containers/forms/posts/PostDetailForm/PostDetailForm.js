import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { LineDivider, Button } from 'components/misc'
import { SelectTags, SelectCity, Input, Textarea } from 'components/fields'
import { Form } from 'components/layout'

import { form } from 'decorators'
import { apiPosts } from 'decorators/api'

const FORM_NAME = 'postEdit'

@apiPosts({
  detail: true
})
@form({
  form: FORM_NAME,
  initialProps: 'posts.detail'
})
export default class PostDetailForm extends Component {
  static propTypes = {
    handleEditPost: PropTypes.func.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
  };

  render() {
    const loading = get(this.props.posts, 'state.detailLoading')

    return (
      <Form
        onSubmit={this.props.handleSubmit(this.props.handleEditPost)}
        loading={loading}
      >
        <Textarea
          disableLineBreaks
          label="Text (nadpis)"
          name="title"
          titleStyle
        />

        <Input label="Link na článok" name="contentUrl" />

        <Input label="Link na obrázok" name="imageUrl" />

        <LineDivider />

        <Input label="Autor" name="author" />

        <SelectCity label="Región" name="cities" />

        <SelectTags label="Tagy" name="tags" className="base-margin--bottom" />

        <Button block type="submit" label="Upraviť" />

        <Button
          danger
          block
          onClick={this.props.handleDeletePost}
          label="Zmazať článok"
        />
      </Form>
    )
  }
}
