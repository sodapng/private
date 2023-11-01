import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export function App() {
  const [urlSearchParams, setURLSearchParams] = useSearchParams({
    _page: '1',
    _limit: '9',
  })

  const [todos, setTodos] = useState<Post[]>([])
  const limit = Number(urlSearchParams.get('_limit'))
  const page = Number(urlSearchParams.get('_page'))

  useEffect(() => {
    const abortController = new AbortController()
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`

    fetch(url, {
      signal: abortController.signal,
    })
      .then((response) => response.json() as Promise<Post[]>)
      .then((json) => {
        if (!abortController.signal.aborted) {
          setTodos(json)
        }
      })

    return () => {
      abortController.abort()
    }
  }, [limit, page])

  const handleClickForPagination = (value: number) => () => {
    setURLSearchParams((prev) => {
      prev.set('_page', String(page + value))

      return prev
    })
  }

  const handleChangeForLimit = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setURLSearchParams((prev) => {
      prev.set('_limit', event.target.value)

      return prev
    })
  }

  return (
    <div>
      <div>
        <button disabled={page === 1} onClick={handleClickForPagination(-1)}>
          prev
        </button>
        <button
          disabled={page >= Math.ceil(100 / limit)}
          onClick={handleClickForPagination(1)}
        >
          next
        </button>
        <label>
          Limit:
          <select name="_limit" value={limit} onChange={handleChangeForLimit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      <ul>
        {todos.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  )
}
