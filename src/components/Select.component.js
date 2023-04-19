import { forwardRef } from 'react'

export const Select = forwardRef(({ options, className, ...props }, ref) => {
  return (
    <select
      {...props}
      className={`border outline-none p-2 rounded mb-4 focus-within:ring ring-green-500/50 ${className}`}
    >
      {options.map(option => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  )
})
