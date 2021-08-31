import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledTextareaInput } from '../../styled/textarea.input'
import { FieldTypeProps } from './type.props'

export const TextareaType: React.FC<FieldTypeProps> = ({ field, design, urlValue }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={urlValue || field.value}
      >
        <StyledTextareaInput
          placeholder="Type your answer here"
          design={design}
          allowClear
          autoSize
        />
      </Form.Item>
      <div
        style={{
          minWidth: '100%',
          textAlign: 'left',
          alignItems: 'center',
          fontSize: '12px',
          color: design.colors.button,
          lineHeight: '12px',
          fontFamily: 'sans-serif',
        }}
      >
        press <strong>Enter ↵ to make a line break</strong>
      </div>
    </div>
  )
}
