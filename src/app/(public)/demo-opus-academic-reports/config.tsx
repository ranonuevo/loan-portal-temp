import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'

export const formSchema = z.object({
  recipientEmail: z.string().email({
    message: 'Please enter a valid email address',
  }),
  academicReportFiles: z.any().refine((v) => v && v.length > 0, { message: 'Please upload Academic Report file(s)' }),
  emailRecords: z.any().refine((v) => v && v.length > 0, { message: 'Please upload Email Records file' }),
  isDisableFields: z.boolean() // for disabling fields during form submission
})

export const defaultValues: z.infer<typeof formSchema> = {
  recipientEmail: 'roy.anonuevo@growthops.asia',
  academicReportFiles: undefined,
  emailRecords: undefined,
  isDisableFields: false
}

const isDisabled = (values: any) => {
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'recipientEmail',
    label: 'Recipient Email address',
    isDisabled,
    fieldProps: {
      type: 'email',
      placeholder: 'Recipient Email address'
    }
  },
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'academicReportFiles',
    label: 'Academic Report File(s)',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf',
      multiple: true 
    }
  },
  {
    type: 'input', // We'll use input type for now until we implement a proper file field type
    name: 'emailRecords',
    label: 'Email Records File',
    isDisabled,
    fieldProps: {
      type: 'file',
      accept: 'image/*,application/pdf',
      multiple: false 
    }
  }
]