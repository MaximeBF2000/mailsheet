import { genId } from '../utils/str.utils'

export const Table = ({ className, headers, rows }) => {
  return (
    <table className={`table ${className}`}>
      <thead>
        <tr className="bg-black text-white">
          {headers?.map(header => (
            <th key={header} className="py-4 px-8">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row, i) => (
          <tr
            key={genId()}
            className={`hover:bg-gray-400 ${
              i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
            }`}
          >
            {headers?.map(header => (
              <td
                className={`py-4 px-8 whitespace-nowrap max-w-md overflow-hidden ${
                  row?.[header] === null ? 'italic text-gray-700' : ''
                }`}
                key={genId()}
              >
                {row?.[header]}
                {row?.[header] === null && 'null'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
