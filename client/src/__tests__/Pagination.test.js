import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../components/Pagination';

const paginationProps = {
  totalPages: 4,
  currentPage: 2,
};

test('renders the correct amount of page buttons', () => {
  render(<Pagination {...paginationProps} />);
  const pageButtons = screen.getAllByTestId('pagination-page');
  expect(pageButtons.length).toBe(paginationProps.totalPages);
});

test('current page button is disabled and highlighted', () => {
  render(<Pagination {...paginationProps} />);
  const currentButton = screen.getByRole('button', {
    name: paginationProps.currentPage.toString(),
  });
  expect(currentButton).toBeDisabled();
  expect(currentButton).toHaveStyle('background: orange');
});

test('clicking on a page button calls setCurrentPage with that page', () => {
  const pageToClick = 4;
  const setCurrentPage = jest.fn();
  const props = { ...paginationProps, setCurrentPage };
  render(<Pagination {...props} />);
  const nextButton = screen.getByRole('button', {
    name: pageToClick.toString(),
  });
  userEvent.click(nextButton);
  expect(setCurrentPage).toHaveBeenCalledWith(pageToClick);
});

test('clicking on next button calls setCurrentPage correctly', () => {
  const setCurrentPage = jest.fn();
  const props = { ...paginationProps, setCurrentPage };
  render(<Pagination {...props} />);
  const nextButton = screen.getByRole('button', { name: 'Next' });
  userEvent.click(nextButton);
  expect(setCurrentPage).toHaveBeenCalledWith(paginationProps.currentPage + 1);
});

test('clicking on Prev button calls setCurrentPage correctly', () => {
  const setCurrentPage = jest.fn();
  const props = { ...paginationProps, setCurrentPage };
  render(<Pagination {...props} />);
  const nextButton = screen.getByRole('button', { name: 'Prev' });
  userEvent.click(nextButton);
  expect(setCurrentPage).toHaveBeenCalledWith(paginationProps.currentPage - 1);
});

test('next button is disabled when currentpage equals totalpages', () => {
  const props = { ...paginationProps, currentPage: paginationProps.totalPages };
  render(<Pagination {...props} />);
  const nextButton = screen.getByRole('button', { name: 'Next' });
  expect(nextButton).toBeDisabled();
});

test('prev button is disabled when current page is the first page', () => {
  const props = { ...paginationProps, currentPage: 1 };
  render(<Pagination {...props} />);
  const prevButton = screen.getByRole('button', { name: 'Prev' });
  expect(prevButton).toBeDisabled();
});
