import { put, call } from "redux-saga/effects"
import { albumDataReturn } from "../../redux/song/songSlice.ts"

export function* fetchAlbumStatsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, `/server/stats/albumCounts`)
    const data = yield response.json()
    yield put(albumDataReturn(data))
  } catch (error) {
    console.error("Error fetching song genres:", error)
  }
}
