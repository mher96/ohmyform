import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledInput } from '../../styled/input'
import { FieldTypeProps } from './type.props'

export const EmailType: React.FC<FieldTypeProps> = ({
  field,
  design,
  urlValue,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onBlur = () => {},
}) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: t('validation:valueRequired') },
          { type: 'email', message: t('validation:invalidEmail') },
        ]}
        initialValue={urlValue || field.value}
      >
        <StyledInput
          onBlur={onBlur}
          placeholder="name@example.com"
          design={design}
          allowClear
          size={'large'}
        />
      </Form.Item>
    </div>
  )
}
