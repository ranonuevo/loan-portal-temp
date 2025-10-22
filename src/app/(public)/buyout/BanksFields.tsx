import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { initialBankValue } from './config'
import { LucidePlus } from 'lucide-react'

type Props = Record<string, never>

export default function BanksFields ({}: Props) {
  const hookForm: any = useFormContext()
  const { control, displayInput } = hookForm
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'banks'
  })

  return (
    <section className='bg-slate-100 p-4 mb-4 mt-5'>
      <h2 className='font-bold text-xl mb-4'>Banks</h2>

      <div className='flex flex-col gap-4'>
        {fields.map((field, index) => {
          return (
            <div key={`bank-${index}`} className='p-4 bg-white'>
              <div className='flex justify-between items-center mb-4'>
                <div>Bank #{index + 1}</div>
                {fields.length > 1 && (
                  <Button type='button' onClick={() => remove(index)} variant='default' size='sm' className='h-[25px]'>Remove</Button>
                )}
              </div>

              <div className='grid grid-cols-3 gap-4'>
                { displayInput(null, `banks.${index}.bankName`) }
                { displayInput(null, `banks.${index}.settlementProduct`) }
                { displayInput(null, `banks.${index}.loanAmount`) }
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
              ...initialBankValue
            }) 
          }}
        >
          <LucidePlus className='w-4 h-4 text-white' />
        </Button>
      </div>
    </section>
  )
}
