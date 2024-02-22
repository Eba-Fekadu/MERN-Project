import React, { useEffect, useState } from "react"
import { Box, Flex, Text, Heading } from "rebass"

interface Item {
  _id: string
  count: string
}

const ArtistCount: React.FC = () => {
  const [genreCounts, setGenreCounts] = useState([])

  useEffect(() => {
    fetch("/server/stats/albumCounts")
      .then((response) => response.json())
      .then((data) => setGenreCounts(data))
      .catch((error) => console.error("Error fetching song genres:", error))
  }, [])
  return (
    <Flex>
      <Box p={5} width={[300, 400, 500]}>
        <Heading
          fontSize={4}
          mb={3}
          color="#606873"
          fontFamily="Montserrat, sans-serif"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          SONGS IN ALBUMS
        </Heading>
        {genreCounts.map((item: Item, index) => (
          <Box key={index} mb={3} sx={{ borderBottom: "1px solid #606873" }}>
            <Text fontSize={3} mb={2} fontWeight="bold">
              {item._id}
            </Text>
            <Text fontSize={2}>No of Songs: {item.count}</Text>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}

export default ArtistCount
