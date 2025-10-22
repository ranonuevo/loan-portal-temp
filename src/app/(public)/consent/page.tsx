'use client'

import { Search } from 'lucide-react'
import Header from '@/components/ui/Header'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/forms'

// Consent items configuration
const consentItems = [
  {
    id: 'key-facts',
    label: 'Key Facts Statement',
    isLink: true,
    checked: true
  },
  {
    id: 'processing-fees',
    label: 'Processing & documentation fees',
    isLink: true,
    details: '1.05% of the finance amount (min. AED 525 & max. AED 2,625)',
    checked: false
  },
  {
    id: 'takaful-fee',
    label: 'Monthly life Takaful fee',
    isLink: true,
    details: '(0.0146475% of the finance outstanding amount)',
    checked: false
  },
  {
    id: 'account-statement',
    label: 'I consent to the one-time release of my account statement from UAEFTS for the bank to assess my eligibility for the product',
    isLink: false,
    checked: false
  },
  {
    id: 'credit-bureau',
    label: 'I authorize the bank to check my Al Etihad Credit Bureau (AECB) records',
    isLink: false,
    checked: false
  },
  {
    id: 'privacy-policy',
    label: 'I have read, I understand and I acknowledge Al Hilal\'s privacy policy, which explains how Al Hilal uses personal data that it collects or generates in relation to its products and services',
    isLink: false,
    checked: false
  }
]

export default function ConsentPage() {
  const router = useRouter()
  const [consents, setConsents] = useState(
    consentItems.reduce((acc, item) => {
      acc[item.id] = item.checked
      return acc
    }, {} as Record<string, boolean>)
  )

  // Check if all required consents are given
  const allConsentsGiven = Object.values(consents).every(Boolean)

  const handleConsentChange = (id: string, checked: boolean) => {
    setConsents(prev => ({
      ...prev,
      [id]: checked
    }))
  }

  const handleAccept = () => {
    if (allConsentsGiven) {
      router.push('/open-account')
    }
  }

  const handleLinkClick = (label: string) => {
    // Handle link clicks - in a real app, these would open documents or modals
    console.log('Opening:', label)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header backHref="/get-started" backLabel="Back" rightActions={<button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"><Search className="w-4 h-4 text-gray-600" /></button>} />

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Consent & agreements</h1>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full" style={{ width: '16.67%' }}></div>
          </div>

          {/* Introduction */}
          <p className="text-gray-500 text-sm mb-2">Let&apos;s set you up to start your application</p>
          <p className="text-gray-700 text-sm mb-8">I agree, accept and consent to the following:</p>

          {/* Consent items */}
          <div className="space-y-6 mb-8">
            {consentItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <CheckBox
                  value={consents[item.id]}
                  onChange={(value) => handleConsentChange(item.id, Boolean(value))}
                  hasError={false}
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {item.isLink ? (
                      <span 
                        className="text-orange-500 hover:text-orange-600 underline cursor-pointer"
                        onClick={() => handleLinkClick(item.label)}
                      >
                        {item.label}
                      </span>
                    ) : item.id === 'privacy-policy' ? (
                      <>
                        I have read, I understand and I acknowledge{' '}
                        <span 
                          className="text-orange-500 hover:text-orange-600 underline cursor-pointer"
                          onClick={() => handleLinkClick('Al Hilal\'s privacy policy')}
                        >
                          Al Hilal&apos;s privacy policy
                        </span>
                        , which explains how Al Hilal uses personal data that it collects or generates in relation to its products and services
                      </>
                    ) : (
                      item.label
                    )}
                  </div>
                  {item.details && (
                    <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Accept button */}
          <Button
            onClick={handleAccept}
            disabled={!allConsentsGiven}
            className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            I accept
          </Button>
        </div>
      </div>
    </div>
  )
}
