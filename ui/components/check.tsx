import React from 'react'

type ArrowPropsType = {
  color?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Checked = (props: ArrowPropsType) => {
  return (
    <svg fill={props.color} style={{ marginLeft: '.15em' }} height="13" width="16">
      <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
    </svg>
  )
}

export default Checked
