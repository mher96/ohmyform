import { Form, message, FormInstance } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useRef } from 'react'
import {
  FormPublicDesignFragment,
  FormPublicFieldFragment,
} from '../../graphql/fragment/form.public.fragment'
import { StyledButton } from '../styled/button'
import { StyledH1 } from '../styled/h1'
import { StyledMarkdown } from '../styled/markdown'
import { useRouter } from '../use.router'
import { fieldTypes } from './types'
import { TextType } from './types/text.type'
import { FieldTypeProps } from './types/type.props'
import { Submit } from '../styled/submit'
import Arrow from '../arrow'
import Checked from 'components/check'

interface Props {
  item: number
  field: FormPublicFieldFragment
  design: FormPublicDesignFragment
  nextAction?: boolean
  prevAction?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: (data: any) => void
  next: () => void
  prev: () => void
}

export const Field: React.FC<Props> = ({
  item,
  field,
  save,
  design,
  next,
  prev,
  nextAction = false,
  prevAction = false,
  ...props
}) => {
  const [form] = useForm()
  const router = useRouter()
  const fromRef = useRef<FormInstance>()

  const FieldInput: React.FC<FieldTypeProps> = fieldTypes[field.type] || TextType

  const finish = (data) => {
    console.log('received field data', data)
    save(data)
    next()
  }

  const error = async () => {
    await message.error('Check inputs!')
  }

  const getUrlDefault = (): string => {
    if (router.query[field.id]) {
      return router.query[field.id] as string
    }

    if (router.query[field.slug]) {
      return router.query[field.slug] as string
    }

    return undefined
  }

  return (
    <Form
      form={form}
      onFinish={finish}
      onFinishFailed={error}
      ref={fromRef}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '700px',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 32,
          justifyContent: 'center',
        }}
      >
        <StyledH1 design={design} type={'question'}>
          <div
            style={{
              position: 'absolute',
              height: '100%',
              top: 0,
              left: '-1.5em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            {/* {item + 1} */}
            <Arrow />
          </div>
          {field.title}
        </StyledH1>
        {field.description && (
          <StyledMarkdown design={design} type={'question'} source={field.description} />
        )}

        <div style={{ fontSize: '30px' }}>
          <FieldInput
            onBlur={(e) => save(fromRef.current.getFieldsValue())}
            design={design}
            field={field}
            urlValue={getUrlDefault()}
          />
        </div>
      </div>
      <div
        style={{
          width: '700px',
          maxWidth: '100%',
          padding: 32,
          paddingTop: 0,
          marginBottom: '100px',
          display: 'flex',
        }}
      >
        {/* {prevAction && (
          <StyledButton
            background={design.colors.button}
            color={design.colors.buttonText}
            highlight={design.colors.buttonActive}
            onClick={prev}
          >
            {'Previous'}
          </StyledButton>
        )} */}
        {/* <div style={{ flex: 1 }} /> */}
        <Submit
          background={design.colors.button}
          color={design.colors.buttonText}
          highlight={design.colors.buttonActive}
          size={'large'}
          onClick={form.submit}
          keys={nextAction ? 'Enter ↵' : 'Cmd ⌘ + Enter ↵'}
        >
          {nextAction ? (
            <span style={{ fontWeight: 700 }}>
              {' '}
              Ok <Checked color={design.colors.buttonText} />{' '}
            </span>
          ) : (
            'Submit'
          )}
        </Submit>
      </div>
    </Form>
  )
}
