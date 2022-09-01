import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { SearchRepoInterface } from '../../interface/searchRepoInterface'
import axios from 'axios'
const url = 'https://registry.npmjs.org/-/v1/search'
const initialState = {
  isLoading: false,
  data: [],
  error: null,
} as SearchRepoInterface

export const getRepos = createAsyncThunk(
  'searchRepoSlice/getRepos',
  async (term: string) => {
    try {
      const { data } = await axios.get(url, {
        params: {
          text: term,
        },
      })
      const repos = data.objects.map((i: any) => {
        return i.package.name
      })
      return repos
    } catch (err) {
      if (err instanceof Error) {
        return err.message
      }
    }
  }
)
const searchRepoSlice = createSlice({
  name: 'searchRepo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRepos.pending, (state) => {
      state.isLoading = true
      state.data = []
      state.error = null
    })
    builder.addCase(getRepos.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.data = payload
      state.error = null
    })
    builder.addCase(getRepos.rejected, (state, { payload } : any) => {
      state.isLoading = false
      state.data = []
      state.error = payload
    })
  },
})

export const searchRepoReducer = searchRepoSlice.reducer
