import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Heading } from 'rebass';

const ArtistCount: React.FC = () => {
    const [genreCounts, setGenreCounts] = useState([]);

  useEffect(() => {
    // Fetch genre counts from your API endpoint
    fetch('/server/stats/albumCounts')
      .then((response) => response.json())
      .then((data) => setGenreCounts(data))
      .catch((error) => console.error('Error fetching song genres:', error));
  }, []);
//   const genreCountData = [
//     { genre: 'Pop', count: 25 },
//     { genre: 'Rock', count: 15 },
//     { genre: 'Hip Hop', count: 30 },
//     // Add more data as needed
//   ];

  return (
    // <Flex justifyContent="center" alignItems="center">
    <Flex>
      <Box p={5} width={[300, 400, 500]}>
        <Heading  fontSize={4} // Responsive font size
          mb={3}
          color='#606873'
          fontFamily="Montserrat, sans-serif" // Use a specific font family
          fontWeight="bold" // Customize the font weight
          letterSpacing="0.05em" >
          SONGS IN ALBUMS
        </Heading>
        {genreCounts.map((item, index) => (
          <Box key={index} mb={3} sx={{ borderBottom: '1px solid #606873' }}>
            <Text fontSize={3} mb={2} fontWeight="bold">
              {item._id}
            </Text>
            <Text fontSize={2}>
            No of Songs: {item.count}
            </Text>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default ArtistCount;
