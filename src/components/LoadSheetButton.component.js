import React from 'react'

export const LoadSheetButton = ({ data, loading, success, error }) => {
  return (
    <button
      className="py-2 px-4 bg-black text-white whitespace-nowrap flex gap-3 items-center"
      type="submit"
    >
      {loading || success || error ? (
        <>
          {loading ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-transparent border-t-white rounded-full" />
              <span>Load sheet...</span>
            </>
          ) : (
            <>
              {data?.error ? (
                <>
                  <span>⛔️</span>
                  <span>Error loading</span>
                </>
              ) : (
                <>
                  <span>✅</span>
                  <span>Sheet loaded</span>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <span>Load sheet</span>
      )}
    </button>
  )
}
