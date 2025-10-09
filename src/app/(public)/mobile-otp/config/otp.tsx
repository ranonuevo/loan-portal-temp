import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, { message: 'Enter 6 digits' })
    .regex(/^\d+$/, { message: 'Digits only' }),
})

export const otpDefaultValues: z.infer<typeof otpSchema> = {
  code: ''
}

export const otpFieldConfig: FieldConfig[] = [
  {
    type: 'digits',
    name: 'code',
    label: 'Verification code',
    isDisabled: () => false,
    fieldProps: {
      allowDecimal: false,
      inputMode: 'numeric',
      maxLength: 6,
      placeholder: '------',
      className: 'tracking-[1em] text-2xl'
    }
  }
]
