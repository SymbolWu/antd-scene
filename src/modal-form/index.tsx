import React from "react";
import { Modal, ModalProps } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import Form, { IFormProps } from "../form";

export interface IModalForm {
  modalProps: ModalProps;
  formProps: IFormProps;
  extra?: React.ReactNode | null;
}

const ModalForm: React.FC<IModalForm> = ({ modalProps, formProps, extra }) => {
  const { form, onFinishFailed, ...restFormProps } = formProps;
  const {
    onOk,
    onCancel,
    visible,
    okText = "提交",
    cancelText = "取消",
    okButtonProps = { icon: <CheckOutlined /> },
    cancelButtonProps = {
      icon: <CloseOutlined />,
    },
    ...restModalProps
  } = modalProps;
  const onClickModalOk = () => {
    if (form) {
      form
        .validateFields()
        .then(() => {
          const values = form.getFieldsValue();
          onOk && onOk(values);
        })
        .catch((error) => {
          typeof onFinishFailed === "function" && onFinishFailed(error);
        });
    }
  };

  const onClickModalCancel = (e: any) => {
    onCancel && onCancel(e);
    if (form) {
      form.resetFields();
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={onClickModalOk}
      onCancel={onClickModalCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      {...restModalProps}
    >
      <Form form={form} onFinishFailed={onFinishFailed} {...restFormProps} />
      {extra}
    </Modal>
  );
};

export default ModalForm;
