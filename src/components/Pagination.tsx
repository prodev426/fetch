import React from "react";

type PaginationProps = {
  total: number;
  size: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ total, size, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / size);

  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`mx-1 px-3 py-1 rounded-md ${currentPage === index ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
