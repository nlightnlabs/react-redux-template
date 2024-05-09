import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';

export const appDataSlice = createSlice({
  name: 'appData',
  initialState: {
    appData:[]
  },
  reducers: {
    setAppData: (state,action) => {
      state.appData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAppData } = appDataSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'appDataStorage', result: () => null });

export default appDataSlice.reducer