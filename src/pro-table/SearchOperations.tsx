import React from "react";
import { Space, Button, ColProps, SpaceProps, ButtonProps } from "antd";
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  ClearOutlined,
} from "@ant-design/icons";

interface IButtonProps extends ButtonProps {
  buttonText?: string;
  innerIcon?: React.ReactNode;
}
export interface ISearchOperations {
  colProps?: ColProps;
  spaceProps?: SpaceProps;
  resetButtonProps?: IButtonProps;
  searchButtonProps?: IButtonProps;
  expandButtonProps?: IButtonProps;
  onReset?: () => void;
  onSearch?: () => void;
  onExpand?: () => void;
  expand?: boolean;
}

const SearchOperations: React.FC<ISearchOperations> = ({
  spaceProps,
  resetButtonProps,
  searchButtonProps,
  expandButtonProps,
  onReset,
  onSearch,
  onExpand,
  expand,
}) => {
  return (
    <Space size="small" {...spaceProps}>
      <Button onClick={onReset} icon={<ClearOutlined />} {...resetButtonProps}>
        {resetButtonProps?.buttonText || "重置"}
      </Button>
      <Button
        type="primary"
        onClick={onSearch}
        icon={<SearchOutlined />}
        {...searchButtonProps}
      >
        {searchButtonProps?.buttonText || "查询"}
      </Button>
      <Button type="link" {...expandButtonProps} onClick={onExpand}>
        {expand ? "收起" : "展开"}
        {expand ? <UpOutlined /> : <DownOutlined />}
      </Button>
    </Space>
  );
};

export default SearchOperations;
