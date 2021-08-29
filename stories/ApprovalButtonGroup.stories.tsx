import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ApprovalButtonGroup, {
  IApprovalButtonGroup,
} from "../src/approval-button-group";

export default {
  title: "业务场景/ApprovalButtonGroup 审批按钮组",
  component: ApprovalButtonGroup,
  argTypes: {},
} as Meta;

const Template: Story<IApprovalButtonGroup> = (args) => {
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <ApprovalButtonGroup
      {...args}
      onChange={onChange}
      approveConfig={{
        needConfirm: true,
        confirmTitle: "确认已收到代理打款并进行充值？",
        buttonProps: {
          type: "primary",
          size: "small",
        },
      }}
      transform={({ dataSource, status }) => ({ recordId: dataSource, status })}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  dataSource: "hhh",
  status: "3",
  spaceProps: {
    size: "small",
  },
};
