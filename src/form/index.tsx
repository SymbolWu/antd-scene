import React from "react";

import { Form as AntdForm, Row, RowProps, FormProps } from "antd";

import FormItem, { IFormItemProps } from "./FormItem";

export interface IFormProps extends FormProps {
  formOptions?: IFormItemProps[];
  grid?: boolean;
  rowProps?: RowProps;
  colSpan?: number;
}

const Form: React.FC<IFormProps> = ({
  formOptions,
  grid = false,
  rowProps = {
    gutter: 24,
  },
  colSpan = 8,
  ...restFormProps
}) => {
  const renderFormItemList = () => {
    const presetProps = {
      colSpan,
      grid,
    };
    if (formOptions && formOptions.length) {
      return formOptions.map((i, index) => (
        <FormItem key={index} {...presetProps} {...i} />
      ));
    }
    return null;
  };
  if (grid) {
    return (
      <AntdForm {...restFormProps}>
        <Row {...rowProps}>{renderFormItemList()}</Row>
      </AntdForm>
    );
  }
  return <AntdForm {...restFormProps}>{renderFormItemList()}</AntdForm>;
};
export default Form;
