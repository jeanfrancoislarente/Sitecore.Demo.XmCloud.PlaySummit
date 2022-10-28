import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ComponentType } from 'react';

export type WithQueryParamsProps = {
  query: ParsedUrlQuery;
};
const withQueryParams = <T extends WithQueryParamsProps = WithQueryParamsProps>(
  WrappedComponent: ComponentType<T>,
  params: string[]
): ComponentType => {
  const ComponentWithQueryParams = (props: T): JSX.Element => {
    const { query, isReady } = useRouter();

    if (!isReady) {
      return null;
    }
    return (
      <WrappedComponent
        {...props}
        {...params.reduce(
          (mem, param) => ({ ...mem, [param]: (query[param] || '').toString() }),
          {}
        )}
      />
    );
  };
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithQueryParams.displayName = `withQueryParams(${displayName})`;
  return ComponentWithQueryParams;
};

export default withQueryParams;
