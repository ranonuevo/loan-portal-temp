'use client'

import { Suspense } from 'react'
import { formConfig, formSchema, defaultValues } from './config'
import FormLayout from '../FormLayout'
import CustomerFields from './CustomerFields'

export default function Page () {
  return (
    <Suspense>
      <FormLayout
        title='Array Of Fields'
        formConfig={formConfig}
        formSchema={formSchema}
        defaultValues={defaultValues}
      >
        {(displayInput: any) => {
          return (
            <div>
              <div className='grid grid-cols-2 gap-10 gap-x-12'>
                { displayInput('dummy1') }
                { displayInput('dummy2') }
              </div>

              <CustomerFields />

              <div className='grid grid-cols-2 gap-10 gap-x-12'>
                { displayInput('agree') }
              </div>
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}