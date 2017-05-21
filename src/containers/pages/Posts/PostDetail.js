import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PostDetailForm } from 'containers/forms/posts'

import { apiPosts } from 'decorators/api'

@apiPosts({
  detail: true,
  list: true
})
export default class Post extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  };

  render() {
    return <PostDetailForm />
  }
}
