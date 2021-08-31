import { Input } from 'antd'
import { InputProps } from 'antd/lib/input/Input'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'
import { transparentize } from './color.change'

interface Props extends InputProps {
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(Input)`
  color: ${(props: Props) => props.design.colors.answer};
  border-color: ${(props: Props) => props.design.colors.answer};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;
  font-size: 30px !important;

  :focus {
    outline: ${(props: Props) => props.design.colors.answer} auto 5px;
  }

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answer};
  }

  &.ant-input-affix-wrapper {
    box-shadow: none;
  }

  input {
    font-size: 30px !important;
    background: none !important;
    color: ${(props: Props) => props.design.colors.answer};

    ::placeholder {
      color: ${(props: Props) => transparentize(props.design.colors.answer, 60)};
    }
  }

  .anticon {
    color: ${(props: Props) => props.design.colors.answer};
  }
`

export const StyledInput: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Field
      style={{
        fontSize: '30px !important',
        paddingRight: 0,
        paddingLeft: 0,
      }}
      placeholder="Type your answer here"
      {...props}
    >
      {children}
    </Field>
  )
}
