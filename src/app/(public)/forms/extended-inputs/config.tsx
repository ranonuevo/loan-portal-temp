import React from 'react'
import { z } from 'zod'
import { FieldConfig } from '@/components/forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockFour, faDollarSign, faHourglass, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export const formSchema = z.object({
  isDisableFields: z.boolean(), // use only for disabling fields, not part of form data
  dateOfBirth: z
    .string()
    .min(10, { message: 'Use format DD/MM/YYYY' })
    .max(10, { message: 'Use format DD/MM/YYYY' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/g, { message: 'Use format DD/MM/YYYY' }),
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
  mobile: z.string().min(1, {
    message: 'Mandatory Field',
  }).regex(/^\d{7,12}$/g, { message: 'Enter a valid number' }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  dateOfBirth: '',
  debounce: '',
  timeHours: '',
  timeMinutes: '',
  amount: '',
  isDisableFields: false,
  mobile: ''
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dateOfBirth: '12/12/1991',
  debounce: 'test',
  timeHours: '10',
  timeMinutes: '30',
  amount: '2500.50',
  isDisableFields: false,
  mobile: '9358845582'
}

const isDisabled = (values: any, name: any):boolean => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
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
      padWithZero: true,
      leadingContent: <FontAwesomeIcon icon={faClockFour} />,
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
      padWithZero: true,
      trailingContent: <FontAwesomeIcon icon={faHourglass} />,
    }
  },
  {
    type: 'digits',
    name: 'amount',
    label: 'Amount (digits)',
    isDisabled,
    fieldProps: {
      placeholder: 'Enter the amount',
      leadingContent: <FontAwesomeIcon icon={faDollarSign} />,
      maxValue: 20000,
    }
  },
  {
    type: 'digits',
    name: 'mobile',
    label: 'Mobile (digits)',
    isDisabled,
    fieldProps: {
      placeholder: 'Enter the amount',
      allowDecimal: false,
      maxLength: 9,
      leadingContent: <div className='font-semibold'>+63</div>,
      leadingContentClassName: 'bg-gray-400 text-gray-50 w-[48px]',
      className: 'pl-15'
    }
  },
]
