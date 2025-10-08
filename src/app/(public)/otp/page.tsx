'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FieldRenderer, conditionalZodResolver } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { formSchema, formConfig, defaultValues } from './config'

function OtpContent() {
  const router = useRouter()
  const params = useSearchParams()
  const phone = params.get('phone') || ''

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: conditionalZodResolver(formSchema, formConfig),
    defaultValues
  })

  const { handleSubmit } = hookForm

  const onSubmit = async () => {
    router.push('/email')
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
    <div className="min-h-screen bg-white px-6 py-10 md:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold">Let's verify it..</h1>
          <p className="text-text-muted mt-3 md:text-lg">A verification code was sent to</p>
          {phone ? (<p className="mt-3 font-medium md:text-lg">{phone}</p>) : null}
        </div>

        <Form {...hookForm}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
            {displayInput('code')}

            <div className="flex justify-start text-coral">
              <span>Resend (59s)</span>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="marhaba" className="h-12 w-12 rounded-full">
                <span className="text-[30px]">›</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default function OtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white px-6 py-10 md:py-16"></div>}>
      <OtpContent />
    </Suspense>
  )
}


