import React, { useRef } from "react";
import { Input, Button, Form, Card } from "antd";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ProTable, { IProTable } from "../src/pro-table";

export default {
  title: "业务场景/ProTable 高级列表",
  component: ProTable,
  argTypes: {},
} as Meta;

const data = () => {
  const f = (length) => Array.from({ length }).map((v, i) => i);
  return f(20).map((i) => ({ name: i, age: i * 10, address: "dd" }));
};
export const Template: Story<IProTable> = (args) => {
  const [form] = Form.useForm();
  const proTableRef = useRef<any>({});

  // const getInstance = (instance: any) => {
  //   console.log('instance:',instance)
  //   proTableRef.current = { ...proTableRef, ...instance };
  // };

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

  const onRefresh = () => {
    console.log("proTableRef:", proTableRef);
  };

  return (
    <ProTable
      ref={proTableRef}
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
      extra={<Card>KKK</Card>}
      tableCardProps={{
        title: "某某列表",
        extra: <Button onClick={onRefresh}>Refresh</Button>,
      }}
      tableProps={{
        size: "small",
        dataSource: data(),
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
  );
};

// export const Primary = Template.bind({});
// Primary.args = {
//   formProps: {
//     formOptions: [
//       {
//         name: "email",
//         label: "邮箱",
//         component: <Input placeholder="请输入邮箱" />,
//       },
//       {
//         name: "password",
//         label: "账号",
//         component: <Input placeholder="请输入密码" />,
//       },
//     ],
//   },
// };

// export const Three = Template.bind({});
// Three.args = {
//   formProps: {
//     formOptions: [
//       {
//         name: "email",
//         label: "邮箱",
//         component: <Input placeholder="请输入邮箱" />,
//       },
//       {
//         name: "password",
//         label: "账号",
//         component: <Input placeholder="请输入密码" />,
//       },
//       {
//         name: "three",
//         label: "kk",
//         component: <Input placeholder="请输入密码" />,
//       },
//     ],
//   },
// };

// export const Four = Template.bind({});
// Four.args = {
//   formProps: {
//     formOptions: [
//       {
//         name: "email",
//         label: "邮箱",
//         component: <Input placeholder="请输入邮箱" />,
//       },
//       {
//         name: "password",
//         label: "账号",
//         component: <Input placeholder="请输入密码" />,
//       },
//       {
//         name: "four",
//         label: "hh",
//         component: <Input placeholder="请输入密码" />,
//       },
//       {
//         name: "three",
//         label: "kk",
//         component: <Input placeholder="请输入密码" />,
//       },
//     ],
//   },
// };
