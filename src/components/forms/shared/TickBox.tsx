import { cn } from '@/lib/utils'
import React from 'react'

type CheckboxProps = {
  isForRadioGroup?: boolean
  label?: React.ReactNode
  value: boolean
  handleTick: any
  onBlur?: any
  hasError: boolean
  disabled?: boolean
  index?: number
}

const TickBox = ({
  isForRadioGroup = false,
  label,
  value,
  handleTick,
  onBlur,
  hasError,
  disabled = false,
  index = 0
}: CheckboxProps) => { 

 return (
    <div
      className={cn({
        // 'cursor-pointer': true,
        'grid grid-cols-[auto_1fr] gap-3 items-start relative': true,
        'cursor-not-allowed forms-field-color-disabled-text': disabled
      })}
    >
      <div 
        tabIndex={0}
        onBlur={onBlur}
        onClick={(e) => {
          handleTick(e);
          onBlur?.(e);
        }}
        data-element-index={index}
        className={cn({
          'forms-field-container': true,
          'forms-field-color-error-border': hasError,
          'forms-field-container-disabled': disabled,
          'h-[20px] w-[20px] flex items-center justify-center mt-[2px]': true,
          'after:content-[""] after:w-[6px] after:h-[13px]': true,
          'after:hidden after:rotate-45 after:-mt-[2px] after:border-t-0 after:border-r-[2px] after:border-b-[3px] after:border-l-0': true,
          'rounded-full after:w-[6px] after:h-[11px]': isForRadioGroup,
          'after:block bg-primary border-primary after:border-white': value === true, // checked
        })} 
      />

      <span 
        onClick={(e) => {
          handleTick(e);
          onBlur?.(e);
        }}
        className={cn({
          'mt-[3px]': true,
        })}
      >
        { label }
      </span>
    </div>
 )
}

export default TickBox