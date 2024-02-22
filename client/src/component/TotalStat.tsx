import React, { useEffect, useState } from "react"
import GallaxyImage from "../assets/music-man.jpg"
import { Image, Card, Heading, Flex } from "rebass"

interface Song {
  totalSongs: string
  totalArtists: string
  totalAlbums: string
  totalGenres: string
}

const TotalStat: React.FC = () => {
  const [songListing, setSongListing] = useState([])
  const [showListingError, setShowListingError] = useState(false)

  useEffect(() => {
    handleShowListings()
  }, [])

  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await fetch("/server/stats/overallStats")
      const data = await res.json()
      if (data.success === false) {
        setShowListingError(true)
        return
      }

      setSongListing(data)
    } catch (error) {
      setShowListingError(true)
    }
  }

  return (
    <Flex>
      {songListing.map((song: Song) => (
        <Card
          width={[1]}
          height={[100, 150, 200]}
          m={4}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
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
              src={GallaxyImage}
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
              <Heading fontSize={3} fontWeight="bold">
                Songs: {song.totalSongs}
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
              src={GallaxyImage}
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
              <Heading fontSize={3} fontWeight="bold">
                Artists: {song.totalArtists}
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
              src={GallaxyImage}
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
              <Heading fontSize={3} fontWeight="bold">
                Albums: {song.totalAlbums}
              </Heading>
            </Flex>
          </Card>
          <Card
            width={[200, 300, 400]}
            // width={[1, 4 / 4]}
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
              src={GallaxyImage}
              alt="listing cover"
              sx={{
                height: "auto",
                width: "50%",
                objectFit: "cover",
              }}
            />

            <Flex justifyContent="space-between" p={3} flex={1}>
              <Heading fontSize={3} fontWeight="bold">
                Genres: {song.totalGenres}
              </Heading>
            </Flex>
          </Card>
        </Card>
      ))}
    </Flex>
  )
}

export default TotalStat
