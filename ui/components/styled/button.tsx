import { Button, ButtonProps } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from './color.change'

interface Props extends ButtonProps {
  background: string
  highlight: string
  color: string
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Styled = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const StyledButton: React.FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>
}
