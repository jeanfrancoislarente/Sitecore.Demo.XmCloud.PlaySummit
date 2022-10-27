import { PropsWithChildren, FC } from 'react';
import { DiscoverResponseSortChoice } from '../../interfaces/DiscoverResponse';
import Facets, { FacetsProps } from './Facets';
import Pagination, { PaginationProps } from './Pagination';

export type ResultsTabProps = PropsWithChildren &
  FacetsProps &
  PaginationProps & {
    onResultsPerPageChange: (perPage: number) => void;
    onSortChange: (sortChoice: string) => void;
    sort: DiscoverResponseSortChoice['name'];
    sortOptions: DiscoverResponseSortChoice[];
  };

const ResultsTab: FC<ResultsTabProps> = (props) => {
  return (
    <div className="search-results-tab">
      <div className="search-results-tab-filters">
        <Facets
          facets={props.facets}
          filters={props.filters}
          onFacetValueClick={props.onFacetValueClick}
          onFilterClick={props.onFilterClick}
          onClearFilters={props.onClearFilters}
        />
      </div>
      <div className="search-results-tab-content">
        <div>
          <div>
            <label>Sort by:</label>
            <select
              value={props.sort}
              onChange={(e) => {
                props.onSortChange(e.currentTarget.value);
              }}
            >
              {props.sortOptions.map(({ name, label }) => (
                <option key={name} value={name}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="item-grid sessions-grid">
          <div className="grid-content">{props.children}</div>
        </div>
        <div className="search-results-footer">
          <div>
            <label>Results Per Page</label>
            <select
              defaultValue={10}
              className="search-results-per-page"
              onChange={(e) => {
                props.onResultsPerPageChange(Number(e.currentTarget.value));
              }}
            >
              <option value={10}>10</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={72}>72</option>
            </select>
          </div>
          <Pagination
            currentPage={props.currentPage}
            totalItems={props.totalItems}
            productsPerPage={props.productsPerPage}
            onPageChange={props.onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsTab;
