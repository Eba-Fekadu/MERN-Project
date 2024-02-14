/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

const headerStyles = css`
  background-color: #cbd5e0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem; /* Adjust padding as needed */
`;

const logoStyles = css`
  font-weight: bold;
  font-size: 1rem;
  
  span:first-of-type {
    color: #4a5568;
    text-decoration: none;
  }

  span:last-of-type {
    color: #2d3748;
    text-decoration: none;
  }
`;

const formStyles = css`
  background-color: #a0aec0;
  padding: 0.75rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;

  input {
    background: transparent;
    outline: none;
    border: none;
    padding: 0.25rem;
    width: 4rem;
    
    @media (min-width: 640px) {
      width: 16rem;
    }
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }
`;

const navigationStyles = css`
  display: flex;
  gap: 1rem;
  list-style: none;

  li {
    color: #4a5568;
    cursor: pointer;
    transition: text-decoration 0.3s; /* Added transition */
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
            <span>MERN</span>
            <span>project</span>
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
          <Link to='/admin' css={css`text-decoration: none;`}>
            <li className='sm:inline'>Apply Change</li>
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
