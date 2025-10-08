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

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!appendBulletEveryEnter) return
    
    const { keyCode, target } = event
    const textArea = target as HTMLTextAreaElement
    const { selectionStart, value } = textArea
    
    if (keyCode === enter) {
      // console.log('a');
      textArea.value = [...value]
        .map((c, i) => i === selectionStart - 1
          ? `\n${bulletWithSpace}`
          : c
        )
        .join('')
        // console.log(target.value);
        
      textArea.selectionStart = selectionStart+bulletWithSpace.length
      textArea.selectionEnd = selectionStart+bulletWithSpace.length
    }
    
    if (value[0] !== bullet) {
      textArea.value = `${bulletWithSpace}${value}`
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
