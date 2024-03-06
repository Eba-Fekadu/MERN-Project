import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface SongState {
  error: string
  loading: boolean
  isLoading: boolean
  isUpdateMode: boolean
  showListingError: boolean
  updateData: string
  success: string
  currentPage: number
  songListing: []
  searchTerm: string
  genreStats: []
  albumStats: []
  artistStats: []
}

const initialState: SongState = {
  error: "",
  success: "",
  loading: false,
  isLoading: false,
  isUpdateMode: false,
  showListingError: false,
  updateData: "",
  currentPage: 1,
  songListing: [],
  searchTerm: "",
  genreStats: [],
  albumStats: [],
  artistStats: [],
}

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    successToast: (state, action: PayloadAction<string>) => {
      state.success = action.payload
    },

    showListings: (state) => {
      state.isLoading = true
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
      state.showListingError = true
    },
    listingSuccess: (state, action: PayloadAction<[]>) => {
      state.songListing = action.payload
    },
    currentPagination: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    searchState: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    genreDataReturn: (state, action: PayloadAction<[]>) => {
      state.genreStats = action.payload
    },
    albumDataReturn: (state, action: PayloadAction<[]>) => {
      state.albumStats = action.payload
    },
    artistDataReturn: (state, action: PayloadAction<[]>) => {
      state.artistStats = action.payload
    },
  },
})

export const {
  successToast,
  createStart,
  createSuccess,
  showListings,
  createFailure,
  updateStart,
  updateSuccess,
  updateReturn,
  listingErrorStart,
  listingErrorSuccess,
  currentPagination,
  listingSuccess,
  searchState,
  genreDataReturn,
  albumDataReturn,
  artistDataReturn,
} = songSlice.actions

export default songSlice.reducer
