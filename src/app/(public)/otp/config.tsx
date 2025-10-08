import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const formSchema = z.object({
  code: z
    .string()
    .length(6, { message: 'Enter 6 digits' })
    .regex(/^\d+$/, { message: 'Digits only' }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  code: ''
}

const isDisabled = (values: any, name: any): boolean => {
  return false // No disabled fields in OTP form
}

export const formConfig: FieldConfig[] = [
  {
    type: 'digits',
    name: 'code',
    label: 'Verification code',
    isDisabled,
    fieldProps: {
      allowDecimal: false,
      inputMode: 'numeric',
      maxLength: 6,
      placeholder: '------',
      className: 'tracking-[1em] text-2xl'
    }
  }
]
