import { forwardRef } from 'react'

export const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border outline-none p-2 rounded mb-4 focus-within:ring ring-green-500/50 ${className}`}
      {...props}
    />
  )
})
