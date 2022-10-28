import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { MouseEventHandler } from 'react';
import * as Pagination from './PaginationUI/PaginationUI';

export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

const onChangePageHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.preventDefault();
  window &&
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
};

const PaginationComponent = (props: PaginationProps): JSX.Element => {
  const totalPages = Math.min(Math.ceil(props.totalItems / props.perPage) || 0, 20);
  if (totalPages <= 1) {
    return null;
  }
  return (
    <Pagination.Root
      className="search-pagination"
      currentPage={props.currentPage}
      defaultCurrentPage={1}
      totalPages={totalPages}
      onPageChange={props.onPageChange}
    >
      <Pagination.PrevPage className="search-pagination-nav-link" onClick={onChangePageHandler}>
        <ArrowLeftIcon />
      </Pagination.PrevPage>
      <Pagination.Pages className="search-pagination-pages">
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore This is something we have to fix in our SDK
          ({ pages }) =>
            pages.map(({ page }) => (
              <Pagination.Page
                key={page}
                className="search-pagination-link"
                aria-label={`Page ${page}`}
                page={page}
                onClick={onChangePageHandler}
              >
                {page}
              </Pagination.Page>
            ))
        }
      </Pagination.Pages>
      <Pagination.NextPage className="search-pagination-nav-link" onClick={onChangePageHandler}>
        <ArrowRightIcon />
      </Pagination.NextPage>
    </Pagination.Root>
  );
};

export default PaginationComponent;
