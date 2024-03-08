import { takeLatest } from "redux-saga/effects"
import { fetchGenreStatsGenre } from "../component/GenreStatCompopnent/GenreStatSaga.ts"
import { fetchAlbumStatsSaga } from "../component/AlbumStatComponent/AlbumStatSaga.ts"
import { fetchArtistStatsSaga } from "../component/ArtistStatComponent/ArtistStatSaga.ts"
import { fetchOverAllStatsSaga } from "../component/OverAllStatComponent/OverAllStatSaga.ts"
import { fetchSongLists } from "../pages/ListPage/ListSaga.ts"
import { fetchSongListing } from "../pages/SettingPage/SettingSaga.ts"
import { fetchSongUpdate } from "../pages/SettingPage/SettingSaga.ts"
import { updateSong } from "../pages/SettingPage/SettingSaga.ts"
import { fetchSongDelete } from "../pages/SettingPage/SettingSaga.ts"
import { fetchSongSubmit } from "../pages/SettingPage/SettingSaga.ts"

function* watchFetchSongs() {
  yield takeLatest("FETCH_GENRE_STATS", fetchGenreStatsGenre)
  yield takeLatest("FETCH_ALBUM_STATS", fetchAlbumStatsSaga)
  yield takeLatest("FETCH_ARTIST_STATS", fetchArtistStatsSaga)
  yield takeLatest("FETCH_OVERALL_STATS", fetchOverAllStatsSaga)
  yield takeLatest("FETCH_SONG_LISTS", fetchSongLists)
  yield takeLatest("FETCH_SONG_LISTING", fetchSongListing)
  yield takeLatest("FETCH_SONG_UPDATE", fetchSongUpdate)
  yield takeLatest("SONG_UPDATE", updateSong)
  yield takeLatest("FETCH_SONG_DELETE", fetchSongDelete)
  yield takeLatest("FETCH_SONG_SUBMIT", fetchSongSubmit)
}

export default function* rootSaga() {
  yield watchFetchSongs()
}
