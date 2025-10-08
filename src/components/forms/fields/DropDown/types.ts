export type SelectOption = {
  label: string
  value: any,
  [key: string]: any
}

type Placeholder = string


export const RETURN_TYPE_VALUE = 'value'
export const RETURN_TYPE_OBJECT = 'object'
export const RETURN_TYPE_ARRAY = 'array'
type ReturnType = typeof RETURN_TYPE_VALUE | typeof RETURN_TYPE_OBJECT | typeof RETURN_TYPE_ARRAY

export type SingleStringSelectProps = {
  returnType?: typeof RETURN_TYPE_VALUE
  value?: string | number
  onChange?: (value: string) => void // eslint-disable-line
}

export type SingleObjectSelectProps = {
  returnType?: typeof RETURN_TYPE_OBJECT
  value?: SelectOption | undefined
  onChange?: (value: SelectOption | undefined) => void // eslint-disable-line
}

export type MultipleSelectProps = {
  returnType?: typeof RETURN_TYPE_ARRAY
  value?: SelectOption[]
  onChange?: (value: SelectOption[]) => void // eslint-disable-line
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
  onBlur?: Function,
  maxOptionsHeight?: string,
  disabled?: boolean,
  readOnly?: boolean
  styleController?: React.CSSProperties | undefined
} & (SingleStringSelectProps | SingleObjectSelectProps | MultipleSelectProps)


export type ControllerProps = {
  value: any // TODO should not be any!!
  options: SelectOption[],
  returnType?: ReturnType
  placeholder: Placeholder
  changeOption: Function
  // controllerRef: React.RefObject<HTMLDivElement>
  handleClick: () => void
  isFocusController: boolean
  styleController: React.CSSProperties | undefined
  hasError: boolean
  disabled: boolean
  readOnly: boolean
} 