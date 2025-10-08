import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Mandatory Field' })
    .email({ message: 'Enter a valid email address' }),
  agreeTerms: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the Terms & Conditions',
  }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  email: '',
  agreeTerms: false
}

const isDisabled = (values: any, name: any): boolean => {
  return false // No disabled fields in email form
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'email',
    label: 'Email address',
    isDisabled,
    fieldProps: {
      type: 'email',
      placeholder: 'Enter your email'
    }
  },
]
