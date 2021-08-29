import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Descriptions, { IDescriptions } from "../src/descriptions";

export default {
  title: "数据展示/Descriptions 描述列表",
  component: Descriptions,
  argTypes: {},
} as Meta;

const Template: Story<IDescriptions> = (args) => (
  <Descriptions
    options={[
      { label: "name", value: "tom" },
      { label: "age", value: 12 },
    ]}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
