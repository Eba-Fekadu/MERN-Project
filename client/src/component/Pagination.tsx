import React, { useState } from "react"
import { Box, Button } from "rebass"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const PAGE_SIZE = 5

const Pagination: React.FC<{
  totalItems: number
  onPageChange: (page: number) => void
}> = ({ totalItems, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const handleFirstPage = () => {
    if (currentPage > 1) {
      handlePageChange(1)
    }
  }

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  return (
    <Box mt={3} textAlign="center" p={2}>
      <Button
        variant="outline"
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        bg="#606873"
        mx={1}
      >
        <FiChevronLeft />
      </Button>
      {Array.from({ length: Math.min(totalPages, PAGE_SIZE) }).map(
        (_, index) => (
          <Button
            key={index + 1}
            variant={currentPage === index + 1 ? "primary" : "outline"}
            onClick={() => handlePageChange(index + 1)}
            bg="#606873"
            mx={1}
          >
            {index + 1}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        bg="#606873"
        mx={1}
      >
        <FiChevronRight />
      </Button>
    </Box>
  )
}

export default Pagination
