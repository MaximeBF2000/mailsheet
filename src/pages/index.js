import { useRef, useState } from 'react'
import { Input } from '../components/Input.component'
import { Textarea } from '../components/Textarea.component'
import { Table } from '../components/Table.component'
import { GoogleLogo } from '../components/svgs/GoogleLogo.svg'
import { useLogger } from '../hooks/useLogger.hook'
import { useRequest } from '../hooks/useRequest.hook'
import { templater } from '../utils/templater.utils'
import { LoadSheetButton } from '../components/LoadSheetButton.component'
import { VariableButton } from '../components/VariableButton.component'
import { Select } from '../components/Select.component'

export default function Index() {
  const textAreaRef = useRef(null)
  const [text, setText] = useState('')
  const [sheetLink, setSheetLink] = useState('')
  const [emailObject, setEmailObject] = useState('')
  const [toEmailColumn, setToEmailColumn] = useState('')
  const [template, setTemplate] = useState('')
  const variableSetter = useRef(setText)

  const { data, success, error, loading, request } = useRequest(3000)

  useLogger({ data })

  const handleClick = () => setTemplate(templater(text, data?.rows?.[0]))

  const loadSheet = evt => {
    evt.preventDefault()

    request('/api/read-spreadsheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spreadsheetUrl: sheetLink })
    })
  }

  const sendEmails = async () => {
    fetch('/api/send-emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: {
          name: 'Freezer',
          email: 'freezer.com@gmail.com',
          password: 'HFdv^!Vq^l04L4IH9bL7'
        },
        to: data.rows.map(row => ({
          email: row[toEmailColumn],
          subject: templater(emailObject, row),
          body: templater(text, row)
        }))
      })
    })
  }

  return (
    <div className="mx-auto w-2/3 pb-12">
      <div className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-7xl font-extrabold">
            ✉️ Mail<span className="text-green-500 ml-2">Sheet</span>
          </h1>
          <button className="transition flex gap-5 bg-black text-white py-4 px-8 rounded-full hover:scale-105">
            <GoogleLogo size={24} />
            <span>Login with Google</span>
          </button>
        </div>
        <p id="description" className="text-2xl text-gray-800">
          Send a 100 personalized emails from your Google spreadshit, all in a
          click !
        </p>
      </div>
      <form className="flex overflow-hidden rounded mb-8" onSubmit={loadSheet}>
        <Input
          value={sheetLink}
          onChange={e => setSheetLink(e.target.value)}
          placeholder="Put your google spreadsheet url here"
          className="w-full rounded-r-none rounded-t-none mb-0"
          required
        />
        <LoadSheetButton
          data={data}
          loading={loading}
          success={success}
          error={error}
        />
      </form>
      <div className="relative mt-6">
        <div className="row gap-3 mb-3 w-full">
          <span>Variables: </span>
          {!data?.rows && (
            <span className="italic text-gray-700">No variables</span>
          )}
        </div>
        <div className="flex items-center gap-y-1 gap-x-2 flex-wrap mb-3">
          {data?.rows &&
            Object.keys(data?.rows?.[0]).map(variable => (
              <VariableButton
                variable={variable}
                setText={variableSetter.current}
              />
            ))}
        </div>
        {sheetLink && data?.rows && (
          <Select
            value={toEmailColumn}
            onChange={evt => setToEmailColumn(evt.target.value)}
            options={Object.keys(data?.rows?.[0]).map(item => ({
              label: 'To: ' + item,
              value: item
            }))}
            className="w-full"
          />
        )}
        <Input
          value={emailObject}
          onChange={e => setEmailObject(e.target.value)}
          placeholder="Email object"
          className="w-full"
          onFocus={() => (variableSetter.current = setEmailObject)}
          onBlur={() => (variableSetter.current = setText)}
        />
        <Textarea
          ref={textAreaRef}
          placeholder="Your message here"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={10}
          className="w-full"
          resize={true}
          onFocus={() => (variableSetter.current = setText)}
          onBlur={() => (variableSetter.current = setText)}
        />
        <button
          onClick={sendEmails}
          className="p-2 rounded bg-black text-white"
        >
          Send emails
        </button>
      </div>
      <div className="flex gap-10 items-center mb-4">
        <h2>Transformed text 👇</h2>
        <button
          onClick={handleClick}
          className="p-2 rounded bg-black text-white"
        >
          Update template
        </button>
      </div>
      <p>{template}</p>
      <pre className="p-2 bg-slate-100/50">
        {data?.rows && JSON.stringify(data?.rows, null, 2)}
      </pre>
      <Table
        headers={data?.headers}
        rows={data?.rows}
        className="rounded max-w-lg overflow-hidden"
      />
    </div>
  )
}
