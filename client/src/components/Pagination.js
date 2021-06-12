/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function PaginationButton({ handleClick, disabled, children }) {
  return (
    <button
      css={css`
        border: 1px solid transparent;
        cursor: ${disabled ? 'auto' : 'pointer'};
        font-weight: bold;
        background: none;
        &:hover {
          color: ${disabled ? 'auto' : 'blue'};
        }
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Pagination({ totalPages, setCurrentPage, currentPage }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 70%;
      `}
    >
      <PaginationButton
        disabled={currentPage === 1}
        handleClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        Prev
      </PaginationButton>
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
      <PaginationButton
        disabled={currentPage === totalPages}
        handleClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        Next
      </PaginationButton>
    </div>
  );
}
