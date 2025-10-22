import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface HeaderProps {
  backHref?: string
  backLabel?: string
  title?: string
  rightActions?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  backHref = '/',
  backLabel = 'Back',
  title,
  rightActions
}) => {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <Link href={backHref} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">{backLabel}</span>
        </Link>
        <div className="flex items-center gap-3">
          {rightActions ? rightActions : (
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
            </button>
          )}
        </div>
      </div>
      {title && <h1 className="text-2xl font-bold text-gray-900 mt-2">{title}</h1>}
    </div>
  )
}

export default Header
