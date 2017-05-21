import React, { Component } from 'react'
import { get } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { PAGE_SIZE } from 'constants/misc'
import PropTypes from 'prop-types'

import { schema } from 'models/posts'

import * as postsApi from 'redux/modules/api/posts'
import * as appActions from 'redux/modules/app'

const decorator = (config = {}) =>
  ComposedComponent => {
    @connect(
      ({ api }) => ({
        posts: api.posts
      }),
      { ...postsApi, ...appActions }
    )
    class Posts extends Component {
      static propTypes = {
        posts: PropTypes.object.isRequired,
        params: PropTypes.object,
        setParams: PropTypes.func.isRequired,
        notification: PropTypes.func.isRequired,
        createPost: PropTypes.func.isRequired,
        getPosts: PropTypes.func.isRequired,
        getPost: PropTypes.func.isRequired
      };

      componentWillMount() {
        const { posts, params } = this.props

        config.list && !posts.loaded && this.props.getPosts(posts)
        config.detail && get(params, 'id') && this.handleGetPost(params.id)
      }

      componentWillReceiveProps(nextProps) {
        this.handleLoadPosts(nextProps)
        this.handleLoadPost(nextProps)
      }

      /**
       * Fetch list on filters/pagination change
       */
      handleLoadPosts = nextProps => {
        const { posts } = this.props
        const { filter, offset, limit, sort } = nextProps.posts

        if (posts.limit !== limit) {
          config.list &&
            this.props.getPosts(nextProps.posts, {
              noLoading: true
            })
        } else if (
          posts.filter !== filter ||
          posts.offset !== offset ||
          posts.sort !== sort
        ) {
          config.list && this.props.getPosts(nextProps.posts)
        }
      };

      /**
       * Fetch detail on route change
       */
      handleLoadPost = nextProps => {
        const currentId = get(this.props, 'params.id')
        const nextId = get(nextProps, 'params.id')

        if (config.detail && nextId && currentId !== nextId) {
          this.props.getPost(nextId)
        }
      };

      handleGetPost = id => this.props.getPost(id);

      /**
       * Submit a new post
       */
      handleCreatePost = async model => {
        const { posts } = this.props
        const data = schema(model)

        const post = await this.props.createPost(data)

        await this.props.getPosts(posts)
        const newId = post.body.id

        this.props.notification('Článok úspešne vytvorený.', 'success')

        // TODO: Form leave hook gets triggered without this for some reason...
        setTimeout(() => browserHistory.push(`/clanky/${newId}`), 0)
      };

      /**
       * TODO: Edit a post
       */
      handleEditPost = async model => {
        const { posts } = this.props
        const postId = posts.detail.id
        const data = schema(model)

        await this.props.updatePost(postId, data)
        await this.props.getPosts(posts, { noLoading: true })

        this.props.notification('Článok úspešne upravená.', 'success')
      };

      handleDeletePost = async () => {
        const promptConfirmed = confirm('Naozaj zmazať článok?')

        if (promptConfirmed) {
          const { posts } = this.props
          const postId = posts.detail.id

          await this.props.deletePost(postId)
          await this.props.getPosts(posts)

          this.props.notification('Článok úspešne zmazaný.', 'success')

          // TODO: Form leave hook gets triggered without this for some reason...
          setTimeout(() => browserHistory.push('/clanky'), 0)
        }
      };

      /**
       * Fetch more items for the infinite scroll feed
       */
      handleFetchMore = () => {
        const { posts } = this.props
        const { limit, count } = posts

        const hasMore = Math.abs(limit + PAGE_SIZE) <= PAGE_SIZE + count

        hasMore && this.props.setParams({ limit: limit + PAGE_SIZE })
      };

      handleGetPostExcelFile = () => {
        this.props.notification('Backend not ready yet', 'error')
      };

      render() {
        return (
          <ComposedComponent
            {...this.props}
            handleCreatePost={this.handleCreatePost}
            handleEditPost={this.handleEditPost}
            handleDeletePost={this.handleDeletePost}
            handleFetchMore={this.handleFetchMore}
            handleGetPostExcelFile={this.handleGetPostExcelFile}
          />
        )
      }
    }

    return Posts
  }

export default decorator
