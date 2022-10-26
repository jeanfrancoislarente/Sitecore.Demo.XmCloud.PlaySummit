// import { useQuery } from '@tanstack/react-query';
// import ResultsTab from 'components/Search/ResultsTab';
// import { SearchTabContext } from 'components/Search/SearchTabProvider';
// import { useContext } from 'react';
// import * as api from '../../lib/discover/api';
// import { DiscoverRequestProps } from '../../lib/discover/api';
//
// const connect =
//   ({ entity }: { entity: DiscoverRequestProps['entity'] }) =>
//   <T extends typeof ResultsTab>(WrappedComponent: T) =>
//   (): JSX.Element => {
//     const [facets, setFacets] = useState();
//     const { filters } = useContext(SearchTabContext);
//     const {} = useQuery([entity, filters], () =>
//       api.get({
//         widgetId: 'rfkid_7',
//         entity,
//         filters,
//       })
//     );
//     return <WrappedComponent filters={filters} onFacetValueClick={({ facetId, facetValueId }) => } />;
//   };
//
// export default connect;

const a = 1;
export default a;
