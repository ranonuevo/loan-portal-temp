'use client'

import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'

function EmailVerificationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVerified, setIsVerified] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  
  // Get email from URL params or use default
  const email = searchParams.get('email') || 'ks*****j@p.com'
  const maskedEmail = email.includes('@') ? email.replace(/(.{2}).*(@.*)/, '$1*****$2') : email

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendCountdown])

  const handleOpenEmailApp = () => {
    // Try to open default email app
    window.location.href = 'mailto:'
  }

  const handleResendLink = async () => {
    if (resendCountdown > 0) return
    
    setIsResending(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResendCountdown(60) // 60 seconds countdown
      // Show success message
    } catch (error) {
      console.error('Failed to resend email:', error)
    } finally {
      setIsResending(false)
    }
  }

  const handleContinue = () => {
    router.push('/buyout')
  }

  const handleChangeEmail = () => {
    router.push('/passcode')
  }

  const handleVerifyEmail = () => {
    // Simulate email verification
    setIsVerified(true)
    setTimeout(() => {
      router.push('/buyout')
    }, 3000)
  }

  if (isVerified) {
      return (
        <div className="min-h-screen bg-white">
          <Header backHref="/passcode" backLabel="Back" />

        {/* Success Banner */}
        <div className="bg-green-500 text-white px-6 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <h2 className="font-bold text-lg">Email verified!</h2>
              <p className="text-sm opacity-90">Thank you, your email was successfully verified</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          <div className="max-w-md mx-auto">
            {/* Email Illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Back envelope */}
                <div className="w-24 h-16 bg-gray-100 rounded-lg opacity-30 transform rotate-12 translate-x-2 translate-y-2">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                </div>
                {/* Front envelope */}
                <div className="absolute top-0 left-0 w-24 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-lg shadow-lg">
                  <div className="absolute top-2 left-2 w-6 h-4 bg-white/30 rounded"></div>
                  <div className="absolute top-4 left-2 w-4 h-4 bg-white/30 rounded"></div>
                  <div className="absolute top-6 left-2 w-8 h-4 bg-white/30 rounded"></div>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Check your email</h1>
            
            <p className="text-gray-500 text-sm mb-6 text-center">
              To make sure you receive all official bank communication, we sent a verification link to {maskedEmail}. 
              If you can&apos;t find the email, make sure to check your Spam, Junk or Promotions folder.
            </p>

            <div className="space-y-4">
              <Button
                onClick={handleContinue}
                className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg"
              >
                Continue
              </Button>

              <Button
                onClick={handleResendLink}
                disabled={resendCountdown > 0 || isResending}
                variant="outline"
                className="w-full h-12 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {isResending ? 'Sending...' : 'Resend link'}
              </Button>

              {resendCountdown > 0 && (
                <p className="text-center text-orange-500 text-sm">
                  Resend ({resendCountdown}s)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header backHref="/passcode" backLabel="Back" />

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          {/* Email Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Back envelope */}
              <div className="w-24 h-16 bg-gray-100 rounded-lg opacity-30 transform rotate-12 translate-x-2 translate-y-2">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
              </div>
              {/* Front envelope */}
              <div className="absolute top-0 left-0 w-24 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-lg shadow-lg">
                <div className="absolute top-2 left-2 w-6 h-4 bg-white/30 rounded"></div>
                <div className="absolute top-4 left-2 w-4 h-4 bg-white/30 rounded"></div>
                <div className="absolute top-6 left-2 w-8 h-4 bg-white/30 rounded"></div>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Check your email</h1>
          
          <p className="text-gray-500 text-sm mb-6 text-center">
            To make sure you receive all official bank communication, we sent a verification link to {maskedEmail}. 
            If you can&apos;t find the email, make sure to check your Spam, Junk or Promotions folder.
          </p>

          {/* Change email link */}
          <div className="text-center mb-8">
            <button
              onClick={handleChangeEmail}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium underline"
            >
              Change email
            </button>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleOpenEmailApp}
              className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Open your email app
            </Button>

            <Button
              onClick={handleResendLink}
              disabled={resendCountdown > 0 || isResending}
              variant="outline"
              className="w-full h-12 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {isResending ? 'Sending...' : 'Resend link'}
            </Button>

            {resendCountdown > 0 && (
              <p className="text-center text-orange-500 text-sm">
                Resend ({resendCountdown}s)
              </p>
            )}
          </div>

          {/* Demo verification button (for testing) */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <Button
              onClick={handleVerifyEmail}
              variant="outline"
              className="w-full h-10 rounded-full border-dashed border-gray-300 text-gray-500 hover:bg-gray-50"
            >
              Demo: Verify Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationContent />
    </Suspense>
  )
}
