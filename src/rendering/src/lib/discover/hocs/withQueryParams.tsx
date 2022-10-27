import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ComponentType } from 'react';

export type WithQueryParamsProps = {
  query: ParsedUrlQuery;
};
const withQueryParams = <T extends WithQueryParamsProps = WithQueryParamsProps>(
  WrappedComponent: ComponentType<T>
): ComponentType => {
  const ComponentWithKeyphrase = (props: T): JSX.Element => {
    const { query, isReady } = useRouter();

    if (!isReady) {
      return null;
    }
    return <WrappedComponent {...props} query={query} />;
  };
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithKeyphrase.displayName = `withQueryParams(${displayName})`;
  return ComponentWithKeyphrase;
};

export default withQueryParams;
