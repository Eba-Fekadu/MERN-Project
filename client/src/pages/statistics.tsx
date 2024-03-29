import { ReactElement } from "react"

import { Card, Flex } from "rebass"
import GenreCounts from "../component/GenreStatCompopnent/GenreStat.tsx"
import AlbumCounts from "../component/ArtistStatComponent/ArtistStat.tsx"
import ArtistCounts from "../component/AlbumStatComponent/AlbumStat.tsx"
import TotalStat from "../component/OverAllStatComponent/OverAllStat.tsx"
interface StatisticsProps {}

export default function Statistics({}: StatisticsProps): ReactElement {
  return (
    <Flex flexWrap="wrap" justifyContent={"center"}>
      <TotalStat />

      <Flex
        width={[1]}
        m={4}
        flexDirection={["column", "row", "row"]}
        sx={{
          boxShadow: "0 4px 6px 1px rgba(0, 0, 0, 0.8)",
          backgroundColor: "rgba(54, 69, 79, 0.3)",
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <AlbumCounts />
        <ArtistCounts />
      </Flex>
      <Card
        width={[1]}
        m={4}
        sx={{
          boxShadow: "0 4px 6px 1px rgba(0, 0, 0, 0.8)",
          backgroundColor: "rgba(54, 69, 79, 0.3)",
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <GenreCounts />
      </Card>
    </Flex>
  )
}
