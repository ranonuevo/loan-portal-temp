'use client'

import { Suspense } from 'react'
import { formConfig, formSchema, defaultValues, defaultWithValues } from './config'
import FormLayout from '../FormLayout'

export default function Page () {
  return (
    <Suspense>
      <FormLayout
        title='Extended Inputs'
        formConfig={formConfig}
        formSchema={formSchema}
        defaultValues={defaultValues}
        defaultWithValues={defaultWithValues}
      >
        {(displayInput: any) => {
          return (
            <div className='grid grid-cols-2 gap-10 gap-x-12'>
              <div>{ displayInput('timeHours') }</div>
              <div>{ displayInput('timeMinutes') }</div>
              <div>{ displayInput('amount') }</div>
              <div>{ displayInput('mobile') }</div>
              <div>{ displayInput('dateOfBirth') }</div>
              <div>{ displayInput('debounce') }</div>
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}