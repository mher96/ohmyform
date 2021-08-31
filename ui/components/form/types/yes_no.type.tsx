import { Checkbox, Form } from 'antd'
import React, { useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledButton } from '../../styled/checkbox'
import { FieldTypeProps } from './type.props'
import { Content } from '../../checkbocContent'

export const YesNoType: React.FC<FieldTypeProps> = ({ field, urlValue, design }) => {
  const { t } = useTranslation()
  const [checked, toggleChecked] = useState<boolean>(false)

  let initialValue = !!field.value

  if (urlValue !== undefined) {
    initialValue = !!urlValue
  }

  return (
    <div style={{ width: '100%' }}>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
        valuePropName={'checked'}
        getValueFromEvent={(checked: boolean) => (checked ? '1' : '')}
        getValueProps={(e: string) => ({ checked: !!e })}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <StyledButton
            onClick={() => toggleChecked(true)}
            background={design.colors.button}
            color={design.colors.buttonText}
            highlight={design.colors.buttonActive}
          >
            <Content id="A" checked={checked} buttonText={design.colors.buttonText}>
              <span>Yes</span>
            </Content>
            <Checkbox
              value={true}
              checked={checked}
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
          <StyledButton
            onClick={() => toggleChecked(false)}
            background={design.colors.button}
            color={design.colors.buttonText}
            highlight={design.colors.buttonActive}
          >
            <Content id="B" checked={!checked} buttonText={design.colors.buttonText}>
              <span>No</span>
            </Content>
          </StyledButton>
        </div>
      </Form.Item>
    </div>
  )
}
