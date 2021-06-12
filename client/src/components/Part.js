/** @jsxRuntime classic */
/** @jsx jsx */

import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';

export function Part({ partName, quantityUnits, partId }) {
  const [newQuantity, setNewQuantity] = useState(null);

  useEffect(() => {
    if (!newQuantity) {
      return;
    }

    const data = { quantity: newQuantity };

    fetch(`http://localhost:5555/parts/${partId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [newQuantity, partId]);

  function handleSubmit(e) {
    e.preventDefault();
    setNewQuantity(e.target.elements.quantity.value);
  }

  return (
    <li
      data-testid="part"
      css={css`
        border: 1px solid #cacaca;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;
        background: #fefefe;
        padding: 10px;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            font-weight: bold;
            padding-bottom: 8px;
            font-size: 18px;
          `}
        >
          {partName}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="number"
            name="quantity"
            placeholder={`Quantity(${quantityUnits})`}
          />
        </label>
        <button
          css={css`
            margin-left: 15px;
          `}
          type="submit"
        >
          Save
        </button>
      </form>
    </li>
  );
}
