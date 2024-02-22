import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface Song {
  _id: string
  Title: string
  Artist: string
  Album: string
  Genre: string
}

export interface SongState {
  error: string
  loading: boolean
  isUpdateMode: boolean
  showListingError: boolean
  updateData: string
  success: string
  currentPage: number
  songListing: Song[]
}

const initialState: SongState = {
  //   value: 0,
  error: "",
  success: "",
  loading: false,
  isUpdateMode: false,
  showListingError: false,
  updateData: "",
  currentPage: 1,
  songListing: [],
}

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    successToast: (state, action: PayloadAction<string>) => {
      state.success = action.payload
    },
    createStart: (state) => {
      state.loading = true
    },
    createSuccess: (state) => {
      state.loading = false
      state.error = ""
    },
    createFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    updateStart: (state) => {
      state.isUpdateMode = true
    },

    updateSuccess: (state, action: PayloadAction<string>) => {
      state.updateData = action.payload
      state.loading = false
      state.error = ""
    },
    updateReturn: (state) => {
      state.isUpdateMode = false
    },
    listingErrorStart: (state) => {
      state.showListingError = false
    },
    listingErrorSuccess: (state) => {
      state.showListingError = false
    },
    listingSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songListing = action.payload
    },
    currentPagination: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const {
  successToast,
  createStart,
  createSuccess,
  createFailure,
  updateStart,
  updateSuccess,
  updateReturn,
  listingErrorStart,
  listingErrorSuccess,
  currentPagination,
  listingSuccess,
} = songSlice.actions

export default songSlice.reducer
