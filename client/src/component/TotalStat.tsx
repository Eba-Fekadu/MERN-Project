import React, { useEffect } from "react"
import StatImage from "../assets/StatImage.png"
import { Image, Card, Heading, Flex, Text } from "rebass"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store.ts"
import {
  listingSuccess,
  listingErrorStart,
  listingErrorSuccess,
} from "../redux/song/songSlice.ts"

interface Song {
  totalSongs: string
  totalArtists: string
  totalAlbums: string
  totalGenres: string
}

const TotalStat: React.FC = () => {
  const { showListingError, songListing } = useSelector(
    (state: RootState) => state.songs,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    handleShowListings()
  }, [])

  const handleShowListings = async () => {
    try {
      dispatch(listingErrorStart())
      const res = await fetch("/server/stats/overallStats")
      const data = await res.json()
      if (data.success === false) {
        dispatch(listingErrorSuccess())
        return
      }

      dispatch(listingSuccess(data))
    } catch (error) {
      dispatch(listingErrorSuccess())
    }
  }

  return (
    <Flex flexWrap="wrap">
      {songListing &&
        songListing.map((song: Song) => (
          // <Card
          //   width={[1]}
          //   height={[100, 150, 200]}
          //   m={4}
          //   sx={{
          //     display: "flex",
          //     flexDirection: "row",
          //   }}
          // >
          <Flex
            key={song.totalSongs}
            flexDirection={["column", "row", "row"]}
            mb={[3, 0, 0]}
          >
            <Card
              width={[200, 300, 400]}
              m={4}
              sx={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.8)",
                backgroundColor: "rgba(54, 69, 79, 0.4)",
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
                  Songs:
                </Text>
                <Heading
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  fontSize={[4, 5, 6]}
                  fontWeight="bold"
                >
                  {song.totalSongs}
                </Heading>
              </Flex>
            </Card>
            <Card
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
                  Artists:
                </Text>
                <Heading
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  fontSize={[4, 5, 6]}
                  fontWeight="bold"
                >
                  {song.totalArtists}
                </Heading>
              </Flex>
            </Card>
            <Card
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
                  Albums:
                </Text>
                <Heading
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  fontSize={[4, 5, 6]}
                  fontWeight="bold"
                >
                  {song.totalAlbums}
                </Heading>
              </Flex>
            </Card>
            <Card
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
                  Genres:
                </Text>
                <Heading
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  fontSize={[4, 5, 6]}
                  fontWeight="bold"
                >
                  {song.totalGenres}
                </Heading>
              </Flex>
              <p style={{ color: "red" }}>
                {showListingError ? "Error showing song lists" : ""}
              </p>
            </Card>
          </Flex>
        ))}
    </Flex>
  )
}

export default TotalStat
