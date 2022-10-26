import { useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren, useContext, useMemo, useState } from 'react';
import { DiscoverResponseBase } from '../../interfaces/DiscoverResponse';
import * as api from '../../lib/discover/api';
import EntityTabs from './EntityTabs';
import Filters, { FiltersProps } from './Filters';
import SearchProvider, { SearchContext } from './SearchProvider';
import SearchTabProvider from './SearchTabProvider';

export type ResultsProps = PropsWithChildren & {
  filters: FiltersProps['options'];
  filterOptions: FiltersProps['options'];
  onChangeFilter: FiltersProps['onChange'];
};

const tabs = [
  {
    id: 'sessions',
    name: 'Sessions',
    color: '#3d93ff',
    Component: () => <div>Sessions component</div>,
  },
  {
    id: 'speakers',
    name: 'Speakers',
    color: '#ff8d02',
    Component: () => <div>Speakers component</div>,
  },
  {
    id: 'vendors',
    name: 'Vendors',
    color: '#ff1a87',
    Component: () => <div>Vendors component</div>,
  },
  {
    id: 'sponsors',
    name: 'Sponsors',
    color: '#ffd51d',
    Component: () => <div>Sponsors component</div>,
  },
  {
    id: 'articles',
    name: 'News',
    color: '#000',
    Component: () => <div>News Articles component</div>,
  },
];

const Results = (props: ResultsProps): JSX.Element => {
  const { onChangeFilter } = useContext(SearchContext);
  return (
    <SearchProvider>
      <div className="search-results">
        <Filters
          options={props.filterOptions}
          onChange={onChangeFilter}
          className="search-results-filters"
        />
        <SearchTabProvider filters={props.filters}>
          <EntityTabs defaultSelected="sessions" tabs={tabs} className="search-results-tabs" />
        </SearchTabProvider>
      </div>
    </SearchProvider>
  );
};

const widgetId = 'rfkid_7';
export const ResultsContainer = (): JSX.Element => {
  // eslint-disable-next-line
  const keyphrase = new URLSearchParams(location.search).get('q');
  const [filters, setFilters] = useState<FiltersProps['options']>({} as FiltersProps['options']);
  const { isLoading, data: { facet: { days, rooms } } = {} } = useQuery<DiscoverResponseBase>(
    [keyphrase, 'filters'],
    () =>
      api.get(
        {
          widgetId,
          keyphrase,
          facets: [
            'days',
            // 'time_slots',
            'rooms',
          ],
        },
        {}
      )
  );
  const filterOptions = useMemo<FiltersProps['options']>(() => {
    return {
      schedule: days.value.map(({ text, id }) => ({ value: id, label: text })),
      rooms: rooms.value.map(({ text, id }) => ({ value: id, label: text })),
    };
  }, [days, rooms]);

  if (isLoading) {
    return null;
  }

  return (
    <Results
      filters={filters}
      filterOptions={filterOptions}
      onChangeFilter={(id: 'schedule' | 'rooms', value) =>
        setFilters((filters) => ({ ...filters, [id]: [...(filters[id] || []), value] }))
      }
    />
  );
};

export default Results;
