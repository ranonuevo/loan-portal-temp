import { forwardRef } from 'react'
import { 
  SelectOption, 
  ControllerProps,
  RETURN_TYPE_ARRAY, 
  RETURN_TYPE_VALUE, 
  RETURN_TYPE_OBJECT
} from './types'
import { cn } from '@/lib/utils'
import { IconChevronDown } from '../../shared/IconChevronDown'

const Controller = forwardRef(({ 
  value,
  options,
  placeholder,
  returnType,
  changeOption,
  handleClick,
  styleController,
  hasError,
  disabled,
  readOnly,
  isFocusController
}: ControllerProps, ref: React.Ref<HTMLDivElement>) => {

  const renderPlaceholder = () => <span className='forms-field-color-placeholder-text whitespace-nowrap'>{ placeholder }</span>

  const renderValue = () => {
    if (returnType === RETURN_TYPE_VALUE) {
      // find the obj using value
      const primitiveValue = value as string | number | boolean | undefined
      const foundObj = options.find((o: SelectOption) => o.value === primitiveValue)
      return foundObj? foundObj.label : renderPlaceholder()
    }

    if (returnType === RETURN_TYPE_OBJECT) {
      const isSelectOption = (
        v: unknown
      ): v is SelectOption => typeof v === 'object' && v !== null && 'label' in v && 'value' in v
      return isSelectOption(value)? value.label : renderPlaceholder()
    }

    if (returnType === RETURN_TYPE_ARRAY) {
      if (!Array.isArray(value) || value.length === 0) return renderPlaceholder()

      return (
        <div className='flex items-center flex-wrap box-border gap-2'>
          {
            (value as SelectOption[]).map((option: SelectOption) => {
              return (
                <div 
                  className='p-1 rounded-md flex justify-start bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  key={String(option.value)}
                >
                  <div className={cn({
                    'whitespace-break-spaces break-all flex-1': true
                  })}>{ option.label }</div>

                  <div 
                    className={cn({
                      'w-[20px] text-[18px] text-right cursor-pointer transition text-gray-600 hover:text-gray-700': true,
                      'cursor-not-allowed pointer-events-none text-gray-400': disabled
                    })}
                    onClick={() => changeOption(option)}
                    title='remove'
                  >
                    &times;
                  </div>

                </div>
              )
            })
          }
        </div>
      )
    }
  }
  
  return (
    <div 
      className={cn({
        'forms-field-container forms-field-input p-0': true,
        'forms-field-color-error-border': hasError,
        'forms-field-container-disabled': disabled,
        'cursor-pointer': !disabled,
        'ring-1 ring-primary': Boolean(isFocusController)
      })}
      aria-readonly={readOnly}
    >
      <div 
        className={cn({
          'forms-field-container forms-field-input': true, // global.css'
          'flex items-center': true
        })} 
        tabIndex={0} 
        ref={ref}
        onClick={handleClick}
        style={styleController}
      >
        <div className={cn('flex-1 pr-3 overflow-hidden text-inherit')}>
          { renderValue() }
        </div>
        <IconChevronDown />
      </div>
    </div>
  )
})

Controller.displayName = 'Controller'

export default Controller