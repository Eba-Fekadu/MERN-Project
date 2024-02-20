import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SongState {
//   value: number
error: string
loading: boolean
}

const initialState: SongState = {
//   value: 0,
error: '',
loading: false,
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    createStart: (state) => {
        state.loading = true;
      },
      createSuccess: (state) => {
        // state.currentUser = action.payload;
        state.loading = false;
        state.error = '';
      },
      createFailure: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      },
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { createStart, createSuccess, createFailure } = songSlice.actions

export default songSlice.reducer