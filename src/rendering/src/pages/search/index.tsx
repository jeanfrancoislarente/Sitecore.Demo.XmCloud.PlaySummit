import Head from 'next/head';
import { ReactElement } from 'react';
import { ResultsContainer } from '../../components/Search/Results';
import { SearchLayout } from '../../components/Search/Search';

const Search = (): JSX.Element => {
  return (
    <>
      <ResultsContainer />
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <SearchLayout>
      <Head>
        <title>PLAY! SHOP</title>
      </Head>

      {page}
    </SearchLayout>
  );
};

export default Search;
