import { useEffect, useState } from 'react';

const cache = {};

export function usePartsList(page) {
  const [parts, setParts] = useState([]);
  const [headers, setHeaders] = useState(new Headers());

  useEffect(() => {
    if (!page) {
      return;
    }

    async function getParts() {
      if (cache[page]) {
        const { data, headers } = cache[page];
        setHeaders(headers);
        setParts(data);
      } else {
        const response = await fetch(
          `http://localhost:5555/parts?page=${page}`
        );
        const data = await response.json();
        cache[page] = {
          data: data.data,
          headers: response.headers,
        };
        setHeaders(response.headers);
        setParts(data.data);
      }
    }

    getParts();
  }, [page]);

  return { parts, headers };
}
