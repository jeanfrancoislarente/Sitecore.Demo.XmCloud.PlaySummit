import { sessionAdapter } from '../../helpers/DiscoverHelper';
import { DiscoverSession } from '../../interfaces/discover/DiscoverSession';
import SessionItem from '../Sessions/SessionItem';
import ResultsTab, { ResultsTabProps } from './ResultsTab';

export type SessionResultsTabProps = ResultsTabProps & {
  items: DiscoverSession[];
};

const SessionResultsTab = (props: SessionResultsTabProps): JSX.Element => {
  return (
    <ResultsTab
      loading={props.loading}
      facets={props.facets}
      filters={props.filters}
      perPage={props.perPage}
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
      <div className="item-grid sessions-grid">
        <div className="grid-content">
          {props.items.map((session, index) => (
            <SessionItem key={index} session={sessionAdapter(session)} />
          ))}
        </div>
      </div>
    </ResultsTab>
  );
};

export default SessionResultsTab;
