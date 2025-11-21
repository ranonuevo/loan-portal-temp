'use client'

import { ChevronRight } from 'lucide-react'
import Header from '@/components/ui/Header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formSchema, defaultValues, formConfig } from './config'
import { uploadFileToOpus } from '@/lib/opus'
import { STORAGE_KEY } from '@/lib/constants'
import { updateAppData } from '@/lib/storage'
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
    modalConfirm({
      title: 'Form Submission',
      description: 'This will submit the form, are you sure?'
    })
    .then(async () => {
      setValue('isDisableFields', true)
      toast.loading('Saving personal details...', { id: 'personal' })

      try {
        // Upload files (if present) to Opus so we can reference URLs later
        const proofAddressFile = values.proofOfAddressDocument?.[0]
        const proofSalaryFile = values.proofOfSalaryDocument?.[0]
        const idCardFile = values.identificationCard?.[0]
        const selfieFile = values.selfiePhoto?.[0]

        const proofAddressUrl = proofAddressFile ? await uploadFileToOpus(proofAddressFile) : null
        const proofSalaryUrl = proofSalaryFile ? await uploadFileToOpus(proofSalaryFile) : null
        const idCardUrl = idCardFile ? await uploadFileToOpus(idCardFile) : null
        const selfieUrl = selfieFile ? await uploadFileToOpus(selfieFile) : null

        // Persist collected personal details into storage
        updateAppData({
          personalDetails: {
            name: values.name,
            dateOfBirth: values.dateOfBirth,
            nationality: values.nationality?.value ?? null,
            email: values.email,
            gender: values.gender?.value ?? null,
            proofOfAddressUrl: proofAddressUrl,
            proofOfSalaryUrl: proofSalaryUrl,
            identificationCardUrl: idCardUrl,
            selfieUrl: selfieUrl,
            identificationCardNumber: values.identificationCardNumber,
            mobileNumber: values.mobileNumber,
            address: values.address
          }
        })

        toast.success('Personal details saved', { id: 'personal' })
        // Redirect to passcode setup flow
        router.push('/passcode')
      } catch (err: any) {
        console.error('Error saving personal details', err)
        toast.error(`Error saving personal details: ${err?.message || err}`)
      } finally {
        setValue('isDisableFields', false)
      }
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Personal details</h1>
          <p className="text-gray-500 text-sm mb-8">Please tell us a bit more about you.</p>
          
          <FormProvider {...hookForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-10'>
                <div className='space-y-6'>
                  {displayInput('name')}
                  {displayInput('dateOfBirth')}
                  {displayInput('nationality')}
                  {displayInput('email')}
                  {displayInput('gender')}
                </div>
                <div className='space-y-6'>
                  {displayInput('identificationCardNumber')}
                  {displayInput('mobileNumber')}
                  {displayInput('address')}
                  {displayInput('proofOfAddressDocument')}
                  {displayInput('proofOfSalaryDocument')}
                  {displayInput('identificationCard')}
                  {displayInput('selfiePhoto')}
                </div>
              </div>
              
              
              {/* Next Button */}
              <div className="flex justify-end pt-6">
                <Button
                  disabled={hookForm.watch('isDisableFields')}
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
