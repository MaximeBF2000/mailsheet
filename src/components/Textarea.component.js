import { forwardRef } from 'react'

export const Textarea = forwardRef(
  ({ className, resize = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border outline-none p-2 rounded mb-4 focus:ring ring-green-500/50 ${
          resize ? '' : 'resize-none'
        } ${className}`}
        {...props}
      />
    )
  }
)
