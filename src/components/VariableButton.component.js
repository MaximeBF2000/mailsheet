import React from 'react'

export const VariableButton = ({ variable, setText }) => {
  return (
    <button
      className="px-2 py-1 mb-1 bg-black text-white rounded"
      onClick={() => setText(prev => (prev += `{{ ${variable} }}`))}
    >
      {variable}
    </button>
  )
}
