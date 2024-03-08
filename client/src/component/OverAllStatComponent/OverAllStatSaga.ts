import { put, call } from "redux-saga/effects"
import {
  listingErrorStart,
  listingSuccess,
  listingErrorSuccess,
} from "../../redux/song/songSlice.ts"

export function* fetchOverAllStatsSaga(): Generator<any, void, any> {
  try {
    yield put(listingErrorStart())
    const response = yield call(fetch, `/server/stats/overallStats`)
    const data = yield response.json()

    if (data.success === false) {
      yield put(listingErrorSuccess())
      return
    }

    yield put(listingSuccess(data))
  } catch (error) {
    yield put(listingErrorSuccess())
    console.error("Error fetching overall stat:", error)
  }
}
