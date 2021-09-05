import React, { useState } from "react";
import { Input, Button, Form } from "antd";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { CheckOutlined } from "@ant-design/icons";

import ModalForm, { IModalForm } from "../src/modal-form";
import ConfigProvider, { IConfigProviderProps } from "../src/config-provider";

export default {
  title: "数据录入/ModalForm 模态框表单",
  component: ModalForm,
  argTypes: {},
} as Meta;

export const Template: Story<IModalForm> = (args) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onOk = (value) => {
    console.log("value:", value);
    console.log("form:", form);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <ConfigProvider modalForm={{ closeIcon: <CheckOutlined /> }}>
      <Button onClick={onOpen}>Open</Button>
      <ModalForm
        {...args}
        formProps={{
          form,
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
        }}
        modalProps={{
          onOk,
          onCancel: onClose,
          visible,
          title: "测试标题",
          // titleIcon:<CheckOutlined/>,
          confirmLoading,
        }}
        extra={<div>Extra</div>}
      />
    </ConfigProvider>
  );
};

// export const Primary = Template.bind({});
// Primary.args = {
//   formProps: {},
//   modalProps: {},
// };
