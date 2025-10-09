'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FieldRenderer, conditionalZodResolver } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

// Import configurations
import { 
  mobileSchema, 
  mobileDefaultValues, 
  mobileFieldConfig 
} from './config/mobile'
import { 
  otpSchema, 
  otpDefaultValues, 
  otpFieldConfig 
} from './config/otp'

// Type definitions
type MobileFormData = z.infer<typeof mobileSchema>
type OtpFormData = z.infer<typeof otpSchema>

export default function MobileOtpPage() {
  const router = useRouter()
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const countDownTime = 60

  // Use a single form instance to avoid conflicts
  const form = useForm<any>({
    mode: 'onTouched',
    resolver: step === 'mobile' 
      ? conditionalZodResolver(mobileSchema, mobileFieldConfig)
      : conditionalZodResolver(otpSchema, otpFieldConfig),
    defaultValues: step === 'mobile' ? mobileDefaultValues : otpDefaultValues
  })

  // Reset form when step changes
  useEffect(() => {
    if (step === 'mobile') {
      form.reset(mobileDefaultValues)
    } else {
      form.reset(otpDefaultValues)
    }
  }, [step, form])

  // Resend countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendCountdown])

  // Handle mobile submission
  const handleMobileSubmit = (data: MobileFormData) => {
    const phone = `+971${data.mobile}`
    setPhoneNumber(phone)
    setStep('otp')
    setResendCountdown(countDownTime) // Start 60-second countdown
    // In a real app, you would send OTP here
    console.log('Sending OTP to:', phone)
  }

  // Handle OTP submission
  const handleOtpSubmit = async (data: OtpFormData) => {
    console.log('Verifying OTP:', data.code)
    // In a real app, you would verify OTP here
    router.push('/email')
  }

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0) return
    
    setIsResending(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResendCountdown(countDownTime)
      console.log('Resending OTP to:', phoneNumber)
    } catch (error) {
      console.error('Failed to resend OTP:', error)
    } finally {
      setIsResending(false)
    }
  }

  // Handle back navigation
  const handleBack = () => {
    if (step === 'otp') {
      setStep('mobile')
    } else {
      router.push('/products')
    }
  }

  const displayInput = (name: string, fieldArrayName: string | null = null) => {
    const config = step === 'mobile' ? mobileFieldConfig : otpFieldConfig
    return (
      <FieldRenderer
        name={name} 
        fieldArrayName={fieldArrayName}
        fieldsConfig={config}
        hookForm={form}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-10 md:py-16">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-12">
            {step === 'mobile' ? (
              <>
                <h1 className="text-4xl md:text-6xl font-bold">First things first!</h1>
                <p className="text-text-muted mt-3 md:text-lg">Register with your UAE mobile number</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold">Let&apos;s verify it..</h1>
                <p className="text-text-muted mt-3 md:text-lg">A verification code was sent to</p>
                {phoneNumber && (
                  <p className="mt-3 font-medium md:text-lg">{phoneNumber}</p>
                )}
              </>
            )}
          </div>

          {step === 'mobile' ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleMobileSubmit)} className="space-y-8 max-w-xl">
                {displayInput('mobile')}

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="marhaba" 
                    className="h-12 w-12 rounded-full"
                  >
                    <span className="text-[30px]">›</span>
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleOtpSubmit)} className="space-y-8 max-w-xl">
                {displayInput('code')}

                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCountdown > 0 || isResending}
                    className="text-coral hover:text-orange-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isResending ? 'Sending...' : resendCountdown > 0 ? `Resend (${resendCountdown}s)` : 'Resend'}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="marhaba" 
                    className="h-12 w-12 rounded-full"
                  >
                    <span className="text-[30px]">›</span>
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}