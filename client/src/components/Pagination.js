/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export function Pagination({ totalPages, setCurrentPage, currentPage }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 70%;
      `}
    >
      <button
        css={css`
          border: 1px solid transparent;
          cursor: ${currentPage === 1 ? 'auto' : 'pointer'};
          font-weight: bold;
          background: none;
          &:hover {
            color: ${currentPage === 1 ? 'auto' : 'blue'};
          }
        `}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          data-testid="pagination-page"
          css={css`
            border: 1px solid transparent;
            background: ${currentPage === i + 1 ? 'orange' : 'white'};
            color: ${currentPage === i + 1 ? 'white' : 'black'};
            cursor: ${currentPage === i + 1 ? 'auto' : 'pointer'};
            font-weight: bold;
            &:hover {
              border: 1px solid
                ${currentPage === i + 1 ? 'transparent' : 'black'};
            }
          `}
          onClick={() => {
            setCurrentPage(i + 1);
          }}
          disabled={currentPage === i + 1}
          key={i}
        >
          {i + 1}
        </button>
      ))}
      <button
        css={css`
          border: 1px solid transparent;
          cursor: ${currentPage === totalPages ? 'auto' : 'pointer'};
          font-weight: bold;
          background: none;
          &:hover {
            color: ${currentPage === totalPages ? 'auto' : 'blue'};
          }
        `}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
