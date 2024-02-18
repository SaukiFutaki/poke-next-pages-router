import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Page {
  page: number;
  lastPage: number;
  setPage: any;
}

const PaginationComponent = ({ page, lastPage, setPage }: Page) => {
  const scrollTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleNextPage = () => {
    setPage((prevState: number) => prevState + 1);
    scrollTop();
  };

  const handlePrevPage = () => {
   
    setPage((prevState: number) => prevState - 1);
    scrollTop();
 
  };

  const handleLastPage = () => {
    setPage(lastPage);
    scrollTop();
  };

  const handleFirstPage = () => {
    setPage(1);
    scrollTop();
  };

  const handlePagePlusOne = ()=>{
    setPage(page + 1)
    scrollTop()
  }
  return (
    <div className="flex justify-center  items-center py-4 px-2 gap-4 text-color-primary ">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={handlePrevPage}
              />
            </PaginationItem>
          )}
          {page > 2 && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPage(page - 1)}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink className="cursor-pointer" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {page < lastPage - 1 && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={handlePagePlusOne}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {lastPage > page && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={handleLastPage}
              >
                {lastPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < lastPage && (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={handleNextPage}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
