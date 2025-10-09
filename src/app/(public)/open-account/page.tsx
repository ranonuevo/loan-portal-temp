'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OpenAccountPage() {
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
        <div className="max-w-md mx-auto text-center">
          {/* Header Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Continue your application</h1>

          {/* Bank Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Main building icon */}
              <div className="w-24 h-24 relative">
                {/* Roof */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-pink-500 to-red-500 rounded-t-lg"></div>
                {/* Building base */}
                <div className="absolute bottom-0 left-0 w-24 h-16 bg-gradient-to-b from-orange-400 to-yellow-500 rounded-b-lg">
                  {/* Arches */}
                  <div className="absolute bottom-2 left-2 w-6 h-8 bg-white/20 rounded-t-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-white/20 rounded-t-full"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-8 bg-white/20 rounded-t-full"></div>
                </div>
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-pink-200/30 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">An active account is required</h2>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            To apply for Personal Finance, you need an active account with us. Please apply after opening your account.
          </p>

          {/* Open Account Button */}
          <Button
            asChild
            className="w-full h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-medium shadow-lg"
          >
            <Link href="/products">
              Open account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
