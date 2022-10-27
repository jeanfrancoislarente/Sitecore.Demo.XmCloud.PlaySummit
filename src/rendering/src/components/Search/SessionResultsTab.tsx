import { sessionAdapter } from '../../helpers/DiscoverHelper';
import { DiscoverSession } from '../../interfaces/DiscoverSession';
import SessionItem from '../Sessions/SessionItem';
import ResultsTab, { ResultsTabProps } from './ResultsTab';

export type SessionResultsTabProps = ResultsTabProps & {
  items: DiscoverSession[];
};

const SessionResultsTab = (props: SessionResultsTabProps): JSX.Element => {
  return (
    <ResultsTab
      facets={props.facets}
      filters={props.filters}
      productsPerPage={props.productsPerPage}
      currentPage={props.currentPage}
      onResultsPerPageChange={props.onResultsPerPageChange}
      onSortChange={props.onSortChange}
      sort={props.sort}
      sortOptions={props.sortOptions}
      onPageChange={props.onPageChange}
      totalItems={props.totalItems}
      onClearFilters={props.onClearFilters}
      onFacetValueClick={props.onFacetValueClick}
      onFilterClick={props.onFilterClick}
    >
      {props.items.map((session, index) => (
        <SessionItem key={index} session={sessionAdapter(session)} />
      ))}
    </ResultsTab>
  );
};

export default SessionResultsTab;
