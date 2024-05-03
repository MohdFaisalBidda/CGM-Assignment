import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({
  pages,
  currentPage,
  handleChangePage,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={pages}
        size="large"
        page={currentPage}
        onChange={handleChangePage}
      />
    </Stack>
  );
}
