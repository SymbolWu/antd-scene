import React, { Fragment, useState, useRef, useEffect } from "react";
import {
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
import { useConfig } from "../config-provider";

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
  onChangeFormParams?: (params: { [propsName: string]: any }) => void;
}

const defaultPagination = { current: 1, pageSize: 10 };
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
  onChangeFormParams,
}) => {
  // 配置中取值
  const { proTable } = useConfig();

  const spaceSize = proTable?.spaceSize ?? 24;
  const formCardSize = proTable?.formCardSize || "default";
  const tableCardSize = proTable?.tableCardSize || "default";
  const formCardBodyStyle = proTable?.formCardBodyStyle || {};
  const formCardHeadStyle = proTable?.formCardHeadStyle || {};
  const tableCardBodyStyle = proTable?.tableCardBodyStyle || {};
  const tableCardHeadStyle = proTable?.tableCardHeadStyle || {};
  const tableSize = proTable?.tableSize || "large";
  // 属性中取值
  const formOptionsFormProps = formProps?.formOptions || [];
  const formInitialValues = formProps?.initialValues || {};
  const form = formProps?.form;
  const formOnValuesChange = formProps?.onValuesChange;
  const tableOnChange = tableProps?.onChange;
  // hooks
  const [expand, setExpand] = useState((formOptionsFormProps.length ?? 0) <= 3);
  const formValue = useRef({ ...formInitialValues });
  const paginationValue = useRef<TablePaginationConfig>(defaultPagination);
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
    paginationValue.current = defaultPagination;
    form?.resetFields();
    getAllParams(true);
  };
  const onSearch = () => {
    paginationValue.current = defaultPagination;
    onChangeFormParams && onChangeFormParams(formValue.current);
    getAllParams(true);
  };

  function onTableChange(pagination: TablePaginationConfig, ...args: any[]) {
    const { current, pageSize } = pagination;
    paginationValue.current = { current, pageSize };
    tableOnChange && tableOnChange(pagination, args[1], args[2], args[3]);
    getAllParams(true);
  }

  const getAllParams = (exePropsFunction?: boolean) => {
    const params = {
      ...paginationValue.current,
      ...formValue.current,
    };
    if (typeof onChangeParams === "function" && exePropsFunction) {
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
    const params = getAllParams(false);
    getInitialParams && getInitialParams(params);
  }, []);

  return (
    <Space
      direction="vertical"
      size={spaceSize}
      className={spaceClassNames}
      {...spaceProps}
    >
      <Card
        bordered={false}
        bodyStyle={{
          paddingBottom: 0,
          ...formCardBodyStyle,
          ...(formCardProps?.bodyStyle || {}),
        }}
        headStyle={{
          ...formCardHeadStyle,
        }}
        size={formCardSize}
        {...formCardProps}
      >
        <Form
          grid
          rowProps={{ gutter: 24 }}
          {...formProps}
          onValuesChange={onValuesChange}
          formOptions={formOptions}
        />
      </Card>
      <Fragment>{extra || null}</Fragment>
      <Card
        bordered
        size={tableCardSize}
        bodyStyle={{
          ...tableCardBodyStyle,
          ...(tableCardProps?.bodyStyle || {}),
        }}
        headStyle={{
          ...tableCardHeadStyle,
          ...(tableCardProps?.headStyle || {}),
        }}
        {...tableCardProps}
      >
        <Table size={tableSize} {...tableProps} onChange={onTableChange} />
      </Card>
    </Space>
  );
};
export default ProTable;
