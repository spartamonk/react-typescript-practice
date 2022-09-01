import React, { FC } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const RepoList: FC = () => {
  const { data } = useTypedSelector(
    (store) => store.searchRepo
  )
 
    return (
      <ul>
        {data.map((i: string, index: number) => {
          return <li key={index}>{i}</li>
        })}
      </ul>
    )

}
