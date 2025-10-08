import { Input, InputProps } from '../Input'

export type DigitsProps = {
  maxValue?: number
  allowDecimal?: boolean
  padWithZero?: boolean
  maxLength?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & InputProps

export const Digits = ({
  maxValue = 9999999999999,
  allowDecimal = true,
  padWithZero = false,
  maxLength,
  onChange,
  ...props
}: DigitsProps) => {
  return (
    <Input
      {...props}
      type="text"
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      maxLength={maxLength}
      onChange={(event) => {
        const { name, value } = event.target
        let newValue = value

        // --- STEP 1: Clean input ---
        if (allowDecimal) {
          newValue = value.replace(/[^0-9.]/g, '')
          const parts = newValue.split('.')
          if (parts.length > 2) newValue = parts[0] + '.' + parts.slice(1).join('')
          if (newValue.startsWith('.')) newValue = '0' + newValue
        } else {
          newValue = value.replace(/\D/g, '')
        }

        // --- STEP 2: Normalize leading zeros ---
        if (!allowDecimal && newValue.length > 1 && newValue.startsWith('0')) {
          newValue = newValue.replace(/^0+/, '')
          if (newValue === '') newValue = '0'
        }

        // --- STEP 3: Apply numeric limit ---
        if (maxValue > 0 && newValue && !isNaN(Number(newValue))) {
          const numericValue = parseFloat(newValue)
          if (numericValue > maxValue) newValue = String(maxValue)
        }

        // --- STEP 4: Apply maxLength limit ---
        if (maxLength && newValue.length > maxLength) {
          newValue = newValue.slice(0, maxLength)
        }

        // --- STEP 5: Pad with zero (after normalization) ---
        if (padWithZero && newValue !== '') {
          const [integerPart, decimalPart] = newValue.split('.')
          const paddedInt = integerPart.padStart(2, '0')
          newValue = decimalPart !== undefined ? `${paddedInt}.${decimalPart}` : paddedInt
        }

        // --- STEP 6: Emit formatted event ---
        const formattedEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: newValue,
          },
        }

        onChange?.(formattedEvent as React.ChangeEvent<HTMLInputElement>)
      }}
    />
  )
}