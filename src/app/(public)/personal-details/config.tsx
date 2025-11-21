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
    .min(10, { message: 'Use format DD-MM-YYYY' })
    .max(10, { message: 'Use format DD-MM-YYYY' })
    .regex(/^\d{2}-\d{2}-\d{4}$/g, { message: 'Use format DD-MM-YYYY' }),
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
  proofOfAddressDocument: z.any().refine((v) => v && v.length > 0, { message: mandatoryTxt }),
  proofOfSalaryDocument: z.any().refine((v) => v && v.length > 0, { message: mandatoryTxt }),
  identificationCard: z.any().refine((v) => v && v.length > 0, { message: mandatoryTxt }),
  selfiePhoto: z.any().refine((v) => v && v.length > 0, { message: mandatoryTxt }),
  identificationCardNumber: z.string().min(1, { message: mandatoryTxt }),
  mobileNumber: z.string().min(1, { message: mandatoryTxt }),
  address: z.string().min(1, { message: mandatoryTxt }),
  

  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: 'LOK, Wing Ching',
  dateOfBirth: '03-06-1985',
  nationality: undefined,
  email: 'lok.wing.ching@gmail.com',
  gender: undefined,
  proofOfAddressDocument: undefined,
  proofOfSalaryDocument: undefined,
  identificationCard: undefined,  
  selfiePhoto: undefined,
  identificationCardNumber: 'Z683365(5)',
  mobileNumber: '+1-415-555-1234',
  address: 'FLAT 2, 5/F BLOCK A, HONG KAI COURT, 100 SASSOON ROAD, POK FU LAM, HONG KONG',

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
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'proofOfAddressDocument',
    label: 'Proof of Address Document',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf',
      multiple: false 
    }
  },
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'proofOfSalaryDocument',
    label: 'Proof of Salary Document',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf',
      multiple: false 
    },
  },
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'identificationCard',
    label: 'Identification Card',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf',
      multiple: false 
    }
  },
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'selfiePhoto',
    label: 'Selfie Photo',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf',
      multiple: false 
    }
  },
  {
    type: 'input',
    name: 'identificationCardNumber',
    label: 'Identification Card Number',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Identification Card Number'
    }
  },
  {
    type: 'input',
    name: 'mobileNumber',
    label: 'Mobile Number',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Mobile Number'
    }
  },
  {
    type: 'input',
    name: 'address',
    label: 'Address',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Address'
    }
  },
]
