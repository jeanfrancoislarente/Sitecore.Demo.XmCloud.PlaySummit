import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import SearchProvider from '../../components/Search/SearchProvider';
import Facets from '../../components/Search/Facets';
import { facetsProp, filtersProp } from '../mock-discover-data';

export default {
  title: 'Components/Search/Facets',
  component: Facets,
} as ComponentMeta<typeof Facets>;

const Template: ComponentStory<typeof Facets> = (args) => (
  <SearchProvider keyphrase="test">
    <Facets {...args} />
  </SearchProvider>
);

export const Default = Template.bind({});
Default.args = {
  facets: facetsProp,
  filters: [],
};

export const WithFilters = Template.bind({});
WithFilters.args = {
  facets: facetsProp,
  filters: filtersProp,
};
