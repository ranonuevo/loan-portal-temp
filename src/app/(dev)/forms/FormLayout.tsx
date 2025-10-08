'use client'


import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useModalConfirm } from '@/hooks/useModalConfirm'
import { useRouter, useSearchParams  } from 'next/navigation'
import { toast } from 'sonner'
import { FieldRenderer, CheckBox, conditionalZodResolver } from '@/components/forms'

type Props = {
  children: any
  title: string
  formConfig: any
  formSchema: any
  defaultValues: any
  defaultWithValues?: any
}

export default function FormLayout ({ 
  children,
  title,
  formConfig,
  formSchema,
  defaultValues,
  defaultWithValues = null
}: Props) {
  const router = useRouter()
  const modalConfirm = useModalConfirm()
  const searchParams = useSearchParams()
  const defaultValuesIndicator = 'with-default-values'
  const withDefaultValues = searchParams.get(defaultValuesIndicator) || '0'

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    // resolver: zodResolver(formSchema),
    resolver: conditionalZodResolver(formSchema, formConfig),
    defaultValues: withDefaultValues == '1'? (defaultWithValues || defaultValues) : defaultValues
  })
  
  const { 
    handleSubmit, 
    getValues,
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

  const displayInput = (name: string, fieldArrayName: string | null = null) => {
    return (
      <FieldRenderer
        name={name} 
        fieldArrayName={fieldArrayName}
        fieldsConfig={formConfig}
        hookForm={hookForm}
      />
    )
  }

  const toggleDisableFields = () => {
    setValue('isDisableFields', !isDisableFields) 
  }

  const hookMethods = {
    ...hookForm,
    displayInput
  }

  return (
    <>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl'>{ title }</h1>
          <div className='text-xs flex flex-col text-right'>
            {withDefaultValues == '1'? (
              <span 
                className='underline mb-1 cursor-pointer' 
                onClick={() => {
                  router.push(`?${defaultValuesIndicator}=0`)
                  setTimeout(() => {
                    window.location.reload()
                  }, 500)
                }}
              >With Empty Values</span>
            ) : (
              <span 
                className='underline mb-1 cursor-pointer' 
                onClick={() => {
                  router.push(`?${defaultValuesIndicator}=1`)
                  setTimeout(() => {
                    window.location.reload()
                  }, 500)
                }}
              >With Default Values</span>
            )}
            
            <CheckBox 
              value={isDisableFields} 
              label='Disabled All Fields' 
              onChange={toggleDisableFields} 
            />
          </div>
        </div>
        <hr className='mt-5' />
      </div>

      {/* NOTE: "<FormProvider>" use specifically in multi array fields else you can remove this */}
      <FormProvider {...hookMethods}> 
        <form onSubmit={handleSubmit(onSubmit)} className='grid flex-col gap-y-5'>
          <div>
            { children(displayInput) }
          </div>
          
          <Button type='submit' className='w-full' variant='default'>Submit</Button>
        </form>
      </FormProvider>
    </>
  )
}