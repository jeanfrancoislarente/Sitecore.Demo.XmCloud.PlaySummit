import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PreviewSearchPopup } from '../../components/PreviewSearchContent/PreviewSearchContainer';
import { mockPreviewSearchFields } from '../Pages/PageStoriesCommon';

export default {
  title: 'Components/PreviewSearchContent/PreviewSearch',
  component: PreviewSearchPopup,
} as ComponentMeta<typeof PreviewSearchPopup>;

const Template: ComponentStory<typeof PreviewSearchPopup> = (args) => (
  <PreviewSearchPopup {...args} />
);

export const Default = Template.bind({});
const {
  news: { list: news },
  sessions: { list: sessions },
  speakers: { list: speakers },
  suggestions: { list: suggestions },
} = mockPreviewSearchFields;
Default.args = {
  resultsUrl: '/search?q=test',
  news: { content: news },
  sessions: { content: sessions },
  speakers: { content: speakers },
  suggestions: { content: suggestions },
};
