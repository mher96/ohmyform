import { Form, Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledSelect } from '../../styled/select'
import { FieldTypeProps } from './type.props'

export const DropdownType: React.FC<FieldTypeProps> = ({
  field,
  design,
  urlValue,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onBlur = () => {},
}) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={urlValue || field.value || null}
      >
        <StyledSelect
          design={design}
          open={open}
          onBlur={(e) => {
            setOpen(false)
            onBlur(e)
          }}
          onFocus={() => setOpen(true)}
          onSelect={() => setOpen(false)}
        >
          {field.options
            .filter((option) => option.key === null)
            .map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.title || option.value}
              </Select.Option>
            ))}
        </StyledSelect>
      </Form.Item>
    </div>
  )
}
