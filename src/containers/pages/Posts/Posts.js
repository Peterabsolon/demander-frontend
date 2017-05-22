import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Feed } from 'containers/misc'
import { PostFeedItem } from 'components/sections/posts'

import { apiPosts } from 'decorators/api'

@apiPosts({
  list: true
})
export default class Posts extends Component {
  static propTypes = {
    children: PropTypes.any,
    posts: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    handleFetchMore: PropTypes.func.isRequired
  };

  render() {
    const { posts } = this.props

    return (
      <Feed
        handleFetchMore={this.props.handleFetchMore}
        instance="posts"
        Item={PostFeedItem}
        items={posts.list}
        loaded={posts.loaded}
        loading={posts.listLoading}
        setFilter={this.props.setFilter}
      >
        {this.props.children}
      </Feed>
    )
  }
}
