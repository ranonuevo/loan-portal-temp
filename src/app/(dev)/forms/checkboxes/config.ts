import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const ingredientsOption = [
  { label: 'Tomato', value: 'Tomato', a:false },
  { label: 'Pepper', value: 'Pepper' },
  { label: 'Potato', value: 'Potato' },
  { label: 'Salt', value: 'Salt' },
  { label: 'Vinegar', value: 'Vinegar' },
]

const mandatoryTxt = 'Mandatory field.'
export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt
  }),
  agree: z.boolean().refine((value) => value === true, {
    message: mandatoryTxt
  }),
  ingredients: z.array(z.any()).min(2, 'Select at least 2 ingredients').max(4),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  agree: false,
  ingredients: [],
  isDisableFields: false,
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dummy1: 'dummy text',
  dummy2: 'test',
  agree: true,
  ingredients: [
    ingredientsOption[1],
    ingredientsOption[2]
  ],
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
      type: 'text',
      trailingContent: 'Dum.',
      placeholder: 'Enter Text',
    }
  },
  {
    type: 'input',
    name: 'dummy2',
    label: 'Dummy2',
    isDisabled,
    fieldProps: {
      placeholder: 'dummy',
      readOnly: false,
    }
  },
  {
    type: 'checkbox',
    name: 'agree',
    label: '',
    isDisabled,
    fieldProps: {
      label: 'I agree to Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    }
  },
  {
    type: 'checkbox',
    name: 'ingredients',
    label: 'Pick Ingredients:',
    isDisabled,
    fieldProps: {
      options: ingredientsOption
    }
  },
]
