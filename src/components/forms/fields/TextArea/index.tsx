import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = {
  appendBulletEveryEnter?: boolean
  hasError?: boolean
} & React.ComponentProps<"textarea">

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    appendBulletEveryEnter = false, 
    hasError = false,
    disabled,
    ...props 
  }, ref) => {

  const bullet = '\u2022'
  const bulletWithSpace = `${bullet} `
  const enter = 13

  const handleKeyUp = (event: any) => {
    if (!appendBulletEveryEnter) return
    
    const { keyCode, target } = event
    const { selectionStart, value } = target
    
    if (keyCode === enter) {
      // console.log('a');
      target.value = [...value]
        .map((c, i) => i === selectionStart - 1
          ? `\n${bulletWithSpace}`
          : c
        )
        .join('')
        // console.log(target.value);
        
      target.selectionStart = selectionStart+bulletWithSpace.length
      target.selectionEnd = selectionStart+bulletWithSpace.length
    }
    
    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`
    }
  }

  return (
    <textarea
      className={cn(
        {
          'forms-field-container forms-field-input': true,
          'forms-field-color-error-border': hasError,
          'forms-field-container-disabled': disabled,
          'p-4': true
        },
        className
      )}
      ref={ref}
      onKeyUp={handleKeyUp}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export { Textarea }
