import Link from 'next/link';
import { newsAdapter } from '../../helpers/DiscoverHelper';
import { DiscoverNews } from '../../interfaces/DiscoverNews';
import ResultsTab, { ResultsTabProps } from './ResultsTab';

export type NewsResultsTabProps = ResultsTabProps & {
  items: DiscoverNews[];
};

const NewsResultsTab = (props: NewsResultsTabProps): JSX.Element => {
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
      {props.items.map(newsAdapter).map((news, index) => (
        <div key={index} className="news-grid-item">
          <Link href={news.url} passHref>
            <a>
              <img
                className="item-image"
                src={news.fields.Image?.value?.src}
                alt="News"
                width="465px"
                height="260px"
                loading="lazy"
              />
              {news.fields.Title?.value}
            </a>
          </Link>
        </div>
      ))}
    </ResultsTab>
  );
};

export default NewsResultsTab;
