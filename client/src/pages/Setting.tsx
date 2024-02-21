/** @jsxImportSource @emotion/react */
import React, { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Button, Box,Flex, Card, Image, Heading, Text } from 'rebass';
import GallaxyImage from '../assets/music-man.jpg';
import { useSelector, useDispatch } from 'react-redux';
import {createStart, createSuccess, createFailure} from '../redux/song/songSlice.ts';
import { RootState } from '../redux/store.ts';
import Pagination from '../component/Pagination.tsx';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SongLogo from '../assets/SongLogo(2).png';

interface SettingProps {
  // Add any props that the Admin component may receive
  // For example:
  // title: string;
}

interface Song {
  _id: string;
  Title: string;
  Artist: string;
  Album: string;
  Genre: string;
}

interface FormData {
 
  Title: string;
  Artist: string;
  Album: string;
  Genre: string;
}

const inputStyles = css`
background-color: rgba(54, 69, 79, 0.4);
  display:flex;
  padding: 10px;
  margin: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  color: #fff; 
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-width: 2px; 
    border-color: #a0aec8;
    transition: border-color 0.3s ease-in-out, border-width 0.3s ease-in-out;
  }
  @media screen and (max-width: 600px) {
    /* Adjust styles for screens with a maximum width of 600px */
    margin: 10px;
    font-size: 14px;
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    /* Adjust styles for screens with a width between 601px and 1024px */
    padding: 8px;
  }
`;




// const columnStyles = css`
//   background-color: #cbd5e0;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   padding: 0.75rem 1rem; /* Adjust padding as needed */
// `;

export default function Setting({ /* destructure props if any */ }: SettingProps): ReactElement {

  const [formData, setFormData] = useState<FormData>({
    Title: '',
    Artist: '',
    Album: '',
    Genre: '',
  });
  
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const [songListing, setSongListing] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error } = useSelector((state: RootState) => state.songs);
  const [updateData, setUpdateData] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  // const [showListings, setShowListings] = useState(false);
  // const { loading, error } = useSelector((state: StateType) => state.song);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (showListings) {
  //     handleShowListings();
  //   }
  // }, [showListings]);
  useEffect(() => {
    handleShowListings();

  }, []); 
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleReturn = () => {
    setIsUpdateMode(false);
    setFormData({
      ...formData,
      Title: '',
      Artist: '',
      Album: '', 
      Genre: '',
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      // setLoading(true);
      dispatch(createStart());
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await fetch('/server/song/create', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',      
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(createFailure(data.message));
        return;
      }
     
      
      setFormData({
        ...formData,
        Title: '',
        Artist: '',
        Album: '', 
        Genre: '',
      });
      // setLoading(false);
      // setError(null);
      dispatch(createSuccess(data));
      // navigate('/admin', { state: { formData } });
   
      setSuccess(data);
      console.log(data);
      handleShowListings();
    
    } catch(error){
      if (error instanceof Error) {
        dispatch(createFailure(error.message));
        setSuccess(null);
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error);
      }
      // dispatch(createFailure(error.message));
      // // setLoading(false);
      // // setError(error.message);
      // setSuccess(null);
    }
  };

  const handleSongDelete = async (songId: string) => {
    try {
      // Display a confirmation dialog before proceeding with deletion
      const userConfirmed = window.confirm('Are you sure you want to delete this song?');
      
      if (!userConfirmed) {
        // User canceled the deletion
        return;
      }
  
      const response = await fetch(`server/song/delete/${songId}`, {
        method: 'DELETE',
      });
  
      // Check if the response is successful (status code in the range 200-299)
      if (!response.ok) {
        const dataError = await response.json();
        console.log(dataError.message);
        return;
      }
  
      const data: { success: boolean, message?: string } = await response.json();
  
      if (data.success === false) {
        console.log(data.message);
        return;
      }
  
      setSongListing((prev) => prev.filter((song: Song) => song._id !== songId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };
//  let tobeUpdatedId = '';
  const handleSongUpdate = async (songId: string) => {
    setIsUpdateMode(true);
    // const songId = params.songId;
    const response = await fetch(`/server/song/get/${songId}`);
    const data = await response.json();
    if(data.success === false){
      console.log(data.message);
      return;
    }
    setFormData(data);
    setUpdateData(songId);
    // tobeUpdatedId = songId;
    // params.songId = songId;
    // handleUpdate(songId);
} 

  const handleUpdate = async (e: React.FormEvent ) => {
    e.preventDefault();
    try{
      // setLoading(true);
      dispatch(createStart());
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await fetch(`/server/song/update/${updateData}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',      
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {

        dispatch(createFailure(data.message));
        return;
      }

      setFormData({
        ...formData,
        Title: '',
        Artist: '',
        Album: '', 
        Genre: '',
      });

      dispatch(createSuccess(data));
      // setSuccess(data);
      // console.log(data);
      
       handleShowListings();
       setIsUpdateMode(false);
      navigate('/setting', { state: { formData } });
    
    } catch(error){
      if (error instanceof Error) {
        dispatch(createFailure(error.message));
        setSuccess(null);
      } else {
        console.error('Unexpected error:', error);
      }
  
    }
  };
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
    console.log(formData);
  
    const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedSongs = songListing.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <div>
      <Flex  flexDirection={['column', 'row']}>
      {/* <Box width={[1, 1 / 3]} p={3} m={3} sx={{ borderRight: '1px solid #606873' }}>*/}
      <Box width={[1, 1 / 3]} p={4} m={3} sx={{ borderRight: '4px solid  rgba(54, 69, 79, 0.4)' }}> 

          {isUpdateMode ? (

<Text 
fontSize={[ 3, 4, 5 ]}
fontWeight='bold'
mb={4}
color='#606873'>
UPDATE SONG
</Text>
 ) : (
      <Text 
        fontSize={[ 3, 4, 5 ]}
        fontWeight='bold'
        mb={4}
        
        color='#606873'>
        ADD SONG
      </Text>
 )}
     

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={isUpdateMode ? handleUpdate : handleSubmit}>
      <label>Title:</label>
      <input
            type='text'
            css={inputStyles}
             placeholder='title'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            id ='Title'
            value={formData.Title}
            onChange={handleChange}
          />

          <label>Artist:</label>
      <input
            type='text'
            css={inputStyles}
            placeholder='artist'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            id ='Artist'
            value={formData.Artist}
            onChange={handleChange}
          />

<label>Album:</label>
      <input
            type='text'
            css={inputStyles}
            placeholder='album'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            id ='Album'
            value={formData.Album}
            onChange={handleChange}
          />

<label>Genre:</label>
      <input
            type='text'
            css={inputStyles}
            placeholder='genre'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            id ='Genre'
            value={formData.Genre}
            onChange={handleChange}
          />
          
       
        {isUpdateMode ? (
        <Button type="submit" disabled={loading} my={3} bg='#606873'>{loading ? 'Loading...' : 'Update'}</Button>
        ) : (
          <Button type="submit"  disabled={loading} mt={3} bg='#606873'>{loading ? 'Loading...' : 'Add'}</Button>
          )}
           {isUpdateMode ? (
          <Button onClick={handleReturn}  mt={2} bg='#606873' sx={{ display: 'block' }}>Return to Add</Button>
          ) : ( ''  )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>

        {/* <button onClick={handleShowListings}>
        Show Listings
      </button> */}
      </Box>
      <Box width={[1, 2 / 3]} p={3} sx={{ alignItems: ['center', 'flex-start'] }}>
<p>{showListingError ? 'Error showing song listings': ''}</p>
{/* <Flex flexWrap="wrap" justifyContent="space-between">
        {paginatedSongs.map((song) => ( */}
<Flex flexWrap="wrap" justifyContent="flex-start">
      {songListing.length > 0 &&
        paginatedSongs.map((song: Song) => (
          
          <Box p={3} key={song._id}>
            
            <Card
            
  sx={{
    
    boxShadow: '0 4px 8px 1px rgba(0, 0, 0, 0.8)',
    backgroundColor: 'rgba(54, 69, 79, 0.3)',
    borderRadius: 8,
    overflow: 'hidden',
  }}>
              <Image src={SongLogo} width={[1]}/>
              <Box px={2}>
                <Text fontSize={[0, 1, 2]} mb={2}>
                 Title:    <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{song.Title}</span>
                </Text>
                <Text fontSize={[0, 1, 2]} mb={2}>
               Artist:  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{song.Artist}</span>
                </Text>
                <Text fontSize={[0, 1, 2]} mb={2}>
                Album: <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{song.Album}</span>
                </Text>
                <Text fontSize={[0, 1, 2]} mb={2}>
               Genre: <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>  {song.Genre}</span> 
                </Text>
                <Flex>
                <Button onClick={() => handleSongDelete(song._id)} variant="outline" color="white" m={1} bg='black' sx={{ ':hover': { backgroundColor: '#333', color: 'white' } }}>
  <FiTrash2 /> Delete
</Button>

<Button onClick={() => handleSongUpdate(song._id)} variant="outline" color="white" m={1} bg='black' sx={{ ':hover': { backgroundColor: '#555', color: 'white' } }}>
  <FiEdit2 /> Edit
</Button>
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
    
  );
}
