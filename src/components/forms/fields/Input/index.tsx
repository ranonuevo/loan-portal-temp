import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = {
  togglePassword?: boolean,
  leadingContent?: React.ReactNode,
  leadingContentClassName?: string,
  trailingContent?: React.ReactNode,
  trailingContentClassName?: string,
  debounceDuration?: number
  onDebounceChange?: (e: any) => void,
  hasError?: boolean
  dataMask?: 'date' | undefined
} & React.ComponentProps<"input">

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    value,
    disabled,
    togglePassword, 
    leadingContent,
    leadingContentClassName,
    trailingContent,
    trailingContentClassName,
    debounceDuration = 0,
    onDebounceChange,
    hasError = false,
    dataMask,
    ...props 
  }, ref) => {

    const [inputValue, setInputValue] = React.useState<any>(value ?? "")
    const [showPassword, setShowPassword] = React.useState(false)

    const [inputEventValue, setInputEventValue] = React.useState<any>(null)
    const inputType = type === "password" && togglePassword && showPassword ? "text" : type

    let onChangeProps: any = {}
    if (debounceDuration > 0) {
      onChangeProps = {
        value: inputValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          let nextValue = e.target.value
          if (dataMask === 'date') {
            nextValue = nextValue.replace(/[^0-9]/g, '')
              .slice(0, 8)
              .replace(/(\d{2})(\d)/, '$1/$2')
              .replace(/(\d{2})(\d)/, '$1/$2')
          }
          setInputValue(nextValue)
          setInputEventValue(e)
        },
      }
    } else {
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let nextValue = e.target.value
        if (dataMask === 'date') {
          nextValue = nextValue.replace(/[^0-9]/g, '')
            .slice(0, 8)
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
        }
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: nextValue
          }
        }
        props.onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
      onChangeProps = {
        value,
        onChange: handleChange
      }
    }

    React.useEffect(() => {
      if (debounceDuration === 0) return // don't run debounce
  
      const timeout = setTimeout(() => {
        const SyntheticBaseEvent = {
          ...inputEventValue,
          target: {
            ...inputEventValue?.target,
            value: inputValue
          }
        }
        onDebounceChange?.(SyntheticBaseEvent)
        props?.onChange?.(SyntheticBaseEvent)
      }, debounceDuration)

      return () => clearTimeout(timeout)
    }, [inputValue]) // eslint-disable-line
  
    React.useEffect(() => {
      if (debounceDuration === 0) return // don't run debounce related
      setInputValue(value)
    }, [value]) // eslint-disable-line

    return (
      <div className="w-full relative rounded-md overflow-hidden">
        {leadingContent && (
          <div className={cn({
            "absolute left-[1px] top-[1px] rounded-tl-[7px] rounded-bl-[7px]": true, 
            "min-w-[28px] h-[calc(100%-2px)] flex justify-center items-center": true
            }, leadingContentClassName)}>
            { leadingContent }
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={cn({
            'forms-field-container forms-field-input': true,
            'forms-field-color-error-border': hasError,
            'forms-field-container-disabled': disabled,
            'pl-8': leadingContent,
            'pr-8': trailingContent,
          }, className)}
          {...props}
          {...onChangeProps}
        />
        {(trailingContent || togglePassword) && (
          <div className={cn({
            "absolute right-[1px] top-[1px] rounded-tr-[7px] rounded-br-[7px]": true, 
            "min-w-[28px] h-[calc(100%-2px)] flex justify-center items-center": true
          }, trailingContentClassName )}>
            {trailingContent}
            {togglePassword && (
              <span 
                onClick={() => setShowPassword(!showPassword)} 
                className="cursor-pointer text-sm text-muted-foreground"
              >
                {showPassword ? "hide" : "show"}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
