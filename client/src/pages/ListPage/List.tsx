import { ReactElement, useEffect } from "react"
import { Box, Flex, Card, Image, Heading, Text } from "rebass"
import SongLogo from "../../assets/SongLogo(2).png"
import Pagination from "../../component/Pagination.tsx"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store.ts"
import { currentPagination } from "../../redux/song/songSlice.ts"

interface Song {
  _id: string
  Title: string
  Artist: string
  Album: string
  Genre: string
}

interface listProps {}
export default function list({}: listProps): ReactElement {
  const { songListing, showListingError, currentPage, searchTerm } =
    useSelector((state: RootState) => state.songs)

  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchQuery = urlParams.toString()

    dispatch({ type: "FETCH_SONG_LISTS", payload: searchQuery })
  }, [location.search, searchTerm])

  const onPageChange = (page: number) => {
    dispatch(currentPagination(page))
  }

  const paginatedSongs = songListing.slice(
    (currentPage - 1) * 8,
    currentPage * 8,
  )
  return (
    <div>
      <Flex flexDirection={["column", "row"]}>
        <Box p={3} sx={{ alignItems: ["center", "flex-start"] }}>
          <p>{showListingError ? "Error showing song listings" : ""}</p>

          <Text fontSize={5} fontWeight="bold" p={3} mb={0} color={"#606873"}>
            SONG LISTS
          </Text>
          <Flex flexWrap="wrap" justifyContent="flex-start">
            {songListing.length > 0 &&
              paginatedSongs.map((song: Song) => (
                <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} p={3} key={song._id}>
                  <Card
                    sx={{
                      boxShadow: "0 4px 8px 1px rgba(0, 0, 0, 0.8)",
                      backgroundColor: "rgba(54, 69, 79, 0.3)",
                      backdropFilter: "blur(4px)",
                      backdropBlurSm: "blur(4px)",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image src={SongLogo} width={[1]} />
                    <Box px={2}>
                      <Heading as="h3" px={2} fontSize={[2, 3, 4]}>
                        {song.Title}
                      </Heading>
                      <Text fontSize={[0, 0, 1]} px={2} mb={3}>
                        {song.Artist}
                      </Text>
                      <Text fontSize={[0, 0, 1]} mb={2} px={2}>
                        {song.Album} : {song.Genre}
                      </Text>
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
