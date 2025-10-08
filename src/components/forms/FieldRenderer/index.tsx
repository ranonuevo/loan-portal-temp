import * as FORM from '@/components/forms'
import {  useFormField, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../form'
import { FieldConfig } from '../index'
import React from 'react'

export type Props = {
  name: string,
  fieldArrayName?: string | null,
  fieldsConfig: FieldConfig[],
  hookForm: any
}

export const FieldRenderer = ({
  name,
  fieldArrayName,
  fieldsConfig,
  hookForm
}: Props) => {
  let fieldConfig: FieldConfig | undefined = undefined
  let fieldArrayConfig: any

  if (fieldArrayName) {
    const splitName = fieldArrayName.split('.')
    const arrayName = splitName[0]
    const arrayChildName = splitName[2]
    fieldArrayConfig = {
      name: arrayName,
      index: splitName[1],
      child: arrayChildName
    }
    const parentField: any = fieldsConfig.find(f => f.name === arrayName)
    if (parentField) {
      const childFields: any[] = parentField?.childFields
      fieldConfig = childFields.find((aF: any) => aF.name === arrayChildName)
      if (!fieldConfig) return `Config for child '${name}' not found.`
    }
  } else {
    fieldConfig = fieldsConfig.find(f => f.name === name)
  }

  if (!fieldConfig) return `Config for '${name}' not found.`

  
  const { control, watch } = hookForm

  // ##### Disabled thing
  let isFieldDisabled: boolean = false
  if (fieldConfig && 'isDisabled' in fieldConfig) {
    if (typeof fieldConfig.isDisabled === 'function') {
      const values = watch()
      let paramIndex = null
      let paramName = name

      if (fieldArrayName) {
        paramIndex = fieldArrayConfig.index
        paramName = fieldArrayConfig.name
      }
      isFieldDisabled = fieldConfig.isDisabled(values, paramName, paramIndex)
    } else {
      isFieldDisabled = fieldConfig.isDisabled === true
    }
  }
  // ##### End disabled thing


  const renderField = (FieldComponent: any) => {
    return (
      <FormField
        name={fieldArrayName || name}
        control={control}
        render={({ field }) => {
          const { error } = useFormField()
          const hasError = Boolean(error?.message)
          let params = {
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