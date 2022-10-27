import { useQuery } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { DiscoverResponseBase } from '../../interfaces/DiscoverResponse';
import connectResultsTab from '../../lib/discover/hocs/connectResultsTab';
import * as api from '../../lib/discover/api';
import NewsResultsTab from './NewsResultsTab';
import SessionResultsTab from './SessionResultsTab';
import SpeakerResultsTab from './SpeakerResultsTab';
import SponsorResultsTab from './SponsorResultsTab';
import VendorResultsTab from './VendorResultsTab';
import EntityTabs, { Tab } from './EntityTabs';
import Filters, { FiltersProps } from './Filters';
import SearchProvider, { SearchContext } from './SearchProvider';

export type ResultsProps = PropsWithChildren & {
  defaultSelectedTab?: string;
  filterOptions: FiltersProps['options'];
  tabs: Tab[];
};

const tabs = [
  {
    id: 'session',
    name: 'Sessions',
    color: '#3d93ff',
    Component: connectResultsTab({
      entity: 'session',
      facetsTypes: ['audience', 'is_premium', 'sponsors', 'vendors', 'speakers'],
    })(SessionResultsTab),
  },
  {
    id: 'speaker',
    name: 'Speakers',
    color: '#ff8d02',
    Component: connectResultsTab({
      entity: 'speaker',
      facetsTypes: ['company', 'job_title', 'location', 'sessions', 'is_featured'],
    })(SpeakerResultsTab),
  },
  {
    id: 'vendor',
    name: 'Vendors',
    color: '#ff1a87',
    Component: connectResultsTab({
      entity: 'vendor',
      facetsTypes: ['activities', 'level', 'speakers', 'sessions'],
    })(VendorResultsTab),
  },
  {
    id: 'sponsor',
    name: 'Sponsors',
    color: '#ffd51d',
    Component: connectResultsTab({
      entity: 'sponsor',
      facetsTypes: ['level', 'speakers', 'sessions'],
    })(SponsorResultsTab),
  },
  {
    id: 'content',
    name: 'News',
    color: '#000',
    Component: connectResultsTab({
      entity: 'content',
      hasFilters: false,
      facetsTypes: [],
    })(NewsResultsTab),
  },
];

const Results = (props: ResultsProps): JSX.Element => {
  const { onChangeFilter } = useContext(SearchContext);
  return (
    <div className="search-results">
      <Filters
        options={props.filterOptions}
        onChange={onChangeFilter}
        className="search-results-filters"
      />
      <EntityTabs
        defaultSelected={props.defaultSelectedTab || 'session'}
        tabs={props.tabs}
        className="search-results-tabs"
      />
    </div>
  );
};

const widgetId = 'rfkid_7';
type ResultsContainerProps = { query: ParsedUrlQuery };

export const ResultsContainer = (props: ResultsContainerProps): JSX.Element => {
  const { query } = props;
  const keyphrase = (query.q || '').toString();
  const tab = (query.tab || '').toString() || undefined;
  const { isLoading, data: { facet: { days = {}, rooms = {} } = {} } = {} } =
    useQuery<DiscoverResponseBase>([keyphrase, 'filters'], () =>
      api.get(
        {
          entity: 'session',
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
      schedule: days.value?.map(({ text, id }) => ({ value: id, label: text })) || [],
      rooms: rooms.value?.map(({ text, id }) => ({ value: id, label: text })) || [],
    };
  }, [days, rooms]);

  return (
    <SearchProvider keyphrase={keyphrase}>
      {isLoading && <div>Loading...</div>}
      <Results filterOptions={filterOptions} tabs={tabs} defaultSelectedTab={tab} />
    </SearchProvider>
  );
};

export default Results;
