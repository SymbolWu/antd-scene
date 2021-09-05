import React, { useEffect } from "react";
import { Modal, ModalProps, Space, SpaceProps } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import Form, { IFormProps } from "../form";
import { useConfig } from "../config-provider";

interface IModalProps extends ModalProps {
  titleIcon?: React.ReactNode;
  titleSpaceProps?: SpaceProps;
}
export interface IModalForm {
  modalProps?: IModalProps;
  formProps?: IFormProps;
  extra?: React.ReactNode | null;
}

const ModalForm: React.FC<IModalForm> = ({ modalProps, formProps, extra }) => {
  const { modalForm } = useConfig();
  const closeIcon = modalForm?.closeIcon || null;
  const { form, onFinishFailed, ...restFormProps } = formProps || {};
  const {
    onOk,
    onCancel,
    visible,
    title,
    titleIcon = null,
    okText = "提交",
    cancelText = "取消",
    okButtonProps = { icon: <CheckOutlined /> },
    cancelButtonProps = {
      icon: <CloseOutlined />,
    },
    titleSpaceProps,
    ...restModalProps
  } = modalProps || {};
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

  useEffect(() => {
    if (!visible) {
      form?.resetFields();
    }
  }, [visible]);

  const renderTitle = () => {
    return (
      <Space size={titleIcon ? 8 : 0} {...titleSpaceProps}>
        <span>{titleIcon}</span>
        <span>{title || ""}</span>
      </Space>
    );
  };

  const renderCloseIcon = () => {
    return closeIcon || <CloseOutlined />;
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
      title={renderTitle()}
      closeIcon={renderCloseIcon()}
      {...restModalProps}
    >
      <Form form={form} onFinishFailed={onFinishFailed} {...restFormProps} />
      {extra}
    </Modal>
  );
};

export default ModalForm;
