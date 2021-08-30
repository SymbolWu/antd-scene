import React from "react";
import classNames from "classnames";
import { IFormItemProps } from "../form/FormItem";

import SearchOperations from "./SearchOperations";

export const searchFormControl = ({
  expand,
  formOptionsFormProps,
  searchFormOperationClassName,
  searchFormOperationExpandClassName,
  searchOperationsProps,
  onExpand,
  onReset,
  onSearch,
}: any) => {
  const inputFormOptions = expand
    ? formOptionsFormProps
    : formOptionsFormProps.slice(0, 2);
  const operationSpan = (3 - (inputFormOptions.length % 3)) * 8;
  const formOptions: IFormItemProps[] = [
    ...inputFormOptions,
    {
      colProps: {
        className: searchFormOperationClassName,
        span: operationSpan,
      },
      component: (
        <SearchOperations
          {...searchOperationsProps}
          expandButtonProps={{
            ...searchOperationsProps?.expandButtonProps,
            className: classNames({
              [searchFormOperationExpandClassName]:
                formOptionsFormProps.length < 3,
            }),
          }}
          expand={expand}
          onExpand={onExpand}
          onReset={onReset}
          onSearch={onSearch}
        />
      ),
    },
  ];
  return formOptions;
};
