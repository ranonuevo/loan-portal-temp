'use client'

import { Suspense } from 'react'
import { formConfig, formSchema, defaultValues, defaultWithValues } from './config'
import FormLayout from '../FormLayout'

export default function Page () {

  return (
    <Suspense>
      <FormLayout
        title='Dropdowns'
        formConfig={formConfig}
        formSchema={formSchema}
        defaultValues={defaultValues}
        defaultWithValues={defaultWithValues}
      >
        {(displayInput: any) => {
          return (
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                { displayInput('dummy1') }
                { displayInput('dummy2') }
              </div>
              <div className='grid grid-cols-2 gap-4 items-start'>
                { displayInput('continents') }
                { displayInput('countries') }
              </div>
              <div className='grid grid-cols-2 gap-4'>
                { displayInput('countries2') }
              </div>
              <div className='grid grid-cols-2 gap-4'>
                { displayInput('agree') }
              </div>
              <div className='grid grid-cols-2 gap-4'>
                { displayInput('openUpward') }
              </div>
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}