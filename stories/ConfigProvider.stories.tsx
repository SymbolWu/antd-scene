import React, { useState } from "react";
import { Input, Button, Form } from "antd";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ProTable, { IProTable } from "../src/pro-table";
import ConfigProvider, { IConfigProviderProps } from "../src/config-provider";

export default {
  title: "其他/ConfigProvider 全局配置",
  component: ConfigProvider,
  argTypes: {},
} as Meta;

const Template: Story<IConfigProviderProps> = (args) => {
  const [form] = Form.useForm();
  const f = (length) => Array.from({ length }).map((v, i) => i);
  const data = f(20).map((i) => ({ name: i, age: i * 10, address: "dd" }));
  const getProTableParams = (values) => {
    console.log(values);
  };
  const onChangeParams = (values) => {
    console.log("onChangeParams:", values);
  };

  const onTableChange = (pagination, filter, sorter) => {
    console.log("pagination:", pagination);
    console.log("filter:", filter);
    console.log("sorter:", sorter);
  };

  const onFormParams = (values) => {
    console.log("onFormParams:", values);
  };
  const bodyStyle = { paddingTop: "0px" };
  const headStyle = { borderBottom: "0px" };
  return (
    <ConfigProvider
      proTable={{
        tableCardBodyStyle: bodyStyle,
        tableCardHeadStyle: headStyle,
      }}
    >
      <ProTable
        formProps={{
          form,
          colSpan: 8,
          initialValues: { email: "email" },
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
        }}
        tableCardProps={{
          title: "某某列表",
        }}
        tableProps={{
          size: "small",
          dataSource: data,
          columns: [
            { title: "姓名", dataIndex: "name", key: "name" },
            { title: "年龄", dataIndex: "age", key: "age" },
            { title: "地址", dataIndex: "address", key: "address" },
          ],
          rowKey: "name",
          onChange: onTableChange,
        }}
        getInitialParams={getProTableParams}
        onChangeParams={onChangeParams}
        onChangeFormParams={onFormParams}
      />
    </ConfigProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
