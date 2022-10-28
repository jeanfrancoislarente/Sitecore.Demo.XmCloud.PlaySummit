import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ResultsTab from '../../components/Search/ResultsTab';
import { defaultArgs } from './ResultsTabArgs';

export default {
  title: 'Components/Search/ResultsTab',
  component: ResultsTab,
} as ComponentMeta<typeof ResultsTab>;

const Template: ComponentStory<typeof ResultsTab> = (args) => (
  <ResultsTab {...args}>My content</ResultsTab>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
