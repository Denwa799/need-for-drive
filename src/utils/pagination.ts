export const pageSizeOptions = ['4', '10', '25', '50', '75', '100'];

export const paginationItems = <T>(items: T[], currentPage: number, limit: number) => {
  const lastPaginationIndex = currentPage * limit;
  const firstPaginationIndex = lastPaginationIndex - limit;

  return items.slice(firstPaginationIndex, lastPaginationIndex);
};
