import React, { useState } from "react";
import { Input, Button } from "antd";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ProTable, { IProTable, Form } from "../src/pro-table";

export default {
  title: "业务场景/ProTable 高级列表",
  component: ProTable,
  argTypes: {},
} as Meta;

const Template: Story<IProTable> = (args) => {
  const [form] = Form.useForm();
  return (
    <ProTable
      formProps={{
        form,
        colSpan: 8,
        ...args.formProps,
      }}
      tableCardProps={{
        title: "某某列表",
      }}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  formProps: {
    formOptions: [
      {
        name: "email",
        label: "邮箱",
        component: <Input placeholder="请输入邮箱" />,
      },
      {
        name: "password",
        label: "账号",
        component: <Input placeholder="请输入密码" />,
      },
    ],
  },
};

export const Three = Template.bind({});
Three.args = {
  formProps: {
    formOptions: [
      {
        name: "email",
        label: "邮箱",
        component: <Input placeholder="请输入邮箱" />,
      },
      {
        name: "password",
        label: "账号",
        component: <Input placeholder="请输入密码" />,
      },
      {
        name: "three",
        label: "kk",
        component: <Input placeholder="请输入密码" />,
      },
    ],
  },
};

export const Four = Template.bind({});
Four.args = {
  formProps: {
    formOptions: [
      {
        name: "email",
        label: "邮箱",
        component: <Input placeholder="请输入邮箱" />,
      },
      {
        name: "password",
        label: "账号",
        component: <Input placeholder="请输入密码" />,
      },
      {
        name: "four",
        label: "hh",
        component: <Input placeholder="请输入密码" />,
      },
      {
        name: "three",
        label: "kk",
        component: <Input placeholder="请输入密码" />,
      },
    ],
  },
};
