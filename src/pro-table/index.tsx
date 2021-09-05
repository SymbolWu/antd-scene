import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Table,
  Card,
  TableProps,
  CardProps,
  TablePaginationConfig,
} from "antd";
import classNames from "classnames";

import Form, { IFormProps } from "../form";
import { getPrefixCls, omitObject } from "../utils";
import { useConfig } from "../config-provider";

import { ISearchOperations } from "./SearchOperations";
import { searchFormControl, paramsNormalize } from "./utils";
import "./index.less";

export interface IProTable {
  gap?: number | string;
  formProps?: IFormProps;
  tableProps?: TableProps<any>;
  formCardProps?: CardProps;
  tableCardProps?: CardProps;
  searchOperationsProps?: ISearchOperations;
  extra?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  getInitialParams?: (params: { [propsName: string]: any }) => void;
  onChangeParams?: (params: { [propsName: string]: any }) => void;
  onChangeFormParams?: (params: { [propsName: string]: any }) => void;
}

const defaultPagination = { current: 1, pageSize: 10 };
const ProTable: React.ForwardRefRenderFunction<any, IProTable> = (
  {
    gap,
    formProps,
    formCardProps,
    tableProps,
    tableCardProps,
    searchOperationsProps,
    extra,
    className,
    style,
    getInitialParams,
    onChangeParams,
    onChangeFormParams,
  },
  ref
) => {
  // 配置中取值
  const { proTable } = useConfig();

  const containerGap = gap ?? proTable?.gap ?? 24;
  const formCardSize = proTable?.formCardSize || "default";
  const tableCardSize = proTable?.tableCardSize || "default";
  const formCardBodyStyle = proTable?.formCardBodyStyle || {};
  const formCardHeadStyle = proTable?.formCardHeadStyle || {};
  const tableCardBodyStyle = proTable?.tableCardBodyStyle || {};
  const tableCardHeadStyle = proTable?.tableCardHeadStyle || {};
  const tableSize = proTable?.tableSize || "large";
  const paramsNormalizeMap = proTable?.paramsNormalizeMap || {};
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
  useImperativeHandle(ref, () => ({
    getParams,
  }));
  // 样式
  const prefixCls = getPrefixCls("pro-table");
  const containerClassName = classNames(`${prefixCls}-container`, className);
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
    getOnChangeParams();
  };
  const onSearch = () => {
    paginationValue.current = defaultPagination;
    onChangeFormParams && onChangeFormParams(formValue.current);
    getOnChangeParams();
  };

  function onTableChange(pagination: TablePaginationConfig, ...args: any[]) {
    const { current, pageSize } = pagination;
    paginationValue.current = { current, pageSize };
    tableOnChange && tableOnChange(pagination, args[1], args[2], args[3]);
    getOnChangeParams();
  }
  const getParams = () => {
    const originParams = {
      ...paginationValue.current,
      ...formValue.current,
    };
    return paramsNormalize(originParams, paramsNormalizeMap);
  };
  const getOnChangeParams = () => {
    const params = getParams();
    if (typeof onChangeParams === "function") {
      onChangeParams(params);
    }
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
    const params = getParams();
    getInitialParams && getInitialParams(params);
  }, []);

  return (
    <div
      className={containerClassName}
      style={{
        gap: containerGap,
        ...style,
      }}
    >
      {formOptionsFormProps.length ? (
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
      ) : null}
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
    </div>
  );
};
// const InternalProTable = forwardRef(ProTable);
// type InternalProTable = typeof InternalProTable;
// interface RefProTableProps extends InternalProTable {
//   useProTable: typeof useProTable;
// }
// const RefProTable: RefProTableProps = InternalProTable as RefProTableProps;
// RefProTable.useProTable = useProTable;
// export default RefProTable;

export default forwardRef(ProTable);
