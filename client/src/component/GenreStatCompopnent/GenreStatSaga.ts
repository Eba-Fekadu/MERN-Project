// src/redux/sagas/genreSagas.ts

import { put, call } from "redux-saga/effects"
import { genreDataReturn } from "../../redux/song/songSlice.ts"

export function* fetchGenreStatsGenre(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, `/server/stats/genre`)
    const data = yield response.json()

    yield put(genreDataReturn(data))
  } catch (error) {
    console.error("Error fetching song genres:", error)
  }
}
