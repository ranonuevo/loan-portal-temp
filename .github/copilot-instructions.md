# AI Agent Instructions for Marhaba Loan App

## Project Overview
This is a Next.js-based loan application portal using the App Router pattern. The application implements a multi-step loan application process with a focus on user experience and Islamic banking principles.

## Architecture & Structure

### Key Directories
- `src/app/(public)/*` - Public routes and pages
- `src/components/*` - Reusable UI components
- `src/components/forms/*` - Form components and field renderers
- `src/components/ui/*` - Base UI components (buttons, alerts, etc.)

### Important Patterns

#### Form Management
Forms are built using a custom form system with field renderers:
- See `src/components/forms/FieldRenderer/index.tsx` for the core field rendering logic
- Field configurations are stored in `config.ts/tsx` files next to their respective pages
- Example: `src/app/(public)/forms/extended-inputs/config.tsx`

#### Navigation Flow
The application follows a structured user journey:
1. Product Selection (`/products/[id]`)
2. ID Verification (`/scan-id`)
3. Consent Management (`/consent`)
4. Personal Details (`/personal-details`)
5. Additional Steps (varies by product)

#### UI Components
- Uses shadcn/ui as base components (see `components/ui/*`)
- Consistent gradient styling in buttons (from orange-500 to pink-500)
- Responsive design with mobile-first approach

### Project Conventions

#### Styling
- TailwindCSS for styling
- Custom variables defined in `src/app/globals.css`
- Key brand colors:
  ```css
  --gradient-peach-start: 15 100% 70%;
  --gradient-coral-end: 340 82% 65%;
  ```

#### Page Structure
- Pages use 'use client' directive for client-side interactivity
- Consistent header structure with back navigation
- Progress indicators for multi-step forms

#### Form Fields
Custom field components follow this pattern:
```tsx
export interface FieldProps {
  value: any;
  onChange: (value: any) => void;
  hasError?: boolean;
  // Additional props as needed
}
```

### Development Workflow

#### Running the Project
```bash
npm install
npm run dev
```

#### Adding New Form Fields
1. Create component in `src/components/forms/fields/`
2. Add to `FieldRenderer` mapping
3. Create configuration in respective page's `config.ts`

### Common Patterns

#### Page Layout
```tsx
'use client'
export default function PageName() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        {/* Navigation */}
      </div>
      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          {/* Page Content */}
        </div>
      </div>
    </div>
  )
}
```

#### Button Styling
Use the `variant="marhaba"` prop for primary gradient buttons:
```tsx
<Button 
  variant="marhaba" 
  className="w-full h-14 text-lg font-semibold rounded-xl"
>
  Button Text
</Button>
```

### Integration Points
- Forms connect through Next.js App Router navigation
- State management is primarily through URL parameters and form submissions
- Image handling through Next.js Image component with appropriate sizing

### Testing & Quality
- Add test files next to the components they test
- Ensure mobile responsiveness for all new components
- Maintain accessibility standards with ARIA labels and semantic HTML