'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { conditionalZodResolver, FieldRenderer, Form, FormField, FormItem, FormControl, CheckBox, FormMessage } from '@/components/forms'

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { formSchema, formConfig, defaultValues } from './config'

export default function EmailPage () {
  const router = useRouter()
  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: conditionalZodResolver(formSchema, formConfig),
    defaultValues
  })

  const { handleSubmit, control } = hookForm

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Email form submitted:', values)
    // Navigate to products page
    router.push('/products')
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
          <h1 className="text-4xl md:text-6xl font-bold">Up next!</h1>
          <p className="text-text-muted mt-3 md:text-lg">Let&apos;s get to know each other more</p>
        </div>

        <Form {...hookForm}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
            {displayInput('email')}
            
            <p className="text-sm text-text-muted mt-1">
              You will need to verify your email address later
            </p>

            {/* Al Hilal Bank Connection Section */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-6 w-6 text-coral mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Stay connected with Al Hilal Bank</h3>
                <p className="text-text-muted text-sm">
                  We use your email to share important updates, offers, and support your banking experience.
                </p>
              </div>
            </div>

            <FormField
              name='agreeTerms'
              control={control}
              render={({ field, fieldState }) => {
                const hasError = Boolean(fieldState?.error?.message)
                return (
                  <FormItem>
                    <FormControl>
                      <CheckBox 
                        {...field} 
                        id="agree"
                        hasError={hasError}
                        label={
                          <div className='-mt-[2px]'>
                            I agree to the{' '}
                            <span className="text-red-400 underline cursor-pointer">
                              Terms & Conditions
                            </span>
                          </div>
                        }
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                variant="marhaba" 
                className="w-full h-14 rounded-full text-lg font-medium"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
