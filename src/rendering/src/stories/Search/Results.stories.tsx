import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import SearchProvider from '../../components/Search/SearchProvider';
import Results from '../../components/Search/Results';
import { filterOptionsProp } from '../mock-discover-data';

export default {
  title: 'Components/Search/Results',
  component: Results,
} as ComponentMeta<typeof Results>;

const Template: ComponentStory<typeof Results> = (args) => (
  <SearchProvider keyphrase="test">
    <Results {...args}>My content</Results>
  </SearchProvider>
);

export const Default = Template.bind({});
Default.args = {
  filterOptions: filterOptionsProp,
  tabs: [
    {
      id: 'session',
      name: 'Sessions',
      color: '#3d93ff',
      Component: () => <div>My sessions content</div>,
    },
    {
      id: 'speaker',
      name: 'Speakers',
      color: '#ff8d02',
      Component: () => <div>My speakers content</div>,
    },
    {
      id: 'vendor',
      name: 'Vendors',
      color: '#ff1a87',
      Component: () => <div>My vendors content</div>,
    },
    {
      id: 'sponsor',
      name: 'Sponsors',
      color: '#ffd51d',
      Component: () => <div>My sponsors content</div>,
    },
    {
      id: 'content',
      name: 'News',
      color: '#000',
      Component: () => <div>My news content</div>,
    },
  ],
};
