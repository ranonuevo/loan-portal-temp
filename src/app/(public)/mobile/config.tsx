import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const formSchema = z.object({
  mobile: z
    .string()
    .min(1, { message: 'Mandatory Field' })
    .regex(/^\d{7,12}$/g, { message: 'Enter a valid number' }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  mobile: ''
}

const isDisabled = (values: any, name: any): boolean => {
  return false // No disabled fields in mobile form
}

export const formConfig: FieldConfig[] = [
  {
    type: 'digits',
    name: 'mobile',
    label: 'Mobile number',
    isDisabled,
    fieldProps: {
      allowDecimal: false,
      inputMode: 'numeric',
      maxLength: 12,
      leadingContent: <span className="text-text-muted">+971</span>,
      leadingContentClassName: 'min-w-[50px]',
      className: 'pl-13',
      placeholder: 'Mobile number'
    }
  }
]
