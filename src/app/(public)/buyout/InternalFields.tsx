import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { initialInternalValue } from './config'
import { LucidePlus } from 'lucide-react'

type Props = Record<string, never>

export default function InternalFields ({}: Props) {
  const hookForm: any = useFormContext()
  const { control, displayInput } = hookForm
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'internals'
  })

  return (
    <section className='bg-slate-100 p-4 mb-4 mt-5'>
      <h2 className='font-bold text-xl mb-4'>Internal Settlements</h2>

      <div className='flex flex-col gap-4'>
        {fields.map((field, index) => {
          return (
            <div key={`internal-${index}`} className='p-4 bg-white'>
              <div className='flex justify-between items-center mb-4'>
                <div>Settlement #{index + 1}</div>
                {fields.length > 1 && (
                  <Button type='button' onClick={() => remove(index)} variant='default' size='sm' className='h-[25px]'>Remove</Button>
                )}
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className="col-span-2">  
                  { displayInput(null, `internals.${index}.settlementProduct`) }
                </div>
                <div className="col-span-1">  
                  { displayInput(null, `internals.${index}.loanAmount`) }
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className='flex justify-center mt-4'>
        <Button 
          type='button'
          variant='default'
          className='rounded-full w-8 h-8 flex items-center justify-center'
          onClick={() => { 
            append({
              ...initialInternalValue
            }) 
          }}
        >
          <LucidePlus className='w-4 h-4 text-white' />
        </Button>
      </div>
    </section>
  )
}
