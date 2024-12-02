// This component was generated by @sitecore-search/cli on Mon Dec 02 2024 14:26:32 GMT+0900 (日本標準時)

type QueryResultsSummaryProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItemsReturned: number;
  totalItems: number;
};
const QueryResultsSummary = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalItemsReturned,
}: QueryResultsSummaryProps) => {
  return (
    <div className="font-bold my-auto mx-0">
      Showing {itemsPerPage * (currentPage - 1) + 1} - {itemsPerPage * (currentPage - 1) + totalItemsReturned} of{' '}
      {totalItems} results
    </div>
  );
};

export default QueryResultsSummary;