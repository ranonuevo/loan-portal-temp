'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Calendar, DollarSign, User, CheckCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

// Product data interface
interface ProductDetails {
  id: string
  title: string
  description: string
  rate: string
  rateNote: string
  features: {
    icon: React.ReactNode
    title: string
    description: string
    color: string
  }[]
  eligibility: {
    title: string
    criteria: string[]
  }
  ctaText: string
  heroImage: string
}

// Product data
const productData: Record<string, ProductDetails> = {
  'personal-finance': {
    id: 'personal-finance',
    title: 'Al Hilal Personal Finance',
    description: 'Turn your dreams into reality with personal finance and profit rates starting from 3.10% per annum flat*',
    rate: '3.10%',
    rateNote: 'per annum flat*',
    features: [
      {
        icon: <DollarSign className="w-6 h-6" />,
        title: 'Financing up to 4 Million AED',
        description: "Don't put any limits to your plans with Al Hilal Personal Finance",
        color: 'bg-orange-500'
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: 'Flexible terms',
        description: 'Pay off your financing in payments over 6 to 48 months',
        color: 'bg-pink-500'
      },
      {
        icon: <User className="w-6 h-6" />,
        title: 'Individualized profit rate',
        description: 'Based on your profile',
        color: 'bg-blue-400'
      }
    ],
    eligibility: {
      title: 'Apply for a Personal Finance if you:',
      criteria: [
        'are a UAE national or resident',
        'are between 21 and 65 years old',
        'earn at least 5,000 AED a month and your salary is credited to an account with Al Hilal'
      ]
    },
    ctaText: "I'm interested",
    heroImage: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=400&fit=crop&crop=center'
  },
  'credit-card': {
    id: 'credit-card',
    title: 'Al Hilal Bank Credit Card',
    description: 'Earn rewards and enjoy exclusive benefits with our premium credit card',
    rate: '2.99%',
    rateNote: 'per annum flat*',
    features: [
      {
        icon: <DollarSign className="w-6 h-6" />,
        title: 'Up to 50,000 AED Credit Limit',
        description: 'Flexible credit limit based on your financial profile',
        color: 'bg-orange-500'
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: 'Rewards Program',
        description: 'Earn points on every purchase and redeem for exclusive rewards',
        color: 'bg-pink-500'
      },
      {
        icon: <User className="w-6 h-6" />,
        title: 'Premium Benefits',
        description: 'Enjoy airport lounge access and concierge services',
        color: 'bg-blue-400'
      }
    ],
    eligibility: {
      title: 'Apply for a Credit Card if you:',
      criteria: [
        'are a UAE national or resident',
        'are between 21 and 65 years old',
        'earn at least 8,000 AED a month',
        'have a good credit history'
      ]
    },
    ctaText: "Apply Now",
    heroImage: 'https://images.unsplash.com/photo-1654263937079-f63a3ea4d48b?w=800&h=400&fit=crop&crop=center'
  },
  'home-finance': {
    id: 'home-finance',
    title: 'Al Hilal Home Finance',
    description: 'Your home. Financed the right way with competitive rates and flexible terms',
    rate: '2.89%',
    rateNote: 'per annum flat*',
    features: [
      {
        icon: <DollarSign className="w-6 h-6" />,
        title: 'Up to 5 Million AED',
        description: 'Finance your dream home with competitive rates',
        color: 'bg-orange-500'
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: 'Flexible Repayment',
        description: 'Choose repayment terms from 5 to 25 years',
        color: 'bg-pink-500'
      },
      {
        icon: <User className="w-6 h-6" />,
        title: 'Expert Guidance',
        description: 'Get professional advice throughout your home buying journey',
        color: 'bg-blue-400'
      }
    ],
    eligibility: {
      title: 'Apply for Home Finance if you:',
      criteria: [
        'are a UAE national or resident',
        'are between 21 and 65 years old',
        'earn at least 10,000 AED a month',
        'have a stable employment history'
      ]
    },
    ctaText: "Apply Now",
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&crop=center'
  },
  'wakala-deposit': {
    id: 'wakala-deposit',
    title: 'Al Hilal Wakala Deposit',
    description: 'Grow your savings. The smart, Shariah-compliant way with competitive returns',
    rate: '4.25%',
    rateNote: 'per annum*',
    features: [
      {
        icon: <DollarSign className="w-6 h-6" />,
        title: 'Shariah Compliant',
        description: 'Ethical savings that align with Islamic principles',
        color: 'bg-orange-500'
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: 'Flexible Terms',
        description: 'Choose from 3, 6, 12, or 24-month terms',
        color: 'bg-pink-500'
      },
      {
        icon: <User className="w-6 h-6" />,
        title: 'Competitive Returns',
        description: 'Earn attractive returns on your savings',
        color: 'bg-blue-400'
      }
    ],
    eligibility: {
      title: 'Open a Wakala Deposit if you:',
      criteria: [
        'are a UAE national or resident',
        'are 18 years or older',
        'have a valid Emirates ID',
        'maintain minimum balance requirements'
      ]
    },
    ctaText: "Open Account",
    heroImage: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&h=400&fit=crop&crop=center'
  },
  'business-banking': {
    id: 'business-banking',
    title: 'Al Hilal Business Banking',
    description: 'Solutions for your business growth with comprehensive banking services',
    rate: '3.50%',
    rateNote: 'per annum flat*',
    features: [
      {
        icon: <DollarSign className="w-6 h-6" />,
        title: 'Business Accounts',
        description: 'Current and savings accounts tailored for businesses',
        color: 'bg-orange-500'
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: 'Trade Finance',
        description: 'Import and export financing solutions',
        color: 'bg-pink-500'
      },
      {
        icon: <User className="w-6 h-6" />,
        title: 'Dedicated Support',
        description: 'Personal relationship manager for your business',
        color: 'bg-blue-400'
      }
    ],
    eligibility: {
      title: 'Apply for Business Banking if you:',
      criteria: [
        'have a registered business in UAE',
        'have been in business for at least 6 months',
        'have valid trade license',
        'meet minimum turnover requirements'
      ]
    },
    ctaText: "Get Started",
    heroImage: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=800&h=400&fit=crop&crop=center'
  }
}

// Feature Card Component
const FeatureCard = ({ feature }: { feature: ProductDetails['features'][0] }) => {
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-xl">
      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
        {feature.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  )
}

// Eligibility Card Component
const EligibilityCard = ({ eligibility }: { eligibility: ProductDetails['eligibility'] }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{eligibility.title}</h3>
      <ul className="space-y-3">
        {eligibility.criteria.map((criterion, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{criterion}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProductDetailsPage() {
  const params = useParams()
  const product = productData[params.id as string]
  
  // Debug logging
  // console.log('Product ID:', params.id)
  // console.log('Product:', product)
  // console.log('Hero Image URL:', product?.heroImage)

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild variant="marhaba">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link href="/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{product.rateNote}</span>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-80 md:h-96 relative overflow-hidden bg-gray-200">
          <Image
            src={product.heroImage}
            alt={product.title}
            fill
            className="object-cover z-2"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.error('Image failed to load:', product.heroImage);
              // Set a fallback background color
              e.currentTarget.parentElement!.style.backgroundColor = '#3B82F6';
            }}
            onLoad={() => {
              // console.log('Image loaded successfully:', product.heroImage);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Content Card Overlay */}
        <div className="relative -mt-16 mx-6 bg-white rounded-t-3xl shadow-lg z-3">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{product.description}</p>
            
            {/* Features */}
            <div className="space-y-4 mb-8">
              {product.features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>

            {/* Eligibility */}
            <div className="mb-8">
              <EligibilityCard eligibility={product.eligibility} />
            </div>

            {/* Rate Note */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 text-center">
                *Equivalent to 5.85% per annum reducing balance
              </p>
            </div>

            {/* CTA Button */}
            <Button 
              variant="marhaba" 
              className="w-full h-14 text-lg font-semibold rounded-xl"
              asChild
            >
              <Link href="/personal-details">
                {product.ctaText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
