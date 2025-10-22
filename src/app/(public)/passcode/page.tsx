'use client'

import { ChevronRight } from 'lucide-react'
import Header from '@/components/ui/Header'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/forms/fields/Input'
import { toast } from 'sonner'

export default function PasscodePage() {
  const router = useRouter()

  const [step, setStep] = React.useState<1 | 2>(1)
  const [code, setCode] = React.useState<string[]>(['', '', '', ''])
  const [confirmCode, setConfirmCode] = React.useState<string[]>(['', '', '', ''])
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

  const activeValues = step === 1 ? code : confirmCode
  const title = step === 1 ? 'Set passcode' : 'Confirm passcode'
  const subtitle = step === 1
    ? 'Set up a passcode to log in and protect your account'
    : 'Remember this passcode, it will be useful later!'

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1)
    const update = [...activeValues]
    update[index] = digit
    if (step === 1) setCode(update)
    else setConfirmCode(update)

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !activeValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const allFilled = activeValues.every((d) => d !== '')

  const handleNext = () => {
    if (!allFilled) return
    if (step === 1) {
      setStep(2)
      setTimeout(() => inputRefs.current[0]?.focus(), 0)
      return
    }
    const first = code.join('')
    const second = confirmCode.join('')
    if (first !== second) {
      toast.error('Passcodes do not match')
      setConfirmCode(['', '', '', ''])
      inputRefs.current[0]?.focus()
      return
    }
    toast.success('Passcode set successfully')
    router.push('/email-verification')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header backHref="/personal-details" backLabel="Back" title="" />

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500 text-sm mb-8">{subtitle}</p>

          <div className="flex items-center gap-4">
            {[0,1,2,3].map((i) => (
              <Input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                className="w-14 h-14 text-center text-xl rounded-xl forms-field-container"
                value={activeValues[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-10">
            <Button
              onClick={handleNext}
              disabled={!allFilled}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


