import { Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { vendorAdapter } from '../../helpers/DiscoverHelper';
import { DiscoverSponsor } from '../../interfaces/DiscoverSponsor';
import ResultsTab, { ResultsTabProps } from './ResultsTab';

export type VendorResultsTabProps = ResultsTabProps & {
  items: DiscoverSponsor[];
};

const VendorResultsTab = (props: VendorResultsTabProps): JSX.Element => {
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
      {props.items.map(vendorAdapter).map((vendor, index) => (
        <Link key={index} href={vendor.url} passHref>
          <a className="grid-item">
            <Image
              field={vendor.fields.Logo}
              alt={vendor.fields.Name.value}
              width={265}
              height={265}
            />
            <div className="item-details">
              <Text tag="p" field={vendor.fields.Name} />
            </div>
          </a>
        </Link>
      ))}
    </ResultsTab>
  );
};

export default VendorResultsTab;
