import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { getRepos } from '../state/features/search-repo-slice/searchRepoSlice'
import { RepoList } from './RepoList'
export const SearchForm: FC = () => {
  const dispatch: any = useDispatch()
  const [term, setTerm] = useState('')
  const { isLoading, error, data } = useTypedSelector((store) => store.searchRepo)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(getRepos(term))
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={onChange} />
        <button>submit</button>
      </form>
      {error && <h3>{error}</h3>}
      {isLoading && <h3>Loading...</h3>}
      {!error && !isLoading && <RepoList />}
    </div>
  )
}
