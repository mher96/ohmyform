import React from 'react'

type ArrowPropsType = {
  color?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Arrow = (props: ArrowPropsType) => {
  return (
    <svg color={props.color} style={{ marginLeft: '.15em' }} height="10" width="11">
      <path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path>
      <path d="M8 4v2H0V4z"></path>
    </svg>
  )
}

export default Arrow
