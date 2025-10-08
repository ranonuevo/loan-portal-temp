import { FieldRenderer } from './FieldRenderer'
import { FieldLabel } from './FieldLabel'

// import AutoComplete from './AutoComplete'
import { Input, InputProps } from './fields/Input'
import { Textarea, TextareaProps } from './fields/TextArea'
import { CheckBox, CheckBoxProps } from './fields/CheckBox'
import { Digits, DigitsProps } from './fields/Digits'
import { DropDown, DropDownProps } from './fields/DropDown'
import { RadioGroup, RadioGroupProps } from './fields/RadioGroup'
// import DropDown2 from './DropDown2'
// import SearchTags from './SearchTags'
// import Slider from './Slider'

export * from './utils'
export * from './form'

export {
  FieldRenderer,
  FieldLabel,

  Input,
  Textarea,
  Digits,
  DropDown,
  // // DropDown2,
  CheckBox,
  RadioGroup
  // AutoComplete,
  // SearchTags,
  // Slider
}

export const TYPE_INPUT = 'input'
export const TYPE_PASSWORD = 'password'
export const TYPE_DIGITS = 'digits'
export const TYPE_TEXTAREA = 'textarea'
export const TYPE_DROPDOWN = 'dropdown'
export const TYPE_CHECKBOX = 'checkbox'
export const TYPE_RADIO_GROUP = 'radio-group'


type BaseFieldConfig = {
  name: string
  label?: string
  description?: string
  isDisabled?: boolean | ((values: Record<string, unknown>, name: string,  index: number | undefined) => boolean)
  childFields?: BaseFieldConfig[]
}
type InputFieldConfig = BaseFieldConfig & { type: typeof TYPE_INPUT, fieldProps?: InputProps }
type TextareaFieldConfig = BaseFieldConfig & { type: typeof TYPE_TEXTAREA, fieldProps?: TextareaProps }
type DigitsFieldConfig = BaseFieldConfig & { type: typeof TYPE_DIGITS, fieldProps?: DigitsProps }
type CheckboxFieldConfig = BaseFieldConfig & { type: typeof TYPE_CHECKBOX, fieldProps?: Omit<CheckBoxProps, 'value' | 'onChange'> }
type RadioGroupFieldConfig = BaseFieldConfig & { type: typeof TYPE_RADIO_GROUP, fieldProps?: Omit<RadioGroupProps, 'value' | 'onChange'> }
type DropdownFieldConfig = BaseFieldConfig & { type: typeof TYPE_DROPDOWN, fieldProps?: DropDownProps }

export type FieldConfig = InputFieldConfig | TextareaFieldConfig | DigitsFieldConfig | CheckboxFieldConfig | RadioGroupFieldConfig | DropdownFieldConfig
