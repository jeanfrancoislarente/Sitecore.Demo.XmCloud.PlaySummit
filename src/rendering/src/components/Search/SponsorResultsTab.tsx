import { Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { sponsorAdapter } from '../../helpers/DiscoverHelper';
import { DiscoverSponsor } from '../../interfaces/DiscoverSponsor';
import ResultsTab, { ResultsTabProps } from './ResultsTab';

export type SponsorResultsTabProps = ResultsTabProps & {
  items: DiscoverSponsor[];
};

const SponsorResultsTab = (props: SponsorResultsTabProps): JSX.Element => {
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
      {props.items.map(sponsorAdapter).map((sponsor, index) => (
        <Link key={index} href={sponsor.url} passHref>
          <a className="grid-item">
            <Image
              field={sponsor.fields.Logo}
              alt={sponsor.fields.Name.value}
              width={265}
              height={265}
            />
            <div className="item-details">
              <Text tag="p" field={sponsor.fields.Name} />
            </div>
          </a>
        </Link>
      ))}
    </ResultsTab>
  );
};

export default SponsorResultsTab;
