import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from './color.change'

interface Props extends ButtonProps {
  background: string
  highlight: string
  color: string
  keys?: string
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Styled = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 90px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 10%) 0px 3px 12px 0px;
  min-height: 48px;
  cursor: pointer;
  background: ${(props: Props) => props.background};
  color: ${(props: Props) => props.color};
  border-color: ${(props: Props) => darken(props.background, 10)};

  :hover {
    color: ${(props: Props) => props.highlight};
    background-color: ${(props: Props) => lighten(props.background, 10)};
    border-color: ${(props: Props) => darken(props.highlight, 10)};
  }
`

export const Submit: React.FC<Props> = ({ keys = 'Enter', children, ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Styled {...props}>{children}</Styled>
      <div
        style={{
          minWidth: '150%',
          position: 'absolute',
          left: '100%',
          top: 'calc(50% - .37em)',
          alignItems: 'center',
          fontSize: '.75em',
          color: props.color,
          lineHeight: '.75em',
          fontFamily: 'sans-serif',
          marginLeft: '.75em',
        }}
      >
        press <strong>{keys}</strong>
      </div>
    </div>
  )
}
