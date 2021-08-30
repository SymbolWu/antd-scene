import React from "react";

import { Form as AntdForm, Col, ColProps, FormItemProps } from "antd";

export interface IFormItemProps extends FormItemProps {
  component?: React.ReactNode;
  colProps?: ColProps;
  colSpan?: number;
  grid?: boolean;
  // hardHidden?: boolean;
}

const FormItem: React.FC<IFormItemProps> = ({
  colProps,
  component,
  colSpan,
  grid,
  // hardHidden,
  ...restProps
}) => {
  if (grid) {
    return (
      <Col span={colProps?.span || colSpan} {...(colProps || {})}>
        <AntdForm.Item {...restProps}>{component || null}</AntdForm.Item>
      </Col>
    );
  }
  return <AntdForm.Item {...restProps}>{component || null}</AntdForm.Item>;
};

export default FormItem;
