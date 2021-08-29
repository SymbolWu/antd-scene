import React, { Fragment, useState, useRef } from "react";
import {
  Form as AntdForm,
  Table,
  Card,
  Space,
  TableProps,
  CardProps,
  SpaceProps,
} from "antd";
import classNames from "classnames";

import Form, { IFormProps } from "@/form";
import { getPrefixCls, omitObject } from "@/utils";

import SearchOperations, { ISearchOperations } from "./SearchOperations";
import { searchFormControl } from "./utils";
import "./index.less";

export interface IProTable {
  spaceProps?: SpaceProps;
  formProps?: IFormProps;
  tableProps?: TableProps<any>;
  formCardProps?: CardProps;
  tableCardProps?: CardProps;
  searchOperationsProps?: ISearchOperations;
  extra?: React.ReactNode;
}

const ProTable: React.FC<IProTable> = ({
  spaceProps,
  formProps,
  formCardProps,
  tableProps,
  tableCardProps,
  searchOperationsProps,
  extra,
}) => {
  // 属性中取值
  const formOptionsFormProps = formProps?.formOptions || [];
  const formInitialValues = formProps?.initialValues || {};
  const form = formProps?.form;
  const formOnValuesChange = formProps?.onValuesChange;
  // hooks
  const [expand, setExpand] = useState((formOptionsFormProps.length ?? 0) <= 3);
  const formValue = useRef({ ...formInitialValues });
  // 样式
  const prefixCls = getPrefixCls("pro-table");
  const spaceClassNames = classNames(
    `${prefixCls}-space`,
    spaceProps?.className || ""
  );
  const searchFormOperationClassName = classNames(
    `${prefixCls}-search-form-operation`,
    searchOperationsProps?.colProps?.className || ""
  );
  const searchFormOperationExpandClassName = classNames(
    `${prefixCls}-search-form-operation-hidden`,
    searchOperationsProps?.colProps?.className || ""
  );

  // 事件
  const onExpand = () => {
    setExpand(!expand);
  };
  const onValuesChange = (changeValues: any, allValues: any) => {
    formValue.current = omitObject(allValues);
    formOnValuesChange && formOnValuesChange(changeValues, formValue.current);
  };
  const onReset = () => {
    formValue.current = { ...formInitialValues };
    form?.resetFields();
    // typeof getSearchValue === "function" &&
    //   getSearchValue({ ...initialValues });
  };

  const onSearch = () => {
    console.log("formValue.current:", formValue.current);
  };

  // 计算属性
  const { formOptions } = searchFormControl({
    expand,
    formOptionsFormProps,
    expandClassName: searchFormOperationExpandClassName,
    operationItem: (span: number, expandHiddenClassName: string) => ({
      colProps: {
        className: searchFormOperationClassName,
        span,
      },
      component: (
        <SearchOperations
          {...searchOperationsProps}
          expandButtonProps={{
            ...searchOperationsProps?.expandButtonProps,
            className: expandHiddenClassName,
          }}
          expand={expand}
          onExpand={onExpand}
          onReset={onReset}
          onSearch={onSearch}
        />
      ),
    }),
  });

  return (
    <Space direction="vertical" className={spaceClassNames} {...spaceProps}>
      <Card bordered={false} {...formCardProps}>
        <Form
          grid
          rowProps={{ gutter: 24 }}
          {...formProps}
          onValuesChange={onValuesChange}
          formOptions={formOptions}
        />
      </Card>
      <Fragment>{extra || null}</Fragment>
      <Card bordered size="small" {...tableCardProps}>
        <Table {...tableProps} />
      </Card>
    </Space>
  );
};
export { AntdForm as Form };
export default ProTable;
