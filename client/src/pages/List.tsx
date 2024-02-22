import { ReactElement, useState, useEffect } from 'react';
import { Box,Flex, Card, Image, Heading, Text } from 'rebass';
import SongLogo from '../assets/SongLogo(2).png';
import Pagination from '../component/Pagination.tsx';
import { useParams } from 'react-router-dom';


interface Song {
  _id: string;
  Title: string;
  Artist: string;
  Album: string;
  Genre: string;
}

interface listProps {
  // Add any props that the Admin component may receive
  // For example:
  // title: string;
}
export default function list({ /* destructure props if any */ }: listProps): ReactElement {
  const [songListing, setSongListing] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState('');
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm') || '';
  const { searchTerm } = useParams();
  // const [sideBarData, setsidebardata] = useState(1);

  // const { searchTerm } = useParams();
  const searchedSongList = async() => {
    const response = await fetch(`/server/song/getSearch?searchTerm=${searchTerm}`);
    if (response) {
      console.log(response.json());
      return response.json();
    }
  }



  useEffect(() => {
    handleShowListings();

    const urlParams = new URLSearchParams(location.search);
   

   

    const fetchListings = async() => {

      const searchQuery = urlParams.toString();
      const res = await fetch(`/server/song/getSearch?${searchQuery}`);
      const data = await res.json();
     
      setSongListing(data);
    };

    fetchListings();
 

  }, [location.search]); 
 

  const handleShowListings = async() =>{
    try {
      setShowListingError(false);
      const res = await fetch('/server/song/listings');
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
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedSongs = songListing.slice((currentPage - 1) * 8, currentPage * 8);
  return (
    <div>
    <Flex  flexDirection={['column', 'row']}>
    {/* <Box key={index} mb={3} sx={{ borderBottom: '1px solid #ccc' }}> */}
    <Box p={3} sx={{ alignItems: ['center', 'flex-start'] }}>
<p>{showListingError ? 'Error showing song listings': ''}</p>
{/* <Flex flexWrap="wrap" justifyContent="space-between">
      {paginatedSongs.map((song) => ( */}
      {/* <Text fontSize={5} fontWeight="bold" p={3} mb={0}sx={{ borderBottom: '1px solid #ccc' }}> */}
      <Text fontSize={5} fontWeight="bold" p={3} mb={0} color={'#606873'}>
    SONG LISTS
  </Text>
<Flex flexWrap="wrap" justifyContent="flex-start">
  
    {songListing.length > 0 &&
      paginatedSongs.map((song: Song) => (
        
        <Box width={[1, 1 / 2, 1/3, 1/4]} p={3} key={song._id}>
          
          <Card
          
sx={{
  
  boxShadow: '0 4px 8px 1px rgba(0, 0, 0, 0.8)',
  backgroundColor: 'rgba(54, 69, 79, 0.3)',
    backdropFilter: 'blur(4px)',
    backdropBlurSm: 'blur(4px)',
  borderRadius: 8,
  overflow: 'hidden',
  
}}>
            <Image src={SongLogo} width={[1]}/>
            <Box px={2}>
              <Heading as="h3"   px={2} fontSize={[2, 3, 4]}>
                {song.Title}
              </Heading>
              <Text fontSize={[0, 0, 1]} px={2} mb={3}>
               {song.Artist}
              </Text>
              <Text fontSize={[0, 0, 1]} mb={2} px={2}>
                {song.Album} :     {song.Genre}
              </Text>
              {/* <Text fontSize={[0, 0, 1]} mb={2} px={2}>
              
              </Text> */}
              <Flex>
             
              </Flex>
            </Box>
          </Card>
           
        </Box>
        
      ))}
  </Flex>
  {/* ))}
  </Flex> */}
  <Pagination totalItems={songListing.length} onPageChange={onPageChange} />
  </Box>
  </Flex>
  </div>
  )
}
