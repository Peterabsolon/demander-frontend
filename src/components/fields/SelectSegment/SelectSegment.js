import React, { Component } from "react";
import PropTypes from "prop-types";

import { Select } from "components/fields";

import { apiSegments } from "decorators/api";

@apiSegments({ list: true })
export default class SelectSegment extends Component {
  static propTypes = {
    onlyCreatable: PropTypes.bool,
    segments: PropTypes.object.isRequired
  };

  static defaultProps = {
    creatable: false
  };

  render = () => {
    const { onlyCreatable, segments } = this.props;

    let specificProps = {};

    if (onlyCreatable) {
      specificProps = {
        creatable: true,
        noResultsText: "",
        placeholder: "Názov tagu..."
      };
    } else {
      specificProps = {
        options: segments.state.list
      };
    }

    return (
      <Select
        searchable
        clearable
        // multi
        labelKey="title"
        valueKey="id"
        promptTextCreator={label => `Vytvoriť tag "${label}"`}
        {...this.props}
        {...specificProps}
      />
    );
  };
}
