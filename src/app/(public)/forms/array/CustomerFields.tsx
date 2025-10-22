
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { initialCustomerValue } from './config'

type Props = Record<string, never>

export default function CustomerFields ({}: Props) {
  const hookForm: any = useFormContext() 
  const { control, displayInput, formState: { errors } } = hookForm
  console.log(errors)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'customers'
  })

  return (
    <section className='bg-slate-100 p-4 mb-4 mt-5'>
      <h2 className='font-bold text-xl mb-4'>Customers</h2>

      <div className='flex flex-col gap-4'>
        {fields.map((field, index) => {
          return (
            <div key={`education-${index}`} className='p-4 bg-white'>
              <div className='flex justify-between items-center mb-4'>
                <div>Customer #{index + 1}</div>
                <Button type='button' onClick={() => remove(index)} variant='default' size='sm' className='h-[25px]'>Remove</Button>
              </div>
                
              <div className='grid grid-cols-2 gap-10 gap-x-12'>
                { displayInput(null, `customers.${index}.name`) }
                { displayInput(null, `customers.${index}.continents`) }
                { displayInput(null, `customers.${index}.countries`) }
                { displayInput(null, `customers.${index}.timeHours`) }
              </div>
            </div>
          )
        })}
      </div>
      
      <div className='flex justify-end mt-4'>
        <Button 
          type='button'
          variant='default'
          onClick={() => { 
            append({
              ...initialCustomerValue
            }) 
          }}
        >
          Add Customer
        </Button>
      </div>
    </section>
  )
}