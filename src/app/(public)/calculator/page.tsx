'use client'

import { Search, Edit2 } from 'lucide-react'
import Header from '@/components/ui/Header'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/forms/fields/Input'

// Product-specific calculator configurations
const calculatorConfigs = {
  'personal-finance': {
    title: 'Personal Finance calculator',
    minAmount: 15000,
    maxAmount: 4000000,
    defaultAmount: 20000,
    minMonths: 6,
    maxMonths: 48,
    defaultMonths: 48,
    profitRate: 3.4,
    minSalary: 5000,
    salaryErrorMessage: 'The salary provided does not meet the requirements. Please check the eligibility criteria and try again'
  },
  'home-finance': {
    title: 'Home Finance calculator',
    minAmount: 100000,
    maxAmount: 5000000,
    defaultAmount: 500000,
    minMonths: 60,
    maxMonths: 300,
    defaultMonths: 240,
    profitRate: 2.89,
    minSalary: 10000,
    salaryErrorMessage: 'The salary provided does not meet the requirements. Please check the eligibility criteria and try again'
  },
  'credit-card': {
    title: 'Credit Card calculator',
    minAmount: 5000,
    maxAmount: 50000,
    defaultAmount: 10000,
    minMonths: 6,
    maxMonths: 36,
    defaultMonths: 24,
    profitRate: 2.99,
    minSalary: 8000,
    salaryErrorMessage: 'The salary provided does not meet the requirements. Please check the eligibility criteria and try again'
  }
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' AED'
}

// Helper function to calculate monthly payment
const calculateMonthlyPayment = (amount: number, months: number, rate: number) => {
  const monthlyRate = rate / 100 / 12
  if (monthlyRate === 0) return amount / months
  
  const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(payment)
}

function CalculatorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('product') || 'personal-finance'
  const config = calculatorConfigs[productId as keyof typeof calculatorConfigs] || calculatorConfigs['personal-finance']

  // Form state
  const [employerName, setEmployerName] = useState('')
  const [monthlySalary, setMonthlySalary] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [financingAmount, setFinancingAmount] = useState(config.defaultAmount)
  const [paymentMonths, setPaymentMonths] = useState(config.defaultMonths)

  // UI state
  const [showSalaryError, setShowSalaryError] = useState(false)
  const [isEditingAmount, setIsEditingAmount] = useState(false)
  const [isEditingMonths, setIsEditingMonths] = useState(false)

  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(financingAmount, paymentMonths, config.profitRate)

  // Validate salary
  useEffect(() => {
    const salary = parseFloat(monthlySalary)
    setShowSalaryError(salary > 0 && salary < config.minSalary)
  }, [monthlySalary, config.minSalary])

  // Handle amount change
  const handleAmountChange = (value: number) => {
    const clampedValue = Math.max(config.minAmount, Math.min(config.maxAmount, value))
    setFinancingAmount(clampedValue)
  }

  // Handle months change
  const handleMonthsChange = (value: number) => {
    const clampedValue = Math.max(config.minMonths, Math.min(config.maxMonths, value))
    setPaymentMonths(clampedValue)
  }

  // Handle continue
  const handleApplyNow = () => {
    if (showSalaryError) return
    router.push('/get-started')
  }

  return (
    <div className="min-h-screen bg-white">

      <Header
        backHref={`/buyout`}
        backLabel="Back"
      />

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h1>

          {/* Confirmation message */}
          <p className="text-sm text-gray-500 mb-6">they have been entered correctly</p>

          {/* Current employer name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Current employer name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter current employer name"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                className="w-full h-12 rounded-xl forms-field-container pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Monthly salary */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Your monthly salary (in AED)
            </label>
            <Input
              type="number"
              placeholder="0"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              className="w-full h-12 rounded-xl forms-field-container"
            />
            {showSalaryError && (
              <div className="mt-2 space-y-1">
                <p className="text-sm text-red-600">{config.salaryErrorMessage}</p>
                <p className="text-sm text-gray-500">Income details will be verified, please ensure that they have been entered correctly</p>
              </div>
            )}
          </div>

          {/* Referral code */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Referral code (optional)
            </label>
            <Input
              type="text"
              placeholder=""
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full h-12 rounded-xl forms-field-container"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the referral code shared by our Sales executive, if available.
            </p>
          </div>

          {/* Financing amount */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">How much financing do you need?</h3>
              <button
                onClick={() => setIsEditingAmount(!isEditingAmount)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(financingAmount)}
              </div>
            </div>

            {/* Amount slider */}
            <div className="relative">
              <input
                type="range"
                min={config.minAmount}
                max={config.maxAmount}
                value={financingAmount}
                onChange={(e) => handleAmountChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #ec4899 ${((financingAmount - config.minAmount) / (config.maxAmount - config.minAmount)) * 100}%, #e5e7eb ${((financingAmount - config.minAmount) / (config.maxAmount - config.minAmount)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{formatCurrency(config.minAmount)}</span>
                <span>{formatCurrency(config.maxAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment months */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">In how many months do you wish to pay your finance?</h3>
              <button
                onClick={() => setIsEditingMonths(!isEditingMonths)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">
                {paymentMonths} Months
              </div>
            </div>

            {/* Months slider */}
            <div className="relative">
              <input
                type="range"
                min={config.minMonths}
                max={config.maxMonths}
                value={paymentMonths}
                onChange={(e) => handleMonthsChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #ec4899 ${((paymentMonths - config.minMonths) / (config.maxMonths - config.minMonths)) * 100}%, #e5e7eb ${((paymentMonths - config.minMonths) / (config.maxMonths - config.minMonths)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{config.minMonths} Months</span>
                <span>{config.maxMonths} Months</span>
              </div>
            </div>
          </div>

          {/* Monthly payment */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Indicative monthly payment*</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(monthlyPayment)}
            </div>
            <p className="text-sm text-gray-500">
              *Based on an illustrative profit rate of {config.profitRate}% per annum flat
            </p>
          </div>

          {/* Apply now button */}
          <Button
            onClick={handleApplyNow}
            disabled={showSalaryError || !employerName || !monthlySalary}
            className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply now
          </Button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #f97316;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #f97316;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatorContent />
    </Suspense>
  )
}
