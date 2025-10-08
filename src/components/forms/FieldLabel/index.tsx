import React from 'react'
import { cn } from '@/lib/utils'

type BaseProps = {
  name?: string
  children: React.ReactNode
  disabled?: boolean
  hasError?: boolean
  className?: string
}

type LabelProps = BaseProps & {
  useLabelTag?: true
} & React.LabelHTMLAttributes<HTMLLabelElement>

type DivProps = BaseProps & {
  useLabelTag?: false
} & React.HTMLAttributes<HTMLDivElement>

type Props = LabelProps | DivProps

const FieldLabel = React.forwardRef<
  HTMLLabelElement | HTMLDivElement,
  Props
>((props, ref) => {
  const {
    useLabelTag = true,
    name = '',
    children,
    disabled = false,
    hasError = false,
    className: className2,
    ...otherProps
  } = props as Props

  const className = cn(
    'mb-2 block font-semibold text-sm',
    {
      'text-app-disabled': disabled,
      // 'text-error': hasError,
    },
    className2
  )

  if (useLabelTag) {
    // otherProps is the union; cast to label props for safe spreading
    const labelProps = otherProps as React.LabelHTMLAttributes<HTMLLabelElement>
    return (
      <label
        ref={ref as React.Ref<HTMLLabelElement>}
        htmlFor={name}
        className={className}
        {...labelProps}
      >
        {children}
      </label>
    )
  }

  const divProps = otherProps as React.HTMLAttributes<HTMLDivElement>
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={className} {...divProps}>
      {children}
    </div>
  )
})

FieldLabel.displayName = 'FieldLabel'

export { FieldLabel }
