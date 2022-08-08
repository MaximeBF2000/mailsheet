import { useState } from 'react'
import { templater } from '../utils/templater.utils'

export default function Index() {
  const [text, setText] = useState('')
  const [name, setName] = useState('')

  return (
    <div className="w-2/3 mx-auto mt-8">
      <p className="mb-4">Name: {name || 'not defined'}</p>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Change name"
        className="border outline-none p-2 rounded mb-4 w-full"
      />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="border outline-none w-full p-2 rounded mb-4"
      />
      <h2 className="mb-4">Transformed text 👇</h2>
      <p>{templater(text, { name, age: 12 })}</p>
    </div>
  )
}
