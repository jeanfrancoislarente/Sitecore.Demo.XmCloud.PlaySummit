import { useCallback, useState } from 'react';
import { DiscoverRequestFilter } from '../lib/discover/api';

export type UseSearchResults = {
  filters: DiscoverRequestFilter[];
  sort: string;
  page: number;
  productsPerPage: number;
  onResultsPerPageChange: (value: number) => void;
  onPageNumberChange: (value: number) => void;
  onClearFilters: () => void;
  onSortChange: (value: string) => void;
  onFacetClick: (payload: FacetValueClickedActionPayload) => void;
  onFilterClick: (payload: FacetValueClickedActionPayload) => void;
};

export type FacetValueClickedActionPayload = {
  facetId: string;
  facetValueId: string;
  facetIndex: number;
  facetValueIndex: number;
  checked: boolean;
};
export const useSearchResults = ({
  defaultProductsPerPage,
  defaultSort,
}: {
  defaultProductsPerPage: number;
  defaultSort: string;
}): UseSearchResults => {
  const [filters, setFilters] = useState<DiscoverRequestFilter[]>([]);
  const [sort, setSort] = useState(defaultSort);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(defaultProductsPerPage);

  const onResultsPerPageChange = useCallback((numProducts: number) => {
    setProductsPerPage(numProducts);
    setPage(1);
  }, []);

  const onPageNumberChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const onClearFilters = useCallback(() => {
    setFilters([]);
    setPage(1);
  }, []);

  const onSortChange = useCallback((sortType: string) => {
    setSort(sortType);
    setPage(1);
  }, []);

  const onFacetClick = useCallback(
    ({ facetId, facetValueId, checked }: FacetValueClickedActionPayload) => {
      if (checked) {
        setFilters((filters) => [...filters, { facetId, facetValueId }]);
      } else {
        setFilters((filters) =>
          filters.filter(
            ({ facetId: currentFacetId, facetValueId: currentFacetValueId }) =>
              currentFacetId !== facetId || currentFacetValueId !== facetValueId
          )
        );
      }
      setPage(1);
    },
    []
  );

  const onFilterClick = onFacetClick;

  return {
    filters,
    sort,
    page,
    productsPerPage,
    onResultsPerPageChange,
    onPageNumberChange,
    onClearFilters,
    onSortChange,
    onFacetClick,
    onFilterClick,
  };
};
