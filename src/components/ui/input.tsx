import { cn } from "@/lib/utils"
import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Custom props
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

