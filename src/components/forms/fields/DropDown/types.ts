export type SelectOption = {
  label: string
  value: string | number | boolean,
  [key: string]: unknown
}

type Placeholder = string


export const RETURN_TYPE_VALUE = 'value'
export const RETURN_TYPE_OBJECT = 'object'
export const RETURN_TYPE_ARRAY = 'array'
type ReturnType = typeof RETURN_TYPE_VALUE | typeof RETURN_TYPE_OBJECT | typeof RETURN_TYPE_ARRAY

export type SingleStringSelectProps = {
  returnType?: typeof RETURN_TYPE_VALUE
  value?: string | number | boolean
  onChange?: (value: string | number | boolean) => void
}

export type SingleObjectSelectProps = {
  returnType?: typeof RETURN_TYPE_OBJECT
  value?: SelectOption | undefined
  onChange?: (value: SelectOption | undefined) => void
}

export type MultipleSelectProps = {
  returnType?: typeof RETURN_TYPE_ARRAY
  value?: SelectOption[]
  onChange?: (value: SelectOption[]) => void
}

export type DropDownProps = {
  removeOptionWhenSelected?: boolean
  betweenLabelAndInputComponents?: () => React.ReactNode
  disableToggleOnSelectedOption?: boolean,
  options?: SelectOption[]
  placeholder?: Placeholder
  noOptionsLabel?: string
  optionOneLiner?: boolean
  hasError?: boolean,
  onBlur?: () => void,
  maxOptionsHeight?: string,
  disabled?: boolean,
  readOnly?: boolean
  styleController?: React.CSSProperties | undefined
} & (SingleStringSelectProps | SingleObjectSelectProps | MultipleSelectProps)


export type ControllerProps = {
  value: unknown
  options: SelectOption[],
  returnType?: ReturnType
  placeholder: Placeholder
  changeOption: (option: SelectOption) => void
  handleClick: () => void
  styleController: React.CSSProperties | undefined
  hasError: boolean
  disabled: boolean
  readOnly: boolean
  isFocusController?: boolean
} 