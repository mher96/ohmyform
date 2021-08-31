import React from 'react'
import Checked from './check'

type ContentPropsType = {
  buttonText?: string
  background?: string
  color?: string
  checked: boolean
  children: JSX.Element
  id: string
}

export const Content = ({
  checked = false,
  buttonText,
  id,
  children,
}: ContentPropsType): JSX.Element => {
  return (
    <>
      <div
        style={{
          fontWeight: 'unset',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            marginRight: '8px',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            color: !checked ? buttonText : 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: checked ? buttonText : 'white',
          }}
        >
          {id}
        </span>
        {children}
      </div>
      {checked && <Checked color={buttonText} />}
    </>
  )
}
