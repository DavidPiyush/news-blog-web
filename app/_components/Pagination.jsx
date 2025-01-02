const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevious}
        className="p-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
      >
        Previous
      </button>

      <div className="text-white">
        Page {currentPage} of {totalPages}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="p-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
