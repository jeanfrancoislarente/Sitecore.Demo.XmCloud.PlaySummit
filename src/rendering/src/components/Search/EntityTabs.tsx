import { useCallback, useContext, useState, FC } from 'react';
import EntityTab from './EntityTab';
import EntityTabContent from './EntityTabContent';
import { SearchContext } from './SearchProvider';

export type Tab = {
  id: string;
  name: string;
  color?: string;
  Component: FC;
};

export type EntityTabsProps = {
  className?: string;
  theme?: string;
  defaultSelected: Tab['id'];
  tabs: Tab[];
};

const EntityTabs = (props: EntityTabsProps): JSX.Element => {
  const { totals } = useContext(SearchContext);
  const themeClass = props.theme ? `entity-tabs-${props.theme}` : '';
  const [activeTab, setActiveTab] = useState<Tab['id']>(() => props.defaultSelected);
  const onSelectTab = useCallback((id: Tab['id']) => {
    setActiveTab(id);
  }, []);
  return (
    <div
      dir="ltr"
      data-orientation="horizontal"
      className={`entity-tabs ${themeClass} ${props.className || ''}`}
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label="Manage your account"
        className="entity-tabs-list"
        tabIndex={0}
        data-orientation="horizontal"
      >
        {props.tabs.map(({ id, name, color }) => (
          <EntityTab
            key={id}
            id={id}
            active={activeTab === id}
            name={`${name}${totals[id] >= 0 ? ` (${totals[id]})` : ''}`}
            color={color}
            onSelect={onSelectTab}
          />
        ))}
      </div>
      {props.tabs.map(({ id, Component: TabContentComponent }) => (
        <EntityTabContent key={id} active={activeTab === id}>
          <TabContentComponent />
        </EntityTabContent>
      ))}
    </div>
  );
};

export default EntityTabs;
