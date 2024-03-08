import { put, call } from "redux-saga/effects"
import { listingSuccess, listingErrorStart } from "../../redux/song/songSlice" // Import your action creator

export function* fetchSongLists(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    const res = yield call(fetch, `/server/song/getSearch?${action.payload}`)
    const data = yield res.json()

    yield put(listingSuccess(data))
  } catch (error) {
    yield put(listingErrorStart())
  }
}
