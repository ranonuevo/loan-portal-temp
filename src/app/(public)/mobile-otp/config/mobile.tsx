import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const mobileSchema = z.object({
  mobile: z
    .string()
    .min(1, { message: 'Mandatory Field' })
    .regex(/^\d{7,12}$/g, { message: 'Enter a valid number' }),
})

export const mobileDefaultValues: z.infer<typeof mobileSchema> = {
  mobile: ''
}

export const mobileFieldConfig: FieldConfig[] = [
  {
    type: 'digits',
    name: 'mobile',
    label: 'Mobile number',
    isDisabled: () => false,
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
