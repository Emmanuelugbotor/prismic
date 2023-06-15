import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props<T> {
  data: T[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (event: number) => void;
}

const PaginationRounded = <T,>({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: Props<T>) => {

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        shape="rounded"
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default PaginationRounded;
