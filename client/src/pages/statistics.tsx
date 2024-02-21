import React, {ReactElement,useState, useEffect } from 'react'
import GallaxyImage from '../assets/music-man.jpg';
import { Image, Box, Card, Heading, Text,Flex } from 'rebass';
import GenreCounts from '../component/GenreTable.tsx';
import AlbumCounts from '../component/AlbumCounts.tsx';
import ArtistCounts from '../component/ArtistCount.tsx';
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
    const [songListing, setSongListing] = useState([]);
    const [showListingError, setShowListingError] = useState(false);


    useEffect(() => {
      handleShowListings();

    }, []);

    const handleShowListings = async() =>{
      try {
        setShowListingError(false);
        const res = await fetch('/server/stats/overallStats');
        const data = await res.json();
        if(data.success === false){
          setShowListingError(true);
          return;
        }

          setSongListing(data);
      } catch(error){
        setShowListingError(true);
      }
    }

  return (
<Flex flexWrap="wrap">
          {songListing.map((song: Song) => (
      <Card
      width={[1]}
      height={[100, 150, 200]}
      m={4}
      sx={{
        // boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        // borderRadius: 8,
        // overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Card

            width={[200, 300, 400]}
              // width={[1/ 1 / 4]}
              m={4}
              sx={{
                boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.2)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row', // Row direction to align items horizontally
              }}

            >

              <Image
                src={GallaxyImage}
                alt='listing cover'
                sx={{
                  height: 'auto',
                  width: '50%',
                  objectFit: 'cover',
                }} />

              <Flex
             flexDirection="column"
             justifyContent="space-between"
                p={3}
                flex={1}

              >

                <Heading fontSize={3} fontWeight="bold">
                  Songs:{song.totalSongs}
                </Heading>

              </Flex>

            </Card>
            <Card

              width={[200, 300, 400]}
              m={4}
              sx={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
              }}

            >

                <Image
                  src={GallaxyImage}
                  alt='listing cover'
                  sx={{
                    height: 'auto',
                    width: '50%',
                    objectFit: 'cover',
                  }} />

                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  p={3}
                  flex={1} // Flex 1 to make it take the remaining space

                >
                  <Heading fontSize={3} fontWeight="bold">
                    Artists: {song.totalArtists}
                  </Heading>


                </Flex>

              </Card>
              <Card

              width={[200, 300, 400]}
              // width={[1, 3 / 4]}
              m={4}
              sx={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row', // Row direction to align items horizontally
              }}

            >

                <Image
                  src={GallaxyImage}
                  alt='listing cover'
                  sx={{
                    height: 'auto',
                    width: '50%', // Auto width to maintain aspect ratio
                    objectFit: 'cover', // Equivalent to object-cover
                  }} />

                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  p={3}
                  flex={1} // Flex 1 to make it take the remaining space

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
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
  borderRadius: 8,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row', // Row direction to align items horizontally
}}

>

  <Image
    src={GallaxyImage}
    alt='listing cover'
    sx={{
      height: 'auto',
      width: '50%',// Auto width to maintain aspect ratio
      objectFit: 'cover', // Equivalent to object-cover
    }} />

  <Flex
    // flexDirection="column"
    justifyContent="space-between"
    p={3}
    flex={1} // Flex 1 to make it take the remaining space

  >




<Heading fontSize={3} fontWeight="bold">
Genres: {song.totalGenres}
</Heading>

  </Flex>

</Card>
              </Card>
        ))}

<Card
      width={[1]}
    
      m={4}
      sx={{
        boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.2)',
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
        boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.2)',
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
