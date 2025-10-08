'use client'

import { Suspense } from 'react'
import { formConfig, formSchema, defaultValues, defaultWithValues } from './config'
import FormLayout from '../FormLayout'

export default function Page () {
  return (
    <Suspense>
      <FormLayout
        title='Textarea'
        formConfig={formConfig}
        formSchema={formSchema}
        defaultValues={defaultValues}
        defaultWithValues={defaultWithValues}
      >
        {(displayInput: any) => {
          return (
            <div className='grid grid-cols-2 gap-10 gap-x-12'>
              { displayInput('dummy1') }
              { displayInput('feedback') }
              { displayInput('concern') }
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}