'use client'

import { ArrowLeft, FileText, Building, User, DollarSign, Eye, File } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

// Application steps configuration
const applicationSteps = [
  {
    id: 'scan-id',
    title: 'ID Verification',
    icon: <FileText className="w-6 h-6" />,
    completed: false
  },
  {
    id: 'consent',
    title: 'Consent & agreements',
    icon: <FileText className="w-6 h-6" />,
    completed: false
  },
  {
    id: 'account',
    title: 'Open account',
    icon: <Building className="w-6 h-6" />,
    completed: false
  },
  {
    id: 'personal-details',
    title: 'Applicant personal details',
    icon: <User className="w-6 h-6" />,
    completed: false
  },
  {
    id: 'employment',
    title: 'Employment & income details',
    icon: <DollarSign className="w-6 h-6" />,
    completed: false
  },
  {
    id: 'expenses',
    title: 'Expense details',
    icon: <Eye className="w-6 h-6" />,
    completed: false
  },
  {
    id: 'finance-details',
    title: 'Personal Finance details',
    icon: <File className="w-6 h-6" />,
    completed: false
  }
]

export default function GetStartedPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/consent')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link 
            href="/consent" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Let&apos;s get started!</h1>
          
          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-8">Complete the below steps to start your application</p>

          {/* Application steps */}
          <div className="space-y-4 mb-8">
            {applicationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    step.completed ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </h3>
                  {step.completed && (
                    <p className="text-xs text-green-600 mt-1">Completed</p>
                  )}
                </div>
                {step.completed && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue button */}
          <Button
            onClick={handleContinue}
            className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
