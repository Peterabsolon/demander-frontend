import React, { Component } from 'react'
import uuid from 'uuid'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import MUIPopover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import { Button } from 'components/misc'

const itemsShape = PropTypes.arrayOf(
  PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string
  })
)

export default class PopoverMenu extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    to: PropTypes.string,
    items: itemsShape,
    extraItems: itemsShape
  }

  static defaultProps = {
    items: []
  }

  state = { isOpen: false }

  handleOpen = event =>
    this.setState({ isOpen: true, anchorEl: event.currentTarget })

  handleClose = () => this.setState({ isOpen: false })

  handleRedirectTo = to => {
    browserHistory.push(to)

    this.handleClose()
  }

  render() {
    const { className, label, to, icon, items, extraItems } = this.props
    const { isOpen, anchorEl } = this.state

    return (
      <div className={className}>
        <Button
          label={label}
          icon={icon}
          noBackground
          white
          onClick={!to ? this.handleOpen : () => {}}
          to={to}
        />

        <MUIPopover
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          open={isOpen}
          onRequestClose={this.handleClose}
        >
          <Menu>
            {items.map(item =>
              <MenuItem
                key={uuid.v1()}
                onTouchTap={
                  item.onClick
                    ? item.onClick
                    : () => this.handleRedirectTo(item.to)
                }
                primaryText={item.label}
              />
            )}

            {extraItems.length > 0 && <Divider />}

            {extraItems.map(item =>
              <MenuItem
                key={uuid.v1()}
                onTouchTap={item.onClick && item.onClick}
                primaryText={item.label}
              />
            )}
          </Menu>
        </MUIPopover>
      </div>
    )
  }
}
