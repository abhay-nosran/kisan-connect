import PaginationRounded from "./PaginationBar"

const ActivityBar = ({currentPage , setCurrentPage , totalPages}) => (
  <div className="flex items-center justify-between px-4 py-2 w-full">
    
    <PaginationRounded currentPage = {currentPage} setCurrentPage = {setCurrentPage} totalPages={totalPages}/>
    
  </div>
);

export default ActivityBar;
