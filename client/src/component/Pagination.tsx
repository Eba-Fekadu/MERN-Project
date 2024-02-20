import React, { useState } from 'react';
import { Box, Button } from 'rebass';

const PAGE_SIZE = 6;

const Pagination: React.FC<{ totalItems: number; onPageChange: (page: number) => void }> = ({
  totalItems,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Box mt={3} textAlign="center" p={2}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index + 1}
          variant={currentPage === index + 1 ? 'primary' : 'outline'}
          onClick={() => handlePageChange(index + 1)}
          bg="#606873"
          mx={1}
        >
          {index + 1}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
