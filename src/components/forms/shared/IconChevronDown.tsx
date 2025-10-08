import { cn } from '@/lib/utils'

const IconChevronDown = ({}) => {
  return (
    <div 
      className={cn(
        'box-border relative block w-[18px] h-[18px] m-0 p-0',
        'flex justify-center items-center',
        'after:content-[""] after:w-[10px] after:h-[10px] after:-mt-[4px]',
        'after:border-primary after:border-b-[2px] after:border-r-[2px] after:rotate-45'
      )}
    ></div>
  )
}

export  { IconChevronDown }