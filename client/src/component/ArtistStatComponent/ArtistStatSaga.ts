import { put, call } from "redux-saga/effects"
import { artistDataReturn } from "../../redux/song/songSlice.ts"

export function* fetchArtistStatsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, `/server/stats/artistStats`)
    const data = yield response.json()
    yield put(artistDataReturn(data))
  } catch (error) {
    console.error("Error fetching song genres:", error)
  }
}
