import { Checkbox, Form, Input, Radio } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledButton } from '../../styled/checkbox'
import { FieldTypeProps } from './type.props'
import { Content } from '../../checkbocContent'

const alphabet: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

export const RadioType: React.FC<FieldTypeProps> = ({ field, design, urlValue }) => {
  const { t } = useTranslation()

  let initialValue: string = undefined
  const [checked, toggleChecked] = useState<string>('')

  if (field.value) {
    initialValue = field.value
  }

  if (urlValue) {
    initialValue = urlValue
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={field.options
          .map((option) => option.value)
          .find((value) => value === initialValue)}
        // valuePropName={'checked'}
        // getValueFromEvent={(checked: boolean) => (checked ? '1' : '0')}
        // getValueProps={(e: string) => ({ checked: !!e })}
      >
        <Radio.Group style={{ width: '100%' }}>
          {field.options
            .filter((option) => option.key === null)
            .map((option, i) => (
              <StyledButton
                key={i}
                background={design.colors.button}
                color={design.colors.buttonText}
                highlight={design.colors.buttonActive}
              >
                <Content
                  id={alphabet[i].toUpperCase()}
                  checked={checked === option.value}
                  buttonText={design.colors.buttonText}
                >
                  <span>{option.title}</span>
                </Content>
                <Radio
                  value={option.value}
                  onClick={() => toggleChecked(option.value)}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '100%',
                    opacity: '0',
                  }}
                />
              </StyledButton>
            ))}
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
