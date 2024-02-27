import React, { useEffect } from "react"
import { Box, Flex, Text, Heading } from "rebass"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store.ts"
import { genreDataReturn } from "../redux/song/songSlice.ts"

interface Item {
  _id: string
  count: string
}

const GenreTable: React.FC = () => {
  const { genreStats } = useSelector((state: RootState) => state.songs)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/server/stats/genre")
      .then((response) => response.json())
      .then((data) => dispatch(genreDataReturn(data)))
      .catch((error) => console.error("Error fetching song genres:", error))
  }, [])

  return (
    <Flex>
      <Box p={5} width={[300, 400, 500]}>
        <Heading
          fontSize={[2, 3, 4]}
          mb={3}
          color="#606873"
          fontFamily="Montserrat, sans-serif"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          SONGS IN GENRES
        </Heading>
        {genreStats &&
          genreStats.map((item: Item, index) => (
            <Box key={index} mb={3} sx={{ borderBottom: "1px solid #606873" }}>
              <Text fontSize={3} mb={2} fontWeight="bold">
                {item._id}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.4)" }} fontSize={2}>
                No of songs: {item.count}
              </Text>
            </Box>
          ))}
      </Box>
    </Flex>
  )
}

export default GenreTable
