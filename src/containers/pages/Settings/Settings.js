import React, { Component, PropTypes } from 'react'

// import { SettingsTags, SettingsAuthors } from 'components/'
import { SettingsTagsForm } from 'containers/forms/settings'

export default class Settings extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div>
        <SettingsTagsForm />

        {/* <SettingsAuthors /> */}
      </div>
    )
  }
}
