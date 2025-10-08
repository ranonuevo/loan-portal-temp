import * as React from "react"
import TickBox from '../../shared/TickBox'
import { isEqual } from '../../utils'

type Option = {
  label: string
  value: any
  [key: string]: any
}

type Value = Option | null

export type RadioGroupProps = {
  options?: Option[]
  label?: string
  value: Value
  onChange: any
  onBlur?: () => void
  disabled?: boolean
  hasError?: boolean
} & Omit<React.ComponentProps<"input">, "value" | "onChange">

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ 
    name,
    value,
    options = [],
    onChange,
    onBlur,
    disabled = false,
    hasError = false,
    ...props 
  }, ref) => {

    const handleBlur = (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        onBlur && onBlur()
      }
    }

    const isOptionSelected = (option: Option) => {
      return isEqual(value, option)
    }

    const changeOption = (option: Option) => {
      if (disabled) { return }
      if (isEqual(value, option)) {
        onChange?.(null)
      } else {
        onChange?.(option)
      }
    }
    
    const handleKeyDown = (e: any) => {
      switch(e.code) {
        case 'Enter':
        case 'Space':
          if (options?.length) {
            const elementIndex = e.target?.dataset?.elementIndex
            changeOption(options[elementIndex])
          } 
          break
      }
    }

    return (
      <div 
        ref={ref}
        onKeyDown={handleKeyDown} 
        onBlur={handleBlur}
        className='flex flex-col gap-2' 
      >
        {
          options.map((option, index) => {
            return (
              <TickBox 
                key={`${name}-radio-group-option-${option.value}-${index}`}
                isForRadioGroup={true}
                label={option.label}
                value={isOptionSelected(option)}
                handleTick={() => { changeOption(option) }}
                onBlur={onBlur}
                hasError={hasError}
                styleLabel={{}}
                disabled={disabled}
                index={index}
              />
            )
          })
        }
      </div>
    )
})

RadioGroup.displayName = "RadioGroup"

export { RadioGroup }