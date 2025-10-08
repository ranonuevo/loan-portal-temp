import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const formSchema = z.object({
  isDisableFields: z.boolean(), // use only for disabling fields, not part of form data
  debounce: z.string().min(3, {
    message: 'Minimum 3 characters',
  }),
  timeHours: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  timeMinutes: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  amount: z.string().min(1, {
    message: 'Mandatory Field',
  }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  debounce: '',
  timeHours: '',
  timeMinutes: '',
  amount: '',
  isDisableFields: false
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  debounce: 'test',
  timeHours: '10',
  timeMinutes: '30',
  amount: '2500.50',
  isDisableFields: false,
}

const isDisabled = (values: any, name: any):boolean => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'debounce',
    label: 'Debounce',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Check console log to see debounce change',
      debounceDuration: 2000,
      onDebounceChange: (e: any) => {
        console.log('debounce: ', e.target.value)
      }
    }
  },
  {
    type: 'digits',
    name: 'timeHours',
    label: 'Hours (digits)',
    isDisabled,
    fieldProps: {
      placeholder: '23',
      maxValue: 23,
      allowDecimal: false,
      padWithZero: true
    }
  },
  {
    type: 'digits',
    name: 'timeMinutes',
    label: 'Minutes (digits)',
    isDisabled,
    fieldProps: {
      placeholder: '59',
      maxValue: 59,
      allowDecimal: false,
      padWithZero: true
    }
  },
  {
    type: 'digits',
    name: 'amount',
    label: 'Amount (digits)',
    isDisabled,
    fieldProps: {
      placeholder: 'Enter the amount',
      maxValue: 20000,
    }
  },
]
