/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'rebass';
import SongLogo from '../assets/SongLogo(2).png';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// position: fixed;
// top: 0;
// bottom: 2;
//   width: -webkit-fill-available;
//   z-index: 2000; 
const headerStyles = css`

background-color: #000; /* Black background color */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
padding: 0.75rem 1rem;
`;

const logoStyles = css`
  font-weight: bold;
  font-size: 1rem;
  
  span:first-of-type {
    color: #fff; 
    text-decoration: none;
  }


  span:last-of-type {
    color: #ccc;
    text-decoration: none;
  }
  Image {
    max-width: 50%; // Set maximum width to ensure it fits within the container
    height: auto; // Maintain aspect ratio
    margin-right: 8px; // Adjust margin as needed
  }

  @media (max-width: 640px) {
    font-size: 0.875rem; /* Adjust font size for smaller screens */
  }
`;


const formStyles = css`
  background-color: rgba(54, 69, 79, 0.4); /* Dark gray background color */
  padding: 0.75rem;
  border-radius: 10px; /* Adjust border-radius for a slightly rounded appearance */
  display: flex;
  align-items: center;

  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.25rem;
    width: 5rem;
    color: #fff; /* White text color */
    
    @media (min-width: 640px) {
      width: 28rem;
    }
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    color: #ccc; /* Light gray icon color */
  }
  @media (max-width: 640px) {
    display: none; /* Hide the entire form on small screens */
  }
`;

const navigationStyles = css`
  display: flex;
  gap: 1rem;
  list-style: none;
  li {
    color: #fff; /* White text color */
    cursor: pointer;
    transition: text-decoration 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header: React.FC = () => {
  // const { currentUser } = useSelector((state) => state.user);
  // const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   urlParams.set('searchTerm', searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, []);

  return (
    <header css={headerStyles}>
      <div css={css`
        max-width: 6xl;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}>
        <Link to='/' css={css`text-decoration: none;`}>
          <h1 css={logoStyles} className='flex flex-wrap'>
          <Image src={SongLogo} height={[60]} p={1}/>
            {/* <span>MERN</span>
            <span>project</span> */}
          </h1>
        </Link>
        <form css={formStyles}>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button>
            <FaSearch css={css`color: #4a5568`} />
          </button>
        </form>
        <ul css={navigationStyles} className='flex gap-4'>
          <Link to='/' css={css`text-decoration: none;`}>
            <li className='sm:inline'>List</li>
          </Link>
          <Link to='/setting' css={css`text-decoration: none;`}>
            <li className='sm:inline'>Setting</li>
          </Link>
          <Link to='/stats' css={css`text-decoration: none;`}>
            <li className='sm:inline'>Statistics</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
