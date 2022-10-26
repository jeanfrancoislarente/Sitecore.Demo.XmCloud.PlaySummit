import { FiltersProps } from 'components/Search/Filters';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';

export type SearchContextType = {
  filters: FiltersProps['options'];
  totals: {
    [key: string]: number;
  };
  onUpdate?: (id: string, total: number) => void;
};

export const SearchTabContext = createContext<SearchContextType>({
  totals: {} as SearchContextType['totals'],
  filters: {} as FiltersProps['options'],
});

const SearchTabProvider = (
  props: { filters: FiltersProps['options'] } & PropsWithChildren
): JSX.Element => {
  const { filters } = props;
  const [totals, setTotals] = useState<SearchContextType['totals']>(
    {} as SearchContextType['totals']
  );
  const value = useMemo(() => {
    return {
      filters,
      totals,
      onChangeFilter: (id: string, val: number) => {
        setTotals((prevTotals) => ({
          ...prevTotals,
          [id]: val,
        }));
      },
    };
  }, [totals, filters]);
  return <SearchTabContext.Provider value={value}>{props.children}</SearchTabContext.Provider>;
};

export default SearchTabProvider;
