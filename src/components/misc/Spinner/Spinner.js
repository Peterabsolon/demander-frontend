import React, { PropTypes } from 'react'
import cx from 'classnames'

import style from './spinner.styl'

const Spinner = ({ className, white }) => {
  return (
    <div
      className={cx(className, {
        [style.white]: white
      })}
    >
      <div className={style.loader}>
        <svg className={style.circular} viewBox="25 25 50 50">
          <circle
            className={style.path}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="5"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
  white: PropTypes.bool
}

export default Spinner
