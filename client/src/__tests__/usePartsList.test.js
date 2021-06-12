import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { usePartsList } from '../hooks/usePartsList';

const parts = [...new Array(20)].map((part, id) => ({
  id: id + 1,
  part_file: { id: id + 1, file_name: `part-${id + 1}.stl`, units: 'mm' },
  quantity: id + 3,
}));

const server = setupServer(
  rest.get('http://localhost:5555/parts', (req, res, ctx) => {
    const pageId = req.url.searchParams.get('page');
    const partsToReturn = {
      1: parts.slice(0, 5),
      2: parts.slice(5, 10),
      3: parts.slice(10, 15),
      4: parts.slice(15, 20),
    };
    return res(
      ctx.json({
        data: partsToReturn[pageId],
      }),
      ctx.set({
        'per-page': 5,
        'page-number': pageId,
        'total-entries': 20,
        'total-pages': 4,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('gives an empty parts list and no headers with no page', async () => {
  const { result } = renderHook(() => usePartsList(''));

  const { parts, headers } = result.current;

  expect(headers.get('per-page')).toBeNull();
  expect(headers.get('page-number')).toBeNull();
  expect(headers.get('total-entries')).toBeNull();
  expect(headers.get('total-pages')).toBeNull();
  expect(parts.length).toBe(0);
});

test('gives a full parts list and headers with a page', async () => {
  const page = 2;
  const { result, waitForNextUpdate } = renderHook(() => usePartsList(page));

  await waitForNextUpdate();

  const { parts, headers } = result.current;

  expect(headers.get('per-page')).toBe('5');
  expect(headers.get('page-number')).toBe(page.toString());
  expect(headers.get('total-entries')).toBe('20');
  expect(headers.get('total-pages')).toBe('4');
  expect(parts.length).toBe(5);
});
