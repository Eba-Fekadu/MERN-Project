import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
// import type { PayloadAction } from "@reduxjs/toolkit"

interface FormData {
  Title: string
  Artist: string
  Album: string
  Genre: string
}
interface NavigateToSettingPayload {
  state: {
    formData: FormData
  }
}

export interface SongState {
  formData: FormData
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
  formData: {
    Title: "",
    Artist: "",
    Album: "",
    Genre: "",
  },
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
    navigateToSetting: (state, action: PayloadAction<FormData>) => {
      const formData = action.payload
      const navigate = useNavigate()

      // Handle navigation logic
      // Example: Navigate to "/setting" with formData in the state
      navigate("/setting", { state: { formData } })
    },

    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload }
      // return { ...state, ...action.payload }
    },

    setUpdateFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = { ...action.payload }
    },

    // setupdateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
    //   // Merge the existing form data with the new data from the payload
    //   state.formData = { ...state.formData, ...action.payload }
    // },

    // resetFormData: () => initialState,

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
  navigateToSetting,
  setFormData,
  setUpdateFormData,
  // resetFormData,
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
  searchState,
  genreDataReturn,
  albumDataReturn,
  artistDataReturn,
} = songSlice.actions

export default songSlice.reducer
