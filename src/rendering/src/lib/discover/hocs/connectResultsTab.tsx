import { useQuery } from '@tanstack/react-query';
import { getSortingOptions } from '../../../helpers/DiscoverHelper';
import { FC, useContext, useEffect } from 'react';
import ResultsTab from '../../../components/Search/ResultsTab';
import { SearchContext } from '../../../components/Search/SearchProvider';
import { useSearchResults } from '../../../hooks/useSearchResults';
import * as api from '../api';
import { DiscoverRequestProps } from '../api';

const connectResultsTab =
  ({
    entity,
    facetsTypes,
    hasFilters = true,
    defaultProductsPerPage = 10,
    defaultSort = 'featured_desc',
  }: {
    entity: DiscoverRequestProps['entity'];
    hasFilters?: boolean;
    facetsTypes: string[];
    defaultProductsPerPage?: number;
    defaultSort?: string;
  }) =>
  <T extends typeof ResultsTab>(WrappedComponent: T): FC => {
    const Component: FC = () => {
      const { keyphrase, filters, onUpdate } = useContext(SearchContext);
      const {
        filters: tabFilters,
        sort,
        page,
        productsPerPage,
        onResultsPerPageChange,
        onPageNumberChange,
        onClearFilters,
        onSortChange,
        onFacetClick,
        onFilterClick,
      } = useSearchResults({ defaultProductsPerPage, defaultSort });

      const {
        data: {
          facet: facets = {},
          total_item: totalItems = 0,
          sort: { choices: sortChoices = [] } = {},
          content: items = [],
        } = {},
      } = useQuery([entity, filters, tabFilters], () =>
        api.get({
          widgetId: 'rfkid_7',
          entity,
          keyphrase,
          filters: [...(hasFilters ? filters : []), ...tabFilters],
          facets: facetsTypes,
          limit: productsPerPage,
          sort,
          page,
        })
      );

      useEffect(() => {
        onUpdate(entity, totalItems);
      }, [onUpdate, totalItems]);

      const sortOptions = getSortingOptions(entity, sortChoices);

      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore not sure to resolve this one
        <WrappedComponent
          facets={facets}
          filters={filters}
          onFacetValueClick={onFacetClick}
          currentPage={page}
          totalItems={totalItems}
          sortOptions={sortOptions}
          productsPerPage={productsPerPage}
          onPageChange={onPageNumberChange}
          onFilterClick={onFilterClick}
          onClearFilters={onClearFilters}
          onSortChange={onSortChange}
          onResultsPerPageChange={onResultsPerPageChange}
          sort={sort}
          items={items}
        />
      );
    };
    Component.displayName = `connectResultsTab(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;
    return Component;
  };

export default connectResultsTab;
