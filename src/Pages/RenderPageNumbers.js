const RenderPageNumbers = ({
  data,
  handlePagination,
  currentPage,
  handlePrevPage,
  handleNextPage,
  totalPages,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data ? data.length / 10 : 1); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li
          className="paginate_button page-item previous "
          id="order-listing_previous"
        >
          <span
            aria-controls="order-listing"
            aria-disabled="true"
            role="link"
            data-dt-idx="previous"
            tabindex="-1"
            className="page-link"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </span>
        </li>
        {pageNumbers &&
          pageNumbers.length > 0 &&
          pageNumbers.map((number) => (
            <li
              key={number} // Adding a unique key prop
              className={`paginate_button page-item ${
                number === currentPage ? "active" : ""
              }`}
            >
              <span
                aria-controls="order-listing"
                role="link"
                data-dt-idx={number}
                tabIndex={number}
                className="page-link"
                onClick={(e) => handlePagination(number)}
              >
                {number}
              </span>
            </li>
          ))}
        <li className="paginate_button page-item next " id="order-listing_next">
          <a
            aria-controls="order-listing"
            aria-disabled="true"
            role="link"
            data-dt-idx="previous"
            tabindex="-1"
            className="page-link"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </a>
        </li>
      </ul>
    </>
  );
};
export default RenderPageNumbers;
