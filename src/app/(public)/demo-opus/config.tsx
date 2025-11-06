import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'

export const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  name: z.string().min(1, { message: mandatoryTxt }),
  hkid: z.string().min(1, { message: mandatoryTxt }),
  dateOfBirth: z
    .string()
    .min(10, { message: 'Use format DD/MM/YYYY' })
    .max(10, { message: 'Use format DD/MM/YYYY' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Use format DD/MM/YYYY' }),
  hkidImage: z.any().refine((v) => v && v.length > 0, { message: 'Please upload HKID image' }),
  isDisableFields: z.boolean() // for disabling fields during form submission
})

export const defaultValues: z.infer<typeof formSchema> = {
  email: 'test@opus.com',
  name: 'Lok, Min',
  hkid: '12345',
  dateOfBirth: '12/12/2020',
  hkidImage: undefined,
  isDisableFields: false
}

const isDisabled = (values: any) => {
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
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
    type: 'input',
    name: 'name',
    label: 'Name',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Full name'
    }
  },
  {
    type: 'input',
    name: 'hkid',
    label: 'HKID number',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'A123456(7)'
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
      dataMask: 'date'
    }
  },
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'hkidImage',
    label: 'HKID Image',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf'
    }
  }
]