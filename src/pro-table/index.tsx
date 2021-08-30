import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  Form as AntdForm,
  Table,
  Card,
  Space,
  TableProps,
  CardProps,
  SpaceProps,
  TablePaginationConfig,
} from "antd";
import classNames from "classnames";

import Form, { IFormProps } from "../form";
import { getPrefixCls, omitObject } from "../utils";

import { ISearchOperations } from "./SearchOperations";
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
  getInitialParams?: (params: { [propsName: string]: any }) => void;
  onChangeParams?: (params: { [propsName: string]: any }) => void;
}

const ProTable: React.FC<IProTable> = ({
  spaceProps,
  formProps,
  formCardProps,
  tableProps,
  tableCardProps,
  searchOperationsProps,
  extra,
  getInitialParams,
  onChangeParams,
}) => {
  // 属性中取值
  const formOptionsFormProps = formProps?.formOptions || [];
  const formInitialValues = formProps?.initialValues || {};
  const form = formProps?.form;
  const formOnValuesChange = formProps?.onValuesChange;
  // hooks
  const [expand, setExpand] = useState((formOptionsFormProps.length ?? 0) <= 3);
  const formValue = useRef({ ...formInitialValues });
  const paginationValue = useRef<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
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

  const onTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    paginationValue.current = { current, pageSize };
    getAllValues();
  };

  const onSearch = () => {
    getAllValues();
  };

  const getAllValues = () => {
    const params = {
      ...paginationValue.current,
      ...formValue.current,
    };
    if (typeof onChangeParams === "function") {
      onChangeParams(params);
    }
    return params;
  };

  // 计算属性
  const formOptions = searchFormControl({
    expand,
    formOptionsFormProps,
    searchFormOperationClassName,
    searchFormOperationExpandClassName,
    searchOperationsProps,
    onExpand,
    onReset,
    onSearch,
  });

  useEffect(() => {
    const params = getAllValues();
    getInitialParams && getInitialParams(params);
  }, []);

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
        <Table {...tableProps} onChange={onTableChange} />
      </Card>
    </Space>
  );
};
export { AntdForm as Form };
export default ProTable;
