import React, { useEffect } from "react"
import { Box, Flex, Text, Heading } from "rebass"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store.ts"

interface Item {
  artist: string
  totalSongs: string
  totalAlbums: string
}

const AlbumCounts: React.FC = () => {
  const { artistStats } = useSelector((state: RootState) => state.songs)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "FETCH_ARTIST_STATS" })
  }, [dispatch])

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box p={5} width={[300, 400, 500]}>
        <Heading
          fontSize={[2, 3, 4]}
          mb={3}
          color="#606873"
          fontFamily="Montserrat, sans-serif"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          ARTISTS SONGS & ALBUMS
        </Heading>
        {artistStats &&
          artistStats.map((item: Item, index) => (
            <Box key={index} mb={3} sx={{ borderBottom: "1px solid #606873" }}>
              <Text fontSize={3} mb={2} fontWeight="bold">
                {item.artist}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.4)" }} fontSize={2}>
                No of Songs:{item.totalSongs}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.4)" }} fontSize={2}>
                No of Albums: {item.totalAlbums}
              </Text>
            </Box>
          ))}
      </Box>
    </Flex>
  )
}

export default AlbumCounts
