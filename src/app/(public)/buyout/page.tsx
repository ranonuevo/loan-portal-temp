"use client"

import { Suspense, use, useEffect } from 'react'
import Header from '@/components/ui/Header'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
// import { useModalConfirm } from '@/hooks/confirm'
import { useRouter } from 'next/navigation'
import { FieldRenderer, conditionalZodResolver } from '@/components/forms'
import { formConfig, formSchema, defaultValues, initialBankValue, initialInternalValue, initialEmployerValue } from './config'
import BanksFields from './BanksFields'
import InternalFields from './InternalFields'
import EmployerFields from './EmployerFields'

export default function Page () {
  // const modalConfirm = useModalConfirm()

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: conditionalZodResolver(formSchema, formConfig),
    defaultValues
  })

  const { handleSubmit, setValue, watch, formState: { errors } } = hookForm
console.log('errors', errors)
  const buyout = watch('buyout')
  const buyoutTypes: any[] = watch('buyoutTypes') || []
  const isBuyoutTypesSelected = (type: string) => {
    return buyoutTypes.find((item) => item.value === type)
  }

  const router = useRouter()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // modalConfirm({
    //   title: 'Form Submission',
    //   description: 'This will submit the form, are you sure?'
    // })
    // .then(async () => {
      setValue('isDisableFields', true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setValue('isDisableFields', false)

      console.log('onSubmit', values) // eslint-disable-line
      
      router.push('/calculator')
    // })
    // .catch(() => {})
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

  const hookMethods = {
    ...hookForm,
    displayInput
  }

  useEffect(() => {
    // Disable fields when not buyout
    if (!buyout) {
      setValue('banks', [])
      setValue('internals', [])
      setValue('employers', [])
    }
  } , [buyout, setValue])

  useEffect(() => {
    // Reset buyoutTypes when buyout is false
    if (!buyout) {
      setValue('buyoutTypes', [])
    }
  }, [buyout, setValue])

  useEffect(() => {
    // Reset banks when bank type is unchecked
    if (!isBuyoutTypesSelected('bank')) {
      setValue('banks', [])
    } else {
      setValue('banks', [{...initialBankValue }])
    }

    if (!isBuyoutTypesSelected('internal')) {
      setValue('internals', [])
    } else {
      setValue('internals', [{...initialInternalValue }])
    }

    if (!isBuyoutTypesSelected('employer')) {
      setValue('employers', [])
    }  else {
      setValue('employers', [{...initialEmployerValue }])
    }
  }, [buyoutTypes, setValue])

  return (
    <Suspense>
      <div className="min-h-screen bg-white">
        <Header
          backHref="email-verification"
          backLabel="Back"
        />
        {/* Main Content */}
        <div className="px-6 py-6">
          <div className="max-w-[600px] mx-auto">
            <FormProvider {...hookMethods}>
              <form onSubmit={handleSubmit(onSubmit)} className='grid flex-col gap-y-5'>
                <div>
                  <div className='flex flex-col gap-10 gap-x-12 mb-10'>
                    { displayInput('buyout') }
                    { buyout && displayInput('buyoutTypes') }
                  </div>

                  <div className='flex flex-col gap-5'>
                    {buyout && isBuyoutTypesSelected('bank') && (
                      <BanksFields />
                    )}

                    {buyout && isBuyoutTypesSelected('internal') && (
                      <InternalFields />
                    )}

                    {buyout && isBuyoutTypesSelected('employer') && (
                      <EmployerFields />
                    )}
                  </div>
                </div>

                <Button
                  type='submit'
                  className='mt-5 w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg'
                >
                  Continue
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
