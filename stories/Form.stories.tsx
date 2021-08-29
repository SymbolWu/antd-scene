import React from "react";
import { Input } from "antd";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Form, { IFormProps } from "../src/form";

export default {
  title: "数据录入/Form 表单",
  component: Form,
  argTypes: {},
} as Meta;

const Template: Story<IFormProps> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  formOptions: [
    {
      name: "email",
      rules: [
        { required: true, message: "请输入邮箱！" },
        { type: "email", message: "不是一个有效的邮箱地址" },
      ],
      component: <Input placeholder="请输入邮箱" />,
    },
    {
      name: "password",
      rules: [{ required: true, message: "请输入密码！" }],
      component: <Input.Password placeholder="请输入密码" />,
    },
  ],
};
