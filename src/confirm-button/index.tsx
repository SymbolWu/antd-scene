import * as React from 'react';
import { Button, Popconfirm, PopconfirmProps, ButtonProps } from "antd";

export interface IConfirmButton {
  popconfirmProps?: PopconfirmProps;
  buttonProps?: ButtonProps;
  children?: string;
}

const ConfirmButton: React.FC<IConfirmButton> = ({
  popconfirmProps,
  buttonProps,
  children,
}) => {
  const {
    title = "确认删除？",
    okText = "是",
    cancelText = "否",
    onConfirm,
    ...restPopconfirmProps
  } = popconfirmProps || {};
  const onClickConfirm = () => {
    typeof onConfirm === "function" && onConfirm();
  };
  const onClickSpan = (e: any) => {
    e.stopPropagation();
  };
  return (
    <span onClick={onClickSpan}>
      <Popconfirm
        title={title}
        onConfirm={onClickConfirm}
        okText={okText}
        cancelText={cancelText}
        {...restPopconfirmProps}
      >
        <Button size="small" type="link" {...(buttonProps || {})}>
          {children}
        </Button>
      </Popconfirm>
    </span>
  );
};

export default ConfirmButton;
