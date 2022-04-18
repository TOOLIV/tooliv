import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SideMenuItem from '../../components/home/sidemenu/SideMenuItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'sidemenu/SideMenuItem',
  component: SideMenuItem,
} as ComponentMeta<typeof SideMenuItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SideMenuItem> = (args) => <SideMenuItem {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'SideMenuItem',
};
