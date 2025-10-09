import { z } from 'zod'
import { continentOptions, countryOptions } from './data'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'

const customersSchema = z.object({ 
  name: z.string().min(1, { message: mandatoryTxt }),
  continents: z.string().or(z.number().int()).refine((value) => value !== '', {
    message: mandatoryTxt,
  }),
  countries: z.object({
    label: z.string(),
    value: z.string()
  }).or(z.undefined()).refine((value) => { return value }, { message: 'Mandatory Field', }),
  timeHours: z.string().min(1, { message: mandatoryTxt }),
})

export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt,
  }),
  customers: customersSchema.array().min(1, mandatoryTxt),
  agree: z.boolean().refine((value) => value === true, {
    message: mandatoryTxt
  }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const initialCustomerValue = {
  name: '',
  countries: undefined,
  continents: '',
  timeHours: ''
}
export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  customers: [initialCustomerValue],
  agree: false,
  isDisableFields: false  // use only for disabling fields, not part of form data
}

const isDisabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

const customerChildFields: FieldConfig[] = [{
  type: 'input',
  name: 'name',
  label: 'Name',
  isDisabled,
  fieldProps: {
    type: 'text',
    placeholder: 'Enter text',
  }
}, {
  type: 'dropdown',
  name: 'continents',
  label: 'Continent (return Single "")',
  isDisabled,
  description: 'Note: return single string',
  fieldProps: {
    returnType: 'value',
    placeholder: 'Select continent',
    options: continentOptions,
  }
}, {
  type: 'dropdown',
  name: 'countries',
  label: 'Countries (return {})',
  isDisabled: (values: Record<string, unknown>, name: string, index?: number) => { 
    const formValues = values as z.infer<typeof formSchema>
    if (formValues.isDisableFields) return true
    if (typeof index !== 'number') return false
    const customers = formValues.customers
    return !customers?.[index]?.continents
  },
  description: 'Note: disableToggleOnSelectedOption is enabled',
  fieldProps: {
    returnType: 'object',
    disableToggleOnSelectedOption: false,
    placeholder: 'Select countries (disabled dpndncy)',
    options: countryOptions
  }
}, {
  type: 'digits',
  name: 'timeHours',
  label: '24 Hours',
  isDisabled,
  fieldProps: {
    placeholder: '12',
    readOnly: false,
    maxValue: 24,
  }
}]

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'dummy1',
    label: 'Dummy1',
    isDisabled,
    fieldProps: {
      leadingContent: '@',
      placeholder: 'Enter text'
    }
  },
  {
    type: 'input',
    name: 'dummy2',
    label: 'Dummy2',
    isDisabled: (values: any, name: any) => { // eslint-disable-line
      return values.isDisableFields === true || !values.dummy1
    },
    fieldProps: {
      placeholder: 'dummy (disabled dpndncy)'
    }
  },
  {
    type: 'checkbox',
    name: 'agree',
    isDisabled,
    fieldProps: {
      label: 'I agree to Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    }
  },
  // Customers
  {
    type: 'input',
    name: 'customers',
    label: 'Customers',
    isDisabled,
    fieldProps: {
      placeholder: 'Enter text',
      readOnly: false,
    },
    childFields: customerChildFields,
  },
]
