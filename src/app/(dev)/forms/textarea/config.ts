import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'
export const formSchema = z.object({
  isDisableFields: z.boolean(), // use only for disabling fields, not part of form data
  dummy1: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  concern: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  feedback: z.string().min(1, {
    message: 'Mandatory Field',
  }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  concern: '',
  feedback: '',
  isDisableFields: false,
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dummy1: 'dummy',
  concern: '• my concern1\n• my concern2\n',
  feedback: 'my feedback',
  isDisableFields: false,
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
      placeholder: 'Enter Text',
      readOnly: false
    }
  },
  {
    type: 'textarea',
    name: 'concern',
    label: 'Concern (with auto Bullet)',
    isDisabled,
    fieldProps: {
      placeholder: 'Enter your concern',
      readOnly: false,
      rows: 5,
      appendBulletEveryEnter: true,
    }
  },
  {
    type: 'textarea',
    name: 'feedback',
    label: 'Feedback',
    isDisabled: (values: any) => {
      return values.isDisableFields === true || !values.dummy1
    },
    fieldProps: {
      readOnly: false,
      placeholder: 'Disabled dependency',
    }
  },
]
