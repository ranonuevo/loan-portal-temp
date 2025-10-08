'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formSchema, defaultValues } from './config'
import { Button } from '@/components/ui/button'
import { useModalConfirm } from '@/hooks/useModalConfirm'
import { toast } from 'sonner'
import { CheckBox, Input, RadioGroup, DropDown, Textarea } from '@/components/forms'
import { useFormField } from '@/components/forms/form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/forms/form'

export default function Page () {
  const modalConfirm = useModalConfirm()

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema), // NOTE: use 'conditionalZodResolver' when using <FieldRenderer>
    defaultValues
  })
  
  const { 
    control,
    handleSubmit, 
    setValue,
    formState: { errors } // eslint-disable-line
  } = hookForm
  const isDisableFields = hookForm.watch('isDisableFields')

  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    modalConfirm({
      title: 'Form Submission',
      description: 'This will submit the form, are you sure?'
    })
    .then(async () => {
      setValue('isDisableFields', true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setValue('isDisableFields', false)
      
      console.log('onSubmit', values) // eslint-disable-line
      toast('Payload: ', { 
        description: '' + JSON.stringify(values),
        position: 'top-center'
      })
    })
    .catch(() => {})
  }

  const toggleDisableFields = (isChecked: boolean) => {
    setValue('isDisableFields', isChecked)
  }

  return (
    <>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl'>Basic (without &lt;FieldRenderer&gt;)</h1>
          <div className='text-xs flex flex-col text-right'>
            <CheckBox 
              value={isDisableFields} 
              label='Disabled All Fields' 
              onChange={toggleDisableFields}
            />
          </div>
        </div>
        <hr className='mt-5' />
      </div>
      <Form {...hookForm}>
        <form onSubmit={handleSubmit(onSubmit)} className='grid flex-col gap-y-5'>
          <div className='grid grid-cols-2 gap-10 gap-x-12'>
            <FormField
              name={'username'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isDisableFields} hasError={hasError} placeholder="shadcn" />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name={'agree'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormControl>
                      <CheckBox 
                        {...field} 
                        disabled={isDisableFields} 
                        hasError={hasError}
                        label='I agree to the terms and conditions set by the company and institution governed by the states' 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            
            <FormField
              name={'continents'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormLabel>Continent (return Single "")</FormLabel>
                    <FormControl>
                      <DropDown 
                        {...field} 
                        disabled={isDisableFields}
                        hasError={hasError}
                        placeholder='Select continent'
                        returnType='value'
                        options={[
                          { label: 'Number123', value: 123, id: {}, name: 123 },
                          { label: 'Asia', value: 'Asia', id: {}, name: 123 },
                          { label: 'Africa', value: 'Africa', a:false },
                          { label: 'North America', value: 'North America' },
                          { label: 'South America', value: 'South America' },
                          { label: 'Antarctica', value: 'Antarctica' },
                          { label: 'Europe', value: 'Europe' },
                          { label: 'Australia', value: 'Australia' },
                          { label: 'Testzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', value: 'Test' },
                          { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', value: 'Lorem Ipsum' }
                        ]} 
                      />
                    </FormControl>
                    <FormDescription>This will return single string</FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name={'countries'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormLabel>Countries (return {})</FormLabel>
                    <FormControl>
                      <DropDown 
                        {...field} 
                        disabled={isDisableFields}
                        hasError={hasError}
                        placeholder='Select Countries'
                        returnType='object'
                        options={[
                          { label: 'Vietnam', value: 'Vietnam', id: {}, name: 123 },
                          { label: 'Philippines', value: 'Philippines', a:false },
                          { label: 'China', value: 'China' },
                          { label: 'USA', value: 'USA' },
                          { label: 'Australia', value: 'Australia' },
                          { label: 'France', value: 'France' },
                          { label: 'Thailand', value: 'Thailand' },
                          { label: 'Testzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', value: 'Test' },
                          { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', value: 'Lorem Ipsum' }
                        ]} 
                      />
                    </FormControl>
                    <FormDescription>This will return object {}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name={'ingredients'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormLabel>Pick an ingredients:</FormLabel>
                    <FormControl>
                      <CheckBox 
                        {...field} 
                        disabled={isDisableFields}
                        hasError={hasError}
                        options={[
                          { label: 'Tomato', value: 'Tomato', a:false },
                          { label: 'Pepper', value: 'Pepper' },
                          { label: 'Potato', value: 'Potato' },
                          { label: 'Salt', value: 'Salt' },
                          { label: 'Vinegar', value: 'Vinegar' }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name={'purpose'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormLabel>Select purpose:</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        {...field} 
                        disabled={isDisableFields}
                        hasError={hasError}
                        options={[
                          { label: 'Demand', value: 'Demand', a:false },
                          { label: 'Request', value: 'Request' },
                          { label: 'Notify', value: 'Notify' },
                          { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
                          { label: 'Notice', value: 'Notice' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name={'feedback'}
              control={control}
              render={({ field }) => {
                const { error } = useFormField()
                const hasError = Boolean(error?.message)
                return (
                  <FormItem>
                    <FormLabel>Provide feedback:</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        disabled={isDisableFields}
                        hasError={hasError}
                        placeholder='Put your feedback here'
                        appendBulletEveryEnter
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div>
            <Button type='submit' className='w-full' variant='default'>Submit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}