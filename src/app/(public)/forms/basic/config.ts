import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

export const formSchema = z.object({
  isDisableFields: z.boolean(), // use only for disabling fields, not part of form data
  username: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  agree: z.boolean().refine((value) => value === true, {
    message: 'Mandatory Field',
  }),
  continents: z.string().or(z.number().int()).refine((value) => value !== '', {
    message: 'Mandatory Field',
  }),
  countries: z.object({
    label: z.string(),
    value: z.string()
  }).or(z.undefined()).refine((value) => { return value }, { message: 'Mandatory Field', }),
  ingredients: z.array(z.any()).min(2, 'Select at least 2 ingredients').max(4),
  purpose: z.object({
    label: z.string(),
    value: z.string()
  }).nullable().refine((val) => val !== null, { message: "Mandatory Field" }),
  feedback: z.string().min(1, {
    message: 'Mandatory Field',
  }),
})

export const defaultValues: z.infer<typeof formSchema> = {
  isDisableFields: false,
  username: '',
  agree: true,
  continents: 'Asia',
  countries: undefined,
  ingredients: [{ label: 'Tomato', value: 'Tomato', a:false }],
  purpose: { label: 'Notify', value: 'Notify' },
  feedback: ''
}
