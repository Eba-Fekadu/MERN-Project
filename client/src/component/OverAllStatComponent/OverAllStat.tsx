import React, { useEffect } from "react"
import StatImage from "../../assets/StatImage.png"
import { Image, Card, Heading, Flex, Text } from "rebass"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store.ts"

interface Song {
  totalSongs: string
  totalArtists: string
  totalAlbums: string
  totalGenres: string
}

const OverAllStat: React.FC = () => {
  const { showListingError, songListing } = useSelector(
    (state: RootState) => state.songs,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "FETCH_OVERALL_STATS" })
  }, [dispatch])

  const song = songListing ? (songListing[0] as unknown as Song) : undefined

  return (
    <Flex flexWrap="wrap">
      <Heading
        fontSize={[2, 3, 4]}
        ml={5}
        mt={4}
        color="#606873"
        fontFamily="Montserrat, sans-serif"
        fontWeight="bold"
        letterSpacing="0.05em"
      >
        MUSIC STATS OVERVIEW
      </Heading>
      {song && (
        <Flex flexDirection={["column", "row", "row"]} mb={[3, 0, 0]}>
          {["Songs", "Artists", "Albums", "Genres"].map((category) => (
            <Card
              key={category}
              width={[200, 300, 400]}
              m={4}
              sx={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.8)",
                backgroundColor: "rgba(54, 69, 79, 0.3)",
                borderRadius: 8,
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Image
                src={StatImage}
                alt="listing cover"
                sx={{
                  height: "auto",
                  width: "50%",
                  objectFit: "cover",
                }}
              />

              <Flex
                flexDirection="column"
                justifyContent="space-between"
                p={3}
                flex={1}
              >
                <Text fontSize={[1, 2, 3]} fontWeight="bold">
                  {category}:
                </Text>
                <Heading
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  fontSize={[4, 5, 6]}
                  fontWeight="bold"
                >
                  {song[`total${category}` as keyof Song]}
                </Heading>
              </Flex>
            </Card>
          ))}
          <p style={{ color: "red" }}>
            {showListingError ? "Error showing song lists" : ""}
          </p>
        </Flex>
      )}
    </Flex>
  )
}

export default OverAllStat
