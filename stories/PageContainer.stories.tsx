import React from "react";
import { Button } from "antd";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import PageContainer, { IPageContainer } from "../src/page-container";

export default {
  title: "布局/PageContainer 页面框架",
  component: PageContainer,
  argTypes: {},
} as Meta;

const Template: Story<IPageContainer> = (args) => (
  <PageContainer {...args} extra={<Button>Extra</Button>}>
    <div>早知道结局是不能抗拒的错</div>
  </PageContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  loading: false,
  title: "测试页面",
};
