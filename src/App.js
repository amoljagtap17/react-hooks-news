import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('reacthooks')

  useEffect(() => {
    getResults()
  }, [query])

  // We can't use async await in useEffect.
  // Error is thrown as useEffect needs to return function and not promise
  const getResults = async () => {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${query}`
    )

    setResults(response.data.hits)
  }

  return (
    <>
      <input type="text" onChange={event => setQuery(event.target.value)} />
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
