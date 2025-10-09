import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const purposeOptions = [
  { label: 'Demand', value: 'Demand', a:false },
  { label: 'Request', value: 'Request' },
  { label: 'Notify', value: 'Notify' },
  { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { label: 'Notice', value: 'Notice' },
]

const mandatoryTxt = 'Mandatory field.'
export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt,
  }),
  purpose: z.object({
    label: z.string(),
    value: z.string()
  }).nullable().refine((val) => val !== null, { message: "Mandatory Field" }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: 'test 2',
  purpose: null,
  isDisableFields: false,
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dummy1: 'test 1',
  dummy2: 'test 2',
  purpose: purposeOptions[2],
  isDisableFields: false,
}

const isDisabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'dummy1',
    label: 'Dummy1',
    isDisabled,
    fieldProps: {
      type: 'text',
      leadingContent: '@',
      placeholder: 'Enter Text'
    }
  },
  {
    type: 'input',
    name: 'dummy2',
      label: 'Dummy2',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'dummy'
    }
  },
  {
    type: 'radio-group',
    name: 'purpose',
    label: 'Purpose',
    isDisabled,
    fieldProps: {
      type: 'radio-group',
      options: purposeOptions
    }
  },
]
