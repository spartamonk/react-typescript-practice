import { configureStore } from '@reduxjs/toolkit'
import { searchRepoReducer } from './features/search-repo-slice/searchRepoSlice'

export const store = configureStore({
  reducer: {searchRepo: searchRepoReducer},
})

export type RootState = ReturnType<typeof store.getState>
