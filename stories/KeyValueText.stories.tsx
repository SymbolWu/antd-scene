import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import KeyValueText, { IKeyValueText } from "../src/key-value-text";

export default {
  title: "数据展示/KeyValueText 键值对标签",
  component: KeyValueText,
  argTypes: {},
} as Meta;

const Template: Story<IKeyValueText> = (args) => (
  <KeyValueText {...args} valueProps={{ keyboard: true }} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: "姓名",
  value: "Tom",
};
