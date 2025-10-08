import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const formSchema = z.object({
  isDisableFields: z.boolean(), // use only for disabling fields, not part of form data
  name: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  email: z.email().min(1, {
      message: 'Mandatory Field',
    }),
  password: z.string().min(1, {
      message: 'Mandatory Field',
    }).max(5),
  password2: 
    z.string()
    .min(1, {
      message: 'Mandatory Field',
    }),
  readOnlyInput: z.string(),
  disabledInput: z.string().min(1, {
      message: 'Mandatory Field',
    }),
  appendLeftContent: z.string().min(3),
  appendRightContent: z.string().min(1, {
      message: 'Mandatory Field',
    }),
}).refine((values) => values.password === values.password2, {
  message: 'Passwords don\'t match',
  path: ['password2'],
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  email: '',
  password: '',
  password2: '',
  readOnlyInput: 'this is a read-only input',
  disabledInput: 'this is a disabled input',
  appendLeftContent: '',
  appendRightContent: '',
  
  isDisableFields: false
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  name: 'Jay Smith',
  email: 'jay@yahooo.co',
  password: '3214',
  password2: '3214',
  readOnlyInput: 'this is a read-only input',
  disabledInput: 'this is a disabled input',
  appendLeftContent: 'left',
  appendRightContent: 'right',
  
  isDisableFields: false
}

const isDisabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    type: 'input',
    name: 'name',
    label: 'Name',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Ex. John Doe',
    }
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email (Disabled)',
    isDisabled: true,
    fieldProps: {
      type: 'email',
      placeholder: 'example@domain.com',
    }
  },
  {
    type: 'input',
    name: 'password',
    label: 'Password',
    isDisabled,
    fieldProps: {
      type: 'password',
      placeholder: '********',
      togglePassword: false
    }
  },
  {
    type: 'input',
    name: 'password2',
    label: 'Password (with Toggle)',
    isDisabled,
    fieldProps: {
      type: 'password',
      placeholder: '********',
      togglePassword: true
    }
  },
  {
    type: 'input',
    name: 'readOnlyInput',
    label: 'ReadOnly Input',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Ex. of read-only',
      readOnly: true
    }
  },
  {
    type: 'input',
    name: 'disabledInput',
    label: 'Disabled Input',
    isDisabled: true,
    fieldProps: {
      type: 'text',
      placeholder: '',
    }
  },
  {
    type: 'input',
    name: 'appendLeftContent',
    label: 'Append Left Content',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Enter text',
      leadingContent: '@'
    }
  },
  {
    type: 'input',
    name: 'appendRightContent',
    label: 'Append Right Content',
    isDisabled,
    fieldProps: {
      type: 'text',
      placeholder: 'Enter text',
      trailingContent: '@'
    }
  },
]
