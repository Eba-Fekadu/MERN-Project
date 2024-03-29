/** @jsxImportSource @emotion/react */
import React, { ReactElement, ChangeEvent,useEffect } from "react"
import { css } from "@emotion/react"
import { Button, Box, Flex, Card, Image, Text } from "rebass"
import { useSelector, useDispatch } from "react-redux"
import {
  updateReturn,
  setFormData,
  currentPagination,
} from "../../redux/song/songSlice.ts"
import { RootState } from "../../redux/store.ts"
import Pagination from "../../component/Pagination.tsx"
import { FiTrash2, FiEdit2 } from "react-icons/fi"
import SongLogo from "../../assets/SongLogo(2).png"

interface SettingProps {}

interface Song {
  _id: string
  Title: string
  Artist: string
  Album: string
  Genre: string
}

const inputStyles = css`
  background-color: rgba(54, 69, 79, 0.4);
  display: flex;
  padding: 10px;
  margin: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  color: #fff;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-width: 2px;
    border-color: #a0aec8;
    transition:
      border-color 0.3s ease-in-out,
      border-width 0.3s ease-in-out;
  }
  @media screen and (max-width: 600px) {
    /* Adjust styles for screens with a maximum width of 600px */
    margin: 10px;
    font-size: 14px;
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    /* Adjust styles for screens with a width between 601px and 1024px */
    padding: 8px;
  }
`

export default function Setting({}: SettingProps): ReactElement {
  const {
    formData,
    loading,
    error,
    updateData,
    isUpdateMode,
    songListing,
    showListingError,
    success,
    currentPage,
  } = useSelector((state: RootState) => state.songs)

  const dispatch = useDispatch()
  useEffect(() => {
    handleShowListings()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormData({ [e.target.id]: e.target.value }))
  }
  const handleReturn = () => {
    dispatch(updateReturn())

    dispatch(
      setFormData({
        Title: "",
        Artist: "",
        Album: "",
        Genre: "",
      }),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: "FETCH_SONG_SUBMIT", payload: formData })
  }

  const handleSongDelete = async (songId: string) => {
    dispatch({ type: "FETCH_SONG_DELETE", payload: songId })
  }

  const handleSongUpdate = async (songId: string) => {
    dispatch({ type: "FETCH_SONG_UPDATE", payload: songId })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({
      type: "SONG_UPDATE",
      payload: updateData,
      secondPayload: formData,
    })
  }

  const handleShowListings = async () => {
    dispatch({ type: "FETCH_SONG_LISTING" })
  }

  const onPageChange = (page: number) => {
    dispatch(currentPagination(page))
  }

  const paginatedSongs = songListing.slice(
    (currentPage - 1) * 6,
    currentPage * 6,
  )

  return (
    <div>
      <Flex flexDirection={["column", "row"]}>
        <Box
          width={[1, 1 / 3]}
          p={4}
          m={3}
          sx={{ borderRight: "4px solid  rgba(54, 69, 79, 0.4)" }}
        >
          {isUpdateMode ? (
            <Text fontSize={[3, 4, 5]} fontWeight="bold" mb={4} color="#606873">
              UPDATE SONG
            </Text>
          ) : (
            <Text fontSize={[3, 4, 5]} fontWeight="bold" mb={4} color="#606873">
              ADD SONG
            </Text>
          )}

          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={isUpdateMode ? handleUpdate : handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              css={inputStyles}
              placeholder="title"
              id="Title"
              value={formData.Title}
              onChange={handleChange}
            />

            <label>Artist:</label>
            <input
              type="text"
              css={inputStyles}
              placeholder="artist"
              id="Artist"
              value={formData.Artist}
              onChange={handleChange}
            />

            <label>Album:</label>
            <input
              type="text"
              css={inputStyles}
              placeholder="album"
              id="Album"
              value={formData.Album}
              onChange={handleChange}
            />

            <label>Genre:</label>
            <input
              type="text"
              css={inputStyles}
              placeholder="genre"
              id="Genre"
              value={formData.Genre}
              onChange={handleChange}
            />

            {isUpdateMode ? (
              <Button type="submit" disabled={loading} my={3} bg="#606873">
                {loading ? "Loading..." : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={loading} mt={3} bg="#606873">
                {loading ? "Loading..." : "Add"}
              </Button>
            )}
            {isUpdateMode ? (
              <Button
                onClick={handleReturn}
                mt={2}
                bg="#606873"
                sx={{ display: "block" }}
              >
                Return to Add
              </Button>
            ) : (
              ""
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </Box>
        <Box
          width={[1, 2 / 3]}
          p={3}
          sx={{ alignItems: ["center", "flex-start"] }}
        >
          <p style={{ color: "red" }}>
            {showListingError ? "Error showing song lists" : ""}
          </p>

          <Flex flexWrap="wrap" justifyContent="flex-start">
            {songListing.length > 0 &&
              paginatedSongs.map((song: Song) => (
                <Box p={3} key={song._id}>
                  <Card
                    sx={{
                      boxShadow: "0 4px 8px 1px rgba(0, 0, 0, 0.8)",
                      backgroundColor: "rgba(54, 69, 79, 0.3)",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image src={SongLogo} width={[1]} />
                    <Box px={2}>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Title:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {song.Title}
                        </span>
                      </Text>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Artist:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {song.Artist}
                        </span>
                      </Text>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Album:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {song.Album}
                        </span>
                      </Text>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Genre:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {" "}
                          {song.Genre}
                        </span>
                      </Text>
                      <Flex>
                        <Button
                          onClick={() => handleSongDelete(song._id)}
                          variant="outline"
                          color="white"
                          m={1}
                          bg="black"
                          sx={{
                            ":hover": {
                              backgroundColor: "#333",
                              color: "white",
                            },
                          }}
                        >
                          <FiTrash2 /> Delete
                        </Button>
                        <Button
                          onClick={() => handleSongUpdate(song._id)}
                          variant="outline"
                          color="white"
                          m={1}
                          bg="black"
                          sx={{
                            ":hover": {
                              backgroundColor: "#555",
                              color: "white",
                            },
                          }}
                        >
                          <FiEdit2 /> Edit
                        </Button>
                      </Flex>
                    </Box>
                  </Card>
                </Box>
              ))}
          </Flex>

          <Pagination
            totalItems={songListing.length}
            onPageChange={onPageChange}
          />
        </Box>
      </Flex>
    </div>
  )
}
