import { put, call } from "redux-saga/effects"

import {
  listingErrorStart,
  listingSuccess,
  listingErrorSuccess,
  createFailure,
  updateSuccess,
  updateStart,
  createStart,
  setFormData,
  createSuccess,
  setUpdateFormData,
  successToast,
  updateReturn,
} from "../../redux/song/songSlice.ts"
interface FormData {
  Title: string
  Artist: string
  Album: string
  Genre: string
}
export function* fetchSongListing(): Generator<any, void, any> {
  try {
    yield put(listingErrorStart())
    const response = yield call(fetch, `/server/song/listings`)
    const data = yield response.json()

    if (data.success === false) {
      yield put(listingErrorSuccess())
      return
    }

    yield put(listingSuccess(data))
  } catch (error) {
    yield put(listingErrorSuccess())
    console.error("Error fetching data listing", error)
  }
}

export function* fetchSongUpdate(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    // dispatch(updateStart())
    yield put(updateStart())
    const res = yield call(fetch, `/server/song/get/${action.payload}`)
    const data = yield res.json()

    if (data.success === false) {
      yield put(createFailure(data.message))
      //   dispatch(createFailure(data.message))
      console.log(data.message)
      return
    }

    // dispatch(updateSuccess(songId))
    yield put(setUpdateFormData(data))
    yield put(updateSuccess(action.payload))
  } catch (error) {
    // yield put(listingErrorStart())
    console.error("Error fetching update listing", error)
  }
}

export function* updateSong(action: {
  type: string
  payload: string
  secondPayload: FormData
}): Generator<any, void, any> {
  try {
    yield put(createStart())
    yield new Promise((resolve) => setTimeout(resolve, 1000))
    const res = yield call(fetch, `/server/song/update/${action.payload}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.secondPayload),
    })
    const data = yield res.json()

    if (data.success === false) {
      yield put(createFailure(data.message))
      setTimeout(() => {
        put(createFailure(""))
      }, 4000)
      return
    }

    // dispatch(updateSuccess(songId))
    yield put(setFormData({ Title: "", Artist: "", Album: "", Genre: "" }))
    yield put(createSuccess(data))

    // handleShowListings()
    put(fetchSongListing)
    yield put(updateReturn())
    window.location.reload()
  } catch (error) {
    if (error instanceof Error) {
      // dispatch(createFailure(error.message))
      yield put(createFailure(error.message))
      setTimeout(() => {
        put(createFailure(""))
      }, 4000)
      yield put(successToast(""))
    } else {
      console.error("Unexpected error:", error)
    }
  }
}

export function* fetchSongDelete(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this song?",
    )
    if (!userConfirmed) {
      return
    }
    //   yield put(createStart())
    const response = yield call(fetch, `server/song/delete/${action.payload}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const dataError = yield response.json()
      console.log(dataError.message)
      return
    }
    const data: { success: boolean; message?: string } = yield response.json()

    if (data.success === false) {
      console.log(data.message)
      return
    }
    window.location.reload()
    // put(fetchSongListing)
  } catch (error) {
    console.log((error as Error).message)
  }
}

export function* fetchSongSubmit(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    yield put(createStart())
    yield new Promise((resolve) => setTimeout(resolve, 1000))
    //   /server/song/create
    const res = yield call(fetch, ` /server/song/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    })
    const data = yield res.json()

    if (data.success === false) {
      yield put(createFailure(data.message))
      setTimeout(() => {
        put(createFailure(""))
      }, 4000)
      return
    }

    // dispatch(updateSuccess(songId))
    yield put(setFormData({ Title: "", Artist: "", Album: "", Genre: "" }))
    //       dispatch(createSuccess(data))

    yield put(createSuccess(data))
    yield put(successToast(data))

    setTimeout(() => {
      put(successToast(""))
    }, 4000)

    // put(fetchSongListing)
    put({ type: "FETCH_SONG_LISTING" })
    // window.location.reload()
  } catch (error) {
    if (error instanceof Error) {
      // dispatch(createFailure(error.message))
      yield put(createFailure(error.message))
      setTimeout(() => {
        put(createFailure(""))
      }, 4000)
      yield put(successToast(""))
    } else {
      console.error("Unexpected error:", error)
    }
  }
}
