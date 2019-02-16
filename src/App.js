import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])

  useEffect(() => {
    getResults()
  }, [])

  // We can't use async await in useEffect.
  // Error is thrown as useEffect needs to return function and not promise
  const getResults = async () => {
    const response = await axios.get(
      'https://hn.algolia.com/api/v1/search?query=reacthooks'
    )

    setResults(response.data.hits)
  }

  return (
    <>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
