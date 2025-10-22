import { z } from 'zod'
import { FieldConfig } from '@/components/forms'

const mandatoryTxt = 'Mandatory field.'

const settlementProductOptions = [
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Personal Finance', value: 'personal_finance' },
  { label: 'Auto Finance', value: 'auto_finance' },
  { label: 'Home Finance', value: 'home_finance' },
  { label: 'Company Finance', value: 'company_finance' },
  { label: 'Over Draft', value: 'over_draft' },
]

const bankChildFields: FieldConfig[] = [
  {
    type: 'input',
    name: 'bankName',
    label: 'Bank name',
    fieldProps: {
      type: 'text',
      placeholder: 'Enter bank name'
    }
  },
  {
    type: 'dropdown',
    name: 'settlementProduct',
    label: 'Settlement Product',
    description: 'Select one or more products',
    fieldProps: {
      returnType: 'array',
      placeholder: 'Select product',
      options: settlementProductOptions
    }
  },
  {
    type: 'digits',
    name: 'loanAmount',
    label: 'Loan amount',
    fieldProps: {
      placeholder: '0'
    }
  }
]

const internalChildFields: FieldConfig[] = [
  {
    type: 'dropdown',
    name: 'settlementProduct',
    label: 'Settlement Product',
    description: 'Select one or more products',
    fieldProps: {
      returnType: 'array',
      placeholder: 'Select product',
      options: settlementProductOptions
    }
  },
  {
    type: 'digits',
    name: 'loanAmount',
    label: 'Loan amount',
    fieldProps: {
      placeholder: '0'
    }
  }
]

const employerChildFields: FieldConfig[] = [
  {
    type: 'checkbox',
    name: 'ahbExistingClient',
    label: 'AHB existing client?',
    fieldProps: {
      label: ''
    }
  },
  {
    type: 'input',
    name: 'employerName',
    label: 'Employer Name',
    fieldProps: {
      type: 'text',
      placeholder: 'Enter employer name'
    }
  },
  {
    type: 'digits',
    name: 'loanAmount',
    label: 'Loan amount',
    fieldProps: {
      placeholder: '0'
    }
  }
]

const banksSchema = z.object({
  bankName: z.string().min(1, { message: mandatoryTxt }),
  settlementProduct: z.array(z.any()).min(1, { message: mandatoryTxt }),
  loanAmount: z.string().min(1, { message: mandatoryTxt })
})

const internalSchema = z.object({
  settlementProduct: z.array(z.any()).min(1, { message: mandatoryTxt }),
  loanAmount: z.string().min(1, { message: mandatoryTxt })
})

const employerSchema = z.object({
  ahbExistingClient: z.boolean(),
  employerName: z.string().min(1, { message: mandatoryTxt }),
  loanAmount: z.string().min(1, { message: mandatoryTxt })
})

export const formSchema = z.object({
  buyout: z.boolean(),
  buyoutTypes: z.array(z.any()).optional(),
  banks: banksSchema.array().optional(),
  internals: internalSchema.array().optional(),
  employers: employerSchema.array().optional(),
  isDisableFields: z.boolean()
})

export const initialBankValue = { bankName: '', settlementProduct: [], loanAmount: '' }
export const initialInternalValue = { settlementProduct: [], loanAmount: '' }
export const initialEmployerValue = { ahbExistingClient: false, employerName: '', loanAmount: '' }

export const defaultValues: z.infer<typeof formSchema> = {
  buyout: true,
  buyoutTypes: [],
  banks: [],
  internals: [],
  employers: [],
  isDisableFields: false
}

export const formConfig: FieldConfig[] = [
  {
    type: 'checkbox',
    name: 'buyout',
    label: '',
    fieldProps: {
      label: 'Buyout loan?'
    }
  },
  {
    type: 'dropdown',
    name: 'buyoutTypes',
    label: 'Buyout Type',
    description: 'Select one or more buyout types',
    fieldProps: {
      returnType: 'array',
      removeOptionWhenSelected: false,
      placeholder: 'Select type',
      options: [
        { label: 'Bank', value: 'bank' },
        { label: 'Internal Settlement', value: 'internal' },
        { label: 'Employer', value: 'employer' }
      ]
    }
  },
  {
    type: 'input',
    name: 'banks',
    label: 'Banks',
    fieldProps: {},
    childFields: bankChildFields
  },
  {
    type: 'input',
    name: 'internals',
    label: 'Internal Settlements',
    fieldProps: {},
    childFields: internalChildFields
  },
  {
    type: 'input',
    name: 'employers',
    label: 'Employers',
    fieldProps: {},
    childFields: employerChildFields
  }
]

export default {}
