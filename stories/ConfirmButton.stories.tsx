import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ConfirmButton, { IConfirmButton } from "../src/confirm-button";

export default {
  title: "通用/ConfirmButton 气泡确认按钮",
  component: ConfirmButton,
  argTypes: {},
} as Meta;

const Template: Story<IConfirmButton> = (args) => {
  const onConfirmFreezeUser = (value) => {
    console.log(value);
  };
  return (
    <ConfirmButton
      popconfirmProps={{
        title: `确定要删除此用户?`,
        onConfirm: () => onConfirmFreezeUser(123),
      }}
    >
      删除
    </ConfirmButton>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
