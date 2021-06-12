/** @jsxRuntime classic */
/** @jsx jsx */

import { useState } from 'react';
import { Pagination } from './Pagination';
import { Part } from './Part';
import { usePartsList } from '../hooks/usePartsList';
import { jsx, css } from '@emotion/react';

export function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { parts, headers } = usePartsList(currentPage);
  const totalPages = parseInt(headers.get('total-pages')) || 0;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        background: #f7f7f7;
        padding: 10px;
        margin: 0 auto;
      `}
    >
      <h1
        css={css`
          margin: 0;
        `}
      >
        Parts
      </h1>
      <ul
        css={css`
          list-style: none;
          padding: 0;
          width: 100%;
        `}
      >
        {parts.map(({ id, quantity, part_file }) => (
          <Part
            key={id}
            partId={id}
            partName={part_file.file_name}
            quantityUnits={part_file.units}
          />
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
