import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'

// Nationality options
const nationalityOptions = [
  { label: 'United Arab Emirates', value: 'UAE' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'Egypt', value: 'EG' },
  { label: 'India', value: 'IN' },
  { label: 'Pakistan', value: 'PK' },
  { label: 'Bangladesh', value: 'BD' },
  { label: 'Philippines', value: 'PH' },
  { label: 'Jordan', value: 'JO' },
  { label: 'Lebanon', value: 'LB' },
  { label: 'Syria', value: 'SY' },
  { label: 'Other', value: 'OTHER' }
]

// Gender options
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]

export const formSchema = z.object({
  name: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dateOfBirth: z
    .string()
    .min(10, { message: 'Use format DD/MM/YYYY' })
    .max(10, { message: 'Use format DD/MM/YYYY' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/g, { message: 'Use format DD/MM/YYYY' }),
  nationality: z.object({
    label: z.string(),
    value: z.string()
  }).or(z.undefined()).refine((value) => { return value }, { message: mandatoryTxt }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  gender: z.object({
    label: z.string(),
    value: z.string()
  }).or(z.undefined()).refine((value) => { return value }, { message: mandatoryTxt }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  dateOfBirth: '',
  nationality: undefined,
  email: '',
  gender: undefined,
  isDisableFields: false
}

const isDisabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'name',
    label: 'Name',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Name'
    }
  },
  {
    type: 'input',
    name: 'dateOfBirth',
    label: 'Date of birth',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'DD/MM/YYYY',
      maxLength: 10,
      // internal-only prop consumed by Input; not forwarded to DOM
      dataMask: 'date'
    }
  },
  {
    type: 'dropdown',
    name: 'nationality',
    label: 'Nationality *',
    isDisabled,
    fieldProps: {
      returnType: 'object',
      placeholder: 'Nationality',
      options: nationalityOptions,
    }
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email address',
    isDisabled,
    fieldProps: {
      type: 'email',
      placeholder: 'Email address'
    }
  },
  {
    type: 'radio-group',
    name: 'gender',
    label: 'Gender',
    isDisabled,
    fieldProps: {
      type: 'radio-group',
      options: genderOptions
    }
  },
]
