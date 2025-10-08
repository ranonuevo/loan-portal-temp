import * as FORM from '@/components/forms'
import {  FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../form'
import { FieldConfig } from '../index'
import React from 'react'

export type Props = {
  name: string,
  fieldArrayName?: string | null,
  fieldsConfig: FieldConfig[],
  hookForm: unknown
}

export const FieldRenderer = ({
  name,
  fieldArrayName,
  fieldsConfig,
  hookForm
}: Props) => {
  let fieldConfig: FieldConfig | undefined = undefined
  let fieldArrayConfig: { name: string; index: number; child: string } | undefined

  if (fieldArrayName) {
    const splitName = fieldArrayName.split('.')
    const arrayName = splitName[0]
    const arrayChildName = splitName[2]
    fieldArrayConfig = {
      name: arrayName,
      index: Number(splitName[1]),
      child: arrayChildName
    }
    const parentField = fieldsConfig.find(f => f.name === arrayName) as unknown as { childFields?: Array<{ name: string }> } | undefined
    if (parentField) {
      const childFields = (parentField?.childFields || []) as Array<{ name: string }>
      fieldConfig = childFields.find((aF) => aF.name === arrayChildName) as unknown as FieldConfig | undefined
      if (!fieldConfig) return `Config for child '${name}' not found.`
    }
  } else {
    fieldConfig = fieldsConfig.find(f => f.name === name)
  }

  if (!fieldConfig) return `Config for '${name}' not found.`

  
  const { control, watch } = hookForm as { control: unknown; watch: () => unknown }

  // ##### Disabled thing
  let isFieldDisabled: boolean = false
  if (fieldConfig && 'isDisabled' in fieldConfig) {
    if (typeof fieldConfig.isDisabled === 'function') {
      const values = watch()
      const paramIndex: number | undefined = fieldArrayName ? fieldArrayConfig?.index : undefined
      const paramName = fieldArrayName ? (fieldArrayConfig?.name ?? name) : name
      isFieldDisabled = fieldConfig.isDisabled(values as Record<string, unknown>, paramName, paramIndex)
    } else {
      isFieldDisabled = fieldConfig.isDisabled === true
    }
  }
  // ##### End disabled thing


  const renderField = (FieldComponent: React.ComponentType<any>) => {
    return (
      <FormField
        name={fieldArrayName || name}
        control={control as never}
        render={({ field, fieldState }) => {
          const hasError = Boolean(fieldState?.error?.message)
          const params = {
            ...field,
            ...fieldConfig.fieldProps,
            disabled: isFieldDisabled,
            hasError
          }

          // if ([FORM.TYPE_CHECKBOX, FORM.TYPE_RADIO_GROUP, FORM.TYPE_DROPDOWN].includes(fieldConfig.type)) {
          //   params = {...params, hasError}
          // }

          return (
            <FormItem>
              {fieldConfig.label? ( <FormLabel>{ fieldConfig.label }</FormLabel> ) : ''}
              <FormControl>
                <FieldComponent {...params} />
              </FormControl>
              {fieldConfig.description? (<FormDescription>{ fieldConfig.description }</FormDescription>): ''}
              <FormMessage />
            </FormItem>
          )
        }}
      />
    )
  }
  
  switch (fieldConfig.type) {
    case FORM.TYPE_INPUT:
      return renderField(FORM.Input)
    case FORM.TYPE_DIGITS:
      return renderField(FORM.Digits)
    case FORM.TYPE_TEXTAREA:
      return renderField(FORM.Textarea)
    case FORM.TYPE_CHECKBOX:
      return renderField(FORM.CheckBox)
    case FORM.TYPE_RADIO_GROUP:
      return renderField(FORM.RadioGroup)
    case FORM.TYPE_DROPDOWN:
      return renderField(FORM.DropDown)
    default:
      return null
  }
}