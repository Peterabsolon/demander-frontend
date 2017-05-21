/**
 * TODO: Separate into individual decorators
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import * as commonApi from 'redux/modules/api/common'
import * as appActions from 'redux/modules/app'

const decorator = (config = {}) =>
  ComposedComponent => {
    @connect(
      ({ api }) => ({
        common: api.common
      }),
      { ...commonApi, ...appActions, reset }
    )
    class Common extends Component {
      static propTypes = {
        common: React.PropTypes.object.isRequired,
        notification: React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired,
        createTag: React.PropTypes.func.isRequired,
        getTags: React.PropTypes.func.isRequired
      };

      state = {
        duplicateTags: [],
        isCreatingTags: false
      };

      componentWillMount = () => {
        const { common, getTags } = this.props

        if (config.tags) {
          !common.tags.loaded && getTags()
        }
      };

      findTagDuplicates = model => {
        const { common: { tags } } = this.props

        const duplicateTags = []

        if (model.tags) {
          model.tags.map(tag => {
            tags.list.length > 0 &&
              tags.list.map(existingTag => {
                if (tag.name === existingTag.name) {
                  duplicateTags.indexOf(existingTag.name) < 0 &&
                    duplicateTags.push(existingTag.name)
                }
              })
          })
        }

        return duplicateTags
      };

      // TODO: Figure out more UX friendly way to do this
      handleCreateTag = async model => {
        this.setState({ duplicateTags: [] })

        const duplicateTags = this.findTagDuplicates(model)

        if (duplicateTags.length > 0) {
          this.setState({ duplicateTags })
        } else if (model.tags.length > 0) {
          this.setState({ isCreatingTags: true })

          Promise.all(
            model.tags.map(tag => this.props.createTag({ name: tag.name }))
          ).then(() => {
            const message = model.tags.length > 1
              ? 'Tagy úspešne pridané'
              : 'Tag úspešne pridaný'

            this.props.notification(message, 'success')
            this.props.getTags()
            this.props.reset('settingsTags')

            this.setState({ isCreatingTags: false })
          })
        }
      };

      handleDeleteTag = async tagId => {
        await this.props.deleteTag(tagId)
        await this.props.getTags()
      };

      render() {
        return (
          <ComposedComponent
            {...this.props}
            {...this.state}
            handleCreateTag={this.handleCreateTag}
            handleDeleteTag={this.handleDeleteTag}
          />
        )
      }
    }
    return Common
  }

export default decorator
