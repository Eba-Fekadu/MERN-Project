/** @jsxImportSource @emotion/react */
import React, { ReactElement, ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';
import { Button, Box, Card, Image, Heading, Text } from 'rebass';
import GallaxyImage from '../assets/music-man.jpg'
interface AdminProps {
  // Add any props that the Admin component may receive
  // For example:
  // title: string;
}
const inputStyles = css`
  
  display:flex;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
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
`;


// const columnStyles = css`
//   background-color: #cbd5e0;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   padding: 0.75rem 1rem; /* Adjust padding as needed */
// `;

export default function Admin({ /* destructure props if any */ }: AdminProps): ReactElement {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className='w-24 sm:w-64'>
      
      <Text 
        fontSize={[ 3, 4, 5 ]}
        fontWeight='bold'
        color='#606873'>
        Make Changes
      </Text>
     
      
      <label>Title:</label>
      <input
            type='text'
            css={inputStyles}
             placeholder='Title'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />

          <label>Artist:</label>
      <input
            type='text'
            css={inputStyles}
            placeholder='Artist'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />

<label>Album:</label>
      <input
            type='text'
            css={inputStyles}
            placeholder='Album'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />

<label>Genre:</label>
      <input
            type='text'
            css={inputStyles}
            placeholder='Genre'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
        <Button bg='#606873'>Button</Button>
         

      <Box width={256}>
    <Card
      p={1}
      borderRadius={2}
      boxShadow='0 0 16px rgba(0, 0, 0, .25)'
      >
      <Image src={GallaxyImage} />
      <Box px={2}>
        <Heading as='h3'>
          Card
        </Heading>
        <Text fontSize={0}>
          Small meta text
        </Text>
      </Box>
    </Card>
  </Box>
    </div>
    
  );
}

