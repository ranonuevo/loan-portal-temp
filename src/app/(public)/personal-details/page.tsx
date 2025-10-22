'use client'

import { ChevronRight } from 'lucide-react'
import Header from '@/components/ui/Header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formSchema, defaultValues, formConfig } from './config'
import { FieldRenderer } from '@/components/forms'
import { useModalConfirm } from '@/hooks/confirm'
import { toast } from 'sonner'

export default function PersonalDetailsPage() {
  const modalConfirm = useModalConfirm()
  const router = useRouter()

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues
  })
  
  const { 
    handleSubmit, 
    setValue
  } = hookForm

  // const isDisableFields = hookForm.watch('isDisableFields')

  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    console.log('onSubmit', values)
    modalConfirm({
      title: 'Form Submission',
      description: 'This will submit the form, are you sure?'
    })
    .then(async () => {
      setValue('isDisableFields', true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setValue('isDisableFields', false)
      
      console.log('onSubmit', values)
      toast('Form submitted successfully!', { 
        description: 'Your personal details have been saved.',
        position: 'top-center'
      })
      // Redirect to passcode setup flow
      router.push('/passcode')
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

  return (
    <div className="min-h-screen bg-white">
      <Header backHref="/scan-id" backLabel="Back" title="" />

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Personal details</h1>
          <p className="text-gray-500 text-sm mb-8">Please tell us a bit more about you.</p>
          
          <FormProvider {...hookForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formConfig.map((field) => (
                <div key={field.name}>
                  {displayInput(field.name)}
                </div>
              ))}
              
              {/* Next Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
