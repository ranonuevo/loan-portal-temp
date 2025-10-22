'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  SelectOption, 
  DropDownProps, 
  RETURN_TYPE_ARRAY, 
  RETURN_TYPE_VALUE, 
  RETURN_TYPE_OBJECT
} from './types'
import Controller from './Controller'
import { cn } from '@/lib/utils'
import { isEqual, containsObject } from '../../utils'
import { is } from 'zod/locales'

export type { SelectOption, DropDownProps }

const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(({ 
  returnType,
  removeOptionWhenSelected = true, // applicable only in multipleSelection = true TODO
  disableToggleOnSelectedOption = false, // applicable only in multipleSelection = false TODO
  options = [],
  optionOneLiner = true,
  value = null,
  placeholder = 'Select an option',
  noOptionsLabel = 'No options available',
  hasError = false,
  onChange,
  onBlur,
  disabled = false,
  readOnly = false,
  maxOptionsHeight = '15rem',
  styleController
}, ref) => {
  const controllerRef = useRef<HTMLDivElement>(null)
  const optionsListRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [isFocusController, setFocusController] = useState<boolean>(false)
  let filteredOptions = [...options]

  if (returnType === RETURN_TYPE_ARRAY && removeOptionWhenSelected) {
    const listOfValues = Array.isArray(value)? [...value] : []
    filteredOptions = filteredOptions.filter(o => !containsObject(listOfValues, o))
  }

  if (filteredOptions.length === 0) {
    filteredOptions.push({ label: noOptionsLabel, value: ''})
  }

  const focusController = () => {
    setFocusController(true)
    controllerRef.current?.focus()
  }
  const closeOptions = () => {
    setIsOpen(false)
    setHighlightedIndex(null)
  }

  const openOptions = () => {
    if (disabled || readOnly) return
    setIsOpen(prev => !prev)
  }

  const changeOption = (option: SelectOption) => {
    if (onBlur) onBlur()

    if (filteredOptions.length === 1 && option?.label === noOptionsLabel) return

    if (returnType === RETURN_TYPE_VALUE) {
      if (disableToggleOnSelectedOption && isEqual(option?.value, value)) return
      onChange?.(!isEqual(option?.value, value)? option?.value : '')
    }

    if (returnType === RETURN_TYPE_OBJECT) {
      const isEqualValue = isEqual(option, value)
      if (disableToggleOnSelectedOption && isEqualValue) return
      onChange?.(!isEqualValue? option : undefined)
    }

    if (returnType === RETURN_TYPE_ARRAY) {
      if (Array.isArray(value) && containsObject(value, option)) {
        onChange?.(value.filter(o => !isEqual(o, option)))
      } else {
        const valueArr = Array.isArray(value)? value : []
        onChange?.([...valueArr, option])
      }
    } 
  }

  const isOptionSelected = (option: SelectOption) => {
    if (!options.length) return false

    if (returnType === RETURN_TYPE_VALUE) {
      return isEqual(option?.value, value)
    }

    if (returnType === RETURN_TYPE_OBJECT) {
      return isEqual(option, value)
    }
    
    if (returnType === RETURN_TYPE_ARRAY) {
      return containsObject(Array.isArray(value)? value : [], option)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch(e.code) {
      case 'Space':
        openOptions()
        break
      case 'Enter':
        if (isOpen && highlightedIndex !== null) {
          changeOption(filteredOptions[highlightedIndex])
          closeOptions()
          focusController()
        }
        break
      case 'Escape':
        closeOptions()
        break
      case 'ArrowUp':
      case 'ArrowDown': {
        if (!isOpen) {
          openOptions()
          break
        }

        const newValue = (highlightedIndex !== null? highlightedIndex : -1) + (e.code === 'ArrowDown'? 1 : -1)
        if (newValue >= 0 && newValue < filteredOptions.length) {
          setHighlightedIndex(newValue)
        }
        break
      } 
      case 'Tab': {
        closeOptions()
        setFocusController(false)
        if (onBlur) onBlur()
        break
      }
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closeOptions()
      setFocusController(false)
      if (onBlur) onBlur()
    }
  }

  useEffect(() => {
    // Scroll to top of the options list whenever options change
    if (optionsListRef.current) {
      optionsListRef.current.scrollTop = 0
    }
  }, [options])

  return (
    <div 
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={cn(
        'relative w-full text-base'
      )}
      ref={ref}
    >
      <Controller 
        value={value}
        options={options}
        placeholder={placeholder}
        returnType={returnType}
        changeOption={changeOption}
        ref={controllerRef}
        handleClick={() => {
          setFocusController(true)
          openOptions()
        }}
        isFocusController={isFocusController}
        styleController={styleController}
        hasError={hasError}
        disabled={disabled}
        readOnly={readOnly}
      />
      
      {/* Options List */}
      <div 
        ref={optionsListRef}
        className={cn(
          'w-full bg-white',
          'absolute z-[51] top-[100%] left-0 m-0 p-0  mt-2 overflow-y-auto app-box-shadow',
        )} 
        tabIndex={-1} 
        style={{
          maxHeight: maxOptionsHeight, 
          boxShadow: isOpen? 'rgb(13 22 38 / 10%) 0px 0px 0px 1px, rgb(13 22 38 / 10%) 0px 4px 11px' : 'none'
        }}
      >
        <div className={cn({
          'hidden ': true,
          'block border border-gray-100': isOpen
          })}
        >
          {
            filteredOptions.map((option, index) => {
              const isSelected = isOptionSelected(option)
              return (
                <div 
                  key={String(option.value)} 
                  onClick={(e) => {
                    e.stopPropagation()
                    changeOption(option)
                    closeOptions()
                    focusController()
                  }}  
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    'cursor-pointer break-all p-[16px] text-sm',
                    {
                      'bg-gray-100 text-black ': isSelected || highlightedIndex === index,
                      'whitespace-nowrap break-normal overflow-hidden text-ellipsis': optionOneLiner
                    }
                  )}
                >
                  { isSelected? (
                    <span className={cn(
                      'inline-block rotate-45 h-[12px] w-[7px] mr-2',
                      'border-b-[2px] border-solid border-b-primary',
                      'border-r-[2px] border-r-primary',
                    )} />
                  ) : ''}
                  { option.label }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
})

DropDown.displayName = "DropDown"

export { DropDown }
