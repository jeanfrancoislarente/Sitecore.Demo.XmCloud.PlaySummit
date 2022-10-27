import withQueryParams from 'lib/discover/hocs/withQueryParams';
import { ReactElement } from 'react';
import { ResultsContainer } from '../../components/Search/Results';
import { SearchLayout } from '../../components/Search/Search';

const SearchResults = withQueryParams(ResultsContainer);
const Search = (): JSX.Element => {
  return (
    <>
      <SearchResults />
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>;
};

export default Search;
