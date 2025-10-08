'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight, LucideIcon } from 'lucide-react'

// Types
interface MainProduct {
  id: string
  title: string
  description: string
  href: string
  imageUrl: string
  imageAlt: string
}

interface ProductItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl: string
  imageAlt: string
}

// Data
const mainProducts: MainProduct[] = [
  {
    id: 'credit-card',
    title: 'Al Hilal Bank Credit card',
    description: 'Earn rewards by applying for a Al Hilal Bank credit card',
    href: '/products/credit-card',
    imageUrl: 'https://images.unsplash.com/photo-1654263937079-f63a3ea4d48b?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Credit card illustration'
  },
  {
    id: 'personal-finance',
    title: 'Personal Finance',
    description: 'Turn your dreams into reality with Al Hilal Bank\'s Personal Finance',
    href: '/products/personal-finance',
    imageUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Personal finance illustration'
  }
]

const productItems: ProductItem[] = [
  {
    id: 'home-finance',
    title: 'Home Finance',
    description: 'Your home. Financed the right way',
    href: '/products/home-finance',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop&crop=center',
    imageAlt: 'Home finance icon'
  },
  {
    id: 'wakala-deposit',
    title: 'Wakala deposit',
    description: 'Grow your savings. The smart, Shariah-compliant way',
    href: '/products/wakala-deposit',
    imageUrl: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=200&h=200&fit=crop&crop=center',
    imageAlt: 'Savings deposit icon'
  },
  {
    id: 'business-banking',
    title: 'Business Banking',
    description: 'Solutions for your business growth',
    href: '/products/business-banking',
    imageUrl: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=200&h=200&fit=crop&crop=center',
    imageAlt: 'Business banking icon'
  }
]

// Components
const MainProductCard = ({ product }: { product: MainProduct }) => {
  const { title, description, href, imageUrl, imageAlt } = product
  
  return (
    <Link href={href} className="block bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h2>
          <p className="text-text-muted text-lg mb-6">{description}</p>
          <Button variant="marhaba" className="h-12 px-8 rounded-full text-lg font-medium">
            Apply Now
          </Button>
        </div>
        <div className="flex-shrink-0">
          <div className="relative w-48 h-32 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

const ProductItemCard = ({ product }: { product: ProductItem }) => {
  const { title, description, href, imageUrl, imageAlt } = product
  
  return (
    <Link href={href} className="group block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-text-muted text-sm">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </Link>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-marhaba rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome to Al Hilal Bank</h1>
              <p className="text-text-muted text-sm md:text-base">Select a Al Hilal product to begin your Financial Journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Apply Now Banner */}
          <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-marhaba rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-lg font-semibold text-gray-800">Apply Now</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold">-</div>
          </div>

          {/* Main Product Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {mainProducts.map((product) => (
              <MainProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Al Hilal Products Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Al Hilal products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productItems.map((product) => (
                <ProductItemCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
