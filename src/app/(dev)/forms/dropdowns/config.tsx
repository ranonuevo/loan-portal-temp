import { z } from 'zod'
import { continentOptions, countryOptions } from './data'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'

export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt,
  }),
  agree: z.boolean().refine((value) => value === true, {
    message: mandatoryTxt
  }),
  continents: z.string().or(z.number().int()).refine((value) => value !== '', {
    message: mandatoryTxt
  }),
  countries: z.object({
    label: z.string(),
    value: z.string()
  }).or(z.undefined()).refine((value) => { return value }, { message: 'Mandatory Field', }),
  countries2: z.any().array().min(2, 'Select at least 2 countries').max(3),
  openUpward: z.any().array().min(2, 'Select at least 2 options').max(3),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  agree: false,
  continents: '',
  countries: undefined,
  countries2: [],
  openUpward: [],
  isDisableFields: false  // use only for disabling fields, not part of form data
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dummy1: 'dummy1',
  dummy2: 'dummy2',
  agree: true,
  continents: continentOptions[2].value,
  countries: countryOptions[3],
  countries2: [
    countryOptions[1],
    countryOptions[2]
  ],
  openUpward: [
    countryOptions[4],
    countryOptions[3]
  ],
  isDisableFields: false  // use only for disabling fields, not part of form data
}

const isDisabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'dummy1',
    label: 'Dummy1',
    isDisabled,
    fieldProps: {
      type: 'text',
      leadingContent: '@',
      placeholder: 'Enter text'
    }
  },
  {
    type: 'input',
    name: 'dummy2',
    label: 'Dummy2',
    isDisabled: (values: any, name: any): boolean => { // eslint-disable-line
      return values.isDisableFields === true || !values.dummy1
    },
    fieldProps: {
      type: 'input',
      placeholder: 'dummy (disabled dpndncy)',
    }
  },
  {
    type: 'checkbox',
    name: 'agree',
    isDisabled,
    fieldProps: {
      type: 'checkbox',
      label: 'I agree to Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    }
  },
  {
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
  },
  {
    type: 'dropdown',
    name: 'countries',
    label: 'Countries (return {})',
    isDisabled: (values: any, name: any) => { // eslint-disable-line
      return values.isDisableFields === true || !values.continents
    },
    description: 'Note: disableToggleOnSelectedOption is enabled',
    fieldProps: {
      returnType: 'object',
      disableToggleOnSelectedOption: true,
      placeholder: 'Select countries (disabled dpndncy)',
      optionOneLiner: false,
      options: countryOptions,
    }
  },
  {
    type: 'dropdown',
    name: 'countries2',
    label: 'Countries2 (return [{},{},{}]]',
    isDisabled,
    description: 'Note: return array[]',
    fieldProps: {
      returnType: 'array',
      placeholder: 'Select countries2',
      options: countryOptions,
    }
  },
  {
    type: 'dropdown',
    name: 'openUpward',
    label: 'Sample Open Upward (TODO) ',
    isDisabled,
    description: 'Note: (return [{},{},{}]]',
    fieldProps: {
      returnType: 'array',
      placeholder: 'Select options',
      options: countryOptions
    }
  },
  // {
  //   name: 'categories',
  //   fieldProps: {
  //     type: 'dropdown2',
  //     label: 'Categories (Multiple)',
  //     multiple: true,
  //     placeholder: 'Select categories',
  //     options: countryOptions,
  //     disabled
  //   }
  // },
]
