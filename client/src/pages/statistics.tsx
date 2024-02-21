import React, {ReactElement,useState, useEffect } from 'react'

import { Image, Box, Card, Heading, Text,Flex } from 'rebass';
import GenreCounts from '../component/GenreTable.tsx';
import AlbumCounts from '../component/AlbumCounts.tsx';
import ArtistCounts from '../component/ArtistCount.tsx';
import TotalStat from '../component/TotalStat.tsx';
interface StatisticsProps {
  // title: string;
  // value: number;
}
interface Song {
  // _id: string;
  totalSongs: string;
  totalArtists: string;
  totalAlbums: string;
  totalGenres: string;
}
// const Statistics: React.FC<DashboardCardProps> = ({ title, value }) => {
// export default function Statistics() {
  export default function Statistics({ /* destructure props if any */ }: StatisticsProps): ReactElement {
    
  return (
<Flex flexWrap="wrap">
        
<TotalStat/>
<Card
      width={[1]}
    
      m={4}
      sx={{
        boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgba(54, 69, 79, 0.3)',
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}>
         <AlbumCounts/>
       <ArtistCounts/>
       </Card>
       <Card
      width={[1]}
    
      m={4}
      sx={{
        boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgba(54, 69, 79, 0.3)',
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}>
       <GenreCounts/>
       </Card>
        </Flex>

);
};

//   )
// }
