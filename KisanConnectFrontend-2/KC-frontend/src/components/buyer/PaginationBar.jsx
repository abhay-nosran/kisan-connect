import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationRounded({currentPage , setCurrentPage , totalPages}) {

  function handlePageChange(event , value){
    setCurrentPage(value) ;
  }

  return (
    <Stack spacing={2}>
      <Pagination count={totalPages.current} onChange={handlePageChange} page={currentPage} variant="outlined" shape="rounded" />
    </Stack>
  );
}