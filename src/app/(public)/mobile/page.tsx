'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FieldRenderer, conditionalZodResolver } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { formSchema, formConfig, defaultValues } from './config'

export default function MobilePage () {
  const router = useRouter()
  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: conditionalZodResolver(formSchema, formConfig),
    defaultValues
  })

  const { handleSubmit } = hookForm

  const onSubmit = ({ mobile }: z.infer<typeof formSchema>) => {
    const phone = `+971${mobile}`
    router.push(`/otp?phone=${encodeURIComponent(phone)}`)
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
          <h1 className="text-4xl md:text-6xl font-bold">First things first!</h1>
          <p className="text-text-muted mt-3 md:text-lg">Register with your UAE mobile number</p>
        </div>

        <Form {...hookForm}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
            {displayInput('mobile')}

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


