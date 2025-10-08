import * as React from "react"
import TickBox from '../../shared/TickBox'
import { containsObject, isEqual } from '../../utils'

type Option = {
  label: string
  value: unknown
  [key: string]: unknown
}

type Value = boolean | Option[]

export type CheckBoxProps = {
  options?: Option[]
  label?: React.ReactNode
  value: Value
  onChange: (val: Value) => void
  onBlur?: () => void
  disabled?: boolean
  hasError?: boolean
} & Omit<React.ComponentProps<"input">, "value" | "onChange">

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ 
    name,
    label,
    value,
    options = [],
    onChange,
    onBlur,
    disabled = false,
    hasError = false,
    // ...props 
  }, ref) => {
    const handleTick = () => {
      if (!disabled) {
        onChange(!value)
      }
    }

    const handleBlur = (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        if (onBlur) onBlur()
      }
    }

    const isOptionSelected = (option: Option) => {
      if (!Array.isArray(value)) return false
      return containsObject(value, option)
    }

    const changeOption = (option: Option) => {
      if (disabled || !Array.isArray(value)) return

      if (containsObject(value, option)) {
        onChange(value.filter((o) => !isEqual(o, option)))
      } else {
        onChange([...value, option])
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch(e.code) {
        case 'Enter':
        case 'Space':
          if (options?.length) {
            const target = e.target as HTMLElement
            const idx = target?.dataset?.elementIndex
            const elementIndex = typeof idx === 'string' ? parseInt(idx, 10) : NaN
            if (!Number.isNaN(elementIndex) && options[elementIndex]) {
              changeOption(options[elementIndex])
            }
          } else {
            handleTick()
          }
          break
      }
    }

    const renderTickBoxes = () => {
      if (options?.length) {
        return (
          <div 
            onKeyDown={handleKeyDown} 
            onBlur={handleBlur}
            className='flex flex-col gap-2' 
          >
            {
              options.map((option, index) => {
                return (
                  <TickBox 
                    key={`${name}-checkbox-option-${option.value}-${index}`}
                    label={option.label}
                    value={isOptionSelected(option)}
                    handleTick={() => { changeOption(option) }}
                    onBlur={() => { onBlur && onBlur() }}
                    hasError={hasError}
                    disabled={disabled}
                    index={index}
                  />
                )
              })
            }
          </div>
        )
      }

      return (
        <div 
          onKeyDown={handleKeyDown} 
        >
          <TickBox 
            label={label}
            value={Boolean(value)}
            handleTick={handleTick}
            onBlur={handleBlur}
            hasError={hasError}
            disabled={disabled}
          />
        </div>
      )
    }

    return (
      <div ref={ref}>
        { renderTickBoxes() }
      </div>
    )
})

CheckBox.displayName = "CheckBox"

export { CheckBox }