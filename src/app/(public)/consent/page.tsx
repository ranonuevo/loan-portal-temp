'use client'

import { Search } from 'lucide-react'
import Header from '@/components/ui/Header'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/forms'
import { runJob } from '@/lib/opus'
import { toast } from 'sonner'
import Link from 'next/link'
import { getAppData, updateAppData } from '@/lib/storage'

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
  const [jobLink, setJobLink] = useState('')
  const [consents, setConsents] = useState(
    consentItems.reduce((acc, item) => {
      acc[item.id] = item.checked
      return acc
    }, {} as Record<string, boolean>)
  )

  // Check if all required consents are given
  const allConsentsGiven = Object.values(consents).every(Boolean)

  const updateJobLink = (id: string) => {
    setJobLink(`https://app.opus.com/app/job/${id}`)
  }

  const handleConsentChange = (id: string, checked: boolean) => {
    setConsents(prev => ({
      ...prev,
      [id]: checked
    }))
  }

  const handleAccept = () => {
    if (!allConsentsGiven) return

    // Read persisted data and submit to Opus
    const submitAndContinue = async () => {
      const parsed = getAppData()

      if (!parsed) {
        toast.error('No application data found. Please complete the forms first.')
        return
      }

      toast.loading('Submitting application...', { id: 'opus-submit' })

      try {
        const workflowId = process.env.NEXT_PUBLIC_OPUS_WORKFLOW_APPLICATION || 'ud0Rg2Nwvv65krqz'

        // Build payload from stored values
        const personal = parsed.personalDetails || {}
        const calc = parsed.calculator || {}


        const formJson = {
          "json": {
              personal_details: {
                  applicant_fullname: personal.name ?? '',
                  applicant_email: personal.email ?? '',
                  applicant_mobile_number: personal.mobileNumber ?? '',
                  applicant_address: personal.address ?? '',
                  applicant_date_of_birth: personal.dateOfBirth ?? '',
                  applicant_hongkong_id: personal.identificationCardNumber ?? '',
                  applicant_monthly_salary: calc.monthlySalary ?? '',
              },
              loan_details: {
                  "loan_purpose": "N/A",
                  "loan_amount": calc.financingAmount ?? '',

                  // "loan_tenure_months": calc.paymentMonths ?? '',
                  // "employer_name": calc.employerName ?? '',
              }
          }
        }

        const payload: any = {
          hkid_image: { display_name: 'Identification Card', value: personal.identificationCardUrl, type: 'file' },
          proof_of_salary_document: { display_name: 'Proof of Salary Document', value: personal.proofOfSalaryUrl, type: 'file' },
          proof_of_address_document: { display_name: 'Proof of Address Document', value: personal.proofOfAddressUrl, type: 'file' },
          workflow_input_48wkqm05o: { display_name: 'Loan Underwriting Policy', value: 'https://files.opus.com/media/private/uploaded/media_7bf21d9e-7794-499a-8719-cced3afb6b5c.docx', type: 'file' },
          workflow_input_vcx62whsc: { display_name: 'Selfie Photo', value: personal.selfieUrl, type: 'file' },
          workflow_input_s5sblr5yu: { display_name: 'Loan Application Form', value: formJson, type: 'object' },

          // workflow_input_dob: { display_name: 'Date of birth', value: personal.dateOfBirth ?? '', type: 'str' },
          // workflow_input_nationality: { display_name: 'Nationality', value: personal.nationality ?? '', type: 'str' },
          // workflow_input_email: { display_name: 'Email', value: personal.email ?? '', type: 'str' },
          // workflow_input_gender: { display_name: 'Gender', value: personal.gender ?? '', type: 'str' },
          // workflow_input_employer: { display_name: 'Employer name', value: calc.employerName ?? '', type: 'str' },
          // workflow_input_monthly_salary: { display_name: 'Monthly salary', value: calc.monthlySalary ?? '', type: 'str' },
          // workflow_input_financing_amount: { display_name: 'Financing amount', value: calc.financingAmount ?? '', type: 'str' },
          // workflow_input_payment_months: { display_name: 'Payment months', value: calc.paymentMonths ?? '', type: 'str' },
        }

        const res = await runJob(workflowId, 'Marhaba loan application', 'Submission of collected application data', payload)

        if (!res.ok) {
          const errText = await res.text()
          throw new Error(errText)
        }

        const resultJson = await res.json()
        const { jobExecutionId } = resultJson
        updateJobLink(jobExecutionId)
        console.log('runJob response:', resultJson)
        toast.success('Application submitted successfully!', { id: 'opus-submit' })

        // Optionally mark consent in storage
        updateAppData({ consent: { givenAt: new Date().toISOString(), items: consents } })

        // router.push('/open-account')
      } catch (err: any) {
        console.error('Error submitting application to Opus', err)
        toast.error(`Submission failed: ${err?.message || err}`, { id: 'opus-submit' })
      }
    }

    submitAndContinue()
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

          {jobLink && (
            <div className='mb-10'>
              <Link href={jobLink} target='_blank' className='underline text-primary'>
                Go to { jobLink }
              </Link>
            </div>
          )}

          {!jobLink && (
            <Button
              onClick={handleAccept}
              disabled={!allConsentsGiven}
              className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              I accept
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
